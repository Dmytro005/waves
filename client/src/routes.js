import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from 'hoc/Auth';
import Layout from 'hoc/Layout';

import Home from './containers/Home';
import RegisterLogin from './containers/RegisterLogin';
import Register from './containers/RegisterLogin/register';
import Shop from './containers/Shop';

import Dashboard from './containers/User';
import UserCart from './containers/User/Cart';
import AddProduct from './containers/User/Admin/AddProduct';
import ManageCategories from './containers/User/Admin/ManageCategories';
import ProductsPage from './containers/ProductPage';

const Routes = props => {
  return (
    <Switch>
      <Layout>
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route
          path="/admin/add-product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage-categories"
          exact
          component={Auth(ManageCategories, true)}
        />

        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />

        <Route path="/product/:id" exact component={Auth(ProductsPage, null)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Layout>
    </Switch>
  );
};

export default Routes;
