var IncidenciasService = function () {

	this.incidencias = [];
	this.tiposIncidencia = [];

	cargarTiposDeIncidencia();

	function cargarTiposDeIncidencia() {

		tipos = [];

	    serviceCall('incidentstypes', function (tipes) {
	            
	    	$.each(tipes.incidenttypes, function (key, value) {

	        	var inc = new TipoIncidencia(	value.id,
	                        					value.delay,
	                        					value.description);

	        	tipos[value.id] = inc;
	        });
	    });

	    this.tiposIncidencia = tipos;
	}

    this.cargarIncidencias = function(map) {

    	tipos = this.tiposIncidencia;

    	incs = [];
        
        serviceCall('incidents', function (incidencias) {

            $.each(incidencias.incidents, function (key, value) {

            	console.log(tipos[value.type].urlIcon);

                var incidencia = new Incidencia(tipos[value.type], value.coordinate);

                incs.push(incidencia);

                console.log(incidencia.tipo.urlIcon);

                incidencia.marker.addTo(map);
            });
        });

        this.incidencias = incs;
    }
};