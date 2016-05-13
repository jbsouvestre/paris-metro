import { LayoutView } from 'marionette';

import LayoutTemplate from 'templates/layout.hbs';

import BootstrapModalRegion from 'utils/regions/bootstrap-modal-region';

import Start from './start';
import Game from './game';

export default LayoutView.extend({
    el: 'body',
    template: LayoutTemplate,
    className: 'mdl-layout__container mdl-js-layout',
    regions: {
        main: 'main',
        header: 'header',
        modals: {
            selector: '#bs-modals',
            regionClass: BootstrapModalRegion
        }
    },
    onRender() {
        this.showChildView('main', new Game());
    }
});