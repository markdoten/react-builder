var debug = require('debug')('NavigatePlugin');
var decodeQS = require('mout/queryString/decode');
var encodeQS = require('mout/queryString/encode');
var merge = require('mout/object/merge');
var navigateAction = require('fluxible-router').navigateAction;
var RouteStore = require('fluxible-router').RouteStore;

/**
 * @param {Object} context
 * @return {function(string, Object, function())}
 */
function getNavigateFunction(context) {
  var routeStore = context.getStore(RouteStore);

  return function navigate (route, options) {
    var currentNavigate = routeStore.getCurrentNavigate();
    var currentQS = currentNavigate ? currentNavigate.url.replace(/^.+\?/, '') : '';
    var url = routeStore.makePath(route, options.params);

    if (options.mergeExistingQuery && options.query) {
      options.query = merge(decodeQS(currentQS), options.query);
    }

    if (options.query) {
      url += encodeQS(options.query);
    }

    var payload = {
      url: url
    };

    if ('preserveScrollPosition' in options) {
      payload.preserveScrollPosition = options.preserveScrollPosition;
    }

    debug('Navigating to %s', url);
    return context.executeAction(navigateAction, payload);
  };
}

module.exports = function navigatePlugin () {
  return {
    name: 'NavigatePlugin',

    /**
     * Called to plug the FluxContext
     * @returns {Object}
     */
    plugContext: function plugContext() {
      return {
        /**
         * Provides full access to the router in the action context
         * @param {Object} actionContext
         */
        plugActionContext: function plugActionContext(actionContext) {
          actionContext.navigate = getNavigateFunction(actionContext);
        },

        /**
         * Provides access to create paths by name
         * @param {Object} componentContext
         */
        plugComponentContext: function plugComponentContext(componentContext) {
          componentContext.navigate = getNavigateFunction(componentContext);
        }
      };
    }
  };
};
