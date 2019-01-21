const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const uncss = require('gulp-uncss');
const cssnano = require('gulp-cssnano');
const eslint = require('gulp-eslint');
const PluginError = gutil.PluginError;

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const rimraf = require('rimraf');

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
    ignore: [/\.(.*)-layout/, /\.modal(.*)/, /#modal(.*)/, /#drawer(.*)/, /^\.navbar/, /^\.collapse/, /^#app/]
};

const log = {
    error(...args) {
        console.error(...args);
    }
};

gulp.task('clean', (cb) => {
    rimraf('dist/*.js', cb);
});

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

gulp.task('build:prod', ['clean'], (callback) => {
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