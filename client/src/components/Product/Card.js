import { connect } from 'react-redux';

import React, { Component } from 'react';
import MyButton from 'components/Button';

import { addToCart } from 'actions/user_actions';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_availble.png';
    }
  }

  render() {
    const { props } = this;

    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        >
          {' '}
        </div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="name">${props.price}</div>
          </div>
          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product/${props._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() =>
                  props.user && props.user.isAuthed
                    ? props.dispatch(addToCart(props._id))
                    : console.log('You need to log in')
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Card);
