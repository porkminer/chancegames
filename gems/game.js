var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update });
var graphics;
var sprites = [];
var selected = [];
var tweening = false;
var startScoring = false;
var xOffset = 240;
var yOffset = 32;
var colors = ['gem', 'gem1', 'gem2', 'gem3', 'gem4', 'gem5'];
var score = 0;
var scoreText;
var style = { font: "32px Arial", fill: "#ffffff", align: "center"};
function preload(){
    game.load.spritesheet('gem', 'spritesheets/crystal-qubodup-ccby3-32-blue.png', 32, 32);
    game.load.spritesheet('gem1', 'spritesheets/crystal-qubodup-ccby3-32-orange.png', 32, 32);
    game.load.spritesheet('gem2', 'spritesheets/crystal-qubodup-ccby3-32-pink.png', 32, 32);
    game.load.spritesheet('gem3', 'spritesheets/crystal-qubodup-ccby3-32-green.png', 32, 32);
    game.load.spritesheet('gem4', 'spritesheets/crystal-qubodup-ccby3-32-grey.png', 32, 32);
    game.load.spritesheet('gem5', 'spritesheets/crystal-qubodup-ccby3-32-yellow.png', 32, 32);
    game.load.image('background', 'spritesheets/background.png');
    graphics = game.add.graphics(0,0);
}
function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
function create(){
    game.add.tileSprite(0, game.height - game.cache.getImage('background').height, game.width, game.cache.getImage('background').height, 'background');
    sprites.push.apply(sprites, new SpriteList(0).getSprites());
    sprites.push.apply(sprites, new SpriteList(1).getSprites());
    sprites.push.apply(sprites, new SpriteList(2).getSprites());
    sprites.push.apply(sprites, new SpriteList(3).getSprites());
    sprites.push.apply(sprites, new SpriteList(4).getSprites());
    sprites.push.apply(sprites, new SpriteList(5).getSprites());
    for(let i = 0; i < sprites.length; i++){
        sprites[i].index = i;
    }
    /*for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 60 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 100 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 140 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 180 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 220 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    for(let i = 0; i < 10; i++){
        let sprite = game.add.sprite(i * 32 + xOffset, 260 + yOffset, colors[random(0, colors.length)]);
        sprite.animations.add('spin');
        sprite.animations.play('spin', 10, true);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(listener, this);
        sprites.push(sprite);
        sprite.index = sprites.length-1;
        sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
    }
    */
    
    
    
    scoreText = game.add.text(0, 0, "Score: " + score, style);
}
function listener(sprite, point){
    //console.log(sprite);
    if(!startScoring){
        startScoring = true;
    }
    if (selected.length < 2){
        selected.push(sprite);
    }
    //console.log(selected);
}
function update(){
    //console.log(selected.length);
    scoreText.text = "Score: " + score;
    if (selected.length > 1){
        let s1 = selected[0].index;
        let s2 = selected[1].index;
        let ind = selected[1].index - selected[0].index;
        //console.log(ind);
        if (ind > 0){
            if (ind == 10 || ind == 1){
                let tempX1 = selected[0].x;
                let tempX2 = selected[1].x;
                let tempY1 = selected[0].y;
                let tempY2 = selected[1].y;
                game.add.tween(sprites[selected[0].index]).to({x: tempX2, y: tempY2}, 500, Phaser.Easing.Linear.None, true);
                game.add.tween(sprites[selected[1].index]).to({x: tempX1, y: tempY1}, 500, Phaser.Easing.Linear.None, true);
                tweening = true;
                setTimeout(() => {tweening = false;}, 1000);
                let tempIndex = selected[1].index;
                sprites[tempIndex] = selected[0];
                sprites[selected[0].index] = selected[1];
                sprites[selected[0].index].index = selected[0].index;
                sprites[tempIndex].index = tempIndex;
                sprites[s1].sPos = {x: tempX1, y: tempY1};
                sprites[s2].sPos = {x: tempX2, y: tempY2};
                selected = [];
            } else {
                selected = [];
            }
        } else if (ind == 0){
            selected.pop();
        } else if(ind == -10){
            let tempIndex = selected[1].index;
            let tempX1 = selected[0].x;
                let tempX2 = selected[1].x;
                let tempY1 = selected[0].y;
                let tempY2 = selected[1].y;
                game.add.tween(sprites[selected[0].index]).to({x: tempX2, y: tempY2}, 500, Phaser.Easing.Linear.None, true);
                game.add.tween(sprites[selected[1].index]).to({x: tempX1, y: tempY1}, 500, Phaser.Easing.Linear.None, true);
                sprites[tempIndex] = selected[0];
                sprites[selected[0].index] = selected[1];
                sprites[selected[0].index].index = selected[0].index;
                sprites[tempIndex].index = tempIndex;
                sprites[s1].sPos = {x: tempX1, y: tempY1};
                sprites[s2].sPos = {x: tempX2, y: tempY2};
                tweening = true;
                setTimeout(() => {tweening = false;}, 1000);
                selected = [];
        } else if(ind == -1){
            let tempIndex = selected[1].index;
            let tempX1 = selected[0].x;
                let tempX2 = selected[1].x;
                let tempY1 = selected[0].y;
                let tempY2 = selected[1].y;
                game.add.tween(sprites[selected[0].index]).to({x: tempX2, y: tempY2}, 500, Phaser.Easing.Linear.None, true);
                game.add.tween(sprites[selected[1].index]).to({x: tempX1, y: tempY1}, 500, Phaser.Easing.Linear.None, true);
                sprites[tempIndex] = selected[0];
                sprites[selected[0].index] = selected[1];
                sprites[selected[0].index].index = selected[0].index;
                sprites[tempIndex].index = tempIndex;
                sprites[s1].sPos = {x: tempX1, y: tempY1};
                sprites[s2].sPos = {x: tempX2, y: tempY2};
                tweening = true;
                setTimeout(() => {tweening = false;}, 1000);
                selected = [];
        } else {
            selected = [];
        }
    }
    if (!tweening){
        //findMatches();
        match();
    }
}

function findMatches(){
    let lScore = 0;
    let matches = [];
    for(let i = 0; i < 60; i++){
        let tmatches = [];
        tmatches.push(sprites[i]);
        if (i > 9){
            //check above
                if (sprites[i] && sprites[i-10]){
                if (sprites[i].key === sprites[i-10].key){
                    tmatches.push(sprites[i-10]);
                }
            }
        }
        if (i % 10 > 0 && i > 0){
            //check left
            if (sprites[i] && sprites[i-1]){
                if (sprites[i].key === sprites[i-1].key){
                    tmatches.push(sprites[i-1]);
                }
            }
        }
        if (i % 9 > 0){
            //check right
            if (sprites[i] && sprites[i+1]){
                if(sprites[i].key === sprites[i+1].key){
                    tmatches.push(sprites[i+1]);
                }
            }
        }
        if (i < 50){
            //check bottom
            if (sprites[i] && sprites[i+10]){
                if(sprites[i].key === sprites[i+10].key){
                    tmatches.push(sprites[i+10]);
                }
            }
        }
        //console.log(matches);
        if (tmatches.length < 3){
            tmatches = [];
        } else {
            matches = tmatches;
        }
        
    }
    if (matches.length >= 3){
        for(let j = matches.length-1; j >= 0; j--){
            matches = deDuplicate(matches, "index");
        }
        lScore++;
        let inds = [];
        for(let j = matches.length-1; j >= 0; j--){
            inds.push({ind: matches[j].index, x: matches[j].sPos.x, y: matches[j].sPos.y});
            matches[j].destroy();
        }
        for(let j = 0; j < inds.length; j++){
            
            let sprite = game.add.sprite(0, 0, colors[random(0, colors.length)]);
            
            sprite.index = inds[j].ind;
            
            sprite.animations.add('spin');
            sprite.animations.play('spin', 10, true);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(listener, this);
            
            sprites[inds[j].ind] = sprite;
            sprite.sPos = {x: inds[j].x, y: inds[j].y};
            
            game.add.tween(sprite).to({x: inds[j].x, y: inds[j].y}, 500, Phaser.Easing.Linear.None, true);
            tweening = true;
            setTimeout(() => {tweening = false;}, 2000);
        }
    }
    graphics.beginFill("#aaa", 0.2);
    graphics.drawRect(0,0,16, 16);
    graphics.endFill();
    if (lScore > 0){
        if (startScoring){
            score++;
        }
    }
}

function deDuplicate(myArr, prop){
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}


function match(){
    
    let matches = [];
    let lScore = 0;
    for(let i = 0; i < sprites.length; i++){
        let tmatches = [];
        tmatches.push(sprites[i]);
        
        if (sprites[i+1] && sprites[i+2]){
            if (sprites[i].key === sprites[i+1].key && sprites[i].key === sprites[i+2].key && i % 10 < 8){
                tmatches.push(sprites[i+1]);
                tmatches.push(sprites[i+2]);
            }
        } 
        if(sprites[i+10] && sprites[i+20]){
            if (sprites[i].key === sprites[i+10].key && sprites[i].key === sprites[i+20].key){
                tmatches.push(sprites[i+10]);
                tmatches.push(sprites[i+20]);
            }
        }
        if (tmatches.length !== 1){
            matches = tmatches;
        }
    }



    //remove and replace matches
    if (matches.length >= 3){
        for(let j = matches.length-1; j >= 0; j--){
            matches = deDuplicate(matches, "index");
        }
        lScore++;
        let inds = [];
        for(let j = matches.length-1; j >= 0; j--){
            inds.push({ind: matches[j].index, x: matches[j].sPos.x, y: matches[j].sPos.y});
            matches[j].destroy();
        }
        for(let j = 0; j < inds.length; j++){
            
            let sprite = game.add.sprite(0, 0, colors[random(0, colors.length)]);
            
            sprite.index = inds[j].ind;
            
            sprite.animations.add('spin');
            sprite.animations.play('spin', 10, true);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(listener, this);
            
            sprites[inds[j].ind] = sprite;
            sprite.sPos = {x: inds[j].x, y: inds[j].y};
            
            game.add.tween(sprite).to({x: inds[j].x, y: inds[j].y}, 500, Phaser.Easing.Linear.None, true);
            tweening = true;
            setTimeout(() => {tweening = false;}, 750);
        }
    }
    if (lScore > 0){
        if (startScoring){
            score++;
        }
    }

}