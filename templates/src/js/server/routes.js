exports.setup = function(app, handlers) {
  app.get('/coverage', handlers.coverage);
};
