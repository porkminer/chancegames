class StateStack{
    constructor(){
        this.states = new StateList();
        let state = new State();
        state.name = "empty";
        this.states.push(state);
        this.update = () => {
            let state = this.states.top();
            if (state){
                state.update();
            }
        };
        this.render = () => {
            let state = this.states.top();
            if(state){
                state.render();
            }
        };
        this.push = (state) => {
            this.states.push(state);
            state.onEnter();
        };
        this.pop = () => {
            let state = this.states.top();
            state.onExit();
            return this.states.pop();
        };
        this.top = () => {
            return this.states.top();
        }
        this.pause = () => {
            let state = this.states.top();
            if(state.onPause){
                state.onPause();
            }
        };
        this.resume = () => {
            let state = this.states.top();
            if(state.onResume){
                state.onResume();
            }
        };
    };
}

