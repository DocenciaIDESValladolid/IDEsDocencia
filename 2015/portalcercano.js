OpenLayers.ProxyHost = 'proxy.cgi?url=';  

var map, client, intersect, buffer;

function init() {
    
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        center: [-4.6, 41],
        zoom: 4,
        layers: [new OpenLayers.Layer.Vector()]
    });

  //  var features = [new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT('POINT(-4.61325 41.65132)'))];
    var features = [new OpenLayers.Geometry.Point(-4.61325, 41.65132)];
    map.baseLayer.addFeatures(features);
    
    client = new OpenLayers.WPSClient({
        servers: {
            cartociudad: 'http://www.cartociudad.es/wps/WebProcessingService'
        }
    });
    
    // Create a process and configure it
    intersect = client.getProcess('cartociudad', 'org.cnig.cartociudad.wps.ClosestPointFinder');    
    intersect.execute({
        // spatial input can be a feature or a geometry or an array of
        // features or geometries
        inputs: {
            orig: features
        },
		success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
            map.baseLayer.addFeatures(outputs.result);
        }
    });
    
    // Create another process which chains the previous one and execute it
 /*   buffer = client.getProcess('cartociudad', 'JTS:buffer');
    buffer.execute({
        inputs: {
            geom: intersect.output(),
            distance: 1
        },
        success: function(outputs) {
            // outputs.result is a feature or an array of features for spatial
            // processes.
            map.baseLayer.addFeatures(outputs.result);
        }
    });*/

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