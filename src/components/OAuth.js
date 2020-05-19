/* global gapi */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadContacts, setToken } from "./../actions";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
// Array of API discovery doc URLs for APIs used by the quickstart:
const DISCOVERY_DOCS = "https://people.googleapis.com/$discovery/rest?version=v1";
// Authorization scopes required by the API; multiple scopes can be included, separated by spaces:
const SCOPE = "https://www.googleapis.com/auth/contacts";


class OAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      googleUser: "",
      err: null,
      access_token: null,
    };
  };

  componentDidMount() {
    const successCallback = this.onSuccess.bind(this);
    window.gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        apiKey: `${API_KEY}`,
        discoveryDocs: `${DISCOVERY_DOCS}`,
        client_id: `${CLIENT_ID}`,
        scope: `${SCOPE}`,
      });
      // NEXT TWO ROWS WERE IN FUNC ABOVE:
      // ux_mode: 'redirect',
      // redirect_uri: 'https://prioritacts.netlify.app/',

      this.auth2.then(() => {
        console.log("TRIGGER on init");
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get()
        });
      });

    });

    window.gapi.load("signin2", () => {
      var opts = {
        width: 200,
        height: 50,
        onsuccess: successCallback,
      };
      gapi.signin2.render("loginButton", opts);
    });

  }

  onSuccess(props) {
    console.log(`TRIGGER on success.    🎩${this.auth2.currentUser.get().getBasicProfile().getName()}👠    now signed in.`);
    this.setState({
      isSignedIn: true,
      err: null,
      googleUser: this.auth2.currentUser.get().getBasicProfile().getName(),
      access_token: this.auth2.currentUser.get().getAuthResponse().access_token,
    });

    const request = async () => {
      const response = await fetch(
        `https://people.googleapis.com/v1/people/me/connections?access_token=${this.state.access_token}&personFields=birthdays,emailAddresses,events,metadata,names,phoneNumbers,photos,userDefined&pageSize=200`
      );
      const { dispatch } = this.props;

      const json = await response.json();
      const items = json.connections;
      dispatch(loadContacts(items));

      const access_token = this.auth2.currentUser.get().getAuthResponse().access_token
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
              #loginButton {
                width: 200px;
                // height: 60px;
                border: none;
                margin: 0px;
                padding: 0px;
              }


              `}</style>
          </div>
        );
      }
    }

    const mapStateToProps = (state) => {
    return {
      ...state
    }
  }

    OAuth = connect(mapStateToProps)(OAuth);

    export default OAuth;
