var Polyglot = require('node-polyglot');

var polyglot = new Polyglot();
polyglot.locale('en-US');
polyglot.extend({
  'nav_home': 'Home'
});

module.exports = polyglot;
