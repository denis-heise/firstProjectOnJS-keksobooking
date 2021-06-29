// Перевод страницы в неактивное состояние
// 1. Форма заполнения информации об объявлении
const adFormNode = document.querySelector('.ad-form');
const adFormFieldsetsNodes = adFormNode.querySelectorAll('fieldset');
// 2. Форма с фильтрами
const mapFormNode = document.querySelector('.map__filters');
const mapFormSelectsNodes = mapFormNode.querySelectorAll('.map__filter');

const toggleNodesDisabled = (nodes, isDisabled) => {
  nodes.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const togglePageStatus = (isActive) => {
  adFormNode.classList.toggle('ad-form--disabled', !isActive);
  mapFormNode.classList.toggle('ad-form--disabled', !isActive);

  toggleNodesDisabled(adFormFieldsetsNodes, !isActive);
  toggleNodesDisabled(mapFormSelectsNodes, !isActive);
};

export {togglePageStatus};
