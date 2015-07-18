var Application = require('./components/Application');
var Fluxible = require('fluxible');
var React = require('react');
var RouteStore = require('fluxible-router').RouteStore;

var app = new Fluxible({
  component: Application,
  stores: [
    require('./stores/Application')
    , RouteStore.withStaticRoutes(require('./configs/routes'))
  ]
});

app.plug(require('./plugins/context')());
app.plug(require('./plugins/navigate')());

module.exports = app;
