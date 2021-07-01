// Перевод страницы в неактивное состояние
// 1. Форма заполнения информации об объявлении
const adForm = document.querySelector('.ad-form');
const adFormFieldsetsNodes = adForm.querySelectorAll('fieldset');
// 2. Форма с фильтрами
const mapFilters = document.querySelector('.map__filters');
const mapFormSelectsNodes = mapFilters.querySelectorAll('.map__filter');

const toggleNodesDisabled = (nodes, isDisabled) => {
  nodes.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const togglePageStatus = (isActive) => {
  adForm.classList.toggle('ad-form--disabled', !isActive);
  mapFilters.classList.toggle('ad-form--disabled', !isActive);

  toggleNodesDisabled(adFormFieldsetsNodes, !isActive);
  toggleNodesDisabled(mapFormSelectsNodes, !isActive);
};

// ВАЛИДАЦИЯ
const title = adForm.querySelector('#title');
const priceOfHouse = adForm.querySelector('#price');
// Проверка заголовка
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
title.addEventListener('input', () => {
  const valueLength = title.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

// Проверка цены за ночь
const typeOfHouse = adForm.querySelector('#type');
const housesPricesDictionary = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const selectHouseValidateHandler = function () {
  const typeValue = typeOfHouse.value;
  priceOfHouse.placeholder = housesPricesDictionary[typeValue];
  priceOfHouse.min = housesPricesDictionary[typeValue];
};
const correctInitialValues = function () {
  priceOfHouse.placeholder = housesPricesDictionary[typeOfHouse.value];
  priceOfHouse.min = housesPricesDictionary[typeOfHouse.value];
};
correctInitialValues();

typeOfHouse.addEventListener('change', selectHouseValidateHandler);
priceOfHouse.addEventListener('change', selectHouseValidateHandler);

const MAX_PRICE = 1000000;
priceOfHouse.addEventListener('input', () => {
  const valueLength = priceOfHouse.value;
  const minPrice = priceOfHouse.getAttribute('placeholder');
  if (valueLength < minPrice.value) {
    priceOfHouse.setCustomValidity(`Цена не может быть меньше ${  minPrice } руб.`); // НЕ показывает вариант валидации от меня, только браузерный
  } else if (valueLength > MAX_PRICE) {
    priceOfHouse.setCustomValidity(`Цена не может превышать ${  MAX_PRICE }  руб.`);
  } else {
    priceOfHouse.setCustomValidity('');
  }
  priceOfHouse.reportValidity();
});

// Синхронизация «Время заезда» с «Время выезда» (время выезда равно времени выезда и наоборот)
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const changeTimeIn = function () {
  timeout.value = timein.value;
};
const changeTimeOut = function () {
  timein.value = timeout.value;
};
timein.addEventListener('change', changeTimeIn);
timeout.addEventListener('change', changeTimeOut);

// Синхронизация «Количество комнат» с «Количество мест» (скрываю количество мест в зависимости от количества гостей)
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');
const ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const changeRoomNumber = function () {
  capacityOption.forEach((item) => {
    item.selected = (ROOM_CAPACITY[roomNumber.value] [0] === item.value);
    item.hidden = !(ROOM_CAPACITY[roomNumber.value].indexOf(item.value) >= 0);
  });
};
changeRoomNumber();
roomNumber.addEventListener('change', changeRoomNumber);

export {togglePageStatus};
