import { LayoutView } from 'marionette';
import StationList from './stations-list';

import StationTemplate from 'templates/game/stations.hbs';

export default LayoutView.extend({
    template: StationTemplate,
    regions: {
        list: '.region-list'
    },
    onBeforeRender() {
    },
    onRender() {
        const options = { collection: this.collection };
        this.showChildView('list', new StationList(options));
    }
});