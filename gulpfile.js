'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
    return gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
    return gulp.src('.')
        .pipe(webserver({
            host: 'localhost',
            port: '8080',
            livereload: true,
            directoryListing: false
        }));
});
gulp.task('default', ['sass', 'sass:watch', 'webserver']);