const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const PORT = 8080;

const SASS_OPTIONS = {
    style: 'compressed'
};

const AUTOPREFIXER_OPTIONS = {
    browsers: ['last 2 version']
};

const SCSS_SOURCE = 'scss/**/*.scss';

const log = {
    error(...args) {
        console.error(...args);
    }
};


gulp.task('styles', () => {
    return gulp.src(SCSS_SOURCE)
        .pipe(sass(SASS_OPTIONS).on('error', log.error))
        .pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
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


gulp.task('dev-server', () => {
    const compiler = webpack(webpackConfig);

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
        });
});