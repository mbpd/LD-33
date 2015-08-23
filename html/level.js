function Level(tilemap, markers)
{
    this.tilemap = tilemap;
    this.tilemap.prerender();

    this.drawables = [];

    this.people = [];

    this.entities = [];
    this.interactibles = [];
    this.collidables = [];
    this.npcs = [];

    this.c4Marker = null;

    for(var i = 0; i < markers.length; i++)
    {
        markerType = markers[i][2];
        markerX = markers[i][0] * TILE_SIZE;
        markerY = markers[i][1] * TILE_SIZE;

        if(markerType == "SPAWN")
        {
            this.player = new Player(markerX, markerY);
            this.people.push(this.player);
            this.drawables.push(this.player);
        }
        else if(markerType == "C4")
        {
            var c4 = new C4Marker(markerX, markerY);
            this.c4Marker = c4;
            this.interactibles.push(c4);
            this.drawables.push(c4);
        }
        else if(markerType == "DOOR_UP")
        {
            var side = markerType.split("_")[1].toLowerCase();
            var door = new Door(markerX, markerY, side);
            this.interactibles.push(door);
            this.collidables.push(door);
            this.drawables.push(door);
        }
        else if(markerType == "METRO")
        {
            var metro = new MetroStation(markerX, markerY);
            this.interactibles.push(metro);
            this.collidables.push(metro);
            this.drawables.push(metro);
        }
        else if(markerType == "NPC")
        {
            var npc = new NPC(markerX + TILE_SIZE/2, markerY + TILE_SIZE/2, images.npc_left, images.npc_right, new WorkerNPCScript());
            this.addNPC(npc);
        }
    }

    this.cursor = images.cursor_default;

    this.next_use = null;
    this.USE_RANGE = 150;
}

function compareByPosition(a, b)
{
    if(a.y == b.y)
    {
        if(a.x > b.x)
            return 1;
        else if(a.x == b.x)
            return 0;
        else
            return -1;
    }
    else if(a.y > b.y)
        return 1;
    else
        return -1;
}

Level.prototype.draw = function()
{
    var OFFSET_X = -this.player.x + width/2;
    var OFFSET_Y = -this.player.y + height/2;

    ctx.drawImage(this.tilemap.getPrerender(), OFFSET_X, OFFSET_Y);

    ctx.save();
    ctx.translate(OFFSET_X, OFFSET_Y);
    this.drawables.sort(compareByPosition);
    for(var i = 0; i < this.drawables.length; i++)
    {
        this.drawables[i].draw();
    }
    ctx.restore();
}

Level.prototype.addNPC = function(npc)
{

    this.people.push(npc);
    this.drawables.push(npc);
    this.interactibles.push(npc);
}

Level.prototype.tick = function()
{
    if(this.C4Timer)
        this.C4Timer--;

    // explode the c4 if the timer has reached 0 :DD
    if(this.C4Timer === 0 && !this.c4Exploded)
    {
        var C4_KILL_DISTANCE = Math.pow(800, 2);

        var C4_x = this.c4Marker.getCenterX();
        var C4_y = this.c4Marker.getCenterY();

        var alivePeople = [];

        // kill everyone!...
        for(var i = 0; i < this.people.length; i++)
        {
            var person = this.people[i];
            var dist = Math.pow(person.x - C4_x, 2) + Math.pow(person.y - C4_y, 2);

            // ... in range
            if(dist < C4_KILL_DISTANCE)
                person.kill();
            else
                alivePeople.push(person);
        }

        this.people = alivePeople;
        this.c4Exploded = true;
    }

    this.cursor = images.cursor_default;

    this.next_use = null;
    for(var i = 0; i < this.interactibles.length; i++)
    {
        if(this.interactibles[i].canUse(mouse.x - width/2 + this.player.x, mouse.y - height/2 + this.player.y) &&
           Math.pow(this.interactibles[i].getCenterX() - this.player.x, 2) + Math.pow(this.interactibles[i].getCenterY() - this.player.y, 2) < Math.pow(this.USE_RANGE, 2))
        {
            this.cursor = this.interactibles[i].cursor;
            this.next_use = this.interactibles[i];
            break;
        }
    }

    for(var i = 0; i < this.people.length; i++)
    {
        this.people[i].tick();

        var collisions = this.people[i].getCollisions();
        for(var j = 0; j < collisions.length; j++)
        {
            var valid_x = this.people[i].getValidX();
            var valid_y = this.people[i].getValidY();

            var col_x = this.isCollision(collisions[j][0], valid_y);
            var col_y = this.isCollision(valid_x, collisions[j][1]);
            var col = this.isCollision(collisions[j][0], collisions[j][1]);

            if(col)
            {
                if(!col_x && !col_y)
                {
                    this.people[i].rollbackY();
                }

                if(col_x)
                    this.people[i].rollbackX();

                if(col_y)
                    this.people[i].rollbackY();
            }


            for(var k = 0; k < this.collidables.length; k++)
            {
                var collisionBox = this.collidables[k].getCollisionBox();

                var valid_x = this.people[i].getValidX();
                var valid_y = this.people[i].getValidY();

                if(!collisionBox)
                    continue;

                var col_x = valid_y >= collisionBox[1] &&
                            valid_y <= collisionBox[3] &&
                            collisions[j][0] >= collisionBox[0] &&
                            collisions[j][0] <= collisionBox[2];
                var col_y = valid_x >= collisionBox[0] && 
                            valid_x <= collisionBox[2] &&
                            collisions[j][1] >= collisionBox[1] &&
                            collisions[j][1] <= collisionBox[3];
                var col =   collisions[j][0] >= collisionBox[0] &&
                            collisions[j][0] <= collisionBox[2] &&
                            collisions[j][1] >= collisionBox[1] &&
                            collisions[j][1] <= collisionBox[3];
                if(col)
                {
                    if(!col_x && !col_y)
                    {
                        this.people[i].rollbackY();
                    }

                    if(col_x)
                        this.people[i].rollbackX();

                    if(col_y)
                        this.people[i].rollbackY();
                }
            }

        }
        this.people[i].setPositionAsValid();
    }
}

Level.prototype.use = function()
{
    if(this.next_use)
        this.next_use.use(this);
}

Level.prototype.getC4Timer = function()
{
    return this.C4Timer;
}

Level.prototype.startC4Timer = function()
{
    this.C4Timer = 900;
}

Level.prototype.getCursor = function()
{
    return this.cursor;
}

Level.prototype.getPlayer = function()
{
    return this.player;
}

Level.prototype.isCollision = function(x, y)
{
    var tile_x = Math.floor(x/TILE_SIZE);
    var tile_y = Math.floor(y/TILE_SIZE);

    return collides.has(this.tilemap.get(tile_x, tile_y))
}
