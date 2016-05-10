import { ItemView } from 'marionette';
import ConfirmMoveTemplate from 'templates/game/confirm-move.hbs';

import GameChannel, { CHANNEL_ACTIONS, CHANNEL_EVENTS } from 'radio/game'; 

export default ItemView.extend({
    template: ConfirmMoveTemplate,
    initialize() {
        this.listenTo(GameChannel, CHANNEL_EVENTS.GUESS_MADE, this.enableConfirm, this);
    },
    ui: {
        'confirmMove': '.game-confirm-move'
    },
    events: {
        'click @ui.confirmMove': 'onClickConfirmMove'
    },
    templateHelpers() {
        var selectedModel = GameChannel.request(CHANNEL_ACTIONS.SELECTED_MODEL);
        return {
            'station_name': selectedModel.name()
        };
    },
    enableConfirm() {
        console.log('move confirmed');
        this.ui.confirmMove.attr('disabled', false);
    },
    onClickConfirmMove() {
        GameChannel.request(CHANNEL_ACTIONS.CONFIRM_MOVE);
    }
});