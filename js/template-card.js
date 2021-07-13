const OfferType = {
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};
const OfferTypeToPrice = {
  [OfferType.BUNGALOW]: 0,
  [OfferType.FLAT]: 1000,
  [OfferType.HOTEL]: 3000,
  [OfferType.HOUSE]: 5000,
  [OfferType.PALACE]: 10000,
};
const OfferTypeToReadable = {
  [OfferType.BUNGALOW]: 'Бунгало',
  [OfferType.FLAT]: 'Квартира',
  [OfferType.HOTEL]: 'Отель',
  [OfferType.HOUSE]: 'Дом',
  [OfferType.PALACE]: 'Дворец',
};
const templateFragmentNode = document.querySelector('#card').content;
const templatePopupNode = templateFragmentNode.querySelector('.popup');
const fragment = document.createDocumentFragment();

function addItemToMap (offerForPopup) {
  const { author, offer } = offerForPopup;
  const advertNode = templatePopupNode.cloneNode(true);
  const childElementsNode = advertNode.querySelectorAll('*');
  const popupTitleNode = advertNode.querySelector('.popup__title');
  const popupAddressNode = advertNode.querySelector('.popup__text--address');
  const popupDescriptionNode = advertNode.querySelector('.popup__description');
  const popupPriceNode = advertNode.querySelector('.popup__text--price');
  const popupFeaturesNode = advertNode.querySelector('.popup__features');
  const popupCapacityNode = advertNode.querySelector('.popup__text--capacity');
  const popupTypeNode =  advertNode.querySelector('.popup__type');
  const popupTimeNode = advertNode.querySelector('.popup__text--time');
  const popupPhotosNode = advertNode.querySelector('.popup__photos');
  const imgpopupPhotosNode = advertNode.querySelector('.popup__photo');
  const photoPopupNode = imgpopupPhotosNode.cloneNode();
  const popupAvatarNode = advertNode.querySelector('.popup__avatar');

  function replaceTitle (title) {
    if (title.length > 0) {
      popupTitleNode.classList.remove('hidden');
      popupTitleNode.textContent = title;
    }
    return popupTitleNode;
  }

  function replaceAddress (address) {
    if (address.length > 0) {
      popupAddressNode.classList.remove('hidden');
      popupAddressNode.textContent = address;
    }
  }

  function replaceDdscription (description)  {
    if (description !== '') {
      popupDescriptionNode.classList.remove('hidden');
      popupDescriptionNode.textContent = description;
    }
  }

  function replacePrice (price) {
    if (price > 0) {
      popupPriceNode.classList.remove('hidden');
      popupPriceNode.textContent = price;
    }
  }

  function replaceFeatures (features) {
    popupFeaturesNode.innerHTML = '';
    if (features !== '') {
      popupFeaturesNode.classList.remove('hidden');
    }
    if (features) {
      features.forEach((item) => {
        const featureNode = document.createElement('li');
        featureNode.classList.add('popup__feature', `popup__feature--${item}`);
        popupFeaturesNode.appendChild(featureNode);
      });
    }
  }

  function replaceType (type) {
    if (type !== '') {
      popupTypeNode.classList.remove('hidden');
      popupTypeNode.textContent = OfferTypeToReadable[type];
    }
  }

  function replaceRoomsAndGuests (rooms, guests) {
    if (rooms  > 0 && guests > 0) {
      popupCapacityNode.classList.remove('hidden');
      popupCapacityNode.textContent = `${rooms} комнаты для ${guests} гостей`;
    }
  }

  function replaceCheckinAndCheckout (checkin, checkout) {
    if (checkin  !== '' && checkout !== '') {
      popupTimeNode.classList.remove('hidden');
      popupTimeNode.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    }
  }

  function replacePhotos (photos) {
    popupPhotosNode.innerHTML = '';
    if (photos !== '') {
      popupPhotosNode.classList.remove('hidden');
      imgpopupPhotosNode.classList.remove('hidden');
    }
    if (photos) {
      photos.forEach( (item, ind) => {
        photoPopupNode.src = photos[ind];
        popupPhotosNode.appendChild(photoPopupNode);
      });
    }
  }

  function replaceAvatar (avatar) {
    if (avatar !== '') {
      popupAvatarNode.classList.remove('hidden');
      popupAvatarNode.src = avatar;
    }
  }

  for (const childNode of childElementsNode) {
    childNode.classList.add('hidden');
  }

  replaceAvatar(author.avatar);
  replaceAddress(offer.address);
  replaceDdscription(offer.description);
  replacePrice(offer.price);
  replaceFeatures(offer.features);
  replaceType(offer.type);
  replaceRoomsAndGuests(offer.rooms, offer.guests);
  replaceCheckinAndCheckout(offer.checkin, offer.checkout);
  replacePhotos(offer.photos);
  replaceTitle(offer.title);

  return fragment.appendChild(advertNode);
}

export {addItemToMap, OfferTypeToPrice};
