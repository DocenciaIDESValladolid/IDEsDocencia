////////////////////////////////////////////////////////////////
//                                                            //
//                         OPENLAYERS                         //
//                                                            //
////////////////////////////////////////////////////////////////

/**
 * 
 */
var mapOpenlayers;

/**
 * 
 */
var gridInvaderSource;

/**
 * 
 */
function setupOpenLayers() {
    gridInvaderSource = new ol.source.Vector();

    var gridInvaderLayer = new ol.layer.Vector({
        source: gridInvaderSource
    });

    mapOpenlayers = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            gridInvaderLayer
        ],

        view: new ol.View({
            center: ol.proj.fromLonLat([3.80, 43.55]),
            zoom: 10
        })
    });
    mapOpenlayers.on("click", function (e) {
        mapOpenlayers.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
            var coord = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
            var lon = coord[0];
            var lat = coord[1];
            var x = Math.floor((lon - minLon) / sizeCellx);
            var y = Math.floor((maxLat - lat) / sizeCelly);
            map.layerInvader.grid[y * map.width + x].active = 1;
            launch = true;
        })
    });
    //displayInvaders(map.layerInvader.grid);
}
/**
 * 
 * @param {*} invaders 
 */
function displayInvaders(invaders) {
    gridInvaderSource.clear();
    for (var i in invaders) {
        var x = minLon + invaders[i].x * sizeCellx;
        var y = maxLat - invaders[i].y * sizeCelly;
        var coordinateCell = [
            [x, y],
            [x + sizeCellx, y],
            [x + sizeCellx, y + sizeCelly],
            [x, y + sizeCelly],
            [x, y]
        ];
        var rect = new ol.geom.Polygon([coordinateCell]);
        rect.transform('EPSG:4326', 'EPSG:3857');
        var cell = new ol.Feature(rect);
        if (invaders[i].active === 0) {
            cell.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,0,0.2)'
                })
            }))
        } else {
            cell.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255,0,0,0.5)'
                })
            }))
        }
        gridInvaderSource.addFeature(cell);
    }
}