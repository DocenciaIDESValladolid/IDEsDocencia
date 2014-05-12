// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");

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

  /*  var sprinters = getFeatures();
    sprintersLayer.addFeatures(sprinters);*/

    var selectControl = new OpenLayers.Control.SelectFeature(sprintersLayer, {
        autoActivate:true,
        onSelect: onSelectFeatureFunction});

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
            selectControl
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
	
	

	
	/*
	var wms = new OpenLayers.Layer.WMS("Denuncias WMS",
        "http://itastdevserver.tel.uva.es/geoserver/IDEs/ows",
        {layers: 'IDEs:denuncias',transparent:true},
        {isBaseLayer: false, transitionEffect: 'resize', singleTile:false}
    );*/
	
	
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
	
	var postDatamuni='<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="json"' 
					  'xmlns:topp="http://www.openplans.org/topp"'
					  'xmlns:wfs="http://www.opengis.net/wfs"'
					  'xmlns="http://www.opengis.net/ogc"'
					  'xmlns:gml="http://www.opengis.net/gml"'
					  'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
					  'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">'
					  '<wfs:Query typeName="unidades-administrativas:AU.AdministrativeUnit" >'
						'<PropertyName>nationalcode</PropertyName>'
						'<PropertyName>nameunit</PropertyName>'
						'<Filter>'
						 ' <And>'
						 ' <PropertyIsEqualTo>'
							'<PropertyName>nationallevel</PropertyName>'
							'<Literal>4</Literal>'
						  '</PropertyIsEqualTo>'
						'  <Intersects>'
						'	<PropertyName>the_geom</PropertyName>'
						'	  <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'
						'		<gml:coordinates>-4,42</gml:coordinates>'
						'	  </gml:Point>'
						'	</Intersects>'
						 '  </And>'
						 '</Filter>'
					  '</wfs:Query>'
					'</wfs:GetFeature>';
					
	var postDataprov='<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="json"' 
					  'xmlns:topp="http://www.openplans.org/topp"'
					  'xmlns:wfs="http://www.opengis.net/wfs"'
					  'xmlns="http://www.opengis.net/ogc"'
					  'xmlns:gml="http://www.opengis.net/gml"'
					  'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
					  'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">'
					  '<wfs:Query typeName="unidades-administrativas:AU.AdministrativeUnit" >'
						'<PropertyName>nationalcode</PropertyName>'
						'<PropertyName>nameunit</PropertyName>'
						'<Filter>'
						 ' <And>'
						 ' <PropertyIsEqualTo>'
							'<PropertyName>nationallevel</PropertyName>'
							'<Literal>3</Literal>'
						  '</PropertyIsEqualTo>'
						'  <Intersects>'
						'	<PropertyName>the_geom</PropertyName>'
						'	  <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'
						'		<gml:coordinates>-4,42</gml:coordinates>'
						'	  </gml:Point>'
						'	</Intersects>'
						 '  </And>'
						 '</Filter>'
					  '</wfs:Query>'
					'</wfs:GetFeature>';
	
	
	/*FUNCIONES USADAS PARA OBTENER MUNICIPIO Y PROVINCIA A PATIR DEL NUTSCODE*/
	
	geolocate.events.register("locationupdated", this, function(e) {
		var requestmuni= OpenLayers.Request.POST({
			url: "http://www.ign.es/wfs/unidades-administrativas",
			data: postDatamuni,
			headers: {
				"Content-Type": "text/xml;charset=utf-8"
			},
		//success: function(data){alert('EXITO');}
		//failure: function(data){alert('FAIL');}
			});
		requestmuni.send(); 
		var requestprov= OpenLayers.Request.POST({
			url: "http://www.ign.es/wfs/unidades-administrativas",
			data: postDataprov,
			headers: {
				"Content-Type": "text/xml;charset=utf-8"
			},
		//success: function(data){alert('EXITO');}
		//failure: function(data){alert('FAIL');}
			});
		requestprov.send();		
    });

	
	
	
/*
    function getFeatures() {
        var features = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [1332700, 7906300]},
                    "properties": {"Name": "Igor Tihonov", "Country":"Sweden", "City":"Gothenburg"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [790300, 6573900]},
                    "properties": {"Name": "Marc Jansen", "Country":"Germany", "City":"Bonn"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [568600, 6817300]},
                    "properties": {"Name": "Bart van den Eijnden", "Country":"Netherlands", "City":"Utrecht"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-7909900, 5215100]},
                    "properties": {"Name": "Christopher Schmidt", "Country":"United States of America", "City":"Boston"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-937400, 5093200]},
                    "properties": {"Name": "Jorge Gustavo Rocha", "Country":"Portugal", "City":"Braga"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-355300, 7547800]},
                    "properties": {"Name": "Jennie Fletcher ", "Country":"Scotland", "City":"Edinburgh"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [657068.53608487, 5712321.2472725]},
                    "properties": {"Name": "Bruno Binet ", "Country":"France", "City":"Chambéry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [667250.8958124, 5668048.6072737]},
                    "properties": {"Name": "Eric Lemoine", "Country":"France", "City":"Theys"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [653518.03606319, 5721118.5122914]},
                    "properties": {"Name": "Antoine Abt", "Country":"France", "City":"La Motte Servolex"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [657985.78042416, 5711862.6251028]},
                    "properties": {"Name": "Pierre Giraud", "Country":"France", "City":"Chambéry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [742941.93818208, 5861818.9477535]},
                    "properties": {"Name": "Stéphane Brunner", "Country":"Switzerland", "City":"Paudex"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [736082.61064069, 5908165.4649505]},
                    "properties": {"Name": "Frédéric Junod", "Country":"Switzerland", "City":"Montagny-près-Yverdon"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [771595.97057525, 5912284.7041793]},
                    "properties": {"Name": "Cédric Moullet", "Country":"Switzerland", "City":"Payerne"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [744205.23922364, 5861277.319748]},
                    "properties": {"Name": "Benoit Quartier", "Country":"Switzerland", "City":"Lutry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [1717430.147101, 5954568.7127565]},
                    "properties": {"Name": "Andreas Hocevar", "Country":"Austria", "City":"Graz"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-12362007.067301,5729082.2365672]},
                    "properties": {"Name": "Tim Schaub", "Country":"United States of America", "City":"Bozeman"}}
            ]
        };

        var reader = new OpenLayers.Format.GeoJSON();

        return reader.read(features);
    }
*/

	

};
