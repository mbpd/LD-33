function changeLevel(level)
{
    nextLevel = level;
    switchState(new CutSceneState(new MetroCutScene()));
}
