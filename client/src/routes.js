import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from 'hoc/Layout';
import Home from './containers/Home';
import RegisterLogin from './containers/RegisterLogin';
import Register from './containers/RegisterLogin/register';

const Routes = props => {
  return (
    <Switch>
      <Layout>
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
      </Layout>
    </Switch>
  );
};

export default Routes;
