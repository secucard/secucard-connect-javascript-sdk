let runSequence = require('run-sequence');
let fs = require('fs');
let gulp = require('gulp-param')(require('gulp'), process.argv);
let replace = require('gulp-replace');

gulp.task('update-code-version', function() {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  return gulp.src(['./src/de.secucard.connect/client-version.js']).
    pipe(replace(/("(?:name)": ?)(".+")/g, '$1"' + pkg.version + '"')).
    pipe(gulp.dest('./src/de.secucard.connect/'));
});

gulp.task('prepare-release', function() {
  return runSequence(
    'update-code-version',
    'build',
  );
});