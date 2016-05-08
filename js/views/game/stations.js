import { LayoutView } from 'marionette';
import StationList from './stations-list';

import StationTemplate from 'templates/game/stations.hbs';

import GameChannel, {
    INIT
} from 'radio/game';

export default LayoutView.extend({
    template: StationTemplate,
    regions: {
        list: '.region-list'
    },
    onBeforeRender() {
        this.collection = GameChannel.request(INIT);
    },
    onRender() {
        const options = { collection: this.collection };
        this.showChildView('list', new StationList(options));

        GameChannel.request('start');
    }
});