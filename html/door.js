function Door(x, y, side)
{
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE;
    this.side = side;


    // drawing offsets
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;
    switch(this.side)
    {
        case "up":
            this.oy -= 4;
            this.collisionBox = [this.x + this.ox, this.y - 16, this.x, this.y + 3];
            break;
    }

    this.open = false;

    this.cursor = images.cursor_use

    this.generateImage();
}

Door.prototype.generateImage = function()
{
    var state = this.open ? "open" : "closed";
    this.img = images["door_" + this.side + "_" + state];
}

Door.prototype.draw = function()
{
    ctx.drawImage(this.img, this.x + this.ox, this.y + this.oy);
}

Door.prototype.canUse = function(x, y)
{
    return x >= this.x + this.ox && x < this.x &&
           y >= this.y + this.oy && y < this.y;
}

Door.prototype.use = function()
{
    this.open = !this.open;

    this.generateImage();
}

Door.prototype.getCenterX = function()
{
    return this.x - TILE_SIZE/2;
}

Door.prototype.getCenterY = function()
{
    return this.y - TILE_SIZE/2;
}

Door.prototype.getCollisionBox = function()
{
    if(this.open)
        return null;
    else
        return this.collisionBox;
}
