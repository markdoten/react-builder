require('../../../../../src/js/server/db/schema/timer');
var expect = require('chai').expect;
var service = require('../../../../../src/js/server/controllers/timer/service');
var sinon = require('sinon');

describe('controllers/timer/service', function() {
  before(function() {
    sinon.stub(service.model);
  });

  after(function() {
    service.model.restore();
  });

  describe('getAttribute', function() {
    it('returns null if invalid objectId or attribute', function() {

    });

    it('returns the value of the attribute', function() {

    });
  });

  describe('updateAttribute', function() {
    it('returns false if invalid objectId', function() {
      expect(service.updateAttribute('abc', 'def', 1)).to.be.false;
    });

    it('updates an attribute on the object', function() {
      service.model.returns = { def: 0 };
      expect(service.updateAttribute('abc', 'def', 1)).to.be.true;
      expect(Timer.findOne({ 'objectId': 'abc' })['def']).to.equal(1);
    });
  });
});
