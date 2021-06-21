import {createOffers} from './util.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();
const similarOffers  = createOffers();

similarOffers.forEach(({author, offer}) => {
  const advertElement = template.cloneNode(true);
  const offerTypeAssociatedWithSignatures = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

  const popupTitle = advertElement.querySelector('.popup__title');
  if (offer.title.length > 0) {
    popupTitle.classList.remove('hidden');
    popupTitle.textContent = offer.title;
  }

  const popupAddress = advertElement.querySelector('.popup__text--address');
  popupAddress.classList.add('hidden');
  if (offer.address.length > 0) {
    popupAddress.classList.remove('hidden');
    popupAddress.textContent = offer.address;
  }

  const popupDescription = advertElement.querySelector('.popup__description');
  popupDescription.classList.add('hidden');
  if (offer.description.length > 0) {
    popupDescription.classList.remove('hidden');
    popupDescription.textContent = offer.description;
  }

  const popupAvatar = advertElement.querySelector('.popup__avatar');
  popupAvatar.classList.add('hidden');
  if (author.avatar.length > 0) {
    popupAvatar.classList.remove('hidden');
    popupAvatar.src = author.avatar;
  }

  const popupFeatures = advertElement.querySelector('.popup__features');
  popupFeatures.classList.add('hidden');
  if (offer.features.length > 0) {
    popupFeatures.classList.remove('hidden');
    popupFeatures.textContent = offer.features;
  }

  const popupPrice = advertElement.querySelector('.popup__text--price');
  popupPrice.classList.add('hidden');
  if (offer.price > 0) {
    popupPrice.classList.remove('hidden');
    popupPrice.textContent = popupPrice.textContent.replace('5200', offer.price);
  }

  const popupType =  advertElement.querySelector('.popup__type');
  popupType.classList.add('hidden');
  if (offer.type.length > 0) {
    popupType.classList.remove('hidden');
    popupType.textContent = popupType.textContent.replace('Квартира', offerTypeAssociatedWithSignatures[offer.type]);
  }

  const popupCapacity = advertElement.querySelector('.popup__text--capacity');
  popupCapacity.classList.add('hidden');
  if (offer.rooms  > 0 && offer.guests > 0) {
    popupCapacity.classList.remove('hidden');
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  const popupTime = advertElement.querySelector('.popup__text--time');
  popupTime.classList.add('hidden');
  if (offer.checkin.length > 0 && offer.checkout.length > 0) {
    popupTime.classList.remove('hidden');
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  const popupPhotos = advertElement.querySelector('.popup__photos');
  const imgPopupPhotos = advertElement.querySelector('.popup__photo');
  popupPhotos.classList.add('hidden');
  popupPhotos.textContent = '';
  for(let ind = 0, img; ind <= offer.photos.length -1; ind++) {
    if (offer.photos.length > 0) {
      popupPhotos.classList.remove('hidden');
      img = imgPopupPhotos.cloneNode();
      img.src = offer.photos[ind];
      popupPhotos.appendChild(img);
    }
  }

  fragment.appendChild(advertElement);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.append(fragment);
