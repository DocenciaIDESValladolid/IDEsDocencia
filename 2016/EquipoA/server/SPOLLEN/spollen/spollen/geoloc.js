var lon = -4;
var lat = 41;
var zoom = 5;
var map, layer;

function init(){
	
	//Estilo marcador
	var style = {
	fillColor: '#000',
	fillOpacity: 0.1,
	strokeWidth: 0
	};
	
    map = new OpenLayers.Map( 'map' );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
	var pnoa_layer = new OpenLayers.Layer.WMS( "Ortofotos España","http://www.ign.es/wms-inspire/pnoa-ma?", {layers: 'PNOA'} );
  	var avisos_layer = new OpenLayers.Layer.WMS( "Usos del suelo","http://localhost:8080/geoserver/wms?", {layers: 'Proyecto:Avisos',transparent: true}, {isBaseLayer: false, opacity: 1} );
	var geoloc = new OpenLayers.Layer.Vector('Geolocalicacion');
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
