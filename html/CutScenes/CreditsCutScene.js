function CreditsCutScene()
{

    this.video = document.createElement("video");
    this.video.src = "stallman.webm";
    this.video.setAttribute("width", "800");
    this.video.setAttribute("height", "600");
    this.video.play();

    this.level = 0;
    this.start = new Date().getTime();
    this.delta = 0;
    this.over = false;

    console.log("this fixes credits in firefox, don't ask.");
}

CreditsCutScene.prototype.render = function()
{
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
}

CreditsCutScene.prototype.tick = function()
{

    this.delta = new Date().getTime() - this.start;
    if(this.delta > 151000)
        this.stop();
}

CreditsCutScene.prototype.stop = function()
{
    this.over = true;
    this.video.pause();
}

CreditsCutScene.prototype.switchState = function()
{
    switchState(new CutSceneState(new MetroCutScene()));
}
