import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from 'hoc/User';

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
        return acc
      }, []);

      this.props.dispatch(getCartItems(productIds, user.cart));
    }

  }

  render() {
    return <UserLayout>
      <div>
      {this.props.user.lastName}
      </div>
      </UserLayout>;
  }
}

export default connect(mapStateToProps)(UserCart);
