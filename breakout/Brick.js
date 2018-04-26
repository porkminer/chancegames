class Brick{
    constructor(x, y, w, h, color, canvas){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.bitmap = game.add.bitmapData(this.w, this.h);
        this.bitmap.ctx.beginPath();
        this.bitmap.ctx.rect(this.x, this.y, this.w, this.h);
        this.bitmap.ctx.fillStyle = this.color;
        this.bitmap.fill();
        this.sprite = game.add.sprite(this.x, this.y, this.bitmap);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        this.sprite.body.onCollide = new Phaser.Signal();
        this.sprite.body.onCollide.add(hitBrick, this);
    }

    draw(){
        this.canvas.fillStyle = this.color;
        this.canvas.fillRect(this.x, this.y, this.w, this.h);
    }
}