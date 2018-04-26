var width = 600;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'Minesweeper', {preload: preload, create: create, update: update });
var grid = undefined;
function preload(){

}

function create(){
    game.stage.backgroundColor = "#ffffff";
    grid = new Grid(60, 60, 3, 3, 10, game);
    console.log(grid);
}

function update(){

}