let appRoot = 'src/';
let outputRoot = 'dist/';

exports = {
  root: appRoot,
  package_json: 'package.json',
  source: appRoot + '**/*.js',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  browserFileName: 'secucard-connect',
};
