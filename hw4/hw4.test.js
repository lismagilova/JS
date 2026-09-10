require('./hw4');
beforeEach(() => {
  document.body.innerHTML = '<main><p class="item">a</p><section><p class="item">b</p></section></main>';
});
test('поиск по классу', () => {
  const res = document.myQuerySelectorAll('.item')
  expect(res.map(el => el.textContent)).toEqual(['a', 'b']);
});
test('дочерний элемент', () => {
  const res = document.myQuerySelectorAll('main > p');
  expect(res.map(el => el.textContent)).toEqual(['a']);
});
test('нет совпадений', () => expect(document.myQuerySelectorAll('.missing')).toEqual([]));
