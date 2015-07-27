var gulp = require('gulp');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');

gulp.task('eslint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('html', function () {
  return gulp.src(['src/**/*.html'])
    .pipe(livereload());
});

gulp.task('concat:css', function() {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.css',
      'src/assets/css/style.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/assets'))
    .pipe(livereload());
});

gulp.task('babel', ['eslint'], function () {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    });
});

gulp.task('connect', function() {
  connect.server({
    port: 8000
  });
});

gulp.task('watch', ['connect', 'babel', 'concat:css'], function() {
  livereload.listen();
  gulp.watch(['src/**/*.js'], ['babel']);
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/**/*.css'], ['concat:css']);
});

gulp.task('default', ['watch']);
