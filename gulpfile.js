var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var minify = require('gulp-minify');
var buffer = require('vinyl-buffer');
var customfieldsBuildTask = require('./src/components/customfields/build');

gulp.task('browserify', function () {
    browserify('./src/registry.js')
        .transform('reactify')
        .on('error', console.error.bind(console))
        .bundle()
        .pipe(source('neon-react-components.js'))
        .pipe(buffer())
        .pipe(minify())
        .pipe(gulp.dest('dest'));
});

gulp.task('default', ['browserify']);

gulp.task('customfields', customfieldsBuildTask);