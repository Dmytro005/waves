import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBrands, getWoods } from 'actions/products_actions';

import PageTop from 'utils/PageTop';
import CollapseCheckbox from 'utils/CollapseCheckbox';
import CollapseRadio from 'utils/CollapseRadio';
import { frets, prices } from 'utils/form/fixedCategories';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class Shop extends Component {
  state = {
    grid: '',
    filters: {
      brands: [],
      frets: [],
      woods: [],
      price: []
    }
  };

  async componentWillMount() {
    await this.props.dispatch(getBrands());
    await this.props.dispatch(getWoods());
  }

  handleFilters = (filters, category) => {
    const newFilters = this.state.filters;
    newFilters[category] = filters;
    if (category === 'price') {
      let pricesValue = prices.find(price => price._id === filters).array;
      newFilters[category] = pricesValue;
    }
    this.setState({ filters: newFilters });
  };

  render() {
    return (
      <div>
        <PageTop title="Browse products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initialState={true}
                title="Brands"
                list={this.props.products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brands')}
              />
              <CollapseCheckbox
                initialState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initialState={false}
                title="Woods"
                list={this.props.products.woods}
                handleFilters={filters => this.handleFilters(filters, 'woods')}
              />
              <CollapseRadio
                initialState={false}
                title="Price"
                list={prices}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">harazs</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Shop);
