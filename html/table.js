function Table(x, y, side)
{
    this.x = x + 2 * TILE_SIZE;
    this.y = y + TILE_SIZE;

    this.side = side;

    // drawing offsets
    this.ox = -2 * TILE_SIZE;
    this.oy = -TILE_SIZE;

    switch(this.side)
    {
        case "up":
            this.collisionBox = [this.x + this.ox, this.y - 32, this.x, this.y];
            break;
        case "down":
            this.collisionBox = [this.x + this.ox, this.y - 28, this.x, this.y];
            break;
    }

    this.generateImage();
}

Table.prototype.generateImage = function()
{
    this.img = images["table_" + this.side];
}

Table.prototype.draw = function()
{
    if(!this.destroy)
        ctx.drawImage(this.img, this.x + this.ox, this.y + this.oy);
}

Table.prototype.getCollisionBox = function()
{
    if(this.destroyed)
        return null;
    return this.collisionBox;
}

Table.prototype.destroy = function()
{
    this.destroyed = true;
}
