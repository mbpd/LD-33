function triggerPad(x, y)
{
    this.image = images.inactive_pad;
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE:
    this.active = false;
    
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;;
}

triggerPad.prototype.activate = function()
{
    this.active = true;
    this.image = images.active_pad;

    if(this.geaNearesttTriggerable())
        this.getNearestTriggerable().turnOn();
}

triggerPad.prototype.deactivate = function()
{
    this.active = false;
    this.image = images.inactive_pad;

    if(this.geaNearesttTriggerable())
        this.getNearestTriggerable().turnOff();
}

triggerPad.prototype.toogle = function()
{
    this.active = !this.active;
    this.image = this.active ? images.active_pad : images.inactive_pad;

    var nearest = this.getNearestTriggerable();
    if(nearest)
        this.active ? nearest.turnOn() : nearest.turnOff();

}

triggerPad.prototype.getCenterX = function ()
{
    return x + ox/2;
}

triggerPad.prototype.getCenterY = function()
{
    return y + oy/2;
}

triggerPad.prototype.draw = function()
{
    ctx.drawImage(this.image, this.x + this.ox, this.y + this.oy);
}
