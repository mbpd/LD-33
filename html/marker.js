function C4Marker(x, y)
{
    this.x = x;
    this.y = y;
    this.cursor = images.cursor_c4
}

C4Marker.prototype.draw = function()
{
    ctx.drawImage(images.mark_c4, this.x, this.y);
}

C4Marker.prototype.canUse = function(x, y)
{
    return x >= this.x && x < this.x + TILE_SIZE &&
           y >= this.y && y < this.y + TILE_SIZE;
}

C4Marker.prototype.use = function(level)
{
    level.startC4Timer();
}

C4Marker.prototype.getCenterX = function()
{
    return this.x + 32;
}

C4Marker.prototype.getCenterY = function()
{
    return this.y + 32;
}
