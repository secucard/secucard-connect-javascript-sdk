var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-tokenizer', function() {
  return gulp.src([paths.tokenizerOutput])
    .pipe(vinylPaths(del));
});