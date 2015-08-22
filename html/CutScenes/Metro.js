function MetroCutScene(metro, landscape)
{
    this.metro =  metro;
    this.landscape = landscape;
    this.y1 = 0;
    this.y2 = -this.landscape.height;
}

MetroCutScene.prototype.render = function ()
{

    ctx.drawImage(this.landscape, 0, this.y1);
    ctx.drawImage(this.landscape, 0, this.y2);
    ctx.drawImage(this.metro, (width/2)-(this.metro.width/2), 0);

}

MetroCutScene.prototype.tick = function() 
{

    this.yq++;
    this.w++;

    if(this.y1 >= this.landscape.height)
        this.y1 = -this.landscape.height;

    if(this.y2 >= this.landscape.height)
        this.y2 = -this.landscape.height;

}

MetroCutScene.prototype.stop = function()
{


}
