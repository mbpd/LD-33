function Player(x, y)
{
    this.x = 128;
    this.y = 128;

    this.valid_x = 128;
    this.valid_y = 128;

    this.MOVE_SPEED = 8;

    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;

    this.image = images["stallman_left"];
}

Player.prototype.moveLeft = function(start)
{
    this.movingLeft = start;
    if(start)
        this.image = images["stallman_left"];
}

Player.prototype.moveRight = function(start)
{
    this.movingRight = start;
    if(start)
        this.image = images["stallman_right"];
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

Player.prototype.getValidX = function()
{
    return this.valid_x;
}

Player.prototype.getValidY = function()
{
    return this.valid_y;
}

Player.prototype.rollbackX = function()
{
    this.x = this.valid_x;
}

Player.prototype.rollbackY = function()
{
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
    var jump = Math.round(currentFrame/7) % 3 == 0;

    var charHeight = 20;
    if(jump &&
      (this.movingLeft + this.movingRight == 1 ||
       this.movingUp   + this.movingDown  == 1))
       charHeight += 5;
    ctx.drawImage(this.image, 400-this.image.width/2, 300-this.image.height/2 - charHeight);
}

Player.prototype.getCollisions = function()
{
    return [[this.x, this.y], [this.x-12, this.y], [this.x+12, this.y], [this.x, this.y+10]];
}
