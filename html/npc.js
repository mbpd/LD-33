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

    this.jumping = false;
    this.jumpOffset = Math.floor(Math.random() * 100);

    this.dead = false;
}

NPC.prototype.draw = function()
{
    if(this.dead)
        return;

    var jumpHeight = 0;
    if(this.jumping)
    {
        var jump = Math.round((currentFrame+this.jumpOffset)/7) % 3 == 0;

        if(jump)
            jumpHeight += 5;
    }

    ctx.drawImage(this.image, this.x - this.image.width/2, this.y - this.image.height/2 + this.CHAR_HEIGHT - jumpHeight);

    this.script.draw(this);
}

NPC.prototype.tick = function()
{
    if(this.dead)
        return;

    this.script.tick(this);
    if(this.x != this.valid_x || this.y != this.valid_y)
        this.jumping = true;
    else
        this.jumping = false;
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
    if(this.dead)
        return false;

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
    if(this.dead)
        return;

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
    if(this.dead)
        return [];

    return [[this.x, this.y]];
}

NPC.prototype.kill = function()
{
    if(!this.dead)
    {
        this.dead = true;
        addKill();
    }
}
