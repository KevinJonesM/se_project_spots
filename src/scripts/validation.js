export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    if (!form.dataset.validationSet) {
      form.dataset.validationSet = true;
      setEventListeners(form, config);
    }
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
    hideInputError(errorElement, config);
  }
}

function showInputError(input, errorElement, config) {
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

export function toggleButtonState(inputs, button, config) {
  if (!button) return;

  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  button.classList.toggle(config.inactiveButtonClass, !isValid);
  button.disabled = !isValid;
}

export function resetValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    const errorElement = input.closest("label").querySelector(config.errorSelector);
    hideInputError(errorElement, config);
  });

  toggleButtonState(inputs, form.querySelector(config.submitButtonSelector), config);
}
