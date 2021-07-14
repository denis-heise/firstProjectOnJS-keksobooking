import {getSuccess} from './map.js';

const URL_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const TEXT_ERROR = 'Ошибка! Обновите страницу';
const REFRESH_BUTTON = 'Закрыть';
const VALUE_DEFAULT = 'any';
const housingTypeNode = document.querySelector('#housing-type');
const housingPriceNode = document.querySelector('#housing-price');
const housingRoomsNode = document.querySelector('#housing-rooms');
const housingGuestsNode = document.querySelector('#housing-guests');
const mapCheckboxNodes = document.querySelectorAll('.map__checkbox');
const templateErrorMessageNode = document.querySelector('#error').content;
const templateNode = templateErrorMessageNode.querySelector('.error');
const errorElement = templateNode.cloneNode(true);
const mainNode = document.querySelector('main');
const errorMessageNode = errorElement.querySelector('.error__message');
const errorButtonNode = errorElement.querySelector('.error__button');
const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

// Сообщение об ошибке
const createErrorMesage = () => {
  errorMessageNode.textContent = TEXT_ERROR;
  errorButtonNode.textContent = REFRESH_BUTTON;
  mainNode.appendChild(errorElement);
  const onErrorWindowClose = (evt) => {
    errorElement.remove();
    document.removeEventListener('click', onErrorWindowClose);
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorWindowClose);
    }
  };
  document.addEventListener('click', onErrorWindowClose);
  document.addEventListener('keydown', onErrorWindowClose);
};

// Получаю данные с сервера и добавляю на карту
fetch(URL_DATA)
  .then((response) => response.json())
  .then((data) => {
    getSuccess(data);
  })
  .catch(() =>{
    createErrorMesage();
  });

// Возвращаю фильтры в изначальное состояние
const resetFilters = (reset, run) => {
  reset.addEventListener(run, (evt) => {
    evt.preventDefault();
    housingTypeNode.value = VALUE_DEFAULT;
    housingPriceNode.value = VALUE_DEFAULT;
    housingRoomsNode.value = VALUE_DEFAULT;
    housingGuestsNode.value = VALUE_DEFAULT;
    mapCheckboxNodes.forEach((item) => {
      item.checked = false;
    });
    fetch(URL_DATA)
      .then((response) => response.json())
      .then((data) => {
        getSuccess(data);
      })
      .catch(() =>{
        createErrorMesage();
      });
  });
};

export {createErrorMesage, resetFilters, Keys};
