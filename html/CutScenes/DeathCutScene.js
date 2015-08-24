function DeathCutScene()
{
    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;

    this.reasons = [];

    if(deathC4)
        this.reasons.push("Killed by C4 explosion");

    if(deathDoor)
        this.reasons.push("Killed by steel door");

    if(deathSuicide)
        this.reasons.push("Killed by using Windows (tm)");
}

DeathCutScene.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#FF0000";
    ctx.font = "50px Monospace";
    ctx.textAlign = "center";

    ctx.fillText("You have died.", width/2, 240);

    ctx.font = "30px Monospace";
    for(var i = 0; i < this.reasons.length; i++)
        ctx.fillText(this.reasons[i], width/2, 240 + 60 + 40 * i);
}

DeathCutScene.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 4000)
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
