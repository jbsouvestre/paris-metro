import 'jquery';
import 'backbone';
import 'backbone.babysitter';
import 'bootstrap-sass';
import Radio from 'backbone.radio';
import { Application } from 'marionette';
import './utils/shims/radio';
import Layout from './views/layout';
import Store from './store';

if(DEBUG) {
    console.warn('Running dev mode');
    Radio.DEBUG = true;
}

if(PRODUCTION) {
    console.info('Running production mode');
    //OfflinePlugin.install();
}

const App = new Application();

App.addInitializer(() => {
    App.layout = new Layout();
    App.layout.render();
});

export default App;

