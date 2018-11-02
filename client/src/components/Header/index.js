import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/',
        public: true
      }
    ],

    user: [
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
    ]
  };

  showLinks = type => {
    let list = [];
    const { user } = this.props;
    console.log(user);

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

    return list.map((link, i) => this.defaultLink(link, i));
  };

  defaultLink = (item, i) => (
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  );

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

export default connect(mapStateToProps)(Header);
