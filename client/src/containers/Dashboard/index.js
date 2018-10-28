import React, { Component } from 'react';

import Button from 'components/Button';
import App from 'hoc/App';

class Dashboard extends Component {
  render() {
    return (
      <App>
        <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>name</span>
              <span>last name</span>
              <span>info</span>
            </div>
            <Button
              type="default"
              title="Edit account info"
              linkTo="/user/info"
            />
          </div>
          <div className="user_nfo_panel">
            <h1>History purchases</h1>
            <div className="user_product_block_wrapper">history</div>
          </div>
        </div>
      </App>
    );
  }
}

export default Dashboard;
