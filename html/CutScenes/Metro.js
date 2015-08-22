function MetroCutScene(metro, landscape)
{
        this.metro =  metro;
        this.landscape = landscape;
        this.counter = 0.0000001;
        this.flag = false;
        this.DIST = 50000;
}

MetroCutScene.prototype.render = function ()
{

        console.log("render");
        ctx.drawImage(this.landscape, 0, this.y);
        ctx.drawImage(this.landscape, 0, this.y - this.DIST);
        ctx.drawImage(this.metro, (width/2)-(this.metro.width/2), 0);

}

MetroCutScene.prototype.tick = function() 
{
    var t = Math.pow(this.counter, 5)/10;
    this.y = (Math.pow((1 + (1/t)), t)-1) * this.DIST / (Math.E-1);
    this.counter += 0.01;
    if(this.y < 368)
    console.log(this.y);
}

MetroCutScene.prototype.stop = function()
{


}
