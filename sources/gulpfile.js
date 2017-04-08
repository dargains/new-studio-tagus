const gulp = require('gulp'),
      wrap = require('gulp-wrap'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      browser = require('browser-sync'),
      sourcemaps = require('gulp-sourcemaps'),
      partials = require('gulp-inject-partials'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src('scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 3 versions', '> 5%'], cascade: false}))
  .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('../css'))
  .pipe(browser.reload({stream: true}));
});

gulp.task('js', () => {
  gulp.src('modules/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(concat("bundle.js"))
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('../scripts/core'))
  .pipe(browser.reload({stream: true, once: true}));
});

gulp.task('templates', () => {
  gulp.src('templates/*.html')
  .pipe(partials({removeTags: true}))
  .pipe(wrap({src: 'layout.html'}))
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('../html/templates'))
  .pipe(browser.reload({stream: true}));
});

gulp.task('modules', () => {
  gulp.src('modules/**/*.html')
  .pipe(wrap({src: 'layout.html'}))
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('../html/modules'))
  .pipe(browser.reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browser.init(null, {
    server: { baseDir: "../" }
  });
});

gulp.task('watch', () => {
  gulp.watch(['scss/main.scss', 'scss/core/*.scss', 'modules/**/*.scss'], ['sass']);
  gulp.watch('modules/**/*.js', ['js']);
  gulp.watch('modules/**/*.html', ['modules', 'templates']);
  gulp.watch('templates/**/*.html', ['templates']);
});

gulp.task('default', [
  'sass',
  'js',
  'modules',
  'templates',
  'watch',
  'browser-sync'
]);
