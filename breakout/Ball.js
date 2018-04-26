class Ball{
    constructor(h, w){
        this.w = w;
        this.h = h;
        this.bitmap = game.add.bitmapData(this.w, this.w);
        //this.bitmap.ctx.beginPath();
        //this.bitmap.ctx.arc(width/2, height-50, this.w, 360);
        //this.bitmap.ctx.fillStyle = "#000066";
        //this.bitmap.fill();
        this.bitmap.ctx.fillStyle = "#000066";
        this.bitmap.ctx.beginPath();
        this.bitmap.ctx.arc(this.bitmap.width/2, this.bitmap.height/2, this.w/2, 0,Math.PI*2, true);
        this.bitmap.ctx.closePath();
        this.bitmap.ctx.fill();
        this.sprite = game.add.sprite(width/2, height-50, this.bitmap);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
    }

    update(){

    }
}