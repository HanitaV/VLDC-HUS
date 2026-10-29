// Bài 3.1: vật A trên mặt phẳng nghiêng nối với vật B qua ròng rọc.
// Vị trí tính thẳng từ nghiệm giải tích s = ½·a·t², thời gian lấy theo đồng hồ thật,
// nên mô phỏng chạy đúng tốc độ trên mọi màn hình và khớp tuyệt đối với đáp số.
import { inclinePulley } from '../data/ch3.js';
import { fmt } from '../core/grader.js';
import { rad } from '../data/util.js';

const W = 460, H = 300;
const PX_PER_M = 90;
const BASE = { x: 30, y: 270 };
const SLOPE_PX = 330;

const STATE_TEXT = { 'len-doc': 'A trượt lên dốc', 'xuong-doc': 'A trượt xuống dốc', 'dung-yen': 'Hệ đứng yên (ma sát nghỉ giữ lại)' };

export function mount(root, { values }) {
  let p = { m1: values.m1, m2: values.m2, alpha: values.alpha, mu: values.mu };
  let showForces = true;
  let running = false;
  let t = 0;
  let last = 0;
  let raf = 0;

  root.innerHTML = `
    <div class="paper"><canvas width="${W}" height="${H}" aria-label="Mô phỏng vật A trên mặt phẳng nghiêng nối với vật B qua ròng rọc" role="img"></canvas></div>
    <div class="readout" aria-live="polite">
      <div><span>Gia tốc</span><b data-r="a"></b></div>
      <div><span>Lực căng dây</span><b data-r="T"></b></div>
      <div><span>Áp lực lên ròng rọc</span><b data-r="F"></b></div>
      <div><span>Thời gian</span><b data-r="t"></b></div>
    </div>
    <p class="sim-note" data-r="state"></p>
    <div class="row">
      <button class="btn" type="button" data-act="run">Chạy</button>
      <button class="btn quiet" type="button" data-act="reset">Đặt lại</button>
      <label class="toggle"><input type="checkbox" data-act="forces" checked> Hiện véc-tơ lực</label>
    </div>
    <details>
      <summary>Thử với thông số khác</summary>
      <div class="sliders" style="margin-top:0.75rem">
        ${slider('m1', 'Khối lượng A, m₁', 1, 5, 0.1, 'kg')}
        ${slider('m2', 'Khối lượng B, m₂', 0.5, 5, 0.1, 'kg')}
        ${slider('alpha', 'Góc nghiêng α', 15, 60, 1, '°')}
        ${slider('mu', 'Hệ số ma sát μ', 0, 0.6, 0.01, '')}
      </div>
      <p class="sim-note">Thanh trượt chỉ đổi mô phỏng. Phần chấm bài vẫn dùng số liệu ở bảng trên.</p>
    </details>
  `;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  function slider(key, label, min, max, step, unit) {
    return `<div class="slider"><label for="s-${key}">${label}</label><output data-o="${key}"></output>
      <input id="s-${key}" type="range" min="${min}" max="${max}" step="${step}" data-k="${key}"></div>`;
  }
  const colors = () => {
    const cs = getComputedStyle(root);
    const v = (n) => cs.getPropertyValue(n).trim();
    return { ink: v('--ink'), ink3: v('--ink-3'), paper: v('--paper'), force: v('--force'), pen: v('--pen'), ok: v('--ok') };
  };

  // Hình học: điểm trên dốc cách chân dốc s (px)
  function geom() {
    const a = rad(p.alpha);
    const top = { x: BASE.x + SLOPE_PX * Math.cos(a), y: BASE.y - SLOPE_PX * Math.sin(a) };
    const pulley = { x: top.x + 14 * Math.cos(a) + 2, y: top.y - 14 * Math.sin(a) - 14, r: 13 };
    return { a, top, pulley };
  }

  function draw() {
    const c = colors();
    const res = inclinePulley(p);
    const { a, top, pulley } = geom();
    const dir = { x: Math.cos(a), y: -Math.sin(a) }; // lên dốc
    const nrm = { x: -Math.sin(a), y: -Math.cos(a) }; // pháp tuyến ra khỏi mặt dốc
    // quãng đường A đi được (px, dương = lên dốc), giới hạn bởi ròng rọc, chân dốc và mặt đất
    const sStart = 140;
    // đoạn dây treo B ban đầu: ngắn lại khi dốc thoải để B không chạm đất ngay
    const ropeB0 = Math.max(24, Math.min(70, BASE.y - pulley.y - 34 - 60));
    let disp = 0.5 * res.a * t * t * PX_PER_M;
    const maxUp = Math.max(0, Math.min(SLOPE_PX - 40 - sStart, BASE.y - (pulley.y + ropeB0 + 34) - 4));
    const maxDown = Math.min(sStart - 30, ropeB0 - 10);
    let stopped = false;
    if (disp > maxUp) { disp = maxUp; stopped = true; }
    if (disp < -maxDown) { disp = -maxDown; stopped = true; }
    if (stopped && running) { running = false; updateButtons(); }

    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = c.ink;
    // mặt đất và nêm
    ctx.beginPath(); ctx.moveTo(0, BASE.y); ctx.lineTo(W, BASE.y); ctx.stroke();
    ctx.fillStyle = c.paper;
    ctx.beginPath(); ctx.moveTo(BASE.x, BASE.y); ctx.lineTo(top.x, top.y); ctx.lineTo(top.x, BASE.y); ctx.closePath(); ctx.fill(); ctx.stroke();
    // góc alpha
    ctx.beginPath(); ctx.arc(BASE.x, BASE.y, 42, -a, 0); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.font = 'italic 15px "Noto Serif", Georgia, serif';
    ctx.fillText('α', BASE.x + 48, BASE.y - 8);
    // ròng rọc
    ctx.beginPath(); ctx.moveTo(top.x, top.y); ctx.lineTo(pulley.x, pulley.y); ctx.stroke();
    ctx.beginPath(); ctx.arc(pulley.x, pulley.y, pulley.r, 0, Math.PI * 2); ctx.fillStyle = c.paper; ctx.fill(); ctx.stroke();

    // vật A (hình vuông 34 px nằm trên dốc)
    const sA = sStart + disp;
    const cA = { x: BASE.x + sA * dir.x + 17 * nrm.x, y: BASE.y + sA * dir.y + 17 * nrm.y };
    ctx.save(); ctx.translate(cA.x, cA.y); ctx.rotate(-a);
    ctx.fillStyle = c.paper; ctx.fillRect(-17, -17, 34, 34); ctx.strokeRect(-17, -17, 34, 34);
    ctx.fillStyle = c.ink; ctx.font = '600 13px "Be Vietnam Pro", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('A', 0, 5);
    ctx.restore();
    // dây: từ A song song mặt dốc tới đỉnh ròng rọc, rồi thẳng xuống B
    const tangentTop = { x: pulley.x - pulley.r * Math.sin(a), y: pulley.y - pulley.r * Math.cos(a) };
    const ropeStart = { x: cA.x + 17 * dir.x, y: cA.y + 17 * dir.y };
    ctx.beginPath(); ctx.moveTo(ropeStart.x, ropeStart.y); ctx.lineTo(tangentTop.x, tangentTop.y);
    ctx.arc(pulley.x, pulley.y, pulley.r, -Math.PI / 2 - a, 0);
    const bTop = pulley.y + ropeB0 + disp;
    ctx.lineTo(pulley.x + pulley.r, bTop); ctx.stroke();
    // vật B
    const cB = { x: pulley.x + pulley.r, y: bTop + 17 };
    ctx.fillStyle = c.paper; ctx.fillRect(cB.x - 17, cB.y - 17, 34, 34); ctx.strokeRect(cB.x - 17, cB.y - 17, 34, 34);
    ctx.fillStyle = c.ink; ctx.fillText('B', cB.x, cB.y + 5); ctx.textAlign = 'start';

    if (showForces) {
      const k = 2.6; // px mỗi N
      const g = 9.8;
      const P1 = p.m1 * g;
      const N1 = P1 * Math.cos(a);
      let fr = 0;
      if (res.state === 'len-doc') fr = -p.mu * N1;
      else if (res.state === 'xuong-doc') fr = p.mu * N1;
      else fr = -(p.m2 * g - P1 * Math.sin(a)); // ma sát nghỉ cân bằng xu hướng
      vec(cA, { x: 0, y: 1 }, P1 * k, 'P', c.force);
      vec(cA, nrm, N1 * k, 'N', c.force);
      vec(cA, dir, res.T * k, 'T', c.force);
      if (Math.abs(fr) > 1e-6) vec(cA, { x: dir.x * Math.sign(fr), y: dir.y * Math.sign(fr) }, Math.abs(fr) * k, 'Fms', c.force);
      vec(cB, { x: 0, y: 1 }, p.m2 * g * k, 'P', c.force);
      vec(cB, { x: 0, y: -1 }, res.T * k, 'T', c.force);
    }

    const r = (key, s) => { root.querySelector(`[data-r="${key}"]`).textContent = s; };
    r('a', `${fmt(Math.abs(res.a), 3)} m/s²`);
    r('T', `${fmt(res.T, 3)} N`);
    r('F', `${fmt(res.F, 3)} N`);
    r('t', `${fmt(t, 3)} s`);
    r('state', `${STATE_TEXT[res.state]}${stopped ? '. Đã chạm giới hạn của hình, bấm Đặt lại để chạy lại.' : ''}`);
  }

  function vec(from, unit, len, label, color) {
    const L = Math.max(10, Math.min(len, 120));
    const to = { x: from.x + unit.x * L, y: from.y + unit.y * L };
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
    const ang = Math.atan2(to.y - from.y, to.x - from.x);
    ctx.beginPath(); ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - 9 * Math.cos(ang - 0.4), to.y - 9 * Math.sin(ang - 0.4));
    ctx.lineTo(to.x - 9 * Math.cos(ang + 0.4), to.y - 9 * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.font = 'italic 13px "Noto Serif", Georgia, serif';
    ctx.fillText(label, to.x + 5 * Math.sign(unit.x || 1), to.y + (unit.y > 0 ? 14 : -5));
    ctx.lineWidth = 1.6; ctx.strokeStyle = colors().ink;
  }

  function frame(now) {
    if (!running) return;
    t += Math.min(0.05, (now - last) / 1000); // bỏ qua khoảng nghỉ dài khi tab bị ẩn
    last = now;
    draw();
    if (running) raf = requestAnimationFrame(frame);
  }
  function updateButtons() {
    root.querySelector('[data-act="run"]').textContent = running ? 'Tạm dừng' : 'Chạy';
  }
  function syncSliders() {
    for (const inp of root.querySelectorAll('[data-k]')) {
      inp.value = p[inp.dataset.k];
      const unit = { m1: ' kg', m2: ' kg', alpha: '°', mu: '' }[inp.dataset.k];
      root.querySelector(`[data-o="${inp.dataset.k}"]`).textContent = `${fmt(+inp.value, 3)}${unit}`;
    }
  }

  root.querySelector('[data-act="run"]').addEventListener('click', () => {
    running = !running;
    updateButtons();
    if (running) { last = performance.now(); raf = requestAnimationFrame(frame); }
  });
  root.querySelector('[data-act="reset"]').addEventListener('click', () => {
    running = false; t = 0; updateButtons(); draw();
  });
  root.querySelector('[data-act="forces"]').addEventListener('change', (e) => { showForces = e.target.checked; draw(); });
  for (const inp of root.querySelectorAll('[data-k]')) {
    inp.addEventListener('input', () => {
      p = { ...p, [inp.dataset.k]: +inp.value };
      t = 0; running = false; updateButtons(); syncSliders(); draw();
    });
  }
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', draw);

  syncSliders();
  draw();
  return {
    setValues(v) { p = { m1: v.m1, m2: v.m2, alpha: v.alpha, mu: v.mu }; t = 0; running = false; updateButtons(); syncSliders(); draw(); },
  };
}
