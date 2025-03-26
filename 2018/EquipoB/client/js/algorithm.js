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

    async generate(layersData, layerInvader) {
        //TODO: look about launch multiple fetch at same time
        //https://stackoverflow.com/questions/38150791/making-multiple-fetch-api-calls-how-to-check-if-all-calls-have-finished/38151731?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        /*
        for (var i in layersData) {
            this.fetchLayerData(layersData[i]);
        }
        */

        /*
        var requests = layersData.map(layer => fetch("/geoserver/wps", {
            method: "POST",
            headers: {
                "Content-Type": "application/xml; charset=UTF-8"
            },
            body: layer.xml
        }))
        */
        /*
        Promise.all(requests)
            .then(responses => {
                var tiffs = [];
                responses.map(response => {
                    tiffs.push(response.arrayBuffer());
                })
                return tiffs;
            })
            .then(tiffs => {
                Promise.all(tiffs)
            })
            .then(data => {
                console.log(data);
            });
            */
        $.mobile.loading("show", {
            text: "Loading layers",
            textVisible: true,
            theme: "b",
            html: ""
        })
        try {
            var responses = await Promise.all(
                layersData.map(layer => fetch("/geoserver/wps", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    body: layer.xml
                })));
            var arrayBuffers = await Promise.all(responses.map(response => response.arrayBuffer()));
            var tiffs = await Promise.all(arrayBuffers.map(arrayBuffer => readTiff(arrayBuffer)));
            for (var i in layersData) {
                map.layers.push(
                    new LayerData(
                        map.width,
                        map.height,
                        layersData[i].name,
                        layersData[i].color,
                        tiffs[i],
                        layersData[i].infectionProbability
                    )
                );
            }
            map.layerInvader = new LayerInvader(100, 100, layerInvader.name, layerInvader.color, layerInvader.infectionRate);

        } catch (error) {
            console.error(error);
        } finally {
            $.mobile.loading("hide");
        }

    },

    reset() {
        this.layers = [];
        this.layerInvader = null;
        gridInvaderSource.clear();
        nbStep = 0;
    },
    /*
    fetchLayerData(layer) {
        fetch("/geoserver/wps", {
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
                map.layers.push(
                    new LayerData(
                        map.width,
                        map.height,
                        layer.name,
                        layer.color,
                        layer.data,
                        layer.infectionProbability
                    )
                );
            });
    }
    */
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

////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////
/**
 * 
 * @param {*} layer 
 */
/*
function fetchLayerFromGeoserver(layer) {
    fetch("/geoserver/wps", {
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
*/
/**
 * 
 * Read the .tiff file we receive from request to Geoserver
 */
function readTiff(data) {
    console.log(data);
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
var newContaminedCells = [];
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
                if (y < 0 || x < 0 || x >= map.width || y >= map.height || (y === this.y && x === this.x)) {
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
 * Contamined neighbours cell from a contamined cell.
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
                //Verify if the cell in the layer invader is not contamined
                var cellInvader = map.layerInvader.grid[neighbours[j]];
                if (cellInvader.active === 0) {
                    //Rate infection of the invaders
                    var rate = map.layerInvader.infectionRate;
                    //For each layerData, if there is an information in the cell -> modify the rateInfection
                    for (var h in map.layers) {
                        var cellData = map.layers[h].grid[neighbours[j]];
                        if (cellData.active > 0) {
                            rate *= map.layers[h].infectionProbability;
                        }
                    }
                    if (Math.random() < rate) {
                        map.layerInvader.grid[neighbours[j]].active = 1;
                        //insert all new contamined cells to be displayed in openlayers
                        newContaminedCells.push(map.layerInvader.grid[neighbours[j]]);
                    }
                }
            }
        }
        map.nbStep += 1;
    }
    displayInvaders(newContaminedCells);
    contaminedCells.splice(0, contaminedCells.length);
    newContaminedCells.splice(0, newContaminedCells.length);
}