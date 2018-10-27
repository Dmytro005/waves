import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import FormField from 'components/FormField';
import Button from 'components/Button';

import { registerUser } from 'actions/user_actions';

import { update, submit } from 'utils/form/formActions';
import { triggerInvalidFields } from 'utils/form/formValidations';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Register extends Component {
  state = {
    formError: null,
    formSuccess: null,
    loading: false,
    formData: {
      firstName: {
        element: 'input',
        value: '',
        config: {
          name: 'firstName_input',
          type: 'text',
          placeholder: 'Enter your first name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastName: {
        element: 'input',
        value: '',
        config: {
          name: 'lastName_input',
          type: 'text',
          placeholder: 'Enter your last name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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
      },
      repeatPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'repeatPassword_input',
          type: 'password',
          placeholder: 'Repeat your password'
        },
        validation: {
          required: true,
          password: true,
          sameAs: 'password'
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
  async submitForm(e) {
    e.preventDefault();
    this.setState({ formError: null });
    const { formIsValid, data } = submit(this.state.formData);
    if (formIsValid) {
      await this.props.dispatch(registerUser(data));
      if (this.props.user.registerSuccess) {
        this.setState({ formSuccess: true });
        setTimeout(() => {
          this.props.history.push('/register_login');
        }, 3000);
      } else {
        this.setState({
          formError: 'This email is already using'
        });
      }
    } else {
      triggerInvalidFields(data);
    }
  }
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={e => this.submitForm(e)}>
                <h2>Personal info</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      ield
                      id={'firstName'}
                      formData={this.state.formData.firstName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'lastName'}
                      formData={this.state.formData.lastName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <FormField
                  id={'email'}
                  formData={this.state.formData.email}
                  change={element => this.updateForm(element)}
                />
                <h2>Verify password</h2>
                <FormField
                  id={'password'}
                  formData={this.state.formData.password}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'repeatPassword'}
                  formData={this.state.formData.repeatPassword}
                  change={element => this.updateForm(element)}
                />

                {this.state.formError ? (
                  <div className="error_label">{this.state.formError}</div>
                ) : null}

                <Button
                  type="button"
                  onClick={e => this.submitForm(e)}
                  title="Register"
                  addStyles={{
                    margin: '10px 0 0 0'
                  }}
                />
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert text-center">
            <h2>Congratulations!</h2>
            <div>You`re account was successfully created</div>
            <p>Soon you will be redirected to login</p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Register);
