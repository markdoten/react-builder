var ApplicationStore = require('../stores/Application');
var debug = require('debug')('components/application');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var handleHistory = require('fluxible-router').handleHistory;
var provideContext = require('fluxible/addons/provideContext');
var React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Application = React.createClass({
  mixins: [ FluxibleMixin ]

  , statics: {
    storeListeners: [ ApplicationStore ]
  }

  , getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  }

  , onChange: function () {
    this.setState(this.getStore(ApplicationStore).getState());
  }
 
  , render: function () {
    var Page = require('./pages/' + this.props.currentRoute.get('page') + '.jsx');
    return (
      <div className="nice">
        <div className="nice-app">
          <Page context={this.props.context} />
        </div>
      </div>
    );
  }
});

Application = handleHistory(Application);
Application = provideContext(Application);

module.exports = Application;
