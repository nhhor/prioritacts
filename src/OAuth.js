/* global gapi */
import React, { Component } from "react";

const CLIENT_ID = "xxx";

const API_KEY = "xxx";

const DISCOVERY_DOCS =
  "https://people.googleapis.com/$discovery/rest?version=v1";

const SCOPE = "https://www.googleapis.com/auth/contacts";

class OAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      googleUser: "",
      2: []
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
        console.log("on init");

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

  onSuccess() {
    console.log("on success");
    console.log("this.auth2: ", this.auth2);
    this.setState({
      isSignedIn: true,
      err: null
    });
    var googleUser = this.auth2.currentUser.get().Qt.Ad;
    this.setState({
      googleUser: this.auth2.currentUser.get().Qt.Ad
    });
    console.log("users info: ", googleUser);

    var access_token = this.auth2.currentUser.get().uc.access_token;
    console.log("access_token: ", access_token);

    const request = async () => {
      console.log(`Bearer ${this.auth2.currentUser.get().uc.access_token}`);

      const response = await fetch(
        `https://people.googleapis.com/v1/people/me/connections?access_token=${
          this.auth2.currentUser.get().uc.access_token
        }&personFields=names`
      );
      const json = await response.json();
      let items = json.connections;
      console.log("!!!!!", json);
      console.log("?????", items);

      this.setState({
        contacts: items
      });
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

export default OAuth;
