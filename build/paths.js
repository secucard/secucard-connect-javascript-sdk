var path = require('path');

var appRoot = 'src/';
var tokenizerRoot = 'src-tokenizer/';
var outputRoot = 'dist/';
var tokenizerOutputRoot = 'dist-tokenizer/';

module.exports = {
    root: appRoot,
    package_json: 'package.json',
    source: appRoot + '**/*.js',
    sourceTokenizer: tokenizerRoot + '**/*.js', 
    output: outputRoot,
    tokenizerOutput: tokenizerOutputRoot,
    sourceMapRelativePath: '../' + appRoot, 
    browserFileName: 'secucard-connect',
    tokenizerFileName: 'secucard-tokenizer'
};
