var canvas, ctx;
var width, height;
var gameState;
var mouse;

canvas = document.getElementById("canvas");

window.onload = function() {

    if(canvas.getContext)
    {
        ctx =  canvas.getContext("2d");

        width = canvas.width;
        height = canvas.height;

        onFrame();

        mouse = new mouseCoordinates(400, 300);

    } else {
        alert("Your browser does not support this game.");
    }
}
