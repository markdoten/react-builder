/**
 * @fileoverview Attaches react server side rendering to render server.
 */

require('node-jsx').install({ extension: '.jsx' });
var app = require('../src/js/client/app');
var debug = require('debug')('Render');
var express = require('express');
var navigateAction = require('fluxible-router').navigateAction;
var React = require('react');
var serialize = require('serialize-javascript');

var HtmlComponent = React.createFactory(require('../src/js/client/components/Html.jsx'));
var server = express();

debug('Adding render server');

server.use(function (req, res, next) {
  var context = app.createContext();

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, function (err) {
    if (err) {
      if (err.status && err.status === 404) {
        next();
      } else {
        next(err);
      }
      return;
    }

    debug('Exposing context state');
    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    var html = React.renderToStaticMarkup(HtmlComponent({
      js: '/dist/nice.min.js',
      markup: React.renderToString(context.createElement()),
      state: exposed
    }));

    debug('Sending markup');
    res.set('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>' + html);
    res.end();
  });
});

module.exports = server;
