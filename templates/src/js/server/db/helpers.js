var Counter = require('../db').model('Counter');

function sequentialIdMiddleware(idColumn, sequentialColumn) {
  return function(next) {
    var doc = this;
    var cond = {};
    cond[idColumn] = doc[idColumn];
    var update = { $inc: { nextSeqNumber: 1 } };
    var opts = { upsert: true };

    Counter.findOneAndUpdate(cond, update, opts, function(err, counter) {
      if (err) next(err);
      // Subtract one from the nextSeqNumber because the current value is
      // always one larger than we want to set.
      doc[sequentialColumn] = Math.max(1, counter.nextSeqNumber - 1);
      next();
    });
  };
}

module.exports = {
  sequentialIdMiddleware: sequentialIdMiddleware
};
