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

function fillBoard() {
  for (var i = 0; i < map.grid.length; i++) {
    context.fillStyle = "#FFFFFF";
    if (
      map.grid[i].unit[0] instanceof Civil ||
      map.grid[i].unit[1] instanceof Civil
    ) {
      context.fillStyle = "#00FF00";
    }
    if (
      map.grid[i].unit[0] instanceof Zombie ||
      map.grid[i].unit[1] instanceof Zombie
    ) {
      context.fillStyle = "#FFA500";
    }
    if (map.grid[i].contamined == true) {
      context.fillStyle = "#FF0000";
    }

    context.fillRect(
      map.grid[i].x * padding + 1,
      map.grid[i].y * padding + 1,
      padding - 2,
      padding - 2
    );
  }
}

function setupInvasionX(array) {
  map.generate(100, 100, array);
}

window.onload = function() {
  document.getElementById("canvas").addEventListener("click", function(e) {
    //Need to get the offset of the <canvas></canvas> because the event give us the coordinate for the page and not only for the canvas
    var p = document.getElementById("canvas");
    if (e.which == 1) {
      mouseState.click = [e.layerX - p.offsetLeft, e.layerY - p.offsetTop];
      mouseState.x = Math.floor((e.layerX - p.offsetLeft) / 10);
      mouseState.y = Math.floor((e.layerY - p.offsetTop) / 10);
    }
  });
};

drawBoard();
fillBoard();

setInterval(function() {
  requestAnimationFrame(updateMap);
}, 1000);

function updateMap() {
  //Manage the progression of the invasion
  if (mouseState.used) {
    for (var x in map.grid) {
      if (map.grid[x].contamined) {
        contaminedCells.push(map.grid[x]);
      }
    }

    for (var x in contaminedCells) {
      var neighbours = contaminedCells[x].getNeighbours();
      for (var y in neighbours) {
        map.grid[neighbours[y]].contamined = true;
      }
    }

    contaminedCells.splice(0, contaminedCells.length);
  }

  drawBoard();
  fillBoard();

  //Starting Point
  if (mouseState.click && mouseState.used == false) {
    map.grid[mouseState.y * map.width + mouseState.x].contamined = true;
    map.grid[mouseState.y * map.width + mouseState.x].unit.push(new Zombie());
    mouseState.used = true;
  }
  console.log(map.grid);
}
