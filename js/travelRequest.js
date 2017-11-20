var TravelRequest = function(name, map) {
    this.name = name;
    this.map = map;
    this.carsData = [];

    this.addCar = function(carDriver , carLayerParam) {
        //Creamos el layer en el mapa para ese carDriver

        var carLayer = carDriver.getLayout().addTo(this.map);

        carLayer.addLayer(carLayerParam);

        // Agregamos el layer al control
        this.map.layersControl.addOverlay(carLayer, carDriver.name);

        var updater = function(newPosition, icon) {
            //console.log("Updating view for car driver: " + carDriver.name + "!!");
            //console.log(newPosition);

            carLayer.clearLayers();

            // Opción 1.
            carLayer.addLayer(L.marker(newPosition, {icon:icon}));
            // Opción 2.
            // carLayer.addLayer(L.circleMarker(newPosition, {
            //                         radius: 7,
            //                         fillColor: "#00AA00",
            //                         color: "#DDD",
            //                         weight: 1,
            //                         opacity: 1,
            //                         fillOpacity: 0.3
            //                     }));
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
