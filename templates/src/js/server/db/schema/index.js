var fs = require('fs');

fs.readdirSync(__dirname).forEach(function(filename) {
  if (!filename.match('.js$') || filename === 'index.js') {
    return;
  }
  require(__dirname + '/' + filename);
});
