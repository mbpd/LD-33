var musicLevels = ["music/apple.ogg", "music/skype.ogg"];
var currentMusic = null;
var currentMusicName = null;

function playMusic(musicName)
{
    if(currentMusic && currentMusic.stop)
        currentMusic.pause();

    currentMusic = new Audio(musicName);
    currentMusic.play();

    currentMusicName = musicName;
}

function restartMusicIfFinished()
{
    if(currentMusic.ended)
        playMusic(currentMusicName);
}
