/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/utils/Api.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Api = /*#__PURE__*/function () {
  function Api(_ref) {
    var baseUrl = _ref.baseUrl,
      headers = _ref.headers;
    _classCallCheck(this, Api);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  return _createClass(Api, [{
    key: "_handleResponse",
    value: function _handleResponse(res) {
      return res.ok ? res.json() : Promise.reject("Error: ".concat(res.status));
    }
  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      return fetch("".concat(this._baseUrl, "/cards"), {
        headers: this._headers
      }).then(this._handleResponse);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return fetch("".concat(this._baseUrl, "/users/me"), {
        headers: this._headers
      }).then(this._handleResponse);
    }
  }, {
    key: "updateUserInfo",
    value: function updateUserInfo(_ref2) {
      var name = _ref2.name,
        about = _ref2.about;
      return fetch("".concat(this._baseUrl, "/users/me"), {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(this._handleResponse);
    }
  }, {
    key: "updateUserAvatar",
    value: function updateUserAvatar(avatar) {
      return fetch("".concat(this._baseUrl, "/users/me/avatar"), {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }).then(this._handleResponse);
    }
  }, {
    key: "addNewCard",
    value: function addNewCard(_ref3) {
      var name = _ref3.name,
        link = _ref3.link;
      return fetch("".concat(this._baseUrl, "/cards"), {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._handleResponse);
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(cardId) {
      return fetch("".concat(this._baseUrl, "/cards/").concat(cardId), {
        method: "DELETE",
        headers: this._headers
      }).then(this._handleResponse);
    }
  }, {
    key: "likeCard",
    value: function likeCard(cardId) {
      return fetch("".concat(this._baseUrl, "/cards/").concat(cardId, "/likes"), {
        method: "PUT",
        headers: this._headers
      }).then(this._handleResponse);
    }
  }, {
    key: "unlikeCard",
    value: function unlikeCard(cardId) {
      return fetch("".concat(this._baseUrl, "/cards/").concat(cardId, "/likes"), {
        method: "DELETE",
        headers: this._headers
      }).then(this._handleResponse);
    }
  }]);
}();
/* harmony default export */ const utils_Api = (Api);
;// ./src/scripts/validation.js
function enableValidation(config) {
  var forms = document.querySelectorAll(config.formSelector);
  forms.forEach(function (form) {
    if (!form.dataset.validationSet) {
      form.dataset.validationSet = true;
      setEventListeners(form, config);
    }
  });
}
function setEventListeners(form, config) {
  var inputs = form.querySelectorAll(config.inputSelector);
  var submitButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, submitButton, config);
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      validateInput(input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
}
function validateInput(input, config) {
  var errorElement = input.closest("label").querySelector(config.errorSelector);
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
function toggleButtonState(inputs, button, config) {
  if (!button) return;
  var isValid = Array.from(inputs).every(function (input) {
    return input.validity.valid;
  });
  button.classList.toggle(config.inactiveButtonClass, !isValid);
  button.disabled = !isValid;
}
function resetValidation(form, config) {
  var inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach(function (input) {
    var errorElement = input.closest("label").querySelector(config.errorSelector);
    hideInputError(errorElement, config);
  });
  toggleButtonState(inputs, form.querySelector(config.submitButtonSelector), config);
}
;// ./src/pages/index.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var validationConfig = {
  formSelector: "form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  errorClass: "modal__error_visible",
  errorSelector: ".modal__error"
};
var api = new utils_Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "36d78c86-87fd-4e80-9e61-6adc135095ef",
    "Content-Type": "application/json"
  }
});
var profileNameElement = document.querySelector(".profile__name");
var profileDescriptionElement = document.querySelector(".profile__description");
var profileAvatar = document.querySelector(".profile__avatar");
var profileAvatarContainer = document.querySelector(".profile__avatar-container");
var editModal = document.querySelector("#edit-profile-modal");
var addCardModal = document.querySelector("#add-card-modal");
var previewModal = document.querySelector("#preview-modal");
var editAvatarModal = document.querySelector("#edit-avatar-modal");
var deleteCardModal = document.querySelector("#delete-card-modal");
var profileEditButton = document.querySelector(".profile__edit-btn");
var addCardButton = document.querySelector(".profile__add-btn");
var editForm = document.querySelector("#modal__form");
var addCardForm = document.querySelector("#add-card-modal form");
var editAvatarForm = document.querySelector("#edit-avatar-form");
var deleteCardForm = document.querySelector("#delete-card-form");
var cancelDeleteButton = document.querySelector(".modal__submit-btn--cancel");
var editNameInput = document.querySelector("#profile-name-input");
var editDescriptionInput = document.querySelector("#profile-description-input");
var cardNameInput = document.querySelector("#add-card-caption-input");
var cardLinkInput = document.querySelector("#add-card-link-input");
var avatarLinkInput = document.querySelector("#edit-avatar-link-input");
var previewImage = previewModal.querySelector(".modal__image");
var previewCaption = previewModal.querySelector(".modal__caption");
var cardTemplate = document.querySelector("#card-template");
var cardList = document.querySelector(".cards__list");
var cardToDelete = null;
function renderLoading(isLoading, button, defaultText) {
  var loadingText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Saving...";
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
    var openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
document.querySelectorAll(".modal__close-btn").forEach(function (button) {
  var modal = button.closest(".modal");
  button.addEventListener("click", function () {
    return closeModal(modal);
  });
});
document.querySelectorAll(".modal").forEach(function (modal) {
  modal.addEventListener("mousedown", function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});
function createCardElement(data) {
  var cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  var cardImage = cardElement.querySelector(".card__image");
  var cardTitle = cardElement.querySelector(".card__title");
  var cardLikeBtn = cardElement.querySelector(".card__like-btn");
  var cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  if (data._id) {
    cardElement.dataset.cardId = data._id;
  }
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }
  cardImage.addEventListener("click", function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });
  cardLikeBtn.addEventListener("click", function () {
    if (cardLikeBtn.classList.contains("card__like-button_liked")) {
      api.unlikeCard(data._id).then(function (updatedCard) {
        cardLikeBtn.classList.remove("card__like-button_liked");
      })["catch"](function (err) {
        return console.error("Error al quitar like:", err);
      });
    } else {
      api.likeCard(data._id).then(function (updatedCard) {
        cardLikeBtn.classList.add("card__like-button_liked");
      })["catch"](function (err) {
        return console.error("Error al dar like:", err);
      });
    }
  });
  cardDeleteBtn.addEventListener("click", function () {
    cardToDelete = cardElement;
    openModal(deleteCardModal);
  });
  return cardElement;
}
var deleteSubmitButton = deleteCardForm.querySelector(".modal__submit-btn--delete");
deleteCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (!cardToDelete) return;
  var cardId = cardToDelete.dataset.cardId;
  renderLoading(true, deleteSubmitButton, "Delete", "Deleting...");
  if (cardId) {
    api.deleteCard(cardId).then(function () {
      cardToDelete.remove();
      cardToDelete = null;
      closeModal(deleteCardModal);
    })["catch"](function (err) {
      return console.error("Error al eliminar la tarjeta:", err);
    })["finally"](function () {
      renderLoading(false, deleteSubmitButton, "Delete");
    });
  } else {
    cardToDelete.remove();
    cardToDelete = null;
    closeModal(deleteCardModal);
    renderLoading(false, deleteSubmitButton, "Delete");
  }
});
cancelDeleteButton.addEventListener("click", function () {
  cardToDelete = null;
  closeModal(deleteCardModal);
});
var editFormSubmitButton = editForm.querySelector(".modal__submit-btn");
profileEditButton.addEventListener("click", function () {
  editNameInput.value = profileNameElement.textContent;
  editDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editForm, validationConfig);
  openModal(editModal);
});
editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, editFormSubmitButton, "Save");
  api.updateUserInfo({
    name: editNameInput.value,
    about: editDescriptionInput.value
  }).then(function (updatedUser) {
    profileNameElement.textContent = updatedUser.name;
    profileDescriptionElement.textContent = updatedUser.about;
    closeModal(editModal);
  })["catch"](function (err) {
    console.error("Error al actualizar perfil:", err);
  })["finally"](function () {
    renderLoading(false, editFormSubmitButton, "Save");
  });
});
var editAvatarSubmitButton = editAvatarForm.querySelector(".modal__submit-btn");
profileAvatarContainer.addEventListener("click", function () {
  openModal(editAvatarModal);
});
editAvatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, editAvatarSubmitButton, "Save");
  api.updateUserAvatar(avatarLinkInput.value).then(function (res) {
    profileAvatar.src = res.avatar;
    closeModal(editAvatarModal);
  })["catch"](function (err) {
    console.error("Error al actualizar avatar:", err);
  })["finally"](function () {
    renderLoading(false, editAvatarSubmitButton, "Save");
  });
});
var addCardSubmitButton = addCardForm.querySelector(".modal__submit-btn");
addCardButton.addEventListener("click", function () {
  resetValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});
if (!addCardForm.dataset.listenerAdded) {
  addCardForm.dataset.listenerAdded = true;
  addCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    renderLoading(true, addCardSubmitButton, "Save");
    var cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value
    };
    api.addNewCard(cardData).then(function (newCard) {
      var newCardElement = createCardElement(newCard);
      cardList.prepend(newCardElement);
      addCardForm.reset();
      toggleButtonState(addCardForm.querySelectorAll(validationConfig.inputSelector), addCardForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
      closeModal(addCardModal);
    })["catch"](function (err) {
      return console.error("Error al guardar la imagen en la API:", err);
    })["finally"](function () {
      renderLoading(false, addCardSubmitButton, "Save");
    });
  });
}
enableValidation(validationConfig);
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    userData = _ref2[0],
    cards = _ref2[1];
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  cards.forEach(function (cardData) {
    var newCardElement = createCardElement(cardData);
    cardList.append(newCardElement);
  });
})["catch"](function (err) {
  console.error("Error al cargar datos iniciales: ", err);
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBeEksS0FBQTtFQUNyQjZELGtCQUFrQixDQUFDbEIsV0FBVyxHQUFHNEYsUUFBUSxDQUFDdEksSUFBSTtFQUM5QzZELHlCQUF5QixDQUFDbkIsV0FBVyxHQUFHNEYsUUFBUSxDQUFDckksS0FBSztFQUN0RDZELGFBQWEsQ0FBQ2dELEdBQUcsR0FBR3dCLFFBQVEsQ0FBQy9ILE1BQU07RUFFbkNnSSxLQUFLLENBQUNsSCxPQUFPLENBQUMsVUFBQzBHLFFBQVEsRUFBSztJQUMxQixJQUFNRSxjQUFjLEdBQUc1QixpQkFBaUIsQ0FBQzBCLFFBQVEsQ0FBQztJQUNsRDNDLFFBQVEsQ0FBQ29ELE1BQU0sQ0FBQ1AsY0FBYyxDQUFDO0VBQ2pDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ2IsR0FBRyxFQUFLO0VBQ2RDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLG1DQUFtQyxFQUFFRixHQUFHLENBQUM7QUFDekQsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBfaGFuZGxlUmVzcG9uc2UocmVzKSB7XG4gICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7IGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMgfSlcbiAgICAgIC50aGVuKHRoaXMuX2hhbmRsZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHsgaGVhZGVyczogdGhpcy5faGVhZGVycyB9KVxuICAgICAgLnRoZW4odGhpcy5faGFuZGxlUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlVXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBuYW1lLCBhYm91dCB9KVxuICAgIH0pLnRoZW4odGhpcy5faGFuZGxlUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlVXNlckF2YXRhcihhdmF0YXIpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhdmF0YXIgfSlcbiAgICB9KS50aGVuKHRoaXMuX2hhbmRsZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGFkZE5ld0NhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbmFtZSwgbGluayB9KVxuICAgIH0pLnRoZW4odGhpcy5faGFuZGxlUmVzcG9uc2UpO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChjYXJkSWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtjYXJkSWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pLnRoZW4odGhpcy5faGFuZGxlUmVzcG9uc2UpO1xuICB9XG5cbiAgbGlrZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7Y2FyZElkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICB9KS50aGVuKHRoaXMuX2hhbmRsZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHVubGlrZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7Y2FyZElkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICB9KS50aGVuKHRoaXMuX2hhbmRsZVJlc3BvbnNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iLCJleHBvcnQgZnVuY3Rpb24gZW5hYmxlVmFsaWRhdGlvbihjb25maWcpIHtcbiAgY29uc3QgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xuXG4gIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBpZiAoIWZvcm0uZGF0YXNldC52YWxpZGF0aW9uU2V0KSB7XG4gICAgICBmb3JtLmRhdGFzZXQudmFsaWRhdGlvblNldCA9IHRydWU7XG4gICAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtLCBjb25maWcpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEV2ZW50TGlzdGVuZXJzKGZvcm0sIGNvbmZpZykge1xuICBjb25zdCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmlucHV0U2VsZWN0b3IpO1xuICBjb25zdCBzdWJtaXRCdXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcblxuICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dHMsIHN1Ym1pdEJ1dHRvbiwgY29uZmlnKTtcblxuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgdmFsaWRhdGVJbnB1dChpbnB1dCwgY29uZmlnKTtcbiAgICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0cywgc3VibWl0QnV0dG9uLCBjb25maWcpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChpbnB1dCwgY29uZmlnKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGlucHV0LmNsb3Nlc3QoXCJsYWJlbFwiKS5xdWVyeVNlbGVjdG9yKGNvbmZpZy5lcnJvclNlbGVjdG9yKTtcblxuICBpZiAoIWlucHV0LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgc2hvd0lucHV0RXJyb3IoaW5wdXQsIGVycm9yRWxlbWVudCwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlSW5wdXRFcnJvcihlcnJvckVsZW1lbnQsIGNvbmZpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0lucHV0RXJyb3IoaW5wdXQsIGVycm9yRWxlbWVudCwgY29uZmlnKSB7XG4gIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xuICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuZXJyb3JDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIGhpZGVJbnB1dEVycm9yKGVycm9yRWxlbWVudCwgY29uZmlnKSB7XG4gIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5lcnJvckNsYXNzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0cywgYnV0dG9uLCBjb25maWcpIHtcbiAgaWYgKCFidXR0b24pIHJldHVybjtcblxuICBjb25zdCBpc1ZhbGlkID0gQXJyYXkuZnJvbShpbnB1dHMpLmV2ZXJ5KChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQpO1xuICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcywgIWlzVmFsaWQpO1xuICBidXR0b24uZGlzYWJsZWQgPSAhaXNWYWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbihmb3JtLCBjb25maWcpIHtcbiAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKTtcblxuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBpbnB1dC5jbG9zZXN0KFwibGFiZWxcIikucXVlcnlTZWxlY3Rvcihjb25maWcuZXJyb3JTZWxlY3Rvcik7XG4gICAgaGlkZUlucHV0RXJyb3IoZXJyb3JFbGVtZW50LCBjb25maWcpO1xuICB9KTtcblxuICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dHMsIGZvcm0ucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3IpLCBjb25maWcpO1xufVxuIiwiaW1wb3J0IFwiLi4vcGFnZXMvaW5kZXguY3NzXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcbmltcG9ydCB7IGVuYWJsZVZhbGlkYXRpb24sIHJlc2V0VmFsaWRhdGlvbiwgdG9nZ2xlQnV0dG9uU3RhdGUgfSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5cbmNvbnN0IHZhbGlkYXRpb25Db25maWcgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCJmb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3N1Ym1pdC1idG5cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc3VibWl0LWJ0bl9kaXNhYmxlZFwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG4gIGVycm9yU2VsZWN0b3I6IFwiLm1vZGFsX19lcnJvclwiLFxufTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiMzZkNzhjODYtODdmZC00ZTgwLTllNjEtNmFkYzEzNTA5NWVmXCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgcHJvZmlsZU5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XG5jb25zdCBwcm9maWxlQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5jb25zdCBwcm9maWxlQXZhdGFyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXItY29udGFpbmVyXCIpO1xuXG5jb25zdCBlZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1tb2RhbFwiKTtcbmNvbnN0IGFkZENhcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWNhcmQtbW9kYWxcIik7XG5jb25zdCBwcmV2aWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XG5jb25zdCBlZGl0QXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlQ2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtY2FyZC1tb2RhbFwiKTtcblxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbmNvbnN0IGVkaXRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1tb2RhbCBmb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWZvcm1cIik7XG5jb25zdCBkZWxldGVDYXJkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLWNhcmQtZm9ybVwiKTtcblxuY29uc3QgY2FuY2VsRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0bi0tY2FuY2VsXCIpO1xuXG5jb25zdCBlZGl0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWUtaW5wdXRcIik7XG5jb25zdCBlZGl0RGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiKTtcbmNvbnN0IGNhcmROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLWNhcHRpb24taW5wdXRcIik7XG5jb25zdCBjYXJkTGlua0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1saW5rLWlucHV0XCIpO1xuY29uc3QgYXZhdGFyTGlua0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1saW5rLWlucHV0XCIpO1xuXG5jb25zdCBwcmV2aWV3SW1hZ2UgPSBwcmV2aWV3TW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG5jb25zdCBwcmV2aWV3Q2FwdGlvbiA9IHByZXZpZXdNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuXG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIik7XG5jb25zdCBjYXJkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XG5cbmxldCBjYXJkVG9EZWxldGUgPSBudWxsO1xuXG5mdW5jdGlvbiByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uLCBkZWZhdWx0VGV4dCwgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgfSBlbHNlIHtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBkZWZhdWx0VGV4dDtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlS2V5KTtcbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGVLZXkpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFc2NhcGVLZXkoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgIGNvbnN0IG9wZW5lZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9vcGVuZWRcIik7XG4gICAgaWYgKG9wZW5lZE1vZGFsKSB7XG4gICAgICBjbG9zZU1vZGFsKG9wZW5lZE1vZGFsKTtcbiAgICB9XG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICBjb25zdCBtb2RhbCA9IGJ1dHRvbi5jbG9zZXN0KFwiLm1vZGFsXCIpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwobW9kYWwpKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpLmZvckVhY2goKG1vZGFsKSA9PiB7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbW9kYWwpIHtcbiAgICAgIGNsb3NlTW9kYWwobW9kYWwpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQ2FyZEVsZW1lbnQoZGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSk7XG4gIGNvbnN0IGNhcmRJbWFnZSA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRUaXRsZSA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnRuID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZERlbGV0ZUJ0biA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBjYXJkSW1hZ2Uuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2UuYWx0ID0gZGF0YS5uYW1lO1xuICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG5cbiAgaWYgKGRhdGEuX2lkKSB7XG4gICAgY2FyZEVsZW1lbnQuZGF0YXNldC5jYXJkSWQgPSBkYXRhLl9pZDtcbiAgfVxuXG4gIGlmIChkYXRhLmlzTGlrZWQpIHtcbiAgICBjYXJkTGlrZUJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZS1idXR0b25fbGlrZWRcIik7XG4gIH1cblxuICBjYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gZGF0YS5saW5rO1xuICAgIHByZXZpZXdJbWFnZS5hbHQgPSBkYXRhLm5hbWU7XG4gICAgcHJldmlld0NhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgb3Blbk1vZGFsKHByZXZpZXdNb2RhbCk7XG4gIH0pO1xuXG4gIGNhcmRMaWtlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICBpZiAoY2FyZExpa2VCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZS1idXR0b25fbGlrZWRcIikpIHtcblxuICAgICAgYXBpLnVubGlrZUNhcmQoZGF0YS5faWQpXG4gICAgICAgIC50aGVuKCh1cGRhdGVkQ2FyZCkgPT4ge1xuICAgICAgICAgIGNhcmRMaWtlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9saWtlZFwiKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIGFsIHF1aXRhciBsaWtlOlwiLCBlcnIpKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBhcGkubGlrZUNhcmQoZGF0YS5faWQpXG4gICAgICAgIC50aGVuKCh1cGRhdGVkQ2FyZCkgPT4ge1xuICAgICAgICAgIGNhcmRMaWtlQnRuLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9saWtlZFwiKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGRhciBsaWtlOlwiLCBlcnIpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNhcmREZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjYXJkVG9EZWxldGUgPSBjYXJkRWxlbWVudDtcbiAgICBvcGVuTW9kYWwoZGVsZXRlQ2FyZE1vZGFsKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNhcmRFbGVtZW50O1xufVxuXG5jb25zdCBkZWxldGVTdWJtaXRCdXR0b24gPSBkZWxldGVDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuLS1kZWxldGVcIik7XG5cbmRlbGV0ZUNhcmRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKCFjYXJkVG9EZWxldGUpIHJldHVybjtcblxuICBjb25zdCBjYXJkSWQgPSBjYXJkVG9EZWxldGUuZGF0YXNldC5jYXJkSWQ7XG5cbiAgcmVuZGVyTG9hZGluZyh0cnVlLCBkZWxldGVTdWJtaXRCdXR0b24sIFwiRGVsZXRlXCIsIFwiRGVsZXRpbmcuLi5cIik7XG5cbiAgaWYgKGNhcmRJZCkge1xuXG4gICAgYXBpLmRlbGV0ZUNhcmQoY2FyZElkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJkVG9EZWxldGUucmVtb3ZlKCk7XG4gICAgICAgIGNhcmRUb0RlbGV0ZSA9IG51bGw7XG4gICAgICAgIGNsb3NlTW9kYWwoZGVsZXRlQ2FyZE1vZGFsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGVsaW1pbmFyIGxhIHRhcmpldGE6XCIsIGVycikpXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHJlbmRlckxvYWRpbmcoZmFsc2UsIGRlbGV0ZVN1Ym1pdEJ1dHRvbiwgXCJEZWxldGVcIik7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcblxuICAgIGNhcmRUb0RlbGV0ZS5yZW1vdmUoKTtcbiAgICBjYXJkVG9EZWxldGUgPSBudWxsO1xuICAgIGNsb3NlTW9kYWwoZGVsZXRlQ2FyZE1vZGFsKTtcbiAgICByZW5kZXJMb2FkaW5nKGZhbHNlLCBkZWxldGVTdWJtaXRCdXR0b24sIFwiRGVsZXRlXCIpO1xuICB9XG59KTtcblxuY2FuY2VsRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNhcmRUb0RlbGV0ZSA9IG51bGw7XG4gIGNsb3NlTW9kYWwoZGVsZXRlQ2FyZE1vZGFsKTtcbn0pO1xuXG5jb25zdCBlZGl0Rm9ybVN1Ym1pdEJ1dHRvbiA9IGVkaXRGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5cbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXROYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIGVkaXREZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudDtcbiAgcmVzZXRWYWxpZGF0aW9uKGVkaXRGb3JtLCB2YWxpZGF0aW9uQ29uZmlnKTtcbiAgb3Blbk1vZGFsKGVkaXRNb2RhbCk7XG59KTtcblxuZWRpdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHJlbmRlckxvYWRpbmcodHJ1ZSwgZWRpdEZvcm1TdWJtaXRCdXR0b24sIFwiU2F2ZVwiKTtcblxuICBhcGkudXBkYXRlVXNlckluZm8oe1xuICAgIG5hbWU6IGVkaXROYW1lSW5wdXQudmFsdWUsXG4gICAgYWJvdXQ6IGVkaXREZXNjcmlwdGlvbklucHV0LnZhbHVlXG4gIH0pXG4gICAgLnRoZW4oKHVwZGF0ZWRVc2VyKSA9PiB7XG4gICAgICBwcm9maWxlTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSB1cGRhdGVkVXNlci5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IHVwZGF0ZWRVc2VyLmFib3V0O1xuICAgICAgY2xvc2VNb2RhbChlZGl0TW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBhY3R1YWxpemFyIHBlcmZpbDpcIiwgZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHJlbmRlckxvYWRpbmcoZmFsc2UsIGVkaXRGb3JtU3VibWl0QnV0dG9uLCBcIlNhdmVcIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgZWRpdEF2YXRhclN1Ym1pdEJ1dHRvbiA9IGVkaXRBdmF0YXJGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5cbnByb2ZpbGVBdmF0YXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGVkaXRBdmF0YXJNb2RhbCk7XG59KTtcblxuZWRpdEF2YXRhckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHJlbmRlckxvYWRpbmcodHJ1ZSwgZWRpdEF2YXRhclN1Ym1pdEJ1dHRvbiwgXCJTYXZlXCIpO1xuXG4gIGFwaS51cGRhdGVVc2VyQXZhdGFyKGF2YXRhckxpbmtJbnB1dC52YWx1ZSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBwcm9maWxlQXZhdGFyLnNyYyA9IHJlcy5hdmF0YXI7XG4gICAgICBjbG9zZU1vZGFsKGVkaXRBdmF0YXJNb2RhbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGFjdHVhbGl6YXIgYXZhdGFyOlwiLCBlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgZWRpdEF2YXRhclN1Ym1pdEJ1dHRvbiwgXCJTYXZlXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGFkZENhcmRTdWJtaXRCdXR0b24gPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuXCIpO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJlc2V0VmFsaWRhdGlvbihhZGRDYXJkRm9ybSwgdmFsaWRhdGlvbkNvbmZpZyk7XG4gIG9wZW5Nb2RhbChhZGRDYXJkTW9kYWwpO1xufSk7XG5cbmlmICghYWRkQ2FyZEZvcm0uZGF0YXNldC5saXN0ZW5lckFkZGVkKSB7XG4gIGFkZENhcmRGb3JtLmRhdGFzZXQubGlzdGVuZXJBZGRlZCA9IHRydWU7XG4gIGFkZENhcmRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgcmVuZGVyTG9hZGluZyh0cnVlLCBhZGRDYXJkU3VibWl0QnV0dG9uLCBcIlNhdmVcIik7XG5cbiAgICBjb25zdCBjYXJkRGF0YSA9IHtcbiAgICAgIG5hbWU6IGNhcmROYW1lSW5wdXQudmFsdWUsXG4gICAgICBsaW5rOiBjYXJkTGlua0lucHV0LnZhbHVlLFxuICAgIH07XG4gICAgYXBpLmFkZE5ld0NhcmQoY2FyZERhdGEpXG4gICAgICAudGhlbigobmV3Q2FyZCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdDYXJkRWxlbWVudCA9IGNyZWF0ZUNhcmRFbGVtZW50KG5ld0NhcmQpO1xuICAgICAgICBjYXJkTGlzdC5wcmVwZW5kKG5ld0NhcmRFbGVtZW50KTtcblxuICAgICAgICBhZGRDYXJkRm9ybS5yZXNldCgpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShcbiAgICAgICAgICBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yQWxsKHZhbGlkYXRpb25Db25maWcuaW5wdXRTZWxlY3RvciksXG4gICAgICAgICAgYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3Rvcih2YWxpZGF0aW9uQ29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKSxcbiAgICAgICAgICB2YWxpZGF0aW9uQ29uZmlnXG4gICAgICAgICk7XG4gICAgICAgIGNsb3NlTW9kYWwoYWRkQ2FyZE1vZGFsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgaW1hZ2VuIGVuIGxhIEFQSTpcIiwgZXJyKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgYWRkQ2FyZFN1Ym1pdEJ1dHRvbiwgXCJTYXZlXCIpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5lbmFibGVWYWxpZGF0aW9uKHZhbGlkYXRpb25Db25maWcpO1xuXG5Qcm9taXNlLmFsbChbXG4gIGFwaS5nZXRVc2VySW5mbygpLFxuICBhcGkuZ2V0SW5pdGlhbENhcmRzKClcbl0pXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzXSkgPT4ge1xuICAgIHByb2ZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IHVzZXJEYXRhLm5hbWU7XG4gICAgcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IHVzZXJEYXRhLmFib3V0O1xuICAgIHByb2ZpbGVBdmF0YXIuc3JjID0gdXNlckRhdGEuYXZhdGFyO1xuXG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZERhdGEpID0+IHtcbiAgICAgIGNvbnN0IG5ld0NhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZEVsZW1lbnQoY2FyZERhdGEpO1xuICAgICAgY2FyZExpc3QuYXBwZW5kKG5ld0NhcmRFbGVtZW50KTtcbiAgICB9KTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY2FyZ2FyIGRhdG9zIGluaWNpYWxlczogXCIsIGVycik7XG4gIH0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9jbGFzc0NhbGxDaGVjayIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl9oYW5kbGVSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJjb25jYXQiLCJzdGF0dXMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJnZXRVc2VySW5mbyIsInVwZGF0ZVVzZXJJbmZvIiwiX3JlZjIiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVwZGF0ZVVzZXJBdmF0YXIiLCJhdmF0YXIiLCJhZGROZXdDYXJkIiwiX3JlZjMiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsImNhcmRJZCIsImxpa2VDYXJkIiwidW5saWtlQ2FyZCIsImVuYWJsZVZhbGlkYXRpb24iLCJjb25maWciLCJmb3JtcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1TZWxlY3RvciIsImZvckVhY2giLCJmb3JtIiwiZGF0YXNldCIsInZhbGlkYXRpb25TZXQiLCJzZXRFdmVudExpc3RlbmVycyIsImlucHV0cyIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b24iLCJxdWVyeVNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbGlkYXRlSW5wdXQiLCJlcnJvckVsZW1lbnQiLCJjbG9zZXN0IiwiZXJyb3JTZWxlY3RvciIsInZhbGlkaXR5IiwidmFsaWQiLCJzaG93SW5wdXRFcnJvciIsImhpZGVJbnB1dEVycm9yIiwidGV4dENvbnRlbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImNsYXNzTGlzdCIsImFkZCIsImVycm9yQ2xhc3MiLCJyZW1vdmUiLCJidXR0b24iLCJpc1ZhbGlkIiwiQXJyYXkiLCJmcm9tIiwiZXZlcnkiLCJ0b2dnbGUiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiZGlzYWJsZWQiLCJyZXNldFZhbGlkYXRpb24iLCJ2YWxpZGF0aW9uQ29uZmlnIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsInByb2ZpbGVOYW1lRWxlbWVudCIsInByb2ZpbGVEZXNjcmlwdGlvbkVsZW1lbnQiLCJwcm9maWxlQXZhdGFyIiwicHJvZmlsZUF2YXRhckNvbnRhaW5lciIsImVkaXRNb2RhbCIsImFkZENhcmRNb2RhbCIsInByZXZpZXdNb2RhbCIsImVkaXRBdmF0YXJNb2RhbCIsImRlbGV0ZUNhcmRNb2RhbCIsInByb2ZpbGVFZGl0QnV0dG9uIiwiYWRkQ2FyZEJ1dHRvbiIsImVkaXRGb3JtIiwiYWRkQ2FyZEZvcm0iLCJlZGl0QXZhdGFyRm9ybSIsImRlbGV0ZUNhcmRGb3JtIiwiY2FuY2VsRGVsZXRlQnV0dG9uIiwiZWRpdE5hbWVJbnB1dCIsImVkaXREZXNjcmlwdGlvbklucHV0IiwiY2FyZE5hbWVJbnB1dCIsImNhcmRMaW5rSW5wdXQiLCJhdmF0YXJMaW5rSW5wdXQiLCJwcmV2aWV3SW1hZ2UiLCJwcmV2aWV3Q2FwdGlvbiIsImNhcmRUZW1wbGF0ZSIsImNhcmRMaXN0IiwiY2FyZFRvRGVsZXRlIiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImRlZmF1bHRUZXh0IiwibG9hZGluZ1RleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImhhbmRsZUVzY2FwZUtleSIsImNsb3NlTW9kYWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvcGVuZWRNb2RhbCIsInRhcmdldCIsImNyZWF0ZUNhcmRFbGVtZW50IiwiZGF0YSIsImNhcmRFbGVtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsImNhcmRJbWFnZSIsImNhcmRUaXRsZSIsImNhcmRMaWtlQnRuIiwiY2FyZERlbGV0ZUJ0biIsInNyYyIsImFsdCIsIl9pZCIsImlzTGlrZWQiLCJjb250YWlucyIsInVwZGF0ZWRDYXJkIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiZGVsZXRlU3VibWl0QnV0dG9uIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJlZGl0Rm9ybVN1Ym1pdEJ1dHRvbiIsInVwZGF0ZWRVc2VyIiwiZWRpdEF2YXRhclN1Ym1pdEJ1dHRvbiIsImFkZENhcmRTdWJtaXRCdXR0b24iLCJsaXN0ZW5lckFkZGVkIiwiY2FyZERhdGEiLCJuZXdDYXJkIiwibmV3Q2FyZEVsZW1lbnQiLCJwcmVwZW5kIiwicmVzZXQiLCJhbGwiLCJfc2xpY2VkVG9BcnJheSIsInVzZXJEYXRhIiwiY2FyZHMiLCJhcHBlbmQiXSwic291cmNlUm9vdCI6IiJ9