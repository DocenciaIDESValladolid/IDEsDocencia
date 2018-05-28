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
var dataLayersWFS = [];
/**
 * 
 */
function setupOpenLayers() {
    gridInvaderSource = new ol.source.Vector();

    var gridInvaderLayer = new ol.layer.Vector({
        source: gridInvaderSource
    });

    var zombieFeatureStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 1,
            scale: 0.1,
            src: './img/zombie.png'
        })
    });
    var zombieFeature = new ol.Feature();
    zombieFeature.setGeometry(null);
    zombieFeature.setStyle(zombieFeatureStyle);
    var zombieVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [zombieFeature]
        })
    });


    mapOpenlayers = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            gridInvaderLayer,
            zombieVector
        ],

        view: new ol.View({
            center: ol.proj.fromLonLat([3.80, 43.55]),
            //projection: 'EPSG:4326',
            zoom: 10
        })
    });
    mapOpenlayers.on("click", function (e) {
        var coord = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
        var lon = coord[0];
        var lat = coord[1];
        var sizeCell = map.getSizeCells();
        var x = Math.floor((lon - map.minLon) / sizeCell[0]);
        var y = Math.floor((map.maxLat - lat) / sizeCell[1]);
        try {
            map.layerInvader.grid[y * map.width + x].active = 1;
            var coordinates = mapOpenlayers.getEventCoordinate(e.originalEvent);
            zombieFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
            launch = true;
        } catch (error) {
            displayError("Primero tienes que hacer clic en el botón de lanzamiento");
        }
    });
    //displayInvaders(map.layerInvader.grid);
}
/**
 * 
 * @param {*} invaders 
 */
function displayInvaders(invaders) {
    var sizeCell = map.getSizeCells();
    for (var i in invaders) {
        var x = map.minLon + (invaders[i].x) * sizeCell[0];
        var y = map.maxLat - (invaders[i].y) * sizeCell[1];
        var coordinateCell = [
            [x, y],
            [x + sizeCell[0], y],
            [x + sizeCell[0], y + sizeCell[1]],
            [x, y + sizeCell[1]],
            [x, y]
        ];
        var rect = new ol.geom.Polygon([coordinateCell]);
        rect.transform('EPSG:4326', 'EPSG:3857');
        var cell = new ol.Feature(rect);
        if (invaders[i].active === 0) {
            cell.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,0,0.5)'
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
/**
 * Display the bbox where the simulation will happen
 */
function displayBoundingBox() {
    var boundingBox = mapOpenlayers.getView().calculateExtent(mapOpenlayers.getSize());
    var extent = ol.proj.transformExtent(boundingBox, 'EPSG:3857', 'EPSG:4326');
    map.setCoordinates(extent);
    var rect = [
        [map.minLon, map.minLat],
        [map.minLon, map.maxLat],
        [map.maxLon, map.maxLat],
        [map.maxLon, map.minLat],
        [map.minLon, map.minLat]
    ]
    var polygon = new ol.geom.Polygon([rect]);
    polygon.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature(polygon);
    gridInvaderSource.addFeature(feature);
}
/**
 * Display WFS result for each layer
 * But from the IGN WFS, the GeoJSON cannot be read correctly by OpenLayers
 * https://openlayers.org/en/v4.6.5/doc/errors/#36 
 */
function displayWFS(layer) {
    var vectorSource = new ol.source.Vector({
        format: new ol.format.WFS(),
        url: layer.getWFS(map.minLon, map.minLat, map.maxLon, map.maxLat),
    })
    var vector = new ol.layer.Vector({
        source: vectorSource,
        style: layer.style,
    });
    dataLayersWFS.push(vector);
    mapOpenlayers.addLayer(vector);
}
