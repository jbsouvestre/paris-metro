import Marionette from 'marionette';
import Radio from 'backbone.radio';
import { bindAll } from 'underscore';
import App from 'app';

import { SAMPLE_SIZE } from 'constants';

import keyMirror from 'utils/key-mirror';
import getScore from 'utils/score';
import haversine from 'utils/haversine';

import Score from 'models/score';
import Guesses from 'models/guesses';
import Stations from 'models/stations';

import GameEnded from 'views/game/game-ended';

import { stations } from 'store';


const ChannelName = 'game';

const ChannelActions = keyMirror({
    CONFIRM: null,
    CONTINUE: null
});

const ChannelEvents = keyMirror({
    CONFIRMED: null,
    END: null
});
export default Marionette.Object.extend({
    initialize() {
        bindAll(this, 'onConfirm', 'onContinue');

        this.score = new Score();
        this.guesses = new Guesses();
        this.stations = new Stations(stations.sample(SAMPLE_SIZE));

        this.channel = Radio.channel(ChannelName);

        this.channel.reply({
            [ChannelActions.CONFIRM]: this.onConfirm,
            [ChannelActions.CONTINUE]: this.onContinue
        });
    },
    start() {
        this.stations.select(this.stations.first());
    },

    onConfirm() {
        const selectedModel = this.stations.getSelected();
        const guess = selectedModel.get('guess');
        const scoreResult = getScore(selectedModel, guess);

        this.score.add(scoreResult);

        this.channel.trigger(ChannelEvents.CONFIRMED, {
            score: scoreResult,
            distance: haversine(selectedModel, guess)
        });
    },

    onContinue() {
        const nextModel = this.stations.selectNext();

        if(nextModel) {
            console.log('continuing ...');
        } else {
            App.layout.modals.show(new GameEnded({
                model: this.score
            }));


            this.trigger(ChannelEvents.END);
        }
    }
});

export { ChannelEvents, ChannelActions };