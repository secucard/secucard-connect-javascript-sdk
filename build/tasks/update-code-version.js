let gulp = require('gulp');
let fs = require('fs');
let replace = require('gulp-replace');

gulp.task('update-code-version', function() {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  return gulp.src(['./src/de.secucard.connect/client-version.js']).
    pipe(replace(/("(?:name)": ?)(".+")/g, '$1"' + pkg.version + '"')).
    pipe(gulp.dest('./src/de.secucard.connect/'));
});
