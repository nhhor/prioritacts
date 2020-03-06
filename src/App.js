import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./App.css";

import { Switch, Route } from "react-router-dom";
import ContactList from "./ContactList";
import Settings from "./Settings";
import Footer from "./Footer";
import OAuth from "./OAuth";

import { loadContacts } from './actions/loadContacts';

class App extends React.Component {

  simpleAction = (event) => {
   this.props.loadContacts();
  }

  render() {
    return (
      <div className="App">
        <div className="OAuth">
          <OAuth />
        </div>

        <div className="appBody">



<button onClick={this.simpleAction}>Test redux action</button>
  <pre>
   {
    JSON.stringify(this.props)
   }
  </pre>

          <Switch>
            <Route exact path="/" render={() => (<ContactList />)} />
          </Switch>
          <Switch>
            <Route path="/Settings" render={() => <Settings />} />
          </Switch>
        </div>

        <div className="appFooter">
          <Footer />
        </div>


        <style>{`
            .OAuth {
              position: fixed;
              bottom: 0px;
              z-index: 99;
              width: 100%;
              background-color: red;
            }

            .appBody {
              position: fixed;
              overflow: auto;
              top: 0px;
              height: 93%;
              width: 100%;
            }

            .appFooter {
              position: fixed;
              overflow: hidden;
              bottom: 0px;
              width: 100%;
              height: 50px;
            }

            `}</style>
        </div>
      );
    }
  }



  const mapStateToProps = state => ({
   ...state
 });

  const mapDispatchToProps = dispatch => ({
 loadContacts: () => dispatch(loadContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
