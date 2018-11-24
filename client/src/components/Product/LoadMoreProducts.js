import React from 'react';

import ProcutsView from 'components/Product/ProductsView.js';

const LoadMoreProducts = props => {
  return (
    <div>
      <ProcutsView products={props.products} grid={props.grid} />
      {props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.laodMore()}>Load more</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMoreProducts;
