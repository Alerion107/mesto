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
let popupWindow = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__title');
let profileActivity = document.querySelector('.profile__subtitle');
let popupName = document.querySelector('.popup__input_type_name');
let popupActivity = document.querySelector('.popup__input_type_activity');
let popupForm = document.querySelector('.popup__form');

let listOfCards = document.querySelector('.elements');
let template = document.querySelector('.element-template');

function openPopupWindow() {
  popupWindow.classList.add('popup_is-opened');
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
}

function closePopupWindow(){
  popupWindow.classList.remove('popup_is-opened');
}

function onOverlayClick(event) {
  if (event.target===event.currentTarget) {
    closePopupWindow();
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopupWindow();
}

//блок про темплейты
function addElement() {
  let card = initialCards.map(getElement);
  listOfCards.append(...card);
}

function getElement(item) {
  let getElementTemplate = template.content.cloneNode(true);
  let title = getElementTemplate.querySelector('.element__title');
  title.textContent = item.name;
  let photo = getElementTemplate.querySelector('.element__pic');
  photo.src = item.link;
  return getElementTemplate;
}
//addElement();

// конеч блока про темплейты

editButton.addEventListener('click', openPopupWindow);
popupCloseBtn.addEventListener('click', closePopupWindow);
popupWindow.addEventListener('click', onOverlayClick);
popupForm.addEventListener('submit', formSubmitHandler);