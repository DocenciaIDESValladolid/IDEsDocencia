// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");
var provlevel = 3; //provincia nivel 3 y municipio nivel 4, así que pedimos los valores mayores que 3				
var urlWfsUA = 'http://www.ign.es/wfs/unidades-administrativas';

var init = function (onSelectFeatureFunction) {

    var vector = new OpenLayers.Layer.Vector("vector", {});
	

	
    var sprintersLayer = new OpenLayers.Layer.Vector("Sprinters", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "img/mobile-loc.png",
            graphicOpacity: 1.0,
            graphicWidth: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })	
    });
/*
    var sprinters = getFeatures();
    sprintersLayer.addFeatures(sprinters);*/

    var selectControl = new OpenLayers.Control.SelectFeature(sprintersLayer, {
        autoActivate:true,
        onSelect: onSelectFeatureFunction});
		
	var popupControl = new OpenLayers.Control.SelectFeature(vector, {
		autoActivate:true
	});
                

    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });
	

    // create map
	
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 18,
        controls: [
            new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.Navigation(),
            geolocate,
            selectControl,
			popupControl
        ],
        layers: [
		   new OpenLayers.Layer.OSM("Vista Callejero", null, {
                transitionEffect: 'resize'
            }),
            new OpenLayers.Layer.Bing({
                key: apiKey,
                type: "Aerial",
                name: "Vista Aérea",
                transitionEffect: 'resize'
            }),
		vector
			
            ],
        center: new OpenLayers.LonLat(0, 0),	
        zoom: 1
    });
	OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
	/*
	var wms = new OpenLayers.Layer.WMS("Denuncias WMS",
        "http://itastdevserver.tel.uva.es/geoserver/IDEs/ows",
        {layers: 'IDEs:denuncias',transparent:true},
        {isBaseLayer: false, transitionEffect: 'resize', singleTile:false}
    );*/
	
	//CAPA DE DENUNCIAS
	var wfs = new OpenLayers.Layer.Vector("Denuncias", {
        //strategies: [new OpenLayers.Strategy.Fixed()],
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
        protocol: new OpenLayers.Protocol.WFS({
            url: "http://itastdevserver.tel.uva.es/geoserver/IDEs/ows",
            featureType: "denuncias",
            featureNS: "http://www.idelab.uva.es/#IDES",
			srsName: "EPSG:900913",
			version: "1.1.0"
        })
    });
	
	/////Capa marcador
	markers = new OpenLayers.Layer.Markers( "Markers" );
	markers.id = "Markers";
	map.addLayer(markers);
	/////

    map.addLayers([wfs]);

    var style = {
        fillOpacity: 0.1,
        fillColor: '#000',
        strokeColor: '#f00',
        strokeOpacity: 0.6
    };
    geolocate.events.register("locationupdated", this, function(e) {
        vector.removeAllFeatures();
        vector.addFeatures([
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
            new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                    e.position.coords.accuracy / 2,
                    50,
                    0
                ),
                {},
                style
            )
        ]);
        map.zoomToExtent(vector.getDataExtent());
    });
		
		
		
	/************************************************************************************************/
	//pintamos la capa del marcador a añadir
	//map.addLayers([markers]);
		
	//Añadimos control de click	
	var click = new OpenLayers.Control.Click();
	map.addControl(click);
	click.activate();		
		
		
	/*FUNCION PARA EL POP-UP*/
	
	vector.events.on({
		'featureselected': onFeatureSelect,
		'featureunselected': onFeatureUnselect
	});
	
	
	/*FUNCIONES USADAS PARA OBTENER MUNICIPIO Y PROVINCIA A PARTIR DEL NUTSCODE*/
	geolocate.events.register("locationupdated", this, eventLocationChanged);
	

	//map.addPopup(popup);
	
	};// End of init

	/*
	
	*/
		/* Función para clickar y añadir marcador*/
	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
		defaultHandlerOptions: {
			'single': true,
			'double': false,
			'pixelTolerance': 0,
			'stopSingle': false,
			'stopDouble': false
		},

		initialize: function(options) {
			this.handlerOptions = OpenLayers.Util.extend(
				{}, this.defaultHandlerOptions
			);
			OpenLayers.Control.prototype.initialize.apply(
				this, arguments
			); 
			this.handler = new OpenLayers.Handler.Click(
				this, {
					'click': this.trigger
				}, this.handlerOptions
			);
		}, 

		trigger: function(e) {
			var lonlat = map.getLonLatFromPixel(e.xy);
			alert("You clicked near " + lonlat.lat + " N, " +
									  + lonlat.lon + " E");
			
			
			var size = new OpenLayers.Size(21,25);
			var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
			var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);
			var markers = map.getLayer('Markers');
			
			markers.addMarker(new OpenLayers.Marker(lonlat,icon));
			//markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lonlat.lat,lonlat.lon),icon));
			
			//var position = map.getLonLatFromPixel(e.xy);
			//markerslayer.addMarker(new OpenLayers.Marker(position,icon));
		}

	}); //fin OpenLayers.Control.Click
	
	
	
	
	
	
	function onFeatureSelect(evt) {
		feature = evt.feature;
		/*popup = new OpenLayers.Popup.FramedCloud("featurePopup",
								 feature.geometry.getBounds().getCenterLonLat(),
								 new OpenLayers.Size(100,100),
								 "<h2>"+feature.attributes.title + "</h2>" +
								 feature.attributes.description,
								 null, true, onPopupClose);*/
		var popup = new OpenLayers.Popup.FramedCloud("Popup", 
								feature.geometry.getBounds().getCenterLonLat(), null,
								'<a href="#nuevadenuncia_loc_actual" data-icon="nueva" data-role="button">Nueva Denuncia</a>', null,
								true, onPopupClose // <-- true if we want a close (X) button, false otherwise
		);
		feature.popup = popup;
		popup.feature = feature;
		map.addPopup(popup, true);
	}
	
	function onPopupClose(evt) {
		// 'this' is the popup.
		var feature = this.feature;
		if (feature.layer) { // The feature is not destroyed
			selectControl.unselect(feature);
		} else { // After "moveend" or "refresh" events on POIs layer all 
				 //     features have been destroyed by the Strategy.BBOX
			this.destroy();
		}
	}
	function onFeatureUnselect(evt) {
		feature = evt.feature;
		if (feature.popup) {
			popup.feature = null;
			map.removePopup(feature.popup);
			feature.popup.destroy();
			feature.popup = null;
		}
	}

	function eventLocationChanged(e){
	
		var postDataUA = 	'<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="json"\n'
						+' xmlns:topp="http://www.openplans.org/topp"\n'
						+' xmlns:wfs="http://www.opengis.net/wfs"\n'
						+' xmlns="http://www.opengis.net/ogc"\n'
						+' xmlns:gml="http://www.opengis.net/gml"\n'
						+' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
						+' xsi:schemaLocation="http://www.opengis.net/wfs\n'
						+'					http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">\n'
						+' <wfs:Query typeName="unidades-administrativas:AU.AdministrativeUnit" >\n'
						+' <PropertyName>nationalcode</PropertyName>\n'
						+' 	<PropertyName>nameunit</PropertyName>\n'
						+' 	<Filter>\n'
						+' 	  <And>\n'
						+' 	  <PropertyIsGreaterThanOrEqualTo>\n'
						+' 		<PropertyName>nationallevel</PropertyName>\n'
						+' 		<Literal>'+provlevel+'</Literal>\n'
						+' 	  </PropertyIsGreaterThanOrEqualTo>\n'
						+' 	  <Intersects>\n'
						+' 		<PropertyName>the_geom</PropertyName>\n'
						+' 		  <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#900913">\n'
						+' 			<gml:coordinates>'+e.point.x+','+e.point.y+'</gml:coordinates>\n'
						+' 		  </gml:Point>\n'
						+' 		</Intersects>\n'
						+' 	   </And>\n'
						+' 	 </Filter>\n'
						+'   <SortBy>\n'
						+'		<SortProperty>\n'
						+'			<PropertyName>nationallevel</PropertyName>\n'
						+'			<SortOrder>ASC</SortOrder>\n'
						+'		</SortProperty>\n'
						+'   </SortBy>\n'
						+'   </wfs:Query>\n'
						+' </wfs:GetFeature>\n';
		var urlProxy = 'http://itastdevserver.tel.uva.es/urlnoexiste';			
/*		var requestUA = OpenLayers.Request.POST({
			url: urlProxy,//urlWfsUA,
			data: {datas:postDataUA},
			headers: {
				"Content-Type": "text/xml;charset=utf-8"
			},
			callback: successUA,
			failure: failureUA,
			});
		requestUA.send(); */
		$.ajax({
			type: "POST",
			contentType: "text/plain", // server can forbid other types for cross-server scripting
			url: urlWfsUA,
			data: postDataUA,
			success: successUA
			});
	}
	
	
	
	function successUA(jsonResponse){
	
		var prov_name= jsonResponse.features[0].properties.nameunit;
		var muni_name= jsonResponse.features[1].properties.nameunit;
		var muni_code= jsonResponse.features[1].properties.nationalcode;
		//alert("Estás en "+muni_name+", provincia de "+prov_name + ".");
		
		muestraConfirm();
		
		/* Código que nos permite editar un alerta.
		En concreto, esto se usa para añadir un botón de "Nueva denuncia" y otro de "Cancelar".*/
		/*import mx.controls.Alert;
		Alert.okLabel = "Nueva denuncia";
		Alert.cancelLabel = "Cancelar";
		Alert.buttonWidth = 75; // El ancho de los botones
		confirmHandler = function (evt_obj:Object) {
			if (evt_obj.detail == Alert.OK) {
				window.location = 'http://itastdevserver.tel.uva.es/docenciaIDEs/2014/FixCity/index.html#nuevadenuncia_loc_actual'; 
			}
			else {
			
			}
		};
		Alert.show("Estás en "+muni_name+", provincia de "+prov_name + ".", "Esto que es", Alert.OK | Alert.CANCEL, null, confirmHandler, Alert.CANCEL);*/

		//alert(request);	
	}
	
	function muestraConfirm(var name, var muni)
	{
		var pregunta = "Estás en "+muni_name+", provincia de "+prov_name + ". ¿Desea añadir una denuncia?";
		var respuesta = confirm(pregunta);

		if(respuesta)
		{
			window.location = 'http://itastdevserver.tel.uva.es/docenciaIDEs/2014/FixCity/index.html#nuevadenuncia_loc_actual'; 
		}
                else
                {

                         // Código para cambiar de frame
                }
	}
	
	function failureUA(request){
		alert('FALLO');	
	}
