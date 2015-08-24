function Server(x, y)
{
    this.x = x + TILE_SIZE;
    this.y = y + TILE_SIZE * 2;

    this.ox = -TILE_SIZE;
    this.oy = -TILE_SIZE * 2;

    this.collisionBox = [this.x + this.ox, this.y - TILE_SIZE, this.x, this.y];

    this.images = [images.servers0, images.servers1, images.servers2, images.servers3];
    this.image = this.images[0];

    this.frameOffset = Math.floor(100 * Math.random());
}

Server.prototype.draw = function()
{
    ctx.drawImage(this.images[Math.floor(currentFrame/5 + this.frameOffset) % 4], this.x + this.ox, this.y + this.oy);
}

Server.prototype.getCollisionBox = function()
{
    return this.collisionBox;
}
