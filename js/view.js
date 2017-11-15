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

    // Creamos un círculo con centro en la UNGS.
    /*var circle = L.circle(ungsLocation, {
        color: '#0000AA',
        fillColor: '#0000CC',
        fillOpacity: 0.2,
        radius: 300
    }).addTo(map);*/

    // Creamos un polígono.
    L.polygon([
        L.latLng(-34.515594, -58.705654),
        L.latLng(-34.523503, -58.714062),
        L.latLng(-34.519177, -58.719890),
        L.latLng(-34.511089, -58.711374),
        L.latLng(-34.514062, -58.707909),
        L.latLng(-34.513824, -58.707584),
    ]).addTo(map);

    // Creamos un circuito.
    L.polyline([
        L.latLng(-34.524309, -58.695315),
        L.latLng(-34.521865, -58.698213),
        L.latLng(-34.520437, -58.699889),
        L.latLng(-34.522388, -58.701957),
        L.latLng(-34.523579, -58.700350)
    ], {color: 'red'}).addTo(map);

    var pepeHistory = [
        {lon: -58.695290, lat: -34.524297},
        {lon: -58.697030, lat: -34.522856},
        {lon: -58.698210, lat: -34.521874}
    ];

    var jorgeHistory = [
        {lon: -58.702329, lat: -34.522739},
        {lon: -58.702572, lat: -34.522992},
        {lon: -58.702801, lat: -34.523191},
        {lon: -58.703056, lat: -34.523412},
        {lon: -58.703299, lat: -34.523643}
    ];

    var boltHistory = [
        {lon: -58.702329, lat: -34.522739},
        {lon: -58.702572, lat: -34.522992},
        {lon: -58.702801, lat: -34.523191},
        {lon: -58.703056, lat: -34.523412},
        {lon: -58.703299, lat: -34.523643}
    ];

    // <div id="map"></div>Creamos un marker sobre la UNGS.
    pepeLocation = [-34.524297, -58.695290];
    boltLocation = [-34.522739, -58.702329];
    jorgeLocation = [-34.522000, -58.702329];

    var pepeIcon = L.icon({
        iconUrl: 'img/pepe.png',
        iconSize: [38, 95 / 2]
        //iconAnchor: [38/2, 94/2]
        //popupAnchor: [-3, -76]
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
    });

    var boltIcon = L.icon({
        iconUrl: 'img/bolt.png',
        iconSize: [38, 95 / 2]
        //iconAnchor: [22, 94],
        //popupAnchor: [-3, -76],
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
    });

    var jorgeIcon = L.icon({
        iconUrl: 'auto.jpg',
        iconSize: [38, 95 / 2]
        //iconAnchor: [22, 94],
        //popupAnchor: [-3, -76],
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
    });


    //pepeMarker.bindPopup("<b>Pepe</b>").openPopup();
    //boltMarker.bindPopup("<b>Bolt</b>").openPopup();

    // Creamos un pedido de viaje
    var travelreq = new TravelRequest("UNGS", map);

    // datos de los choferes


    //var datosChoferes = ({chofer:"pepe", distancia:"dis1", auto:"aut1", calificacion:"cal1", cantidad:"can1"},
    //                       {chofer:"bolt", distancia:"dis1", auto:"aut1", calificacion:"cal1", cantidad:"can1"}
    //                    );

    var dc = [["pepe", "dis1", "aut1", "cal1", "can1", pepeLocation, pepeHistory, pepeIcon],
        ["bolt", "dis1", "aut1", "cal1", "can1", boltLocation, boltHistory, boltIcon],
        ["jorge", "dis2", "aut1", "cal1", "can1", jorgeLocation, jorgeHistory, jorgeIcon]
    ];


    // Obtner parametro de la URL que seleccionas en el formulario
    //
    var url = new URL(window.location);
    var car = url.searchParams.get('car');
    var ydist = url.searchParams.get('dist');
    var yauto = url.searchParams.get('auto');
    var ycalif = url.searchParams.get('calif');
    var ycant = url.searchParams.get('cant');

    var dr = [ydist, yauto, ycalif, ycant];

    var chofAgregados = [];
    var tiposIncidencias = [];

    var yMarker = L.marker(); //me guardo el marker
    var listMarker = [];
    console.log(dr);

    /*for (var i = 0; i < dc.length; i+=1) {
      //console.log("En el índice '" + i + "' hay este valor: " + dc[i][0]);
      if (dr[0] == dc[i][1] && dr[1] == dc[i][2] && dr[2] == dc[i][3] && dr[3] == dc[i][4]){

          var xMarker = L.marker(dc[i][5], {icon:dc[i][7]});
          yMarker = xMarker;
          listMarker.push(xMarker);
          chofAgregados.push(dc[i][0]);
          //xMarker.addTo(map);
          xMarker.bindPopup(dc[i][0]).openPopup();
          travelreq.addCar(new CarDriver(dc[i][0], dc[i][6], dc[i][7]) , xMarker); //el ultimo parametro es del icono, lo agregamos nosotros
      }
    }*/

    // Cargar tipos de incidencias
    serviceCall('https://snapcar.herokuapp.com/api/incidentstypes', function (tipos) {
        tiposIncidencias  = tipos;
        $.each( tipos.incidenttypes, function( key, value ) {
            // Ver que hago cuando cambia el nombredel tipo o manda otra incidencia
            tiposIncidencias[value.id] = {  "description":value.description,
                                            "delay":value.delay,
                                            "icon":"img/incidents/"+value.description+'.png'};
        });

        serviceCall('https://snapcar.herokuapp.com/api/incidents', function(incidencias){
            $.each( incidencias.incidents, function( key, value ) {

                var tipo = tiposIncidencias[value.type];
                var icon = L.icon({
                    iconUrl: tipo.icon,
                    iconSize: [38, 38]
                    //iconAnchor: [38/2, 94/2]
                    //popupAnchor: [-3, -76]
                    //shadowSize: [68, 95],
                    //shadowAnchor: [22, 94]
                });
                var marker = L.marker(value.coordinate, {icon:icon});

                // var carLayer = L.layerGroup().addTo(map);
                // carLayer.clearLayers();
                // carLayer.addLayer(L.marker(value.coordinate, {icon:icon}));


                marker.addTo(map);
                marker.bindPopup("<p>Incidencia</p><p>Tipo: "+tipo.description+"</p><p>Retraso: "+tipo.delay+"</p>").openPopup();
            });

        });
    });


    serviceCall('https://snapcar.herokuapp.com/api/requests/', function (pedidos) {
        //Llamada al servicio rest , trae los resultados de conductores
        serviceCall('https://snapcar.herokuapp.com/api/drivers/', function (conductores) {
            serviceCall('https://snapcar.herokuapp.com/api/positions/', function (posiciones) {

                var pedido = pedidos.requests[0];
                var ungsMarker = L.marker(pedido.coordinate);
                var availableDrivers = pedido.availableDrivers;

                var circle = L.circle(pedido.coordinate, {
                    color: '#0000AA',
                    fillColor: '#0000CC',
                    fillOpacity: 0.2,
                    radius: 1000
                }).addTo(map);

                ungsMarker.addTo(map);
                ungsMarker.bindPopup("<b>Pedido</b>").openPopup();


                for (var i = 0; i < conductores.drivers.length; i += 1) {
                    //console.log("En el índice '" + i + "' hay este valor: " + dc[i][0]);
                    //if (dr[0] == dc[i][1] && dr[1] == dc[i][2] && dr[2] == dc[i][3] && dr[3] == dc[i][4]){

                    //var xMarker = L.marker(conductores.drivers[i].name, {icon:dc[0][7]});
                    //yMarker = xMarker;
                    //listMarker.push(xMarker);
                    if (availableDrivers.indexOf(conductores.drivers[i].id) >= 0) {
                        console.log("Paso el conductor: " + conductores.drivers[i].id);
                        chofAgregados.push(conductores.drivers[i].name);
                        //xMarker.addTo(map);
                        //xMarker.bindPopup(conductores.drivers[i].name).openPopup();

                        var posicionesDriver = [];

                        for (var x = 0; x < posiciones.positions.length; x++) {
                            if (conductores.drivers[i].id == posiciones.positions[x].driver) {
                                posicionesDriver = posiciones.positions[x].positions;
                            }
                        }


                        var xMarker = null;
                        xMarker = L.marker(posicionesDriver[0], {icon: dc[0][7]});
                        xMarker.bindPopup(conductores.drivers[i].name).openPopup();


                        travelreq.addCar(new CarDriver(conductores.drivers[i].name, posicionesDriver, dc[0][7]), xMarker); //el ultimo parametro es del icono, lo agregamos nosotros
                    }
                }
            });
        });
    });


    function onMapClick(e) {
        //alert("Usted esta aqui " + e.latlng);
    }

    map.on('popupopen', function (e) {
        var rmarker = e.popup._content;
        //map.removeLayer(yMarker); //removemos el icono del mapa
        console.log(chofAgregados);
        for (var i = 0; i < chofAgregados.length; i += 1) {
            //var xcar = new CarDriver(dc[i][0], dc[i][6], dc[i][7]);
            if (chofAgregados[i] == rmarker) {
                //travelreq.addCar(xcar);
                console.log(i);
                //map.removeLayer( listMarker[i] );
                travelreq.startCar(i);
            }
        }
    });

    map.on('click', onMapClick);
    // START!


}

function serviceCall(urlParam, callbackParam) {
    var callback = callbackParam;
    ajaxDialog = function (urlParam) {
        // Promise to let me know when complete
        return $.ajax({
            url: urlParam,
            dataType: 'json',
        }).promise();

    };

    teste2 = ajaxDialog(urlParam);

    teste2.done(function (result) {
        callback(result);
    });

}


$(bootstrap)
