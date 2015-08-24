var maxKills = 34;
var killcount = 0;
var combo = 0;
var lastComboFrame = -420;
var COMBO_SECONDS = 5;

function addKill()
{
    killcount++;

    if(lastComboFrame + 60 * COMBO_SECONDS > currentFrame)
        combo++;
    else
        combo = 1;

    lastComboFrame = currentFrame;
}

function getKills()
{
    return killcount;
}

function getCombo()
{
    return combo;
}

function getComboPercentDone()
{
    var frameDif = currentFrame - lastComboFrame;

    return Math.min(frameDif/(60 * COMBO_SECONDS), 1);
}
