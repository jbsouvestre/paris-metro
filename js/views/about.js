import { ItemView } from 'marionette';
import AboutTemplate from 'templates/about.hbs';

export default ItemView.extend({
    template: AboutTemplate,
    className: 'modal fade'
});