var config = require('../../config');
var db = require('../../db');
var Sample = db.model('Sample');

function SampleService() {

}

SampleService.prototype.create = function(sample) {
  return sample.save();
};

SampleService.prototype.find = function(filter) {

};

SampleService.prototype.get = function(customerId, sampleId) {
  var query = { '_customer': customerId };
  if (sampleId) {
    query['sampleId'] = sampleId;
    return Sample.findOne(query, { __v: 0, _id: 0 }).exec();
  }
  return Sample.find(query, { __v: 0, _id: 0 }).exec();
};

SampleService.prototype.remove = function(sample) {
  return sample.remove();
};

SampleService.prototype.update = function(sample) {
  var query = { '_customer': sample._customer, 'sampleId': sample.sampleId };
  return Sample.findOneAndUpdate(query, sample).exec();
};

module.exports = new SampleService();
