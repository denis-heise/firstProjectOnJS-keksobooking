import {createOffers} from './util.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();
const advertElement = template.cloneNode(true);
const childElements = advertElement.querySelectorAll('*');
for (const childNode of childElements) {
  childNode.classList.add('hidden');
}
const offerTypeToReadable = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};
const similarOffers  = createOffers(1);
const mapCanvas = document.querySelector('#map-canvas');
const OFFER_FOR_POPUP_IDX = 0;
const offerForPopup = similarOffers[OFFER_FOR_POPUP_IDX];
const author = offerForPopup.author;
const offer = offerForPopup.offer;

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
  if (description.length > 0) {
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
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  if (features.length > 0) {
    popupFeatures.classList.remove('hidden');
  }
  for (let ind = 0; ind < features.length; ind++) {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${features[ind]}`);
    popupFeatures.appendChild(feature);
  }
}

function replaceType (type) {
  const popupType =  advertElement.querySelector('.popup__type');
  if (type.length > 0) {
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
  if (checkin.length > 0 && checkout.length > 0) {
    popupTime.classList.remove('hidden');
    popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
}

function replacePhotos (photos) {
  const popupPhotos = advertElement.querySelector('.popup__photos');
  const imgPopupPhotos = advertElement.querySelector('.popup__photo');
  popupPhotos.textContent = '';
  if (photos.length > 0) {
    popupPhotos.classList.remove('hidden');
    imgPopupPhotos.classList.remove('hidden');
  }
  for(let ind = 0, img; ind <= photos.length -1; ind++) {
    img = imgPopupPhotos.cloneNode();
    img.src = photos[ind];
    popupPhotos.appendChild(img);
  }
}

function replaceAvatar (avatar) {
  const popupAvatar = advertElement.querySelector('.popup__avatar');
  if (avatar.length > 0) {
    popupAvatar.classList.remove('hidden');
    popupAvatar.src = avatar;
  }
}

function addItemToMap () {
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
}
fragment.appendChild(advertElement);
mapCanvas.append(fragment);

export {addItemToMap};
