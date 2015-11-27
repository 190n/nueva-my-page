var gulp = require('gulp'),
    babel = require('gulp-babel')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('babel', function() {
    return gulp.src('lib/*.js')
        .pipe(babel)
        .pipe(gulp.dest('build/'));
});

gulp.task('browserify', ['babel'], function() {
    return browserify('build/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['browserify']);
