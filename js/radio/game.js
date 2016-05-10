import Radio from 'backbone.radio';
import _ from 'underscore';

import haversine from 'utils/haversine';
import getScore from 'utils/score';
import keyMirror from 'utils/key-mirror';

import { stations, score } from 'store';
import Stations from 'models/stations';
import Guess from 'models/guess';

import GameStateMachine, {ACTIONS, STATES} from 'controllers/game';

var StationsSample, CurrentGuess;

function on([event], handler){
    return `on${event}${handler}`;
}

function logGSM(event) {
    return function(...args) {
        //console.log(`[GameStateMachine][:${event}]`, ...args);
    };
}

const CHANNEL_NAME = 'game';
const SAMPLE_SIZE = 10;

const CHANNEL_ACTIONS = keyMirror({
    MAKE_GUESS: null,
    SELECTED_MODEL: null,
    CONFIRM_MOVE: null,
    CURRENT_GUESS: null
});

export { CHANNEL_ACTIONS };

const CHANNEL_EVENTS = keyMirror({
    SHOW_MARKER: null,
    WAIT_FOR_GUESS: null,
    MOVE_CONFIRMED: null,
    GUESS_MADE: null
});

export { CHANNEL_EVENTS };

const Channel = Radio.channel(CHANNEL_NAME);

Channel.reply({
    [ACTIONS.START]: RequestStart,
    [ACTIONS.GUESS]: RequestGuess,
    [ACTIONS.FINISH]: RequestFinish,

    [CHANNEL_ACTIONS.MAKE_GUESS]: MakeGuess,
    [CHANNEL_ACTIONS.SELECTED_MODEL]: GetSelectedModel,
    [CHANNEL_ACTIONS.CONFIRM_MOVE]: ConfirmMove,
    [CHANNEL_ACTIONS.CURRENT_GUESS]: GetCurrentGuess,
    [CHANNEL_ACTIONS.MOVE_DONE]: MoveDone
});

export { ACTIONS };

// trigger event on all transitions

function RequestStart() {
    GameStateMachine.start();
}

function RequestGuess(guess) {
    GameStateMachine.guess(guess);
}

function RequestFinish() {
    GameStateMachine.finish();
}

_.extend(GameStateMachine, {
    onbeforeevent: logGSM('onbeforeevent'),
    onleavestate: logGSM('onleavestate'),
    onenterstate: logGSM('onenterstate'),
    onafterevent: logGSM('onafterevent'),
    [on`enter${STATES.STARTED}`]: Start,
    [on`enter${STATES.WAITING_FOR_GUESS}`]: WaitForGuess
});

Channel.reply('default', function(requestName) {
    console.warn(`[Channel][Game] No reply exists for request ${requestName}`);
});



function Start() {
    StationsSample = new Stations(stations.sample(SAMPLE_SIZE));
    StationsSample.select(StationsSample.first());

    GameStateMachine.waitForGuess();

    return StationsSample;
}

function WaitForGuess() {
    Channel.trigger(CHANNEL_EVENTS.WAIT_FOR_GUESS);
}

function MakeGuess(guess) {
    console.log(GameStateMachine.current);
    if(GameStateMachine.current !== STATES.WAITING_FOR_GUESS && GameStateMachine.current !== STATES.GUESS_MADE){
        console.warn('Game is not waiting for guess');
        return;
    }

    if(CurrentGuess) {
        CurrentGuess.destroy();
    }

    CurrentGuess = new Guess({
        lat: guess.lat(),
        lng: guess.lng()
    });

    Channel.trigger(CHANNEL_EVENTS.SHOW_MARKER, CurrentGuess);
    Channel.trigger(CHANNEL_EVENTS.GUESS_MADE);

    GameStateMachine.guess();
}

function GetSelectedModel() {
    return StationsSample.getSelected();
}

function ConfirmMove() {

    var selected = StationsSample.getSelected();
    var guess = CurrentGuess;

    var result = getScore(guess, selected);
    score.add(result);

    Channel.trigger(CHANNEL_EVENTS.MOVE_CONFIRMED, result);
}

function GetCurrentGuess() {
    return CurrentGuess;
}

function MoveDone() {
    var next = StationsSample.selectNext();

    if(next) {
        GameStateMachine.waitForGuess();
    } else {
        GameStateMachine.finish();
    }
}

export default Channel;
/*


Channel.reply({
    [INIT]: init,
    'start': start,
    [SELECTED_MODEL]: getSelectedModel
});

Channel.on({
    [CLICK_MAP]: onClickMap
});

function onClickMap(latLng) {
    console.log('Clicked', latLng.lat(), latLng.lng());

    var selected = StationsSample.getSelected();

    if(!selected){
        console.warn('nothing selected');
        return;
    }

    var diff = haversine(latLng, selected);
    var result = getScore(selected, latLng);

    score.add(result);

    Channel.trigger('show:result', latLng, selected);

    StationsSample.selectNext();
}

function getSelectedModel() {
    return StationsSample.getSelected();
}

export default Channel;

export { 
    INIT,

    CLICK_MAP,

    SELECTED_MODEL
};
*/
