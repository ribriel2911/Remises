var Incidencia = function(descripcion,delay,icon,id) {

	// Traducción de tipos de incidencias
    var translate = ['Accidente','Congestion','Piquete'];

	this.descripcion = descripcion;
	this.delay = delay;
	this.icon = icon;
	this.tipo = translate[id];

	
};