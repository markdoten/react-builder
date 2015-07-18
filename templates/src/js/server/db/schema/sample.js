var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sequentialIdMiddleware = require('../helpers').sequentialIdMiddleware;

var sampleSchema = new Schema({
  _customer: { type: String, ref: 'Customer' }
  , title: String
  , description: String
  , sampleId: Number
});

sampleSchema.index({ '_customer': 1, 'sampleId': 1 }, { unique: true });

sampleSchema.pre('save', sequentialIdMiddleware('_customer', 'sampleId'));

mongoose.model('Sample', sampleSchema);

module.exports = sampleSchema;
