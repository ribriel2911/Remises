
function bootstrap() {

    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('map').setView(ungsLocation, 14);

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);
    // hack:
    map.layersControl = layersControl;


    var carIcon = L.icon({
        iconUrl: 'img/pepe.png',
        iconSize: [80, 38]
    });

    // Creamos un pedido de viaje
    var travelreq = new TravelRequest("UNGS", map);

    // Obtner parametro de la URL que seleccionas en el formulario

    var url = new URL(window.location);
    var car = url.searchParams.get('car');
    var ydist = url.searchParams.get('dist');
    var yauto = url.searchParams.get('auto');
    var ycalif = url.searchParams.get('calif');
    var ycant = url.searchParams.get('cant');

    var dr = [ydist, yauto, ycalif, ycant];

    var chofAgregados = [];
    var tiposIncidencias = [];

    var conductores = [];
    var posiciones = [];

    var yMarker = L.marker(); //me guardo el marker
    var listMarker = [];



    // Cargar tipos de incidencias
    cargarTiposDeIncidencia();

    cargarConductores();
    cargarPocisiones();

    bindElements();


    function buscarConductoresPorPedido(availableDrivers) {
        for (var i = 0; i < conductores.drivers.length; i += 1) {
            
            if (availableDrivers.indexOf(conductores.drivers[i].id) >= 0) {
                console.log("Paso el conductor: " + conductores.drivers[i].id);
                chofAgregados.push(conductores.drivers[i].name);

                var posicionesDriver = [];

                for (var x = 0; x < posiciones.positions.length; x++) {
                    if (conductores.drivers[i].id == posiciones.positions[x].driver) {
                        posicionesDriver = posiciones.positions[x].positions;
                    }
                }


                var xMarker = null;
                xMarker = L.marker(posicionesDriver[0], {icon: carIcon});
                xMarker.bindPopup(conductores.drivers[i].name).openPopup();


                travelreq.addCar(new CarDriver(conductores.drivers[i].name, posicionesDriver, carIcon), xMarker); //el ultimo parametro es del icono, lo agregamos nosotros
            }
        }
    }
    function buscarPedidos() {
        serviceCall('https://snapcar.herokuapp.com/api/requests/', function (pedidos) {
            $.each(pedidos.requests, function (key, pedido) {
                var ungsMarker = L.marker(pedido.coordinate);
                var availableDrivers = pedido.availableDrivers;
                ungsMarker.addTo(map);
                ungsMarker['id'] = pedido.id;
                ungsMarker['availableDrivers'] = pedido.availableDrivers;
                ungsMarker.on({
                    "click": function (e) {
                        ungsMarker.bindPopup("<b>Pedido Nº "+pedido.id+"</b>").openPopup();

                        buscarConductoresPorPedido(ungsMarker.availableDrivers);
                    }
                });

            });

        });
    }

    function cargarTiposDeIncidencia() {

        serviceCall('https://snapcar.herokuapp.com/api/incidentstypes', function (tipos) {
            tiposIncidencias = tipos;
            $.each(tipos.incidenttypes, function (key, value) {
                // Ver que hago cuando cambia el nombre del tipo o manda otra incidencia

                var inc = new Incidencia(
                        value.description,
                        value.delay,
                        "img/incidents/" + value.description + '.png',
                        value.id);

                tiposIncidencias[value.id] =  inc;
            });
        });

        cargarIncidencias();
    }

    function cargarIncidencias() {
        

            serviceCall('https://snapcar.herokuapp.com/api/incidents', function (incidencias) {
                $.each(incidencias.incidents, function (key, value) {

                    var incidencia = tiposIncidencias[value.type];
                    var icon = L.icon({
                        iconUrl: incidencia.icon,
                        iconSize: [38, 38]
                    });
                    var marker = L.marker(value.coordinate, {icon: icon});

                    marker.addTo(map);
                    marker.bindPopup("<p>Incidencia</p><p>Tipo: " + incidencia.tipo + "</p><p>Retraso: " + incidencia.delay + " minutos</p>");
                });
            });
    }

    function cargarConductores() {
        serviceCall('https://snapcar.herokuapp.com/api/drivers/', function (conductoresR) {
            conductores = conductoresR;

        });
    }

    function cargarPocisiones() {
        serviceCall('https://snapcar.herokuapp.com/api/positions/', function (posicionesR) {
            posiciones = posicionesR;
        });
    }

    function onMapClick(e) {
        //alert("Usted esta aqui " + e.latlng);
    }

    function bindElements() {
        $("#btnelegir").click(function () {
            buscarPedidos();
        });

        map.on('popupopen', function (e) {
            var rmarker = e.popup._content;
            console.log(chofAgregados);
            for (var i = 0; i < chofAgregados.length; i += 1) {
                
                if (chofAgregados[i] == rmarker) {

                    for (var j = 0; j < chofAgregados.length; j += 1) {

                        if (j != i) {
                            map.removeLayer(travelreq.getLayer(j));
                        }
                    }
                    
                    console.log(i);
                    
                    travelreq.startCar(i);
                }
            }
        });

        map.on('click', onMapClick);
        // START!
    }
}




$(bootstrap);
