//OpenLayers.ProxyHost = 'proxy.cgi?url=';

var map, client, intersect, buffer;

function init() {
    
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        center: [114, 16],
        zoom: 4,
        layers: [new OpenLayers.Layer.Vector()]
    });

    var ruta = new OpenLayers.Layer.Vector("ruta",{
    projection: "EPSG:4326"});
    var rutaFeature=new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(
        'LINESTRING(117 22,112 18,118 13, 115 8)'));
    ruta.addFeatures(rutaFeature);
    var areas = new OpenLayers.Layer.Vector("areas",{
    projection: "EPSG:4326"});    
    areas.addFeatures([new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(
        'POLYGON((110 20,120 20,120 10,110 10,110 20),(112 17,118 18,118 16,112 15,112 17))'))]);

    map.addLayer(ruta);
    map.addLayer(areas);
    
    client = new OpenLayers.WPSClient({
        servers: {
            opengeo: 'http://localhost/geoserver/wps'
        }
    });
    
    
    // Create another process which chains the previous one and execute it
    buffer = client.getProcess('opengeo', 'vec:BufferFeatureCollection');
    buffer.configure({
        inputs: {
            features: rutaFeature,
            distance: 1
        },
        success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
            map.baseLayer.addFeatures(outputs.result);
        }
    });
   // Create a process and configure it
    intersect = client.getProcess('opengeo', 'vec:IntersectionFeatureCollection');    
    intersect.execute({
        // spatial input can be a feature or a geometry or an array of
        // features or geometries
        inputs: {
            'first feature collection': buffer.output(),
            'second feature collection': areas.features,
            intersectionMode : 'INTERSECTION',
            percentagesEnabled : true,
            areasEnabled : true,

        },
        success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
            map.baseLayer.addFeatures(outputs.result);
        }
    });
    // Instead of creating a process and executing it, we could call execute on
    // the client directly if we are only dealing with a single process:
    /*
    client.execute({
        server: "opengeo",
        process: "JTS:intersection",
        // spatial input can be a feature or a geometry or an array of
        // features or geometries
        inputs: {
            a: features,
            b: geometry
        },
        success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
            map.baseLayer.addFeatures(outputs.result);
        }
    });
    */

}