
/**
*	show_functions()
*	
*	Muestra los botones del panel desplegable izquierdo
*/
function show_functions() {
	aux=0;
    var functionList=[
        /*{title:'Elegir longitud de la ruta',function:'setRouteLength'},   */ 
        /*{title:'Mostrar sitios de interes',function:'showSites'},*/
    ];
    var liststring ='';
    functionList.forEach(function(element) {
        liststring = liststring +  '<li><a href="#" onclick="'+element.function+'()">'+ element.title +'</a></li>';
    }, this);
    var list = $('#listfunctions');
    var listcontent = $(liststring);
    list.html(liststring);
    list.trigger('create');
}


/**
*	LRSmeasure(position)
*
*	Devuelve el punto kilométrico correnpondiente a un punto geométrico de la ruta de santiago
*
* @param {Geometry}	position punto geométrico sobre el que calcular el p. kilométrico
* @return {Promise}	número que representa el punto kilométrico
*/
async function LRSmeasure(position){
    //cuerpo
    var LRSmeasureWPS =`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="2.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:LRSMeasure</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="2.0.0" outputFormat="GML2" xmlns:ide2020a="http://itastdevserver.tel.uva.es/IDE2020A">
            <wfs:Query typeName="ide2020a:CaminoCompleto"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>from_measure_attb</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>start</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>to_measure_attb</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>end</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>point</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt"><![CDATA[Point(${position.flatCoordinates[0]} ${position.flatCoordinates[1]})]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute> 
`;
    
	// then post the request and add the received features to a layer
	return fetch("/geoserver/wps", {
			method: "POST",
			headers: {
				"Content-Type": "application/xml; charset=UTF-8"
			},
			body: LRSmeasureWPS
	}).then(function(response) {
		return response.text();
	}).then(function(json){
    if(json.charAt(0)=='<'){
      alert("Ha habido un error en la consulta con el servidor GeoServer");
      return -1;
    }
    var features = new ol.format.GeoJSON().readFeatures(json);
  
	return Promise.resolve(features[0].values_.lrs_measure);		 											  
	});
}


/**
*	processQuery(elem,geometria)
*
*	Devuelve un array con las features de interés, filtradas en un radio alrededor de la geometría dada.
*	Utiliza un cuerpo genérico al que añadirle los parámetros dispuestos en la variable elem.
*	También realiza una conversion de XML a Features para que sean mostradas.
*
* @param {Array} elem Array con la información necesaria para realizar la consulta al servidor IDEE oportuno.
* @param {Geometry} geometria Geometría de referencia para calcular las Features de interes cercanas.
* @return {Promise}	Conjunto de Features listas para mostrar.
*/
async function processQuery(elem,geometria){
	// then post the request and add the received features to a layer

   if(aux==0){
	coordinatesArray="";
	var geometry = geometria.simplify(200);
	geometry.transform("EPSG:3857","EPSG:4258");
	var geometrycoords = geometry.getFlatCoordinates();
	
	//Bucle que añade todas las coordenadas de la geometria a un array para la consulta
	for(i=0; i<geometrycoords.length; i+=2){
			coordinatesArray += geometrycoords[i+1] + "," + geometrycoords[i] + " ";
	}
	aux=1;
   }
	
	
	//Cuerpo de la petición
    var layerWPS =`<wfs:GetFeature service="WFS" version="1.1.0"
                xmlns:wfs="http://www.opengis.net/wfs"
                xmlns:ogc="http://www.opengis.net/ogc"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:net="http://inspire.ec.europa.eu/schemas/net/4.0"
                xsi:schemaLocation="http://www.opengis.net/wfs
                                    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="${elem.prefix}:${elem.typeName}">
    <ogc:Filter>
      <ogc:DWithin>
        <ogc:PropertyName>${elem.geom}
        </ogc:PropertyName>
        <gml:LineString srsName="urn:ogc:def:crs:EPSG::4258">
          <gml:coordinates>${coordinatesArray}</gml:coordinates>
        </gml:LineString>
        <ogc:Distance units="degrees">0.1</ogc:Distance>
      </ogc:DWithin>
    </ogc:Filter>
  </wfs:Query>
</wfs:GetFeature>
`;
   console.log("Querying " + elem.name); 
	// then post the request and add the received features to a layer
	return fetch(elem.wfs, { 
			               method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var doc = ol.xml.parse(gml);
					var colls = doc.getElementsByTagName("wfs:FeatureCollection");
					if (colls.length == 0) {
						console.log('ERROR: ' + gml);
					}
					var coll = colls[0];
                    // Valores específicos para nuestras consultas, además de los dados mediante el parámetro elem
					var options={
						dataProjection: 'EPSG:4258',
						featureProjection: 'EPSG:3857',
						srsName: 'EPSG:3857', //proyeccion de openlayers
						featureNS: elem.ns,
						featurePrefix: elem.prefix,
						featureType: elem.typeName
						};
					var wfsformat = new ol.format.GML(options);

					// Parche para leer el GML del WPS de Geoserver.
					wfsformat.readFeaturesJP = function(node) {
						var features = [];
						if (node) {
							var childNodes = node.childNodes;
							for(var i=0; i<childNodes.length; i++) {
								if (childNodes[i].localName == 'featureMember') {
									var featureNode = childNodes[i].childNodes[0];

									var featureName = elem.name;
									var namenodes = childNodes[i].getElementsByTagName("gn:text");
									
									if (namenodes.length>0) {
									featureName = namenodes[0].innerHTML;
									}

									childNodes[i].getElementsByTagName(elem.geoPrefix+":geographicalName")[0].remove();
									//SI lo que nos devuelve es una node list debemos recorrer el array
                                    //no será readFeatures si no otra función
                                    //readFeature tampoco funciona
										var feature = this.readFeatures(childNodes[i]);
										if(feature) {
											//En vez de getGeometry... algo que apliquemos a un nodelist
											feature.getGeometry().applyTransform(function(input, opt_output, opt_dimension) {
											  for (var i = 0, ii = input.length; i < ii; i=i+3) {
												  var coord1 = input[i];
												  var coord2 = input[i+1];
												  var coord3 = input[i+2];
												  opt_output[i] = coord2;
												  opt_output[i+1] = coord1;
												  opt_output[i+2]= coord3;
												}
											  return opt_output;
											});	
											feature.getGeometry().transform("EPSG:4258","EPSG:3857");
											feature.setProperties({
												name: featureName
											});
											features.push(feature);
										}
								/*	}else{
										var featureNode = this.readFeatures(childNodes[i].getElementsByTagName("gml:pos")[0].innerHTML);
										if(featureNode){
											featureNode.getGeometry().transform("EPSG:4258","EPSG:3857");
											featureNode.setProperties({
												name: featureName
											});
											features.push(featureNode);		
										}										
									}
*/
								}
							}
						}
						return features;      
					};  
           			var features = wfsformat.readFeaturesJP(coll);
					return Promise.resolve(features);
				});
}

// funcion para mostrar la capa del camino completo

/**
*	showFullRoute()
*
*	Añade la capa que representa la ruta completa del camino de santiago al mapa.
*	Esta se descarga desde GeoServer
*/
function showFullRoute(){
    var wms =new ol.layer.Image({
        name: ' CaminoCompleto',
        source: new ol.source.ImageWMS({
          url: '/geoserver/wms',
          params: {'LAYERS': 'ide2020a:CaminoCompleto'},
          serverType: 'geoserver'
        })
      });
      map.getLayers().insertAt(1, wms);
    add_layer_to_list(wms);
  }


/**
*	setDestination()
*
*	Recoge el punto donde clicka el usuario, lo marca como destino, obtiene el origen de la ruta 
*	y obtiene la Feature que representa la ruta del usuario. Se encarga también de pintarla en el mapa.
*/
async function setDestination(){
	aux=0;
    //Comprobamos si ya existe una ruta
    if(routeCreated==true){
        if(!confirm("Ya existe una ruta. ¿Desea sobreescribirla?")){
            return;
        }
		//Elimina la capa con la ruta anterior
		map.getLayers().removeAt(4)
    }

	//Punto sobre el que se ha hecho click
	destinationPos = markerFeature.getGeometry().transform(geolocation.getProjection(),"EPSG:4258") 
	
    //Se comprueba que haya seleccionado un destino en el mapa
	if(destinationPos == null){
		alert("Escoja un punto de destino antes de ejecutar la función");
	}else{
		getOriginKM().then(function(originKM){ //Geolocalización del usuario
			
			LRSmeasure(destinationPos).then(function(destinationKM){ //Punto kilométrico más cercano al punto geométrico seleccionado
				
				//nos devuelve la ruta
				LRSSegment(parseInt(originKM), parseInt(destinationKM)).then(function(featureRoute){				   
					src = 'EPSG:4258';
					dest = 'EPSG:3857';
					featureRoute.getGeometry().transform(src, dest); 

				   routeCreated=true;
				   //La pintamos en el mapa
				   drawRoute(featureRoute);
				});
			});
		}).catch((error)=>{""});
	}
}

/**
*	setRouteLength()
*
*	Pregunta la longitud de la ruta del usuario, obtiene el origen por GPS y calcula la Feature de la ruta.
*	Se encarga también de pintarla en el mapa
*/
async function setRouteLength(){
			aux=0;
    //Comprobamos si ya existe una ruta
    if(routeCreated==true){
        if(!confirm("Ya existe una ruta. ¿Desea sobreescribirla?")){
            return;
        }
		//Elimina la capa con la ruta anterior
//map.getLayers().removeAt(4);
    }
	
    //lengthKM=1000*prompt("Introduce la distancia que deseas andar (en Km)");
    km = document.getElementById("km").value;
    lengthKM=1000*km;
    getOriginKM().then(function(originKM){
    	//Nos devuelve la ruta
        LRSSegment(parseInt(originKM), parseInt(originKM)+parseInt(lengthKM)).then(function(featureRoute){
            
            //Reporoyeccion
            //src = featureRoute.getGeometry.getProjection();
            src = 'EPSG:4258';
            dest = 'EPSG:3857';
            featureRoute.getGeometry().transform(src, dest); 

           drawRoute(featureRoute);
         
           routeCreated=true;
        });
    }).catch((error)=>{""});
}

/**
*	showSites(linegeometry)
*
*	Calcula los sitios de interés cercanos a la ruta del usaurio (consultas externas) y las muestra en el mapa.
*
*	@param {Feature} linegeometry Feature que contiene la ruta del usuario sobre la que se calculan los sitios cercanos
*/
function showSites(linegeometry){
	
    //si no se ha introducido ni un destino ni una distancia a andar, 
    //Se avisa al usuario ya que es necesario para esta función.
    if(routeCreated==false){
        setRouteLength();
	}else{
		//Array doble en el que se almacena la info necesaria para cada consulta externa
		var fuentesDatos = [  
						{
							name: "Aeropuertos",
							wfs: "https://servicios.idee.es/wfs-inspire/transportes",
							ns: "http://inspire.ec.europa.eu/schemas/tn-a/4.0",
							prefix: "tn-a",
							typeName: "AerodromeArea",
							geom: "net:geometry",
							geoPrefix: "tn"
							}, 
							{
							name: "Estaciones",
							wfs: "https://servicios.idee.es/wfs-inspire/transportes",
							ns: "http://inspire.ec.europa.eu/schemas/tn-ra/4.0",
							prefix: "tn-ra",
							typeName: "RailwayStationNode",
							geom: "net:geometry",
							geoPrefix: "tn"
							},
							{
							name: "Areas",
							wfs: "https://servicios.idee.es/wfs-inspire/transportes",
							ns: "http://inspire.ec.europa.eu/schemas/tn-ro/4.0",
							prefix: "tn-ro",
							typeName: "RoadServiceArea",
							geom: "net:geometry",
							geoPrefix: "tn"
							},
							{
							name: "Hitos",
							wfs: "https://servicios.idee.es/wfs-inspire/transportes",
							ns: "http://inspire.ec.europa.eu/schemas/tn/4.0",
							prefix: "tn",
							typeName: "MarkerPost",
							geom: "net:geometry",
							geoPrefix: "tn"
							},
							{
							name: "Cuencas",
							wfs: "https://servicios.idee.es/wfs-inspire/hidrografia",
							ns: "http://inspire.ec.europa.eu/schemas/hy-p/4.0",
							prefix: "hy-p",
							typeName: "RiverBasin",
							geom: "hy-p:geometry",
							geoPrefix: "hy-p"
							}
						]
						
		fuentesDatos.forEach(function(elem){ 
			if(document.getElementById(elem.name).checked){
				 processQuery(elem, linegeometry).then(function(features){
					console.log('Adding results for ' + elem.name );
					 drawPoints(features,elem.name);
				 }).catch(function(error){
					 console.log("Error con " + elem.name + " detalles: " + error);
				 });
			}
		});
	};
}

/**
*	getOriginKM()
*
*	Devuelve el punto kilométrico correspondiente al punto mas cercano (dentro de la ruta) a la posicion GPS del usuario.
*
*	@return {Promise} Entero que representa el punto kilométrico de origen.
*/
async function getOriginKM(){
	
     //Comprobamos que el usuario ha permitido localizar su ubicación al navegador
    if(geolocation.getPosition()==null)
    {
		//alert("Permita compartir ubicación Prueba2");
        return;
    }
    
    var posicion = geolocation.getPosition();
    var inicio= new ol.geom.Point(posicion);
    
    inicio.transform(geolocation.getProjection(),"EPSG:4258");
    return LRSmeasure(inicio); //Nos devuelve un punto km de la ruta.
}


/**
* LRSSegment(originKM, destinationKM)
* 
* Calcula el segmento de ruta a partir de los KM de origen y destino
*
* @param {int} originKM p. kilométrico de origen
* @param {int} destinationKM p. kilométrico de destino
* @return {promise} Feature que contiene la ruta del usuario
*
*/
function LRSSegment(originKM, destinationKM){

	//Caso en el que el usuario "pincha" un destino "hacia atras"
	if (originKM > destinationKM){
		var auxiliar=originKM;
		var originKM=destinationKM;
		var destinationKM=auxiliar;
	}

	//Cuerpo de la consulta
	var varLRSSegment=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="2.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:LRSSegment</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="2.0.0" outputFormat="GML2" xmlns:ide2020a="http://itastdevserver.tel.uva.es/IDE2020A">
            <wfs:Query typeName="ide2020a:CaminoCompleto"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>from_measure_attb</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>start</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>to_measure_attb</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>end</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>from_measure</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>${originKM}</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>to_measure</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>${destinationKM}</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
			
			// then post the request and add the received features to a layer
			return fetch("/geoserver/wps", {
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: varLRSSegment
			  }).then(function(response) {
				return response.text();
			  }).then(function(json){
				  if(json.charAt(0)=='<'){
					alert("Ha habido un error en la consulta con el servidor GeoServer");
					return -1;
				  }
				  var features = new ol.format.GeoJSON().readFeatures(json);

				  return Promise.resolve(features[0]);				    
		    });


	
}

/**
*	drawRoute(featureRoute)
* 
*	Dibuja la ruta que recibe como parámetro 
*
* 	@param {Feature} featureRoute Ruta del usuario a dibujar
*/
function drawRoute(featureRoute){
	var vectorSource = new ol.source.Vector();
	vectorSource.addFeature(featureRoute); 
	var vector = new ol.layer.Vector({
	name: 'RutaUsuario',
	  source: vectorSource,
	  style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(204, 0, 102, 1.0)',
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(204, 0, 102, 1.0)',
				width: 6
			})
	  })
	});

	map.getLayers().setAt(4, vector);
	//add_layer_to_list(vector); //traceroute=1;
	//map.getLayers();
	showSites(featureRoute.getGeometry());
}


/**
*	drawPoints(features, layerName)
* 
*	Dibuja las geometrías de un conjunto de features y les asigna una etiqueta con el nombre.
*
* 	@param {Feature} features Conjunto de Features a dibujar
* 	@param {String} layerName Almacena los nombres de cada Feature a mostrar

*/
function drawPoints(features,layerName){

	switch(layerName) {
	  case "Aeropuertos":
		     var colorStroke= 'rgba(255, 179, 0, 1.0)';
		     var colorFill= 'rgba(255, 179, 0, 0.3)';
		     var index=5;
			 var srcPath = './pix/plane.png';
		break;
	 case "Estaciones":
		     var colorStroke= 'rgba(0, 69, 125, 1.0)';
		     var colorFill= 'rgba(0, 69, 125, 0.3)';
		     var index=6;
			 var srcPath = './pix/train.png';
		break;
	 case "Areas":
		     var colorStroke= 'rgba(12, 194, 124, 1.0)';
		     var colorFill= 'rgba(12, 194, 124, 0.3)';
		     var index=7;
			 var srcPath = './pix/picnic.png';
		break;
	 case "Hitos":
		     var colorStroke= 'rgba(0, 179, 0, 1.0)';
		     var colorFill= 'rgba(0, 179, 0, 0.3)';
		     var index=8;
			 var srcPath = './pix/picnic.png';
		break;
	case "Cuencas":
		     var colorStroke= 'rgba(255, 0, 0, 1.0)';
		     var colorFill= 'rgba(255, 0, 0, 0.3)';
		     var index=9;
			 var srcPath = './pix/picnic.png';
		break;
	  default:
			 var colorStroke= 'rgba(12, 194, 124, 1.0)';
		     var colorFill= 'rgba(12, 194, 124, 0.3)';
		     var index=9;
			 var srcPath = './pix/picnic.png';
		break;
	}

	var vectorSource = new ol.source.Vector();
	vectorSource.addFeatures(features);
	var style = new ol.style.Style({
			image: new ol.style.Icon({
			  anchor: [0.5, 0.5],
			  size: [52, 52],
			  offset: [0, 0],
			  opacity: 1,
			  scale: 0.8,
			  src: srcPath
			}),
			stroke: new ol.style.Stroke({
				color: colorStroke,
				width: 3
			}),
			fill: new ol.style.Fill({
				color: colorFill
			}),
			text: new ol.style.Text({
				  font: '12px Calibri,sans-serif', 
				  offsetY: 25,
				  fill: new ol.style.Fill({color: colorStroke}),
				  stroke: new ol.style.Stroke({color: 'rgba(255, 255, 255, 1.0)', width: 2}),
				  placement: 'point'
			})
	  })
	var vector = new ol.layer.Vector({
	name: layerName,
	  source: vectorSource,
	  style: function(feature){
		  style.getText().setText(feature.get('name').trim());
		  return style;
	  }
	});
	
	//añadimos la capa
   
	map.getLayers().setAt(index, vector);
	//add_layer_to_list(vector);
}
