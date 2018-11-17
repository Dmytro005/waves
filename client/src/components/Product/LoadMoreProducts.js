import React from 'react';

import ProcutsView from 'components/Product/ProductsView.js';

const LoadMoreProducts = props => {
  return (
    <div>
      <ProcutsView products={props.products} grid={props.grid} />
    </div>
  );
};

export default LoadMoreProducts;
