import StateMachine from 'javascript-state-machine';
import keyMirror from 'utils/key-mirror';

const STATES = keyMirror({
    NOT_STARTED: null,
    STARTED: null,
    WAITING_FOR_GUESS: null,
    GUESS_MADE: null,
    ENDED: null
});

const ACTIONS = {
    START: 'start',
    WAIT_FOR_GUESS: 'waitForGuess',
    GUESS: 'guess',
    FINISH: 'finish'
};

console.log(ACTIONS);

export default StateMachine.create({
    initial: STATES.NOT_STARTED,
    events: [
        {name: ACTIONS.START, from: STATES.NOT_STARTED, to: STATES.STARTED},
        {name: ACTIONS.WAIT_FOR_GUESS, from: [ STATES.STARTED, STATES.GUESS_MADE], to: STATES.WAITING_FOR_GUESS},
        {name: ACTIONS.GUESS, from: [STATES.WAITING_FOR_GUESS, STATES.GUESS_MADE], to: STATES.GUESS_MADE},
        {name: ACTIONS.FINISH, from: STATES.GUESS_MADE, to: STATES.ENDED} 
    ]
});

export { ACTIONS };
export { STATES };