import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from 'hoc/User';
import CartDetails from 'components/Product/CartDetails.js';

import { getCartItems, removeCartItem } from 'actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';

import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import Paypal from 'components/Button/paypal';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

//

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

  removeFromCart = async id => {
    await this.props.dispatch(removeCartItem(id));
    if (this.props.user.cartDetail.length === 0) {
      this.setState({ showTotal: false });
    } else {
      this.calculateTotal(this.props.user.cartDetail);
    }
  };

  transactionError = data => {
    console.log('Some error occured when processing your order: ', data);
  };

  transactionCancel = data => {
    console.log('Transaction cancel');
  };

  transactionSuccess = data => {
    /**
     * Example success data response
     * 
      address: {
        city: "Toronto",
        country_code: "CA",
        line1: "1 Maire-Victorin",
        postal_code: "M5A 1E1",
        recipient_name: "Business Admin",
        state: "Ontario"
      },
      cancelled: false,
      email: "BA@paypal.com",
      paid: true,
      payerID: "2QT2CD4XMVMNA",
      paymentID: "PAYID-LRHBAEI26P193062U759074D",
      paymentToken: "EC-3PW165827K288103M",
      returnUrl: "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LRHBAEI26P193062U759074D&token=EC
     */

    this.setState({
      showTotal: false,
      showSuccess: true
    });

    console.log(data);
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
                  <FontAwesomeIcon icon={faSmile} />
                  <div>THANK YOU</div>
                  <div>YOUR ORDER IS NOW COMPLETED</div>
                </div>
              </div>
            ) : (
              this.showNoItemsMessage()
            )}

            {this.state.showTotal ? (
              <div className="paypal_button_conteiner">
                <Paypal
                  toPay={this.state.total}
                  transactionError={data => this.transactionError(data)}
                  transactionCancel={data => this.transactionCancel(data)}
                  transactionSuccess={data => this.transactionSuccess(data)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default connect(mapStateToProps)(UserCart);
