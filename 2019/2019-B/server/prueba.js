var map = new OpenLayers.Map({
    div: "map",
    center: new OpenLayers.LonLat(0, 0),
    minResolution: "auto",
    maxResolution: "auto"
});

map.addControl(new OpenLayers.Control.LayerSwitcher());

var layerOSM = new OpenLayers.Layer.OSM();
map.addLayer(layerOSM);



map.setCenter(new OpenLayers.LonLat(0, 0), 0);


var vectorLayer = new OpenLayers.Layer.Vector("myLayer");

var format = new OpenLayers.Format.WKT({
    'internalProjection': map.baseLayer.projection,
    'externalProjection': new OpenLayers.Projection("EPSG:4326")
});

var firstFeature = format.read("LINESTRING(-114.609375 46.7578125, -99.140625 -35.5078125, -62.578125 -45.3515625, -56.25 40.4296875, -73.125 33.3984375, -68.203125 55.8984375, -24.609375 36.2109375, -8.4375 56.6015625)");
var secondFeature = format.read("LINESTRING(116.015625 -45.3515625, 82.96875 -39.0234375, 78.75 -12.3046875, 86.484375 1.7578125, 102.65625 -5.2734375, 111.796875 -23.5546875, 133.59375 -20.7421875, 136.40625 -5.2734375, 120.234375 20.7421875, 98.4375 24.2578125, 75.9375 15.1171875, 49.921875 3.1640625, 42.890625 29.8828125, 66.09375 36.2109375, 94.921875 36.2109375, 75.234375 48.1640625, 33.75 58.7109375, 19.6875 39.7265625, 25.3125 18.6328125)");

var myFirstLineStyle = OpenLayers.Util.applyDefaults(myFirstLineStyle, OpenLayers.Feature.Vector.style['default']);
myFirstLineStyle.strokeColor = "#ffffff";
myFirstLineStyle.strokeWidth = 8;
firstFeature.style = myFirstLineStyle;

var mySecondLineStyle = OpenLayers.Util.applyDefaults(mySecondLineStyle, OpenLayers.Feature.Vector.style['default']);
mySecondLineStyle.strokeColor = "#000000";
mySecondLineStyle.strokeWidth = 4;
secondFeature.style = mySecondLineStyle;

vectorLayer.addFeatures([firstFeature, secondFeature]);
map.addLayer(vectorLayer);
