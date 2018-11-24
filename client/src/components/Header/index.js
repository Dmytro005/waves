import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from 'actions/user_actions';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Header extends Component {
  state = {
    page: [
      {
        name: 'My cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/register_login',
        public: false
      }
    ],

    user: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ]
  };

  cartLink = (link, i) => {
    const { user } = this.props;

    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={link.linkTo} key={i}>
          {link.name}
        </Link>
      </div>
    );
  };

  showLinks = type => {
    let list = [];
    const { user } = this.props;

    if (user) {
      type.forEach(link => {
        if (!user.isAuthed) {
          if (link.public) {
            list.push(link);
          }
        } else {
          if (link.name !== 'Log in') {
            list.push(link);
          }
        }
      });
    }

    return list.map((link, i) => {
      if (link.name !== 'My cart') {
        return this.defaultLink(link, i);
      } else {
        return this.cartLink(link, i);
      }
    });
  };

  defaultLink = (item, i) =>
    item.name === 'Log out' ? (
      <span className="ml-1 c-p" onClick={e => this.logoutHandler()} key={i}>
        {item.name}
      </span>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  logoutHandler = async () => {
    await this.props.dispatch(logoutUser());
    this.props.history.push('/');
  };

  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">Waves</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.page)}</div>
            <div className="bottom">{this.showLinks(this.state.user)}</div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Header));
