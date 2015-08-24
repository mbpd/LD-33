function Explosion(x, y)
{
    this.x = x;
    this.y = y;
    this.iFrame = currentFrame;
    this.DURATION = 45;
}

Explosion.prototype.draw = function()
{
    var dif = currentFrame - this.iFrame;

    if(dif > this.DURATION)
        return;

    var factor = Math.sin(Math.PI * dif/this.DURATION);

    var size = 800 * factor;

    ctx.save();
    ctx.globalAlpha = factor;
    ctx.drawImage(images.explosion, this.x - size/2, this.y - size/2, size, size);
    ctx.restore();
}
