var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" media="screen" href="/dist/css/style.css" />
          <link rel="stylesheet" media="screen" href="/dist/css/bootstrap.min.css" />
        </head>
        <body>
          <div id="app" className="container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={this.props.js} defer></script>
      </html>
    );
  }
});
