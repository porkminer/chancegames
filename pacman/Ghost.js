class Ghost{
    constructor(h, w, x, y, color){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.color = color;
        this.bitmap = game.add.bitmapData(this.w, this.h);
        this.bitmap.ctx.fillStyle = this.color;
        this.bitmap.ctx.beginPath();
        this.bitmap.ctx.arc(this.bitmap.width/2, this.bitmap.height/2, this.w/2, 0, Math.PI*2, true);
        this.bitmap.ctx.fill();
        this.sprite = game.add.sprite(this.x, this.y, this.bitmap);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
    }
    
}