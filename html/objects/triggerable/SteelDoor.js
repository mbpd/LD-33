function SteelDoor(x, y)
{

    this.image = images.steeldoor_closed;
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE * 3;
    this.triggered = false;
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE * 3;

    this.collisionBox = [this.x + this.ox, this.y + this.oy, this.x, this.y];

}

SteelDoor.prototype.turnOn = function()
{
    this.triggered = true;
    this.image = images.steeldoor_open;
    this.collisionBox = [0,0,0,0];
}

SteelDoor.prototype.turnOff = function()
{
    this.triggered = false;
    this.image = images.steeldoor_closed;
    this.collisionBox = [this.x + this.ox, this.y + this.oy, this.x, this.y];
}

SteelDoor.prototype.toggle = function()
{
    this.triggered = !this.triggered;
    this.image = this.triggered ? images.steeldoor_open : images.steeldoor_closed;
}

SteelDoor.prototype.draw = function ()
{
   ctx.drawImage(this.image, this.x + this.ox, this.y + this.oy); 
}

SteelDoor.prototype.getCenterX = function()
{
    return this.x + this.ox/2;
}

SteelDoor.prototype.getCenterY = function()
{
    return this.y + this.oy/2;
}

SteelDoor.prototype.getCollisionBox = function()
{
    return (this.triggered ? null : this.collisionBox);
}
