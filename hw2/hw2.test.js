require('./hw2');
function sum(a, b) { return this.base + a + b; }
describe('myCall', () => {
  test('контекст и аргументы', () => expect(sum.myCall({base: 10}, 2, 3)).toBe(15));
  test('без аргументов', () => {
    function get() { return this.value; }
    expect(get.myCall({value: 7})).toBe(7);
  });
  test('не оставляет свойство в контексте', () => {
    const obj = {base: 1}
    sum.myCall(obj, 2, 3);
    expect(Reflect.ownKeys(obj)).toEqual(['base']);
  });
});
describe('myApply', () => {
  test('массив аргументов', () => expect(sum.myApply({base: 2}, [3, 4])).toBe(9));
  test('объект с length', () => expect(sum.myApply({base: 1}, {0: 2, 1: 3, length: 2})).toBe(6));
  test('без аргументов', () => {
    function count() { return arguments.length; }
    expect(count.myApply({})).toBe(0);
  });
});
describe('myBind', () => {
  test('фиксирует контекст', () => expect(sum.myBind({base: 5})(1, 2)).toBe(8));
  test('частичное применение', () => expect(sum.myBind({base: 5}, 1)(2)).toBe(8));
  test('отложенный вызов', () => {
    const calls  = []
    function fn(...args) { calls.push(args); }
    const bound = fn.myBind({}, 1, 2);
    expect(calls).toEqual([]);
    bound();
    expect(calls).toEqual([[1, 2]]);
  });
});
