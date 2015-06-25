var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  index:'index.html',
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
};
