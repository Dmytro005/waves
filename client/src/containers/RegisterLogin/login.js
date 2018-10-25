import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from 'components/FormField';
import Button from 'components/Button';

import { update, submit } from 'utils/form/formActions';
import { triggerInvalidFields } from 'utils/form/formValidations';

import { loginUser } from 'actions/user_actions';

function mapStateToProps(state) {
  return {
    user: state.user
  };
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
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
          password: true
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

  submitForm = async event => {
    event.preventDefault();
    const { formIsValid, data } = submit(this.state.formData);
    if (formIsValid) {
      await this.props.dispatch(loginUser(data));
      console.log(this.props);
    } else {
      triggerInvalidFields(data);
    }
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

          {this.state.formError ? (
            <div className="error_label">{this.state.formError}</div>
          ) : null}

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
