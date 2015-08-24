var nextLevel = 0;

function getNextLevel()
{
    var val = nextLevel;
    nextLevel++;

    return val;
}

function resetLevelSequencer()
{
    nextLevel = 0;
}
