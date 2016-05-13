import marker from './-marker';

const MARKER_ICON = 'guess.png';

export default function markerGuess(lat, lng) {
    return marker(lat, lng, null);
}