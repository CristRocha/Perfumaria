"use strict";

// ---------------------------------- Configuration ---------------------------------------

const storeName = 'Perfumaria';

const path = {
        views: {
            src  : './src/views/**/[^_]*.pug',
            watch: './src/views/**/*.pug',
            dest : './dist'
        },
        styles: {
            src   : 'src/assets/sass/**/*.scss',
            dest  : './dist/css'
        },
        scripts: {
            src   : './src/assets/js/',
            dest  : './dist/js'
        },
  };

// ------------------------------------- Modules -------------------------------------------

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const prefixer      = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const pug           = require('gulp-pug');
const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const glob          = require('glob');
const stream        = require('event-stream');
const del           = require('del');
const browserSync = require("browser-sync").create();

// ------------------------------------ Development ---------------------------------------

function sync(){
    browserSync.init({
        open:true,
        server: "./dist",
    });
}

function es(done) {
    return glob(`${path.scripts.src}${storeName}-**.js`, function(err,folder) {
        if(err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        var tasks = files.map(function(entry) {
          return browserify({ entries: [ path.scripts.src + entry] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulp.dest('./dist/js'));
        });
        stream.merge(tasks).on('end', done);
    })
};

function scss() {
    return gulp.src(path.styles.src)
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(browserSync.stream());
};

function watch() {
    gulp.watch(path.styles.src, css);
    gulp.watch(path.views.watch, html).on('change', browserSync.reload);
    gulp.watch(path.scripts.src, js).on('change', browserSync.reload);
}
// ------------------------------------- Production ---------------------------------------

function js(done) {
    return glob(`${path.scripts.src}${storeName}-**.js`, function(err,folder) {
        if(err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        var tasks = files.map(function(entry) {
          return browserify({ entries: [ path.scripts.src + entry] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'));
        });
        stream.merge(tasks).on('end', done);
    })
};

function html() {
    return gulp.src(path.views.src)
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest(path.views.dest));
}

function img() {
    return gulp.src('./src/assets/img/*.png')
        .pipe(imagemin(
            { optimizationLevel: 5 },
        ))
        .pipe(gulp.dest('./dist/img'))
}

function css() {
    return gulp.src(path.styles.src)
        .pipe(sass({
            outputStyle : 'compressed'
        }))
        .pipe(prefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.styles.dest));
}

function clean() {
    return del([ 'dist' ]);
}

// ------------------------------------- Tasks ---------------------------------------

const dev = gulp.series(clean,gulp.parallel(sync,img,html,scss,es,watch));
exports.watch = dev;

const build = gulp.series(clean,gulp.parallel(html,css,js,img));
exports.default = build;
