var ConductoresService = function () {

	var travelreq;
	var map;

	var carIcon = L.icon({
			iconUrl: 'img/pepe.png',
			iconSize: [80, 38]
	});


	this.conductores = [];
	this.choferesDisponibleParaElPedido = [];

	var infoComponent = new PanelInfo();

	this.buscarConductoresPorPedido = function( map ,availableDrivers , travelReqParam ) {
		this.travelreq = travelReqParam;
		this.map = map;
		var travelReq = travelReqParam;
		var SsC = this;
		conductores = this.conductores;
		choferesDisponibleParaElPedido = this.choferesDisponibleParaElPedido;

		serviceCall('positions', function (posicionesR) {
				posiciones = posicionesR;
				for (var i = 0; i < conductores.length; i ++) {

							if( availableDrivers.indexOf( conductores[i].id ) > -1 ){  //compara conductores disponibles con los del arreglo
								console.log(conductores[i].name +" agregado");
					                var posicionesDriver = [];

					                for (var x = 0; x < posiciones.positions.length; x++) {
					                    if (conductores[i].id == posiciones.positions[x].driver) {
					                        posicionesDriver = posiciones.positions[x].positions;
					                    }
					                }



									infoComponent.add(conductores[i]);

					                var xMarker = null;
					                xMarker = L.marker(posicionesDriver[0], {icon: carIcon});
					                xMarker['type'] = 'CarType';
					                xMarker.bindPopup(conductores[i].name + ' ' +conductores[i].surname +
					                					'<br>' + "Calificacion: " + conductores[i].score +
					                					'<br>' +
					                					'Modelo: ' + conductores[i].car.description  +   '<br>' + 'Color: ' + conductores[i].car.color
					+ '<br><button type="button"  class="elegir" data-button="' + conductores[i].name  + '" >Pedir</button>').openPopup();
					                xMarker.on({

					                    "click": function (e) {
					                        $(".elegir").unbind().click(function (e) {
												var name = e.target.dataset.button;
												$(".panelInfo").empty();
												infoComponent.seleccionado(SsC.buscarConductorPorNombre(name));
												SsC.seleccionoConductor(name , map,  SsC.travelreq);
						        			});
					                    }
					                });

					                		//TODO: SACAR A FUNCION
											$(".elegirPanelLateral").unbind().click(function (e) {
												var name = e.target.dataset.button;
												$(".panelInfo").empty();
												infoComponent.seleccionado(SsC.buscarConductorPorNombre(name));
												SsC.seleccionoConductor(name , map,  SsC.travelreq);
						        			});

									conductores[i].historialPosiciones = posicionesDriver;
									var carDriver = new CarDriver(conductores[i].name,conductores[i].historialPosiciones, carIcon.urlIcon);
									carDriver["modelo"] = conductores[i];

									choferesDisponibleParaElPedido.push(carDriver);
									travelReq.addCar( carDriver , xMarker);
							}
				}
		});



	}

	this.buscarConductorPorNombre = function( conductorName ){
		for (var i = 0; i < this.choferesDisponibleParaElPedido.length; i += 1) {
					var conductor = this.choferesDisponibleParaElPedido[i];

					if ( conductor.name == conductorName) {

							return conductor.modelo;
					}
			}

			return null;
	}

	this.seleccionoConductor = function ( conductorName  , map , travelreq){

			for (var i = 0; i < this.choferesDisponibleParaElPedido.length; i += 1) {
					var conductor = this.choferesDisponibleParaElPedido[i];

					if ( conductor.name == conductorName) {

							for (var j = 0; j < this.choferesDisponibleParaElPedido.length; j += 1) {

									if (j != i) {
											this.map.removeLayer(this.travelreq.getLayer(j));
									}
							}

							console.log(i);
							this.travelreq.startCar(i);
					}
			}
	}

	this.buscarConductores = function(){
			conductores = this.conductores;
	    serviceCall('drivers', function (infoC) {
	    	$.each(infoC.drivers, function (key, value) {

						conductores.push(value);
				});

			 	console.log(conductores);
	    });
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
	}



};
