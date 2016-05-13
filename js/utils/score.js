import haversine from 'utils/haversine';

import { SCORE_RANGE_UP, SCORE_MAX_HAVERSINE } from 'constants';


/**
 * 5000 -> 0
 * 0 -> 1000
 *
 * @TODO: reward more below 100
 */
function getScore(realPoint, clickedPoint) {
    const distance = haversine(realPoint, clickedPoint);

    const SCORE_RATIO = SCORE_MAX_HAVERSINE / SCORE_RANGE_UP; 

    if(distance > SCORE_MAX_HAVERSINE) {
        return 0;
    } else {
        return Math.ceil(SCORE_RANGE_UP - ( distance / SCORE_RATIO ));
    }
}

export default getScore;