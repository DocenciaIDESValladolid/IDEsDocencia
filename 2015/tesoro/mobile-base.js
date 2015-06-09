// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
// initialize map when page ready
var map;
var id_facebook;
var name_facebook;
var selectCtrl;
var highlightCtrl;
var gg = new OpenLayers.Projection("EPSG:4326");
//var sm = new OpenLayers.Projection("EPSG:900913");
var sm = new OpenLayers.Projection("EPSG:3857");
var provlevel = 3; //provincia nivel 3 y municipio nivel 4, así que pedimos los valores mayores que 3				
var urlWfsUA = 'http://www.ign.es/wfs/unidades-administrativas';
var urlWmsUA = 'http://www.ign.es/wms-inspire/unidades-administrativas';
var url_base='http://itastdevserver.tel.uva.es/docenciaIDEs/2014/FixCity/';// DEBUG Para depurar en local con servicios remotos
var administrativeUnitsFeatureType= 'unidades-administrativas:AU.AdministrativeUnit';
var prov_name;
var muni_name;
var muni_code;
var geolocation_accuracy;
var geolocation_msg='';
var geolocation_position;
var paths;
var munis = new Array(10);
var id_path;
var name_stage;


munis[0]='34074747075'; //Íscar
munis[1]='34074747186'; //Valladolid
munis[2]='34074747087'; //Megeces
munis[3]='34074747231'; //Zaratán
munis[4]='34074747098'; //Mucientes
munis[5]='34073434010'; //Ampudia
munis[6]='34073434120'; //Palencia
munis[7]='34074747193'; //Viana de Cega
munis[8]='34074747082'; //Matapozuelos
munis[9]='34074747158'; //La Seca





var init = function (onSelectFeatureFunction) {

	/* FACEBOOK */
// Cuando la pagina carga miramos si ya hay un usuario identificado.
fb.ready(function(){ 
  if (fb.logged)
  {
   updateFacebookLoginInfo(fb);
  }
});

var vector = new OpenLayers.Layer.Vector("vector", {});
	
//Capa marcador
var styleMarkDefault = new OpenLayers.StyleMap({
						externalGraphic: "images/marker-icon-fixit.png",
						pointRadius: 20,
						graphicOpacity: 1.0,
						graphicWidth: 56,
						graphicHeight: 56,
						graphicYOffset: -56});
var markers = new OpenLayers.Layer.Vector( "Markers", { styleMap: styleMarkDefault } );
markers.id="Markers";	
/********************
* Controles de mapa
**********************/
		/* Función para clickar */
	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
		defaultHandlerOptions: {
			'single': true,
			'double': false,
			'pixelTolerance': 3,
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
			var e= {point:{y:lonlat.lat,x:lonlat.lon}};
			eventLocationChanged(e);		
		}

	}); //fin OpenLayers.Control.Click


    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 7000
        }
    });
	
	// Capas base
	var wms_ignbasetodo = new OpenLayers.Layer.WMS("IGN Base",
        "http://www.ign.es/wms-inspire/ign-base",
        {layers: 'IGNBaseTodo',transparent:true},
        {isBaseLayer: true, transitionEffect: 'resize', singleTile:false}
    );
	var wms_cartociudad = new OpenLayers.Layer.WMS("IGN Base",
        "http://www.cartociudad.es/wms/CARTOCIUDAD/CARTOCIUDAD",
        {layers: 'FondoUrbano',transparent:false},
        {isBaseLayer: true, transitionEffect: 'resize', singleTile:false}
    );

	
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 22,
		size: new OpenLayers.Size(400,600),//para evitar null al inicializar
        controls: [
            new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.Navigation({enableKinetic: true}),
            geolocate,
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
			wms_cartociudad,
            ],
        center: new OpenLayers.LonLat(0, 0),	
        zoom: 1
    });
    //Capa para añadir polígonos para las pistas iniciales
     var vlayer = new OpenLayers.Layer.Vector( "Tesoro:Editable");
     polygonDraw= new OpenLayers.Control.DrawFeature(vlayer, OpenLayers.Handler.Polygon);
     map.addControl(polygonDraw);
     map.addLayer(vlayer);
     // Añado la capa de marcas y la oculto
	 map.addLayer(markers);
	 map.getLayer('Markers').setVisibility(false);

    
//Añado los escenarios iniciales junto con sus controles
	availableStages=createWFSLayer();
	addInteractiveWFSLayer(availableStages,onWFSFeatureSelect);
	map.updateSize();

	var wms_concentracion=createHeatmapLayer();
	map.addLayer(wms_concentracion);
	// CAPA DE POSICIÓN ACTUAL
	map.addLayer(vector);

    //Añadimos el control de clicks y desplazamiento
	var clickControl = new OpenLayers.Control.Click();
	map.addControl(clickControl);
	clickControl.activate();
		
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
		geolocation_position=e.position.coords;
    });
    initTesoro();

	};// End of init


	/**
	* Selección de una marca de nueva denuncia en el mapa.
	*/
	/*function onMarkFeatureSelect(evt) {
		marca_pulsada(evt);
		selectCtrl.unselectAll();
	}*/
	
	function formatDegrees(lonDecimal, latDecimal){
		var signlat=1;
		var signlon=1;
	
	 if(lonDecimal < 0)  { signlon = -1; }
      var lonAbs = Math.abs(Math.round(lonDecimal * 1000000.));

	 //Math.round is used to eliminate the small error caused by rounding in the computer:
	 //e.g. 0.2 is not the same as 0.20000000000284

     //Error checks
     if(lonAbs > (180 * 1000000)) {  alert(' Degrees Longitude must be in the range of -180 to 180. '); lonDecimal='';  lonAbs=0; }

	 if(latDecimal < 0)  { signlat = -1; }
      var latAbs = Math.abs( Math.round(latDecimal * 1000000.));

	 //Math.round is used to eliminate the small error caused by rounding in the computer:
	 //e.g. 0.2 is not the same as 0.20000000000284

     //Error checks
     if(latAbs > (90 * 1000000)) { alert(' Degrees Latitude must be in the range of -90. to 90. '); latDecimal = '';  latAbs=0; }
	
	var latvalue = ((Math.floor(latAbs / 1000000) * signlat) + '&deg; ' + Math.floor(  ((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60)  + '\' ' +  ( Math.floor(((((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60) - Math.floor(((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60)) * 100000) *60/100000 ) + '&quot;'  );
	var lonvalue = ((Math.floor(lonAbs / 1000000) * signlon) + '&deg; ' + Math.floor(  ((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60)  + '\' ' +  ( Math.floor(((((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60) - Math.floor(((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60)) * 100000) *60/100000 ) + '&quot;'  );

	return latvalue+' , '+lonvalue;
}
	
	/**
	* Selección de un escenario
	*/

	function onWFSFeatureSelect(evt) {
		feature = evt.feature;
		selectCtrl.unselectAll();

		//Si es un cluster ignorar
		if (typeof feature.cluster != 'undefined')
		{
		if (feature.attributes.count==1)
			feature=feature.cluster[0];
			else
			{
			var bounds = new OpenLayers.Bounds();
			for (i=0;i<feature.attributes.count;i++)
			{
				bounds.extend(feature.cluster[i].geometry.getBounds());
			}
			map.zoomToExtent(bounds);
			return;
			}
		}
		name_stage=$.trim(feature.attributes.name);
		id_path = feature.attributes.id_path;
		$("#scenarioNameLabel").html(feature.attributes.name);
		$("#scenarioDescription").html(feature.attributes.descripcion);
		$("#infoFeaturePanel").trigger( "updatelayout" );
		$("#infoRiddle").hide();
		$("#infoFailedLocation").hide();
		$("#infoScenario").show();
		$("#infoFeaturePanel").panel("open");
	}
	/**
	* Selección de una pista acertada o no
	*/
	function onWFSFeatureSelectProgress(evt) {
		feature = evt.feature;
		selectCtrl.unselectAll();

		//Si es un cluster ignorar
		if (typeof feature.cluster != 'undefined')
		{
		if (feature.attributes.count==1)
			feature=feature.cluster[0];
			else
			{
			var bounds = new OpenLayers.Bounds();
			for (i=0;i<feature.attributes.count;i++)
			{
				bounds.extend(feature.cluster[i].geometry.getBounds());
			}
			map.zoomToExtent(bounds);
			return;
			}
		}
		//Si se trata de una pista acertada
		if(feature.attributes.descripcion!= null)
		{
			$("#nameScenario").html(feature.attributes.name);
			$("#nextRiddle").html(feature.attributes.descripcion);
			date= new Date(feature.attributes.date);
			$("#timeLabel").html("Pista descubierta en la fecha " + date.toLocaleString());
			$("#validarUbicacion").hide();
			$("#infoValidar").hide();
			if(feature.attributes.finished==0)
			{
				name_stage=$.trim(feature.attributes.name);
				id_path = feature.attributes.id_path;
				$("#validarUbicacion").show();
				$("#infoValidar").show();
			}
			$("#infoFeaturePanel").trigger( "updatelayout");
			$("#infoRiddle").show();
			$("#infoScenario").hide();
			$("#infoFailedLocation").hide();
			$("#infoFeaturePanel").panel("open");
		}
		else
		{
			$("#nameScenario2").html(feature.attributes.name);
			date= new Date(feature.attributes.date);
			$("#timeLabelFailed").html("Ubicación enviada en la fecha " + date.toLocaleString());
			$("#infoFeaturePanel").trigger( "updatelayout");
			$("#infoRiddle").hide();
			$("#infoScenario").hide();
			$("#infoFailedLocation").show();
			$("#infoFeaturePanel").panel("open");
		}
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
	function toast(msg){
	$("<div class='ui-loader ui-overlay-shadow  ui-corner-all' style='background-color:black;'><p>"+msg+"</p></div>")
	.css({ display: "block", 
		opacity: 0.90,
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
	}
		
	function failureUA(request){
		alert('Fallo de conexión con servicio INSPIRE Administrative Units');	
	}
	function queryUA(e,successCallback,failureCallBack)
	{
	var postDataUA = 	'<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="json"\n'
						+' xmlns:topp="http://www.openplans.org/topp"\n'
						+' xmlns:wfs="http://www.opengis.net/wfs"\n'
						+' xmlns="http://www.opengis.net/ogc"\n'
						+' xmlns:gml="http://www.opengis.net/gml"\n'
						+' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
						+' xsi:schemaLocation="http://www.opengis.net/wfs\n'
						+'					http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">\n'
						+' <wfs:Query typeName="'+administrativeUnitsFeatureType+'" >\n'
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
// See: http://api.jquery.com/jQuery.ajaxPrefilter/
$.ajaxPrefilter( function( options ) {
  if ( options.crossDomain ) {
    // Set the proxy URL
    options.url = "http://itastdevserver.tel.uva.es/proxyINSPIRE.php?mode=native&url=" + encodeURIComponent(options.url);
    options.crossDomain = false;
	
  }
});
		$.ajax({
			type: "POST",
			contentType: "text/plain", // server can forbid other types for cross-server scripting
			url: urlWfsUA,
			data: postDataUA,
			crossDomain:true,
			success: successCallback,
			error: failureCallBack,
			});
	}
	//Función para mover el punto
	function moveMark(point)
	{
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);
		var markers = map.getLayer('Markers');
		markers.removeAllFeatures();
		var newMarker = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(point.x,point.y),null);
		markers.addFeatures(newMarker);         
	}
	//Recoger evento de marker
	function eventLocationChanged(e){
		moveMark(e.point);
		var markers = map.getLayer('Markers');
		//var feature = markers.features;
		geolocation_position = markers.features[0].geometry.bounds.getCenterLonLat();
	}