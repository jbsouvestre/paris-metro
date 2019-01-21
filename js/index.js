import App , {bootstrap} from './app';

bootstrap().then(() => {
    App.start();
    console.log('app running');
});