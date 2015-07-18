var bodyParser = require('body-parser');
var debug = require('debug')('Server');
var devServer = require('./dev');
var express = require('express');
var path = require('path');
var publicPath = path.join(__dirname, '/../');
var renderServer = require('./render');
var routes = require('../src/js/server/routes');
var server = express();

server.set('state namespace', 'App');

// Parse application/json
server.use(bodyParser.json());

// Set up db and schemas
require('../src/js/server/db');
require('../src/js/server/db/schema');

// Routes
routes.setup(server, require('../src/js/server/handlers'));

server.use('/dist/', devServer);
server.use(renderServer);
server.use(function(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
});

var port = 3001;
server.listen(port);
debug('Listening on port ' + port);
