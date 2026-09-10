require('./hw3');
test('с начальным значением', () => expect([1, 2, 3].myReduce((a, b) => a + b, 10)).toBe(16));
test('без начального значения', () => expect([2, 3, 4].myReduce((a, b) => a * b)).toBe(24));
test('пустой массив', () => {
  expect([].myReduce((a, b) => a + b, 7)).toBe(7);
  expect(() => [].myReduce((a, b) => a + b)).toThrow('массив пустой, нужно начальное значение');
});
