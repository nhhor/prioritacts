import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContactList from './ContactList';
import Settings from './Settings';
import Footer from './Footer';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [{name: 'noah', phone: 12345}],
      contactSelected: null
    };
  }

  render() {
    return (
      <div className="App">

        <div className="appBody">
          <Switch>
            <Route exact
              path='/'
              render={()=><ContactList
                />} />
            </Switch>
          <Switch>
            <Route
              path='/Settings'
              render={()=><Settings
                />} />
            </Switch>
          </div>

          <div className="appFooter">
            <Footer />
          </div>

          <style>{`
              .appBody {
                position: absolute;
                overflow: auto;
                top: 0px;
                height: 95%;
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

    export default App;
