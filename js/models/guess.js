import { Model } from 'backbone';

export default Model.extend({
    lat() {
        return this.get('lat');
    },
    lng() {
        return this.get('lng');
    },
    destroy() {
        this.get('marker').setMap(null);
        Model.prototype.destroy.call(this);
    }
});