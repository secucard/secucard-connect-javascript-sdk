// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');

let gulp = require('gulp');

let build = gulp.series(
  'update-code-version',
  'clean',
  gulp.parallel(
    'build-system',
    'build-commonjs'
  ),
);

gulp.task('prepare-release', build);

// Default task
gulp.task('default', build);
