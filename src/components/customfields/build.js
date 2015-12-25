var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shortid = require('shortid');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var fs = require('fs');

function getPathObject(basePath, configuration) {
    var resultObject = {};
    for (var key in configuration) {
        resultObject[key] = basePath + configuration[key];
    }
    return resultObject;
}

var bundle_id = shortid.generate();
var styles_id = shortid.generate();

var MainPath = getPathObject('./src/components/customfields/', {
    BootstrapperFile: 'bootstrapper.js',
    DistDir: 'dist',
    FontsFolder: 'dist/fonts',
    IndexHtmlFile: 'index.html',
    DistIndexHtmlFile: 'dist/index.html',
    LessFile: 'less/styles.less',
    AllFilesMask: 'components/**/*.*'
});

var ModulesPath = getPathObject('./node_modules/', {
    BootstrapMinFile: 'bootstrap/dist/css/bootstrap.min.css',
    BootstrapThemeMinFile: 'bootstrap/dist/css/bootstrap-theme.min.css',
    FontAwesomeCss: 'font-awesome/css/font-awesome.css',
    FontsFolder: 'font-awesome/fonts/**/*.*'
});

module.exports = function (gulp) {
    gulp.task('customfields-clean', function () {
        gulp.src(MainPath.DistDir + '/*build.js', {read: false})
            .pipe(clean());
        return gulp.src(MainPath.DistDir + '/*styles.css', {read: false})
            .pipe(clean());
    });

    gulp.task('customfields-files-copy', function () {
        gulp.src(MainPath.LessFile).pipe(less())
            .pipe(rename({prefix: styles_id}))
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootstrapMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        console.log()

        gulp.src(ModulesPath.BootstrapThemeMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.FontsFolder)
            .pipe(gulp.dest(MainPath.FontsFolder));

        gulp.src(ModulesPath.FontAwesomeCss)
            .pipe(gulp.dest(MainPath.DistDir));

        return gulp.src(MainPath.IndexHtmlFile)
            .pipe(replace('{buildjs}', bundle_id + 'build.js'))
            .pipe(replace('{stylescss}', styles_id + 'styles.css'))
            .pipe(gulp.dest(MainPath.DistDir));

    });

    gulp.task('customfields-build-js', function () {
        return browserify(MainPath.BootstrapperFile)
            .transform('reactify')
            .on('error', console.error.bind(console))
            .bundle()
            .pipe(source('build.js'))
            .pipe(rename({prefix: bundle_id}))
            .pipe(gulp.dest(MainPath.DistDir));
    });

    gulp.task('customfields-reload', function (callback) {
        gulp.src(MainPath.IndexHtmlFile).pipe(connect.reload());
        fs.readFile(MainPath.IndexHtmlFile, function (err, file) {
            callback();
        });
    });

    gulp.task('customfields-connect', function () {
        return connect.server({
            root: MainPath.DistDir,
            port: 9005,
            base: 'http://localhost',
            livereload: true
        });
    });

    gulp.task('customfields-open', ['customfields-connect'], function (callback) {
        gulp.src(MainPath.DistIndexHtmlFile)
            .pipe(open({uri: 'http://localhost:9005/'}));
        fs.readFile(MainPath.IndexHtmlFile, function (err, file) {
            callback();
        });
    });

    gulp.task('customfields-build-open', function (callback) {
        return runSequence(['customfields-clean', 'customfields-build-js', 'customfields-files-copy'],
            'customfields-open', callback);
    });

    gulp.task('customfields-build-reload', function (callback) {
        return runSequence(['customfields-clean', 'customfields-build-js', 'customfields-files-copy']
            , 'customfields-reload', callback);
    });

    gulp.task('customfields', ['customfields-build-open'], function () {
        bundle_id = shortid.generate();
        styles_id = shortid.generate();
        gulp.watch(MainPath.AllFilesMask, ['customfields-build-reload']);
        gulp.watch(MainPath.IndexHtmlFile, ['customfields-build-reload']);
        gulp.watch(MainPath.LessFile, ['customfields-build-reload']);
    });
};