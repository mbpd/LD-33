function MainGameState(level)
{
    this.level = level;
    this.cursor = images.cursor_default;
}

MainGameState.prototype.render = function ()
{
    this.level.draw();
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
