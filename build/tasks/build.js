let gulp = require('gulp');
let runSequence = require('run-sequence');
let changed = require('gulp-changed');
let plumber = require('gulp-plumber');
let to5 = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');
let paths = require('../paths');
let compilerOptions = require('../babel-options');
let assign = Object.assign || require('object.assign');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source).
    pipe(plumber()).
    pipe(changed(paths.output, {extension: '.js'})).
    pipe(sourcemaps.init({loadMaps: true})).
    pipe(to5(assign({}, compilerOptions), {
      presets: [
        ['es2015', {loose: true, modules: 'systemjs'}],
        'stage-2',
      ]
    })).
    pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath})).
    pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-commonjs', function() {
  return gulp.src(paths.source).pipe(to5(assign({}, compilerOptions, {
    presets: [
      ['es2015', {loose: true, modules: 'commonjs'}],
      'stage-2',
    ]
  }))).pipe(gulp.dest(paths.output + 'commonjs'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-commonjs tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-commonjs', 'build-system'],
    callback,
  );
});
