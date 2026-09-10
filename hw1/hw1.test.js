const deepEqual = require('./hw1');
test('вложенные объекты', () => expect(deepEqual({a: [1, {b: 2}]}, {a: [1, {b: 2}]})).toBe(true));
test('разные значения', () => expect(deepEqual({a: {b: 2}}, {a: {b: 3}})).toBe(false));
test('порядок ключей', () => expect(deepEqual({a: 1, b: 2}, {b: 2, a: 1})).toBe(true));
test('порядок массива', () => expect(deepEqual([1, 2], [2, 1])).toBe(false));
test('лишний ключ', () => expect(deepEqual({a: 1}, {a: 1, b: 2})).toBe(false));
test('пустые объекты', () => expect(deepEqual({}, {})).toBe(true));
test('null', () => {
  expect(deepEqual(null, null)).toBe(true);
  expect(deepEqual(null, {})).toBe(false);
});
