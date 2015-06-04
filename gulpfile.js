var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src('src/*.js')
        .pipe(concat('randomColor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});