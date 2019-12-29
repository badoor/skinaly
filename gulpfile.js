var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function css_style(done) {

  gulp.src('./src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errorLogToConsole: true
  }))
  .on('error', console.error.bind(console))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(sourcemaps.write('./'))
  .pipe( gulp.dest('./build/css'))
  .pipe(browserSync.stream());

  done();
};

function sync(done) {

  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    port: 3000
  });

  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
};

function print(done) {
  console.log('Hi');
  done();
}

function watchSass() {
  gulp.watch("./src/scss/*", css_style);
}
function watchFiles() {
  gulp.watch("./src/scss/*", css_style);
  gulp.watch("./build/*.html", browserReload);
  gulp.watch("./src/js/*.js", browserReload);
  gulp.watch("./src/scss/**/*.scss", browserReload);
  gulp.watch("./src/php/*.php", browserReload);
}

// gulp.task(css_style);

gulp.task('default', gulp.parallel(sync, watchFiles));
gulp.task(sync);
