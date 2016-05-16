import STATIONS from 'json!build/metro.json';
import $ from 'jquery';
import Stations from 'models/stations';

console.log(STATIONS);

const stations = new Stations(STATIONS);

const Store = {
    stations
};

export default Store;

export { stations };