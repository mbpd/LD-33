function GuardCatchNPCScript(level)
{
    this.following = false;
    this.target = null;
    this.level = level;
    this.ALERT_OFFSET = -100;

    this.MIN_DISTANCE = Math.pow(4, 2);
    this.MAX_DISTANCE = Math.pow(200, 2);
}

GuardCatchNPCScript.prototype.draw = function(npc)
{
    if(this.following)
        ctx.drawImage(images.symbol_alert, npc.x - 3, npc.y + this.ALERT_OFFSET);
}

GuardCatchNPCScript.prototype.tick = function(npc)
{
    //npc.MOVE_SPEED = 6;

    var dist = Math.pow(npc.x - this.level.player.x, 2) + Math.pow(npc.y - this.level.player.y, 2);

    if(!this.following)
    {
        if(dist < this.MAX_DISTANCE)
        {
            this.following = true;
            this.target = this.level.player;
        }
    }

    if(this.following)
    {
        if(dist > this.MAX_DISTANCE)
        {
            this.following = false;
            return;
        }

        var dist_x = npc.x - this.target.x;
        if(Math.abs(dist_x) > npc.MOVE_SPEED)
        {
            if(dist_x > 0)
            {
                npc.image = npc.leftImage;
                npc.x -= npc.MOVE_SPEED;
            }
            else
            {
                npc.image = npc.rightImage;
                npc.x += npc.MOVE_SPEED;
            }
        }

        var dist_y = npc.y - this.target.y;
        if(Math.abs(dist_y) > npc.MOVE_SPEED)
        {
            if(dist_y > 0)
                npc.y -= npc.MOVE_SPEED;
            else
                npc.y += npc.MOVE_SPEED;
        }

        for(var i = 0; i < this.level.people.length; i++)
        {
            var person = this.level.people[i];
            
            if(person == npc)
                continue;

            var dist = Math.pow(npc.x - person.x, 2) + Math.pow(npc.y - person.y, 2);
            if(dist < this.MIN_DISTANCE)
            {
                npc.rollbackX();
                npc.rollbackY();
            }
        }

    }
}

GuardCatchNPCScript.prototype.canUse = function(npc, x, y)
{
    return true;
}

GuardCatchNPCScript.prototype.use = function(npc, level)
{
}
