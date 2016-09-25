const gulp = require('gulp'),
	del = require('del'),
  pug = require('gulp-pug2'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
	nib = require('nib'),
  babel = require("gulp-babel"),
  concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();;

/** Paths **/
const rootpatterns = './app/patterns/',
	rootJS = './app/js/',
	rootStyles = './app/styles/'

// Compile CSS with stylus
gulp.task('compile:styl', function() {
  return gulp.src([rootStyles + 'includes.styl', rootpatterns + '**/**/*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
			import: ['nib'],
      use: nib()
		}))
    .pipe(sourcemaps.write())
		.pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

// Compile html with pug
gulp.task('compile:pug', function buildHTML() {
  return gulp.src('./app/patterns/pages/*.pug')
  .pipe(pug())
	.pipe(gulp.dest('./public'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Watch task
gulp.task('app:watch', ['app:browserSync', 'compile:styl'], function() {
  gulp.watch([rootStyles + '*.styl', rootpatterns + '**/**/*.styl'], ['compile:styl']),
	gulp.watch(rootpatterns + '**/**/*.pug', ['compile:pug']);
  gulp.watch(rootJS + '**/*.js', browserSync.reload); ;
});

// Browser Sync - reload browser on change
gulp.task('app:browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
			index: "../public/index.html"
    },
  })
})

// cleanup
gulp.task('clean:public', function() {
  return del.sync('public');
})

/**
gulp.task("default", function() {
  return gulp.src("./app/js/app.js")
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("public/js"));
});
**/

// Default gulp task to run
gulp.task('default', ['clean:public', 'compile:styl', 'compile:pug', 'app:watch', 'app:browserSync']);
