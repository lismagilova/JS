const myPromiseAll = require('./hw5');
test('значения и промисы', async () => expect(await myPromiseAll([1, Promise.resolve(2)])).toEqual([1, 2]));
test('порядок результатов', async () => {
  let finish;
  const slow = new Promise(resolve => { finish = resolve; });
  const res = myPromiseAll([slow, Promise.resolve('second')]);
  finish('first');
  expect(await res).toEqual(['first', 'second']);
});
test('пустой список', async () => expect(await myPromiseAll([])).toEqual([]));
test('ошибка промиса', async () => {
  const err = new Error('не получилось');
  await expect(myPromiseAll([new Promise(() => {}), Promise.reject(err)])).rejects.toBe(err);
});
