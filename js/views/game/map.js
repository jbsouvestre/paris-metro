import { ItemView } from 'marionette';
import {
    PARIS_LONG,
    PARIS_LAT,
    DEFAULT_ZOOM
} from '../../constants';

import MapTemplate from 'templates/game/map.hbs';
import GameChannel, { CHANNEL_EVENTS, CHANNEL_ACTIONS } from 'radio/game';
import MarkerGuess from 'utils/map/marker-guess';
import MarkerPosition from 'utils/map/marker-position';
import Line from 'utils/map/line';
import LatLngToPoint from 'utils/map/lat-lng-to-point';
const STYLES = [
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [
            {visibility: 'off'}
        ]
    }
];

const OPTIONS = {
    center: {
        lat: PARIS_LAT, 
        lng: PARIS_LONG
    },
    zoom: DEFAULT_ZOOM,
    styles: STYLES,
    streetViewControl: false
};

export default ItemView.extend({
    template: MapTemplate,
    ui: {
        map: '#map'
    },
    initialize() {
        this.storedElements = []
        this.listenTo(GameChannel, CHANNEL_EVENTS.WAIT_FOR_GUESS, this.onWaitForGuessEnter, this);
        this.listenTo(GameChannel, CHANNEL_EVENTS.SHOW_MARKER, this.showMarkerGuess, this);
        this.listenTo(GameChannel, CHANNEL_EVENTS.MOVE_CONFIRMED, this.showResult, this);
    },
    onRender() {
        this.map = new google.maps.Map(this.ui.map.get(0), OPTIONS);
        this.bindMapEvents();
    },
    bindMapEvents() {
        const map = this.map;
        map.addListener('click', (e) => {
            GameChannel.request(CHANNEL_ACTIONS.MAKE_GUESS, e.latLng);
        });
    },
    onWaitForGuessEnter() {
        this.storedElements.forEach(el => el.setMap(null));
    },
    showMarkerGuess(guess) {
        var marker = MarkerGuess(this.map, guess.lat(), guess.lng());
        guess.set('marker', marker);

        this.storedElements.push(marker);
    },
    showResult() {
        var actual = GameChannel.request(CHANNEL_ACTIONS.SELECTED_MODEL);
        var guess = GameChannel.request(CHANNEL_ACTIONS.CURRENT_GUESS);

        var marker = MarkerPosition(this.map, actual.lat(), actual.lng()); 
        
        var line = Line(this.map, 
            LatLngToPoint(actual.lat(), actual.lng()), 
            LatLngToPoint(guess.lat(), guess.lng())
        );

        this.storedElements.push(marker);
        this.storedElements.push(line);
    }
});