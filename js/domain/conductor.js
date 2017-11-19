var Conductor = function (id, name, surname, score, car, historyPositions) {

	this.id = id;
	this.nombre = name;
	this.apellido = surname;
	this.auto = car;
	this.estrellas = score;

	this.historialPosiciones = historyPositions;

	this.icon = L.icon({
                        iconUrl: car.urlIcon,
                        iconSize: [38, 38]
                    });

	this.marker = L.marker(historyPositions[0], {icon: this.icon});
	this.marker.bindPopup(	"<p>"+this.nombre+" "+this.apellido+
							"</p><p>Auto: " + this.auto.marca+" "+this.auto.modelo+
							"</p><p>Estrellas: "+this.estrellas+"</p>");
};