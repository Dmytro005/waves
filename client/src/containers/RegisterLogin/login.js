import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from 'components/FormField';
import Button from 'components/Button';

const EMAIL_REGEX_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
    const newFormData = {
      ...this.state.formData
    };
    const newElement = {
      ...newFormData[element.id]
    };

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });
  }

  validate = element => {
    let err = [true, ''];

    if (element.validation.email) {
      const valid = EMAIL_REGEX_PATTERN.test(element.value);
      const message = `${!valid ? 'Enter the valid email' : ''}`;
      err = !valid ? [valid, message] : err;
    }

    if (element.validation.passowrd) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'This field must be greater than 5' : ''}`;
      err = !valid ? [valid, message] : err;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      err = !valid ? [valid, message] : err;
    }

    return err;
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({
        loading: true,
        formData: ''
      });
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
