var TravelRequest = function(name, map) {
    this.name = name;
    this.map = map;
    this.carsData = [];

    var carIcon = L.icon({
        iconUrl: 'img/pepe.png',
        iconSize: [80, 38]
    });

    this.addCar = function(carDriver , carLayerParam) {
        //Creamos el layer en el mapa para ese carDriver

        var carLayer = carDriver.getLayout().addTo(this.map);

        carLayer.addLayer(carLayerParam);

        // Agregamos el layer al control
        this.map.layersControl.addOverlay(carLayer, carDriver.name);

        var updater = function(newPosition, icon) {
            carLayer.clearLayers();
            carLayer.addLayer(L.marker(newPosition, {icon:carIcon}));
        }

        this.carsData.push({
            carDriver: carDriver,
            updater: updater
        })
    }

    this.start = function() {
        this.carsData.forEach(function(data) {
            var carDriver = data.carDriver;
            carDriver.move(data.updater);

        });
    }

    this.startCar = function(car_i) {
            var data = this.carsData[car_i];
            var carDriver = data.carDriver;
            carDriver.move(data.updater);
    }

    this.getLayer = function(car_i){

            var data = this.carsData[car_i];
            var carDriver = data.carDriver;
            return carDriver.getLayout();
    }
};
