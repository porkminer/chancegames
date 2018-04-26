
class StateList{
    constructor(){
        this.states = [];
        this.pop = () => {
            return this.states.pop();
        };
        this.push = (state) => {
            this.states.push(state);
        };
        this.top = () => {
            return this.states[this.states.length-1];
        };
    }
}
