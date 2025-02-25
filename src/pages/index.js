import "./index.css";
import { enableValidation, resetValidation, toggleButtonState } from "../scripts/validation.js";

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

  const initialCards = [
    { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
    { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
    { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
    { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
    { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
    { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
    { name: "Golden Gate bridge", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg" }
  ];

  const editProfileButton = document.querySelector(".profile__edit-btn");
  const addCardButton = document.querySelector(".profile__add-btn");
  const editModal = document.querySelector("#edit-profile-modal");
  const addCardModal = document.querySelector("#add-card-modal");

  const editForm = editModal?.querySelector("form");
  const addCardForm = addCardModal?.querySelector("form");

  const profileNameElement = document.querySelector(".profile__name");
  const profileDescriptionElement = document.querySelector(".profile__description");
  const editNameInput = document.querySelector("#profile-name-input");
  const editDescriptionInput = document.querySelector("#profile-description-input");

  const cardNameInput = document.querySelector("#add-card-caption-input");
  const cardLinkInput = document.querySelector("#add-card-link-input");
  const cardTemplate = document.querySelector("#card-template");
  const cardList = document.querySelector(".cards__list");

  const previewModal = document.querySelector("#preview-modal");
  const previewImage = previewModal?.querySelector(".modal__image");
  const previewCaption = previewModal?.querySelector(".modal__caption");

  function openModal(modal) {
    if (modal) {
      modal.classList.add("modal_opened");
      document.addEventListener("keydown", handleEscapeKey);
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("modal_opened");
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      if (openedModal) closeModal(openedModal);
    }
  }

  document.querySelectorAll(".modal__close-btn").forEach((button) => {
    const modal = button.closest(".modal");
    if (modal) {
      button.addEventListener("click", () => closeModal(modal));
    }
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  function getCardElement(data) {
    if (!data.name || !data.link) {
      return null;
    }

    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardlikeBtn = cardElement.querySelector(".card__like-btn");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardImage.addEventListener("click", () => {
      if (previewModal && previewImage && previewCaption) {
        previewImage.src = data.link;
        previewImage.alt = data.name;
        previewCaption.textContent = data.name;
        openModal(previewModal);
      }
    });

    cardlikeBtn.addEventListener("click", () => {
      cardlikeBtn.classList.toggle("card__like-button_liked");
    });

    cardDeleteBtn.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  function loadInitialCards() {
    const existingImages = new Set(
      [...cardList.querySelectorAll(".card__image")].map((img) => img.src)
    );

    initialCards.forEach((card) => {
      if (!existingImages.has(card.link)) {
        const cardElement = getCardElement(card);
        if (cardElement) cardList.prepend(cardElement);
      }
    });
  }

  loadInitialCards();

  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const name = cardNameInput.value.trim();
    const link = cardLinkInput.value.trim();

    if (!name || !link) {
      return;
    }

    const cardData = { name, link };
    const cardElement = getCardElement(cardData);

    if (cardElement) {
      cardList.prepend(cardElement);
    }

    addCardForm.reset();

    resetValidation(addCardForm, validationConfig);

    toggleButtonState(
      addCardForm.querySelectorAll(validationConfig.inputSelector),
      addCardForm.querySelector(validationConfig.submitButtonSelector),
      validationConfig
    );

    closeModal(addCardModal);
  });

  if (editProfileButton && editModal) {
    editProfileButton.addEventListener("click", () => {
      editNameInput.value = profileNameElement.textContent;
      editDescriptionInput.value = profileDescriptionElement.textContent;
      resetValidation(editForm, validationConfig);
      openModal(editModal);
    });
  }

  if (editForm) {
    editForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      profileNameElement.textContent = editNameInput.value.trim();
      profileDescriptionElement.textContent = editDescriptionInput.value.trim();
      closeModal(editModal);
    });
  }

  if (addCardButton && addCardModal) {
    addCardButton.addEventListener("click", () => {
      resetValidation(addCardForm, validationConfig);
      openModal(addCardModal);
    });
  }
});
