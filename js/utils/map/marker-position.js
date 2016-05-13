import marker from './-marker';

const MARKER_ICON = 'position.png';

export default function markerPosition(lat, lng) {
    return marker(lat, lng, MARKER_ICON);
}