import { ItemView } from 'marionette';
import { bindAll } from 'underscore';
import {
    PARIS_LONG,
    PARIS_LAT,
    DEFAULT_ZOOM
} from '../../constants';
import latLngToPoint from 'utils/map/lat-lng-to-point';


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


const CENTER = {
    lat: PARIS_LAT,
    lng: PARIS_LONG
};

const OPTIONS = {
    center: CENTER,
    zoom: DEFAULT_ZOOM,
    styles: STYLES,
    streetViewControl: false,
    mapTypeControlOptions: { mapTypeIds: [] }
};

export default ItemView.extend({
    template: MapTemplate,
    className: 'map-layout',
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

        const { actualPoint, guessPoint} = this.model.getResults();

        const line = this.model.get('line');
        const positionMarker = this.model.get('position_marker');

        line.setMap(this.map);
        positionMarker.setMap(this.map);

        this.setBounds(actualPoint, guessPoint);

    },
    setBounds(p1, p2) {

        var bounds = new google.maps.LatLngBounds();

        const [highest, lowest] = p1.lat() > p2.lat() ? [p1, p2] : [p2, p1];
        const RATIO = 1;

        bounds.extend(highest);

        var lowestPoint = latLngToPoint(
            lowest.lat() - ((highest.lat() - lowest.lat()) * RATIO),
            lowest.lng()
        );

        bounds.extend(lowestPoint);

        const DEBUG_BOUNDS = false;

        if(DEBUG && DEBUG_BOUNDS) {
            var debugBounds = new google.maps.LatLngBounds();
            debugBounds.extend(p1);
            debugBounds.extend(p2);
            console.log(RATIO);

            new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                bounds: debugBounds
            });

            new google.maps.Rectangle({
                strokeColor: '#00ff00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00ff00',
                fillOpacity: 0.35,
                map: this.map,
                bounds: bounds
            });
        }

        this.map.fitBounds(bounds);
    },
    onDeselect() {
        this.stopListening(this.model);

        this.map.setCenter(CENTER);
        this.map.setZoom(DEFAULT_ZOOM);
    }
});