// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
//var sm = new OpenLayers.Projection("EPSG:900913");
var sm = new OpenLayers.Projection("EPSG:3857");
var provlevel = 3; //provincia nivel 3 y municipio nivel 4, así que pedimos los valores mayores que 3				
var urlWfsUA = 'http://www.ign.es/wfs/unidades-administrativas';
var urlWmsUA = 'http://www.ign.es/wms-inspire/unidades-administrativas';
var administrativeUnitsFeatureType= 'unidades-administrativas:AU.AdministrativeUnit';
var prov_name;
var muni_name;
var muni_code;
var geolocation_accuracy;
var geolocation_msg='';



		
	

var init = function (onSelectFeatureFunction) {

    var vector = new OpenLayers.Layer.Vector("vector", {});
	/////Capa marcador
	var styleMarkDefault = new OpenLayers.StyleMap({
						externalGraphic: "images/marker-icon-fixit.png",
						pointRadius: 20,
						graphicOpacity: 1.0,
						graphicWidth: 56,
						graphicHeight: 56,
						graphicYOffset: -56});
	var styleMarkSelect = new OpenLayers.StyleMap({
						externalGraphic: "images/marker-icon-fixit.png",
						pointRadius: 20,
						graphicOpacity: 1.0,
						graphicWidth: 64,
						graphicHeight: 64,
						graphicYOffset: -64});
	var styleMark = new OpenLayers.StyleMap({
						'default': styleMarkDefault,
						'select':styleMarkSelect
						});
	var markers = new OpenLayers.Layer.Vector( "Markers", { styleMap: styleMarkDefault } );
	markers.id="Markers";
/********************
* Controles de mapa
**********************/
		/* Función para clickar y añadir marcador*/
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
	
	//CAPA CQL
	var wms_cql = new OpenLayers.Layer.WMS("ejemplo_CQL",
        "http://www.ign.es/wms-inspire/unidades-administrativas",
        {transparent:true,format:'image/png' ,sld_body:CQL_SLD_body},
        {isBaseLayer: false, singleTile:true, visibility:false}
    );
	
	
	
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
/*	var googleStreets= new OpenLayers.Layer.Google(
                "Google Streets", // the default
                {numZoomLevels: 20}
            );
    var googleHybrid = new OpenLayers.Layer.Google(
                "Google Hybrid",
                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
            );
	var googleSat= new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
            );
*/    // create map
	
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
		//	googleStreets,
		//	googleHybrid,
		//	googleSat,
            ],
        center: new OpenLayers.LonLat(0, 0),	
        zoom: 1
    });
	map.updateSize();
	if (typeof addThematicUALayers == 'function')
	{
	var uaLayer= addThematicUALayers();
	map.addLayer(uaLayer);
	}
	var wms_concentracion=createHeatmapLayer();
	map.addLayer(wms_concentracion);
	// CAPA DE POSICIÓN ACTUAL
	map.addLayer(vector);
	//CAPA DE DENUNCIAS
	var wfs=createWFSLayer();
	map.addLayer(wfs);
	// CAPA DE MARCAS
	map.addLayer(markers);
	//CAPA DE CQL
	map.addLayer(wms_cql);
	/********
	* Controles 
	**********/
	var highlightCtrl = new OpenLayers.Control.SelectFeature([wfs,markers], {
                hover: true,
                highlightOnly: true,
                renderIntent: "temporary",
                eventListeners: {
                    beforefeaturehighlighted: report,
                    featurehighlighted: report,
                    featureunhighlighted: report
                }
            });

     var selectCtrl = new OpenLayers.Control.SelectFeature([wfs,markers],
                {
				clickout: true
				}
            );
	/*FUNCION PARA EL POP-UP*/
	
	wfs.events.on({
		'featureselected': onWFSFeatureSelect,
	//	'featureunselected': onFeatureUnselect
	});
	markers.events.on({
		'featureselected': onMarkFeatureSelect,
	//	'featureunselected': onFeatureUnselect
	});
	
	var clickControl = new OpenLayers.Control.Click();
	 function report(e)
	 {
	 OpenLayers.Console.log(e.type, e.feature.id);
	 }
	 map.addControl(highlightCtrl);
     map.addControl(selectCtrl);
	 map.addControl(clickControl);
	 clickControl.activate();
	 highlightCtrl.activate();
     selectCtrl.activate();
	 
	//OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
	
	
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
		geolocation_accuracy=e.position.coords.accuracy;
		geolocation_msg= "<p>Localizado con "+ geolocation_accuracy+" metros de precisión.</p>";
		queryUA(e,successGeolocationUA);
    });

};// End of init


	function addDenunciaOnClick(municipio, provincia, longitud, latitud)
	{
		var pregunta = "Estás en "+ municipio +", provincia de "+ provincia + 
					   ". La localización escogida es: " + latitud + " N, " + longitud + " E," + "¿desea añadir una denuncia?";
		var respuesta = confirm(pregunta);

		if(respuesta)
		{
			window.location = 'http://itastdevserver.tel.uva.es/docenciaIDEs/2014/FixCity/index.html#nuevadenuncia_loc_actual';
			html = '<p>La localización actual es: ' + latitud + " N, " + longitud + " E" + '</p>'+
			'<input type="hidden" name="latitud" value="'+ latitud +'">' + 
			'<input type="hidden" name="longitud" value="'+ longitud +'">';
			$("#loc_actual").html(html);
		}
		
	}
	
	function addReport(evt)
	{
		$.mobile.changePage("#nuevadenuncia");
	}
	/**
	* Selección de una marca de nueva denuncia en el mapa.
	*/
	function onMarkFeatureSelect(evt) {
		$("#infopanel").panel("open");
	}
	
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
	* Selección de una denuncia ya existente
	*/
	function onWFSFeatureSelect(evt) {
		feature = evt.feature;
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
		$("#reportDescription").html("A las "+feature.attributes.fecha+" he informado del problema: \""+feature.attributes.texto+"\"");
		var point=feature.geometry.getBounds().getCenterLonLat();
		
		var pointProj=new OpenLayers.LonLat(point.lon,point.lat);
		pointProj.transform(map.getProjectionObject(), gg);
		var latlonString = formatDegrees(pointProj.lat, pointProj.lon);
		$("#reportLocationLabel").html('('+latlonString+')');
		$("#reportDetailsLink").attr("href","reportDetails.php?reportId="+feature.attributes.id_denuncia);
		$("#nuevadenuncia_loc_actual_button").show();
		$("#infoDenunciaPanel").trigger( "updatelayout" );
		$("#infoDenunciaPanel").panel("open");
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
		moveMark(e.point);
		geolocation_msg="";
		queryUA(e,successUA,failureUA);
	}
	function successUA(jsonResponse){
	if (jsonResponse.features.length==2)
	{
		prov_name= jsonResponse.features[0].properties.nameunit;
		muni_name= jsonResponse.features[1].properties.nameunit;
		muni_code= jsonResponse.features[1].properties.nationalcode;
		toast("<p>"+muni_name+"("+prov_name+")</p>"+ geolocation_msg);
		fillForm();
		}
	}
	function successGeolocationUA(jsonResponse){
	if (jsonResponse.features.length==2)
	{
		var prov_name= jsonResponse.features[0].properties.nameunit;
		var muni_name= jsonResponse.features[1].properties.nameunit;
		var muni_code= jsonResponse.features[1].properties.nationalcode;
		toast("<p>"+muni_name+"("+prov_name+")</p>"+ geolocation_msg);
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
	
	function fillForm(){
		$("#locationlabel").html(muni_name+" provincia de "+prov_name);
		var markers = map.getLayer('Markers');
		//var feature = markers.features;
		var point = markers.features[0].geometry.bounds.getCenterLonLat();
		var pointProj = new OpenLayers.LonLat(point.lon,point.lat);
		pointProj.transform(map.getProjectionObject(), gg);
		var latlonString = formatDegrees(pointProj.lat, pointProj.lon);
		
		html = 'Está a punto de introducir una denuncia en: ' + muni_name + ', provincia de ' + 
			prov_name + '.<br>La localización exacta del problema es: ' + latlonString + '. <br>' + 
			'<input type="hidden" name="longitud" value="' + point.lon + '">' + 
			'<input type="hidden" name="latitud" value="' + point.lat + '">'+
			'<input type="hidden" name="codigoine" value="' + muni_code + '">'+
			'<input type="hidden" name="municipio" value="' + muni_name + '">'+
			'<input type="hidden" name="provincia" value="' + prov_name + '">';
		$("#loc_actual").html(html);
		$("#infopanel").trigger( "updatelayout" );
	}
	
	
	function failureUA(request){
		alert('Fallo de conexión con servicio INSPIRE Administrative Units');	
	}
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

		$.ajax({
			type: "POST",
			contentType: "text/plain", // server can forbid other types for cross-server scripting
			url: urlWfsUA,
			data: postDataUA,
			success: successCallback,
			error: failureCallBack,
			});
	}
	

	var ine1= 34073434028;
	var ine2= 34073400000;
	
	var CQL_SLD_body = '<sld:StyledLayerDescriptor'
	+' xmlns:sld="http://www.opengis.net/sld"'
	+' xmlns:app="http://www.deegree.org/app"'
	+' xmlns:gml="http://www.opengis.net/gml"'
	+' xmlns:ogc="http://www.opengis.net/ogc"'
	+' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
	+' version="1.0.0"'
	+' xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">'
	+'	<sld:NamedLayer>'
	+'	<!-- known WMS layer name -->'
	+'	<sld:Name>AU.AdministrativeUnit</sld:Name>'
	+'	<!-- optional section for filtering -->'
	+'		<sld:FeatureTypeName>AU.AdministrativeUnit</sld:FeatureTypeName>'
	+'	<!-- define a user style for the layer -->'
	+'	<sld:UserStyle>'
	+'	  <sld:FeatureTypeStyle>'
	+'		<sld:Rule>'
	+'		<!-- optional section for filtering -->'
	+'		  <FILTER>'
	+'			<PropertyIsEqualTo>'
	+'		  	<OR>'
	+'					<PropertyName>nationalcode</PropertyName>'
	+'					<Literal>'+ine1+'</Literal>'
	+'					<PropertyName>nationalcode</PropertyName>'
	+'					<Literal>'+ine2+'</Literal>'
	+'			</OR>'
	+'			</PropertyIsEqualTo>'
	+'		  </FILTER>'
	+'		  <sld:MinScaleDenominator>0</sld:MinScaleDenominator>'
	+'		  <sld:MaxScaleDenominator>999999999</sld:MaxScaleDenominator>'
	+'		  <sld:PolygonSymbolizer>'
	+'			<sld:Stroke>'
	+'				<sld:CssParameter name="stroke">#ff00ff</sld:CssParameter>'
	+'				<sld:CssParameter name="stroke-opacity">1.0</sld:CssParameter>'
	+'				<sld:CssParameter name="stroke-width">1.0</sld:CssParameter>'
	+'				<sld:CssParameter name="stroke-dasharray">1</sld:CssParameter>'
	+'			</sld:Stroke>'
	+'			<sld:Fill>'
	+'				<sld:CssParameter name="fill">#ff0000</sld:CssParameter>'
	+'				<sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>'
	+'			</sld:Fill>'
	+'		  </sld:PolygonSymbolizer>'
	+'		</sld:Rule>'
	+'	  </sld:FeatureTypeStyle>'
	+'	</sld:UserStyle>'
	+' </sld:NamedLayer>'
	+'  <!-- add more NamedLayer elements or UserLayer elements here, if needed -->'
	+'</sld:StyledLayerDescriptor>';