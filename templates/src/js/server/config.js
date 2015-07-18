var fs = require('fs');
var yaml = require('js-yaml');

var PATH = __dirname + '/../../../config/app.yml';

module.exports = yaml.safeLoad(fs.readFileSync(PATH, 'utf8'));
