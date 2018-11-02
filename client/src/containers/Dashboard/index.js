import React from 'react';

import Button from 'components/Button';
import App from 'hoc/App';

const Dashboard = ({ user }) => {
  return (
    <App>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{user.lastName}</span>
            <span>{user.firstName}</span>
            <span>{user.email}</span>
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
};

export default Dashboard;
