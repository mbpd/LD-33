function Level(tilemap, markers)
{
    this.tilemap = tilemap;
    this.tilemap.prerender();

    this.drawables = [];

    this.people = [];

    this.touchables = [];
    this.triggerable = [];

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
        else if(markerType.startsWith("COMPUTER_"))
        {
            var message_id = markerType.split("_")[1];
            var computer = new Computer(markerX, markerY, +message_id);
            this.drawables.push(computer);
            this.interactibles.push(computer);
        }
        else if(markerType.startsWith("GUARD_CATCH"))
        {
            var npc = new NPC(markerX + TILE_SIZE/2, markerY + TILE_SIZE/2, images.guard_left, images.guard_right, new GuardCatchNPCScript(this));
            this.addNPC(npc);
        }
        else if(markerType == "TRIGGERPAD")
        {
            var triggerpad = new triggerPad(markerX, markerY);
            this.addTouchable(triggerpad);
        }
        else if(markerType == "STEELDOOR")
        {
            var steeldoor = new SteelDoor(markerX, markerY);
            this.addTriggerable(steeldoor);
        }
        else if(markerType == "TABLE_UP")
        {
            var t = new Table(markerX, markerY, "up");
            this.drawables.push(t);
            this.collidables.push(t);
        }
        else if(markerType == "TABLE_DOWN")
        {
            var t = new Table(markerX, markerY, "down");
            this.drawables.push(t);
            this.collidables.push(t);
        }
        else if(markerType == "WINDOWS")
        {
            var w = new Windows(markerX, markerY);
            this.drawables.push(w);
            this.interactibles.push(w);
        }
        else if(markerType == "SERVER")
        {
            var s = new Server(markerX, markerY);
            this.drawables.push(s);
            this.collidables.push(s);
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

Level.prototype.addTouchable = function(touchable)
{
    this.touchables.push(touchable);
    this.drawables.push(touchable);
}

Level.prototype.addTriggerable = function(triggerable)
{
    this.triggerable.push(triggerable);
    this.drawables.push(triggerable);
    this.collidables.push(triggerable);
}

Level.prototype.tick = function()
{
    if(this.C4Timer)
        this.C4Timer--;

    // explode the c4 if the timer has reached 0 :DD
    if(this.C4Timer === 0 && !this.c4Exploded)
    {
        var C4_KILL_DISTANCE = Math.pow(450, 2);

        var C4_x = this.c4Marker.getCenterX();
        var C4_y = this.c4Marker.getCenterY();

        // spawn explosion
        var explosion = new Explosion(C4_x, C4_y);
        this.drawables.push(explosion);

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

        // kill everything that can be seen
        for(var i = 0; i < this.drawables.length; i++)
        {
            var obj = this.drawables[i];
            var dist = Math.pow(obj.x - C4_x, 2) + Math.pow(obj.y - C4_y, 2);

            // ... in range
            if(dist < C4_KILL_DISTANCE && obj.destroy)
                obj.destroy();
        }

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

    // deactivate all triggers
    for(var i = 0; i < this.touchables.length; i++)
        this.touchables[i].deactivate();
        
    // activate the ones with players on them
    for(var i = 0; i < this.touchables.length; i++)
    {
        for(var j = 0; j < this.people.length; j++)
            if(this.touchables[i].canTouch(this.people[j].getCollisions()))
                this.touchables[i].activate();
    }

    // do collision checking
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

                if(!collisionBox)
                    continue;

                var valid_x = this.people[i].getValidX();
                var valid_y = this.people[i].getValidY();

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

    for(var i = 0; i < this.people.length; i++)
    {
        var collisions = this.people[i].getCollisions();
        for(var k = 0; k < this.triggerable.length; k++)
        {
            var collisionBox = this.triggerable[k].getCollisionBox();
            for(var j = 0; j < collisions.length; j++)
            {
                if(collisionBox)
                    if(collisions[j][0] >= collisionBox[0] &&
                        collisions[j][1] >= collisionBox[1] &&
                        collisions[j][0] <= collisionBox[2] &&
                        collisions[j][1] <= collisionBox[3])
                        this.people[i].kill();
            }
        }
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
