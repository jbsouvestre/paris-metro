import 'jquery';
import 'backbone';
import 'backbone.babysitter';
import 'bootstrap-sass';
import Radio from 'backbone.radio';
import { Application } from 'marionette';
import './utils/shims/radio';
import Layout from './views/layout';
import Store from './store';

const App = new Application();

App.addInitializer(() => {
    App.layout = new Layout();
    App.layout.render();
});

export default App;

