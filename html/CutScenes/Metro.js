function MetroCutScene()
{
    this.metro = images.metro;
    this.station = images.station;
    this.background = images.background;
    this.light = images.light;

    this.over = false;

    this.counter = 0.0000001;
    this.DIST = 50000;

    this.startFrame = currentFrame;

    this.hours = 6 + Math.floor(Math.random() * 6);
    if(this.hours < 10)
        this.hours = "0" + this.hours;

    this.minutes = Math.floor(Math.random() * 61);
    if(this.minutes < 10)
        this.minutes = "0" + this.minutes;

    // Hacky way to get the level's id
    /*var levelId = 0;
    for(var i = 0; i < tilemaps.length; i++)
    {
        if(this.level.tilemap == tilemaps[i])
        {
            levelId = i;
            break;
        }
    }

    this.levelName = names[levelId];*/
}

MetroCutScene.prototype.render = function ()
{
    for(var i = 0; i < 7; i++) 
        ctx.drawImage(this.background, 0, Math.round((this.y%100)-100 + i * 100));

    ctx.drawImage(this.light, 0, 0);
    ctx.drawImage(this.station, 0, this.y);
    ctx.drawImage(this.station, 0, this.y - this.DIST);
    ctx.drawImage(this.metro, (width/2),80);

    var dif = currentFrame - this.startFrame;

    if(dif > 120 && dif < 120 + 300)
    {
        dif -= 120;

        var factor = -0.00004444 * Math.pow(dif, 2) + 0.01333 * dif;

        ctx.globalAlpha = factor;
        ctx.fillStyle = "#00FF00";
        ctx.font = "20px Monospace"
        ctx.textAlign = "right";

        //ctx.fillText("Objective: C4 " + this.levelName + "'s server room", width - 50, height - 50);
        ctx.fillText("Objective: C4 the server room", width - 50, height - 50);
        ctx.fillText(this.hours + ":" + this.minutes +  " AM", width - 50, height - 70);
    }
}

MetroCutScene.prototype.tick = function() 
{
    var t = Math.pow(this.counter, 5)/10;
    this.y = (Math.pow((1 + (1/t)), t)-1) * this.DIST / (Math.E-1);
    this.counter += 0.01;

    if((this.DIST -  this.y) < 30)
        this.stop();

}

MetroCutScene.prototype.stop = function()
{
    this.over = true;
}

MetroCutScene.prototype.switchState = function(level)
{
    switchState(new MainGameState(new Level(tilemaps[level],markers[level]))); 
}
