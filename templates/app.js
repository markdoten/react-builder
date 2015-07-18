var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var debug = require('debug')('Server');
var path = require('path');
var port = process.argv[2];
var routes = require('./src/js/server/routes');
var swig = require('swig');
var events = require('events');

// View config
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Set up db and schemas
require('./src/js/server/db');
require('./src/js/server/db/schema');

app.emitter = new events.EventEmitter();
app.emitter.setMaxListeners(3000);

// Parse application/json
app.use(bodyParser.json());

// Set up static express
app.use('/static', express.static(path.join(__dirname, '/coverage')));
app.use('/static', express.static(path.join(__dirname, '/dist')));
app.use('/static', express.static(path.join(__dirname, '/node_modules')));
app.use('/static', express.static(path.join(__dirname, '/src')));

app.use(require('./src/js/server/render'));

// Routes
routes.setup(app, require('./src/js/server/handlers'));

app.listen(port);
console.log('Running nice on port', port);
