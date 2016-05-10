import { LayoutView } from 'marionette';

import GameTemplate from 'templates/game.hbs';
import GMap from './game/map';
import Stations from './game/stations';
import ConfirmMove from './game/confirm-move';
import MoveDone from './game/move-done';

import ModalRegion from 'utils/regions/modal-region';

import GameChannel, { ACTIONS, CHANNEL_EVENTS } from 'radio/game'; 

export default LayoutView.extend({
    template: GameTemplate,
    initialize() {
        GameChannel.on(CHANNEL_EVENTS.WAIT_FOR_GUESS, this.showConfirmMove, this);    
        GameChannel.on(CHANNEL_EVENTS.MOVE_CONFIRMED, this.onMoveConfirmed, this); 
    },
    regions: {
        map: '#map-container',
        stations: '#stations',
        modal: {
            selector: '#modal',
            regionClass: ModalRegion
        },
        drawer: {
            selector: '#drawer',
            regionClass: ModalRegion
        }
    },
    onRender() {
        this.showChildView( 'map', new GMap() );
        this.showChildView( 'stations', new Stations() );

        GameChannel.request(ACTIONS.START);
    },
    showConfirmMove() {
        this.showChildView( 'modal', new ConfirmMove() );
        this.getRegion('drawer').empty();
    },
    onMoveConfirmed(score) {
        var options = {score: score};
        this.showChildView( 'drawer', new MoveDone(options) );
        this.getRegion('modal').empty();
    }
});