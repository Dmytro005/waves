import React, { Component } from 'react';

import PageTop from 'components/Header/ShopHeader';
import ProductInfo from 'components/Product/ProductInfo';
import ProductImage from 'components/Product/ProductImage';

import { connect } from 'react-redux';

import {
  clearProductDetails,
  getProductDetails
} from 'actions/products_actions';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class ProductPage extends Component {
  async componentDidMount() {
    const productId = this.props.match.params.id;
    await this.props.dispatch(getProductDetails(productId));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetails());
  }

  addToCardHandler() {}

  render() {
    return (
      <div>
        <PageTop title="Product" />
        <div className="container">
          {this.props.products.prodDetails ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <ProductImage detail={this.props.products.prodDetails} />
              </div>
              <div className="right">
                <ProductInfo
                  addToCard={() => this.addToCardHandler()}
                  details={this.props.products.prodDetails}
                />
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductPage);
