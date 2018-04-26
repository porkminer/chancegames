class MenuButton{
    constructor(x, y, w, h, color, text, action){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.origColor = color;
        this.text = text;
        this.action = action;
    }
    draw(){
        let canvas = getCanvas();
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.w, this.h);
        canvas.fillStyle = "#000";
        canvas.fillText(this.text, this.x+100, this.y +64 );
    }
    
}