var TipoIncidencia = function(id,delay,iconName) {

	// Traducción de tipos de incidencias
    var translate = ['','Accidente','Congestion','Piquete'];

    this.id = id;
	this.descripcion = translate[id]!=null ? translate[id] : iconName;
	this.retraso = delay;
	this.urlIcon = "img/incidents/" + iconName + '.png';	
};