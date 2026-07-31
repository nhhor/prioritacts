import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){

  return (
    <div className="inFooter">
      <p className=""><Link to="/">All Contacts</Link> | <Link to="/Settings">Settings</Link></p>
      <style>{`
          .inFooter {
            padding-top: 10px;
            height: 100%;
            overflow: hidden;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-top: 4px ridge grey;
            background: rgb(179,179,179);
            background: linear-gradient(0deg, rgba(179,179,179,0.99) 0%, rgba(179,179,179,0.99) 99%, rgba(179,179,179,0.33) 100%);
          }

          .inFooter p {
            margin: 0px;
          }
          `}</style>
      </div>
    );
  }

  export default Footer;
