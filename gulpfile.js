const gulp = require('gulp'),
del = require('del'),
pug = require('gulp-pug2'),
stylus = require('gulp-stylus'),
sourcemaps = require('gulp-sourcemaps'),
image = require('gulp-image'),
nib = require('nib'),
concat = require('gulp-concat'),
browserSync = require('browser-sync').create();

/** Paths **/
const rootPatterns = './app/patterns/',
rootStyles = './app/styles/',
rootAssets = './app/assets/',
rootPages = './app/patterns/',
rootPublic = './docs/';

// Compile CSS with stylus
gulp.task('compile:styl', function() {
	return gulp.src([
		rootStyles + 'style.styl',
		rootPatterns + '**/**/*.styl'
	], { base: 'app/styles' })
	.pipe(concat('app.styl'))
	.pipe(sourcemaps.init())
	.pipe(stylus({
		'resolve url': true,
		import: ['nib'],
		use: nib()
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(rootPublic + 'css/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Compile html with pug
gulp.task('compile:pug', function buildHTML() {
	return gulp.src(rootPages + '*.pug')
	.pipe(pug({basedir: __dirname + '/app'}))
	.pipe(gulp.dest(rootPublic))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// compile images
gulp.task('compile:assets', function () {
	gulp.src(rootAssets + '**/*')
	.pipe(gulp.dest(rootPublic));
});

// Watch task
gulp.task('app:watch', ['app:browserSync', 'compile:styl'], function() {
	gulp.watch([rootStyles + '**/*.styl', rootStyles + '*.styl',  rootPatterns + '**/**/*.styl'], ['compile:styl']),
	gulp.watch([rootPatterns + '**/**/*.pug', rootPages + '*.pug'], ['compile:pug']);
});

// Browser Sync - reload browser on change
gulp.task('app:browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './docs',
			index: "index.html",
			ghostMode: false
		},
	})
})

// cleanup
gulp.task('clean:docs', function() {
	return del.sync('./docs');
})


// Default gulp task to run
gulp.task('default', ['clean:docs', 'compile:styl', 'compile:pug', 'compile:assets', 'app:watch', 'app:browserSync']);
