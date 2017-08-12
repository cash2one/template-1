var gulp = require('gulp'),
    fileinclude  = require('gulp-file-include'),
    assetRev = require('gulp-asset-rev'),
    revCollector = require('gulp-rev-collector'),
/*    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    path = require('path'),*/
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css');
var htmlInputPath='src/**/*.html',
    htmlExcludePath='!src/include/**.html',
    htmldist='dist/';
var cssSrc='src/css';
var Config=require('./build/gulpfile.config.js');
gulp.task('fileinclude',function() {
    gulp.src([htmlInputPath,htmlExcludePath])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(Config.html.dist));
});
gulp.task('assetRev', function(){
    return gulp.src(cssSrc)
        .pipe(assetRev())
        .pipe(gulp.dest('src'));
});

gulp.task('returnImg', function(){
    return gulp.src(Config.img.src)
        .pipe(gulp.dest(Config.img.dist));
});

gulp.task('returnFonts', function(){
    return gulp.src(Config.fonts.src)
        .pipe(gulp.dest(Config.fonts.dist));
});
gulp.task('minifyJs',function () {
    gulp.src(Config.js.src)
        .pipe(minify({
             ext:{
                 min:'.js'
             },
             exclude: ['bootstrap'],
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

gulp.task('default',['minify-css','minifyJs','fileinclude','returnImg','return-fonts']);
gulp.task('dev',['return-css','return-js','fileinclude','returnImg','return-fonts']);
gulp.task('build',['minify-css','minifyJs','fileinclude','returnImg','return-fonts']);