////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////
var launch = false;

/**
 *  
 */
var map = {
    width: 100,
    height: 100,
    layers: [],
    layerInvader: null,
    nbStep: 0,

    generate: function (layersData, layerInvader) {
        //TODO: look about launch multiple fetch at same time
        //https://stackoverflow.com/questions/38150791/making-multiple-fetch-api-calls-how-to-check-if-all-calls-have-finished/38151731?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        for (var i in layersData) {
            if (layersData[i].data === null) {
                fetchLayerFromGeoserver(layersData[i]);
            }
            map.layers.push(
                new LayerData(
                    map.width,
                    map.height,
                    layersData[i].name,
                    layersData[i].color,
                    layersData[i].data,
                    layersData[i].infectionProbability
                )
            );
        }
        map.layerInvader = new LayerInvader(100, 100, layerInvader.name, layerInvader.color, layerInvader.infectionRate);
    },

    reset() {
        this.layers = [];
        this.layerInvader = null;
        nbStep = 0;
    }
};
////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////
/**
 * 
 */
class Layer {
    constructor(w, h, name, color) {
        this.width = w;
        this.height = h;
        this.name = name;
        this.color = color;
        this.grid = [];
    }
}
/**
 * 
 */
class LayerInvader extends Layer {
    constructor(w, h, name, color, infectionRate) {
        super(w, h, name, color);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.grid.push(new Cell(x, y, 0));
            }
        }
        this.infectionRate = infectionRate;
    }
}
/**
 * 
 */
class LayerData extends Layer {
    constructor(w, h, name, color, arrayData, infectionProbability) {
        super(w, h, name, color);
        for (var i in arrayData) {
            this.grid.push(new Cell(i % 100, Math.floor(i / 100), arrayData[i]));
        }
        this.infectionProbability = infectionProbability;
    }
}
/**
 * 
 * @param {*} layer 
 */
function fetchLayerFromGeoserver(layer) {
    return fetch("/geoserver/wps", {
            method: "POST",
            headers: {
                "Content-Type": "application/xml; charset=UTF-8"
            },
            body: layer.xml
        })
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (data) {
            layer.data = readTiff(data);
        });
}
/**
 * 
 * @param {*} data 
 */
function readTiff(data) {
    var tiff = GeoTIFF.parse(data);
    var image = tiff.getImage();
    var result;
    image.readRGB(function () {
        var rasters = image.readRasters();
        result = rasters[0];
    });
    return result;
}
////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////

/**
 * 
 */
var contaminedCells = [];

/**
 * 
 */
class Cell {
    constructor(cx, cy, active) {
        this.x = cx;
        this.y = cy;
        this.active = active;
    }

    getNeighbours() {
        var n = [];

        for (var y = (this.y - 1); y <= (this.y + 1); y++) {
            for (var x = (this.x - 1); x <= (this.x + 1); x++) {
                if (y < 0 || x < 0 || x >= map.width || y >= map.height || (y === 0 && x === 0)) {
                    continue;
                }
                n.push((y * map.width) + x);
            }
        }
        return n;
    }
}
////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////

/**
 * 
 */
function updateInvaders() {
    if (launch) {
        for (var i in map.layerInvader.grid) {
            if (map.layerInvader.grid[i].active > 0) {
                contaminedCells.push(map.layerInvader.grid[i]);
            }
        }
        for (var i in contaminedCells) {
            var neighbours = contaminedCells[i].getNeighbours();
            for (var j in neighbours) {
                var rate = map.layerInvader.infectionRate;
                for (var h in map.layers) {
                    var cell = map.layers[h].grid[neighbours[j]];
                    if (cell.active > 0) {
                        rate *= map.layers[h].infectionProbability;
                    }
                }
                if (Math.random() < rate) {
                    map.layerInvader.grid[neighbours[j]].active = 1;
                }
            }
        }
        map.nbStep += 1;
    }
    displayInvaders(map.layerInvader.grid);
    contaminedCells.splice(0, contaminedCells.length);
}