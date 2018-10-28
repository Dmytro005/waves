import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from 'hoc/Auth';
import Layout from 'hoc/Layout';
import Home from './containers/Home';
import RegisterLogin from './containers/RegisterLogin';
import Register from './containers/RegisterLogin/register';
import Dashboard from './containers/Dashboard';

const Routes = props => {
  return (
    <Switch>
      <Layout>
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Layout>
    </Switch>
  );
};

export default Routes;
