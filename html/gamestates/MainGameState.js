function MainGameState(level)
{
    this.level = level;
    this.cursor = images.cursor_default;
}

MainGameState.prototype.render = function ()
{
    this.level.draw();
    
    C4Timer = this.level.getC4Timer();
    if(C4Timer !== undefined && C4Timer >= 0)
        this.drawTimer(C4Timer)
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

MainGameState.prototype.tick = function()
{
    this.level.tick();
    this.cursor = this.level.getCursor();
}

MainGameState.prototype.keyboardHandler = function(evt)
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

MainGameState.prototype.mouseHandler = function(evt)
{
    this.level.use();
}
