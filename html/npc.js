function NPC(x, y, left_image, right_image, NPCScript)
{
    this.x = x;
    this.y = y;

    this.valid_x = x;
    this.valid_y = y;

    this.MOVE_SPEED = 5;
    this.CHAR_HEIGHT = -20;

    this.leftImage = left_image;
    this.rightImage = right_image;
    this.image = this.leftImage;
    this.script = NPCScript;

    this.cursor = images.cursor_talk;
}

NPC.prototype.draw = function()
{
    ctx.drawImage(this.image, this.x - this.image.width/2, this.y - this.image.height/2 + this.CHAR_HEIGHT);
    this.script.draw(this);
}

NPC.prototype.tick = function()
{
    this.script.tick(this);
}

NPC.prototype.turnLeft = function()
{
    this.image = this.leftImage;
}

NPC.prototype.turnRight = function()
{
    this.image = rightImage;
}

NPC.prototype.canUse = function(x, y)
{
    var distCheck = x >= this.x - this.image.width/2 &&
                    x <= this.x + this.image.width/2 &&
                    y >= this.y - this.image.height/2 + this.CHAR_HEIGHT &&
                    y <= this.y + this.image.height/2 + this.CHAR_HEIGHT;
    if(!distCheck)
        return false;

    return this.script.canUse(this, x, y);
}

NPC.prototype.use = function(level)
{
    console.log(level);
    this.script.use(this, level);
}

NPC.prototype.getValidX = function()
{
    return this.valid_x;
}

NPC.prototype.getValidY = function()
{
    return this.valid_y;
}

NPC.prototype.rollbackX = function()
{
    this.x = this.valid_x;
}

NPC.prototype.rollbackY = function()
{
    this.y = this.valid_y;
}

NPC.prototype.setPositionAsValid = function()
{
    this.valid_x = this.x;
    this.valid_y = this.y;
}

NPC.prototype.getCenterX = function()
{
    return this.x - this.image.width/2;
}

NPC.prototype.getCenterY = function()
{
    return this.y - this.image.height/2;
}

NPC.prototype.getCollisions = function()
{
    return [[this.x, this.y]];
}
