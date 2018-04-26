class Paddle{
    constructor(h, w){
        this.h = h;
        this.w = w;
        this.bitmap = game.add.bitmapData(this.w, this.h);
        this.bitmap.ctx.beginPath();
        this.bitmap.ctx.rect(width/2, height, this.w, this.h);
        this.bitmap.ctx.fillStyle = "#000066";
        this.bitmap.fill();
        this.sprite = game.add.sprite(width/2, height-25, this.bitmap);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.onCollide = new Phaser.Signal();
        this.sprite.body.onCollide.add(hitPaddle, this);
        this.sprite.body.immovable = true;
        
    }
}