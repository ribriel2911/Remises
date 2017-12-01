
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


    // Creamos un pedido de viaje
    var travelreq = new TravelRequest("UNGS", map);
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

    function buscarPedidos() {
        serviceCall('requests', function (pedidos) {
            var seCargoUno = false;
            $.each(pedidos.requests, function (key, pedido) {

                if(!seCargoUno){
                    var marker = L.marker(pedido.coordinate);
                    var availableDrivers = pedido.availableDrivers;
                    marker.addTo(map);
                    marker['id'] = pedido.id;
                    marker['availableDrivers'] = pedido.availableDrivers;
                    marker.bindPopup("<b>Pedido Nº "+pedido.id+"</b>").openPopup();


                    servicioConductores.buscarConductoresPorPedido(map, marker.availableDrivers,travelreq);
                    seCargoUno = true;
                }

            });
        });
    }


    function onMapClick(e) {
        //alert("Usted esta aqui " + e.latlng);
    }





}




$(global);
