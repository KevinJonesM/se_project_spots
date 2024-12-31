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
const previewCloseBtn = previewModal.querySelector(".modal__close_type_preview"); // Actualizado

// Botones
const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const addCardCloseButton = addCardModal.querySelector(".modal__close-btn");

// Formularios y entradas
const editForm = editModal.querySelector("#modal__form");
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

// Función para abrir y cerrar modal con transiciones suaves
function openModal(modal) {
  modal.style.visibility = "visible";
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 400); // Ajustar este tiempo al definido en CSS
}

// Función para abrir el Preview Modal
function openPreviewModal(imageLink, imageCaption) {
  previewImage.src = imageLink; // Actualiza la imagen
  previewImage.alt = imageCaption; // Actualiza el texto alternativo
  previewCaption.textContent = imageCaption; // Actualiza el caption
  openModal(previewModal); // Abre el modal
}

// Listener para cerrar el Preview Modal
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

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

  // Para abrir el Preview Modal al hacer clic en la imagen
  cardImage.addEventListener("click", () => {
    openPreviewModal(data.link, data.name);
  });

  // Para dar Like
  cardlikeBtn.addEventListener("click", () => {
    cardlikeBtn.classList.toggle("card__like-button_liked"); // Cambiar estado visual
    console.log(`${data.name} fue ${cardlikeBtn.classList.contains("card__like-button_liked") ? "marcado como favorito" : "desmarcado como favorito"}`);
  });

  // Para eliminar un Card
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove(); // Elimina la tarjeta del DOM
    console.log(`${data.name} fue eliminado`);
  });

  return cardElement;
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardList.appendChild(cardElement);
});

// Eventos para editar perfil
profileEditButton.addEventListener("click", () => {
  editNameInput.value = profileNameElement.textContent;
  editDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editModal);
});

editCloseButton.addEventListener("click", () => closeModal(editModal));

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = editNameInput.value;
  profileDescriptionElement.textContent = editDescriptionInput.value;
  closeModal(editModal);
});

// Eventos para agregar tarjeta
addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModal(addCardModal);
});
