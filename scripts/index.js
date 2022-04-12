const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const listOfCards = document.querySelector('.elements');
const template = document.querySelector('.element-template');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__subtitle');

const popupEditWindow = document.querySelector('.popup_type_edit-profile');
const popupName = popupEditWindow.querySelector('.popup__input_type_name');
const btnEditClose = popupEditWindow.querySelector('.popup__close-button');
const popupActivity = popupEditWindow.querySelector('.popup__input_type_activity');
const popupEditForm = popupEditWindow.querySelector('.popup__form');

const popupAddWindow = document.querySelector('.popup_type_add-card');
const btnAddClose = popupAddWindow.querySelector('.popup__close-button');
const popupAddCardName = popupAddWindow.querySelector('.popup__input_type_card-name');
const popupAddCardLink = popupAddWindow.querySelector('.popup__input_type_card-link');
const popupAddForm = popupAddWindow.querySelector('.popup__form');

const popupCardWindow = document.querySelector('.popup_type_open-card');
const popupCardElement = popupCardWindow.querySelector('.popup__card-image');
const btnCardClose = popupCardWindow.querySelector('.popup__close-button');
const popupCardTitle = popupCardWindow.querySelector('.popup__card-title');

function openPopupWindow(popupName) {
  popupName.classList.add('popup_is-opened');
}

function closePopupWindow(popupName) {
  popupName.classList.remove('popup_is-opened');
}

function handleOpenEditPopup() {
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
  openPopupWindow(popupEditWindow);
}

function handleSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopupWindow(popupEditWindow);
}

function handleOpenAddPopup() {
  openPopupWindow(popupAddWindow);
}

function deleteCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

function getElement(item) {
  const elementGetTemplate = template.content.cloneNode(true);
  const title = elementGetTemplate.querySelector('.element__title');
  const photo = elementGetTemplate.querySelector('.element__pic');
  const buttonDelete = elementGetTemplate.querySelector('.element__delete-button');
  const buttonLike = elementGetTemplate.querySelector('.element__like-button');
  
  title.textContent = item.name;
  photo.src = item.link;
  photo.alt = item.name;

  buttonDelete.addEventListener('click', deleteCard);

  buttonLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_active'));

  photo.addEventListener('click', () => openCard(item));

  return elementGetTemplate;
}

function renderInitialCards() {
  const cards = initialCards.map(getElement);
  listOfCards.append(...cards);
}

renderInitialCards();

function openCard(item) {
  popupCardElement.src = item.link;
  popupCardTitle.textContent = item.name;
  popupCardElement.alt = item.name;
  openPopupWindow(popupCardWindow);
}

function addNewCard (evt) {
  evt.preventDefault();
  const newCard = getElement({name: popupAddCardName.value, link: popupAddCardLink.value});
  listOfCards.prepend(newCard);
  closePopupWindow(popupAddWindow);
  popupAddForm.reset();
}

btnEditProfile.addEventListener('click', handleOpenEditPopup);
btnEditClose.addEventListener('click', () => closePopupWindow(popupEditWindow));
btnAddCard.addEventListener('click', handleOpenAddPopup);
btnAddClose.addEventListener('click', () => closePopupWindow(popupAddWindow));
popupEditForm.addEventListener('submit', handleSubmitEdit);
popupAddForm.addEventListener('submit', addNewCard);
btnCardClose.addEventListener('click', () => closePopupWindow(popupCardWindow));