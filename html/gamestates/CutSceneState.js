function CutSceneState(cutScene)
{
    this.cutScene = cutScene;
}

CutSceneState.prototype.render = function()
{
    this.cutScene.render();
}

CutSceneState.prototype.tick = function()
{
    this.cutScene.tick();
}

CutSceneState.prototype.keyboardHandler = function(evt)
{

    //Space or Enter
    if(evt.data == 32 || evt.data == 13)
        cutScene.stop();

}

MainGameState.prototype.mouseHandler = function(evt)
{
    cutScene.stop();
}
