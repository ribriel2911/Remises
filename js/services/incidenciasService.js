var IncidenciasService = function ( map ) {

	this.map = map;
	this.incidencias = [];
	this.tiposIncidencia = [];

	//cargarTiposDeIncidencia();

	this.cargarTiposDeIncidencia = function() {

		tipos = [];
		var self = this;
		
	    serviceCall('incidentstypes', function (tipes) {

	    	$.each(tipes.incidenttypes, function (key, value) {

	        	var inc = new TipoIncidencia(	value.id,
	                        					value.delay,
	                        					value.description);
	        	tipos[value.id] = inc;
	        });

	        self.cargarIncidencias();
	    });

	    this.tiposIncidencia = tipos;

	    //

	}

  this.cargarIncidencias = function() {

    	tipos = this.tiposIncidencia;
			map = this.map;
    	incs = [];

        serviceCall('incidents', function (incidencias) {
            $.each(incidencias.incidents, function (key, value) {

                var incidencia = new Incidencia(tipos[value.type], value.coordinate);
                incs.push(incidencia);

                incidencia.draw( map );

            });
        });

        this.incidencias = incs;
    }
};
