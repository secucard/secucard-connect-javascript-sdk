var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var conventionalChangelog = require('gulp-conventional-changelog');
var fs = require('fs');
var bump = require('gulp-bump');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var replace = require('gulp-replace');

/*
 var spawn = require('child_process').spawn;
 gulp.task('npm-version', function (done) {
 spawn('npm', ['version'], { stdio: 'inherit' }).on('close', done);
 });
 */

gulp.task('bump-version', function (sem, tag) {

	var bumpOptions;
	if (sem) {
		bumpOptions = {type: sem};
		if (sem == 'prerelease') {
			bumpOptions['preid'] = 'pre';
		}
	} else {
		if (!tag) {
			throw new Error('--sem or --tag should be valid strings');
		}
		bumpOptions = {version: tag};
	}

	return gulp.src(['./package.json'])
		.pipe(bump(bumpOptions)) //major|minor|patch|prerelease
		.pipe(gulp.dest('./'));
});

gulp.task('update-code-version', function () {

	var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
	return gulp.src(['./src/de.secucard.connect/client-version.js'])
		.pipe(replace(/("(?:name)": ?)(".+")/g, '$1"' + pkg.version + '"'))
		.pipe(gulp.dest('./src/de.secucard.connect/'));
});

gulp.task('changelog', function () {
	return gulp.src('CHANGELOG.md')
		.pipe(conventionalChangelog())
		.pipe(gulp.dest('./'));
});

gulp.task('prepare-release', function () {

	return runSequence(
		'bump-version',
		'update-code-version',
		'build'
	);
});