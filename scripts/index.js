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

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popupEditWindow = document.querySelector('.popup_type_edit-profile');
let editCloseBtn = popupEditWindow.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__title');
let profileActivity = document.querySelector('.profile__subtitle');
let popupName = popupEditWindow.querySelector('.popup__input_type_name');
let popupActivity = popupEditWindow.querySelector('.popup__input_type_activity');
let popupEditForm = popupEditWindow.querySelector('.popup__form');

let popupAddWindow = document.querySelector('.popup_type_add-card');
let addCloseBtn = popupAddWindow.querySelector('.popup__close-button');
let popupAddCardName = popupAddWindow.querySelector('.popup__input_type_card-name');
let popupAddCardLink = popupAddWindow.querySelector('.popup__input_type_card-link');
let popupAddForm = popupAddWindow.querySelector('.popup__form');//Переделать название переменной

let listOfCards = document.querySelector('.elements');
let template = document.querySelector('.element-template');

function openPopupWindow(popupName) {
  popupName.classList.add('popup_is-opened');
}

function closePopupWindow(popupName) {
  popupName.classList.remove('popup_is-opened');
}

function popupEdit() {
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
  openPopupWindow(popupEditWindow);
}

function formSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopupWindow(popupEditWindow);
}

function popupAdd() {
  openPopupWindow(popupAddWindow);
}

//блок про темплейты
function addElement() {
  let card = initialCards.map(getElement);
  listOfCards.append(...card);
}

function getElement(item) {
  let getElementTemplate = template.content.cloneNode(true);
  let title = getElementTemplate.querySelector('.element__title');
  let photo = getElementTemplate.querySelector('.element__pic');
  let likeButton = getElementTemplate.querySelector('.element__like-button');
  let deleteButton = getElementTemplate.querySelector('.element__delete-button');
  title.textContent = item.name;
  photo.src = item.link;

  likeButton.addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_active'));
  
  deleteButton.addEventListener('click', deleteElement);

  return getElementTemplate;
}
addElement();

function deleteElement(evt) {
  let card = evt.target.closest('.element');
  card.remove();
}

function addNewCard (name, link) {
  listOfCards.prepend(getElement(name,link));
  closePopupWindow(popupAddWindow);
  popupAddForm.reset();
}

function addNewCardSubmit(evt) {
  evt.preventDefault();
  addNewCard(popupAddCardName.value, popupAddCardLink.value);
}

// конеч блока про темплейты

editButton.addEventListener('click', popupEdit);
editCloseBtn.addEventListener('click', () => closePopupWindow(popupEditWindow));
addButton.addEventListener('click', popupAdd);
addCloseBtn.addEventListener('click', () => closePopupWindow(popupAddWindow));
popupEditForm.addEventListener('submit', formSubmitEdit);
popupAddForm.addEventListener('submit', addNewCardSubmit);