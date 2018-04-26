class Game{
    constructor(){
        this.canvas_width = 768;
        this.canvas_height = 768;
        this.canvasElement = null;
        this.canvas = null;
        this.gameMode = new StateStack();
        this.update = () => {
            window.requestAnimationFrame(this.update);
            this.gameMode.update();
            this.gameMode.render();
        };
        this.startGame = () => {
            this.gameMode.push(MainMenuState);
            
            window.requestAnimationFrame(this.update);
            this.canvasElement.addEventListener("pointermove", (e) => {
                
                
                
                let x = e.clientX;
                let y = e.clientY;
                let state = this.gameMode.top();
                if (state.buttons){
                    
                    for(let i = 0; i < state.buttons.length; i++){
                        if(collides(state.buttons[i].x, state.buttons[i].y, state.buttons[i].w, state.buttons[i].h, x, y)){
                            state.buttons[i].color = "#fa0";
                
                        } else {
                            state.buttons[i].color = state.buttons[i].origColor;
                        }
                    }
                }
            });
            this.canvasElement.addEventListener("mouseup", (e) => {
               

                let x = e.clientX;
                let y = e.clientY;
                let state = this.gameMode.top();

                if (state.buttons){
                    for(let i = 0; i < state.buttons.length; i++){
                        if(collides(state.buttons[i].x, state.buttons[i].y, state.buttons[i].w, state.buttons[i].h, x, y)){
                            state.buttons[i].action();
                        }
                    }
                } 
                if (state.cards){
                    
                    for(let i = 0; i < state.cards.length; i++){
                        if(collides(state.cards[i].x, state.cards[i].y, state.cards[i].img.width, state.cards[i].img.height, x, y) && !state.cards[i].flipped){
                            if (state.indices.length < 2){
                                state.cards[i].flip();
                                
                            }
                        }
                    }
                }
            })
        };
        this.setupCanvas = () => {
            this.canvasElement = document.getElementById('canvas');
            this.canvasElement.width = this.canvas_width;
            this.canvasElement.height = this.canvas_height;
            this.canvas = this.canvasElement.getContext('2d');    
        };
        this.init = () => {
            this.setupCanvas();
            this.startGame();
        }
    }
}
