import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

function Settings(props) {
  function signOut() {
    window.localStorage.removeItem("prioritacts_google_access_token");
    window.localStorage.removeItem("prioritacts_people_sync_token");
    window.localStorage.removeItem("prioritacts_contacts");
  }

  return (
    <div className="inSettings">
      <h1 className="pageTitle">Settings</h1>
      <div className="settingsCard">
        <Link to="/privacy" className="settingsItem">
          <span>Privacy Policy</span>
          <span className="settingsChevron" aria-hidden="true">
            ›
          </span>
        </Link>
        <a href="/" onClick={signOut} className="settingsItem isDanger">
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  );
}

export default Settings;
