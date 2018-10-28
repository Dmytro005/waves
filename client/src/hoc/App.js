import React from 'react';

import { Link } from 'react-router-dom';

const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User information',
    linkTo: '/user/info'
  },
  {
    name: 'My cart',
    linkTo: '/user/cart'
  }
];

const App = props => {
  const generateLinks = links => {
    console.log(links);

    return links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>Menu</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

export default App;
