function EndGame()
{
    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;
}

EndGame.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#FF0000";
    ctx.font = "30px Monotone";

    ctx.fillText("End", width/2 - 50, height/2);
}

EndGame.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 5000)
        this.stop();
}

EndGame.prototype.stop = function()
{
    this.over = true;
}

EndGame.prototype.switchState = function()
{
    nextLevel = 0;
    if(killcount >= maxKills * 0.1)
        switchState(new CutSceneState(new CreditsCutScene()));
    else
        switchState(new CutSceneState(new MetroCutScene()));
}
