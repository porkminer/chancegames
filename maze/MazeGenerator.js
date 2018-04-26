class MazeGenerator{
    constructor(width, height, hRooms, vRooms, interval, steps, id){
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#CCCCCC";
        this.ctx.fillRect(0,0,width, height);
        this.width = width;
        this.height = height;
        this.hRooms = hRooms;
        this.vRooms = vRooms;
        this.roomWidth = this.width / this.hRooms;
        this.roomHeight = this.height / this.vRooms;
        this.interval = interval;
        this.steps = steps;
        this.finished = false;
        this.rooms = [];
        this.history = [];
        this.currentRoom = undefined;
        this.path = [];
        this.initRooms();
        document.addEventListener('keypress', (event) => {
            var keyCode = event.keyCode;
            var x = 0;
            var y = 0;
            if(keyCode === 119){

                y = this.path[this.path.length-1].y;
                x = this.path[this.path.length-1].x;
                if (y > 0 && this.rooms[y][x].connectedTo(this.rooms[y][x].neighbor(0,-1))){
                    y--;
                }
            } else if(keyCode === 97){
                x = this.path[this.path.length-1].x;
                y = this.path[this.path.length-1].y;
                if (x > 0 && this.rooms[y][x].connectedTo(this.rooms[y][x].neighbor(-1,0))){
                    x--;
                }
            } else if(keyCode === 115){
                y = this.path[this.path.length-1].y;
                x = this.path[this.path.length-1].x;
                if (y < this.vRooms-1 && this.rooms[y][x].connectedTo(this.rooms[y][x].neighbor(0,1))){
                    y++;
                }
            } else if(keyCode === 100){
                x = this.path[this.path.length-1].x;
                y = this.path[this.path.length-1].y;
                if (x < this.hRooms-1 && this.rooms[y][x].connectedTo(this.rooms[y][x].neighbor(1,0))){
                    x++;
                }
            }
            this.path.push(this.rooms[y][x]);
        });
    }

    initRooms(){
        for(var y = 0; y < this.vRooms; ++y){
            var row = [];
            for(var x = 0; x < this.hRooms; ++x){
                row.push(new Room(this, x, y));
            }
            this.rooms.push(row);
        }
        this.path.push(this.rooms[0][0]);
    }

    drawLoop(){
        //this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        
            for(var c = 0; c < this.steps; ++c){
                if (!this.finished){
                    this.step();
                    this.checkFinished();
                }
            }
        
        if (this.finished){
            //console.log("finished stuff");
            for(let a = 0; a < this.path.length; a++){
                this.path[a].inPath = true;
                if (a < this.path.length-1){
                    this.path[a].hasHero = false;
                } else {
                    this.path[a].hasHero = true;
                }
                this.path[a].draw();
                
            }
            
        }
        //console.log("drawLoop");
        window.requestAnimationFrame(this.drawLoop.bind(this));
        //var _this = this;
        //this.timeout = setTimeout(function(){
        //    _this.drawLoop();
        //}, this.interval);
    }

    step(){
        
        
        var oldRoom = this.currentRoom;
        
        
        var currentRoom = this.currentRoom = this.chooseRoom();
        
        if (!currentRoom){
            oldRoom.draw();
            this.finished = true;
            return;
        }
        currentRoom.occupied = true;
        if (!currentRoom.inHistory){
            this.history.push(currentRoom);
            currentRoom.inHistory = true;
        }

        if (oldRoom){
            if (!oldRoom.hasChild(currentRoom) && currentRoom.parent === undefined) {
                oldRoom.connectTo(currentRoom);
            }
            oldRoom.draw();
        }

        currentRoom.draw();
    }

    chooseRoom(){
        if (this.currentRoom){
            var n = this.currentRoom.randomAvailableNeighbor();
            if (n){
                return n;
            } else {
                var b = this.history.pop();
                b && (b.inHistory = false);
                b = this.history.pop();
                b && (b.inHistory = false);
                return b;
            }
        } else {
            var x = Math.floor(Math.random() * this.hRooms);
            var y = Math.floor(Math.random() * this.vRooms);
            return this.rooms[y][x];
        }
    }

    checkFinished(){
        return false;
    }


}

