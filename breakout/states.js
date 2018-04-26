
var firstState = new State();
firstState.name = "First State";
firstState.canvas = getCanvas();
firstState.dimensions = getGameDimensions();
firstState.backgroundColor = "#000";
firstState.textColor = "#fff";
firstState.rows = 350/25;
firstState.cols = 700/50-1;
firstState.margin = (700 - (firstState.cols * 50))/firstState.cols;

firstState.bricks = [];
firstState.onEnter = () => {
    firstState.fillBricks();
}
firstState.render = () => {
    if (!firstState.canvas){
        firstState.canvas = getCanvas();
    }
    let cEl = getCanvasElement();
    if (cEl.width != 700){
        cEl.width = 700;
        cEl.height = 700;
    }
    firstState.canvas.fillStyle = firstState.backgroundColor;
    firstState.canvas.fillRect(0,0,firstState.dimensions.width, firstState.dimensions.height);
    /*for(let i = 0; i < firstState.bricks.length; i++){
        for(let j = 0; j < firstState.bricks[i].length; j++){
            firstState.bricks[i][j].draw();
        }
    }*/
};
firstState.fillBricks = () => {
    for(let i = 0; i < firstState.rows; i++){
        let row = [];
        for(let j = 0; j < firstState.cols; j++){
            row.push(new Brick(j*(50+firstState.margin),i*(25+firstState.margin),50,25,"blue", getCanvas()));
        }
        firstState.bricks.push(row);
    }
}

