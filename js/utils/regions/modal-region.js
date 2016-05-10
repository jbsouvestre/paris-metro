import { Region } from 'marionette';

const CLASS_IN = 'in';

export default Region.extend({
    onShow() {
        this.$el.addClass(CLASS_IN);
    },
    onEmpty() {
        this.$el.removeClass(CLASS_IN);
    }
});