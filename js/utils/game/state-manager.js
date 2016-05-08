import Marionette from 'marionette';

const STATES = {
    NOT_STARTED: 0,
    STARTED: 1,
    WAITING_FOR_GUESS: 2,
    GUESSING_DONE: 3,
    ENDED: 4
};

const StateManager = Marionette.Object.extend({
    STATES: STATES,
    initialize() {
        this.state = STATES.NOT_STARTED;
    },
    transitionTo(transitionState) {
        if(!STATES[transitionState]){
            throw new Error(`${transitionState} is not a valid state`);
        }

        this.triggerMethod('before:transition', this.state, transitionState);
        this.state = transitionState;
        this.triggerMethod('transition', this.state);
    }
});

export default new StateManager();