var lon = -4;
var lat = 41;
var zoom = 5;
var map, layer, wfs;

function init(){
	
	//Estilo marcador
	var style = {
	fillColor: '#000',
	fillOpacity: 0.1,
	strokeWidth: 0
	};
	
    map = new OpenLayers.Map( 'map' );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
	var pnoa_layer = new OpenLayers.Layer.WMS( "Ortofotos España","http://www.ign.es/wms-inspire/pnoa-ma?", {layers: 'PNOA',transparent: true} );
  	var avisos_layer = new OpenLayers.Layer.WMS( "Avisos","http://localhost:8080/geoserver/wms?", {layers: 'Proyecto:Avisos',transparent: true}, {isBaseLayer: false, opacity: 1} );
	geoloc = new OpenLayers.Layer.Vector('Geolocalicacion');
	
	
    map.addLayers([pnoa_layer,layer, avisos_layer,geoloc]);
	
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
	// GEOLOCALIZACION
	
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
	addCoverFromPoint(e.point,0.01);
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

var gmlLandcoverFormat= getGML3FormatInspire();

function addCoverFromPoint(punto,distancia){
	var punto2 = new OpenLayers.Geometry.Point(-4.3,40);
		coverwfs = new OpenLayers.Layer.Vector("WFS", {
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
			srsName: "EPSG:4326",
			url:  "http://localhost/wfs",
			featureType: "LandCoverUnit",
			featureNS: "http://inspire.ec.europa.eu/schemas/lcv/4.0",
			outputFormat: gmlLandcoverFormat,
			readFormat: gmlLandcoverFormat
		}),
		filter: new OpenLayers.Filter.Spatial({
			property: "geometry",
			type: OpenLayers.Filter.Spatial.DWITHIN,
			value: punto,
			distance: distancia,
			distanceUnits: 'meters'
		})		
	});
	map.addLayer(coverwfs);
	}