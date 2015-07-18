var createStore = require('../util/store').createStore;
var routes = require('../configs/routes');

module.exports = createStore({
  storeName: 'ApplicationStore'

  , dehydrate: function () {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute
    };
  }

  , initialize: function(dispatcher) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routes;
  }

  , getCurrentPageName: function () {
    return this.currentPageName;
  }

  , getState: function () {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute
    };
  }

  , onChangeRouteSuccess: function (route) {
    var pageName = route.name;
    var page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) {
      return;
    }

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emitChange();
  }

  , rehydrate: function (state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
  }
});
