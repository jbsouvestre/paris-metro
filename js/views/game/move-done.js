import { LayoutView } from 'marionette';
import { SCORE_RANGE_UP } from 'constants';
import MoveDoneTemplate from 'templates/game/move-done.hbs';
import { ChannelActions } from 'controllers/game';

export default LayoutView.extend({
    template: MoveDoneTemplate,
    initialize() {
        this.controller = this.getOption('controller');
    },
    ui: {
        progressBar: '.progress-bar',
        continueButton: '.game-continue'
    },
    events: {
        'click @ui.continueButton': 'onClickContinue'
    },
    onRender() {
        var score = this.getOption('score');
        var width = ( (score / SCORE_RANGE_UP) * 100 ).toFixed(2);

        setTimeout(() => {
            this.ui.progressBar.css({
                width: `${width}%`
            });
        }, 500);
    },
    onClickContinue() {
        this.controller.channel.request(ChannelActions.CONTINUE);
    },
    templateHelpers() {
        const textNext = this.controller.stations.hasNext() ? 'Continue' : 'See Results';
        return {
            score: Math.ceil(this.getOption('score')),
            distance: this.getOption('distance'),
            textNext: textNext
        };
    }
});