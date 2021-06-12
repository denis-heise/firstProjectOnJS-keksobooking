/*
//Функция, возвращающая случайное целое число из переданного диапазона включительно
function randomInteger(min, max) {
  if (min >= 0 && max > 0 && min <= max) {
    if (min === max) {
      return Math.round(min);
    }
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  return('Задан неверный диапазон! Укажите другие числа.');
}
// числа к примеру
randomInteger(20, 55);
//Источник: https://learn.javascript.ru/task/random-int-min-max


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
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
// числа к примеру
getRandomArbitrary(1, 10, 5);
// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

//  ФУНКЦИИ ОБЪЕКТОВ
// ПЕРВАЯ часть
// 1 объект:
function randomIntegerAuthor(min, max) {
  if (min >= 0 && max > 0 && min <= max) {
    if (min === max) {
      return Math.round(min);
    }
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}
// 2 объект:
//1 блок 2 объекта
function randomIntegerFirstFields(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
//console.log(offer);
//2 блок 2 объекта
function getRanValues(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random ({type, checkin, checkout}) {
  return `${type[getRanValues(0, type.length - 1)]  }, ${  checkin[getRanValues(0, checkin.length - 1)]  }, ${  checkout[getRanValues(0, checkout.length - 1)]}`;
}

// ПЕРВАЯ часть функций объектов закончились

// ПЕРВЫЙ ОБЪЕКТ (НАЧАЛО)
const author = {
  avatar: 'img/avatars/user{{xx}}.png',
};
// ПЕРВЫЙ ОБЪЕКТ (КОНЕЦ)

// ВТОРОЙ ОБЪЕКТ (НАЧАЛО)
const offer = {
  title: '',
  // 1 блок
  price: '',
  rooms: '',
  guests: '',
  description: '',
  // 1 блок
  // 2 блок
  type: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  checkin: [
    '12:00',
    '13:00',
    '14:00',
  ],
  checkout: [
    '12:00',
    '13:00',
    '14:00',
  ],
  // 2 блок
  // 3 блок
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
  // 3 блок
  // 4 блок
  adress:[17.53000, 119.10000],
};
// ВТОРОЙ ОБЪЕКТ (КОНЕЦ)

// ТРЕТИЙ ОБЪЕКТ (НАЧАЛО)
const location = {
  lat: [35.65000, 35.70000],
  lng: [139.70000, 139.80000],
};
// ТРЕТИЙ ОБЪЕКТ (КОНЕЦ)

// ВТОРАЯ часть функций
//3 блок 2 объекта
const getRandomArrayElementThirdBlock = (elements) => elements[Math.floor(Math.random() * elements.length)];
function getRandomElementFeatures ({features}) {
  return getRandomArrayElementThirdBlock(features);
}
function getRandomElementPhotos ({photos}) {
  return getRandomArrayElementThirdBlock(photos);
}
const commonArrFeatures = new Array(1).fill(' ').map(() => getRandomElementFeatures(offer));
const commonArrPhotos = new Array(1).fill(' ').map(() => getRandomElementPhotos(offer));
//4 блок 2 объекта
const getRandomAdress = () => () => {
  const [adress] = Object.values(offer).map(([min, max]) => +(Math.random() * (max - min) + min).toFixed(5));
  return [adress];
};
const RandomAdress = getRandomAdress(offer);
for (let ind = 0; ind < 1; ind++) {
  String(`${RandomAdress()  },${  RandomAdress()}`);}

// 3 объект:
const getRandomLocation = () => () => {
  const [lat, lng] = Object.values(location).map(([min, max]) => +(Math.random() * (max - min) + min).toFixed(5));
  return [lat, lng];
};
const RandomLocation = getRandomLocation(location);
for (let ind = 0; ind < 1; ind++) {
  RandomLocation();}
// ВТОРАЯ часть функций закончилась


random(offer);
offer.title = 'ЗАГОЛОВОК';
author.avatar = `img/avatars/user${  0   }${randomIntegerAuthor(1, 8)   }.png`;
offer.price = randomIntegerFirstFields(100, 5000);
offer.rooms = randomIntegerFirstFields(1, 5);
offer.guests = randomIntegerFirstFields(10, 50);
offer.description = 'Шикарное помещение';
offer.features = commonArrFeatures;
offer.photos = commonArrPhotos;

//ARRAY
const countingObjects = 10;

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const createArray = () => ({
  author: getRandomArrayElement(author),
  offer: getRandomArrayElement(offer),
  location: getRandomArrayElement(location),
});
const similarArray = new Array(countingObjects  ).fill(null).map(() => createArray());
similarArray();
