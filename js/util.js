import {types, checkins, checkouts, features, photos} from './data.js';

function getRandomInteger (min, max) {
  if (min >= 0 && max > 0 && min <= max) {
    if (min === max) {
      return Math.round(min);
    }
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}
function getRandomArbitrary (min, max, digits) {
  if (min >= 0 && max > 0 && min <= max) {
    if (min === max) {
      const dottedNumberFirst = Math.round((max - min) + min);
      return dottedNumberFirst.toFixed(digits);
    }
    const dottedNumberSecond = Math.random() * (max - min) + min;
    return dottedNumberSecond.toFixed(digits);
  }
  return('Задан неверный диапазон! Укажите другие числа.');
}

const getRandomItems = (items, count) => items.slice(0, count);

const createOffer = () => {
  const avatarNumber = getRandomInteger(1, 9);
  const locationLat = getRandomArbitrary(15, 70, 5);
  const locationLng = getRandomArbitrary(100, 180, 5);
  const typeElement = getRandomInteger(1, types.length - 1);
  const checkinElement = getRandomInteger(1, checkins.length - 1);
  const checkoutElement = getRandomInteger(1, checkouts.length - 1);

  return {
    author: {
      avatar: `img/avatars/user0${avatarNumber}.png`,
    },

    offer: {
      title: 'Offer',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger(400, 5000),
      type: types[typeElement],
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 5),
      checkin: checkins[checkinElement],
      checkout: checkouts[checkoutElement],
      features: getRandomItems(features, getRandomInteger(0, features.length - 1)),
      description: 'Очень комфортные комнаты по выгодным ценам',
      photos: getRandomItems(photos, getRandomInteger(0, photos.length - 1)),
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const createOffers = (count) => {
  const offers = new Array(count).fill(null).map(() => createOffer());
  return offers;
};
export {createOffers};
