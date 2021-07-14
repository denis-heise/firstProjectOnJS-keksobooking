import {addItemToMap} from './template-card.js';
import {togglePageStatus} from './form.js';
import {getFilteredData} from './filter.js';

const LAT_START = 35.68283;
const LNG_START = 139.75945;
const VIEW_ZOOM = 13;
const RERENDER = 500;
const NUMBER_OF_ADS = 10;
const NUMBER_AFTER_POINT = 5;
const WIDTH_MAIN_ICON = 52;
const HEIGHT_MAIN_ICON = 52;
const WIDTH_MAIN_ANCHOR = 26;
const HEIGHT_MAIN_ANCHOR = 52;
const WIDTH_SIMILAR_ICON = 40;
const HEIGHT_SIMILAR_ICON = 40;
const WIDTH_SIMILAR_ANCHOR = 20;
const HEIGHT_SIMILAR_ANCHOR = 40;
const TITLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_ICON_URL = './img/main-pin.svg';
const SIMILAR_ICON_URL = './img/pin.svg';
const DEFAULT_AVATAR = './img/muffin-grey.svg';
const addressNode = document.querySelector('#address');
const titleNode = document.querySelector('#title');
const priceNode = document.querySelector('#price');
const descriptionNode = document.querySelector('#description');
const timeinNode = document.querySelector('#timein');
const timeoutNode = document.querySelector('#timeout');
const roomNumberNode = document.querySelector('#room_number');
const capacityNode = document.querySelector('#capacity');
const featuresNodes = document.querySelectorAll('.features__checkbox');
const typeNode = document.querySelector('#type');
const filtersNode = document.querySelector('.map__filters');
const previewAvatarNode = document.querySelector('.ad-form-header__preview img');
const containerPhotosNode = document.querySelector('.ad-form__photo-container');
let extractedData = [];

// Перевожу старницу в неактивное состояние по умолчанию
togglePageStatus(false);

// Загружаю карту на старницу
const map = L.map('map-canvas')
  .addEventListener('load', () => {
    togglePageStatus(true); // Перевожу старницу в активное состояние при успешной загрузке карты
  })
  .setView({
    lat: LAT_START,
    lng: LNG_START,
  }, VIEW_ZOOM);

L.tileLayer(
  TITLE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

// Специальная метка выбора адреса
const mainPinIcon = L.icon({
  iconUrl: MAIN_ICON_URL,
  iconSize: [WIDTH_MAIN_ICON, HEIGHT_MAIN_ICON],
  iconAnchor: [WIDTH_MAIN_ANCHOR, HEIGHT_MAIN_ANCHOR],
});
const mainPinMarker = L.marker(
  {
    lat: LAT_START,
    lng: LNG_START,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

// Указал координаты начального положения специальной метки
addressNode.value = `${LAT_START}, ${LNG_START}`;

// Обработчик для получения координат
mainPinMarker.addEventListener('moveend', (evt) => {
  const addressMarker = evt.target.getLatLng();
  addressNode.value = `${addressMarker.lat.toFixed(NUMBER_AFTER_POINT)}, ${addressMarker.lng.toFixed(NUMBER_AFTER_POINT)}`;
});

// Метка похожего объявления
const markerGroup = L.layerGroup().addTo(map);
function creatMap (offers) {
  offers.slice(0, NUMBER_OF_ADS).forEach((point) => {
    const {lat, lng} = point.location;
    const icon = L.icon({
      iconUrl: SIMILAR_ICON_URL,
      iconSize: [WIDTH_SIMILAR_ICON, HEIGHT_SIMILAR_ICON],
      iconAnchor: [WIDTH_SIMILAR_ANCHOR, HEIGHT_SIMILAR_ANCHOR],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(
        addItemToMap(point),
      );
  });
}

// Устраняю дребезг
function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Добавляю фильтрацию объявлений
const getMapFiltersChanges = () => {
  markerGroup.clearLayers();
  creatMap(getFilteredData(extractedData));
};
const onMapFiltersChange  = debounce(() => getMapFiltersChanges(), RERENDER);

const getSuccess = (data) => {
  extractedData = data.slice();
  creatMap(extractedData);
  filtersNode.addEventListener('change', onMapFiltersChange );
};

// Возвращаю метку и все заполненные поля в изначальное состояние
const resetForm = (reset, run) => {
  reset.addEventListener(run, (evt) => {
    evt.preventDefault();
    addressNode.value = `${LAT_START}, ${LNG_START}`;
    mainPinMarker.setLatLng({
      lat: LAT_START,
      lng: LNG_START,
    });
    map.setView({
      lat: LAT_START,
      lng: LNG_START,
    }, VIEW_ZOOM);
    titleNode.value = '';
    priceNode.value = '';
    priceNode.placeholder = '1000';
    priceNode.min = '1000';
    descriptionNode.value = '';
    timeinNode.value = '12:00';
    timeoutNode.value = '12:00';
    capacityNode.value = '1';
    roomNumberNode.value = '1';
    typeNode.value = 'flat';
    featuresNodes.forEach((item) => {
      item.checked = false;
    });
    previewAvatarNode.src = DEFAULT_AVATAR;

    const previewPhotosNode = containerPhotosNode.querySelectorAll('.ad-form__photo');
    previewPhotosNode.forEach((item) => {
      item.remove();
    });
    const divPhotoNode = document.createElement('div');
    divPhotoNode.classList.add('ad-form__photo');
    containerPhotosNode.appendChild(divPhotoNode);
  });
};


export {creatMap, resetForm, getSuccess};
