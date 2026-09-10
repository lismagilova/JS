import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import im1 from './images/im1.jpeg'
import im2 from './images/im2.jpeg';
import im3 from './images/im3.jpeg';
import im4 from './images/im4.jpeg';
import im5 from './images/im5.jpeg';
import './hw6.scss';
const pics = [
  {src: im1, title: 'картинка1'},
  {src: im2, title: 'картинка2'},
  {src: im3, title: 'картинка3'},
  {src: im4, title: 'картинка4'},
  {src: im5, title: 'картинка5'},
];
export function Gallery() {
  const [idx, setIdx] = useState(0);
  const [width, setWdt]  = useState(320)
   const picure = pics[idx]
  function changePict(dir:  number) {
    setIdx(cur => (cur +dir + pics.length) %pics.length);
  }
  return (
    <main className="gallery">
      <div className="viewer">
        <button
          onClick={() => changePict(-1)}
        >
          назад
        </button>
        <div className="image-field">
          <img
            src={picure.src}
            style={{width, height: 'auto'}}
          />
        </div>
        <button
          onClick={() => changePict(1)}
        >
          дальше
        </button>
      </div>
      <div className="controls">
        <label htmlFor="width">
          Ширина картинки <output htmlFor="width">{width} px</output>
        </label>
        <input
          id="width"
          type="range"
          min="100"
          max="900"
          step="1"
          value={width}
          onChange={event => setWdt(Number(event.target.value))}
        />
      </div>
    </main>
  );
}
const root = document.getElementById('root');
if (root) createRoot(root).render(<Gallery />);
