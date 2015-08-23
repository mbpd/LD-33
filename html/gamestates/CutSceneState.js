function CutSceneState(cutScene)
{
    this.cutScene = cutScene;
    this.tt = 1;
}

CutSceneState.prototype.render = function()
{
    this.cutScene.render();
    if(this.cutScene.over)
    {
        ctx.globalAlpha = this.tt; 
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

    }
        
}

CutSceneState.prototype.tick = function()
{
    this.cutScene.tick();
    if(this.cutScene.over)
        this.tt += 0.005;

    if(this.tt > 1)
    {
        var level = getNextLevel();
        switchState(new MainGameState(new Level(tilemaps[level], markers[level]))); 
    }
}


CutSceneState.prototype.keyboardHandler = function(evt)
{

    //Space or Enter
    if(evt.data == 32 || evt.data == 13)
        this.cutScene.stop();

}

CutSceneState.prototype.mouseHandler = function(evt)
{

}
