function MetroStation(x, y)
{
    this.x = x + TILE_SIZE*2;
    this.y = y + 112 - 5;

    this.ox = -TILE_SIZE * 2;
    this.oy = -112 + 5;

    this.collisionBox = [this.x + this.ox, this.y + this.oy, this.x, this.y];

    this.cursor = images.cursor_use;
}

MetroStation.prototype.draw = function()
{
    ctx.drawImage(images["metro_station"], this.x + this.ox, this.y + this.oy);
}

MetroStation.prototype.canUse = function(x, y)
{

    return x >= this.x + this.ox && x < this.x &&
           y >= this.y + this.oy && y < this.y;
}

MetroStation.prototype.use = function(level)
{
    if(level.C4Timer === 0)
    {
       switchState(new CutSceneState(new MetroCutScene(images["metro"], images["station"], images["background"], images["light"])));
    }
}

MetroStation.prototype.getCenterX = function()
{
        return this.x - TILE_SIZE;
}

MetroStation.prototype.getCenterY = function()
{
        return this.y - 112/2;
}

MetroStation.prototype.getCollisionBox = function()
{
        return this.collisionBox;
}
