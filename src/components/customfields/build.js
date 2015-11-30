var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var open = require('gulp-open');

function getPathObject(basePath, configuration) {
    var resultObject = {};
    for (var key in configuration) {
        resultObject[key] = basePath + configuration[key];
    }
    return resultObject;
}

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
    gulp.task('customfields-files-copy', function () {
        gulp.src(MainPath.IndexHtmlFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(MainPath.LessFile).pipe(less())
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootstrapMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootstrapThemeMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.FontsFolder)
            .pipe(gulp.dest(MainPath.FontsFolder));

        gulp.src(ModulesPath.FontAwesomeCss)
            .pipe(gulp.dest(MainPath.DistDir));

    });

    gulp.task('customfields-build', ['customfields-files-copy'], function () {
        browserify(MainPath.BootstrapperFile)
            .transform('reactify')
            .on('error', console.error.bind(console))
            .bundle()
            .pipe(source('build.js'))
            .pipe(gulp.dest(MainPath.DistDir));
    });

    gulp.task('customfields-reload', function () {
        gulp.src(MainPath.IndexHtmlFile).pipe(connect.reload());
    });

    gulp.task('customfields-connect', function () {
        connect.server({
            root: MainPath.DistDir,
            port: 9005,
            base: 'http://localhost',
            livereload: true
        });
    });

    gulp.task('customfields-open', ['customfields-connect'], function () {
        gulp.src(MainPath.DistIndexHtmlFile)
            .pipe(open({uri: 'http://localhost:9005/'}));
    });

    gulp.task('customfields', ['customfields-build', 'customfields-open'], function () {
        gulp.watch(MainPath.AllFilesMask, ['customfields-build', 'customfields-reload']);
        gulp.watch(MainPath.IndexHtmlFile, ['customfields-files-copy', 'customfields-reload']);
        gulp.watch(MainPath.LessFile, ['customfields-files-copy', 'customfields-reload']);
    });
};