function Player(x, y)
{
    this.x = 0
    this.y = 0
    this.MOVE_SPEED = 10;

    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
}

Player.prototype.moveLeft = function(start)
{
    this.movingLeft = start;
}

Player.prototype.moveRight = function(start)
{
    this.movingRight = start;
}

Player.prototype.moveDown = function(start)
{
    this.movingDown = start;
}

Player.prototype.moveUp = function(start)
{
    this.movingUp = start;
}

Player.prototype.tick = function(start)
{
    if(this.movingLeft)
        this.x -= this.MOVE_SPEED;
    if(this.movingRight)
        this.x += this.MOVE_SPEED;

    if(this.movingUp)
        this.y -= this.MOVE_SPEED;
    if(this.movingDown)
        this.y += this.MOVE_SPEED;
}

Player.prototype.draw = function()
{
    var jump = Math.round(currentFrame/7) % 3 == 0;

    var charHeight = 0;
    if(jump &&
      (this.movingLeft + this.movingRight == 1 ||
       this.movingUp   + this.movingDown))
       charHeight = 5;
    ctx.drawImage(images["stallman_right"], 400-24, 300-36 - charHeight);
}
