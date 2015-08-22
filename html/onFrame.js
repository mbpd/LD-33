function onFrame() {
    canvas.width = canvas.width;
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 800, 600);
    gameState.render();
    gameState.tick();
    window.requestAnimationFrame(onFrame);
}
