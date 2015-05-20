var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    es6 = require('gulp-es6-transpiler'),
    csso = require('gulp-csso');

var appPaths = [
    './src/js/**/*.js'
];

var vendorPaths = [
    'bower_components/jquery/dist/jquery.min.js'
];

var stylesheetsPaths = [
    './src/stylesheets/**/*.scss',
];

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 9000,
        livereload: true
    });
});

gulp.task('scripts.app', function() {
    gulp.src(appPaths)
        .pipe(es6())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('scripts.vendor', function() {
    gulp.src(vendorPaths)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('scripts.templates', function() {
    gulp.src('./src/index.jade')
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    gulp.src('./src/templates/*.jade')
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('scripts.stylesheets', function() {
    gulp.src(stylesheetsPaths)
        .pipe(
          sass( {
            includePaths: stylesheetsPaths,
            errLogToConsole: true
          } ) )
        .pipe( csso() )
        .pipe( gulp.dest('dist/assets/stylesheets/') )
        .pipe(connect.reload());
});

gulp.task('build', [
    'scripts.vendor', 'scripts.app', 'scripts.templates', 'scripts.stylesheets'
]);

gulp.task('test', function() {

});

gulp.task('watch', function() {
    gulp.watch(appPaths, ['scripts.app']);
    gulp.watch(['./src/templates/*.jade', './src/index.jade'], ['scripts.templates']);
    gulp.watch(stylesheetsPaths, ['scripts.stylesheets']);
});

gulp.task('default', ['build', 'watch', 'connect']);
