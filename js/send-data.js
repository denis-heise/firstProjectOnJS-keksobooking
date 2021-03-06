import {createErrorMesage, resetFilters, Keys} from './get-data.js';
import {resetForm} from './map.js';

const URL_SERVER = 'https://23.javascript.pages.academy/keksobooking';
const addFormNode = document.querySelector('.ad-form');
const mainNode = document.querySelector('main');
const resetButtonNode = document.querySelector('.ad-form__reset');
const templateSuccessMessageNode = document.querySelector('#success').content;
const successMessageNode = templateSuccessMessageNode.querySelector('.success');
const successNode = successMessageNode.cloneNode(true);

// Отправляю данные на сервер
const sendForm = (success) => {
  addFormNode.addEventListener('submit', () => {
    const formData = new FormData(addFormNode);
    fetch(
      URL_SERVER,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        success();
      } else {
        createErrorMesage();
      }
    })
      .catch(() => createErrorMesage());
  });
  resetForm(addFormNode, 'submit');
  resetFilters(addFormNode, 'submit');
};

// Функции закрытия сообщения об успешной
const onSuccessMessageKeydown = (evt) => {
  const popUpNode = mainNode.querySelector('.success');
  evt.preventDefault();
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    popUpNode.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
  }
};

const onSuccessMessageClick = () => {
  const popUpNode = mainNode.querySelector('.success');
  popUpNode.remove();
  successNode.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

// Сообщение об успешной отправке данных
function createSuccessMessage () {
  mainNode.appendChild(successNode);
  document.addEventListener('keydown', onSuccessMessageKeydown);
  successNode.addEventListener('click', onSuccessMessageClick);
}

sendForm(createSuccessMessage);

resetForm(resetButtonNode, 'click');
resetFilters(resetButtonNode, 'click');
