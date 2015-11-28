var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function () {
    browserify('./src/components/customfields/mainControllerView.js')
        .transform('reactify')
        .on('error', console.error.bind(console))
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./src/components/customfields/dest'));

    gulp.src('./src/components/customfields/index.html')
        .pipe(gulp.dest('./src/components/customfields/dest'));

    gulp.src('./src/components/customfields/less/styles.less').pipe(less())
        .pipe(gulp.dest('./src/components/customfields/dest'));
};