class Level{
    constructor(h, w, rooms){
        this.h = h;
        this.w = w;
        this.rooms = rooms;
        this.hallSize = 60;
        this.start = null;
        this.fruits = 4;
        this.margin = this.hallSize/2;
        this.dots = game.add.group();
        this.ghosts = [];
        this.player = null;
        this.levelSprites = game.add.group();
        this.color = 0x0000ff;
        this.graphics = game.add.graphics(this.h, this.w);
        //this.graphics.beginFill(0x003300);
        this.graphics.lineStyle(3, this.color, 1);
        this.graphics.moveTo(0,0);
        this.graphics.lineTo(0, this.h-6);
        this.graphics.lineTo(this.w-6, this.h-6);
        this.graphics.lineTo(this.w-6, 0);
        this.graphics.lineTo(0,0);
        this.makeLevel();
        //this.graphics.endFill();
        
        //this.tex = this.graphics.generateTexture();
        //this.sprite = game.add.sprite(0,0,this.tex);
        //this.sprite.immovable = true;
        //game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        //this.sprite.body.onCollide = new Phaser.Signal();
        //this.sprite.body.onCollide.add(worldCollide, this);
        this.init();
        
    }

    makeLevel(){
        //corner rect
        let cRect = game.add.graphics(600, 600);
        cRect.lineStyle(3, this.color, 1);
        cRect.moveTo(this.hallSize,this.hallSize);
        cRect.lineTo(this.hallSize, 3*this.hallSize);
        cRect.lineTo(this.hallSize*2, 3*this.hallSize);
        cRect.lineTo(this.hallSize*2, this.hallSize);
        cRect.lineTo(this.hallSize, this.hallSize);

        this.makeSprites(this.hallSize, this.hallSize, cRect);
        
        
        //bottom corner rect
        let bcRect = game.add.graphics(600, 600);
        bcRect.lineStyle(3, this.color, 1);
        bcRect.moveTo(this.hallSize, height-this.hallSize);
        bcRect.lineTo(this.hallSize, height-(3*this.hallSize));
        bcRect.lineTo(this.hallSize*2, height-(3*this.hallSize));
        bcRect.lineTo(this.hallSize*2, height-this.hallSize);
        bcRect.lineTo(this.hallSize, height-this.hallSize);

        this.makeSprites(this.hallSize, height-3*this.hallSize, bcRect);

        //left middle lines
        let lmRect = game.add.graphics(600, 600);
        lmRect.lineStyle(3, this.color, 1);
        lmRect.moveTo(this.hallSize, this.hallSize*4);
        lmRect.lineTo(this.hallSize*3, this.hallSize*4);

        this.makeSprites(this.hallSize, 4*this.hallSize, lmRect);

        let lmRect2 = game.add.graphics(600, 600);
        lmRect2.lineStyle(3, this.color, 1);
        lmRect2.moveTo(0, this.hallSize*5);
        lmRect2.lineTo(this.hallSize*3, this.hallSize*5);

        this.makeSprites(0, 5*this.hallSize, lmRect2);

        let lmRect3 = game.add.graphics(600, 600);
        lmRect3.lineStyle(3, this.color, 1);
        lmRect3.moveTo(this.hallSize, this.hallSize*6);
        lmRect3.lineTo(this.hallSize*3, this.hallSize*6);

        this.makeSprites(this.hallSize, 6*this.hallSize, lmRect3);

        let gRect = game.add.graphics(600,600);
        gRect.lineStyle(3, this.color, 1);
        gRect.moveTo(this.hallSize * 3, height - this.hallSize);
        gRect.lineTo(this.hallSize * 3, height - this.hallSize*3);

        this.makeSprites(this.hallSize*3, height-this.hallSize*3, gRect);




        let gRect2 = game.add.graphics(600, 600);
        gRect2.lineStyle(3, this.color, 1);
        gRect2.moveTo(this.hallSize * 3, this.hallSize);
        gRect2.lineTo(this.hallSize*3, this.hallSize*3);
        this.makeSprites(this.hallSize*3, this.hallSize, gRect2);

        let gRect3 = game.add.graphics(600, 600);
        gRect3.lineStyle(3, this.color, 1);
        gRect3.moveTo(this.hallSize * 4, this.hallSize*3);
        gRect3.lineTo(this.hallSize*11, this.hallSize*3);
        this.makeSprites(this.hallSize*4, this.hallSize*3, gRect3);

        let gRect4 = game.add.graphics(600, 600);
        gRect4.lineStyle(3, this.color, 1);
        gRect4.moveTo(this.hallSize * 4, height-this.hallSize*3);
        gRect4.lineTo(this.hallSize*11, height-this.hallSize*3);
        this.makeSprites(this.hallSize*4, height-this.hallSize*3, gRect4);

        let gRect5 = game.add.graphics(600, 600);
        gRect5.lineStyle(3, this.color, 1);
        gRect5.moveTo(this.hallSize*4, this.hallSize*2);
        gRect5.lineTo(this.hallSize*11, this.hallSize*2);
        this.makeSprites(this.hallSize*4, this.hallSize*2, gRect5);

        let gRect6 = game.add.graphics(600, 600);
        gRect6.lineStyle(3, this.color, 1);
        gRect6.moveTo(this.hallSize*4, this.hallSize*2);
        gRect6.lineTo(this.hallSize*4, this.hallSize);
        gRect6.lineTo(this.hallSize*11, this.hallSize);
        gRect6.lineTo(this.hallSize*11, this.hallSize*2);
        this.makeSprites(this.hallSize*4, this.hallSize, gRect6);

        let gRect7 = game.add.graphics(600, 600);
        gRect7.lineStyle(3, this.color, 1);
        gRect7.moveTo(this.hallSize*4, height - this.hallSize*2);
        gRect7.lineTo(this.hallSize*4, height - this.hallSize);
        this.makeSprites(this.hallSize*4, height - this.hallSize*2, gRect7);

        let grect8 = game.add.graphics(600, 600);
        grect8.lineStyle(3, this.color, 1);
        grect8.moveTo(this.hallSize*4, height - this.hallSize*2);
        grect8.lineTo(this.hallSize*11, height - this.hallSize*2);
        grect8.lineTo(this.hallSize*11, height - this.hallSize);
        grect8.lineTo(this.hallSize*4, height - this.hallSize);
        this.makeSprites(this.hallSize*4, height - this.hallSize*2, grect8);

        let grect9 = game.add.graphics(600,600);
        grect9.lineStyle(3, this.color, 1);
        grect9.moveTo(this.hallSize*6, this.hallSize*4);
        grect9.lineTo(this.hallSize*9, this.hallSize*4);
        grect9.lineTo(this.hallSize*9, this.hallSize*6);
        grect9.lineTo(this.hallSize*6, this.hallSize*6);
        grect9.lineTo(this.hallSize*6, this.hallSize*4);
        this.makeSprites(this.hallSize*6, this.hallSize*4, grect9);

        //opposite corner rect
        let grect10 = game.add.graphics(600,600);
        grect10.lineStyle(3, this.color, 1);
        grect10.moveTo(width - this.hallSize,this.hallSize);
        grect10.lineTo(width - this.hallSize, 3*this.hallSize);
        grect10.lineTo(width - this.hallSize*2, 3*this.hallSize);
        grect10.lineTo(width - this.hallSize*2, this.hallSize);
        grect10.lineTo(width - this.hallSize, this.hallSize);
        this.makeSprites(width - this.hallSize*2, this.hallSize, grect10);


        //opposite bottom corner rect
        let grect11 = game.add.graphics(600, 600);
        grect11.lineStyle(3, this.color, 1);
        grect11.moveTo(width - this.hallSize, height-this.hallSize);
        grect11.lineTo(width - this.hallSize, height-(3*this.hallSize));
        grect11.lineTo(width - this.hallSize*2, height-(3*this.hallSize));
        grect11.lineTo(width - this.hallSize*2, height-this.hallSize);
        grect11.lineTo(width - this.hallSize, height-this.hallSize);
        this.makeSprites(width - this.hallSize*2, height-(3*this.hallSize), grect11);


        //right middle lines
        let grect12 = game.add.graphics(600, 600);
        grect12.lineStyle(3, this.color, 1);
        grect12.moveTo(width - this.hallSize, this.hallSize*4);
        grect12.lineTo(width - this.hallSize*3, this.hallSize*4);
        this.makeSprites(width - this.hallSize*3, this.hallSize*4, grect12);

        let grect13 = game.add.graphics(600, 600);
        grect13.lineStyle(3, this.color, 1);
        grect13.moveTo(width - 0, this.hallSize*5);
        grect13.lineTo(width - this.hallSize*3, this.hallSize*5);
        this.makeSprites(width - this.hallSize*3, this.hallSize*5, grect13);

        let grect14 = game.add.graphics(600, 600);
        grect14.lineStyle(3, this.color, 1);
        grect14.moveTo(width - this.hallSize, this.hallSize*6);
        grect14.lineTo(width - this.hallSize*3, this.hallSize*6);
        this.makeSprites(width - this.hallSize*3, this.hallSize*6, grect14);

        let grect15 = game.add.graphics(600, 600);
        grect15.lineStyle(3, this.color, 1);
        grect15.moveTo(width - this.hallSize * 3, height - this.hallSize);
        grect15.lineTo(width - this.hallSize * 3, height - this.hallSize*3);
        this.makeSprites(width - this.hallSize*3, height - this.hallSize*3, grect15);

        let grect16 = game.add.graphics(600, 600);
        grect16.lineStyle(3, this.color, 1);
        grect16.moveTo(width - this.hallSize * 3, this.hallSize);
        grect16.lineTo(width - this.hallSize*3, this.hallSize*3);
        this.makeSprites(width - this.hallSize*3, this.hallSize, grect16);

        let grect17 = game.add.graphics(600, 600);
        grect17.lineStyle(3, this.color, 1);
        grect17.moveTo(this.hallSize * 4, this.hallSize*4);
        grect17.lineTo(this.hallSize*4, this.hallSize*6);
        this.makeSprites(this.hallSize*4, this.hallSize*4, grect17);

        let grect18 = game.add.graphics(600, 600);
        grect18.lineStyle(3, this.color, 1);
        grect18.moveTo(width - this.hallSize * 4, this.hallSize*4);
        grect18.lineTo(width - this.hallSize*4, this.hallSize*6);
        this.makeSprites(width - this.hallSize*4, this.hallSize*4, grect18);

        let grect19 = game.add.graphics(600, 600);
        grect19.lineStyle(3, this.color, 1);
        grect19.moveTo(this.hallSize*5, this.hallSize*3);
        grect19.lineTo(this.hallSize*5, this.hallSize*4);
        this.makeSprites(this.hallSize*5, this.hallSize*3, grect19);

        let grect20 = game.add.graphics(600, 600);
        grect20.lineStyle(3, this.color, 1);
        grect20.moveTo(width - this.hallSize*5, this.hallSize*3);
        grect20.lineTo(width - this.hallSize*5, this.hallSize*4);
        this.makeSprites(width - this.hallSize*5, this.hallSize*3, grect20);

        let grect21 = game.add.graphics(600, 600);
        grect21.lineStyle(3, this.color, 1);
        grect21.moveTo(this.hallSize*5, height - this.hallSize*3);
        grect21.lineTo(this.hallSize*5, height - this.hallSize*4);
        this.makeSprites(this.hallSize*5, height - this.hallSize*4, grect21);

        let grect22 = game.add.graphics(600, 600);
        grect22.lineStyle(3, this.color, 1);
        grect22.moveTo(width - this.hallSize*5, height - this.hallSize*3);
        grect22.lineTo(width - this.hallSize*5, height - this.hallSize*4);
        this.makeSprites(width - this.hallSize*5, height - this.hallSize*4, grect22);


        this.makeDots();
        
    }
    makeSprites(x, y, graph){
        let gRectTex = graph.generateTexture();
        let gRectSprite = game.add.sprite(x, y, gRectTex);
        game.physics.enable(gRectSprite, Phaser.Physics.ARCADE);
        gRectSprite.body.immovable = true;
        gRectSprite.body.onCollide = new Phaser.Signal();
        gRectSprite.body.onCollide.add(worldCollide, this);
        this.levelSprites.add(gRectSprite);
    }
    makeDots(){
        for(let i = 1; i < 30; i++){
            this.generateDot(i, 1);
            this.generateDot(i, 19);
        }
        for(let i = 2; i < 10; i++){
            this.generateDot(1, i);
            this.generateDot(1, 20-i);

            this.generateDot(29, i);
            this.generateDot(29, 20-i);
        }

        for(let i = 2; i < 10; i++){
            this.generateDot(i, 7);
            this.generateDot(i, 13);

            this.generateDot(30-i, 7);
            this.generateDot(30-i, 13);

            
        }
        for(let i = 2; i < 8; i++){
            this.generateDot(i, 9);
            this.generateDot(i, 11);

            this.generateDot(30-i, 9);
            this.generateDot(30-i, 11);
        }
        for(let i = 2; i < 7; i++){
            this.generateDot(5, i);
            this.generateDot(5, 20-i);
            this.generateDot(7, i);
            this.generateDot(7, 20-i);

            this.generateDot(25, i);
            this.generateDot(25, 20-i);
            this.generateDot(23, i);
            this.generateDot(23, 20-i);
        }
        for(let i = 8; i < 23; i++){
            this.generateDot(i, 5);
            this.generateDot(i, 15);
        }
        for(let i = 11; i < 20; i++){
            this.generateDot(i, 7);
            this.generateDot(i, 13);
        }
        for(let i = 8; i < 13; i++){
            this.generateDot(9, i);
            this.generateDot(11, i);
            this.generateDot(19, i);
            this.generateDot(21, i);
        }
        this.generateDot(7, 8);
        this.generateDot(7, 10);
        this.generateDot(7, 12);
        this.generateDot(23, 8);
        this.generateDot(23, 10);
        this.generateDot(23, 12);

        this.generateDot(10, 9);
        this.generateDot(10, 10);
        this.generateDot(10, 11);
        this.generateDot(20, 9);
        this.generateDot(20, 10);
        this.generateDot(20, 11);



    }

    generateDot(x, y){
        let bitmap = game.add.bitmapData(6, 6);
        bitmap.ctx.fillStyle = "#ffffff";
        bitmap.ctx.beginPath();
        bitmap.ctx.arc(bitmap.width/2, bitmap.height/2, 3, 0, Math.PI*2, true);
        bitmap.ctx.closePath();
        bitmap.ctx.fill();
        let sprite = game.add.sprite(this.margin*x, this.margin*y, bitmap);
        sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.immovable = true;
        sprite.body.onCollide = new Phaser.Signal();
        sprite.body.onCollide.add(dotCollide, this);
        this.dots.add(sprite);

    }

    init(){
        this.player = new Pacman(30, 30, 30,30,"#0000aa");
        for(let i = 0; i < 3; i++){
            this.ghosts.push(new Ghost(15, 15, i*15+ 100, 0, "#00aa11"));
        }
    }


}