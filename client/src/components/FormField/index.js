import React from 'react';

const FormField = ({ formData, change, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div className="formBlock">
            {showLabel()}
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            />
            {showError()}
          </div>
        );
        break;

      case 'select':
        formTemplate = (
          <div className="formBlock">
            {showLabel()}
            <select
              value={formData.value}
              name={formData.name}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            >
              {formData.config.options.map((option, i) => {
                return (
                  <option key={i} value={option.id}>
                    {option.value}
                  </option>
                );
              })}
            </select>
            {showError()}
          </div>
        );
        break;

      case 'textarea':
        formTemplate = (
          <div className="formBlock">
            {showLabel()}
            <textarea
              name=""
              id=""
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            />
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  const showError = () => {
    let errorMessage = null;
    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const showLabel = () =>
    formData.showLabel ? (
      <div className="label_inputs">{formData.config.label}</div>
    ) : null;

  return renderTemplate();
};

export default FormField;
