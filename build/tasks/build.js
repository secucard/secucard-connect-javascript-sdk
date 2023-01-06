var gulp = require('gulp');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

gulp.task('build-commonjs', ['clean'], function () {
	return gulp.src(paths.source)
		.pipe(to5(assign({}, compilerOptions, {modules: 'common'})))
		.pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build', ['build-commonjs']);
