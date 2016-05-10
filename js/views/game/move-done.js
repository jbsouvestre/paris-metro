import { LayoutView, ItemView } from 'marionette';
import GameChannel, { 
    CHANNEL_ACTIONS
} from 'radio/game';

import MoveDoneTemplate from 'templates/game/move-done.hbs';

export default LayoutView.extend({
    template: MoveDoneTemplate,
    ui: {
        progressBar: '.progress',
        continueButton: '.game-continue'
    },
    events: {
        'click @ui.continueButton': 'onClickContinue'
    },
    onClickContinue() {
        GameChannel.request(CHANNEL_ACTIONS.MOVE_DONE);
    },
    templateHelpers() {
        return {
            score: this.getOption('score'),
        };
    }
});