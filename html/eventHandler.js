function Event(type, data)
{

    this.type = type;
    this.data = data;

}

window.addEventListener("keydown", function (e)
{
    gameState.keyboardHandler(new Event("KEY_DOWN", e.keyCode || e.charCode));

});

window.addEventListener("keyup", function(e)
{

    gameState.keyboardHandler(new Event("KEY_UP", e.keyCode || e.charCode));

});

var mouseButtons = ["LEFT", "MIDDLE", "RIGHT"];
canvas.addEventListener("click", function(e)
{

    gameState.mouseHandler(new Event("MOUSE_CLICK", mouseButtons[e.which-1]));

});

function mouseCoordinates(x, y)
{
    this.x = x;
    this.y = y;
}

canvas.addEventListener("mousemove", function(e)
{
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;;

});
