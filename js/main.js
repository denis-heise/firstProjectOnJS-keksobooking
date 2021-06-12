function randomIntegerAuthor(min, max) {
  if (min >= 0 && max > 0 && min <= max) {
    if (min === max) {
      return Math.round(min);
    }
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}
function getRandomArbitrary(min, max, digits) {
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

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const checkin = [
  '12:00',
  '13:00',
  '14:00',
];
const checkout = [
  '12:00',
  '13:00',
  '14:00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomItems = (items, count) => items.slice(0, count);

const createOffer = () => {
  const avatarNumber = randomIntegerAuthor(1, 9);
  const locationLat = getRandomArbitrary(15, 70, 5);
  const locationLng = getRandomArbitrary(100, 180, 5);
  const typeElement = randomIntegerAuthor(1, features.length - 1);
  const checkinElement = randomIntegerAuthor(1, checkin.length - 1);
  const checkoutElement = randomIntegerAuthor(1, checkout.length - 1);

  return {
    author: {
      avatar: `img/avatars/user0${avatarNumber}.png`,
    },

    offer: {
      title: 'Offer',
      address: `${locationLat}, ${locationLng}`,
      price: randomIntegerAuthor(400, 5000),
      type: type[typeElement],
      rooms: randomIntegerAuthor(1, 3),
      guests: randomIntegerAuthor(1, 5),
      checkin: checkin[checkinElement],
      checkout: checkout[checkoutElement],
      features: getRandomItems(features, randomIntegerAuthor(0, features.length - 1)),
      description: 'Очень комфортные комнаты по выгодным ценам',
      photos: getRandomItems(photos, randomIntegerAuthor(0, photos.length - 1)),
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const offers = new Array(10).fill(null).map(() => createOffer());

console.log(offers);

