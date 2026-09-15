import React, { Component } from "react";
import { connect } from "react-redux";
import { loadContacts, setToken } from "./../actions";

const CLIENT_ID = import.meta.env.REACT_APP_CLIENT_ID;
const GOOGLE_GSI_INIT_KEY = "__prioritacts_google_gsi_init__";
const SCOPE = "https://www.googleapis.com/auth/contacts";
const PEOPLE_SYNC_TOKEN_KEY = "prioritacts_people_sync_token";
const GOOGLE_ACCESS_TOKEN_KEY = "prioritacts_google_access_token";

class OAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      googleUser: "",
      err: null,
      access_token: null,
    };
    this.tokenClient = null;
  }

  componentDidMount() {
    this.initializeGoogleClient();

    const savedContacts = window.localStorage.getItem("prioritacts_contacts");
    if (savedContacts) {
      try {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts) && parsedContacts.length > 0) {
          const { dispatch } = this.props;
          dispatch(loadContacts(parsedContacts));
          this.setState({
            isSignedIn: true,
            googleUser: "Google user",
          });
        }
      } catch (error) {
        console.warn("Unable to restore saved contacts:", error);
      }
    }

    const savedToken = window.localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY);
    if (savedToken) {
      this.setState({
        isSignedIn: true,
        googleUser: "Google user",
        access_token: savedToken,
      });
      this.loadContacts(savedToken, true);
    }
  }

  componentWillUnmount() {
    if (window[GOOGLE_GSI_INIT_KEY]) {
      window[GOOGLE_GSI_INIT_KEY] = false;
    }
  }

  initializeGoogleClient() {
    if (window[GOOGLE_GSI_INIT_KEY]) {
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      window.setTimeout(() => this.initializeGoogleClient(), 250);
      return;
    }

    if (!CLIENT_ID) {
      this.setState({
        err: "Missing Google Client ID. Add REACT_APP_CLIENT_ID to your .env file.",
      });
      return;
    }

    window[GOOGLE_GSI_INIT_KEY] = true;

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: (response) => {
        if (response.error) {
          this.setState({
            isSignedIn: false,
            err: response.error,
          });
          return;
        }

        const accessToken = response.access_token;
        window.localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, accessToken);

        this.setState({
          isSignedIn: true,
          err: null,
          access_token: accessToken,
          googleUser: "Google user",
        });

        this.loadContacts(accessToken);
      },
    });

    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
      loginButton.onclick = () => {
        if (this.tokenClient) {
          this.tokenClient.requestAccessToken();
        }
      };
    }
  }

  async loadContacts(token, isRestoredSession = false) {
    const { dispatch } = this.props;

    try {
      const syncToken = window.localStorage.getItem(PEOPLE_SYNC_TOKEN_KEY);
      const params = new URLSearchParams({
        personFields:
          "birthdays,emailAddresses,events,metadata,names,phoneNumbers,photos,userDefined",
        pageSize: "1000",
        requestSyncToken: "true",
      });

      if (syncToken) {
        params.set("syncToken", syncToken);
      }

      const response = await fetch(
        `https://people.googleapis.com/v1/people/me/connections?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 429) {
        if (isRestoredSession) {
          window.localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
          this.initializeGoogleClient();
        }
        this.setState({
          isSignedIn: false,
          err: "Google People API quota exceeded. Please wait a bit and retry.",
        });
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        if (
          response.status === 400 &&
          /EXPIRED_SYNC_TOKEN|expired sync token/i.test(errorText)
        ) {
          window.localStorage.removeItem(PEOPLE_SYNC_TOKEN_KEY);
          return this.loadContacts(token, isRestoredSession);
        }

        if (isRestoredSession) {
          window.localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
          this.initializeGoogleClient();
        }

        throw new Error(
          `People API request failed with status ${response.status}: ${errorText}`,
        );
      }

      const json = await response.json();
      const hasConnections = Object.prototype.hasOwnProperty.call(
        json,
        "connections",
      );

      if (!hasConnections) {
        dispatch(setToken(token));
        window.localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, token);
        this.setState({
          isSignedIn: true,
          err: null,
          access_token: token,
        });
        return;
      }

      const items = Array.isArray(json.connections) ? json.connections : [];

      if (json.nextSyncToken) {
        window.localStorage.setItem(PEOPLE_SYNC_TOKEN_KEY, json.nextSyncToken);
      }

      window.localStorage.setItem(
        "prioritacts_contacts",
        JSON.stringify(items),
      );
      dispatch(loadContacts(items));
      dispatch(setToken(token));
      window.localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, token);
      this.setState({
        isSignedIn: true,
        err: null,
        access_token: token,
      });
    } catch (error) {
      if (isRestoredSession) {
        window.localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
        this.initializeGoogleClient();
      }
      this.setState({
        isSignedIn: false,
        googleUser: "",
        err: error.message,
      });
    }
  }

  getContent() {
    if (this.state.isSignedIn) {
      const oauthInline = document.querySelector(".OAuthInline");
      if (oauthInline) {
        oauthInline.style.display = "none";
      }
      return <p>Hello {this.state.googleUser}, you are now signed in!</p>;
    }

    return (
      <div>
        <p>You are not signed in. Click here to sign in.</p>
        <button id="loginButton" type="button">
          Login with Google
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="OAuthInline">
        {this.getContent()}
        {this.state.err ? <p>{String(this.state.err)}</p> : null}
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
    ...state,
  };
};

OAuth = connect(mapStateToProps)(OAuth);

export default OAuth;
