import React from "react";
import { connect } from "react-redux";

import "./../App.css";

import { Switch, Route, Link } from "react-router-dom";
import ContactList from "./ContactList";
import Settings from "./Settings";
import Footer from "./Footer";
import OAuth from "./OAuth";
import Privacy from "./Privacy";

class App extends React.Component {
  simpleAction = (event) => {
    this.props.loadContacts();
  };

  render() {
    const contactList = Array.isArray(this.props.contactsReducer)
      ? this.props.contactsReducer
      : [];
    const token =
      typeof this.props.tokenReducer === "string"
        ? this.props.tokenReducer
        : "";

    return (
      <div className="App">
        <header className="appHeader">
          <Link to="/" className="appBrand">
            <img
              src="/PrioritactsSample_ByTailorBrands.png"
              alt=""
              className="appBrandLogo"
            />
            <span>Prioritacts</span>
          </Link>
        </header>

        <main className="appBody">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <ContactList contactList={contactList} accessToken={token} />
              )}
            />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/privacy" render={() => <Privacy />} />
          </Switch>
        </main>

        <Route
          render={({ location }) => (
            <div
              className="OAuth"
              hidden={location.pathname.startsWith("/privacy")}
            >
              <OAuth />
            </div>
          )}
        />

        <nav className="appFooter">
          <Footer />
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(App);
