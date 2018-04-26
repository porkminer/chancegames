class SpriteList{
    constructor(rowNumber){
        this.colors = ['gem', 'gem1', 'gem2', 'gem3', 'gem4', 'gem5'];
        this.xOffset = 240;
        this.yOffset = 32;
        this.sprites = [];
        for(let i = 0; i < 10; i++){
            let sprite = game.add.sprite(i * 32 + xOffset, 60 + (rowNumber * 40) + yOffset, colors[random(0, colors.length)]);
            sprite.animations.add('spin');
            sprite.animations.play('spin', 10, true);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(listener, this);
            this.sprites.push(sprite);
            sprite.index = sprites.length-1;
            sprite.sPos = {x: sprite.position.x, y: sprite.position.y};
        }
    }
    getSprites(){
        return this.sprites;
    }
}