import {addItemToMap} from './template-card.js';
import {togglePageStatus} from './form.js';
import {getFilteredData} from './filter.js';

const LAT_START = 35.68283;
const LNG_START = 139.75945;
const VIEW_ZOOM = 13;
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
const RERENDER = 500;
const DEFAULT_AVATAR = './img/muffin-grey.svg';
const address = document.querySelector('#address');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const features = document.querySelectorAll('.features__checkbox');
const type = document.querySelector('#type');
const filters = document.querySelector('.map__filters');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
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
address.value = `${LAT_START}, ${LNG_START}`;

// Обработчик для получения координат
mainPinMarker.addEventListener('moveend', (evt) => {
  const addressMarker = evt.target.getLatLng();
  address.value = `${addressMarker.lat.toFixed(5)}, ${addressMarker.lng.toFixed(5)}`;
});

// Метка похожего объявления
const markerGroup = L.layerGroup().addTo(map);
function creatMap (offers) {
  offers.forEach((point) => {
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
const getChangeProcess  = debounce(() => getMapFiltersChanges(), RERENDER);
const getSuccess = (data) => {
  extractedData = data.slice();
  creatMap(extractedData);
  filters.addEventListener('change', getChangeProcess );
};

// Возвращаю метку и все заполненные поля в изначальное состояние
const resetForm = (reset, run) => {
  reset.addEventListener(run, (evt) => {
    const containerPhotos = document.querySelector('.ad-form__photo-container');
    const previewPhotos = containerPhotos.querySelectorAll('.ad-form__photo');
    evt.preventDefault();
    address.value = `${LAT_START}, ${LNG_START}`;
    mainPinMarker.setLatLng({
      lat: LAT_START,
      lng: LNG_START,
    });
    map.setView({
      lat: LAT_START,
      lng: LNG_START,
    }, VIEW_ZOOM);
    title.value = '';
    price.value = '';
    price.placeholder = '1000';
    description.value = '';
    timein.value = '12:00';
    timeout.value = '12:00';
    capacity.value = '1';
    roomNumber.value = '1';
    type.value = 'flat';
    features.forEach((item) => {
      item.checked = false;
    });
    previewAvatar.src = DEFAULT_AVATAR;

    previewPhotos.forEach((item) => {
      item.remove();
    });
    const divPhoto = document.createElement('div');
    divPhoto.classList.add('ad-form__photo');
    containerPhotos.appendChild(divPhoto);
  });
};

export {getSuccess, resetForm};
