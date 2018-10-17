import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from 'hoc/Layout';
import Home from './components/Home';

const Routes = props => {
  return (
    <Switch>
      <Layout>
        <Route path="/" exact component={Home} />
      </Layout>
    </Switch>
  );
};

export default Routes;
