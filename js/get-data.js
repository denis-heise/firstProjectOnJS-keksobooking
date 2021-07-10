import {creatMap} from './map.js';

const URL_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const TEXT_ERROR = 'Ошибка! Обновите страницу';
const REFRESH_BUTTON = 'Закрыть';
const NUMBER_OF_ADS = 10;

// Сообщение об ошибке
const createErrorMesage = () => {
  const templateErrorMessage = document.querySelector('#error').content;
  const template = templateErrorMessage.querySelector('.error');
  const errorElement = template.cloneNode(true);
  const main = document.querySelector('main');
  const errorMessage = errorElement.querySelector('.error__message');
  errorMessage.textContent = TEXT_ERROR;

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.textContent = REFRESH_BUTTON;

  main.appendChild(errorElement);

  const closeErrorWindow = () => {
    errorElement.remove();
    document.removeEventListener('click', closeErrorWindow);
  };
  errorButton.addEventListener('click', closeErrorWindow);
};

// Получаю данные с сервера и добавляю на карту
fetch(URL_DATA)
  .then((response) => response.json())
  .then((data) => {
    const dataOffers = data.slice(0, NUMBER_OF_ADS);
    creatMap(dataOffers);
  })
  .catch(() =>{
    createErrorMesage();
  });

export {createErrorMesage};
