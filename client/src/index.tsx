import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Login from './components/login/Login';
import { Router, Route } from './lib/router';

ReactDOM.render(
  <Router>
    <Header />
    <Route path="/login">
      <Login />
    </Route>
  </Router>,
  document.querySelector('#root')
);
