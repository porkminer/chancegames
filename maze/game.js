var maze = undefined;
function initMaze(){
    var canvasSize = 900;
    var rooms = 20;
    var interval = 1;
    var steps = 10;
    maze = new MazeGenerator(canvasSize, canvasSize, rooms, rooms, interval, steps, 'maze');
    console.log(maze);
    window.requestAnimationFrame(maze.drawLoop.bind(maze));
}
