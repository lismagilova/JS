import im1 from './images/im1.jpeg';
import im2 from './images/im2.jpeg';
import im5 from './images/im5.jpeg';
import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {Gallery} from './hw6';
let host: HTMLDivElement;
let root: Root;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div'); document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<Gallery />));
});
afterEach(() => { act(() => root.unmount()); host.remove(); });
function next() { act(() => host.querySelectorAll('button')[1].click()); }
function resize(value: number) {
  const slider = host.querySelector('input')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(slider, String(value));
    slider.dispatchEvent(new Event('input', {bubbles: true}));
  });
}
test('ширина 320 и шаг один пиксель', () => {
  expect(host.querySelector('img')!.style.width).toBe('320px');
  expect(host.querySelector('img')!.style.height).toBe('auto');
  expect(host.querySelector('input')!.step).toBe('1');
});
test('ползунок меняет ширину', () => {
  resize(613);
  expect(host.querySelector('img')!.style.width).toBe('613px');
  expect(host.querySelector('output')!.textContent).toBe('613 px');
});
test('ширина сохраняется при переключении', () => {
  resize(777); next();
  expect(host.querySelector('img')!.getAttribute('src')).toBe(im2);
  expect(host.querySelector('img')!.style.width).toBe('777px');
  expect(host.querySelector('input')!.value).toBe('777');
});
test('стрелки переключают по кругу', () => {
  act(() => host.querySelector('button')!.click());
  expect(host.querySelector('img')!.getAttribute('src')).toBe(im5);
  next();
  expect(host.querySelector('img')!.getAttribute('src')).toBe(im1);
  next(); next(); next(); next(); next();
  expect(host.querySelector('img')!.getAttribute('src')).toBe(im1);
});
