var PanelInfo = function() {
    

    this.add = function(modelo ) {
        
        $(".panelInfo").append( modelo.name + ' ' + modelo.surname +   
                					'<br>' + "Calificacion: " + modelo.score + 
                					'<br>' + 
                					'Modelo: ' + modelo.car.description  +   '<br>' + 'Color: ' + modelo.car.color 
+ '<br><button type="button"  class="elegirPanelLateral" data-button="' + modelo.name  + '" >Pedir</button>' + '<br>');


    };



    this.seleccionado = function( modelo ) {
        
        $(".panelInfo").append( modelo.name + ' ' + modelo.surname +   
                					'<br>' + "Calificacion: " + modelo.score + 
                					'<br>' + 
                					'Modelo: ' + modelo.car.description  +   '<br>' + 'Color: ' + modelo.car.color 
				+ '<br>');


    };

};
