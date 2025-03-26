var lon = -4;
var lat = 41;
var zoom = 5;
var map, layer, wfs;
distancia = 0.01;

usosSuelo = new HashTable({111:"Tejido urbano continuo",
112:"Tejido urbano discontinuo",
121:"Zonas industriales y comerciales",
122:"Redes viarias, ferroviarias y terrenos asociados",
123:"Zonas portuarias",
124:"Aeropuertos",
131:"Zonas de extraccion minera",
132:"Escombreas y vertederos",
133:"Zonas en construccion",
141:"Zonas verdes urbanas",
142:"Instalaciones deportivas y recreativas",
211:"Tierras de labor en secano",
212:"Terrenos regados permanentemente",
213:"Arrozales",
221:"Viñedos",
222:"Frutales y plantaciones de bayas",
223:"Olivares",
231:"Prados y praderas",
241:"Cultivos anuales asociados con cultivos permanentes",
242:"Mosaicos de cultivos",
243:"Terrenos principalmente agricolas con importantes espacios de vegetacion natural",
244:"Sistemas agro-forestales",
311:"Bosques de frondosas",
312:"Bosques de coniferas",
313:"Bosque mixto",
321:"Pastizales naturales",
322:"Landas y matorrales mesofilos",
323:"Vegetacion esclerofila",
324:"Matorral boscoso de transicion",
331:"Playas, dunas y arenales",
332:"Roquedo",
333:"Espacios con vegetacion escasa",
334:"Zonas quemadas",
335:"Glaciares y niveles permanentes",
411:"Humedales y zonas pantanosas",
412:"Turberas y prados turbosos",
421:"Marismas",
422:"Salinas",
423:"Zonas llanas intermareales",
511:"Cursos de agua",
512:"Laminas de agua",
521:"Lagunas costeras",
522:"Estuarios",
523:"Mares y oceanos"});



function init(){
	
	//Estilo marcador
	var style = {
	fillColor: '#000',
	fillOpacity: 0.1,
	strokeWidth: 0
	};
	var stylecover = {
	fillColor: '#000ff',
	fillOpacity: 0.1,
	strokeWidth: 1
	};
    map = new OpenLayers.Map( 'map' );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
	var pnoa_layer = new OpenLayers.Layer.WMS( "Ortofotos España","http://www.ign.es/wms-inspire/pnoa-ma?", {layers: 'PNOA',transparent: true} );
  	var avisos_layer = new OpenLayers.Layer.WMS( "Avisos","http://localhost:8080/geoserver/wms?", {layers: 'Proyecto:avisos',transparent: true}, {isBaseLayer: false, opacity: 1} );
	geoloc = new OpenLayers.Layer.Vector('Geolocalicacion');
	coverwfs = new OpenLayers.Layer.Vector("WFS",{
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: "${factor}", // based on feature.attributes.type
                    fillColor: "#666666",
                    fillOpacity: 0.1,
                })});
	
    map.addLayers([pnoa_layer,layer, avisos_layer,geoloc,coverwfs]);
	
    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
    
    var geolocate = new OpenLayers.Control.Geolocate({
		bind: false,
		geolocationOptions: {
		enableHighAccuracy: false,
		maximumAge: 0,
		timeout: 7000
		}	

	});
	
	map.addControl(geolocate);
			
	geolocate.events.register("locationupdated",geolocate,function(e) {
		geoloc.removeAllFeatures();
		
		var circle = new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(e.point.x, e.point.y),e.position.coords.accuracy/2/110000,40,0),
			{},
			style
		);
		
		geoloc.addFeatures([
		
		new OpenLayers.Feature.Vector(
			e.point,
			{},
			{
				graphicName: 'cross',
				strokeColor: '#f00',
				strokeWidth: 2,
				fillOpacity: 0,
				pointRadius: 10
			}
			),
			circle
		]);
		
		if (firstGeolocation) {
			map.zoomToExtent(geoloc.getDataExtent());
			pulsate(circle);
			firstGeolocation = false;
			this.bind = true;
		}
	
	punto = e.point;
	getIntersectionFeatures(e.point,distancia);
	
	});
	
	geolocate.events.register("locationfailed",this,function() {
		OpenLayers.Console.log('Location detection failed');
	});
	
	geoloc.removeAllFeatures();
    geolocate.deactivate();
    firstGeolocation = true;
    geolocate.watch = false;
    geolocate.activate();
}
        
		
		
    var pulsate = function(feature) {
		var point = feature.geometry.getCentroid(),
		bounds = feature.geometry.getBounds(),
		radius = Math.abs((bounds.right - bounds.left)/2),
		count = 0,
		grow = 'up';

		var resize = function(){
			if (count>16) {
				clearInterval(window.resizeInterval);
			}
			var interval = radius * 0.03;
			var ratio = interval/radius;
			switch(count) {
				case 4:
				case 12:
					grow = 'down'; break;
				case 8:
					grow = 'up'; break;
			}
			if (grow!=='up') {
				ratio = - Math.abs(ratio);
			}
			feature.geometry.resize(1+ratio, point);
			geoloc.drawFeature(feature);
			count++;
		};	


		window.resizeInterval = window.setInterval(resize, 50, point, radius);
	
};

function getGML3FormatInspire(){
	// añade soporte del elemento member definido en el esquema Inspire
	OpenLayers.Format.GML.v3.prototype.readers.wfs.member=OpenLayers.Format.GML.Base.prototype.readers["gml"]["featureMember"];
	OpenLayers.Format.GML.v3.prototype.readers.feature= {
            "*": function(node, obj) {
                // The node can either be named like the featureType, or it
                // can be a child of the feature:featureType.  Children can be
                // geometry or attributes.
                var name;
                var local = node.localName || node.nodeName.split(":").pop();
                // Since an attribute can have the same name as the feature type
                // we only want to read the node as a feature if the parent
                // node can have feature nodes as children.  In this case, the
                // obj.features property is set.
                if (obj.features) {
                    if (!this.singleFeatureType &&
                        (OpenLayers.Util.indexOf(this.featureType, local) !== -1)) {
                        name = "_typeName";
                    } else if(local === this.featureType) {
                        name = "_typeName";
                    }
                } else {
                    // Assume attribute elements have one child node and that the child
                    // is a text node.  Otherwise assume it is a geometry node.
                    if(node.localName=='geometry'){
                    	 name = "_geometry";
                    }
                       else {
                            name = "_attribute";
                        }
              
                }
                if(name) {
                    this.readers.feature[name].apply(this, [node, obj]);
                }
            },
            "_typeName": function(node, obj) {
                var container = {components: [], attributes: {}};
                this.readChildNodes(node, container);
                // look for common gml namespaced elements
                if(container.name) {
                    container.attributes.name = container.name;
                }
                var feature = new OpenLayers.Feature.Vector(
                    container.components[0], container.attributes
                );
                if (!this.singleFeatureType) {
                    feature.type = node.nodeName.split(":").pop();
                    feature.namespace = node.namespaceURI;
                }
                var fid = node.getAttribute("fid") ||
                    this.getAttributeNS(node, this.namespaces["gml"], "id");
                if(fid) {
                    feature.fid = fid;
                }
                if(this.internalProjection && this.externalProjection &&
                   feature.geometry) {
                    feature.geometry.transform(
                        this.externalProjection, this.internalProjection
                    );
                }
                if(container.bounds) {
                    feature.bounds = container.bounds;
                }
                obj.features.push(feature);
            },
            "_geometry": function(node, obj) {
                if (!this.geometryName) {
                    this.geometryName = node.nodeName.split(":").pop();
                }
                this.readChildNodes(node, obj);
            },
            "_attribute": function(node, obj) {
                var local = node.localName || node.nodeName.split(":").pop();
                if (node.childNodes.length==1 && node.childNodes[0].nodeType==3){
                	var value = this.getChildValue(node);
                	obj.attributes[local] = value;
                }else if (local=='landCoverObservation'){
                	var value= node.childNodes[1].childNodes[1].attributes['xlink:href'].nodeValue;
                	obj.attributes[local] = value;
                }
                else{
                	 this.readChildNodes(node, obj);
                }
                
            }
        };
	// Creo una instancia de GML.v3 con los parámetros no estándar
	var gmlFormat=new OpenLayers.Format.GML.v3({
					surface:true,
					featureNS:'http://inspire.ec.europa.eu/schemas/lcv/4.0',
					featureType:'LandCoverUnit'
					});
	// registra la equivalencia del formato gml utilizado por el servidor WFS de Inspire
	gmlFormat.setNamespace('gml','http://www.opengis.net/gml/3.2');
	return gmlFormat;
}

function _wfsLoaded (resp) {
	var jstsGeom2 = getJSTSGeom(new OpenLayers.Feature.Vector(bufferGeom));
	var ponderaciones = new Array();
	var area;
	var sumaArea=0;
    for (var i=0;i<resp.features.length;i++){
    	var feat=resp.features[i];
    	var jstsGeom1 = getJSTSGeom(feat);
    	var inters = jstsGeom1.intersection(jstsGeom2);
    	var ol=getOLFeature(inters);
    	if (typeof ol == 'undefined'){
    			
    		}else{
    			feat.geometry = ol.geometry;
    			coverwfs.addFeatures(feat);
    		}		
			
		area = feat.geometry.getArea();		
		sumaArea += area;
		var factor=extraccionAtributos(feat);
		feat.attributes.factor=1+factor*10;		
		ponderaciones[i] = area*factor;
		var a = ponderaciones[i];
				
    }	
	
	calcularRiesgo(sumaArea,ponderaciones);

}

function extraccionAtributos(feature){
	var factor;
	var atributo = feature.attributes.landCoverObservation;
	atributo = parseInt(atributo.substring(52,55));
	nombre = usosSuelo.getItem(atributo);
	if(atributo>100 && atributo<200){
		factor = 0;
	}else if(atributo>200 && atributo<300){
		factor = 0.5;
	}else if(atributo>300 && atributo<400){
		factor = 0.6;
	}else if(atributo>400 && atributo<500){
		factor = 0.8;
	}else if(atributo>500 && atributo<600){
		factor = 0.9;
	}
return factor;
}	

function calcularRiesgo(sumaArea,ponderaciones){
	
	var ponderacion=0;
	
	for(var i=0;i<ponderaciones.length;i++){
		ponderacion = ponderacion + ponderaciones[i];
	}	
	
	var riesgo = ponderacion/sumaArea;
	
	mostrarRiesgo(riesgo);
}

function mostrarRiesgo(riesgo){
	
    var markers = new OpenLayers.Layer.Markers( "Markers" );
	var size = new OpenLayers.Size(21,25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var icon = new OpenLayers.Icon('../images/riesgo.jpg', size, offset);
	markers.addMarker(new OpenLayers.Marker(punto,icon));
	map.addLayer(markers);
    if(riesgo<50){
		color = "#00FF00";
    }else if(riesgo>=50 && riesgo<80){
    	color = "#FFBF00"; 
    }else if(riesgo>=80){
    	color = "#FF0000";
    }

	var popup = new OpenLayers.Popup.FramedCloud("Popup", 
		punto.getBounds().getCenterLonLat(), null,
		("<div style='font-size:15px;text-align:center;font-weight: bold;'>Riesgo de alergia:</div>" +        
		"<div style='font-size:15px;color:"+color+";text-align:center;font-weight: bold;'><br>" + riesgo + "%</div>"), 
		null,
		true
		);

	map.addPopup(popup);
	
}

function getIntersectionFeatures(punto, distance){
		client = new OpenLayers.WPSClient({
        servers: {
            opengeo: 'http://localhost/geoserver/wps'
        }
    });
	buffer = client.getProcess('opengeo', 'JTS:buffer');
    buffer.execute({
        inputs: {
            geom: punto,
            distance: distance
        },
        success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
			bufferGeom=outputs.result[0].geometry;
			// Add WFS layer
			var gmlLandcoverFormat= getGML3FormatInspire();

			
			protocol = new OpenLayers.Protocol.WFS({
					version: "1.1.0",
					srsName: "EPSG:4326",
					url:  "http://localhost/wfs",
					featureType: "LandCoverUnit",
					featureNS: "http://inspire.ec.europa.eu/schemas/lcv/4.0",
					outputFormat: "application/gml+xml; version=3.2",
					readFormat: gmlLandcoverFormat,
					defaultFilter:new OpenLayers.Filter.Spatial({
									property: "geometry",
									type: OpenLayers.Filter.Spatial.INTERSECTS,
									value: bufferGeom,
					})		
				});
			var response = protocol.read({
									maxFeatures: 100,
									callback: _wfsLoaded
								});	 

        }
    });
		
		
		 var wpsRequestData=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>geo:buffer</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>geom</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt"><![CDATA[point(0 0)]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>distance</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>0.01</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=gml/3.1.1">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`

	}

function getOLFeature(JSTSGeom){
     var wkt= new OpenLayers.Format.WKT();
     var jstsparser=new jsts.io.WKTWriter();
     var olgeom=wkt.read(jstsparser.write(JSTSGeom));
     return olgeom;  
}
/*
Convert OL Feature into JTSGeom
*/
function getJSTSGeom(OLfeature){
        var wkt= new OpenLayers.Format.WKT();
        var jtsparser=new jsts.io.WKTReader();
        var wktgeom=wkt.write(OLfeature);
        var jstsGeom = jtsparser.read(wktgeom);
        return jstsGeom;
}

function HashTable(obj)
{
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}
