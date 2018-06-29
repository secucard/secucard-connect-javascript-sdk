let gulp = require('gulp');
let to5 = require('gulp-babel');
let assign = Object.assign || require('object.assign');
let changed = require('gulp-changed');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');

// Load config
let paths = require('../paths');
let compilerOptions = require('../babel-options');

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
      ],
    })).
    pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath})).
    pipe(gulp.dest(paths.output + 'system'));
});
