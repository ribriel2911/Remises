var ConductoresService = function () {

	this.conductores = [];
	crearConductores();

	this.buscarConductoresPorPedido = function(availableDrivers,travelReq) {

		conductores = this.conductores;

		for (var i = 0; i < conductores.length; i += 1) {

			$.each(availableDrivers, function (key, value) {
            
            	if (value == conductores[i].id) {

            		console.log(conductores[i].name+" agregado");

            		travelReq.addCar(new CarDriver(conductores[i].name, conductores[i].historialPosiciones, conductores[i].auto.urlIcon), conductor[i].marker);
            	}
       		});
       	}
	}

	function crearConductores(){

		var infoConductores = [];
		var infoPosiciones = [];

		serviceCall('positions', function (infoP) {

			$.each(infoP.positions, function (key, value) {

				var posiciones = [];

				$.each(value.positions, function (key, pos) {

					posiciones.push(pos);
				});

				info = [value.driver, posiciones];

				infoPosiciones.push(info)
			});
	    });

	    serviceCall('drivers', function (infoC) {

	    	$.each(infoC.drivers, function (key, value) {

				infoConductores.push(value);
			});
	    });

		console.log(infoPosiciones.indexOf());
	    console.log(infoConductores);

		$.each(infoConductores.drivers, function (key, value) {

			console.log(value);

			var auto = new Auto(value.car);

			console.log(auto.marca);
		});
	}
};