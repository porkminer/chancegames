function getGameInstance(){
    return game.gameMode;
}
function getCanvas(){
    return game.canvas;
}
function getGameDimensions(){
    return {width: game.canvas_width, height: game.canvas_height};
}
function getCanvasElement(){
    return game.canvasElement;
}
function collides(x, y, width, height, x2, y2){
    let left = x;
    let right = x + width;
    let top = y;
    let bottom = y + height;
    
    if (left <= x2 && right >= x2 && top <= y2 && bottom >= y2){
        return true;
    } else {
        return false;
    }
}
function compare(a, b){
    if (a.pic === b.pic){
        return true;
    } else {
        return false;
    }
}
function random(min, max){
    if (min === 0 && max === 1){
        return 0;
    }
    return Math.floor(Math.random() * (max - min) + min);
}