function WorkerNPCScript()
{
    this.following = false;
    this.target = null;
    this.ALERT_OFFSET = -100;

    this.MIN_DISTANCE = Math.pow(64, 2);
    this.MAX_DISTANCE = Math.pow(400, 2);
}

WorkerNPCScript.prototype.draw = function(npc)
{
    if(this.following)
        ctx.drawImage(images.symbol_alert, npc.x - 3, npc.y + this.ALERT_OFFSET);
}

WorkerNPCScript.prototype.tick = function(npc)
{
    if(this.following)
    {
        var dist = Math.pow(npc.x - this.target.x, 2) + Math.pow(npc.y - this.target.y, 2);

        if(dist < this.MIN_DISTANCE || dist > this.MAX_DISTANCE)
            return;

        var dist_x = npc.x - this.target.x;
        if(Math.abs(dist_x) > npc.MOVE_SPEED)
        {
            if(dist_x > 0)
                npc.x -= npc.MOVE_SPEED;
            else
                npc.x += npc.MOVE_SPEED;
        }

        var dist_y = npc.y - this.target.y;
        if(Math.abs(dist_y) > npc.MOVE_SPEED)
        {
            if(dist_y > 0)
                npc.y -= npc.MOVE_SPEED;
            else
                npc.y += npc.MOVE_SPEED;
        }

    }
}

WorkerNPCScript.prototype.canUse = function(npc, x, y)
{
    return true;
}

WorkerNPCScript.prototype.use = function(npc, level)
{
    this.following = !this.following;
    this.target = level.getPlayer();
}
