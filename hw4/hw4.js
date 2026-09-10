function docSel(selecor) {
  return selecor.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\\(?:[\da-f]{1,6}\s?|.)|:scope\b/gi,
    part => part.toLowerCase() === ':scope' ? ':root' : part);
}
function myQuerySelectorAll(selecor) {
   const css  = docSel(String(selecor))
  const res = []
  const stk  = [];
  if (this.documentElement) stk.push(this.documentElement);
  while (stk.length) {
     const elem = stk.pop()
    if (elem.matches(css)) res.push(elem);
    for (let chld = elem.lastElementChild; chld; chld = chld.previousElementSibling) stk.push(chld);
  }
  return res;
}
if (typeof Document !== 'undefined') {
  Object.defineProperty(Document.prototype, 'myQuerySelectorAll', {value: myQuerySelectorAll, writable: true, configurable: true});
}
if (typeof module !== 'undefined') module.exports = myQuerySelectorAll;
