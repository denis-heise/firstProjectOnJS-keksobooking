// Перевод страницы в неактивное состояние
// 1. Форма заполнения информации об объявлении
const adForm = document.querySelector('.ad-form');
const header = adForm.querySelector('.ad-form-header');
const interactiveFormElements = adForm.querySelectorAll('.ad-form__element');
// 2. Форма с фильтрами
const mapFilters = document.querySelector('.map__filters');
const interactiveMapElements = mapFilters.querySelectorAll('.map__filter');
const features = mapFilters.querySelector('.map__features');

// Функция перевода страницы в неактивное состояние
function makePageInactive () {
  header.setAttribute('disabled', 'disabled');
  adForm.classList.add('ad-form--disabled');
  interactiveFormElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
  interactiveMapElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  features.setAttribute('disabled', 'disabled');
}
makePageInactive();

// Функция перевода страницы в активное состояние
function makePageActive () {
  header.removeAttribute('disabled');
  adForm.classList.remove('ad-form--disabled');
  interactiveFormElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  interactiveMapElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
  features.removeAttribute('disabled');
}
makePageActive();


