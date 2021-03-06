import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom';
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
let unsubscribe = store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
   <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'));

  unsubscribe();


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
