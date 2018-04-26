class Room{
    constructor(maze, x, y){
        this.x = x;
        this.y = y;
        this.coords = {x: this.x, y: this.y};
        this.width = maze.roomWidth;
        this.height = maze.roomHeight;
        this.maze = maze;
        this.markerSize = [this.width, this.height].sort(function(a,b) {return a-b;})[0];
        this.occupied = false;
        this.ctx = maze.ctx;
        this.parent = undefined;
        this.children = [];
        this.hasHero = false;
        this.inPath = false;
    }

    hasChild(other){
        return this.children.lastIndexOf(other) > -1;
    }

    randomAvailableNeighbor(){
        var neighbors = this.availableNeighbors();
        return neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    neighbors(){
        if (this._neighbors){
            return this._neighbors;
        }

        this._neighbors = [];
        if (this.x > 0){
            this._neighbors.push(this.neighbor(-1, 0));
        }
        if (this.x < this.maze.hRooms - 1){
            this._neighbors.push(this.neighbor(1, 0));
        }

        if (this.y > 0){
            this._neighbors.push(this.neighbor(0, -1));
        }

        if (this.y < this.maze.vRooms - 1){
            this._neighbors.push(this.neighbor(0, 1));
        }

        return this._neighbors;
    }

    availableNeighbors(){
        var neighbors = this.neighbors();
        return neighbors.filter(function(n) {return !n.occupied;});
    }

    neighbor(relX, relY){
        var x = this.x + relX;
        var y = this.y + relY;
        if (x >= 0 && x < this.maze.hRooms && y >= 0 && y < this.maze.vRooms) {
            return this.maze.rooms[y][x];
        }
    }

    connectTo(other){
        this.children.push(other);
        other.parent = this;
    }

    connectedTo(other){
        if (other) {
            return this.parent === other || this.hasChild(other);
        } else {
            return false;
        }
    }

    draw(){
        this.erase();

        if (!this.connectedTo(this.neighbor(0, -1))){
            this.drawTopWall();
        }
        if(!this.connectedTo(this.neighbor(0, 1))){
            this.drawBottomWall();
        }
        if(this.occupied && !this.connectedTo(this.neighbor(-1, 0))){
            this.drawLeftWall();
        }
        if(!this.connectedTo(this.neighbor(1, 0))){
            this.drawRightWall();
        }
        if (this.inHistory){
            this.drawMarker();
        }
        if (this.hasHero){
            this.drawHero();
        }
    }

    erase(){
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }

    drawWall(x1, y1, x2, y2){
        var ctx = this.ctx;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
        if (this.inPath){
            ctx.fillStyle = "#3311bb";
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }
    }

    drawTopWall(){
        this.drawWall(this.x * this.width, this.y * this.height, (this.x + 1) * this.width, this.y * this.height);
    }

    drawBottomWall(){
        this.drawWall(this.x * this.width, (this.y + 1) * this.height, (this.x + 1) * this.width,(this.y + 1) * this.height);
    }

    drawLeftWall(){
        this.drawWall(this.x * this.width, this.y * this.height, this.x * this.width, (this.y + 1) * this.height);
    }

    drawRightWall(){
        this.drawWall((this.x + 1) * this.width, this.y * this.height, (this.x + 1) * this.width, (this.y + 1) * this.height);
    }

    drawMarker(){
        this.ctx.fillStyle = this.maze.currentRoom === this ? "#FF9999" : "#9999FF";

        this.ctx.beginPath();
        this.ctx.arc(this.x * this.width + this.width / 2, this.y * this.height + this.height / 2, this.markerSize * 0.33,0,Math.PI * 2, false);
        this.ctx.fill();
    }

    drawHero(){
        //console.log('drawing hero');
        this.ctx.fillStyle = "#FF9999";

        this.ctx.beginPath();
        this.ctx.arc(this.x * this.width + this.width / 2, this.y * this.height + this.height / 2, this.markerSize * 0.33,0,Math.PI * 2, false);
        this.ctx.fill();
    }

}