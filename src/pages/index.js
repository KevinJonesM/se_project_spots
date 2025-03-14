import "../pages/index.css";
import Api from "../utils/Api.js";
import { enableValidation, resetValidation, toggleButtonState } from "../scripts/validation.js";

const validationConfig = {
  formSelector: "form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  errorClass: "modal__error_visible",
  errorSelector: ".modal__error",
};

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "36d78c86-87fd-4e80-9e61-6adc135095ef",
    "Content-Type": "application/json",
  },
});

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarContainer = document.querySelector(".profile__avatar-container");

const editModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const deleteCardModal = document.querySelector("#delete-card-modal");

const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const editForm = document.querySelector("#modal__form");
const addCardForm = document.querySelector("#add-card-modal form");
const editAvatarForm = document.querySelector("#edit-avatar-form");
const deleteCardForm = document.querySelector("#delete-card-form");

const cancelDeleteButton = document.querySelector(".modal__submit-btn--cancel");

const editNameInput = document.querySelector("#profile-name-input");
const editDescriptionInput = document.querySelector("#profile-description-input");
const cardNameInput = document.querySelector("#add-card-caption-input");
const cardLinkInput = document.querySelector("#add-card-link-input");
const avatarLinkInput = document.querySelector("#edit-avatar-link-input");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

let cardToDelete = null;

function renderLoading(isLoading, button, defaultText, loadingText = "Saving...") {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

document.querySelectorAll(".modal__close-btn").forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

function createCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  if (data._id) {
    cardElement.dataset.cardId = data._id;
  }

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  cardLikeBtn.addEventListener("click", () => {

    if (cardLikeBtn.classList.contains("card__like-button_liked")) {

      api.unlikeCard(data._id)
        .then((updatedCard) => {
          cardLikeBtn.classList.remove("card__like-button_liked");

        })
        .catch((err) => console.error("Error al quitar like:", err));
    } else {

      api.likeCard(data._id)
        .then((updatedCard) => {
          cardLikeBtn.classList.add("card__like-button_liked");

        })
        .catch((err) => console.error("Error al dar like:", err));
    }
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardToDelete = cardElement;
    openModal(deleteCardModal);
  });

  return cardElement;
}

const deleteSubmitButton = deleteCardForm.querySelector(".modal__submit-btn--delete");

deleteCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!cardToDelete) return;

  const cardId = cardToDelete.dataset.cardId;

  renderLoading(true, deleteSubmitButton, "Delete", "Deleting...");

  if (cardId) {

    api.deleteCard(cardId)
      .then(() => {
        cardToDelete.remove();
        cardToDelete = null;
        closeModal(deleteCardModal);
      })
      .catch((err) => console.error("Error al eliminar la tarjeta:", err))
      .finally(() => {
        renderLoading(false, deleteSubmitButton, "Delete");
      });
  } else {

    cardToDelete.remove();
    cardToDelete = null;
    closeModal(deleteCardModal);
    renderLoading(false, deleteSubmitButton, "Delete");
  }
});

cancelDeleteButton.addEventListener("click", () => {
  cardToDelete = null;
  closeModal(deleteCardModal);
});

const editFormSubmitButton = editForm.querySelector(".modal__submit-btn");

profileEditButton.addEventListener("click", () => {
  editNameInput.value = profileNameElement.textContent;
  editDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editForm, validationConfig);
  openModal(editModal);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderLoading(true, editFormSubmitButton, "Save");

  api.updateUserInfo({
    name: editNameInput.value,
    about: editDescriptionInput.value
  })
    .then((updatedUser) => {
      profileNameElement.textContent = updatedUser.name;
      profileDescriptionElement.textContent = updatedUser.about;
      closeModal(editModal);
    })
    .catch((err) => {
      console.error("Error al actualizar perfil:", err);
    })
    .finally(() => {
      renderLoading(false, editFormSubmitButton, "Save");
    });
});

const editAvatarSubmitButton = editAvatarForm.querySelector(".modal__submit-btn");

profileAvatarContainer.addEventListener("click", () => {
  openModal(editAvatarModal);
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderLoading(true, editAvatarSubmitButton, "Save");

  api.updateUserAvatar(avatarLinkInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error("Error al actualizar avatar:", err);
    })
    .finally(() => {
      renderLoading(false, editAvatarSubmitButton, "Save");
    });
});

const addCardSubmitButton = addCardForm.querySelector(".modal__submit-btn");

addCardButton.addEventListener("click", () => {
  resetValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});

if (!addCardForm.dataset.listenerAdded) {
  addCardForm.dataset.listenerAdded = true;
  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    renderLoading(true, addCardSubmitButton, "Save");

    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    api.addNewCard(cardData)
      .then((newCard) => {
        const newCardElement = createCardElement(newCard);
        cardList.prepend(newCardElement);

        addCardForm.reset();
        toggleButtonState(
          addCardForm.querySelectorAll(validationConfig.inputSelector),
          addCardForm.querySelector(validationConfig.submitButtonSelector),
          validationConfig
        );
        closeModal(addCardModal);
      })
      .catch((err) => console.error("Error al guardar la imagen en la API:", err))
      .finally(() => {
        renderLoading(false, addCardSubmitButton, "Save");
      });
  });
}

enableValidation(validationConfig);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, cards]) => {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach((cardData) => {
      const newCardElement = createCardElement(cardData);
      cardList.append(newCardElement);
    });
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales: ", err);
  });
