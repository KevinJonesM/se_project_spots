function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
}

function validateInput(input, config) {
  const errorElement = input.closest("label").querySelector(config.errorSelector);

  if (!input.validity.valid) {
    showInputError(input, errorElement, config);
  } else {
    hideInputError(input, config);
  }
}

function showInputError(input, errorElement, config) {
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, config) {
  const errorElement = input.closest("label").querySelector(config.errorSelector);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  if (isValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function resetValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => hideInputError(input, config));
  toggleButtonState(inputs, form.querySelector(config.submitButtonSelector), config);
}

document.addEventListener("DOMContentLoaded", () => {
  enableValidation(validationConfig);
});