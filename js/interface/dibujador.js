var Dibujador = function(map){
    this.map = map;

    function dibujarIncidencias(incidencias){

        $.each(incidencias, function (incidencia) {

            console.log(tipos[value.type].urlIcon);

            //var incidencia = new Incidencia(tipos[value.type], value.coordinate);

            //incs.push(incidencia);

            //console.log(incidencia.tipo.urlIcon);

            incidencia.marker.addTo(this.map);
        });
    };

};

