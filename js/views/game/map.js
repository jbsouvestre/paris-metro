import { ItemView } from 'marionette';
import {
    PARIS_LONG,
    PARIS_LAT,
    DEFAULT_ZOOM
} from '../../constants';

import MapTemplate from 'templates/game/map.hbs';
import GameChannel, { CLICK_MAP } from 'radio/game';

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

function pointToLatLng(point) {
    return new google.maps.LatLng(point.lat(), point.lng());
}

export default ItemView.extend({
    template: MapTemplate,
    ui: {
        map: '#map'
    },
    initialize() {
        GameChannel.on('show:result', (p1, p2) => {
            this.showLine(p1, p2);
        })
    },
    onRender() {
        this.map = new google.maps.Map(this.ui.map.get(0), OPTIONS);
        this.bindMapEvents();
    },
    bindMapEvents() {
        const map = this.map;
        map.addListener('click', (e) => {
            GameChannel.trigger(CLICK_MAP, e.latLng);
        });
    },
    showMarker(point) {
        new google.maps.Marker({
            map: this.map,
            position: pointToLatLng(point)
        });
    },

    showLine(p1, p2) {

        this.showMarker(p1);
        this.showMarker(p2);

        new google.maps.Polyline({
            path: [pointToLatLng(p1), pointToLatLng(p2)],
            map: this.map
        });
    }
});