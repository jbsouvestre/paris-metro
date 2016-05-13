import { ItemView } from 'marionette';

import { SCORE_RANGE_UP, SAMPLE_SIZE } from 'constants';

import GameEndedTemplate from 'templates/game/game-ended.hbs';

export default ItemView.extend({
    template: GameEndedTemplate,
    className: 'modal fade',
    ui: {
        btn: '.btn'
    },
    events: {
        'click @ui.btn': 'reload'
    },
    reload() {
        window.location.reload();
    },
    templateHelpers() {
        return {
            total: SAMPLE_SIZE * SCORE_RANGE_UP
        };
    }
});