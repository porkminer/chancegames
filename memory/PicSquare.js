class PicSquare{
    constructor(picture, index, sizefactor, rowsize, scaleSize, rowLimit){
        this.pic = picture;
        this.x = 0;
        this.y = -1;
        this.index = index;
        this.flipped = false;
        this.matched = false;
        if (!sizefactor){
            sizefactor = 128;
        }
        if (!rowsize){
            rowsize = 6;
        }
        if (!scaleSize){
            scaleSize = 1;
        }
        if (!rowLimit){
            rowLimit = 0;
        }
        this.scaleSize = scaleSize;
        this._load(sizefactor);
        
        for(let i = 0; i < index; i++){
            if (i % rowsize === 0){
                this.x = 0;
                this.y++;
                if (rowLimit > 0){
                    if (rowLimit === this.y){
                        this.y = 0;
                    }
                }
                
            } else {
                this.x++;
            }
        }
        this.x = this.x * sizefactor;
        this.y = this.y * sizefactor;
    }
    flip(){
        
        this.flipped = !this.flipped;
    }
    match(){
        this.matched = true;
    }
    _load(sizefactor){
        
        this.img = new Image(sizefactor, sizefactor);
        this.img.src = '/games/memory/images/pic128/' + this.pic;
        
    }
    
}