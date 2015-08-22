var TILE_SIZE = 64;
var tiles = [];

var BASE_TILE_URL = "tiles/"
var NUMBER_OF_TILES = 2;
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

    tiles.push(img);
}

var loadTiles = loadNextTile;
