class Grid {
  constructor(width, height, rows, columns, bombs, game) {
    this.grid = [];
    this.game = game;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.columns = columns;
    this.numBombs = bombs;
    this.gridSprites = game.add.group();
    this.bombs = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.grid.push({ x: j, y: i });
        let graphics = this.game.add.graphics(this.w, this.h);
        graphics.lineStyle(1, 0x000000, 1);
        //graphics.moveTo(j*this.width, i*this.height);
        //graphics.lineTo(j*this.width+this.width, i*this.height);
        //graphics.lineTo(j*this.width+this.width, i*this.height+this.height);
        //graphics.lineTo(j*this.width, i*this.height+this.height);
        //graphics.lineTo(j*this.width, i*this.height);
        graphics.drawRect(
          j * this.width,
          i * this.height,
          this.width,
          this.height
        );
        //this.makeSprites(j, i, graphics);
      }
    } /*
        for(let i = 0; i < this.numBombs; i++){
            this.bombs.push(this.randomBomb());
        }*/
  }
  draw() {
    //draw squares
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {}
    }
    //draw bombs
  }
  randomBomb() {
    var rand = Math.floor(Math.random() * this.grid.length);
    if (rand in this.bombs) {
      rand = this.randomBomb();
    }
    return rand;
  }

  makeSprites(x, y, graph) {
    let gRectTex = graph.generateTexture();
    let gRectSprite = game.add.sprite(x, y, gRectTex);
    //game.physics.enable(gRectSprite, Phaser.Physics.ARCADE);
    //gRectSprite.body.immovable = true;
    //gRectSprite.body.onCollide = new Phaser.Signal();
    //gRectSprite.body.onCollide.add(worldCollide, this);
    this.gridSprites.add(gRectSprite);
  }
}
