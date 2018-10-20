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
export const validateField = element => {
  let err = [true, ''];

  if (element.validation.email) {
    const valid = EMAIL_REGEX_PATTERN.test(element.value);
    const message = `${!valid ? 'Enter the valid email' : ''}`;
    err = !valid ? [valid, message] : err;
  }

  if (element.validation.password) {
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

/**
 * Triggers inputs blur event to show ther errors
 * @param {Array} fields Array of invalid fields names
 * example
  ["email_input", "password_input"]
 */
export const triggerInvalidFields = fields => {
  const l = fields.length;
  async function findAndEmmit(fieldName) {
    const input = await document.querySelector(`input[name="${fieldName}"]`);
    input.dispatchEvent(new Event('blur'));
  }

  for (let index = 0; index < l; index++) {
    findAndEmmit(fields[index]);
  }
};
