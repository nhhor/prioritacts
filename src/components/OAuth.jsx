import React, { Component } from "react";
import { connect } from "react-redux";
import { loadContacts, setToken } from "./../actions";
import "./OAuth.css";

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
      <>
        <div className="oauthText">
          <p className="oauthTitle">Connect your contacts</p>
          <p className="oauthSubtitle">
            Sign in with Google to see who you should reach out to next.
          </p>
        </div>
        <button id="loginButton" type="button" className="btn btn-primary">
          <svg viewBox="0 0 48 48" aria-hidden="true" className="googleG">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
          </svg>
          Sign in with Google
        </button>
      </>
    );
  }

  render() {
    return (
      <div className="OAuthInline">
        {this.getContent()}
        {this.state.err ? (
          <p className="oauthError">{String(this.state.err)}</p>
        ) : null}
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
