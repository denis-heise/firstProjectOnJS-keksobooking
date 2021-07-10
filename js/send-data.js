import {createErrorMesage} from './get-data.js';
import {resetForm} from './map.js';

const URL_SERVER = 'https://23.javascript.pages.academy/keksobooking';
const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};
const addForm = document.querySelector('.ad-form');
const main = document.querySelector('main');
const resetButton = document.querySelector('.ad-form__reset');

// Отправляю данные на сервер
const sendForm = (success) => {
  addForm.addEventListener('submit', () => {
    const formData = new FormData(addForm);
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
  resetForm(addForm, 'submit');
};

// Функции закрытия сообщения об успешной
const closeEscSuccessMessage = (evt) => {
  const popUp = main.querySelector('.success');

  evt.preventDefault();

  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {

    popUp.remove();
  }

  document.removeEventListener('keydown', closeEscSuccessMessage);
};

const closeSuccessMessage = () => {
  const popUp = main.querySelector('.success');
  popUp.remove();
  document.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', closeEscSuccessMessage);
};

// Сообщение об успешной отправке данных
function createSuccessMessage () {
  const templateSuccessMessage = document.querySelector('#success').content;
  const template = templateSuccessMessage.querySelector('.success');
  const successElement = template.cloneNode(true);
  main.appendChild(successElement);

  document.addEventListener('keydown', closeEscSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
}

sendForm(createSuccessMessage);

resetForm(resetButton, 'click');

