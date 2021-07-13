import {OfferTypeToPrice} from './template-card.js';

const adFormNode = document.querySelector('.ad-form');
const adFormFieldsetsNodes = adFormNode.querySelectorAll('fieldset');
const mapFiltersNode = document.querySelector('.map__filters');
const mapFormSelectsNodes = mapFiltersNode.querySelectorAll('.map__filter');
const priceNode = adFormNode.querySelector('#price');
const typeNode = adFormNode.querySelector('#type');
const timeInNode = adFormNode.querySelector('#timein');
const timeOutNode = adFormNode.querySelector('#timeout');
const roomNumberNode = adFormNode.querySelector('#room_number');
const capacityNode = adFormNode.querySelector('#capacity');
const RoomsToCapacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

// СОСТОЯНИЕ СТРАНИЦЫ (неактивное/акивное)
const toggleNodesDisabled = (nodes, isDisabled) => {
  nodes.forEach((item) => {
    item.disabled = isDisabled;
  });
};
const togglePageStatus = (isActive) => {
  adFormNode.classList.toggle('ad-form--disabled', !isActive);
  mapFiltersNode.classList.toggle('ad-form--disabled', !isActive);
  toggleNodesDisabled(adFormFieldsetsNodes, !isActive);
  toggleNodesDisabled(mapFormSelectsNodes, !isActive);
};

// ВАЛИДАЦИЯ

adFormNode.addEventListener('change', (evt) => {
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
      const price = OfferTypeToPrice[value];
      priceNode.min = price;
      priceNode.placeholder = price;
      break;
    }
    // Валидация количества комнат и мест
    case roomNumberNode.name:
    case capacityNode.name: {
      const roomNumber = roomNumberNode.value;
      const capacityNumber = parseInt(capacityNode.value, 10);
      capacityNode.setCustomValidity(RoomsToCapacities[roomNumber].includes(capacityNumber) ? '' : 'Количество гостей не подходит количеству комнат');
      break;
    }
  }
});

export {togglePageStatus};
