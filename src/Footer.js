import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){

  return (
    <div className="inFooter">
    <p className=""><Link to="/">All Contacts</Link> | Search _____ | <Link to="/Settings">Settings</Link></p>
    <style>{`
      .inFooter {
        padding-top: 10px;
        height: 100%;
        overflow: hidden;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-top: 4px ridge grey;
        background-color: rgba(179, 179, 179, .99);
      }

      .inFooter p {
        margin: 0px;
      }

      `}</style>
      </div>
    );
  }

  export default Footer;
