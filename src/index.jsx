import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";

const loadSavedContacts = () => {
  try {
    const savedContacts = window.localStorage.getItem("prioritacts_contacts");
    if (!savedContacts) {
      return [];
    }

    const parsedContacts = JSON.parse(savedContacts);
    return Array.isArray(parsedContacts) ? parsedContacts : [];
  } catch (error) {
    console.warn("Unable to restore saved contacts from localStorage:", error);
    return [];
  }
};

const loadSavedToken = () => {
  try {
    return window.localStorage.getItem("prioritacts_google_access_token") || "";
  } catch (error) {
    console.warn("Unable to restore saved token from localStorage:", error);
    return "";
  }
};

const preloadedState = {
  contactsReducer: loadSavedContacts(),
  tokenReducer: loadSavedToken(),
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware),
);

store.subscribe(() => {
  const state = store.getState();

  window.localStorage.setItem(
    "prioritacts_contacts",
    JSON.stringify(
      Array.isArray(state.contactsReducer) ? state.contactsReducer : [],
    ),
  );

  window.localStorage.setItem(
    "prioritacts_google_access_token",
    typeof state.tokenReducer === "string" ? state.tokenReducer : "",
  );
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
