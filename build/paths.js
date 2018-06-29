let appRoot = 'src/';
let outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  package_json: 'package.json',
  source: appRoot + '**/*.js',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  browserFileName: 'secucard-connect',
};
