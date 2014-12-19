/** @jsx React.DOM */
"use strict";

var FBInfo = React.createClass({
  getInitialState: function() {
    return { authResponse: null };
  },

  render: function() {
    var logged_in;
    if(this.state.authResponse) {
      console.log('auth response!');
      logged_in = <div>
        <FBName/>
        <FBShare/>
      </div>;
    } else {
      console.log('no auth response');
      logged_in = <div></div>;
    }
    return (
      <div className="large-12 columns">
        {logged_in}
      </div>
    );
  }
});

var FBName = React.createClass({
  getInitialState: function() {
    console.log('state');
    return { name: '' };
  },
  onGraphResponse: function(res){
    if(res.name) {
      this.setState({name: res.name});
    } else {
      console.log('api(/me) failed '+JSON.stringify(res));
    }
  },
  componentWillMount: function() {
    console.log('mount');
    FB.api('/me',this.onGraphResponse);
  },
  render: function() {
    console.log('render');
    if(!this.state.name) {
      return <div/>;
    }
    return (
      <div className="large-4 medium-4 columns">
        Hello {this.state.name}!
      </div>
    );
  }
});

var FBShare = React.createClass({
  onShareResponse: function(response) {
    console.log('share response '+JSON.stringify(response));
  },
  shareLink: function() {
    FB.ui(
      {method: 'share', href: 'https://developers.facebook.com/docs/'}, 
      this.onShareResponse
    );
  },
  render: function() {
    return (
      <div className="row">
        <div className="small-12 columns">
          <button className="column small small-2 radius button" onClick={this.shareLink}>
            Share
          </button>
        </div>
        <hr/>
      </div>
    );
  }
});

var fbInfo = React.renderComponent(
    <FBInfo/>, document.getElementById('fb_area') );

function onFBLogin(response) {
  fbInfo.setState({authResponse: response.authResponse});
}
