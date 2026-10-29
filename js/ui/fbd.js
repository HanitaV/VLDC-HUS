// Công cụ vẽ sơ đồ lực.
// Bấm một loại lực để thêm mũi tên, rồi kéo trên hình (hoặc dùng nút xoay) để chỉnh hướng.
import { FORCES, gradeBody, norm } from '../data/forces.js';
import { esc } from './math.js';

const SIZE = 260, C = SIZE / 2, LEN = 84;
const SUB = { Fms: ['F', 'ms'], Fqt: ['F', 'qt'], Fht: ['F', 'ht'], Fdi: ['F', 'đ'], Fnem: ['F', 'ném'], Q: ['N′', ''] };

function labelSVG(type, x, y, color) {
  const [main, sub] = SUB[type] || [type, ''];
  return `<text x="${x}" y="${y}" fill="${color}" font-size="15" font-family="var(--serif)" font-style="italic" text-anchor="middle">${esc(main)}${sub ? `<tspan font-size="10" dy="4">${esc(sub)}</tspan>` : ''}</text>`;
}
const plainName = (type) => (SUB[type] ? SUB[type].join('') : type);
const tip = (angle, len = LEN) => ({ x: C + len * Math.cos((angle * Math.PI) / 180), y: C - len * Math.sin((angle * Math.PI) / 180) });

export function mountFBD(root, spec, { onAttempt } = {}) {
  const bodies = spec.bodies.map((b) => ({ ...b, arrows: [], selected: -1, reveal: false }));
  let attempts = 0;

  root.innerHTML = `
    <p class="lead">${esc(spec.note || '')} Vẽ mọi lực tác dụng lên từng vật, và chỉ những lực đó.</p>
    <p class="hint">Bấm tên lực để thêm mũi tên, rồi kéo trên hình về hướng của lực. Góc tính từ phương ngang bên phải, ngược chiều kim đồng hồ. Không cần vẽ đúng độ dài.</p>
    <div class="fbd-bodies"></div>
    <div class="row" style="margin-top:0.75rem">
      <button class="btn" type="button" data-act="check">Kiểm tra sơ đồ lực</button>
      <button class="btn ghost" type="button" data-act="reveal" hidden>Hiện sơ đồ đúng</button>
    </div>
    <div class="fbd-result" aria-live="polite"></div>
  `;
  const wrap = root.querySelector('.fbd-bodies');

  bodies.forEach((b, bi) => {
    const el = document.createElement('div');
    el.className = 'fbd-body';
    el.innerHTML = `
      <h3>${esc(b.label)}</h3>
      <div class="paper"><svg class="fbd-canvas idle" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="Sơ đồ lực của ${esc(b.label)}"></svg></div>
      <div class="palette" role="group" aria-label="Thêm lực">
        ${b.palette.map((ty) => `<button type="button" data-type="${ty}" title="${esc(FORCES[ty].name)}">${esc(plainName(ty))}<span class="visually-hidden"> – ${esc(FORCES[ty].name)}</span></button>`).join('')}
      </div>
      <ul class="arrow-list"></ul>
    `;
    wrap.appendChild(el);
    b.el = el;
    const svg = el.querySelector('svg');

    el.querySelectorAll('.palette button').forEach((btn) => {
      btn.addEventListener('click', () => {
        b.arrows.push({ type: btn.dataset.type, angle: 90 });
        b.selected = b.arrows.length - 1;
        render(b);
        el.querySelector('.arrow-list li:last-child button[data-rot="-5"]')?.focus();
      });
    });

    let dragging = false;
    const setFromPointer = (ev) => {
      if (b.selected < 0) return;
      const r = svg.getBoundingClientRect();
      const x = ((ev.clientX - r.left) / r.width) * SIZE - C;
      const y = C - ((ev.clientY - r.top) / r.height) * SIZE;
      if (Math.hypot(x, y) < 6) return;
      const ang = Math.round(((Math.atan2(y, x) * 180) / Math.PI) / 5) * 5;
      b.arrows[b.selected].angle = norm(ang);
      render(b);
    };
    svg.addEventListener('pointerdown', (ev) => {
      if (b.selected < 0) return;
      dragging = true;
      svg.setPointerCapture(ev.pointerId);
      setFromPointer(ev);
    });
    svg.addEventListener('pointermove', (ev) => { if (dragging) setFromPointer(ev); });
    svg.addEventListener('pointerup', () => { dragging = false; });
    svg.addEventListener('pointercancel', () => { dragging = false; });
    render(b);
    void bi;
  });

  function render(b) {
    const svg = b.el.querySelector('svg');
    const ink = 'var(--ink)';
    let g = '';
    // bề mặt tiếp xúc (nếu có)
    if (typeof b.surface === 'number') {
      const a = (b.surface * Math.PI) / 180;
      const ux = Math.cos(a), uy = -Math.sin(a);
      const nx = -Math.sin(a), ny = -Math.cos(a); // pháp tuyến hướng lên khỏi mặt
      const bx = C - 22 * nx, by = C - 22 * ny; // chân vật
      g += `<line x1="${bx - 120 * ux}" y1="${by - 120 * uy}" x2="${bx + 120 * ux}" y2="${by + 120 * uy}" stroke="${ink}" stroke-width="2"/>`;
      for (let i = -110; i <= 110; i += 14) {
        const px = bx + i * ux, py = by + i * uy;
        g += `<line x1="${px}" y1="${py}" x2="${px - 8 * nx - 6 * ux}" y2="${py - 8 * ny - 6 * uy}" stroke="var(--ink-3)" stroke-width="1"/>`;
      }
    }
    if (typeof b.rope === 'number') {
      const e = tip(b.rope, 128);
      g += `<line x1="${C}" y1="${C}" x2="${e.x}" y2="${e.y}" stroke="var(--ink-3)" stroke-width="1.4" stroke-dasharray="5 4"/>`;
    }
    const rot = typeof b.surface === 'number' ? -b.surface : 0;
    g += `<rect x="${C - 22}" y="${C - 22}" width="44" height="44" fill="var(--paper)" stroke="${ink}" stroke-width="1.6" transform="rotate(${rot} ${C} ${C})"/>`;
    g += `<defs><marker id="fh-${b.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--force)"/></marker>
      <marker id="fs-${b.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ok)"/></marker></defs>`;
    if (b.reveal) {
      for (const e of b.expected) {
        const t = tip(e.angle, LEN + 10);
        g += `<line x1="${C}" y1="${C}" x2="${t.x}" y2="${t.y}" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#fs-${b.id})"/>`;
        const lt = tip(e.angle, LEN + 26);
        g += labelSVG(e.type, lt.x, lt.y + 5, 'var(--ok)');
      }
    }
    b.arrows.forEach((ar, i) => {
      const t = tip(ar.angle);
      const sel = i === b.selected;
      g += `<line x1="${C}" y1="${C}" x2="${t.x}" y2="${t.y}" stroke="var(--force)" stroke-width="${sel ? 3.4 : 2.4}" marker-end="url(#fh-${b.id})"/>`;
      const lt = tip(ar.angle, LEN + 16);
      g += labelSVG(ar.type, lt.x, lt.y + 5, 'var(--force)');
    });
    g += `<circle cx="${C}" cy="${C}" r="3" fill="${ink}"/>`;
    svg.innerHTML = g;
    svg.classList.toggle('idle', b.selected < 0);

    const list = b.el.querySelector('.arrow-list');
    list.innerHTML = b.arrows.map((ar, i) => `
      <li>
        <span class="name">${i === b.selected ? '<strong>' : ''}${esc(FORCES[ar.type].name)} (${esc(plainName(ar.type))}), hướng ${ar.angle}°${i === b.selected ? '</strong>, đang chỉnh' : ''}</span>
        <button type="button" data-i="${i}" data-rot="-5" aria-label="Xoay ${esc(plainName(ar.type))} theo chiều kim đồng hồ 5 độ">↻</button>
        <button type="button" data-i="${i}" data-rot="5" aria-label="Xoay ${esc(plainName(ar.type))} ngược chiều kim đồng hồ 5 độ">↺</button>
        <button type="button" data-i="${i}" data-del aria-label="Xoá ${esc(plainName(ar.type))}">✕</button>
      </li>`).join('');
    list.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.i;
        if (btn.hasAttribute('data-del')) {
          b.arrows.splice(i, 1);
          b.selected = b.arrows.length ? Math.min(i, b.arrows.length - 1) : -1;
        } else {
          b.arrows[i].angle = norm(b.arrows[i].angle + +btn.dataset.rot);
          b.selected = i;
        }
        render(b);
        const again = list.querySelector(`button[data-i="${Math.max(0, b.selected)}"][data-rot="${btn.dataset.rot}"]`);
        again?.focus();
      });
    });
  }

  root.querySelector('[data-act="check"]').addEventListener('click', () => {
    attempts++;
    const results = bodies.map((b) => ({ b, r: gradeBody(b.arrows, b.expected) }));
    const allOk = results.every((x) => x.r.ok);
    const out = root.querySelector('.fbd-result');
    if (allOk) {
      out.innerHTML = `<div class="feedback ok">Sơ đồ lực đúng cho mọi vật. Mỗi mũi tên bạn vẽ ứng với một vật khác đang tác dụng lên vật đang xét.</div>`;
    } else {
      out.innerHTML = `<div class="feedback bad">${results.filter((x) => !x.r.ok).map(({ b, r }) => `
        <strong>${esc(b.label)}:</strong> đúng ${r.matched}/${r.total} lực.
        <ul class="fbd-issues">${r.issues.map((i) => `<li>${esc(i.message)}</li>`).join('')}</ul>`).join('')}</div>`;
    }
    if (allOk || attempts >= 2) root.querySelector('[data-act="reveal"]').hidden = false;
    onAttempt?.(allOk);
  });
  root.querySelector('[data-act="reveal"]').addEventListener('click', (ev) => {
    const on = !bodies[0].reveal;
    bodies.forEach((b) => { b.reveal = on; render(b); });
    ev.target.textContent = on ? 'Ẩn sơ đồ đúng' : 'Hiện sơ đồ đúng';
  });
}
