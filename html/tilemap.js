function TileMap(width, height, tiles)
{
    this.width = width;
    this.height = height;

    this.pixel_width = TILE_SIZE * width;
    this.pixel_height = TILE_SIZE * height;

    this.data = tiles;
}

TileMap.prototype.get = function(x, y)
{
    return this.data[x + this.width * y];
}

TileMap.prototype.prerender = function()
{
    // prerender the entire level so it's faster to render
    this.rendered_image = document.createElement("canvas");
    this.rendered_image.width = this.pixel_width;
    this.rendered_image.height = this.pixel_height;

    var prerender_ctx = this.rendered_image.getContext("2d");
    for(var y = 0; y < this.height; y++)
    for(var x = 0; x < this.width; x++)
    {
        var tile_i = this.data[x + this.width * y];
        prerender_ctx.drawImage(tiles[tile_i], x * TILE_SIZE, y * TILE_SIZE);
    }
}

TileMap.prototype.getPrerender = function()
{
    return this.rendered_image;
}
