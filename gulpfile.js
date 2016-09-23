const gulp = require("gulp"),
 		babel = require("gulp-babel"),
		sourcemaps = require('gulp-sourcemaps'),
		stylus = require('gulp-stylus'),
		concat = require('gulp-concat');

gulp.task('stylus', function () {
  return gulp.src('./styles/**/*.styl')
    .pipe(stylus().on('error', stylus.logError))
    .pipe(gulp.dest('.dist/css'));
});

gulp.task('stylus:watch', function () {
  gulp.watch('./styles/**/*.styl', ['stylus']);
});


gulp.task("default", function () {
  return gulp.src("./app/js/app.js")
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest("dist/js"));
});
