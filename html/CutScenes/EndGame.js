function EndGame()
{
    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;
    this.background = images.death_screen;

    killcount = 0;
}

EndGame.prototype.render = function()
{
    ctx.drawImage(this.background, 0, 0);
    ctx.fillStyle = "#00FF00";
    ctx.font = "50px Monospace";
    ctx.textAlign = "center";

    ctx.fillText("You are the Monster", width/2, 242);

    var description = "";
    if(killcount == 0)
        description = "You don't seem that monstrous.";
    else if(killcount < 5)
        description = "You killed some people.";
    else if(killcount < 10)
        description = "Getting there.";
    else if(killcount < 15)
        description = "Why don't you try killing some more?";
    else if(killcount < 20)
        description = "Woah, you're totally a monster now!";
    else if(killcount < 30)
        description = "Tell you what, you're a very bad monster!";
    else if(killcount < 40)
        description = "A very, very, very, bad monster!";
    else if(killcount < 48)
        description = "SOOO CLOOOSE";
    else
        description = "PERFECT SCORE!";

    ctx.font = "20px Monospace";
    ctx.fillText(description, width/2, 242 + 60);

    description = "";
    if(killcount >= 15)
        description = (maxKills - killcount) + " people left.";

    ctx.fillText(description, width/2, 242 + 60 + 30);

    if(killcount == maxKills)
        description = "You killed everyone!";

    ctx.fillText(description, width/2, 242 + 60 + 30 + 30);
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
