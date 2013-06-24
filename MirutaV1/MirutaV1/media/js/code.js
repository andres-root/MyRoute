//Funciones para mostrar y ocultar la informacion de las tablas en rutas y estaciones

function on(num,tam){

        offmultiple(tam);
        div = document.getElementById(num);
        $(div).fadeIn(500);
	//subrutas(est);
}





function off(num){
        div = document.getElementById(num);
        $(div).fadeOut(500);
}






function offmultiple(tam){
        var i =0;
        for(i;i<=(tam-1);i++){
                div = document.getElementById(i);
                $(div).fadeOut(500);
        }

}








//Funcion para mostrar una subtabla de rutas dentro de la información de la estación

function subrutas(estacion,ord){

//Revisar la tabla donde se estan mostrando las rutas, que ahí se encuentra el error

	$.ajax('/ws/Paradas/',{                               
                                dateType:"json",
            
                                success:function(response){
                                        var i = 0;
					$(comp).append("<tbody>");
					var comp= "#subtabla_rutas"+ord;
                                        for(i;i<=(response.length);i++){
						
						if((estacion==response[i].fields.nombre_estacion)){
                                                	$(comp).append("<tr><td>"+ response[i].fields.nombre_ruta +"</td><td>");
							var ifenter=true;
							for(a=0;a<=(response.length-1);a++){
								if((response[i].fields.nombre_ruta==response[a].fields.nombre_ruta)&&(response[a].fields.orden>response[i].fields.orden)){
									$(comp).append(response[a].fields.nombre_estacion);
									ifenter=false;									
									break;
								}
																						
							}
							if(ifenter) $(comp).append(" Parada final");

						}				
					}

                                     	$(comp).append(" </td></tr></tbody>");   
                                	}
                       
                });


}






function subestaciones(ruta,ord){

//Tener presente: crear campo dirección en la tabla paradas y alimentarlo del campo dirección en estaciones automaticamente, dependiendo de la llave foranea a la q corresponda

	$.ajax('/ws/Paradas/',{                               
                                dateType:"json",
            
                                success:function(response){
                                        var i = 0;
					$(comp).append("<tbody>");
					var comp= "#subtabla_estaciones"+ord;
                                        for(i;i<=(response.length);i++){
//implementar algoritmo de ordenamiento para mostrar las rutas en el orden correcto						
						if((ruta==response[i].fields.nombre_ruta)){
                                                	$(comp).append("<tr><td>"+ response[i].fields.nombre_estacion +"</td><td>Aqui va la dirección :$</td></tr></tbody>");
							
						}				
					}

                                 
                                	}
                       
                });


}








//Funciones de selección de rutas manualmente y mejor ruta

function mejor_ruta_manual(est1,est2){
	
	//LLamado por medio de ajax al archivo Json para realizar la selección de las rutas y pintarlas en pantalla
	$.ajax('/ws/Paradas/',{                               
                                dateType:"json",
            
                                success:function(response){
					
					var rutas=[];
					var num_time = 0;
					var mejor_ruta;
					rutas=calcular_rutas(est1,est2,response);
					var str="";
					
					for(var i=0;i<rutas.length;i++){//alert(rutas[i].id);
						
						if(rutas[i].ruta.ruta2 == "")
							str+="<br> "+rutas[i].ruta.ruta1;
						else
							str+="<br> Aborde la ruta "+rutas[i].ruta.ruta1+" descienda en la estación "+rutas[i].ruta.estacion+" y aborde la ruta "+rutas[i].ruta.ruta2;

					}
					
					
					


					// Calculamos tiempos NOTA:MODIFICAR ESTA PARTE, YA NO CALCULAMOS TIEMPOS, AHORA ORGANIZAMOS ARREGLO DE MENOR A MAYOR TIEMPO
					
					for(var i=0;i<(rutas.length);i++){
						
						if(num_time==0){
							num_time =tiempoXruta(rutas[i],response,est1,est2);
							mejor_ruta=rutas[i];
						}
						else{
							var time_temp=tiempoXruta(rutas[i],response,est1,est2);
							if(time_temp<num_time){
								num_time=time_temp;
								mejor_ruta=rutas[i];
							}
						}						
					}

				/*	$('#Result_rutas').ap;pend("Rutas posibles: "+str + " <br> La mejor ruta es: "+mejor_ruta.ruta.ruta1)*/
									
					document.getElementById("Result_rutas").innerHTML="Rutas posibles: "+str + " <br> La mejor ruta es: "+mejor_ruta.ruta.ruta1;
				}
	});
		
}





//Función para determinar el tiempo que tarda una ruta para llegar a determinada estación desde una estación de inicio
function tiempoXruta(rute,array,est1,est2){
	var pass=false;
	var tiempo=0;
	for(var i=0;i<array.length;i++){

		
		if(array[i].fields.nombre_estacion == est1) 
			pass=true;

		//Revisa las rutas directas
		if(rute.ruta.ruta2==""){
			if((array[i].fields.nombre_ruta == rute.ruta.ruta1) && pass){
				tiempo += array[i].fields.minutos_next;
				if(array[i].fields.nombre_estacion == est2){
					tiempo -=  array[i].fields.minutos_next;
				}
			}
		}
		
		//Revisa las rutas con transbordo
		else{
			if((array[i].fields.nombre_ruta == rute.ruta.ruta1) && pass){
				tiempo += array[i].fields.minutos_next;
				if(array[i].fields.nombre_estacion == rute.ruta.estacion){
					tiempo -=  array[i].fields.minutos_next;
				}
			}

			else if((array[i].fields.nombre_ruta == rute.ruta.ruta2) && pass){
				tiempo += array[i].fields.minutos_next;
				if(array[i].fields.nombre_estacion == est2){
					tiempo -=  array[i].fields.minutos_next;
				}
			}
		}
		
		rute.tiempo = tiempo;
		
	}	

	return rute;

}


//SIGUIENTE PASO:DEFINIR MEJOR TRANSBORDO , POSTERIORMENTE MOSTRAR EN HTML Y NO EN ALERT LOS RESULTADOS CON LA OPCIÓN DE OBSERVAR INFORMACIÓN DE LAS RUTAS SOLICITADAS. 



function calcular_rutas(est1,est2,array){

	var rutas_fin=[];
	var rutas_ini=[];
	var rutas_directas=[];
	var transbordos=[];
	var rutas_iniT=[];
	var rutas_finT=[];
	var rutas=[];
	var rut;
		

	for(var i = 0; i<array.length; i++){
		if(est1 == array[i].fields.nombre_estacion)
			rutas_ini.push(array[i].fields.nombre_ruta);

		else if(est2 == array[i].fields.nombre_estacion)
			rutas_fin.push(array[i].fields.nombre_ruta);

	}

	
	for(var i=0 ; i<rutas_ini.length ; i++){
		for(var a=0 ; a<rutas_fin.length ; a++){

			if(rutas_ini[i]==rutas_fin[a])
				rutas_directas.push(rutas_ini[i]);
		}

	}	
	
	
	for(var i=0 ; i<rutas_directas.length ; i++){
		rut = tiempoXruta({"id":"direct" , "ruta":{"estacion":"" , "ruta1":rutas_directas[i] , "ruta2":""} , "tiempo":0} , array , est1 , est2);
		rutas.push(rut);
	}
	
	
	for(var a=0 ; a<rutas_ini.length ; a++){
		var pass = true;
		for (var i=0 ; i<rutas_directas.length ; i++){
			if (rutas_ini[a] == rutas_directas[i])
				pass = false;
		}

		if (pass)
			rutas_iniT.push(rutas_ini[a]);
	}


	for(var a=0 ; a<rutas_fin.length ; a++){
		var pass = true;
		for (var i=0 ; i<rutas_directas.length ; i++){
			if (rutas_fin[a] == rutas_directas[i])
				pass = false;
		}

		if (pass)
			rutas_finT.push(rutas_fin[a]);
	}


	for(var z=0 ; z<rutas_iniT.length ; z++){
		var cara="0";
		for(var w=0 ; w<rutas_finT.length ; w++){
			var sello="1";
			for(var i=0 ; i<array.length ; i++){
				
				
				if(array[i].fields.nombre_ruta == rutas_iniT[z])
					cara = array[i].fields.nombre_estacion;

				if(array[i].fields.nombre_ruta == rutas_finT[w])
					sello = array[i].fields.nombre_estacion;
				if(cara == sello){
					rut = tiempoXruta({"id":"trans" , "ruta":{"estacion":cara, "ruta1":rutas_iniT[z], "ruta2":rutas_finT[w] } , "tiempo":0} , array , est1 , est2 );
					rutas.push(rut);
					break;	
				}
				
					
			}
			
		}
	}
	
	return rutas;

	
}












