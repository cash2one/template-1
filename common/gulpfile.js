var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    assetRev = require('gulp-asset-rev'),
    revCollector = require('gulp-rev-collector'),
    path = require('path'),
    less = require('gulp-less'),
    /*    concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        ,*/
    webserver = require('gulp-webserver'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css');
var htmlInputPath = 'src/**/*.html',
    htmlExcludePath = '!src/include/**.html',
    htmldist = 'dist/';
var cssSrc = 'src/css';
var Config = require('./build/gulpfile.config.js');
gulp.task('fileinclude', () => {
    gulp.src([htmlInputPath, htmlExcludePath])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(Config.html.dist));

});
gulp.task('assetRev', () => {
    return gulp.src(cssSrc)
        .pipe(assetRev())
        .pipe(gulp.dest('src'));
});

gulp.task('returnImg', () => {
    return gulp.src(Config.img.src)
        .pipe(gulp.dest(Config.img.dist));
});

gulp.task('returnFonts', () => {
    return gulp.src(Config.fonts.src)
        .pipe(gulp.dest(Config.fonts.dist));
});
gulp.task('minifyJs', () => {
    gulp.src(Config.js.src)
        .pipe(minify({
            ext: {
                src: '.js',
                min: '-min.js'
            },
            exclude: ['bootstrap', 'vendor'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest(Config.js.dist))
});
gulp.task('minify-css', () => {
    return gulp.src(Config.css.src)
        .pipe(cleanCSS())
        .pipe(gulp.dest(Config.css.dist));
});

gulp.task('return-js', () => {
    return gulp.src(Config.js.src)
        .pipe(gulp.dest(Config.js.dist));
});
gulp.task('return-css', () => {
    return gulp.src(Config.css.src)
        .pipe(gulp.dest(Config.css.dist));
});

gulp.task('return-fonts', () => {
    return gulp.src(Config.fonts.src)
        .pipe(gulp.dest(Config.fonts.dist));
});

gulp.task('less1', () => {
   /* return gulp.src(Config.less.src)
        .pipe(less())
        .pipe(gulp.dest(Config.less.dist));*/
});
gulp.task('less2', () => {
/*    return gulp.src(Config.less.src2 + 'wzry-index.less')
        .pipe(less())
        .pipe(gulp.dest(Config.less.dist2));*/
});

gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('less', () => {
    gulp.start(['less1', 'less2'])
});
gulp.task('default', ['less'], () => {
    gulp.start(['minify-css', 'minifyJs', 'fileinclude', 'returnImg', 'return-fonts'])
});
gulp.task('dev', ['less'], () => {
    gulp.start(['return-css', 'return-js', 'fileinclude', 'returnImg', 'return-fonts']);
});
gulp.task('build', ['less'], () => {
    gulp.start(['minify-css', 'minifyJs', 'fileinclude', 'returnImg', 'return-fonts'])
});