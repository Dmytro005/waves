import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import { addToCart } from 'actions/user_actions';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const ProductInfo = props => {
  const { details } = props;

  const showProdTags = details => (
    <div className="product_tags">
      {details.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}

      {details.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Availible</div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not Availible</div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );

  const addToCartHandle = id => {
    props.dispatch(addToCart(id));
  };

  const showProdActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <Button
          type="add_to_cart_link"
          runAction={() =>
            props.user && props.user.isAuthed
              ? addToCartHandle(detail._id)
              : alert('You need to log in')
          }
        />
      </div>
    </div>
  );

  const showProdSpecs = details => (
    <div className="product_specefications">
      <h2>Specs:</h2>
      <div className="item">
        <strong>Frets: </strong> {details.frets}
      </div>
      <div className="item">
        <strong>Wood: </strong> {details.wood.name}
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {details.brand.name} {details.name}
      </h1>
      <p>{details.description}</p>
      {showProdTags(details)}
      {showProdActions(details)}
      {showProdSpecs(details)}
    </div>
  );
};

export default connect(mapStateToProps)(ProductInfo);
