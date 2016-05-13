'use strict';

var _constants = require('./constants');

var ZOOM = 8;

var baseOptions = {
    center: {
        lat: _constants.PARIS_LAT,
        lng: _constants.PARIS_LAT
    },
    zoom: ZOOM
};

function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, baseOptions);
}

//# sourceMappingURL=map.js.map