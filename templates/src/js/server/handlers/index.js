exports.coverage = function(req, res, next) {
  res.render('coverage', { /* template locals context */ });
};

exports.index = function(req, res, next) {
  res.render('index', { /* template locals context */ });
};
