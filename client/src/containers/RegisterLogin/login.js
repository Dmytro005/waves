import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from 'components/FormField';
import Button from 'components/Button';

import { update, submit } from 'utils/form/formActions';

function mapStateToProps(state) {
  return {};
}

class Login extends Component {
  state = {
    formError: null,
    formSuccess: null,
    loading: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'passowrd_input',
          type: 'passowrd',
          placeholder: 'Enter your passowrd'
        },
        validation: {
          required: true,
          passowrd: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm(element) {
    const newFormData = update(element, this.state.formData, 'logIn');
    this.setState({
      formData: newFormData
    });
  }

  submitForm = event => {
    event.preventDefault();
    const dataToSubmit = submit(this.state.formData);
    console.log(dataToSubmit);
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={e => this.submitForm(e)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          <Button
            type="button"
            onClick={e => this.submitForm(e)}
            title="Create an account"
            addStyles={{
              margin: '10px 0 0 0'
            }}
          />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
