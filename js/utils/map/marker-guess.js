import marker from './-marker';

const MARKER_ICON = 'guess.png';

export default function markerGuess(map, lat, lng) {
    return marker(map, lat, lng, MARKER_ICON);
}