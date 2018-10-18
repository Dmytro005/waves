import React from 'react';
import Button from 'components/Button';

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
          <div className="right" />
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
