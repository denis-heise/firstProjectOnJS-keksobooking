// Перевод страницы в неактивное состояние
// 1. Форма заполнения информации об объявлении
const adForm = document.querySelector('.ad-form');
const header = adForm.querySelector('.ad-form-header');
const interactiveFormElements = adForm.querySelectorAll('.ad-form__element');
// 2. Форма с фильтрами
const mapFilters = document.querySelector('.map__filters');
const interactiveMapElements = mapFilters.querySelectorAll('.map__filter');
const features = mapFilters.querySelector('.map__features');

// Функция для переключения состояния страницы (неактивное/активное)
function isActive (flag) {
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  header.disabled = true;
  interactiveFormElements.forEach((item) => {
    item.disabled = true;
  });
  interactiveMapElements.forEach((item) => {
    item.disabled = true;
  });
  features.disabled = true;

  if (flag === true) {
    header.disabled = false;
    interactiveFormElements.forEach((item) => {
      item.disabled = false;
    });
    interactiveMapElements.forEach((item) => {
      item.disabled = false;
    });
    features.disabled = false;
    adForm.classList.toggle('ad-form--disabled');
    mapFilters.classList.toggle('map__filters--disabled');
  }
}

export {isActive};
