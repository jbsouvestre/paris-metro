import { ItemView } from 'marionette';
import { bindAll } from 'underscore';
import {
    PARIS_LONG,
    PARIS_LAT,
    DEFAULT_ZOOM
} from '../../constants';

import MapTemplate from '../../templates/game/map.hbs';

import { ChannelEvents } from '../../controllers/game';

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
        bindAll(this, 'onClickMap', 'onMoveConfirmed');

        this.controller = this.getOption('controller');

    },
    onRender() {
        this.map = new google.maps.Map(this.ui.map.get(0), OPTIONS);

        this.listenTo(this.controller.stations, 'select', () => {
            this.bindModelEvents();
            this.bindMapEvents();
        });
        this.listenTo(this.controller.channel, ChannelEvents.CONFIRMED, this.onMoveConfirmed);

        this.bindMapEvents();
        this.bindModelEvents();
    },
    bindMapEvents() {
        this.map.addListener('click', this.onClickMap);
    },
    clearMapEvents() {
        google.maps.event.clearListeners(this.map, 'click');
    },
    bindModelEvents() {
        this.model = this.controller.stations.getSelected();

        this.listenTo(this.model, 'change:marker', this.onModelMarkerChange);
        this.listenTo(this.model, 'change:guess', this.onChangeGuess);
        this.listenTo(this.model, 'deselect', this.onDeselect);
    },
    onClickMap({ latLng: { lat, lng } }) {
        if(!this.model){
            return;
        }

        this.model.setGuess({
            lat: lat(),
            lng: lng()
        });
    },
    onChangeGuess() {
        this.model.setMarker();
    },

    onModelMarkerChange(model, marker) {
        marker.setMap(this.map);
    },
    
    onMoveConfirmed() {

        this.clearMapEvents();

        this.model.getResults();

        const line = this.model.get('line');
        const positionMarker = this.model.get('position_marker');

        line.setMap(this.map);
        positionMarker.setMap(this.map);
        /*
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(positionMarker);
        bounds.extend(this.model.get('marker'));

        this.map.setCenter(bounds.getCenter(), this.map.fitBounds(bounds));*/
    },
    onDeselect() {
        this.stopListening(this.model);
    }
});