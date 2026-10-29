// Bài 2.1: kéo thời gian t, phần diện tích dưới đồ thị v(t) được tô, đó chính là quãng đường.
import { GRAPH_21, areaUnder } from '../data/ch2.js';
import { fmt } from '../core/grader.js';

const W = 440, H = 280, X0 = 44, Y0 = 240, SX = 23, SY = 24; // 1 s = 23 px, 1 m/s = 24 px
const px = (t) => X0 + t * SX;
const py = (v) => Y0 - v * SY;

function vAt(t) {
  for (let i = 0; i < GRAPH_21.length - 1; i++) {
    const [t0, v0] = GRAPH_21[i];
    const [t1, v1] = GRAPH_21[i + 1];
    if (t <= t1) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0);
  }
  return GRAPH_21.at(-1)[1];
}

export function mount(root) {
  const tEnd = 16;
  root.innerHTML = `
    <div class="paper">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Đồ thị vận tốc theo thời gian, phần diện tích đến thời điểm t được tô màu">
        <defs><marker id="ax21" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>
        <path id="area21" fill="var(--pen)" fill-opacity="0.22" stroke="none"/>
        <line x1="${X0}" y1="${Y0}" x2="${W - 12}" y2="${Y0}" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#ax21)"/>
        <line x1="${X0}" y1="${Y0}" x2="${X0}" y2="18" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#ax21)"/>
        ${[4, 8, 12, 16].map((t) => `<line x1="${px(t)}" y1="${Y0}" x2="${px(t)}" y2="${Y0 + 5}" stroke="var(--ink)"/><text x="${px(t)}" y="${Y0 + 20}" text-anchor="middle" font-size="13" fill="var(--ink-2)">${t}</text>`).join('')}
        ${[4, 8].map((v) => `<line x1="${X0 - 5}" y1="${py(v)}" x2="${X0}" y2="${py(v)}" stroke="var(--ink)"/><text x="${X0 - 9}" y="${py(v) + 4}" text-anchor="end" font-size="13" fill="var(--ink-2)">${v}</text>`).join('')}
        <text x="${W - 14}" y="${Y0 - 8}" text-anchor="end" font-size="13" fill="var(--ink-2)">t (s)</text>
        <text x="${X0 + 8}" y="24" font-size="13" fill="var(--ink-2)">υ (m/s)</text>
        <polyline points="${GRAPH_21.map(([t, v]) => `${px(t)},${py(v)}`).join(' ')}" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
        <line id="cursor21" y1="18" y2="${Y0}" stroke="var(--force)" stroke-width="1.5" stroke-dasharray="4 3"/>
      </svg>
    </div>
    <div class="readout" aria-live="polite">
      <div><span>Thời điểm</span><b id="r-t"></b></div>
      <div><span>Vận tốc</span><b id="r-v"></b></div>
      <div><span>Quãng đường</span><b id="r-s"></b></div>
    </div>
    <div class="slider">
      <label for="t21">Kéo để chọn thời điểm t</label><output id="o-t21"></output>
      <input id="t21" type="range" min="0" max="${tEnd}" step="0.1" value="0">
    </div>
    <div class="row"><button class="btn" id="play21" type="button">Chạy từ 0 đến 16 s</button></div>
    <p class="sim-note">Phần tô màu là diện tích dưới đồ thị từ 0 đến t. Con số "quãng đường" luôn bằng đúng diện tích này.</p>
  `;
  const area = root.querySelector('#area21');
  const cursor = root.querySelector('#cursor21');
  const slider = root.querySelector('#t21');
  const play = root.querySelector('#play21');

  function draw(t) {
    const pts = GRAPH_21.filter(([ti]) => ti < t).map(([ti, v]) => `${px(ti)},${py(v)}`);
    pts.push(`${px(t)},${py(vAt(t))}`);
    area.setAttribute('d', `M${px(0)},${Y0} L${pts.join(' L')} L${px(t)},${Y0} Z`);
    cursor.setAttribute('x1', px(t));
    cursor.setAttribute('x2', px(t));
    root.querySelector('#r-t').textContent = `${fmt(t, 3)} s`;
    root.querySelector('#r-v').textContent = `${fmt(vAt(t), 3)} m/s`;
    root.querySelector('#r-s').textContent = `${fmt(areaUnder(GRAPH_21, t), 3)} m`;
    root.querySelector('#o-t21').textContent = `${fmt(t, 3)} s`;
    slider.value = t;
  }

  let raf = 0;
  play.addEventListener('click', () => {
    cancelAnimationFrame(raf);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { draw(tEnd); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(tEnd, ((now - start) / 4000) * tEnd); // 16 s mô phỏng trong 4 s thật
      draw(t);
      if (t < tEnd) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  });
  slider.addEventListener('input', () => { cancelAnimationFrame(raf); draw(+slider.value); });
  draw(0);
  return { setValues() {} };
}
