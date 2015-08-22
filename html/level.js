function Level(tiles, entities)
{
    this.tiles = tiles;
    this.tiles.prerender();

    this.entities = entities;
    this.people = [];

    //this.player = new Player();
    //this.people.push(player);

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
    ctx.drawImage(this.tiles.getPrerender(), 0, 0);
}
