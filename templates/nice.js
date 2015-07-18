var app = require('./src/js/client/app');
var debug = require('debug');
var dehydratedState = window.App; // Sent from the server
var React = require('react');

window.React = React; // For chrome dev tool support
debug.enable('*');

app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }
  React.render(context.createElement(), document.getElementById('app'));
});
