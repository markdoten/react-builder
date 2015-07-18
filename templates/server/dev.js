var debug = require('debug')('Dev');
var express = require('express');
var lessMiddleware = require('less-middleware');
var path = require('path');
var publicPath = path.join(__dirname, '/../');

var server = express();

debug('Adding dev server');

server.use('/images', express.static(path.join(publicPath, 'src/images')));
server.use('/css', express.static(path.join(publicPath, 'node_modules', 'bootstrap', 'dist', 'css')));
server.use('/css/fonts', express.static(path.join(publicPath, 'node_modules', 'bootstrap', 'dist', 'fonts')));
server.use('/', express.static(path.join(publicPath, 'dist')));

module.exports = server;
