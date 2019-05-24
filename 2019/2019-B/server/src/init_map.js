var dibujo = 0;
var calculo = 0;
var geometria;
function initmap() {

    openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
    /*-------------------------------Styles-----------------------------------*/
    var text = new ol.style.Text({
        textAlign: 'center',
        scale: 1.3,
        fill: new ol.style.Fill({
            color: '#fff'
        }),
        stroke: new ol.style.Stroke({
            color: '#000',
            width: 3.5
        })
    });
    var selectText = new ol.style.Text({
        textAlign: 'center',
        scale: 1.4,
        fill: new ol.style.Fill({
            color: '#fff'
        }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 3.5
        })
    });

    var positionFeatureStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: [0, 0, 0, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 1],
                width: 2
            })
        })
    });
    var accuracyFeatureStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 0.3]
        }),
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 0.5],
            width: 1
        }),
        zIndex: -1
    });
    var markerFeatureStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 1,
            scale: 0.3,
            src: 'pix/flagmarker.png'
        })
    });
    /*-------------------------------Layers-----------------------------------*/
    var layers = [];
    var geoJSONFormat = new ol.format.GeoJSON();
    sourceLayer = new ol.source.Vector({
        projection: 'EPSG:3857'//Anterior 3857
    });
	var vectorCustomLayer;
    vectorCustomLayer = new ol.layer.Vector({
        source: sourceLayer,
    });
    var aeriallayer = new ol.layer.Tile({
        visible: false,
        source: new ol.source.BingMaps({
            key: 'AmC3DXdnK5sXC_Yp_pOLqssFSaplBbvN68jnwKTEM3CSn2t6G5PGTbYN3wzxE5BR',
            imagerySet: 'AerialWithLabels',
            maxZoom: 19
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
        })
    });
    aeriallayer.set("name", "aerialview");
    var roadlayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    roadlayer.set("name", "roadview");
    var layergroup = new ol.layer.Group({ layers: [aeriallayer, roadlayer] });
    var view = new ol.View({
        center: [-474521.071594, 4940889.508354],
        zoom: 6,
        minZoom: 2
    });
    select = new ol.interaction.Select({
        layers: [vectorCustomLayer],
        style: select_style_function,
        filter: function (feature, layer) {
            // Do something with marker
            if (feature.get('attr') === 0) {
                return false;
            }
            return true;
        }
    });
    var drag_rotate =ol.interaction.defaults().extend([
          new ol.interaction.DragRotateAndZoom()
        ]);
    
    var accuracyFeature = new ol.Feature();
    accuracyFeature.setStyle(accuracyFeatureStyle);
    var positionFeature = new ol.Feature();
    positionFeature.setStyle(positionFeatureStyle);
    var userPosition = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });
   
	//variables para las interacciones de ruta
	var draw;
	var modify;
	var typeSelect;
	var snap;
	var selectInteraction;

	//var gg = new OpenLayers.Projection("EPSG:4326");
	

    layers = [layergroup, userPosition,vectorCustomLayer];
    // New Custom zoom.
    var zoom = new ol.control.Zoom({ target: "navigation", className: "custom-zoom" });
    map = new ol.Map({
        layers: layers,
        controls:  ol.control.defaults({rotate: true, attribution: true}),
        //interactions: drag_rotate,
        target: 'map',
        view: view
        /*loadTilesWhileAnimating: true,
         loadTilesWhileInteracting: true*/
    });


    // Initialize the page layers.
    add_layergroup_to_list(layergroup);
    geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        tracking: true
    });
    /*-------------------------------Events-----------------------------------*/
    geolocation.on('change:position', function () {
        var coordinates = this.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
    });
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(this.getAccuracyGeometry());
        this.setTracking(false);
        $.mobile.loading("hide");
    });
    geolocation.on('error', function (error) {
        this.setTracking(false);
        $.mobile.loading("hide");
        toast(error.message);
    });
    /**
     * Customize this function
     */
    select.on("select", function (features) {
        if (features.selected.length === 1) {
            if (lastsuccessfulstage.position === features.selected[0].get('stageposition')
                && features.selected[0].get('geometrysolved') && !roadfinished && available) {
                $("#infopanel").panel("open");
                $("#lastsuccessfulstage").collapsible("expand");
            } else {
                var title, stagename = features.selected[0].get('name'),
                    stageclue = features.selected[0].get('clue'),
                    info = features.selected[0].get('info'), body = '';
                if (features.selected[0].get('geometrysolved')) {
                    if (stagename && stageclue) {
                        title = "stageovercome";
                        body = get_block_text("stagename", stagename);
                        body += get_block_text("stageclue", stageclue);
                    } else {
                        title = "discoveredlocation";
                    }
                } else {
                    title = "failedlocation";
                }
                if (info) {
                    body += '<p>' + info + '</p>';
                }
                create_popup('infostage', title, body);
            }
        }
    });

}
/*-------------------------------Functions-----------------------------------*/
function style_function(feature, resolution) {
    // Get the income level from the feature properties
    var stageposition = feature.get('stageposition');
    if (stageposition === 0) {
        var fill = new ol.style.Fill({
            color: 'rgba(255,255,255,0.4)'
        });
        var stroke = new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        });
        var styles = new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 5
            }),
            fill: fill,
            stroke: stroke,
            text: new ol.style.Text({
                text: "startfromhere",
                textAlign: 'center',
                fill: new ol.style.Fill({
                    color: 'rgb(255,255,255)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#3399CC',
                    width: 5
                })
            })
        });
        return [styles];
    }
    if (!feature.get('geometrysolved')) {
        failstageStyle.getImage().setScale((view.getZoom() / 50));
        failstageStyle.getText().setText('' + stageposition);
        return [failstageStyle];
    }
    defaultstageStyle.getImage().setScale((view.getZoom() / 110));
    defaultstageStyle.getText().setText('' + stageposition);
    return [defaultstageStyle];
}
function select_style_function(feature, resolution) {
    var stageposition = feature.get('stageposition');
    if (!feature.get('geometrysolved')) {
        failSelectstageStyle.getText().setText('' + stageposition);
        return [failSelectstageStyle];
    }
    defaultSelectstageStyle.getText().setText('' + stageposition);
    return [defaultSelectstageStyle];
}
function autolocate(center, validate) {
    center = center || false;
    validate = validate || false;
    
    $.mobile.loading("show");
    geolocation.setProperties({ center: center, validate_location: validate });
    var position= geolocation.getPosition();
    $.mobile.loading("hide");
    fly_to(map, position);
}


//FUNCION PARA DIBUJAR RUTA
function dibujar(){
	
	
	var collection = new ol.Collection();
	
	
	if(dibujo == 0){
		if (typeof(draw) !='undefined') {
			map.removeInteraction(draw);
		}
		
		if (typeof(modify) !='undefined') {
			map.removeInteraction(modify);
		}
		
		
			 draw = new ol.interaction.Draw({
				features: collection,
				source: sourceLayer,
				type: "LineString"
			  });
			  draw.on("drawend", function(event){
				  map.removeInteraction(draw);
				  geometria=event.feature;
				  //calcular(event.feature);
			  });
		 map.addInteraction(draw);
	
	dibujo=dibujo+1;
	}
	else{
		var opcion=confirm('Ya hay una ruta dibujada. �Desea empezar de nuevo?');
		if (opcion == true){
			location.reload();
		}
		else{
			
		}
		
	}
	
	
}

//FUNCION PARA EDITAR RUTA
function editar(){
	
	if (typeof(modify) !='undefined') {
		map.removeInteraction(modify);
	}
	
	 var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,
        toggleCondition: ol.events.condition.shiftKeyOnly
       
      });
	
	 modify = new ol.interaction.Modify({
		 source: sourceLayer,
		 features: selectInteraction.getFeatures()
		 });
     
	 modify.on('modifyend',function(event){
		map.removeInteraction(modify);
		
	});
	  
	map.addInteraction(modify);	  
	map.getInteractions().extend([selectInteraction, modify]);  
	
	
	  
}

//FUNCION PARA REALIZAR EL PROCESAMIENTO
async function calcular(){
	
	
	
	if(calculo==0){
		//wfs transaccional
		var WFS = new ol.format.WFS();
		var options={
		srsName: "EPSG:3857", //proyeccion de openlayers
		featureNS: 'http://itastdevserver.tel.uva.es/IDE2019B',//poner el necesario en cada caso
		featurePrefix: 'ide2019b',
		featureType: 'dron'
		 }

		 var node= WFS.writeTransaction([geometria],null,null,options);
		

		
		s = new XMLSerializer();
		str = s.serializeToString(node);
		fetch('/geoserver/ide2019b/wfs',{
		method: 'POST',
		body: str
		}).then(function (node){
			return node.text();
		}).then(function(res){
				var resultado=WFS.readTransactionResponse(res);
				

		});
		calculo=calculo+1;
	}
	else{
		var opcion=confirm('La ruta ya se ha calulado o esta en proceso. �Desea empezar de nuevo?');
		if (opcion == true){
			location.reload();
			vectorCustomLayer.removeAllFeatures();
		}
		else{
			
		}
	}
	
	
	//CONSULTAS WPS

	//Obtener el bounding box de la ruta para pasarlo a la consulta
	var b=geometria.values_.geometry.flatCoordinates;
	var minimoX=9999999999; var maximoX=-9999999999; var minimoY=9999999999; var maximoY=-9999999999;
	var xmin=0; var xmax=0; var ymin=0; var ymax=0;
	var j=0; var i=0;
	while(j==0)
	{
		if(i>b.length)
		{
			j=1;
		}
		else{
			if(i%2==0){
				if(b[i]<minimoX)
				{
					xmin=b[i];
					minimoX=xmin;
				}
				else if(b[i]>maximoX)
				{
					xmax=b[i];
					maximoX=xmax;
				}
			}
			else{
				if(b[i]<minimoY)
				{
					ymin=b[i];
					minimoY=ymin;
				}
				else if(b[i]>maximoY)
				{
					ymax=b[i];
					maximoY=ymax;
				}
			}
			
			i++;
		}
	}
	
	
	
	var BufferWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			<ows:Identifier>gs:BufferFeatureCollection</ows:Identifier>
			<wps:DataInputs>
				<wps:Input>
					<ows:Identifier>features</ows:Identifier>
					<wps:Reference mimeType="text/xml" xlink:href="http://localhost:8081/geoserver/wps" method="POST">
						<wps:Body><![CDATA[
							<wfs:GetFeature service="WFS" version="1.1.0" maxFeatures="20" outputFormat="GML2"
							  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
							  xmlns:wfs="http://www.opengis.net/wfs"
							  xmlns:ogc="http://www.opengis.net/ogc"
							  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
							  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
								<wfs:Query typeName="ide2019b:Aeropuertos-3857">
									<ogc:Filter>
										<ogc:And>
											<ogc:PropertyIsEqualTo>
												<ogc:PropertyName>tip_area</ogc:PropertyName>
												<ogc:Literal>1</ogc:Literal>
											</ogc:PropertyIsEqualTo>
											<ogc:BBOX>
												<ogc:PropertyName>geom</ogc:PropertyName>
												<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
													<lowerCorner>${xmin} ${ymin}</lowerCorner>
													<upperCorner>${xmax} ${ymax}</upperCorner>
												</Envelope>
											</ogc:BBOX>
										</ogc:And>
									</ogc:Filter>
								</wfs:Query>
							</wfs:GetFeature>
							
						]]></wps:Body>
					</wps:Reference>
				</wps:Input>
				<wps:Input>
					<ows:Identifier>distance</ows:Identifier>
					<wps:Data>
						<wps:LiteralData>10667</wps:LiteralData>
					</wps:Data>
				</wps:Input>
				</wps:DataInputs>
				<wps:ResponseForm>
					<wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
						<ows:Identifier>result</ows:Identifier>
					</wps:RawDataOutput>
				</wps:ResponseForm>
			</wps:Execute>`;
			
			
			
			var UnionWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			  <ows:Identifier>gs:UnionFeatureCollection</ows:Identifier>
			  <wps:DataInputs>
				<wps:Input>
				  <ows:Identifier>first</ows:Identifier>
				  <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="http://localhost:8081/geoserver/wfs" method="POST">
					<wps:Body><![CDATA[<wfs:GetFeature service="WFS" version="1.1.0"

			  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns:ogc="http://www.opengis.net/ogc"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019b:Aves-3857-Simpl">
				<ogc:Filter>
					 <ogc:BBOX>
					<ogc:PropertyName>geom</ogc:PropertyName>
					<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
					   <lowerCorner>${xmin} ${ymin}</lowerCorner>
					   <upperCorner>${xmax} ${ymax}</upperCorner>
					</Envelope>
				  </ogc:BBOX>     
				</ogc:Filter>
				</wfs:Query>
			</wfs:GetFeature>]]></wps:Body>
				  </wps:Reference>
				</wps:Input>
				<wps:Input>
				  <ows:Identifier>second</ows:Identifier>
				  <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="http://localhost:8081/geoserver/wfs" method="POST">
					<wps:Body><![CDATA[<wfs:GetFeature service="WFS" version="1.1.0"

			  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns:ogc="http://www.opengis.net/ogc"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019b:ParquesNaturales-3857-Simpl">
				<ogc:Filter>
					 <ogc:BBOX>
					<ogc:PropertyName>geom</ogc:PropertyName>
					<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
					   <lowerCorner>${xmin} ${ymin}</lowerCorner>
					   <upperCorner>${xmax} ${ymax}</upperCorner>
					</Envelope>
				  </ogc:BBOX>   
				</ogc:Filter>
				</wfs:Query>
			</wfs:GetFeature>]]></wps:Body>
				  </wps:Reference>
				</wps:Input>
			  </wps:DataInputs>
			  <wps:ResponseForm>
				<wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
				  <ows:Identifier>result</ows:Identifier>
				</wps:RawDataOutput>
			  </wps:ResponseForm>
			</wps:Execute>`;
			
			
			var CuentaWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			  <ows:Identifier>vec:Count</ows:Identifier>
			  <wps:DataInputs>
				<wps:Input>
				  <ows:Identifier>features</ows:Identifier>
				  <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
					<wps:Body>
					  <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B">
						<wfs:Query typeName="ide2019b:dron"/>
					  </wfs:GetFeature>
					</wps:Body>
				  </wps:Reference>
				</wps:Input>
			  </wps:DataInputs>
			  <wps:ResponseForm>
				<wps:RawDataOutput>
				  <ows:Identifier>result</ows:Identifier>
				</wps:RawDataOutput>
			  </wps:ResponseForm>
			</wps:Execute>`;
			
			
			
			
			
			
			var href='/geoserver/ide2019b/wps';
			var prefix = 'feature';
			var namespace = 'http://itastdevserver.tel.uva.es/IDE2019B';
			var featuretype = 'Aeropuertos-3857';
			var projection = ol.proj.get("EPSG:3857");
			var featuretype2 = 'Aves-3857-Simpl';
			var featuretype3='dron';
			
		   // Lanza la petición al WPS asíncrona. Se devuelve un objeto Promise. Hay que esperar a que se resuelva.
		   var buffercollection = await wpsclient_featurecollection(href, BufferWPS, prefix, namespace, featuretype, projection);//.then(function(featuresarray){});
		   // Lanza la petición al WPS asíncrona. Se devuelve un objeto Promise. Hay que esperar a que se resuelva.
		   var unioncollection = await wpsclient_featurecollection(href, UnionWPS, prefix, namespace, featuretype2, projection);
		   
		   
		   //LAnza una peticion al WPS asincrona para obtener el numero de rutas dibujas 
		   var cuenta = await wpsclient_count(href, CuentaWPS, prefix, namespace, featuretype3, projection);
		   var Rfid="dron." + cuenta;
		   
		   //consulta WFS para quedarme con la ultima ruta para realizar la interseccion posteriormente
		   var ruta=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2"
		  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
		  xmlns:wfs="http://www.opengis.net/wfs"
		  xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
		  <wfs:Query typeName="ide2019b:dron">
			<ogc:Filter>
				<ogc:FeatureId fid="dron.${cuenta}"/>
			</ogc:Filter>
			</wfs:Query>
		</wfs:GetFeature>`;
		   

		   var rutaDron = await wpsclient_featurecollection(href, ruta, prefix, namespace, featuretype3, projection);

			//unioncollection.concat(buffercollection);
			var union =[];
			union.push(buffercollection);
			union.push(unioncollection);
			
		   var GMLUnion = await writeGMLFeatureCollection(union, prefix, namespace, featuretype, projection);
		   var GMLUnionR = await writeGMLFeatureCollection(geometria, prefix, namespace, featuretype3, projection);
		   var GMLRuta = await writeGMLFeatureNode(b, prefix, namespace, featuretype3, projection);
			
			
			
	
	
}

/**
* Place WPS request.
* Example:
* 
*	var 
*	wpsclient_featurecollection(href, wpsbody, ol.proj.get("EPSG:4258")).then(function (featuresarray){});
*	
* @param {href} url of the server.
* @param {wpsbody} text content of the request.
* @param {namespace}  namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {featuretype} name of the featuretype. i.e. "Aeropuertos3587"
* @param {Projection} SRS of the input and output geometries.
* @return {Promise} with an array of {Feature} with the feature collection.
*/
function wpsclient_featurecollection(href, wpsbody, prefix, namespace, featuretype, projection){
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;
    
return fetch(href, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: wpsbody
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var doc = ol.xml.parse(gml);
					var colls = doc.getElementsByTagName("wfs:FeatureCollection");
					var coll = colls[0];
                    
					
					var options={
						srsName: projection.getCode(), //proyeccion de openlayers
						featureNS: namespace,//poner el necesario en cada caso
						featurePrefix: prefix,
						featureType: featuretype
						 }
				    // Register the alias for the SRS.
					proj4.defs(WPSSRSname, projection);
					var wfsformat = new ol.format.GML(options);
					var rutacoll =wfsformat.readFeatures(coll);
					return Promise.resolve(rutacoll);
				});	
}

function wpsclient_count(href, wpsbody, prefix, namespace, featuretype, projection){
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;
    
return fetch(href, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: wpsbody
                }).then(function(response){
					return response.text();

				});
}

/**
* Write GML Feature collection from an array of Feature
* @param {Feature[]|Promise} array of Features or Promise
* @param {namespace}  namespace uri. i.e. "http://itastdevserver.tel.uva.es/ide2019b"
* @param {featuretype} name of the featuretype. i.e. "Aeropuertos3587"
* @param {Projection} SRS of the input and output geometries.
* @return string GML
*/
async function writeGMLFeatureCollection(features, prefix, namespace, featuretype, projection) {
	var options={
				srsName: projection.getCode(), //proyeccion de openlayers
				featureNS: namespace,
				featurePrefix: prefix,
				featureType: featuretype
				}
	// Hay que esperar a que terminen las anteriores.
	var featuresarray = await features;
	var format = new ol.format.GML(options);
	var gml = format.writeFeatures(featuresarray);
	return gml;
}

async function writeGMLFeatureNode(feature, prefix, namespace, featuretype, projection) {
	var options={
				srsName: projection.getCode(), //proyeccion de openlayers
				featureNS: namespace,
				featurePrefix: prefix,
				featureType: featuretype
				}
	// Hay que esperar a que terminen las anteriores.
	
	var format = new ol.format.GML(options);
	var gml = format.writeGeometryNode(feature);
	return gml;
}




function fly_to(map, point, extent) {
    var duration = 700;
    var view = map.getView();
    if (extent) {
        view.fit(extent, {
            duration: duration
        });
    } else {
        view.animate({
            zoom: 19,
            center: point,
            duration: duration
        });
    }
}
function fit_map_to_layer(source) {

    var features = typeof (source.getFeatures) === 'undefined' ? null : source.getFeatures();
    if (features && features.length === 1 && features[0].getGeometry() instanceof ol.geom.Point) {
        fly_to(map, features[0].getGeometry().getCoordinates());
    } else if (features && features.length > 1) {
        fly_to(map, null, source.getExtent());
    }
}
/**
 * Add a layergroup to the interface. Layers in the group are mutually exclusive, i.e. only one of them can be active
 * @param {*} layergroup 
 */
function add_layergroup_to_list(layergroup) {
    layergroup.getLayers().forEach(function (layer) {
    var item = $('<li>', {
        "data-icon": "check",
        "class": layer.getVisible() ? "checked" : "unchecked"
    })
        .append($('<a />', {
            text: layer.get("name"),
            href: "#mappage"
        })
            .click(function () {
                layergroup.getLayers().forEach(function (l) {
                    if (l === layer) {
                        l.setVisible(true);
                    } else {
                        l.setVisible(false);
                    }
                });
            })
        );
    layer.on('change:visible', function () {
        $(item).toggleClass('checked unchecked');
    });
    item.insertAfter('#baseLayer');
});

}
function add_layer_to_list(layer) {
    var item = $('<li>', {
        "data-icon": "check",
        "class": layer.getVisible() ? "checked" : "unchecked"
    })
        .append($('<a />', {
            text: layer.get("name"),
            href: "#mappage"
        })
            .click(function () {
                layer.setVisible(!layer.getVisible());
            })
        );
    layer.on('change:visible', function () {
        $(item).toggleClass('checked unchecked');
    });
    item.insertAfter('#baseLayer');
}

