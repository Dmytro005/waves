import React, { Component } from 'react';

class PageTop extends Component {
  render() {
    return (
      <div className="page_top">
        <div className="container">{this.props.title}</div>
      </div>
    );
  }
}

export default PageTop;
