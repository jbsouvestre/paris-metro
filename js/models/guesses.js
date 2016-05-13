import { extend } from 'underscore';
import { Collection } from 'backbone';
import { Model } from 'backbone';
import ModelSelectMixin from 'mixins/model-select';

const Guess = Model.extend({
    lat() {
        return this.get('lat');
    },
    lng() {
        return this.get('lng');
    },
});

const Guesses = Collection.extend({
    model: Guess,
});
extend(Guesses.prototype, ModelSelectMixin);

export default Guesses;
export { Guess };