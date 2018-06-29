let gulp = require('gulp');
let to5 = require('gulp-babel');
let assign = Object.assign || require('object.assign');

// Load config
let paths = require('../paths');
let compilerOptions = require('../babel-options');

gulp.task('build-commonjs', function() {
  return gulp.src(paths.source).
    pipe(to5(assign({}, compilerOptions, {
      presets: [
        ['es2015', {loose: true, modules: 'commonjs'}],
        'stage-2',
      ],
    }))).
    pipe(gulp.dest(paths.output + 'commonjs'));
});