var expect = require('chai').expect;
var util = require('../../../../src/js/server/util/urn');

describe('util/urn', function() {
  describe('encode', function() {
    it('builds a URN with only a customer', function() {
      expect(util.encode('bob')).to.equal('urn:bob');
    });

    it('builds a URN with only 1 piece', function() {
      var urn = util.encode('bob', 'foo');
      expect(urn).to.equal('urn:bob:foo');
    });

    it('builds a URN with only 1 section', function() {
      var urn = util.encode('bob', 'foo', 'bar');
      expect(urn).to.equal('urn:bob:foo=bar');
    });

    it('builds a URN with many items', function() {
      var urn = util.encode('bob', 'foo', 'bar', 'baz');
      expect(urn).to.equal('urn:bob:foo=bar:baz');
    });
  });

  describe('parse', function() {
    it('parses an invalid URN', function() {
      expect(util.parse('foo')).to.deep.equal({});
    });

    it('parses a URN with only a customer', function() {
      var parsed = util.parse('urn:bob');
      expect(parsed).to.deep.equal({
        customer: 'bob'
      });
    });

    it('parses a URN with only 1 piece', function() {
      var parsed = util.parse('urn:bob:foo');
      expect(parsed).to.deep.equal({
        customer: 'bob',
        foo: undefined
      });
    });

    it('parses a URN with only 1 section', function() {
      var parsed = util.parse('urn:bob:foo=bar');
      expect(parsed).to.deep.equal({
        customer: 'bob',
        foo: 'bar'
      });
    });

    it('parses a URN with many items', function() {
      var parsed = util.parse('urn:bob:foo=bar:baz');
      expect(parsed).to.deep.equal({
        customer: 'bob',
        foo: 'bar',
        baz: undefined
      });
    });
  });
});
