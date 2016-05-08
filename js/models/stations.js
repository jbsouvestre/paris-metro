import { extend } from 'underscore';
import { ENDPOINT } from '../constants';
import { Model, Collection } from 'backbone';
import ModelSelectMixin from 'mixins/model-select';

const Station = Model.extend({
    lat() {
        return this.get('lat');
    },
    lng() {
        return this.get('lon');
    },
    tags() {
        return this.get('tags');
    },
    name() {
        return this.tags().name;
    }
});

const Stations =  Collection.extend({
    url: ENDPOINT,
    model: Station,

});

extend(Stations.prototype, ModelSelectMixin);

export default Stations;
export { Station };