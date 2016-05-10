import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import eslint from 'gulp-eslint';

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