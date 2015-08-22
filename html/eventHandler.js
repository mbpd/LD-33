function Event(type, data)
{

    this.type = type;
    this.data = data;

}

function mouseCoordinates(x, y)
{
    this.x = x;
    this.y = y;
}

window.addEventListener("keydown", function (e)
{

    gameState.keyboardHandler( new Event("KEY_DOWN", e.keyCode || e.charCode));

});

window.addEventListener("keyup", function(e)
{

    gameState.keyboardHandler(new Event("KEY_UP", e.keyCode || e.charCode));

});

var mouseButtons = ["LEFT", "MIDDLE", "RIGHT"];
window.addEventListener("mousedown", function(e)
{

    gameState.mouseHandler(new Event("MOUSE_DOWN", mouseButtons[e.which-1]));

});

window.addEventListener("mouseup", function(e)
{

    gameState.mouseHandler(new Event("MOUSE_UP", mouseButtons[e.which-1]));

});

canvas.addEventListener("mousemove", function(e)
{
    mouse.x = e.clientX;
    mouse.y = e.clientY;

});
