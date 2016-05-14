import 'jquery';
import 'backbone';
import 'backbone.babysitter';
import 'bootstrap-sass';
import Radio from 'backbone.radio';
import { Application } from 'marionette';
import './utils/shims/radio';
import Layout from './views/layout';
import Store from 'store';

Radio.DEBUG = true;

const App = new Application();

App.addInitializer(() => {
    App.layout = new Layout();
    App.layout.render();
});

function bootstrap() {
    return Store.fetch();
}

export default App;

export { bootstrap };