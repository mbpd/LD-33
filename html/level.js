function Level(tiles, entities)
{
    this.tiles = tiles;
    this.tiles.prerender();

    this.entities = entities;

    this.player = new Player();

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
    var OFFSET_X = -this.player.x - width/2;
    var OFFSET_Y = -this.player.y - height/2;

    ctx.drawImage(this.tiles.getPrerender(), OFFSET_X, OFFSET_Y);

    this.player.draw();
}

Level.prototype.tick = function()
{
    this.player.tick();
}

Level.prototype.getPlayer = function()
{
    return this.player;
}
