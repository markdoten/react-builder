var client = require('../service/client');

module.exports = {
  create: function(context, payload) {
    return client('post', '/api/task', payload).then(function(res) {
      context.dispatch('SOME_ACTION', res.body, true);
    });
  }
};
