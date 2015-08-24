function MainGameState(level)
{
    this.level = level;
    this.cursor = images.cursor_default;

    this.showingMessage = false;
    this.message = null;
    this.old_cursor = null;

    this.tt = 0.5;
}

MainGameState.prototype.render = function ()
{
    if(this.showingMessage)
    {
        ctx.drawImage(images.computer_gui, 0, 0);

        ctx.fillStyle = "#77FF77";
        ctx.textAlign = "center";
        ctx.font = "40px Monospace";

        for(var i = 0; i < this.message.length; i++)
        {
            ctx.fillText(this.message[i], 400, 140 + 40 * i);
        }
    }
    else
    {
        this.level.draw();
        
        C4Timer = this.level.getC4Timer();
        if(C4Timer !== undefined && C4Timer >= 0)
            this.drawTimer(C4Timer)

        this.drawKillcount(killcount, combo);

        if((this.level.getPlayer().dead || this.level.getPlayer().arrested)
            && this.tt > 0.5)
            this.fadeout(this.tt - 0.5);
    }
}

MainGameState.prototype.drawTimer = function(time)
{
    ctx.font="20px Monospace";
    ctx.fillStyle = "#FF0000";

    var milliseconds = Math.floor(1000 * (time % 60)/60/10);
    if(milliseconds < 10)
        milliseconds = "0" + milliseconds;

    var seconds = Math.floor(time / 60);
    if(seconds < 10)
        seconds = "0" + seconds;

    if(seconds > 0 || Math.round(currentFrame/4) % 2 == 0)
        ctx.fillText(seconds + ":" + milliseconds, width - 100, height - 40);
}

MainGameState.prototype.drawKillcount = function(kills, combo)
{
    if(kills < 10)
        kills = "00" + kills;
    else if(kills < 100)
        kills = "0" + kills;

    if(combo < 10)
        combo = "00" + combo;
    else if(combo < 100)
        combo = "0" + combo;

    ctx.font = "20px Monospace";

    ctx.fillStyle = "#FFFFFF";
    if(getComboPercentDone() < 1)
        ctx.fillText(combo, width - 40, 40 - 20 * getComboPercentDone());

    ctx.fillStyle = "#FF0000";
    ctx.fillText(kills, width - 40, 20);
}

MainGameState.prototype.fadeout = function(tt)
{
    ctx.save();
    ctx.globalAlpha = tt;
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

MainGameState.prototype.tick = function()
{
    C4Timer = this.level.getC4Timer();

    if(!(C4Timer === 0))
        restartMusicIfFinished();
    else
        currentMusic.pause();


    if(this.showingMessage)
        return;

    if(this.level.getPlayer().dead)
    {
        this.tt += 0.0030;

        if(this.tt > 1.5)
            switchState(new CutSceneState(new DeathCutScene()));
    }

    if(this.level.getPlayer().arrested)
    {
        this.tt += 0.003;

        if(this.tt > 1.5)
            switchState(new CutSceneState(new JailCutScene()));
    }
    else
        this.level.tick();

    this.cursor = this.level.getCursor();


}

MainGameState.prototype.keyboardHandler = function(evt)
{
    if(this.showingMessage)
    {
        if(evt.type == "KEY_UP" && evt.data == 32)
        {
            this.showingMessage = false;
            this.cursor = this.old_cursor;
        }
    }
    else
    {
        var player = this.level.getPlayer();
        var start = evt.type == "KEY_DOWN";

        switch(evt.data)
        {

            // A or Left
            case 65:
            case 37:
                player.moveLeft(start);
                break;

            //S or Down
            case 83:
            case 40:
                player.moveDown(start);
                break;

            //D or Right
            case 68:
            case 39:
                player.moveRight(start);
                break;

            //W or Up
            case 87:
            case 38:
                player.moveUp(start);
                break;

        }
    }
}

MainGameState.prototype.mouseHandler = function(evt)
{
    if(this.showingMessage)
        return;
    this.level.use();
}

MainGameState.prototype.displayMessage = function(msg)
{
    this.showingMessage = true;
    this.message = msg;

    if(this.message[this.message.length-1] != "PRESS SPACE TO CONTINUE")
        this.message.push("PRESS SPACE TO CONTINUE");

    this.old_cursor = this.cursor;
    this.cursor = images.cursor_default;
}
