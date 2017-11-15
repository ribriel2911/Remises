
(function(){
    var lista = document.getElementById("lista"),
  		tareaInput = document.getElementById("tareaInput"),
  		btnNuevaTarea = document.getElementById("btnelegir");

    var xdist = document.getElementById("DistanciaVehiculo"), //tomo datos del html
        xauto = document.getElementById("auto"),
        xcalif = document.getElementById("calificacion"),
        xcant = document.getElementById("cantidadViajes");


    var validar = function(e){    //validamos que el usuario ingrese origen y destino
        //validarOrigen(e);
        //validarDestino(e);

        var distanciaVehiculo = document.getElementById("DistanciaVehiculo");
        var distElegida = distanciaVehiculo.options[distanciaVehiculo.selectedIndex].value;
        alert(distElegida);
    };

    var validarOrigen = function(e){
        if(formulario.origen.value == 0){
            alert("Debe compeltar el origen!");
            e.preventDefault(); //argumento del evento, prevenimos que no se envien los datos
        }
    };

    var validarDestino = function(e){
        if(formulario.destino.value == 0){
            alert("Debe completar el destino!");
            e.preventDefault();
        }
    }

  	// Funciones

    var pasarData = function(){

      var choferseleccionado = "";
      var distElegida = "";
      var autoElegido = "";
      var califElegida = "";
      var cantElegida = "";

      distElegida = xdist.options[xdist.selectedIndex].value; //accede a la opcion elegida del form
      autoElegido = xauto.options[xauto.selectedIndex].value;
      califElegida = xcalif.options[xcalif.selectedIndex].value;
      cantElegida = xcant.options[xcant.selectedIndex].value;
      console.log(this.innerText);
      window.location = "view2.html?"
            + "dist=" + distElegida
            + "&auto=" + autoElegido
            + "&calif=" + califElegida
            + "&cant=" + cantElegida;


    };

  	var agregarChofer = function(){

  		var chofer = "Pepe",//tareaInput.value,
  			nuevoChofer = document.createElement("li"),
  			enlace = document.createElement("a"),
        title = document.createElement("title"),
  			contenido = document.createTextNode(chofer);


  		// Agregamos el contenido al enlace
  		enlace.appendChild(contenido);
  		// Le establecemos un atributo href
  		//enlace.setAttribute("href", "view2.html");
      enlace.setAttribute("title", "Pepe");
  		// Agrergamos el enlace (a) a la nueva tarea (li)
  		nuevoChofer.appendChild(enlace);
  		// Agregamos la nueva tarea a la lista
  		lista.appendChild(nuevoChofer);

      var chofer1 = "Bolt",//tareaInput.value,
  			nuevoChofer1 = document.createElement("li"),
  			enlace1 = document.createElement("a"),
        title1 = document.createElement("title"),
  			contenido1 = document.createTextNode(chofer1);


  		// Agregamos el contenido al enlace
  		enlace1.appendChild(contenido1);
  		// Le establecemos un atributo href
  		//enlace.setAttribute("href", "view2.html");
      enlace1.setAttribute("title", "Bolt");
  		// Agrergamos el enlace (a) a la nueva tarea (li)
  		nuevoChofer1.appendChild(enlace1);
  		// Agregamos la nueva tarea a la lista
  		lista.appendChild(nuevoChofer1);



//  		for (var i = 0; i <= lista.children.length -1; i++) {
//  			lista.children[i].addEventListener("click", function(){
//          //choferseleccionado = lista.children[].textContent;
//          distElegida = xdist.options[xdist.selectedIndex].value;
//          autoElegido = xauto.options[xauto.selectedIndex].value;
//          califElegida = xcalif.options[xcalif.selectedIndex].value;
//          cantElegida = xcant.options[xcant.selectedIndex].value;
//          console.log(this.innerText);
//          window.location = "view2.html?car=" + this.innerText
//                + "&dist=" + distElegida
//                + "&auto=" + autoElegido
//                + "&calif=" + califElegida
//                + "&cant=" + cantElegida;
//          //window.location = "view2.html?dist=" + distElegida;
//  			});
//  		}

  	};

    //var comprobarInput = function(){
  	//	tareaInput.className = "";
  	//	teareaInput.setAttribute("placeholder", "Agrega tu tarea");
  	//};

  	//var eleminarTarea = function(){
  	//	this.parentNode.removeChild(this);
  	//};

  	// Eventos

  	// Agregar choferes
  	btnNuevaTarea.addEventListener("click", pasarData);

  	// Comprobar Input
  	//tareaInput.addEventListener("click", comprobarInput);

    //formulario.addEventListener("submit", validar);

  	// Borrando Elementos de la lista
  	//for (var i = 0; i <= lista.children.length -1; i++) {
  	//	lista.children[i].addEventListener("click", eleminarTarea);
  	//};

}())
