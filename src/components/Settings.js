import React from 'react';
// import { Link } from 'react-router-dom';

function Settings(props){

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
    });
  }

  return (
    <div className="inSettings">
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <h1>Settings!</h1>
      <a href="/" onClick={signOut}>LOGOUT</a>
      <style>{`
          .inSettings {
            margin: 0;
            background-color: rgba(179, 179, 179, .66);
          }

          .inSettings h1 {
            margin: 0px;
          }
          `}</style>
      </div>
    );
  }

  export default Settings;
