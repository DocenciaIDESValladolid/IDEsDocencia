var map = {
  width: 100,
  height: 100,
  grid: [],

  generate: function(w, h, array) {
    /*
    this.width = w;
    this.height = h;
    this.grid = [];
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        this.grid.push(new Cell(x, y));
      }
    }
    */
   for (var x in array) {
     var newCell = new Cell(x%100, Math.floor(x/100));
     if(array[x]>0) {
      newCell.unit.push(new Civil(100,array[x]));
     }
     this.grid.push(newCell);
   }
  }
};

