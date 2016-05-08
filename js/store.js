import Stations from 'models/stations';
import Score from 'models/score';

const score = new Score();
const stations = new Stations();

const Store = {
    score,
    stations,
    fetch() {
        return stations.fetch().promise();
    }
};

export default Store;

export { stations, score };