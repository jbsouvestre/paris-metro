import marker from './-marker';

const MARKER_ICON = 'position.png';

export default function markerPosition(map, lat, lng) {
    return marker(map, lat, lng, MARKER_ICON);
}