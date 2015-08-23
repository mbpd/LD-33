function MetroCutScene(metro, station, background, light)
{
    this.metro = metro;
    this.station = station;
    this.background = background;
    this.light = light;

    this.over = false;

    this.counter = 0.0000001;
    this.DIST = 50000;

}

MetroCutScene.prototype.render = function ()
{

    for(var i = 0; i < 7; i++) 
        ctx.drawImage(this.background, 0, (this.y%100)-100 + i * 100);

    ctx.drawImage(this.light, 0, 0);
    ctx.drawImage(this.station, 0, this.y);
    ctx.drawImage(this.station, 0, this.y - this.DIST);
    ctx.drawImage(this.metro, (width/2), 100);


}

MetroCutScene.prototype.tick = function() 
{
    var t = Math.pow(this.counter, 5)/10;
    this.y = (Math.pow((1 + (1/t)), t)-1) * this.DIST / (Math.E-1);
    this.counter += 0.01;

    if((this.DIST -  this.y) < 30)
        this.stop();

}

MetroCutScene.prototype.stop = function()
{

    this.over = true;

}
