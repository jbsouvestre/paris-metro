import { LayoutView } from 'marionette';

import GameTemplate from 'templates/game.hbs';
import GMap from './game/map';
import Stations from './game/stations';
import ConfirmMove from './game/confirm-move';

export default LayoutView.extend({
    template: GameTemplate,
    regions: {
        map: '#map-container',
        stations: '#stations',
        modal: '#modal'
    },
    onRender() {
        this.showChildView( 'map', new GMap() );
        this.showChildView( 'stations', new Stations() );
        this.showChildView( 'modal', new ConfirmMove() );
    }
});