
$('#mappage').on("pageinit", function(){
  add_demo_functions();
  initmap();
  initApp();
  WFSQueryCoches();
});

// El calculo de nuestra ruta
$("#apptst").click(function(){
     tst();
});

/**
* Función encargada de implementar los pasos necesariso para obtener la ruta
* entre los dos puntos y mostrarla en el mapa
*/	
async function tst(){
	
	// Comprobación de que haya marcado un orgien y destino al calcular la ruta
	if(geolocation.getPosition()==null){
		toast("Habilite la geolocalización");
		return;
	}else if(markerFeature.getGeometry()==null){
		toast("Marque un punto de destino");
		return;
	}
	toast("Calculando ruta al destino");
	
	var aux1 = geolocation.getPosition();
	var aux2 = markerFeature.getGeometry().getCoordinates();
	var origen=new ol.geom.Point([aux1[0],aux1[1]]);
	var destino=new ol.geom.Point([aux2[0],aux2[1]]);
	var destinoPuntoRecarga=new ol.geom.Point([0,0]);

	var origen2 = origen;
	var destino2 = destino;

	origen.transform("EPSG:3857","EPSG:4258");
	destino.transform("EPSG:3857","EPSG:4258");
	
	var contador = 0;
	var llegada=0;
	var ptosIntermedios = new Array(6);
	
	while((contador<5)&&(llegada==0)){
		if(contador>0){
			origen2=ptoCerca;
		}

		var manharea = await CalculoManhattan(origen2, autonomia, ol.proj.get("EPSG:4258"));
		var ptosRecManh = await intersectManhattanRecarga(manharea);
		var ptoCerca = calculoDistancia(ptosRecManh, destino);
		ptoCerca.transform("EPSG:4326","EPSG:4258"); //Para que ptoCerca y destino estén en el mismo srs
		var distancia = await calculoDistancia2(ptoCerca,destino);
		if(distancia<0.03){//Valor de distancia optimizable (escogido de forma "práctica")
					destino2=destino;
					llegada=1;
		}else{
					destino2=ptoCerca;
		}

		var rutaLista = await CalculoRuta(origen2, destino2, ol.proj.get("EPSG:4258"));
		procesaruta(rutaLista);
		ptosIntermedios[contador]=destino2;//Se guarda el punto de recarga (o destino en la ultima iteración) para mostrarlos posteriormente
		
		if(contador==5){
					toast("Máximo de paradas alcanzado");
					break;
		}
		contador = contador + 1;
	}
	anadePto(ptosIntermedios);
	toast("Ruta obtenida correctamente");
}

/**
* Función que calcula y devuelve la distancia entre dos puntos pasados como parámetros
*/
function calculoDistancia2(punto1,punto2){
	var point1= punto1.getCoordinates();
	var point2= punto2.getCoordinates();

	var distance = Math.sqrt(Math.pow(point1[0]-point2[0],2)+Math.pow(point1[1]-point2[1],2));//Se calcula la distancia como el modulo de la diferencia de las coordenadas
	return Promise.resolve(distance);
	
}

/** 
* Función que obtiene y devuelve el punto más cercano a "destino" de entre los recogidos en "ptosRec"
*/
function calculoDistancia(ptosRec,destino){
	// Se obtiene el punto de destino
	var dest = destino.transform("EPSG:4258","EPSG:4326").getCoordinates();//Se cambia a  4326 porque los puntos de recarga vienen en ese sistema
	
	//Bucle para obtener la mínima distancia
	var minDistancia;	
	var featureIndex;
	var distancia;
	for(i=0;i<ptosRec.length;i++){
		
		coordenadas = ptosRec[i].getGeometry().getCoordinates();
		distancia = Math.sqrt(Math.pow(coordenadas[0]-dest[0],2)+Math.pow(coordenadas[1]-dest[1],2));//Se calcula la distancia como el modulo de la diferencia de las coordenadas
		if(i==0){
			minDistancia=distancia;
		}else if((distancia<=minDistancia)){
			//Se guarda la distancia y el indice del Point
			minDistancia = distancia;
			featureIndex = i;
		}
	}
	
	return ptosRec[featureIndex].getGeometry();
}

/**
* Función que realiza la petición correspondiente para obtener los puntos de recarga
* que se encuentran en la geometría "geom" y devolverlos
*/
async function intersectManhattanRecarga(geom){
		
		  var bodyPtosRecargaWFS =`<wfs:GetFeature service="WFS" version="1.1.0"
			  xmlns:topp="http://www.openplans.org/topp"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns="http://www.opengis.net/ogc"
			  xmlns:gml="http://www.opengis.net/gml"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019a:puntosrecarga">
				<Filter>
				  <Within>
					<PropertyName>geom</PropertyName>` + geom + `
					
					</Within>
				  </Filter>
			  </wfs:Query>
			</wfs:GetFeature>`;
			
		// then post the request and add the received features to a layer
			return fetch("/geoserver/wfs", { //sustituir por http://itastdevserver.tel.uva.es/IDE2019A
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: bodyPtosRecargaWFS
			  }).then(function(response) {
				return response.text();
			  },function(error){console.log(error);}).then(function(gml){
				  
				 var doc = ol.xml.parse(gml);
				 var wfsformat = new ol.format.GML();
				 
				 var features = wfsformat.readFeatures(gml);

				 return Promise.resolve(features);									  
		    });
}

/**
* Función que obtiene y devuelve una geometría calculada a partir de la distancia
* Manhattan entre un punto ("from") y de distancia ("distancia")
*/
function CalculoManhattan(from, distancia, projection){
	var origen= from.getCoordinates();
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;
	distancia=distancia*1000;

var layerWPS=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
    <ows:Identifier>org.cnig.cartociudad.wps.ManhattanGenerator</ows:Identifier>
    <wps:DataInputs>
        <wps:Input>
            <ows:Identifier>punto</ows:Identifier>
    <wps:Data>
                <wps:ComplexData mimeType="text/xml">        
      <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sp="http://localhost/singlepoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/singlepoint.xsd">
        <gml:featureMembers>
          <sp:singlepoint gml:id="1">
            <sp:geom>
              <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
                <gml:pos>${origen[0]} ${origen[1]}</gml:pos>
              </gml:Point>
            </sp:geom>
          </sp:singlepoint>
        </gml:featureMembers>
      </wfs:FeatureCollection>
    </wps:ComplexData>
        </wps:Data>
        </wps:Input>
  <wps:Input>
    <ows:Identifier>radio</ows:Identifier>
    <wps:Data>
      <wps:LiteralData>${distancia}</wps:LiteralData>
    </wps:Data>
  </wps:Input>
    </wps:DataInputs>
  <wps:ResponseForm>
    <wps:ResponseDocument>
      <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
        <ows:Identifier>result</ows:Identifier>
      </wps:Output>
    </wps:ResponseDocument>
  </wps:ResponseForm>
</wps:Execute>`;
    
return fetch("https://www.cartociudad.es/wps/WebProcessingService", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					//Se divide la respuesta gml para quedarnos con el nodo <au:geometry> con la geomtría del municipio
					var posInicial = gml.search("<gml:MultiSurface");
					var posFinal = gml.search("</gml:MultiSurface");
					var geometria = gml.substring(posInicial,posFinal + "</gml:MultiSurface>".length);// 14 es el numero de caracteres de </au:geometry>
					//A partir de <au:geometry> se obtiene el polígono del municipio (Polygon o Multipolygon)
					//var posFin = geometria.search("<n52:GEOMETRY>");
					//var geom = geometria.substring("<n52:GEOMETRY>".length,posFin);//13 es el numero de caracteres de <au:geometry>
					return Promise.resolve(geometria);
				});	
}

/**
* Función que calcula la ruta entre dos puntos pasados como parámetros
*/
function CalculoRuta(from, to, projection){
	var origen= from.getCoordinates();
	var destino= to.getCoordinates();
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;

var layerWPS=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
    <ows:Identifier>org.cnig.cartociudad.wps.RouteFinder</ows:Identifier>
    <wps:DataInputs>
        <wps:Input>
            <ows:Identifier>waypoints</ows:Identifier>
    <wps:Data>
                <wps:ComplexData mimeType="text/xml">        
      <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:wp="http://localhost/waypoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/waypoint.xsd">
        <gml:featureMembers>
          <wp:waypoint gml:id="1">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="${WPSSRSname}">
                <gml:pos>${origen[0]} ${origen[1]}</gml:pos>
              </gml:Point>
            </wp:geom>
          </wp:waypoint>
          <wp:waypoint gml:id="2">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="${WPSSRSname}">
                <gml:pos>${destino[0]} ${destino[1]}</gml:pos>
              </gml:Point>
            </wp:geom> 
          </wp:waypoint>
        </gml:featureMembers>
      </wfs:FeatureCollection>
    </wps:ComplexData>
        </wps:Data>
        </wps:Input>
    </wps:DataInputs>
  <wps:ResponseForm>
    <wps:ResponseDocument>
      <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
        <ows:Identifier>routeResult</ows:Identifier>
      </wps:Output>
      <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
        <ows:Identifier>instructionsResult</ows:Identifier>
      </wps:Output>
    </wps:ResponseDocument>
  </wps:ResponseForm>
</wps:Execute>
`;
    
return fetch("https://www.cartociudad.es/wps/WebProcessingService", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var doc = ol.xml.parse(gml);
					var colls = doc.getElementsByTagName("gml:FeatureCollection");
					if (colls.length == 0) {
						return Promise.reject(new Error('No hay respuesta del WPS de Cartociudad. Reintente.'));
					}
					var coll = colls[0];
                    // WPS uses random namespaces and Featuretypes each request.
					var ns = coll.getAttribute("xmlns:n52");
					var sufix = ns.substring("http://www.52north.org/".length);
					var featuretype = 'Feature-' + sufix;
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: ns,//poner el necesario en cada caso
						featurePrefix: 'n52',
						featureType: featuretype
						 }
				    // Register the alias for the SRS.
					proj4.defs(WPSSRSname, projection);
					var wfsformat = new ol.format.GML(options);
					var rutacoll =wfsformat.readFeatures(coll);
					return Promise.resolve(rutacoll);
				});	
}

/**
JPC: Hay que meter en una función el procesado para que se pueda hacer asíncronamente */				
function procesaruta(ruta) {
	
    var feat = ruta[0];
    feat.getGeometry().transform("EPSG:4258","EPSG:3857");
    rutaSourceLayer.addFeature(feat);
    var extent = rutaSourceLayer.getExtent();
    // Dirige el visor a la zona de interes.
	fly_to(map, null, extent);
	return;
}
		
/**
* Función para mostrar los puntos de recarga por los que se pasa
*/
function anadePto(puntos){
	// Se dibujarán también los puntos de recarga por los que se pasa
// JPC: Use previously created source.
	
	chargerSourceLayer.clear();
	for(i=0;i<puntos.length;i++){
						 var punto = puntos[i];
						 var drawPoint = new ol.Feature({
						  geometry: punto.transform("EPSG:4258","EPSG:3857"),
						 });
						 chargerSourceLayer.addFeature(drawPoint);
	}
	
	return;	
}
		
// Obtención de los puntos de recarga por municipio
$("#ptosMunicipio").click(function(){
     obtenerPtosRecargaMunicipio();
});

/**
* Función encargada de implementar los pasos necesarios para obtener los puntos de recarga
* situados en el municipio en el que se encuentra el usuario
*/
function obtenerPtosRecargaMunicipio(){ 

	  //Coordenadas actuales
	  var aux1 = geolocation.getPosition();
	  var aux = new ol.geom.Point([geolocation.getPosition()[0],geolocation.getPosition()[1]]);
	  var posicionActual = aux.transform("EPSG:3857","EPSG:4326").getCoordinates();
		
      // peticion a ign para obtener el municipio en el que se encuentra el usuario
      var bodyMunicipiosWFS =`<wfs:GetFeature service="WFS" version="1.1.0"
		  xmlns:topp="http://www.openplans.org/topp"
		  xmlns:wfs="http://www.opengis.net/wfs"
		  xmlns="http://www.opengis.net/ogc"
		  xmlns:gml="http://www.opengis.net/gml"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
		  <wfs:Query typeName="au:AdministrativeUnit">
			<Filter>
			  <And>
				<PropertyIsEqualTo>
					<PropertyName>nationalLevelName</PropertyName>
					<Literal>Municipio</Literal>
				 </PropertyIsEqualTo>
				<Intersects>
				  <PropertyName>geometry</PropertyName>
					<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
					  <gml:coordinates>` + posicionActual[1] + `,` + posicionActual[0] + `</gml:coordinates>
					</gml:Point>
				  </Intersects>
				</And>
			  </Filter>
		  </wfs:Query>
		</wfs:GetFeature>`;
      // then post the request
      fetch("https://www.ign.es/wfs-inspire/unidades-administrativas", {
           method: "POST",
       //    headers: {
       //        "content-type": "application/xml"
       //    },
           body: bodyMunicipiosWFS
	  }).then(function(response) {
        return response.text();
      }).then(function(gml) {
		//Se divide la respuesta gml para quedarnos con el nodo <au:geometry> con la geomtría del municipio
		var posInicial = gml.search("<au:geometry>");
		var posFinal = gml.search("</au:geometry>");
		var geometria = gml.substring(posInicial,posFinal + "</au:geometry>".length);
		//A partir de <au:geometry> se obtiene el polígono del municipio (Polygon o Multipolygon)
		var posFin = geometria.search("</au:geometry>");
		var geom = geometria.substring("<au:geometry>".length,posFin);
		
		// peticion a la BBDD para obtener los puntos de recarga mediante el municipio en el que se encuentra el usuario
		  var bodyPtosRecargaWFS =`<wfs:GetFeature service="WFS" version="1.1.0"
			  xmlns:topp="http://www.openplans.org/topp"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns="http://www.opengis.net/ogc"
			  xmlns:gml="http://www.opengis.net/gml"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019a:puntosrecarga">
				<Filter>
				  <Within>
					<PropertyName>geom</PropertyName>` + geom + `
					
					</Within>
				  </Filter>
			  </wfs:Query>
			</wfs:GetFeature>`;
			
			// then post the request and add the received features to a layer
			fetch("/geoserver/wfs", { //sustituir por http://itastdevserver.tel.uva.es/IDE2019A
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: bodyPtosRecargaWFS
			  }).then(function(response) {
				return response.text();
			  }).then(function(gml){
				  
				 //var doc = ol.xml.parse(gml);
				 var wfsformat = new ol.format.GML();		 
				 var features = wfsformat.readFeatures(gml);
				 
				 //Se dibujan los diferentes puntos de recarga
				 if(features.length==0){
					 toast("No hay puntos de recarga cercanos");
					 return;
				 }else{
					 
					 var sourceLayer = new ol.source.Vector({
							projection: 'EPSG:3857'
					 });
					 var vectorCustomLayer = new ol.layer.Vector({
							source: sourceLayer,
							style: new ol.style.Style({
									  image: new ol.style.Circle({
										fill: new ol.style.Fill({
										  color: 'rgba(255,10,0,1)'
										}),
										radius: 10,
										stroke: new ol.style.Stroke({
										  color: 'rgba(0,0,0,1)',
										  width: 2
										})
									  })									  
									})
						   
					 });
					 vectorCustomLayer.set("name", "Puntos de recarga cercanos");
					 map.addLayer(vectorCustomLayer);
					 add_layer_to_list(vectorCustomLayer);
					 
					 for(i=0;i<features.length;i++){
						 var feat = features[i];
						 feat.getGeometry().transform("EPSG:4326","EPSG:3857");
						 sourceLayer.addFeature(feat);
					 }

					 var extent = sourceLayer.getExtent();
					 // Dirige el visor a la zona de interés.
					 fly_to(map, null, extent);
				 }											  
		    });
	  });
}

function imprimeRadioButtonMarca(marcas){
		
	//create your innerHTML container var:
	var innerHTML = '';
	//iterate through your array:
	for (var i=0;i<marcas.length;i++)
	{
		if(i==0){
			innerHTML += '<input name="marca" id="'+ marcas[i] + '" value="'+ marcas[i] + '" type="radio" checked="checked"/><label for="'+ marcas[i] +'">'+ marcas[i] + '</label>';
		}else{
			innerHTML += '<input name="marca" id="'+ marcas[i] + '" value="'+ marcas[i] + '" type="radio" /><label for="'+ marcas[i] +'">'+ marcas[i] + '</label>';
		}
	}
	//now that you have your innerHTML - append it to the jQuery Mobile control group like this:
	$("#MarcasGrp").controlgroup("container").append(innerHTML);
	//and refresh the jQuery Mobile control group like this:
	$("#MarcasGrp").enhanceWithin().controlgroup("refresh");
}

function imprimeRadioButtonModelo(model, json){
	
	//create your innerHTML container var:
	var innerHTML = '';
	//iterate through your array:
	for (var i=0;i<model.length;i++)
	{
		if(i==0){
			innerHTML += '<input name="model" id="model-'+ model[i] + '" value="'+ model[i] + '" type="radio" checked="checked"/><label for="model-'+ model[i] +'">'+ model[i] + '</label>';
		}else{
			innerHTML += '<input name="model" id="model-'+ model[i] + '" value="'+ model[i] + '" type="radio" /><label for="model-'+ model[i] +'">'+ model[i] + '</label>';
		}
	}
	
	//Obtenemos la autonomía de la primera opcion
	json.features.forEach(function(value){
		if(value.properties.modelo=== model[0]){
			autonomia = value.properties["rangokm"];
			console.log(autonomia);
		}
	});
	
	// empty your group container
	$("#ModeloGrp").controlgroup("container").empty();
	//now that you have your innerHTML - append it to the jQuery Mobile control group like this:
	$("#ModeloGrp").controlgroup("container").append(innerHTML);
	//and refresh the jQuery Mobile control group like this:
	$("#ModeloGrp").enhanceWithin().controlgroup("refresh");
}

function WFSQueryCoches(){

// generate a GetFeature request
  var bodyCochesWFS = `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat= "application/json"
		xmlns:topp="http://www.openplans.org/topp"
		xmlns:wfs="http://www.opengis.net/wfs"
		xmlns:ogc="http://www.opengis.net/ogc"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			<wfs:Query typeName="ide2019a:coches">
			</wfs:Query>
		</wfs:GetFeature>`;

      // then post the request and add the received features to a layer
      fetch("/geoserver/wfs", { //sustituir por http://itastdevserver.tel.uva.es/IDE2019A
           
		   method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'no-cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
           headers: {
               "Content-Type": "application/xml; charset=UTF-8"
           },
           body: bodyCochesWFS
	  }).then(function(response) {
		return response.json();
	  }).then(function(json){
	  	//console.log(JSON.stringify(json)); //for debug
		//features: cada uno de los coches
		//Empty array creation
		var marcas = [];
		json.features.forEach(function(value){
			marcas.push(value.properties["marca"]);
		});
		//Eliminamos las marcas repetidas
		var marcasUnicas = marcas.filter(function(elem, index,self){
			return index === self.indexOf(elem);
		});
		
		//Imprimos por pantalla los radio buttons de las marcas con
		//la primera seleccionada y los modelos asociados a esta
		imprimeRadioButtonMarca( marcasUnicas);
		marcaElegida= $("#MarcasGrp :radio:checked").val();
		var modelo = [];
		json.features.forEach(function(value){
			if(value.properties["marca"]=== marcaElegida){
				modelo.push(value.properties["modelo"]);
			}
		});
		imprimeRadioButtonModelo(modelo, json);
		//modeloElegido=json[0].properties["modelo"];
		//autonomia=json[0].properties["rangokm"];
			
			
		 $("input[name='marca']").on("change", function() {
			marcaElegida=$("input[name='marca']:checked").val();
			console.log(marcaElegida);
			var modelo = [];
			json.features.forEach(function(value){
				if(value.properties["marca"]=== marcaElegida){
					modelo.push(value.properties["modelo"]);
				}
			});
			imprimeRadioButtonModelo(modelo, json);
		});
		
		$("body").on("change", "input[name='model']:radio", function() {
			modeloElegido=$("input[name='model']:checked").val();
			json.features.forEach(function(value){
				if(value.properties.modelo=== modeloElegido){
					autonomia=value.properties["rangokm"];
					console.log(autonomia);
				}
		});
		
	  });
    });
}

 /*-------------------------------Initialize app -------------*/
function initApp() {
     /**
     * Location searching panel
     */
    $("#autocomplete").on("filterablebeforefilter", function (e, data) {
      var $ul = $(this),
          value = $(data.input).val(),
          html = "";
      $ul.html(html);
      if (value && value.length > 2) {
          $.mobile.loading("show", {
              text: 'searching',
              textVisible: true,
              theme: "b"
          });
          openStreetMapGeocoder.geocode(value, function (response) {
              if (response[0] === false) {
                  $ul.html("<li data-filtertext='" + value + "'>" + "noresults" + "</li>");
              } else {
                  $.each(response, function (i, place) {
                      $("<li data-filtertext='" + value + "'>")
                          .hide().append($("<a href='#'>").text(place.totalName)
                              .append($("<p>").text(place.type))
                          ).appendTo($ul).click(function () {
                              var extent = [];
                              extent[0] = parseFloat(place.boundingbox[2]);
                              extent[1] = parseFloat(place.boundingbox[0]);
                              extent[2] = parseFloat(place.boundingbox[3]);
                              extent[3] = parseFloat(place.boundingbox[1]);
                              extent = ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
                              fly_to(map, null, extent);
                              $('#searchpanel').panel("close");
                          }).show();
                  });
              }
              $ul.listview("refresh");
              $ul.trigger("updatelayout");
              $.mobile.loading("hide");
          });
      }
  });
  // Scroll to collapsible expanded
  $("#infopanel").on("collapsibleexpand", "[data-role='collapsible']", function (event, ui) {
      var innerinfopanel = $("#infopanel .ui-panel-inner");
      innerinfopanel.animate({
          scrollTop: parseInt($(this).offset().top - innerinfopanel.offset().top
              + innerinfopanel.scrollTop())
      }, 500);
  });
  // Set a max-height to make large images shrink to fit the screen.
  $(document).on("popupbeforeposition", function () {
      var maxHeight = $(window).height() - 200 + "px";
      $('.ui-popup [data-role="content"]').css("max-height", maxHeight);
  });
  // Remove the popup after it has been closed to manage DOM size
  $(document).on("popupafterclose", ".ui-popup:not(#popupdialog)", function () {
      $(this).remove();
      select.getFeatures().clear();
  });
  $(document).on("click", "#acceptupdates", function () {
      infomsgs = [];
  });
  // Redraw map
  // Customize this
  $(window).on("pagecontainershow resize", function (event, ui) {
      $.mobile.resetActivePageHeight();
      var pageId = $.mobile.pageContainer.pagecontainer('getActivePage').prop("id");
      if (pageId === 'mappage') {
          if (event.type === "resize") {
              setTimeout(function () {
                  map.updateSize();
              }, 200);
          } else {
              map.updateSize();
              // Do something smart in this update
              //fit_map_to_layer(sourceLayer);
          }
      } else if (pageId === 'historypage') {
          if (event.type === 'pagecontainershow') {
              alert("show something");
          }
      } else if (pageId === 'questionpage') {
          if (event.type === 'pagecontainershow') {
              if (lastsuccessfulstage.question === '') {
                  $.mobile.pageContainer.pagecontainer("change", "#mappage");
              } else {
                  alert("set something");
              }
          }
      }

  });
  
  //Buttons events
  $('#autolocate').on('click', function () {
      autolocate(true);
  });
  $('#infopanel').panel({
      beforeclose: function () {
          select.getFeatures().clear();
      }
  });

  /*-------------------------------Initialize page -------------*/
  if ($.mobile.autoInitializePage === false) {
      $("#container").show();
      $("#loader").remove();
      $.mobile.initializePage();
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, ' +
          'maximum-scale=1.0, user-scalable=0,target-densitydpi=medium-dpi');
  }
}
/**
 * @param {*} cdemo 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cdemo, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cdemo + "=" + cvalue + "; " + expires;
}
function getCookie(cdemo) {
    var demo = cdemo + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(demo) == 0) {
            return c.substring(demo.length, c.length);
        }
    }
    return "";
}
function checkCookie(cookiename, redirect) {
    var demo = getCookie(cookiename);
    if (demo == "false") {
        document.location.href = redirect;
    }
    setCookie(cookiename, false, 1000);
}
/*-------------------------------Helper functions -------------*/
function toast(msg) {
  if ($(".toast").length > 0) {
      setTimeout(function () {
          toast(msg);
      }, 2500);
  } else {
      $("<div class='ui-loader ui-overlay-shadow  ui-corner-all toast'>" +
          "<p>" + msg + "</p></div>")
          .css({
              left: ($(window).width() - 284) / 2,
              top: $(window).height() / 8
          })
          .appendTo($.mobile.pageContainer).delay(3000)
          .fadeOut(400, function () {
              $(this).remove();
          });
  }
}
function create_popup(type, title, body) {
  var header = $('<div data-role="header"><h2>' + title + '</h2></div>'),
      content = $('<div data-role="content" class="ui-content ui-overlay-b">' + body
          + '</div>'),
      popup = $('<div data-role="popup" id="' + type + '"' +
          'data-theme="b" data-transition="slidedown"></div>');
  if (type === 'info') {
      $('<a href="#" data-rel="back" class="ui-btn ui-corner-all' +
          'ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>').appendTo(header);
  }
  if (type === 'displayupdates') {
      $('<p class="center-wrapper"><a id="acceptupdates" href="#" data-rel="back"'
          + 'class="ui-btn center-button ui-mini ui-btn-inline">'
          + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  if (type === 'displayerror') {
      $('<p class="center-wrapper"><a href="view.php?id=' + cmid +
          '" class="ui-btn  center-button ui-mini ui-icon-forward ui-btn-inline ui-btn-icon-left"'
          + 'data-ajax="false">' + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  // Create the popup.
  $(header)
      .appendTo($(popup)
          .appendTo($.mobile.activePage)
          .popup())
      .toolbar()
      .after(content);
  // Need it for calculate popup's dimesions when popup contents an image.
  totalimg = $(content).find('img');
  if (totalimg.length > 0) {
      $.mobile.loading("show");
      totalimg.one('load', function () {
          imgloaded++;
          if (totalimg.length === imgloaded) {
              open_popup(popup);
              imgloaded = 0;
              // Clear the fallback
              clearTimeout(fallback);
              $.mobile.loading("hide");
          }
      });
      // Fallback in case the browser doesn't fire a load event
      var fallback = setTimeout(function () {
          open_popup(popup);
          $.mobile.loading("hide");
      }, 2000);
  } else {
      open_popup(popup);
  }


}
function open_popup(popup) {
  // Because chaining of popups not allowed in jquery mobile.
  if ($(".ui-popup-active").length > 0) {
      $(".ui-popup").popup("close");
      setTimeout(function () {
          $(popup).popup("open", { positionTo: "window" });
      }, 1000);
  } else {
      $(popup).popup("open", { positionTo: "window" });
  }

}
function get_block_text(title, body) {
  return '<div class="ui-bar ui-bar-a">' + title +
      '</div><div class="ui-body ui-body-a">' + body +
      '</div>';
}

