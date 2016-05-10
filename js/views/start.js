import { ItemView } from 'marionette';
import StartTemplate from 'templates/start.hbs';

export default ItemView.extend({
    template: StartTemplate,
    ui: {
        startBtn: '.ui-start'
    },
    events: {
        'click @ui.startBtn': 'onClickStart'
    },
    onClickStart() {
        console.log('start');
    }
});