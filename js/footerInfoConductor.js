var FooterInfoConductor = function() {
    

    this.add = function( modelo ) {
        
        $(".panelInfo").append( modelo.name + ' ' + modelo.surname +   
                					'<br>' + "Calificacion: " + modelo.score + 
                					'<br>' + 
                					'Modelo: ' + modelo.car.description  +   '<br>' + 'Color: ' + modelo.car.color 
				+ '<br>');


    };

};
