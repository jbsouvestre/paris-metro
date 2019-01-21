import { captureMessage } from '@sentry/browser';

function sendEvent(category, action, label, value) {
    const ga = window.ga;

    if(DEBUG) {
        return;
    }

    if(!ga) {
        captureMessage('Google analytics not available');
        return;
    }

    ga('send', 'event', category, action, label, value);
}

const GAME = 'game';
const GUESS = 'guess';
const SCORE = 'score';

export function trackGuess(guessValue) {
    sendEvent(GAME, GUESS, GUESS, guessValue);
}

export function trackScore(scoreValue) {
    sendEvent(GAME, SCORE, SCORE, scoreValue);
}
