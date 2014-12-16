/** @jsx React.DOM */
"use strict";

var FBInfo = React.createClass({
  getInitialState: function() {
    return { authResponse: {} };
  },

  render: function() {
    var logged_in;
    if(this.getState().authResponse) {
      logged_in = <div>Logged in!</div>;
    } else {
      logged_in = <div>Not Logged In</div>;
    }
    return (
      <div className="large-12 columns">
        {logged_in}
      </div>
    );
  }
});

var fbInfo = React.renderComponent(<FBInfo/>, document.getElementById('fb_area') );

function onFBLogin(response) {
  fbInfo.setState({authResponse: response});
}
