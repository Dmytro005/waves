import React, { Component } from 'react';
import PaypalExpressButton from 'react-paypal-express-checkout';

class PaypalButton extends Component {
  render() {
    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
      production: ''
    };

    return (
      <div>
        <PaypalExpressButton
          env={env}
          client={client}
          currency={currency}
          total={total}
          onSuccess={this.props.transactionSuccess}
          onCancel={this.props.transactionCancel}
          onError={this.props.transactionError}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default PaypalButton;
