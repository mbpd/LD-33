function Player(x, y)
{
    this.x = 128;
    this.y = 128;

    this.valid_x = 0;
    this.valid_y = 0;

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

Player.prototype.setPositionAsValid = function()
{
    this.valid_x = this.x;
    this.valid_y = this.y;
}

Player.prototype.rollbackPosition = function()
{
    this.x = this.valid_x;
    this.y = this.valid_y;
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
    var img = images["stallman_right"];
    var jump = Math.round(currentFrame/7) % 3 == 0;

    var charHeight = 20;
    if(jump &&
      (this.movingLeft + this.movingRight == 1 ||
       this.movingUp   + this.movingDown))
       charHeight += 5;
    ctx.drawImage(img, 400-img.width/2, 300-img.height/2 - charHeight);
}

Player.prototype.getCollisions = function()
{
    return [[this.x, this.y], [this.x-15, this.y], [this.x+15, this.y], [this.x, this.y+10]];
}
