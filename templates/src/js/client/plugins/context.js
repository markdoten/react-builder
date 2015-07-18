var bind = require('mout/function/bind');

module.exports = function contextPlugin () {
  return {
    name: 'ContextPlugin',

    /**
     * Called to plug the FluxContext
     * @returns {Object}
     */
    plugContext: function plugContext(obj, ctx) {
      return {
        /**
         * Provides access to create paths by name
         * @param {Object} componentContext
         */
        plugComponentContext: function plugComponentContext(componentContext) {
          componentContext.executeAction = bind(ctx.executeAction, ctx);
        }
      };
    },

  };
};
