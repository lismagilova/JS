'use strict';
function myApply(ctx, argumets) {
  if (typeof this !== 'function') throw new TypeError('это не функция');
  const vals  = Array.from(argumets ?? [])
  const obj = ctx == null ? globalThis : Object(ctx);
  const key =  Symbol('function')
  Object.defineProperty(obj, key, {value: this, configurable: true});
  try {
    return obj[key](...vals);
  } finally {
    delete obj[key];
  }
}
function myCall(ctx, ...argumets) {
  return this.myApply(ctx, argumets);
}
function myBind(ctx, ...fstArgs) {
   const fn = this
  if (typeof fn !== 'function') throw new TypeError('это не функция');
  function bound(...restArgs) {
    const argumets  = [...fstArgs,  ...restArgs]
    if (new.target) return Reflect.construct(fn, argumets, new.target === bound ? fn : new.target);
    return fn.myApply(ctx, argumets);
  }
  Object.defineProperty(bound, Symbol.hasInstance, {
    value(instance) { return instance instanceof fn; }
  });
  Object.defineProperty(bound, 'length', {value: Math.max(0, fn.length - fstArgs.length), configurable: true});
  Object.defineProperty(bound, 'name', {value: `bound ${fn.name}`, configurable: true});
  return bound;
}
for (const [name, value] of Object.entries({myCall, myApply, myBind})) {
  Object.defineProperty(Function.prototype, name, {value, writable: true, configurable: true});
}
module.exports = {myCall, myApply, myBind};
