import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = props => {
  const buttons = () => {
    let template = null;

    switch (props.type) {
      case 'default':
        template = (
          <Link className="link_default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      case 'button':
        template = (
          <button
            className="link_default"
            {...props.addStyles}
            onClick={() => props.onClick}
          >
            {props.title}
          </button>
        );
        break;
      case 'add_to_cart_link':
        template = (
          <div className="add_to_cart_link" onClick={props.runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
            Add to cart
          </div>
        );
        break;
      default:
        break;
    }

    return template;
  };

  return <div>{buttons()}</div>;
};

export default Button;
