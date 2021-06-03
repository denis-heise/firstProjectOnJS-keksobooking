//Функция, возвращающая случайное целое число из переданного диапазона включительно
function randomInteger(min, max) {
  if (min >= 0 && max > 0 && min < max) {
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
function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }
  const digitsDegree = 10 ** maxDigits;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}
// числа к примеру
getRandomArbitrary(125, 212, 1);
// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Ответ на счёт третьего аргумента получил https://qna.habr.com/q/999157
