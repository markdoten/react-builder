var config = require('../config');
var mongoose = require('mongoose');

var db = config.mongo.db;
var host = config.mongo.host;
var port = config.mongo.port;

module.exports = mongoose.createConnection(host, db, port, {
  db: { native_parser: true },
  server: { auto_reconnect: true }
});
