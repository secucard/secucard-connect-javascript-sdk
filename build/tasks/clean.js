let gulp = require('gulp');
let del = require('del');
let vinylPaths = require('vinyl-paths');

// Load config
let paths = require('../paths');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output]).
    pipe(vinylPaths(del));
});