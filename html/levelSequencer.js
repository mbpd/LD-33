var nextLevel = 0;
var NUM_LEVELS = 2;

function getNextLevel()
{
    var val = nextLevel;
    nextLevel++;

    if(val > NUM_LEVELS - 1)
        return null;

    return val;
}

function resetLevelSequencer()
{
    nextLevel = 0;
}
