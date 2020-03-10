/* global gapi */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadContacts, setToken } from "./../actions";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const API_KEY = process.env.REACT_APP_API_KEY;

const DISCOVERY_DOCS = "https://people.googleapis.com/$discovery/rest?version=v1";

const SCOPE = "https://www.googleapis.com/auth/contacts";


class OAuth extends Component {
  constructor(props) {
    super(props);
    console.log('LOG FROM OAuth: super(props)', props)

    this.state = {
      isSignedIn: false,
      googleUser: "",
      err: null,
      access_token: null,
    };
  }


  componentDidMount() {
    const successCallback = this.onSuccess.bind(this);
    window.gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        apiKey: `${API_KEY}`,
        discoveryDocs: `${DISCOVERY_DOCS}`,
        client_id: `${CLIENT_ID}`,
        scope: `${SCOPE}`
      });

      // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))

      this.auth2.then(() => {
        console.log("TRIGGER on init");
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get()
        });
      });
    });

    window.gapi.load("signin2", function() {
      // Method 3: render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        client_id: `${CLIENT_ID}`,
        onsuccess: successCallback
      };
      gapi.signin2.render("loginButton", opts);
    });
  }

  onSuccess(props) {
    console.log(`TRIGGER on success.    🎩${this.auth2.currentUser.get().Qt.Ad}👠    now signed in.`);
    this.setState({
      isSignedIn: true,
      err: null,
      googleUser: this.auth2.currentUser.get().Qt.Ad,
      access_token: this.auth2.currentUser.get().uc.access_token,
    });

    const request = async () => {
      const response = await fetch(
        `https://people.googleapis.com/v1/people/me/connections?access_token=${this.state.access_token}&personFields=birthdays,emailAddresses,events,metadata,names,phoneNumbers,photos,userDefined&pageSize=200`
      );
      const { dispatch } = this.props;

      const json = await response.json();
      const items = json.connections;
      dispatch(loadContacts(items));

      const access_token = this.auth2.currentUser.get().uc.access_token
      dispatch(setToken(access_token));
    };
    request();
  }

  onLoginFailed(err) {
    this.setState({
      isSignedIn: false,
      error: err
    });
  }

  getContent() {
    if (this.state.isSignedIn) {
      document.querySelector(".OAuthInline").style.display = "none";
      return <p>Hello {this.state.googleUser}, you are now signed in!</p>;
    } else {
      return (
        <div>
        <p>You are not signed in. Click here to sign in.</p>
        <button id="loginButton">Login with Google</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="OAuthInline">
      {this.getContent()}
      <style>{`
        .OAuthInline {
          position: fixed;
          bottom: 0px;
          z-index: 99;
          width: 100%;
          background-color: red;
        }


        `}</style>
        </div>
      );
    }
  }

  OAuth = connect()(OAuth);

  export default OAuth;
