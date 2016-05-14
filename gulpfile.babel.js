import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import uncss from 'gulp-uncss';
import cssnano from 'gulp-cssnano';
import eslint from 'gulp-eslint';
import gutil, { PluginError } from 'gulp-util';

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import makeWebpackConfig from './webpack.config';

const PORT = 8080;

// STYLES
const SASS_OPTIONS = {
    style: 'compressed'
};
const AUTOPREFIXER_OPTIONS = {
    browsers: ['last 2 version']
};
const SCSS_SOURCE = 'scss/**/*.scss';

const UNCSS_OPTIONS = {
    html: ['index.html', 'js/templates/**/*.hbs'],
    ignore: [/\.(.*)-layout/, /\.modal(.*)/, /#modal(.*)/, /#drawer(.*)/]
};

const log = {
    error(...args) {
        console.error(...args);
    }
};

gulp.task('styles', () => {
    return gulp.src(SCSS_SOURCE)
        .pipe(sass(SASS_OPTIONS).on('error', log.error))
        .pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
        .pipe(uncss(UNCSS_OPTIONS))
        .pipe(cssnano())
        .pipe(gulp.dest('css/'));
});

gulp.task('lint', () => {
    return gulp.src(['js/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
    gulp.watch(SCSS_SOURCE, ['styles']);
});

const prodConfig = makeWebpackConfig({dev: false});
const devConfig = makeWebpackConfig({dev: true});

gulp.task('build:prod', (callback) => {
    const prodCompiler = webpack(prodConfig);
    prodCompiler.run(function(err, stats) {
        if(err) {
            throw new PluginError('build:prod', stats.toString({
                colors: true
            }));
        }

        callback();
    });
});

gulp.task('dev-server', (callback) => {
    const compiler = webpack(devConfig);

    new webpackDevServer(compiler, {
        stats: {
            colors: true
        }
    })
        .listen(PORT, 'localhost', function(err){
            if(err) {
                throw new PluginError('webpack-dev-server', err);
            }

            gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        
            callback();
        });
});