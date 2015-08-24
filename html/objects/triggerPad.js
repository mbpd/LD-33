function triggerPad(x, y)
{
    this.image = images.inactive_pad;
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE;
    this.active = false;
    
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;
}

triggerPad.prototype.activate = function()
{
    this.active = true;
    this.image = images.active_pad;

    var near = this.getNearestTriggerable();;
    if(near != -1)
    {
        gameState.level.triggerable[near].turnOn();
    }
}

triggerPad.prototype.deactivate = function()
{
    this.active = false;
    this.image = images.inactive_pad;

    var near = this.getNearestTriggerable();;
    if(near != -1)
    {
        gameState.level.triggerable[near].turnOff();
    }
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
    return this.x + this.ox/2;
}

triggerPad.prototype.getCenterY = function()
{
    return this.y + this.oy/2;
}

triggerPad.prototype.draw = function()
{
    ctx.drawImage(this.image, this.x + this.ox, this.y + this.oy);
}

triggerPad.prototype.canTouch = function(collisions)
{
    for(var i = 0; i < collisions.length; i++){
        if(collisions[i][0]>= this.x+this.ox && collisions[i][0]<= this.x && collisions[i][1] >= this.y+this.oy && collisions[i][1] <= this.y)
        return true;
    }

    return false;
}

triggerPad.prototype.getNearestTriggerable = function()
{
   var nearest = -1;
   for(var i = 0; i < gameState.level.triggerable.length; i++)
   {
       if(nearest == -1) {
           nearest = 0;
           continue;
       }

       if(this.getDistance(gameState.level.triggerable[i].getCenterX(), gameState.level.triggerable[i].getCenterY()) < this.getDistance(gameState.level.triggerable[nearest].getCenterX(), gameState.level.triggerable[nearest].getCenterY()))
            nearest = i;
   }

   return nearest;
}

triggerPad.prototype.getDistance = function(x,y)
{

    return (Math.pow(x - this.getCenterX(), 2) + Math.pow(y - this.getCenterY(), 2));

}
