// Tarjetas iniciales
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Variables de los modales
const editModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// Botones de cierre universales
const closeButtons = document.querySelectorAll(".modal__close-btn");

// Botones
const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");

// Formularios y entradas
const editForm = document.querySelector("#modal__form");
const addCardForm = document.querySelector("#add-card-form");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");
const editNameInput = document.querySelector("#profile-name-input");
const editDescriptionInput = document.querySelector("#profile-description-input");
const cardNameInput = document.querySelector("#add-card-caption-input");
const cardLinkInput = document.querySelector("#add-card-link-input");

// Tarjetas
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

// Función para abrir modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Función para cerrar modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Asignar eventos universales a botones de cierre
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Función para abrir el modal de vista previa
function openPreviewModal(imageLink, imageCaption) {
  previewImage.src = imageLink;
  previewImage.alt = imageCaption;
  previewCaption.textContent = imageCaption;
  openModal(previewModal);
}

// Función para crear una tarjeta
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardlikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  // Configuración de imagen y título
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Abrir modal de vista previa al hacer clic en la imagen
  cardImage.addEventListener("click", () => {
    openPreviewModal(data.link, data.name);
  });

  // Marcar como favorito
  cardlikeBtn.addEventListener("click", () => {
    cardlikeBtn.classList.toggle("card__like-button_liked");
  });

  // Eliminar post
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// Función para renderizar post
function renderCard(cardData, method = "prepend") {
  const cardElement = getCardElement(cardData);
  cardList[method](cardElement);
}

// Renderizar post iniciales
initialCards.forEach((card) => renderCard(card, "append"));

// Eventos para editar perfil
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

// Evento para agregar tarjeta
addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(cardData);
  addCardForm.reset();
  closeModal(addCardModal);
});
