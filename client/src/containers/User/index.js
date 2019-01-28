import React from 'react';

import Button from 'components/Button';
import PurchaseHistory from 'components/PurchaseHistory';
import User from 'hoc/User';

const Dashboard = ({ user }) => {
  return (
    <User>
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
        {user.history && user.history.length > 0 ? (
          <div className="user_nfo_panel">
            <h1>History purchases</h1>
            <div className="user_product_block_wrapper">
              <PurchaseHistory products={user.history} />
            </div>
          </div>
        ) : null}
      </div>
    </User>
  );
};

export default Dashboard;
