var TILE_SIZE = 64;
var tiles = [];

var collides = new Set([1, 2, 3, 5]);

var BASE_TILE_URL = "tiles/"
var NUMBER_OF_TILES = 6;
var current_tile = 0;

function loadNextTile()
{
    if(current_tile == NUMBER_OF_TILES)
    {
        afterLoadTiles();
        return;
    }

    current_tile++;

    var img = new Image();
    img.onload = loadNextTile;
    img.src = BASE_TILE_URL + (current_tile-1) + ".png";

    ctx.clearRect(0, 0, 800, 600);
    ctx.font = "20px Monospace";
    ctx.fillStyle = "#00FF00";
    ctx.fillText("Loading tiles... " + (current_tile - 1) + "/" + NUMBER_OF_TILES, 50, 50);

    tiles.push(img);
}

var loadTiles = loadNextTile;
