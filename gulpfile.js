var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function () {
    return gulp.src('./modules/assimilation.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});