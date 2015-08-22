function Level(tiles, entities)
{
    this.tiles = tiles;
    this.tiles.prerender();

    this.entities = entities;

    this.player = new Player();

    this.people = [];
    this.people.push(this.player);

    this.interactibles = [];
    this.npcs = [];

    for(var i = 0; i < entities.length; i++)
    {
        if(entities[i].interactible)
            this.interactibles.push(entities[i]);
        if(entities[i].npc)
            this.npcs.push(entities[i]);
    }
}

Level.prototype.draw = function()
{
    var OFFSET_X = -this.player.x + width/2;
    var OFFSET_Y = -this.player.y + height/2;

    ctx.drawImage(this.tiles.getPrerender(), OFFSET_X, OFFSET_Y);

    this.player.draw();
}

Level.prototype.tick = function()
{
    this.player.tick();

    for(var i = 0; i < this.people.length; i++)
    {
        var collisions = this.people[i].getCollisions();
        for(var j = 0; j < collisions.length; j++)
        {
            if(this.isCollision(collisions[j][0], collisions[j][1]))
                this.people[i].rollbackPosition();
        }
        this.people[i].setPositionAsValid();
    }
}

Level.prototype.getPlayer = function()
{
    return this.player;
}

Level.prototype.isCollision = function(x, y)
{
    var tile_x = Math.floor(x/TILE_SIZE);
    var tile_y = Math.floor(y/TILE_SIZE);

    return collides.has(this.tiles.get(tile_x, tile_y))
}
