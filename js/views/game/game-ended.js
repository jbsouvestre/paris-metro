import { ItemView } from 'marionette';

import { SCORE_RANGE_UP, SAMPLE_SIZE } from 'constants';

import GameEndedTemplate from 'templates/game/game-ended.hbs';

export default ItemView.extend({
    template: GameEndedTemplate,
    className: 'modal fade',
    ui: {
        btn: '.btn',
        progressBar: '.progress-bar'
    },
    events: {
        'click @ui.btn': 'reload'
    },
    onRender() {
        const score = this.model.get('score');
        var width = ( (score / SCORE_RANGE_UP) * 100 ).toFixed(2);

        setTimeout(() => {
            this.ui.progressBar.css({
                width: `${width}%`
            });
        }, 500);
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