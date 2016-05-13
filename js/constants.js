// RATP Metro and RER stations API endpoint
const ENDPOINT = 'build/metro.json';
export { ENDPOINT };
// COORDINATES
const PARIS_LAT = 48.8566;
export { PARIS_LAT };

const PARIS_LONG = 2.3522;
export { PARIS_LONG };


const DEFAULT_ZOOM = 12;
export { DEFAULT_ZOOM };

const SCORE_RANGE_UP = 1000;
export { SCORE_RANGE_UP };

const SCORE_MAX_HAVERSINE = 5000;
export { SCORE_MAX_HAVERSINE };

const SAMPLE_SIZE = 2;
export { SAMPLE_SIZE }

const CONSTANTS = {
    ENDPOINT,
    PARIS_LONG,
    PARIS_LAT,
    DEFAULT_ZOOM,
    SCORE_RANGE_UP,
    SCORE_MAX_HAVERSINE
};

export default CONSTANTS;
