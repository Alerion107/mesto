let editButton = document.querySelector('.profile__edit-button');
let popupWindow = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__title');
let profileActivity = document.querySelector('.profile__subtitle');
let popupName = document.querySelector('.popup__input_name');
let popupActivity = document.querySelector('.popup__input_activity');
let popupSubmit = document.querySelector('.popup__submit-button');

function openPopupWindow() {
  popupWindow.classList.add('popup_is-opened');
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
}

function closePopupWindow(){
  popupWindow.classList.remove('popup_is-opened');
}

editButton.addEventListener('click', openPopupWindow);
popupCloseBtn.addEventListener('click', closePopupWindow);

function onOverlayClick(event) {
  if (event.target===event.currentTarget) {
    closePopupWindow();
  }
}

popupWindow.addEventListener('click', onOverlayClick);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopupWindow();
}

popupSubmit.addEventListener('click', formSubmitHandler);
