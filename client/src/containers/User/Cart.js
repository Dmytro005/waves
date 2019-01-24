import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from 'hoc/User';
import CartDetails from 'components/Product/CartDetails.js';

import { getCartItems } from 'actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { array } from 'prop-types';

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

  calculateTotal = cartDetail => {
    const total = cartDetail.reduce((acc, product) => {
      return (acc += product.price * product.quantity);
    }, 0);
    this.setState({ total, showTotal: true });
    console.log(this.state.total);
  };

  showNoItemsMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  async componentDidMount() {
    let user = this.props.user;

    if (user.cart && user.cart.length > 0) {
      let productIds = user.cart.reduce((acc, cartItem) => {
        acc.push(cartItem.id);
        return acc;
      }, []);

      await this.props.dispatch(getCartItems(productIds, user.cart));

      if (this.props.user.cartDetail.length > 0) {
        this.calculateTotal(this.props.user.cartDetail);
      }
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

            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total amount: ${this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div>
                <div className="cart_success">
                  <FontAwesomeIcon icon={faFrown} />
                  <div>THANK YOU</div>
                  <div>YOUR ORDER IS NOW COMPLETED</div>
                </div>
              </div>
            ) : (
              this.showNoItemsMessage()
            )}

            {this.state.showTotal ? (
              <div className="paypal_button_conteiner">Paypal</div>
            ) : null}
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default connect(mapStateToProps)(UserCart);
