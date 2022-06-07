const editor = document.querySelector('.profile__button-editor');
const cardFormOpenButton = document.querySelector('.profile__plus-container');
const closeIcon = document.querySelectorAll('.popup__button-close');
const profilePopup = document.querySelector('div[name="popup-profile"]');
const profileImage = document.querySelector('div[name="popup-image"]');
const popupMesto = document.querySelector('div[name="popup-mesto"]');

const formProfileElement = document.querySelector('form[name="form-profile"]');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const nameHtml = document.querySelector('.profile__title');
const jobHtml = document.querySelector('.profile__subtitle');

const formMesto = document.querySelector('form[name="form-create-mesto"]');
const nameMestoInput = document.querySelector('#name-mesto');
const linkInput = document.querySelector('#link');

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

const elements = document.querySelector('.elements');

function popupClose(popup) {
    popup.classList.remove('popup_opened');
};

function popupOpen(popup) {
    popup.classList.add('popup_opened');
};

function submitProfileForm (evt) {
    evt.preventDefault();
    nameHtml.textContent = nameInput.value;
    jobHtml.textContent = jobInput.value;
    popupClose(profilePopup);
};

function formSubmitMesto (evt) {
    evt.preventDefault();
    popupClose(popupMesto);
    elements.prepend(createCard(nameMestoInput.value, linkInput.value));
};

function createCard(name, link) {
    const elementTemplate = document.querySelector('#template-element').content.cloneNode(true);
    elementTemplate.querySelector('.element__main-img').src = link;
    elementTemplate.querySelector('.element__title').textContent = name;
    
    elementTemplate.querySelector('.element__button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__button_active');
    });

    const buttonTrash = elementTemplate.querySelector('.element__button-trash');

    buttonTrash.addEventListener('click', function() {
        buttonTrash.closest('.element').remove();
    });

    const buttonImg = elementTemplate.querySelector('.element__main-img');

    buttonImg.addEventListener('click', function() {
        const linkImg = buttonImg.closest('.element').querySelector('.element__main-img').src;
        const nameImg = buttonImg.closest('.element').querySelector('.element__title').textContent;
        addImg(nameImg, linkImg);
    });

    return elementTemplate;
}

function addToPage() {
    for (let i=0; i < initialCards.length; i++) {
        elements.append(createCard(initialCards[i].name, initialCards[i].link));
    }
}

function addImg(name, link) {
    profileImage.querySelector('.popup__img').src = link;
    profileImage.querySelector('.popup__img-name').textContent = name;

    const buttonClose = profileImage.querySelector('.popup__button-close');

    buttonClose.addEventListener('click', function() {
        buttonClose.closest('.popup').classList.remove('popup_opened');
    });
    profileImage.classList.toggle('popup_opened');
};

window.addEventListener('load', ()=>{
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

for (let i = 0; i < document.querySelectorAll('.popup__button-close').length; i++) {
    closeIcon[i].addEventListener('click', () => {
        if (popupMesto.classList.contains('popup_opened')) {
            popupClose(popupMesto);
        };
    
        if (profilePopup.classList.contains('popup_opened')) {
            popupClose(profilePopup);
        };
    });
}

editor.addEventListener('click',() => {
    nameInput.value = nameHtml.textContent;
    jobInput.value = jobHtml.textContent;
    popupOpen(profilePopup);
});
formProfileElement.addEventListener('submit', submitProfileForm);

cardFormOpenButton.addEventListener('click',() => {
    nameMestoInput.value = '';
    linkInput.value = '';
    popupOpen(popupMesto);
});
formMesto.addEventListener('submit', formSubmitMesto);

addToPage();