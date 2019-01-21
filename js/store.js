import Stations from './models/stations';

const stations = new Stations();

const Store = {
    stations,
    fetch() {
        return stations.fetch().promise();
    }
};

export default Store;

export { stations };