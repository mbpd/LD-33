function NPC(x, y, left_image, right_image, NPCScript)
{

    this.x = x;
    this.y = y;

    this.MOVE_SPEED = 5;

    this.leftImage = left_image;
    this.rightImage = right_image;
    this.image = this.leftImage;
    this.script = NPCScript;

}

NPC.prototype.draw = function ()
{
    var charHeight = 20;
    ctx.drawImage(this.image, this.x - this.image.width/2, this.y - this.image.height/2 - charHeight);
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
