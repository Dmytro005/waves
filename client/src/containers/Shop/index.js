import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faThList';

import {
  getBrands,
  getWoods,
  getProductsToShop
} from 'actions/products_actions';

import PageTop from 'components/Header/ShopHeader';
import CollapseCheckbox from 'components/Collapse/CollapseCheckbox';
import CollapseRadio from 'components/Collapse/CollapseRadio';
import LoadMoreProducts from 'components/Product/LoadMoreProducts';
import { frets, prices } from 'utils/form/fixedCategories';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class Shop extends Component {
  state = {
    grid: false,
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      fret: [],
      wood: [],
      price: []
    }
  };

  async componentWillMount() {
    const { limit, skip, filters } = this.state;
    await this.props.dispatch(getBrands());
    await this.props.dispatch(getWoods());
    await this.props.dispatch(getProductsToShop(skip, limit, filters));
  }

  handleFilters = (filters, category) => {
    const newFilters = this.state.filters;
    newFilters[category] = filters;
    if (category === 'price') {
      let pricesValue = prices.find(price => price._id === filters).array;
      newFilters[category] = pricesValue;
    }

    this.showFilteredResults(newFilters);
    this.setState({ filters: newFilters });
  };

  showFilteredResults = async filters => {
    await this.props.dispatch(getProductsToShop(0, this.state.limit, filters));
    this.setState({
      skip: 0
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip
        });
      });
  };

  handleGrids = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    });
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
                handleFilters={filters => this.handleFilters(filters, 'brand')}
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
                handleFilters={filters => this.handleFilters(filters, 'wood')}
              />
              <CollapseRadio
                initialState={false}
                title="Price"
                list={prices}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? 'active' : ''} `}
                    onClick={() => this.handleGrids()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? 'active' : ''} `}
                    onClick={() => this.handleGrids()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreProducts
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  laodMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Shop);
