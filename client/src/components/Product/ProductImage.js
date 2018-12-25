import React, { Component } from 'react';

class ProductImage extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(({ url }) => {
        lightboxImages.push(url);
      });

      this.setState({
        lightboxImages
      });

      console.log(lightboxImages);
    }
  }

  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  }

  handleLightBox = () => {};

  showThumbs = () => {
    return this.state.lightboxImages.map((item, i) => {
      if (i > 1) {
        return (
          <div
            key={i}
            onClick={() => this.handleLightBox(i)}
            className="thumb"
            style={{
              background: `url(${item}) no-repeat`
            }}
          />
        );
      }
    });
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox()}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>
      </div>
    );
  }
}

export default ProductImage;
