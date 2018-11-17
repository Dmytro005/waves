import React, { Component } from 'react';

class ShopHeader extends Component {
  render() {
    return (
      <div className="page_top">
        <div className="container">{this.props.title}</div>
      </div>
    );
  }
}

export default ShopHeader;
