import { validateField } from './formValidations';

/**
 *
 * @param {Object} element input onChange event
 * @param {Object} formData Object of form
 * @param {String} formType
 */
export const update = (element, formData, formType) => {
  const newFormData = {
    ...formData
  };
  const newElement = {
    ...newFormData[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validateField(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
};

/**
 *
 * @param {Object} formData Object of form
 */
export const submit = formData => {
  let dataToSubmit = {};
  let formIsValid = true;
  let invalidFields = [];

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
    if (!formData[key].valid) {
      invalidFields.push(formData[key].config.name);
    }
  }

  return {
    formIsValid,
    data: formIsValid ? dataToSubmit : invalidFields
  };
};

/**
 * Form data object example
 * 
 * 
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
 * 
 */
