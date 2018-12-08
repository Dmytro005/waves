import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from 'hoc/User';

import FormField from 'components/FormField';
import FileUpload from 'utils/components/fileUpload';

import {
  update,
  submit,
  populateOptionFields,
  clearFields
} from 'utils/form/formActions';
import { frets } from 'utils/form/fixedCategories';
import { triggerInvalidFields } from 'utils/form/formValidations';
import Button from 'components/Button';

import { getBrands, getWoods, addProduct } from 'actions/products_actions';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class AddProduct extends Component {
  state = {
    formError: true,
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
          label: 'Frets',
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
      },
      images: {
        element: 'fileUpload',
        value: [],
        validation: {
          required: true
        },
        config: {
          name: 'upload_file'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  };

  async componentWillMount() {
    const formData = this.state.formData;

    await this.props.dispatch(getBrands()).then(() => {
      const newformData = populateOptionFields(
        formData,
        this.props.products.brands,
        'brand'
      );
      this.updateFormData(newformData);
    });

    await this.props.dispatch(getWoods()).then(() => {
      const newformData = populateOptionFields(
        formData,
        this.props.products.woods,
        'wood'
      );
      this.updateFormData(newformData);
    });

    const newformData = populateOptionFields(formData, frets, 'frets');
    this.updateFormData(newformData);
  }

  updateFormData(formData) {
    this.setState({
      formData
    });
  }
  updateForm(element) {
    const newFormData = update(element, this.state.formData, 'AddProduct');
    this.setState({
      formData: newFormData
    });
  }

  submitForm = async event => {
    event.preventDefault();
    this.setState({ formError: false });
    const { formIsValid, data } = submit(this.state.formData);
    if (formIsValid) {
      const response = await addProduct(data);

      if (response.success) {
        this.setState({ formSuccess: true });
        this.setState({
          formData: clearFields(this.state.formData, 'AddProduct')
        });
        setTimeout(() => {
          this.setState({ formSuccess: false });
        }, 3000);
      } else {
        this.setState({
          formError: response.data.error
        });
      }
    } else {
      triggerInvalidFields(data);
      this.setState({ formError: 'Form validation failed' });
    }
  };

  imagesHandler(images) {
    const newFormData = {
      ...this.state.formData
    };

    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formData: newFormData
    });
  }

  render() {
    return (
      <User>
        <div>
          <h1>
            Add product
            <form onSubmit={e => this.submitForm(e)}>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'description'}
                formData={this.state.formData.description}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'price'}
                formData={this.state.formData.price}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'brand'}
                formData={this.state.formData.brand}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider" />
              <FormField
                id={'shipping'}
                formData={this.state.formData.shipping}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'available'}
                formData={this.state.formData.available}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider" />
              <FormField
                id={'wood'}
                formData={this.state.formData.wood}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'frets'}
                formData={this.state.formData.frets}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider" />
              <FormField
                id={'publish'}
                formData={this.state.formData.publish}
                change={element => this.updateForm(element)}
              />
              <Button
                type="button"
                onClick={e => this.submitForm(e)}
                title="Add product"
              />
              {this.state.formSuccess ? (
                <div className="form_success">
                  Product was successfuly added
                </div>
              ) : null}
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
