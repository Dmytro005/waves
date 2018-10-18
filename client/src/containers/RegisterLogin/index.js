import React from 'react';
import Button from 'components/Button';

import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New customers</h1>
            <p>
              Lorem alskd sdfkasdnf asdfsadf d f ghdgj hj jfk jfgh ye43wgsf dg
              dfg df jdf
            </p>
            <Button
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Register customers</h2>
            <p>If you have an accont please, log-in</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
