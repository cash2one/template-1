var gulp = require('gulp'),
    fileinclude  = require('gulp-file-include'),
    assetRev = require('gulp-asset-rev'),
    revCollector = require('gulp-rev-collector');

var cssSrc='src/css';
gulp.task('fileinclude',function() {
    gulp.src(['page/**/*.html','!page/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('assetRev', function(){
    return gulp.src(cssSrc)
        .pipe(assetRev())
        .pipe(gulp.dest('src'));
});


gulp.task('default',['fileinclude']);