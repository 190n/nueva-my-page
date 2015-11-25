var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('default', function() {
    gulp.src('lib/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build/'));
    return browserify('build/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/'));
});
