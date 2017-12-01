var CarDriver = function(name, historyPositions, icon) {
    this.name = name;
    this.historyPositions = historyPositions;
    this.icon = icon;
    var iconAuto = this.icon;
    this.carLayout = L.layerGroup();

    var actualIx = 0;

    this.move = function(callback) {
        var self = this;
        setTimeout(function() {
            callback(historyPositions[actualIx], iconAuto);

            actualIx += 1;
            if(actualIx < historyPositions.length) {
                self.move(callback);
            }
        }, 500);
    }

    this.getLayout = function(){

        return this.carLayout;
    }
};
