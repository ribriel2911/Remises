var Incidencia = function (tipo, posicion) {

	this.tipo = tipo;
	this.posicion = posicion;
	this.icon = L.icon({
                        iconUrl: tipo.urlIcon,
                        iconSize: [38, 38]
                    });


	this.draw = function( map ){
		this.marker = L.marker(posicion, {icon: this.icon});
		this.marker.bindPopup(	"<p>Incidencia</p><p>Tipo: " + tipo.descripcion
										+ "</p><p>Retraso: " + tipo.retraso + " minutos</p>");
		this.marker.addTo( map );
	}

	
};
