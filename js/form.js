import {offerTypeToReadable} from './template-card.js';
// СОСТОЯНИЕ СТРАНИЦЫ (неактивное/акивное)
const adForm = document.querySelector('.ad-form');
const adFormFieldsetsNodes = adForm.querySelectorAll('fieldset');
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
const priceOfHouse = adForm.querySelector('#price');
const typeOfHouse = adForm.querySelector('#type');
const timeInNode = adForm.querySelector('#timein');
const timeOutNode = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');
const ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

adForm.addEventListener('change', (evt) => {
  const { name, value } = evt.target;
  switch (name) {
    // Валидация времени заезда и выезда
    case timeInNode.name:
    case timeOutNode.name: {
      timeInNode.value = value;
      timeOutNode.value = value;
      break;
    }
    // Валидация цены за ночь
    case typeOfHouse.name:
    case priceOfHouse.name:
      priceOfHouse.placeholder = offerTypeToReadable[typeOfHouse.value] [1];
      priceOfHouse.min = offerTypeToReadable[typeOfHouse.value] [1];
      priceOfHouse.value < priceOfHouse.getAttribute('placeholder');
      break;
    // Валидация количества комнат и мест
    case roomNumber.name:
      capacityOption.forEach((item) => {
        item.selected = (ROOM_CAPACITY[roomNumber.value] [0] === item.value);
        item.hidden = !(ROOM_CAPACITY[roomNumber.value].indexOf(item.value) >= 0);
      });
      break;
  }
});

export {togglePageStatus};
