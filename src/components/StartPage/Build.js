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

function _returnPathObject(basePath, configPaths){
    var pathsObject = {};
    for (var key in configPaths){
        pathsObject[key] = basePath + configPaths[key];
    }
    return pathsObject;
}

var bundle_id = shortId.generate();
var styles_id = shortId.generate();

var MainPath = _returnPathObject('./src/components/StartPage/',{
    MainJsFile:'Main.js',
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

module.exports = function(gulp){
  gulp.task('StartPage-clean', function(){
     gulp.src(MainPath.DistDir + '/*Build.js', {read: false})
      .pipe(clean());
      return gulp.src(MainPath.DistDir + '/*styles.css', {read: false})
      .pipe(clean());
  });

    gulp.task('StartPage-files-copy', function() {
        gulp.src(MainPath.LessFile).pipe(less())
            .pipe(rename({prefix: styles_id}))
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootStrapMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.BootstrapThemeMinFile)
            .pipe(gulp.dest(MainPath.DistDir));

        gulp.src(ModulesPath.FontsFolder)
            .pipe(gulp.dest(MainPath.FontsFolder));

        gulp.src(ModulesPath.FontAwesomeCss)
            .pipe(gulp.dest(MainPath.DistDir));

        return gulp.src(MainPath.IndexHtmlFile)
            .pipe(replace('{Buildjs}', bundle_id + 'Build.js'))
            .pipe(replace('{stylescss}', styles_id + 'styles.css'))
            .pipe(gulp.dest(MainPath.DistDir));
    });

    gulp.task('StartPage-build-js', function(){
       return browserify(MainPath.MainJsFile)
        .transform('reactify')
        .on('error', console.error.bind(console))
        .bundle()
        .pipe(source('Build.js'))
        .pipe(rename({prefix: bundle_id}))
        .pipe(gulp.dest(MainPath.DistDir));
    });

    gulp.task('StartPage-reload', function(callback){
       gulp.src(MainPath.IndexHtmlFile).pipe(connect.reload());
        fs.readFile(Mainpapth.IndexHtmlFile, function(err, file){
            callback();
        });
    });

    gulp.task('StartPage-connect', function(){
        return connect.server({
            root: MainPath.DistDir,
            port: 8080,
            base: 'http://localhostpage',
            livereload: true
        });
    });

    gulp.task('StartPage-open', ['Startpage-connect'], function(callback){
       gulp.src(MainPath.DistIndexHtmlFile)
        .pipe(open({uri: 'http://localhostpage:8080/'}));
        fs.readFile(MainPath.IndexHtmlFile, function(err, file){
           callback();
        });
    });

    gulp.task('StartPage-build-open', function(callback){
        return runSequence(['StartPage-clean', 'StartPage-build-js', 'StartPage-files-copy']
            ,'StartPage-reload', callback);
    });

    gulp.task('StartPage-build-reload', function(callback){
        return runSequence(['StartPage-clean', 'StartPage-build-js', 'StartPage-files-copy']
            ,'StartPage-reload', callback);
    });

    gulp.task('StartPage', ['StartPage-build-open'], function(){
        bundle_id = shortid.generate();
        styles_id = shortid.generate();
        gulp.watch(MainPath.AllFiles,['StartPage-build-reload']);
        gulp.watch(MainPath.IndexHtmlFile, ['StartPage-build-reload']);
        gulp.watch(MainPath.LessFile, ['StartPage-build-reload']);
    });
};