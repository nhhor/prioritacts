import React from 'react';
import { Link } from 'react-router-dom';

function Settings(props){

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
    });
  }

  return (
    <div className="inSettings">
    <ul>
      <li><h1><a href="/" onClick={signOut}>Sign Out</a></h1></li>
      <li><h2><Link to="/privacy">Privacy Policy</Link></h2></li>
    </ul>

    <style>{`
          .inSettings {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            background-color: rgba(179, 179, 179, .66);
            padding: 10%;
            margin: 0;
            border-radius: 10px;
            box-shadow: 2px 2px 2px black;
          }

          .inSettings h1 {
            // margin: 0px;
            text-align: left;
          }
          `}</style>
      </div>
    );
  }

  export default Settings;
