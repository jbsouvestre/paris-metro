import { ItemView } from 'marionette';

import { ChannelActions } from 'controllers/game';
import ConfirmMoveTemplate from 'templates/game/confirm-move.hbs';

export default ItemView.extend({
    template: ConfirmMoveTemplate,
    initialize() {
        this.controller = this.getOption('controller');
        this.model = this.controller.stations.getSelected();

        this.listenTo(this.model, 'change:guess', this.onChangeGuess);
    },
    ui: {
        progressBar: '.progress-bar',
        confirmMove: '.game-confirm-move'
    },
    events: {
        'click @ui.confirmMove': 'onClickConfirmMove'
    },
    templateHelpers() {
        return {
            'station_name': this.model.name()
        };
    },
    onChangeGuess(model) {
        this.toggleConfirm(!model.get('guess'));
    },
    toggleConfirm(toggle) {
        this.ui.confirmMove.attr('disabled', toggle);
    },
    onClickConfirmMove() {
        this.controller.channel.request(ChannelActions.CONFIRM);
    }
});