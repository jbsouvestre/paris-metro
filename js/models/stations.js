import { extend } from 'underscore';
import { ENDPOINT } from '../constants';
import { Model, Collection } from 'backbone';
import ModelSelectMixin from '../mixins/model-select';


import { Guess } from '../models/guesses';


import latLngToPoint from '../utils/map/lat-lng-to-point';
import markerGuess from '../utils/map/marker-guess';
import markerPosition from '../utils/map/marker-position';
import makeLine from '../utils/map/line';

// true: destroy the markers
// false: fade the markers
const DESTROY_MARKERS = false;

const Station = Model.extend({
    initialize() {
        this.listenTo(this, 'deselect', this.onModelDeselected);
    },
    lat() {
        return this.get('lat');
    },
    lng() {
        return this.get('lon');
    },
    tags() {
        return this.get('tags');
    },
    name() {
        return this.tags().name;
    },
    setGuess(guess) {
        if(this.get('guess')) {
            this.unset('guess', { silent: true });
        }

        this.set('guess', new Guess(guess));
    },
    setMarker() {
        if(this.get('marker')) {
            let marker = this.get('marker');
            marker.setMap(null);
        }

        var guess = this.get('guess');

        this.set('marker', markerGuess(guess.lat(), guess.lng()));
    },
    getResults() {
        const guess = this.get('guess');

        const actualPoint = latLngToPoint(this.lat(), this.lng());
        const guessPoint = latLngToPoint(guess.lat(), guess.lng());

        const positionMarker = markerPosition(this.lat(), this.lng());

        const line = makeLine(actualPoint, guessPoint);

        this.set('position_marker', positionMarker);
        this.set('line', line);

        return {
            actualPoint, guessPoint
        };
    },

    onModelDeselected() {
        if(DESTROY_MARKERS) {
            ['marker', 'position_marker', 'line'].forEach( key => {
                if(this.get(key)) {
                    this.get(key).setMap(null);
                }
            });
        } else {
            ['marker', 'position_marker'].forEach(key => {
                if(this.get(key)) {
                    this.get(key).setOpacity(0.3);
                }
            });

            if(this.get('line')) {
                this.get('line').setOptions({
                    strokeColor: '#ccc'
                });
            }
        }
    }
});

const Stations =  Collection.extend({
    url: ENDPOINT,
    model: Station,
});

extend(Stations.prototype, ModelSelectMixin);

export default Stations;
export { Station };