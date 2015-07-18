/**
 * @fileoverview Store utility that provides methods for working with stores
 * the way that we want to.
 */

var camelCase = require('mout/string/camelCase');
var createStore = require('fluxible/addons/createStore');
var isFunction = require('mout/lang/isFunction');
var merge = require('mout/object/merge');

module.exports = {
  /**
   * Create a store with the provided config. This uses the fluxible
   * `createStore` function but does some modifications of the config first.
   * The main benefit of this is for the defaultHandler and standard dehydrate
   * and rehydrate. Of course, everything can be overridden.
   * @param cfg {Object} The store config object.
   * @return {dispatchr/addons/BaseStore} The store class.
   */
  createStore: function(cfg) {
    return createStore(merge(cfg, {
      /**
       * Sets the defaultHandler function to be called for every event.
       * @type {Object}
       */
      handlers: { 'default': 'defaultHandler' }

      /**
       * Handles all messages and determines if it should call the actual
       * handler within the current store. It builds the function name based on
       * the event name and calls it if it exists.
       *
       * Ex: An event named "THIS-EVENT" would call the "onThisEvent" handler.
       *
       * @param payload {Object} The payload of the event.
       * @param evt     {string} The name of the event.
       */
      , defaultHandler: function(payload, evt) {
        evt = evt.replace('_', '-').toLowerCase();
        var func = cfg[camelCase(['on', evt].join('-'))];
        isFunction(func) && func.call(this, payload);
      }

      /**
       * Dehydrate the content of the store so that it can be rehydrated later.
       * This is used by the html rendering on the server.
       * @return {Object} The current state of the store.
       */
      , dehydrate: function() {
        return this.getState();
      }

      /**
       * Rehydrate the store with the dehydrated state.
       * @param state {Object} The dehydrated state to load into the store.
       */
      , rehydrate: function(state) {
        for (var key in state) {
          this[key] = state[key];
        }
      }
    }));
  }
};
