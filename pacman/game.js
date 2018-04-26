var height = 600;
var width = 900;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update });
var level = null;
var cursors = null;
var score = "";
function preload(){
    game.load.image('pacman', 'pacman.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    level = new Level(height, width, 16);
    game.stage.backgroundColor = "#001144";
    cursors = game.input.keyboard.createCursorKeys();

    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false, align: "center"};
    score = game.add.text(width/2,80, "" + level.player.dotsEaten, style);
}

function update(){
    score.text = level.player.dotsEaten;
    game.physics.arcade.collide(level.player.sprite, level.levelSprites);
    game.physics.arcade.collide(level.player.sprite, level.dots);
    //game.physics.arcade.overlap(level.player.sprite, level.sprite, worldCollide, null, this);
    if (cursors.left.isDown){
        level.player.sprite.body.velocity.setTo(-280, 0);
        level.player.sprite.scale.setTo(-1, 1);
    } else if (cursors.right.isDown){
        //console.log(level.player.sprite.body);
        level.player.sprite.body.velocity.setTo(280, 0);
        level.player.sprite.scale.setTo(1);
    }
    if (!cursors.left.isDown && !cursors.right.isDown){
        if (cursors.up.isDown){
            level.player.sprite.body.velocity.setTo(0, -280);
        } else if (cursors.down.isDown){
            //console.log(level.player.sprite.body);
            level.player.sprite.body.velocity.setTo(0, 280);
        } else {
            level.player.sprite.body.velocity.setTo(0, 0);
        }
    }

}


function worldCollide(sprite1, sprite2){
    console.log("collision");
}

function dotCollide(dot, player){
    dot.destroy();
    
    level.player.dotsEaten++;
    
}