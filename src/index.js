import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import './index.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { history } from './utils/history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/Dashboard' component={Dashboard} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();