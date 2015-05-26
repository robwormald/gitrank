/* */ 
var fs = require("fs");
var _ = require("lodash");
var packageJson = require("../package.json!systemjs-json");
var IGNORES = ['**/.*', 'node_modules', 'bower_components', 'test', 'tests'];
var INCLUDES = ['lib/async.js', 'README.md', 'LICENSE'];
var REPOSITORY_NAME = 'caolan/async';
packageJson.jam = {
  main: packageJson.main,
  include: INCLUDES,
  categories: ['Utilities']
};
packageJson.spm = {main: packageJson.main};
packageJson.volo = {
  main: packageJson.main,
  ignore: IGNORES
};
var bowerSpecific = {
  moduleType: ['amd', 'globals', 'node'],
  ignore: IGNORES,
  authors: [packageJson.author]
};
var bowerInclude = ['name', 'description', 'version', 'main', 'keywords', 'license', 'homepage', 'repository', 'devDependencies'];
var componentSpecific = {
  repository: REPOSITORY_NAME,
  scripts: [packageJson.main]
};
var componentInclude = ['name', 'description', 'version', 'keywords', 'license'];
var bowerJson = _.merge({}, _.pick(packageJson, bowerInclude), bowerSpecific);
var componentJson = _.merge({}, _.pick(packageJson, componentInclude), componentSpecific);
fs.writeFileSync('./bower.json', JSON.stringify(bowerJson, null, 2));
fs.writeFileSync('./component.json', JSON.stringify(componentJson, null, 2));
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
