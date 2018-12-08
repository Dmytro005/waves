const EMAIL_REGEX_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

/**
 * Validate element according to 'validation' keys
 * @param {*Object} element
 * example
 * element: 'input',
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
 */
export const validateField = (field, formData) => {
  let err = [true, ''];

  if (field.validation.email) {
    const valid = EMAIL_REGEX_PATTERN.test(field.value);
    const message = `${!valid ? 'Enter the valid email' : ''}`;
    err = !valid ? [valid, message] : err;
  }

  if (field.validation.password) {
    const valid = field.value.length >= 5;
    const message = `${!valid ? 'This field must be greater than 5' : ''}`;
    err = !valid ? [valid, message] : err;
  }

  if (field.validation.required) {
    const valid = field.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    err = !valid ? [valid, message] : err;
  }

  if (field.validation.sameAs) {
    const valid =
      field.value.trim() === formData[field.validation.sameAs].value;
    const message = `${!valid ? 'Passwords dosent match' : ''}`;
    err = !valid ? [valid, message] : err;
  }

  return err;
};

/**
 * Triggers inputs blur event to show their errors
 * @param {Array} fields Array of invalid fields names
 * example
  ["email_input", "password_input"]
 */
export const triggerInvalidFields = fields => {
  const l = fields.length;
  async function findAndEmmit(fieldName) {
    const element = await document.querySelector(`[name="${fieldName}"]`);
    element.dispatchEvent(new Event('blur'));
  }

  for (let index = 0; index < l; index++) {
    if (fields[index] !== 'upload_file') {
      findAndEmmit(fields[index]);
    }
  }
};
