var height = 600;
var width = 900;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update });


var brickHeight = height / 24;
var brickWidth = width / 12;
var rows = (height/2)/brickHeight-3;
var cols = width/brickWidth-1;
var margin = (width - (cols * brickWidth))/cols;
var bricks = [];
var paddle = null;
var ball = null;
var score = 0;
var brickR = 00;
var brickG = 00;
var brickB = 99;
function preload(){

}

function create(){
    game.stage.backgroundColor = "#ffffff";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    for(let i = 0; i < rows; i++){
        let row = [];
        let color = "#" + brickR + "" + brickG + "" + brickB;
        for(let j = 0; j < cols; j++){
            row.push(new Brick(j*(brickWidth+margin)+(brickWidth/2)+2,i*(brickHeight+margin)+(brickHeight/2)+2,brickWidth,brickHeight,color, getCanvas()));
        }
        bricks.push(row);
        brickR += 10;
        brickG += 10;
        brickB -= 10;
        if (brickR > 99){
            brickR = 99;
        }
        if (brickG > 99){
            brickG = 99;
        }
        if (brickB < 0){
            brickB = 0;
        }

    }
    paddle = new Paddle(brickWidth/4, brickWidth*2);
    ball = new Ball(brickWidth/4, brickWidth/4);
}

function update(){
    game.physics.arcade.moveToPointer(paddle.sprite, 2000);
    let xVel = paddle.sprite.body.velocity.x;
    let yVel = 0;
    paddle.sprite.body.velocity.setTo(xVel, yVel);
    if (ball.sprite.body.velocity.x == 0){
        ball.sprite.body.velocity.setTo(-200,ball.sprite.body.velocity.y);
    }
    if (ball.sprite.body.velocity.y == 0){
        ball.sprite.body.velocity.setTo(ball.sprite.body.velocity.x, -200);
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            game.physics.arcade.collide(bricks[i][j].sprite, ball.sprite);
        }
    }
    game.physics.arcade.collide(paddle.sprite, ball.sprite);
    if (ball.sprite.body.position.y >= height-20){
        ball.sprite.body.position.setTo(width/2, height-50);
        ball.sprite.body.velocity.setTo(-200,-200);
    }
    if (score >= rows*cols){
        window.location = "http://192.168.1.180:8080/breakout/";
    }
    if (ball.sprite.body.velocity.x > width*2){
        ball.sprite.body.velocity.setTo(ball.sprite.body.velocity.x/2, ball.sprite.body.velocity.y);
    }
    //console.log(ball.sprite);
}

function hitBrick(sprite1, sprite2){
    sprite1.destroy();
    score++;
    sprite2.body.velocity.setTo(sprite2.body.velocity.x+.2, sprite2.body.velocity.y+.2);
}

function hitPaddle(sprite1, sprite2){
    sprite2.body.velocity.setTo(sprite1.body.velocity.x/10+sprite2.body.velocity.x, sprite2.body.velocity.y);
}

/*var game = new Game();
window.onload = function(){
    
    game.init();
    game.physics.startSystem(Phaser.Physics.ARCADE);
}
*/