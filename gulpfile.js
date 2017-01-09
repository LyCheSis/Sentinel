var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del');



gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'copy');
});



gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('web/**/*.*', ['copy']);
});



gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*.js', 'libs/**/*.js'])
//        .pipe(jshint('.jshintrc'))
//        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});



gulp.task('copy', function() {
    return gulp.src(['web/**/*.*'])
        .pipe(gulp.dest('build'));
});



gulp.task('clean', function() {
    return del(['build/assets/css', 'build/assets/js']);
});
