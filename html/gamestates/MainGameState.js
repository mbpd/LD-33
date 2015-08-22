function MainGameState(level)
{

    this.level = level;

}

MainGameState.prototype.render = function ()
{
    this.level.render();
}

MainGameState.prototype.tick = function()
{
    this.level.tick();
}

MainGameState.prototype.keyboardHandler = function(evt)
{
    var player = this.level.getPlayer();
    switch(evt.data)
    {

        // A or Left
        case 65:
        case 37:
            player.moveLeft();

        //S or Down
        case 83:
        case 40:
            player.moveDown();

        //D or Right
        case 68:
        case 39:
            player.moveRight();

        //W or Up
        case 87:
        case 38:
            this.player.moveUp();

    }

}

MainGameState.prototype.mouseHandler = function(evt){}


