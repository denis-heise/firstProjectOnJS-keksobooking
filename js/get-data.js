import {getSuccess} from './map.js';

const URL_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const TEXT_ERROR = 'Ошибка! Обновите страницу';
const REFRESH_BUTTON = 'Закрыть';
const NUMBER_OF_ADS = 10;
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapCheckbox = document.querySelectorAll('.map__checkbox');
const VALUE_DEFAULT = 'any';

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
    getSuccess(dataOffers);
  })
  .catch(() =>{
    createErrorMesage();
  });

// Возвращаю фильтры в изначальное состояние
const resetFilters = (reset, run) => {
  reset.addEventListener(run, (evt) => {
    evt.preventDefault();
    housingType.value = VALUE_DEFAULT;
    housingPrice.value = VALUE_DEFAULT;
    housingRooms.value = VALUE_DEFAULT;
    housingGuests.value = VALUE_DEFAULT;
    mapCheckbox.forEach((item) => {
      item.checked = false;
    });
    fetch(URL_DATA)
      .then((response) => response.json())
      .then((data) => {
        const dataOffers = data.slice(0, NUMBER_OF_ADS);
        getSuccess(dataOffers);
      })
      .catch(() =>{
        createErrorMesage();
      });
  });
};

export {createErrorMesage, resetFilters};
