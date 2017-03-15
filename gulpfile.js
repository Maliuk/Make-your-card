var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var webserver = require('gulp-webserver');

var sassOptions = {
    errLogToConsole: true,
    //outputStyle: 'compressed'
};

gulp.task('styles', function () {
    return gulp.src('scss/main.scss')
    //return gulp.src('resources/assets/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(notify("Task STYLES complete"));
});

gulp.task('scripts', function () {
    return gulp.src(['resources/assets/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(notify("Task SCRIPTS complete"));
});

gulp.task('webserver', function() {
    connect.server({
        port: 5252
    });
});

//Watch task
gulp.task('default', ['styles', 'webserver'], function () {
    gulp.watch('scss/**/*.scss', ['styles']);
    //gulp.watch('resources/assets/js/**/*.js', ['scripts']);
});