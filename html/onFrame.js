var currentFrame = 0;

function onFrame()
{
    canvas.width = canvas.width;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 800, 600);

    gameState.render();
    gameState.tick();

    if(gameState.cursor)
        ctx.drawImage(gameState.cursor, mouse.x - gameState.cursor.width/2, mouse.y - gameState.cursor.height/2);

    currentFrame++;
    window.requestAnimationFrame(onFrame);
}
