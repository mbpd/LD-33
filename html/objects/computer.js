var messages = {
0: ["RIP Steve Jobs"],
1: ["Are there any", "apples around here?"],
2: ["You should be able to", "leave the facilities", "by subway.", "", "Probably."],
3: ["Should skype be", "an annoying always on", "piece of software?", "", "Absolutely."],
4: ["Our chinese servers", "are running out of", "HDD space"],
5: ["Notice:", "We are now part of", "Microsoft Corporation"],
6: ["goodsimao: call me", "Cardoso: no", "goodsimao: CALL ME", "Rufus: 1v1 me"],
7: ["hotbab69: hey baby add me", "sugardaddy29: ok", "hotbab69: what u up to?"],
8: ["Do we continue", "logging data", "from the chinese people?", "", "Yes."],
9: ["What about Linux support?", "", "Never.", "", "Okay...", "Also it's GNU/Linux"],
10: ["Is surveillance on", "such a large scale", "even acceptable?", "", "Of course."],
11: ["THERE IS NO", "MICROPHONE PLUGGED IN", "", "HOPEFULLY.", "", "YOU SHOULD CHECK."],
12: ["Should we ever change", "our logo?", "", "Nah."],
13: ["I'M ABOUT TO", "__MURDER__", "YOU", "IF I HEAR THAT", "STUPID RINGTONE", "AGAIN"]
}

function Computer(x, y, message_id)
{
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE + 2;

    // drawing offsets
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;

    this.cursor = images.cursor_use;

    this.message_id = message_id;
}

Computer.prototype.draw = function()
{
    if(!this.destroyed)
        ctx.drawImage(images.computer, this.x + this.ox, this.y + this.oy - 37);
}

Computer.prototype.canUse = function(x, y)
{
    if(this.destroyed)
        return false;

    return x >= this.x + this.ox && x < this.x &&
           y >= this.y + this.oy - 35 && y < this.y - 35;
}

Computer.prototype.use = function()
{
    gameState.displayMessage(messages[this.message_id]);
}

Computer.prototype.getCenterX = function()
{
    return this.x - TILE_SIZE/2;
}

Computer.prototype.getCenterY = function()
{
    return this.y - TILE_SIZE/2;
}

Computer.prototype.destroy = function()
{
    this.destroyed = true;
}
