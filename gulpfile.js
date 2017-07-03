var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var dir='./assets/css/*.css';
var dest='.//assets/css/';

gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src(dir)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest));
});
gulp.task('default',['css']);