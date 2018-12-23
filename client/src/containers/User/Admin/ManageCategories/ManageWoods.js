import React, { Component } from 'react';

import FormField from 'components/FormField';
import { update, submit, clearFields } from 'utils/form/formActions';

import { connect } from 'react-redux';
import { getWoods, addWood } from 'actions/products_actions';

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the wood'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  showCategoryItems = () =>
    this.props.products.woods
      ? this.props.products.woods.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'woods');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldsHandler = () => {
    const newFormData = clearFields(this.state.formData, 'woods');

    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  };

  submitForm = event => {
    event.preventDefault();

    let existingWoods = this.props.products.woods;
    const { formIsValid, data } = submit(this.state.formData);
    if (formIsValid) {
      this.props.dispatch(addWood(data, existingWoods)).then(response => {
        if (response.payload.success) {
          this.setState({
            formData: clearFields(this.state.formData, 'AddWood')
          });
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getWoods());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ManageWoods);
