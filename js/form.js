import {offerTypeToPrice} from './template-card.js';
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
const priceNode = adForm.querySelector('#price');
const typeNode = adForm.querySelector('#type');
const timeInNode = adForm.querySelector('#timein');
const timeOutNode = adForm.querySelector('#timeout');
const roomNumberNode = adForm.querySelector('#room_number');
const capacityNode = adForm.querySelector('#capacity');
const roomsToCapacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
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
    case typeNode.name: {
      const price = offerTypeToPrice[value];
      priceNode.min = price;
      priceNode.placeholder = price;
      break;
    }
    // Валидация количества комнат и мест
    case roomNumberNode.name:
    case capacityNode.name: {
      const roomNumber = roomNumberNode.value;
      const capacityNumber = parseInt(capacityNode.value, 10);
      capacityNode.setCustomValidity(roomsToCapacities[roomNumber].includes(capacityNumber) ? '' : 'Количество гостей не подходит количеству комнат');
      break;
    }
  }
});

export {togglePageStatus};
