function Windows(x, y, message_id)
{
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE + 2;

    // drawing offsets
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;

    this.cursor = images.cursor_use;
}

Windows.prototype.draw = function()
{
    ctx.drawImage(images.windows, this.x + this.ox, this.y + this.oy - 37);
}

Windows.prototype.canUse = function(x, y)
{
    return x >= this.x + this.ox && x < this.x &&
           y >= this.y + this.oy - 35 && y < this.y - 35;
}

Windows.prototype.use = function()
{
    gameState.level.getPlayer().kill();
}

Windows.prototype.getCenterX = function()
{
    return this.x - TILE_SIZE/2;
}

Windows.prototype.getCenterY = function()
{
    return this.y - TILE_SIZE/2;
}
