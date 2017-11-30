
var global = function bootstrap() {

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



    // Cargar incidencias
    var servicioIncidencias = new IncidenciasService(map);
    servicioIncidencias.cargarTiposDeIncidencia();

    var servicioConductores = new ConductoresService();
    servicioConductores.buscarConductores();

    bindElements();




    function buscarPedidos() {
        serviceCall('requests', function (pedidos) {
            var seCargoUno = false;
            $.each(pedidos.requests, function (key, pedido) {

                if(!seCargoUno){
                    var ungsMarker = L.marker(pedido.coordinate);
                    var availableDrivers = pedido.availableDrivers;
                    ungsMarker.addTo(map);
                    ungsMarker['id'] = pedido.id;
                    ungsMarker['availableDrivers'] = pedido.availableDrivers;
                    ungsMarker.bindPopup("<b>Pedido Nº "+pedido.id+"</b>").openPopup();
                    

                    servicioConductores.buscarConductoresPorPedido(map, ungsMarker.availableDrivers,travelreq);    
                    seCargoUno = true;
                }
                
            });
        });
    }


    function onMapClick(e) {
        //alert("Usted esta aqui " + e.latlng);
    }

    function bindElements() {

        $("#map").hide();

        $("#btnelegir").click(function () {
            buscarPedidos();
            $("#btnelegir").prop('disabled', true);
            $("#map").show();
        });

        map.on('popupopen', function (e) {
            var rmarker = e.popup._content;
		
        });

        map.on('click', onMapClick);
        // START!
    }



}




$(global);
