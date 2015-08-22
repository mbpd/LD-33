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
