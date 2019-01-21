import 'jquery';
import 'backbone';
import 'backbone.babysitter';
import 'bootstrap-sass';
import Radio from 'backbone.radio';
import { Application } from 'marionette';
import './utils/shims/radio';
import Layout from './views/layout';
import Store from './store';
import { init, captureMessage } from '@sentry/browser';

const App = new Application();

console.log(DEBUG);

App.addInitializer(() => {
    if(!DEBUG) {
        init({
            dsn: SENTRY
        });
    }
    App.layout = new Layout();
    App.layout.render();
});

export default App;

