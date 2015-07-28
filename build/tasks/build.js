var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
	return gulp.src(paths.source)
		.pipe(plumber())
		.pipe(changed(paths.output, {extension: '.js'}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
		.pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath}))
		.pipe(gulp.dest(paths.output + "system"));
});


// copies changed html files to the output directory
gulp.task('build-html', function () {
	return gulp.src(paths.html)
		.pipe(changed(paths.output, {extension: '.html'}))
		.pipe(gulp.dest(paths.output));
});

gulp.task('build-commonjs', function () {
	return gulp.src(paths.source)
		.pipe(to5(assign({}, compilerOptions, {modules: 'common'})))
		.pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-browserify', function () {
	return browserify(paths.output + '/commonjs/browser.js', {standalone: paths.browserFileName})
		.bundle()
		.pipe(source(paths.browserFileName + '.js')) // gives streaming vinyl file object
		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		//.pipe(uglify()) // now gulp-uglify works 
		.pipe(gulp.dest(paths.output + 'browserify'));
});

gulp.task('build-browserify-min', function () {
	return browserify(paths.output + '/commonjs/browser.js', {standalone: paths.browserFileName})
		.bundle()
		.pipe(source(paths.browserFileName + '.min.js')) // gives streaming vinyl file object
		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(uglify()) // now gulp-uglify works 
		.pipe(gulp.dest(paths.output + 'browserify'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
	return runSequence(
		'clean',
		['build-commonjs', 'build-system'],
		['build-browserify', 'build-browserify-min'],
		callback
	);
});
