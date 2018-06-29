// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory

let gulp = require('gulp');

require('require-dir')('build/tasks');

// Default task
gulp.task('build', gulp.series(
  'update-code-version',
  'clean',
  gulp.parallel(
    'build-system',
    'build-commonjs'
  ),
));
