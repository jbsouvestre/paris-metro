import { Region } from 'marionette';
import { bindAll } from 'underscore';

export default Region.extend({
    initialize() {
        this.on('show', this.showModal, this);
    },
    showModal(view) {
        view.on('close', this.hideModal, this);
        view.$el.modal('show');
    },
    hideModal() {
        this.currentView.$el.modal('hide');
    }
});