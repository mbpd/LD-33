function SteelDoor(x, y)
{
    this.image = images.steeldoor_closed;
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE * 3;
    
    this.triggered = false;
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE * 3;

    this.centerX = this.x + this.ox/2;
    this.centerY = this.y + this.oy/2;

    this.drawX = this.x + this.ox;
    this.drawY = this.y + this.oy - 64;

    this.collisionBox = [this.x + this.ox, this.y + this.oy, this.x, this.y];

    this.realX = this.x;
    this.realY = this.y;
}

SteelDoor.prototype.turnOn = function()
{
    this.triggered = true;
    this.image = images.steeldoor_open;
    this.x = this.realX - TILE_SIZE;
    this.y = this.realY - 3 * TILE_SIZE;
}

SteelDoor.prototype.turnOff = function()
{
    this.triggered = false;
    this.image = images.steeldoor_closed;
    this.x = this.realX;
    this.y = this.realY;
}

SteelDoor.prototype.toggle = function()
{
    this.triggered = !this.triggered;
    this.image = this.triggered ? images.steeldoor_open : images.steeldoor_closed;
}

SteelDoor.prototype.draw = function ()
{
   ctx.drawImage(this.image, this.drawX, this.drawY); 
}

SteelDoor.prototype.getCenterX = function()
{
    return this.centerX;
}

SteelDoor.prototype.getCenterY = function()
{
    return this.centerY;
}

SteelDoor.prototype.getCollisionBox = function()
{
    return (this.triggered ? null : this.collisionBox);
}
