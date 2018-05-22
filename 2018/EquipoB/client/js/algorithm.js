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

    minLon: limMinLon,
    minLat: limMinLat,
    maxLon: limMaxLon,
    maxLat: limMaxLat,

    layers: [],
    layerInvader: null,

    nbStep: 0,

    async generate(layersData, layerInvader) {
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
                    body: layer.getXML(this.minLon, this.minLat, this.maxLon, this.maxLat)
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
            displayError("Impossible to download layers from the geoserver");
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

    getSizeCells() {
        return [(this.maxLon - this.minLon) / this.width, (this.maxLat - this.minLat) / this.height];
    },

    setCoordinates(extent) {
        this.minLon = (limMinLon <= extent[0] && extent[0] <= extent[2]) ? extent[0] : limMinLon;
        this.minLat = (limMinLat <= extent[1] && extent[1] <= extent[3]) ? extent[1] : limMinLat;
        this.maxLon = (extent[0] <= extent[2] && extent[2] <= limMaxLon) ? extent[2] : limMaxLon;
        this.maxLat = (extent[1] <= extent[3] && extent[3] <= limMaxLat) ? extent[3] : limMaxLat;
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

////////////////////////////////////////////////////////////////
//
//  
//
////////////////////////////////////////////////////////////////
/**
 * 
 * Read the .tiff file we receive from request to Geoserver
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
        try {
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
        } catch (error) {
            displayError(error.message);
        }
        map.nbStep += 1;

        displayInvaders(newContaminedCells);
        contaminedCells.splice(0, contaminedCells.length);
        newContaminedCells.splice(0, newContaminedCells.length);
    } else {
        stopLoop();
        displayError("Select a cell in the bounding box");
    }
}