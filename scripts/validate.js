function showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  
  function hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  }
  
  function checkingValidity(config, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        config, formElement, inputElement, inputElement.validationMessage
      );
    } else {
      hideInputError(config, formElement, inputElement);
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(config, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.disabledButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(config.disabledButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  function setEventListeners(config, formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkingValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
    });
  }
  
  function enableValidation({formSelector, ...config}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(config, formElement);
    });
  }
  
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    disabledButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_invalid",
  });
