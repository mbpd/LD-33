function DeathCutScene()
{
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;
}

DeathCutScene.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#FF0000";
    ctx.font = "30px Monotone";

    ctx.fillText("Dead", width/2 - 50, height/2);
}

DeathCutScene.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 2000)
        this.stop();
}

DeathCutScene.prototype.stop = function()
{
    this.over = true;
}

DeathCutScene.prototype.switchState = function()
{
    nextLevel = 0;
    switchState(new CutSceneState(new EndGame()));
}
