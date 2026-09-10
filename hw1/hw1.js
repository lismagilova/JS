function deepEqual(a, b, seenPairs = new WeakMap(), rev = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

  if (seenPairs.has(a)) return seenPairs.get(a) === b;
  if (rev.has(b)) return false;
   seenPairs.set(a, b)
  rev.set(b, a);
  if (a instanceof Date) return Object.is(a.getTime(), b.getTime());
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (Array.isArray(a) && a.length !== b.length) return false;

  if (!Array.isArray(a) && Object.getPrototypeOf(a) !== Object.prototype && Object.getPrototypeOf(a) !== null) return false;
  const aKeys  = Reflect.ownKeys(a)
  const bKeys =  Reflect.ownKeys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!Object.hasOwn(b, key) || !deepEqual(a[key], b[key], seenPairs, rev)) return false;
  }
  return true;
}
module.exports = deepEqual
