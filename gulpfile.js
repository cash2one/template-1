var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');
var src='assets/js/components/',
    dest='dist/';

gulp.task('minifycss', function() {
    console.log(src + '*.css');
    console.log(dest);
    return gulp.src(src+'*.css')
        .pipe(gulp.dest(dest))
        .pipe(minifycss());
});
gulp.task('minifyjs', function() {
    return gulp.src(src+'*.js')
       // .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest+'js'));
});
gulp.task('default', function() {
    gulp.start('minifycss', 'minifyjs');
});