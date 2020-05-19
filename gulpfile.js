const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

sass2css = () => {
  return src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('public/stylesheets'));
}

minifyjs = () => {
    return src('./src/js/*')
      .pipe(terser())
      .pipe(dest('public/javascripts'));
}
 
minifyimage = () => {
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('public/images'));
}

watchtask = () => {
    watch(['./src/sass/**/*.scss', './src/js/*', './src/img/*'], parallel(sass2css, minifyjs, minifyimage));
}

exports.default = series(
    parallel(sass2css, minifyjs, minifyimage),
    watchtask
)