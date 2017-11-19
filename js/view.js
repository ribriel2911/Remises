
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
        iconUrl: 'img/cars/ford.png',
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



    // Cargar incidencias
    var servicioIncidencias = new IncidenciasService();
    servicioIncidencias.cargarIncidencias(map);

    var servicioConductores = new ConductoresService();

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
        serviceCall('requests', function (pedidos) {
            $.each(pedidos.requests, function (key, pedido) {
                var ungsMarker = L.marker(pedido.coordinate);
                var availableDrivers = pedido.availableDrivers;
                ungsMarker.addTo(map);
                ungsMarker['id'] = pedido.id;
                ungsMarker['availableDrivers'] = pedido.availableDrivers;
                ungsMarker.on({
                    "click": function (e) {
                        ungsMarker.bindPopup("<b>Pedido Nº "+pedido.id+"</b>").openPopup();

                        servicioConductores.buscarConductoresPorPedido(ungsMarker.availableDrivers,travelreq);
                    }
                });

            });

        });
    }

    function cargarConductores() {
        serviceCall('drivers', function (conductoresR) {
            conductores = conductoresR;

        });
    }

    function cargarPocisiones() {
        serviceCall('positions', function (posicionesR) {
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
