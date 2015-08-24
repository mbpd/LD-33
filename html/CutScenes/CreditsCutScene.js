function CreditsCutScene()
{

    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;

}

CreditsCutScene.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#00FF00";
    ctx.font = "50px MonoSpace";
    ctx.textAlign = "center";

    ctx.fillText("Credits", width/2, 242);
}

CreditsCutScene.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 4000)
        this.stop();
}

CreditsCutScene.prototype.stop = function()
{
    this.over = true;
}

CreditsCutScene.prototype.switchState = function()
{
    switchState(new CutSceneState(new MetroCutScene()));
}
