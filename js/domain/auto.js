var Auto = function (carDescription) {
	
	this.id = carDescription.id;

	var descripcion = carDescription.description.split(" ");

	this.marca = descripcion[0];
	this.modelo = descripcion[1];
	this.año = carDescription.year;
	this.color = carDescription.color
	this.urlIcon = "img/cars/"+this.marca+".png";
	this.patente = carDescription.platenumber;
};