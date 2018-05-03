class Layer {
  /*
    constructor(w, h, name, color) {
        this.width = w;
        this.height = h;
        this.name = name;
        this.color = color;
        this.grid = [];
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                this.grid.push(new Cell(x,y,0));
            }
        }
    }
    */
  constructor(w, h, name, color, array) {
    this.width = w;
    this.height = h;
    this.name = name;
    this.color = color;
    this.grid = [];
    /*
    if (typeof array == "undefined") {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          this.grid.push(new Cell(x, y, 0));
        }
      }
    } else {
      for (var i in array) {
        this.grid.push(new Cell(i % 100, Math.floor(i / 100), array[i]));
      }
    }
    */
  }
}

class LayerInvader extends Layer {
  constructor(w,h,name,color) {
    super(w,h,name,color);
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        this.grid.push(new Cell(x, y, 0));
      }
    }
  }
}

class LayerData extends Layer {
  constructor(w,h,name,color,arrayData) {
    super(w,h,name,color);
    for (var i in arrayData) {
      this.grid.push(new Cell(i % 100, Math.floor(i / 100), arrayData[i]));
    }
  }
}

function fetchLayerFromGeoserver(layer) {
    fetch("/geoserver/wps", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml; charset=UTF-8"
    },
    body: layer.xml
  })
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(data) {
      map.layers.push(
        new LayerData(
          map.width,
          map.height,
          layer.name,
          layer.color,
          readTiff(data)
        )
      );
    });
}

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
