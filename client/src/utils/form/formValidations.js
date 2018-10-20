const EMAIL_REGEX_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const validateField = element => {
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
