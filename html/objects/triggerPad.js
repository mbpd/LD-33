function triggerPad(x, y)
{
    this.image = images.inactive_pad;
    this.x = x;
    this.y = y;
    this.active = false;
}

triggerPad.prototype.activate = function()
{
    if(this.active)
        return;
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
    if(!this.active)
        return;

    console.log("DEACT");
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
    return this.x + TILE_SIZE/2;
}

triggerPad.prototype.getCenterY = function()
{
    return this.y + TILE_SIZE/2;
}

triggerPad.prototype.draw = function()
{
    ctx.drawImage(this.image, this.x, this.y);
}

triggerPad.prototype.canTouch = function(collisions)
{
    for(var i = 0; i < collisions.length; i++){
        if(this.x < collisions[i][0] && this.x + TILE_SIZE > collisions[i][0] && this.y < collisions[i][1] && this.y + TILE_SIZE > collisions[i][1])
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
