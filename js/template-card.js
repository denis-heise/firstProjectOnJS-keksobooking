const offerType = {
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};
const offerTypeToPrice = {
  [offerType.BUNGALOW]: 0,
  [offerType.FLAT]: 1000,
  [offerType.HOTEL]: 3000,
  [offerType.HOUSE]: 5000,
  [offerType.PALACE]: 10000,
};
const offerTypeToReadable = {
  [offerType.BUNGALOW]: 'Бунгало',
  [offerType.FLAT]: 'Квартира',
  [offerType.HOTEL]: 'Отель',
  [offerType.HOUSE]: 'Дом',
  [offerType.PALACE]: 'Дворец',
};

function addItemToMap (offerForPopup) {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const advertElement = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const { author, offer } = offerForPopup;

  function replaceTitle (title) {
    const popupTitle = advertElement.querySelector('.popup__title');
    if (title.length > 0) {
      popupTitle.classList.remove('hidden');
      popupTitle.textContent = title;
    }
    return popupTitle;
  }

  function replaceAddress (address) {
    const popupAddress = advertElement.querySelector('.popup__text--address');
    if (address.length > 0) {
      popupAddress.classList.remove('hidden');
      popupAddress.textContent = address;
    }
  }

  function replaceDdscription (description)  {
    const popupDescription = advertElement.querySelector('.popup__description');
    if (description !== '') {
      popupDescription.classList.remove('hidden');
      popupDescription.textContent = description;
    }
  }

  function replacePrice (price) {
    const popupPrice = advertElement.querySelector('.popup__text--price');
    if (price > 0) {
      popupPrice.classList.remove('hidden');
      popupPrice.textContent = price;
    }
  }

  function replaceFeatures (features) {
    const popupFeatures = advertElement.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    if (features !== '') {
      popupFeatures.classList.remove('hidden');
    }
    if (features) {
      features.forEach((item) => {
        const feature = document.createElement('li');
        feature.classList.add('popup__feature', `popup__feature--${item}`);
        popupFeatures.appendChild(feature);
      });
    }
  }

  function replaceType (type) {
    const popupType =  advertElement.querySelector('.popup__type');
    if (type !== '') {
      popupType.classList.remove('hidden');
      popupType.textContent = offerTypeToReadable[type];
    }
  }

  function replaceRoomsAndGuests (rooms, guests) {
    const popupCapacity = advertElement.querySelector('.popup__text--capacity');
    if (rooms  > 0 && guests > 0) {
      popupCapacity.classList.remove('hidden');
      popupCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
    }
  }

  function replaceCheckinAndCheckout (checkin, checkout) {
    const popupTime = advertElement.querySelector('.popup__text--time');
    if (checkin  !== '' && checkout !== '') {
      popupTime.classList.remove('hidden');
      popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    }
  }

  function replacePhotos (photos) {
    const popupPhotos = advertElement.querySelector('.popup__photos');
    const imgPopupPhotos = advertElement.querySelector('.popup__photo');
    popupPhotos.innerHTML = '';
    if (photos !== '') {
      popupPhotos.classList.remove('hidden');
      imgPopupPhotos.classList.remove('hidden');
    }
    if (photos) {
      photos.forEach( (item, ind) => {
        const img = imgPopupPhotos.cloneNode();
        img.src = photos[ind];
        popupPhotos.appendChild(img);
      });
    }
  }

  function replaceAvatar (avatar) {
    const popupAvatar = advertElement.querySelector('.popup__avatar');
    if (avatar !== '') {
      popupAvatar.classList.remove('hidden');
      popupAvatar.src = avatar;
    }
  }

  const childElements = advertElement.querySelectorAll('*');
  for (const childNode of childElements) {
    childNode.classList.add('hidden');
  }

  replaceAvatar(author.avatar);
  replaceAddress(offer.address);
  replaceDdscription(offer.description);
  replacePrice(offer.price);
  replaceFeatures(offer.features);
  replaceType(offer.type);
  replaceRoomsAndGuests(offer.rooms, offer.guests);
  replaceRoomsAndGuests(offer.rooms, offer.guests);
  replaceCheckinAndCheckout(offer.checkin, offer.checkout);
  replacePhotos(offer.photos);
  replaceTitle(offer.title);

  return fragment.appendChild(advertElement);
}

export {addItemToMap, offerTypeToPrice};
