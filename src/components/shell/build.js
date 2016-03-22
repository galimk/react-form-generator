/**
 * Created by amirkaudinov on 12/24/15.
 */
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shortId = require('shortid');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var fs = require('fs');

function _returnPathObject(basePath, configPaths) {
    var pathsObject = {};
    for (var key in configPaths) {
        pathsObject[key] = basePath + configPaths[key];
    }
    return pathsObject;
}

var bundle_id = shortId.generate();
var styles_id = shortId.generate();

var MainPath = _returnPathObject('./src/components/shell/', {
    MainJsFile: 'main.js',
    DistDir: 'dist',
    FontsFolder: 'dist/fonts',
    IndexHtmlFile: 'index.html',
    DistIndexHtml: 'dist/index.html',
    LessFile: 'less/styles.less',
    AllFiles: 'components/**/*.*'
});

var ModulesPath = _returnPathObject('./node_modules/', {
    BootStrapMinFile: 'bootstrap/dist/css/bootstrap.min.css',
    BootStrapThemeMinFile: 'bootstrap/dist/css/bootstrap-theme.min.css',
    FontAwesomeCss: 'font-awesome/css/font-awesome.css',
    FontsFolder: 'font-awesome/fonts/**/*.*'
});

var BootStrapThemes = _returnPathObject('./src/themes/', {
    cosmo: 'cosmo/bootstrap.min.css',
    flatly: 'flatly/bootstrap.min.css',
    lumen: 'lumen/bootstrap.min.css',
    yeti: 'Yeti/bootstrap.min.css'
});

module.exports = function (gulp) {
    gulp.task('shell-clean', function () {
        gulp.src(MainPath.DistDir + '/*build.js', {read: false})
            .pipe(clean());
        return gulp.src(MainPath.DistDir + '/*styles.css', {read: false})
            .pipe(clean());
    });

    gulp.task('shell-files-copy', function () {

        gulp.src(MainPath.LessFile).pipe(less())
            .pipe(rename({prefix: styles_id}))
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(BootStrapThemes.yeti)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootStrapThemeMinFile)
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

    gulp.task('shell-build-js', function () {
        return browserify(MainPath.MainJsFile)
            .transform('reactify')
            .on('error', console.error.bind(console))
            .bundle()
            .pipe(source('build.js'))
            .pipe(rename({prefix: bundle_id}))
            .pipe(gulp.dest(MainPath.DistDir));
    });

    gulp.task('shell-reload', function (callback) {
        gulp.src(MainPath.IndexHtmlFile).pipe(connect.reload());
        fs.readFile(MainPath.IndexHtmlFile, function (err, file) {
            callback();
        });
    });

    gulp.task('shell-connect', function () {
        return connect.server({
            root: MainPath.DistDir,
            port: 9005,
            base: 'http://localhost',
            livereload: true
        });
    });

    gulp.task('shell-open', ['shell-connect'], function (callback) {
        gulp.src(MainPath.DistIndexHtml)
            .pipe(open({uri: 'http://localhost:9005/'}));

        fs.readFile(MainPath.IndexHtmlFile, function (err, file) {
            callback();
        });
    });

    gulp.task('shell-build-open', function (callback) {
        return runSequence(['shell-clean', 'shell-build-js', 'shell-files-copy']
            , 'shell-open', callback);
    });

    gulp.task('shell-build-reload', function (callback) {
        return runSequence(['shell-clean', 'shell-build-js', 'shell-files-copy']
            , 'shell-reload', callback);
    });

    gulp.task('shell', ['shell-build-open'], function () {
        bundle_id = shortId.generate();
        styles_id = shortId.generate();
        gulp.watch(MainPath.AllFiles, ['shell-build-reload']);
        gulp.watch(MainPath.IndexHtmlFile, ['shell-build-reload']);
        gulp.watch(MainPath.LessFile, ['shell-build-reload']);
    });
};