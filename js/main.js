//Функция, возвращающая случайное целое число из переданного диапазона включительно
function randomInteger(min, max) {
  if (min >= 0 && max > 0 && min < max) {
   let rand = min - 0.5 + Math.random() * (max - min + 1);
   return Math.round(rand);
   if (min = max) {
     let rand = min;
     return Math.round(rand);
   }
 }
 return('Задан неверный диапазон! Укажите другие числа.')
 }
 // числа к примеру
 randomInteger(0, 55);

//Источник: https://learn.javascript.ru/task/random-int-min-max


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomArbitrary(min, max) {
  if (min >= 0 && max > 0 && min < max) {
  return Math.random() * (max - min) + min;
  if (min = max) {
    let rand = min;
    return Math.round(rand);
  }
  }
  return('Задан неверный диапазон! Укажите другие числа.')
}
 // числа к примеру
getRandomArbitrary(12, 13);

 // Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
