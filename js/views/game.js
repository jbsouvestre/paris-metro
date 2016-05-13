import { LayoutView } from 'marionette';
import { extend, bindAll } from 'underscore';

import GameTemplate from 'templates/game.hbs';
import GMap from './game/map';
import Stations from './game/stations';
import ConfirmMove from './game/confirm-move';
import MoveDone from './game/move-done';

import ModalRegion from 'utils/regions/modal-region';

import GameController, { ChannelEvents } from 'controllers/game';


export default LayoutView.extend({
    template: GameTemplate,
    className: 'game-layout',
    initialize() {
        bindAll(this, 'onMoveConfirmed', 'onGameEnd');

        this.controller = new GameController();
        this.collection = this.controller.stations;
        
        this.listenTo(this.collection, 'select', this.showConfirmMove, this);


        this.controller.channel.on(ChannelEvents.CONFIRMED, this.onMoveConfirmed);

        this.controller.channel.on(ChannelEvents.END, this.onGameEnd);
    },
    regions: {
        map: '#map-container',
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
        var options = {
            controller: this.controller
        };
        this.controller.start();
        this.showChildView( 'map', new GMap(options) );
    },
    showConfirmMove() {
        var options = {
            controller: this.controller
        };

        this.showChildView( 'modal', new ConfirmMove(options));
        this.getRegion('drawer').empty();
    },
    onMoveConfirmed(options) {
        var opts = extend({controller: this.controller}, options);

        this.showChildView( 'drawer', new MoveDone(opts) );
        this.getRegion('modal').empty();
    },

    onGameEnd() {
        this.getRegion('modal').empty();
        this.getRegion('drawer').empty();
    }
});