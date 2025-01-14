// Validación y comportamiento de formularios para el proyecto

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Establece los escuchadores de eventos en los formularios
function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  // Alterna el estado del botón de envío
  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });

  form.addEventListener("submit", (event) => {
    // Evita el envío si el formulario no es válido
    if (!form.checkValidity()) {
      event.preventDefault();
      inputs.forEach((input) => validateInput(input, config));
    }
  });
}

// Valida un campo de entrada específico
function validateInput(input, config) {
  const errorElement = input.closest("label").querySelector(config.errorSelector);

  if (!input.validity.valid) {
    showInputError(input, errorElement, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

// Muestra el mensaje de error para un campo inválido
function showInputError(input, errorElement, config) {
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

// Oculta el mensaje de error para un campo válido
function hideInputError(input, errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Alterna el estado del botón de envío basado en la validez del formulario
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


// Inicializa la validación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const validationConfig = {
    formSelector: "form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    errorClass: "modal__error_visible",
    errorSelector: ".modal__error",
  };

  enableValidation(validationConfig);
});
