import STATIONS from 'json!build/metro.json';
import Stations from 'models/stations';

const stations = new Stations(STATIONS);

const Store = {
    stations
};

export default Store;

export { stations };