function JailCutScene()
{
    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;
}

JailCutScene.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#00FF00";
    ctx.font = "50px Monospace";
    ctx.textAlign = "center";

    ctx.fillText("You have been jailed.", width/2, 242);
}

JailCutScene.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 4000)
        this.stop();
}

JailCutScene.prototype.stop = function()
{
    this.over = true;
}

JailCutScene.prototype.switchState = function()
{
    nextLevel = 0;
    switchState(new CutSceneState(new EndGame()));
}
