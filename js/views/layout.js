import { LayoutView } from 'marionette';

import LayoutTemplate from 'templates/layout.hbs';

import Start from './start';
import Game from './game';
export default LayoutView.extend({
    el: 'body',
    template: LayoutTemplate,
    className: 'mdl-layout__container mdl-js-layout',
    regions: {
        main: 'main',
        header: 'header'
    },
    onRender() {
        this.showChildView('main', new Game());
    }
});