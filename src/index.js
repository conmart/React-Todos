import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import TodosContainer from './containers/TodosContainer';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/todos" component={TodosContainer}>
      </Route>
    </Route>
  </Router>
), document.body)
