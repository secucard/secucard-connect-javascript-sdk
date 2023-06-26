const gulp = require('gulp');
const to5 = require('gulp-babel');
const paths = require('./build/paths');
const compilerOptions = require('./build/babel-options');
const assign = Object.assign || require('object.assign');
const del = require('del');
const conventionalChangelog = require('gulp-conventional-changelog');
const fs = require('fs');
const bump = require('gulp-bump');
const replace = require('gulp-replace');
const minimist = require('minimist');

/**************** console args *****************/
const knownOptions = {
    string: ['tag', 'sem'],
    default: {sem: 'patch'}
};

const options = minimist(process.argv.slice(2), knownOptions);



/**************** clean task *******************/
function clean() {
    return del([ paths.output ]);
}
exports.clean = clean;
exports.default = clean;



/**************** changelog task ***************/
function changelog() {
    return gulp.src('CHANGELOG.md')
        .pipe(conventionalChangelog())
        .pipe(gulp.dest('./'))
}
exports.changelog = changelog;



/**************** update version task **********/
function updateCodeVersion() {
    return gulp.src(['./src/de.secucard.connect/client-version.js'])
        .pipe(replace(/("(?:name)": ?)(".+")/g, '$1"' + pkg.version + '"'))
        .pipe(gulp.dest('./src/de.secucard.connect/'));
}
let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
exports.updateCodeVersion = updateCodeVersion;



/**************** bump version task ************/
function bumpVersion() {
    let bumpOptions;
    if (options.sem) {
        bumpOptions = {type: options.sem};
        if (options.sem === 'prerelease') {
            bumpOptions['preid'] = 'pre';
        }
    } else {
        if (!options.tag) {
            throw new Error('--sem or --tag should be valid strings');
        }
        bumpOptions = {version: options.tag};
    }

    return gulp.src(['./package.json'])
        .pipe(bump(bumpOptions)) //major|minor|patch|prerelease
        .pipe(gulp.dest('./'));
}
exports.bumpVersion = bumpVersion;



/**************** build task *******************/
function buildCommonjs() {
    return gulp.src(paths.source)
        .pipe(to5(assign({}, compilerOptions, {modules: 'common'})))
        .pipe(gulp.dest(paths.output + 'commonjs'))
}

exports.buildCommonjs = gulp.series(exports.clean, buildCommonjs);
exports.build = exports.buildCommonjs;



/**************** prepare tasks ****************/
exports.prepareRelease = gulp.series(exports.bumpVersion, exports.updateCodeVersion, exports.build, exports.changelog);
exports.preRelease = gulp.series(exports.bumpVersion, exports.updateCodeVersion);



/**************** default task *****************/
exports.default = exports.build;
