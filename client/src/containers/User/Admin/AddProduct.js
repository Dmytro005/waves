import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from 'hoc/User';

import FormField from 'components/FormField';
import { update, submit } from 'utils/form/formActions';
import { triggerInvalidFields } from 'utils/form/formValidations';

import {
  getBrands,
  getWoods,
  getProductsToShop
} from 'actions/products_actions';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class AddProduct extends Component {
  state = {
    formError: null,
    formSuccess: null,
    loading: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter product name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brands_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Product shipping',
          name: 'shipping_input',
          options: [
            {
              key: true,
              value: 'Yes'
            },
            {
              key: false,
              value: 'No'
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available in stock',
          name: 'available_input',
          options: [
            {
              key: true,
              value: 'Yes'
            },
            {
              key: false,
              value: 'No'
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets material',
          name: 'frets_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            {
              key: true,
              value: 'Public'
            },
            {
              key: false,
              value: 'Hidden'
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  updateForm(element) {
    const newFormData = update(element, this.state.formData, 'AddProduct');
    this.setState({
      formData: newFormData
    });
  }

  submitForm = async event => {
    event.preventDefault();
    this.setState({ formError: null });
    const { formIsValid, data } = submit(this.state.formData);
    if (formIsValid) {
      // await this.props.dispatch(loginUser(data));
      if (this.props.user.loginSuccess) {
        // this.props.history.push('/user/dashboard');
      } else {
        this.setState({
          formError: this.props.user.message
        });
      }
    } else {
      triggerInvalidFields(data);
    }
  };

  render() {
    return (
      <User>
        <div>
          <h1>
            Add product
            <form onSubmit={e => this.submitForm(e)}>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">{this.state.formError}</div>
              ) : null}
            </form>
          </h1>
        </div>
      </User>
    );
  }
}

export default connect(mapStateToProps)(AddProduct);
