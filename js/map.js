import {addItemToMap} from './template-card.js';
import {togglePageStatus} from './form.js';

const LAT_START = 35.68283;
const LNG_START = 139.75945;
const ZOOM = 13;
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

// Перевожу старницу в неактивное состояние по умолчанию
togglePageStatus(false);

// Загружаю карту на старницу
const map = L.map('map-canvas')
  .on('load', () => {
    togglePageStatus(true); // Перевожу старницу в активное состояние при успешной загрузке карты
  })
  .setView({
    lat: LAT_START,
    lng: LNG_START,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Специальная метка выбора адреса
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
function creatMap (offers) {
  offers.forEach((point) => {
    const {lat, lng} = point.location;

    const icon = L.icon({
      iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
      .addTo(map)
      .bindPopup(
        addItemToMap(point),
      );
  });
}

// Возвращаю метку и все заполненные поля в изначальное состояние
const resetForm = (reset, run) => {
  reset.addEventListener(run, (evt) => {
    evt.preventDefault();

    address.value = `${LAT_START}, ${LNG_START}`;
    mainPinMarker.setLatLng({
      lat: LAT_START,
      lng: LNG_START,
    });
    map.setView({
      lat: LAT_START,
      lng: LNG_START,
    }, ZOOM);

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
  });
};

export {creatMap, resetForm};
