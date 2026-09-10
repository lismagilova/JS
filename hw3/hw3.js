'use strict';
function myReduce(cb, initVal) {
  if (typeof cb !== 'function') throw new TypeError('это не функция');
   const arr = this
  // длину берем до цикла, новые элеметы в конце не обходим
  const length = arr.length
  let idx =  0
  let res;
  // undefined тоже начальное значение, поэтому считаем аргументы
  if (arguments.length > 1) res = initVal;
  else {
    while (idx < length && !(idx in arr)) idx++;
    if (idx === length) throw new TypeError('массив пустой, нужно начальное значение');
    res = arr[idx++];
  }
  for (; idx < length; idx++) {
    // пропуски пропускаем, а undefined обрабатываем
    if (idx in arr) res = cb(res, arr[idx], idx, arr);
  }
  return res;
}
Object.defineProperty(Array.prototype, 'myReduce', {value: myReduce, writable: true, configurable: true});
module.exports = myReduce
