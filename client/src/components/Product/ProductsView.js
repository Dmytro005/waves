import React from 'react';
import Card from 'components/Product/Card';

const ProductsView = ({ products, grid }) => {
  const renderCards = () =>
    products
      ? products.map((card, i) => <Card key={i} {...card} grid={grid} />)
      : null;

  return (
    <div className="card_block_shop">
      <div>
        {products ? (
          products.length === 0 ? (
            <div className="no_result">Sorry, no result was found</div>
          ) : null
        ) : null}
        {renderCards(products)}
      </div>
    </div>
  );
};

export default ProductsView;
