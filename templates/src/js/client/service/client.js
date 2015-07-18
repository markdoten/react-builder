var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = function(method, url, data) {
  return new Promise(function(accept, reject) {
    var req = request(method, url);
    data && req.send(data);
    req.end(function(err, res) {
      if (res.ok) {
        accept(res);
        return;
      }
      reject(res);
    });
  });
};
