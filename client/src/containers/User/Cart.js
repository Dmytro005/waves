import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from 'hoc/User';
import CartDetails from 'components/Product/CartDetails.js';

import { getCartItems } from 'actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let user = this.props.user;

    if (user.cart && user.cart.length > 0) {
      let productIds = user.cart.reduce((acc, cartItem) => {
        acc.push(cartItem.id);
        return acc;
      }, []);

      this.props.dispatch(getCartItems(productIds, user.cart));
    }
  }

  removeFromCart = id => {
    console.log('idto remove', id);
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h2>My cart</h2>
          <div className="user_cart">
            <CartDetails
              products={this.props.user}
              type="cart"
              removeItem={id => {
                this.removeFromCart(id);
              }}
            />
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default connect(mapStateToProps)(UserCart);
