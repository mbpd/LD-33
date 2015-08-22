var canvas, ctx;
var width, height;

window.onload = function() {
    canvas =  document.getElementById("canvas");
    ctx =  canvas.getContext("2d");

    width = canvas.width;
    height = canvas.height;

    onFrame();
}
