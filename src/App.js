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
      contacts: [
        {name: 'Eli', phone: '503-000-0000', id:0},
        {name: 'Leo', phone: '503-111-1111', id:1},
        {name: 'Ian', phone: '503-222-2222', id:2},
        {name: 'Max', phone: '503-333-3333', id:3},
        {name: 'Kai', phone: '503-444-4444', id:4},
        {name: 'Ali', phone: '503-555-5555', id:5},
        {name: 'Jay', phone: '503-666-6666', id:6},
        {name: 'Ari', phone: '503-777-7777', id:7},
        {name: 'Roy', phone: '503-888-8888', id:8},
        {name: 'Sam', phone: '503-999-9999', id:9},

    ],
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
              render={(props)=><ContactList
                contactList={this.state.contacts} />} />
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
                left: 1%;
                height: 95%;
                width: 99%;
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
