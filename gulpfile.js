const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
// const spriteImage = require('gulp.spritesmith');
const pug = require('gulp-pug');
const browserify = require('gulp-browserify');

function compilaHtml() {
    return gulp.src('./src/views/**/[^_]*.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest('./dist'));
}

gulp.task('compilaHtml', compilaHtml);


function minifyImg(){
    return gulp.src('./src/assets/img/*.png')
    .pipe(imagemin(
        {optimizationLevel: 5},
    ))
    .pipe(gulp.dest('./dist/img'))
}

gulp.task('minifyImg', minifyImg);

function compilaSass() {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));
}

gulp.task('sass', compilaSass);


function gulpJS() {
    return gulp.src('./src/assets/js/**/*.js')
        .pipe(browserify(
            {
                transform: ['babelify'],
            }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
}

gulp.task('mainjs', gulpJS);

function watch() {
    gulp.watch('./src/assets/scss/**/*.scss', compilaSass);
    gulp.watch('./src/assets/js/**/*.js', gulpJS);
    gulp.watch('./src/views/**/*.pug', compilaHtml);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('compilaHtml','sass', 'mainjs','minifyImg'));