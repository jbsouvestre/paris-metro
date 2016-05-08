import Radio from 'backbone.radio';
import haversine from 'utils/haversine';

import getScore from 'utils/score';

import keyMirror from 'utils/key-mirror';

import { stations, score } from 'store';
import Stations from 'models/stations';

const CHANNEL_NAME = 'game';
const SAMPLE_SIZE = 10;

const Channel = Radio.channel(CHANNEL_NAME);

// REPLY ACTIONS
// -------------
const INIT = 'init';
const SELECTED_MODEL = 'selected_model'

// EVENT TRIGGERS
// --------------
const CLICK_MAP = 'click_map';

var StationsSample;

Channel.reply('default', function(requestName) {
    console.warn(`[Channel][Game] No reply exists for request ${requestName}`);
});

Channel.reply({
    [INIT]: init,
    'start': start,
    [SELECTED_MODEL]: getSelectedModel
});

Channel.on({
    [CLICK_MAP]: onClickMap
});

function init() {
    StationsSample = new Stations(stations.sample(SAMPLE_SIZE));return StationsSample;
}

function start() {
    StationsSample.select(StationsSample.first());
}

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
