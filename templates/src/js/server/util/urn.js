var append = require('mout/array/append');
var forEach = require('mout/array/forEach');

module.exports = {
  /**
   * Encode a URN with a customer and all additional function arguments.
   * @param {string} customer The customer attached to the URN.
   * @param {*} arguments Optional other arguments.
   * @return {string} The encoded URN.
   */
  encode: function encode(customer) {
    var args = Array.prototype.slice.call(arguments, 1);
    var urn = ['urn:', customer];

    for (var i=0, len=args.length; i<len; i++) {
      append(urn, [i % 2 === 0 ? ':' : '=', args[i]]);
    }
    return urn.join('');
  },

  /**
   * Parse a URN into an object for easy usage.
   * @param {string} urn The URN to parse.
   * @return {Object} The parsed URN pieces.
   */
  parse: function parse(urn) {
    var parsed = {};
    var matches = urn.match(/urn:([^:]*):?(.*)/);
    if (!matches) {
      return parsed;
    }
    parsed['customer'] = matches[1];

    if (!matches[2]) {
      return parsed;
    }

    forEach(matches[2].split(':'), function(section) {
      var s = section.split('=');
      parsed[s[0]] = s[1];
    });
    return parsed;
  }
};
