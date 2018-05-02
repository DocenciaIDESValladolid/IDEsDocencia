var mouseState = {
  used: false,
  x: 0,
  y: 0,
  click: null
};

var canvasWidth = 1000;
var canvasHeight = 1000;

var padding = 10;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function colorCellInLayer(nameLayer) {
  if (nameLayer) {
    for (var i in map.layers) {
      if (map.layers[i].name == nameLayer) {
        for (var j in map.layers[i].grid) {
          if (map.layers[i].grid[j].active > 0) {
            context.fillStyle = map.layers[i].color;
          } else {
            context.fillStyle = "#FFFFFF";
          }
          context.fillRect(
            map.layers[i].grid[j].x * padding + 1,
            map.layers[i].grid[j].y * padding + 1,
            padding - 2,
            padding - 2
          );
        }
        break;
      }
    }
  }
  for (var i in map.layerInvader.grid) {
    if (map.layerInvader.grid[i].active > 0) {
      context.fillStyle = map.layerInvader.color;
      context.fillRect(
        map.layerInvader.grid[i].x * padding + 1,
        map.layerInvader.grid[i].y * padding + 1,
        padding - 2,
        padding - 2
      );
    }
  }
}


function drawBoard() {
  for (var x = 0; x <= canvasWidth; x += padding) {
    context.moveTo(x, 0);
    context.lineTo(x, canvasHeight);
  }

  for (var y = 0; y <= canvasHeight; y += padding) {
    context.moveTo(0, y);
    context.lineTo(canvasWidth, y);
  }

  context.strokeStyle = "black";
  context.stroke();
}

window.onload = function() {
  document.getElementById("canvas").addEventListener("click", function(e) {
    //Need to get the offset of the <canvas></canvas> because the event give us the coordinate for the page and not only for the canvas
    var p = document.getElementById("canvas");
    if (e.which == 1) {
      mouseState.click = [e.layerX - p.offsetLeft, e.layerY - p.offsetTop];
      mouseState.x = Math.floor((e.layerX - p.offsetLeft) / 10);
      mouseState.y = Math.floor((e.layerY - p.offsetTop) / 10);
      mouseState.used = true;
      map.layerInvader.grid[mouseState.y * map.width + mouseState.x].active = 1;
    }
  });
};

drawBoard();

function updateMap() {
  if (mouseState.used) {
    for (var i in map.layerInvader.grid) {
      if (map.layerInvader.grid[i].active > 0) {
        contaminedCells.push(map.layerInvader.grid[i]);
      }
    }
    for (var i in contaminedCells) {
      var neighbours = contaminedCells[i].getNeighbours();
      for (var j in neighbours) {
        map.layerInvader.grid[neighbours[j]].active = 1;
      }
    }
  }
  colorCellInLayer();
  contaminedCells.splice(0, contaminedCells.length);
}
