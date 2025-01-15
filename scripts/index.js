

// Tarjetas iniciales
const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Golden Gate bridge", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg" }
];

// Elementos de los modales
const editModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");

// Botones y formularios
const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const editForm = document.querySelector("#modal__form");
const addCardForm = document.querySelector("#add-card-modal form");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");
const editNameInput = document.querySelector("#profile-name-input");
const editDescriptionInput = document.querySelector("#profile-description-input");
const cardNameInput = document.querySelector("#add-card-caption-input");
const cardLinkInput = document.querySelector("#add-card-link-input");

// Tarjetas
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

// Función para abrir un modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Función para cerrar un modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);

  document.activeElement.blur();
}

// Manejar la tecla Escape para cerrar cualquier modal abierto
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

// Asignar evento para cerrar el modal al hacer clic en la "X"
document.querySelectorAll(".modal__close-btn").forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

//Cerrar modal al hacer click en overlay
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Crear una nueva tarjeta
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardlikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    const previewImage = previewModal.querySelector(".modal__image");
    const previewCaption = previewModal.querySelector(".modal__caption");

    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  cardlikeBtn.addEventListener("click", () => cardlikeBtn.classList.toggle("card__like-button_liked"));
  cardDeleteBtn.addEventListener("click", () => cardElement.remove());

  return cardElement;
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => cardList.prepend(getCardElement(card)));

// Editar perfil
profileEditButton.addEventListener("click", () => {
  editNameInput.value = profileNameElement.textContent;
  editDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editModal);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = editNameInput.value;
  profileDescriptionElement.textContent = editDescriptionInput.value;
  closeModal(editModal);
});

// Agregar nueva tarjeta
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: cardNameInput.value, link: cardLinkInput.value };
  cardList.prepend(getCardElement(cardData));
  addCardForm.reset();
  resetValidation(addCardForm, {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    errorClass: "modal__error_visible",
    errorSelector: ".modal__error",
  });
  closeModal(addCardModal);
});

