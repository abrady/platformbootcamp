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
        <div className="button-group">
          <FBShare/>
          <FBSend/>
          <FBUIDialogButton 
            params={{
              method: 'apprequests', 
              message: 'come try my cool platform app!'
            }}
          />
        </div>
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
      <div className="panel">
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
      <button className="column small small-4 round button" onClick={this.shareLink}>
        share dialog
      </button>
    );
  }
});

var FBSend = React.createClass({
  onSendResponse: function(response) {
    console.log('send response '+JSON.stringify(response));
  },
  sendLink: function() {
    FB.ui({
      method: 'send',
      link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html'
    }, this.onSendResponse);
  },
  render: function() {
    return (
      <button className="column small small-4 round button" onClick={this.sendLink}>
        send dialog
      </button>
    );
  }
});

var FBUIDialogButton = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    responseCallback : React.PropTypes.func
  },
  onUIResponse: function(response) {
    if (!this.props.responseCallback) {
      console.log('FB.ui('+this.props.method+') response: '+JSON.stringify(response));
      return;
    }
    this.props.responseCallback(response);
  },
  invokeDialog: function() {
    FB.ui(this.props.params, this.onUIResponse);
  },
  render: function() {
    return (
      <button className="column small small-4 round button left" onClick={this.invokeDialog}>
        {this.props.params.method} dialog
      </button>
    );
  }
});


var fbInfo = React.renderComponent(
    <FBInfo/>, document.getElementById('fb_area') );

function onFBLogin(response) {
  fbInfo.setState({authResponse: response.authResponse});
}
