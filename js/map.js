function creatMap (addItemToMap, createOffers, togglePageStatus) {
  // Перевожу старницу в неактивное состояние по умолчанию
  togglePageStatus(false);

  // Загружаю карту на старницу
  const map = L.map('map-canvas')
    .on('load', () => {
      togglePageStatus(true); // Перевожу старницу в активное состояние при успешной загрузке карты
    })
    .setView({
      lat: 35.68283,
      lng: 139.75945,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // Специальная метка выбора адреса
  const address = document.querySelector('#address');
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    {
      lat: 35.68283,
      lng: 139.75945,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  // Указал координаты начального положения специальной метки
  const startAddressMarker =  mainPinMarker.getLatLng();
  address.value = `${startAddressMarker.lat}, ${startAddressMarker.lng}`;

  // Обработчик для получения координат
  mainPinMarker.on('moveend', (evt) => {
    const addressMarker = evt.target.getLatLng();
    address.value = `${addressMarker.lat.toFixed(5)}, ${addressMarker.lng.toFixed(5)}`;
  });

  // Метка похожего объявления
  const offers = createOffers(10);
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

export {creatMap};
