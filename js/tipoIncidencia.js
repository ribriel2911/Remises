var TipoIncidencia = function(id,delay,icon) {

	// Traducción de tipos de incidencias
    var translate = ['','Accidente','Congestion','Piquete'];

    this.id = id;
	this.descripcion = translate[id];
	this.retraso = delay;
	this.icon = icon;	
};