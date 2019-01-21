import { LayoutView } from 'marionette';

import LayoutTemplate from '../templates/layout.hbs';

import BootstrapModalRegion from '../utils/regions/bootstrap-modal-region';

import Start from './start';
import Game from './game';

import AboutPage from './about';

export default LayoutView.extend({
    el: 'body',
    template: LayoutTemplate,
    regions: {
        main: 'main',
        header: 'header',
        modals: {
            selector: '#bs-modals',
            regionClass: BootstrapModalRegion
        }
    },
    events: {
        'click .about': 'onClickAbout'
    },
    onRender() {
        this.showChildView('main', new Game());
    },
    onClickAbout() {
        this.showChildView('modals', new AboutPage());
    }
});