var messages = {
0: ["This is a test message!", "Multi line test!", "WOOOO!"],
1: ["KEK ANOTHER COMPUTER", "HAHA"],
}

function Computer(x, y, message_id)
{
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE;

    // drawing offsets
    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE;

    this.cursor = images.cursor_use;

    this.message_id = message_id;
}

Computer.prototype.draw = function()
{
    ctx.drawImage(images.computer, this.x + this.ox, this.y + this.oy - 35);
}

Computer.prototype.canUse = function(x, y)
{
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
