// Thành phần tương tác dùng chung cho bài tập lý thuyết và bài tập tính toán.
import { parse, toTex, ExprError } from '../core/expr.js';
import { checkFormula, shuffleOrder, gradeOrder } from '../core/grader.js';
import { rich, tex, esc } from './math.js';

export const KEY_INSERT = {
  alpha: 'α', mu: 'μ', omega: 'ω', phi: 'φ', tau: 'τ', beta: 'β',
  lambda: 'λ', gamma: 'γ', eta: 'η', l: 'l', v: 'v', ap: 'ap',
  dT: 'dT', Tf: 'Tf',
};
export const KEY_SHOW = {
  alpha: 'α', mu: 'μ', omega: 'ω', phi: 'φ', tau: 'τ', beta: 'β',
  lambda: 'λ', gamma: 'γ', eta: 'η', l: 'ℓ', v: 'υ', ap: "a'",
  dT: 'ΔT', Tf: 'T_F', m0: 'm₀', m1: 'm₁', m2: 'm₂',
  v0: 'υ₀', v1: 'υ₁', T1: 'T₁', T2: 'T₂', V1: 'V₁', V2: 'V₂',
};

/**
 * Câu hỏi trắc nghiệm bản chất.
 * allowRetry=false: chọn 1 lần là khóa (dùng cho Dự đoán / Hệ quy chiếu).
 * allowRetry=true: chọn sai chỉ khóa phương án sai và giải thích để người học suy nghĩ lại.
 */
export function mountChoice(root, q, done, { allowRetry = false } = {}) {
  root.innerHTML = `<p class="lead">${rich(q.q)}</p>
    <div class="options">${q.options.map((o, i) => `<button class="option" type="button" data-i="${i}" aria-pressed="false">${rich(o.text)}</button>`).join('')}</div>
    <div class="fb" aria-live="polite"></div>`;
  const btns = [...root.querySelectorAll('.option')];
  const fb = root.querySelector('.fb');
  btns.forEach((b) => b.addEventListener('click', () => {
    const o = q.options[+b.dataset.i];
    const right = q.options.find((x) => x.ok);
    b.setAttribute('aria-pressed', 'true');
    if (!allowRetry || o.ok) {
      btns.forEach((x) => {
        x.disabled = true;
        const opt = q.options[+x.dataset.i];
        if (opt.ok) x.classList.add('right');
        else if (x === b) x.classList.add('wrong');
      });
      fb.innerHTML = o.ok
        ? `<div class="feedback ok">${rich(o.why)}</div>`
        : `<div class="feedback bad">${rich(o.why)}</div><div class="feedback info"><strong>Đáp án đúng:</strong> ${rich(right.text)}. ${rich(right.why)}</div>`;
      done(o.ok);
      return;
    }
    b.disabled = true;
    b.classList.add('wrong');
    fb.innerHTML = `<div class="feedback bad">${rich(o.why)} Hãy thử lại phương án khác.</div>`;
    done(false);
  }));
}

/**
 * Lập biểu thức chữ / thứ nguyên, dùng bộ chấm đại số checkFormula.
 */
export function mountFormula(root, cfg, done, { idPrefix = 'f' } = {}) {
  const targets = cfg.targets.filter((t) => t.expr);
  const keys = [...Object.keys(cfg.vars)];
  const lead = cfg.lead || 'Nhập biểu thức theo các ký hiệu của đề bài. Hệ thống sẽ kiểm tra bằng nhiều bộ giá trị khác nhau, nên mọi cách viết tương đương về mặt toán học đều được chấp nhận.';
  root.innerHTML = `
    <p class="lead">${rich(lead)}</p>
    <p class="hint">Gõ được: <code>m1</code>, <code>sin(α)</code>, <code>tg α</code>, <code>ln(...)</code>, <code>sqrt(...)</code>, <code>x^2</code>, phép nhân có thể bỏ dấu (<code>2g</code>) hoặc cách nhau (<code>n R T</code>). Số thập phân dùng dấu chấm.${cfg.hint ? ` ${esc(cfg.hint)}` : ''}</p>
    ${targets.map((t, i) => `
      <div class="field" data-t="${t.key}">
        <label for="${idPrefix}-${i}">${tex(t.sym)} = <span class="unit">${esc(t.label)}${t.unit ? ` (${esc(t.unit)})` : ''}</span></label>
        <div class="input-row">
          <input class="input" id="${idPrefix}-${i}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text">
          <button class="btn" type="button" data-check>Kiểm tra</button>
        </div>
        <div class="preview" aria-live="polite"></div>
        <div class="keys" aria-label="Chèn ký hiệu">
          ${keys.map((k) => `<button class="key" type="button" data-ins="${KEY_INSERT[k] ?? k}">${esc(KEY_SHOW[k] ?? k)}</button>`).join('')}
          ${['sin(', 'cos(', 'tg(', 'ln(', 'sqrt(', '^', '(', ')'].map((k) => `<button class="key" type="button" data-ins="${k}">${k === 'sqrt(' ? '√' : esc(k)}</button>`).join('')}
        </div>
        <div class="fb" aria-live="polite"></div>
      </div>`).join('')}
  `;
  const solved = new Set();
  root.querySelectorAll('.field').forEach((field) => {
    const t = targets.find((x) => x.key === field.dataset.t);
    const input = field.querySelector('input');
    const preview = field.querySelector('.preview');
    let wrong = 0;
    const show = () => {
      if (!input.value.trim()) { preview.innerHTML = ''; return; }
      try {
        preview.innerHTML = `<span class="label">Biểu thức nhận diện:</span>${tex(toTex(parse(input.value)))}`;
      } catch (e) {
        preview.innerHTML = e instanceof ExprError ? `<span class="label">Chưa hiểu cú pháp:</span>${esc(e.message)}` : '';
      }
    };
    input.addEventListener('input', () => { solved.delete(t.key); field.querySelector('.fb').innerHTML = ''; show(); });
    field.querySelectorAll('[data-ins]').forEach((k) => k.addEventListener('click', () => {
      const ins = k.dataset.ins;
      const s = input.selectionStart ?? input.value.length;
      const e2 = input.selectionEnd ?? s;
      input.value = input.value.slice(0, s) + ins + input.value.slice(e2);
      input.focus();
      input.setSelectionRange(s + ins.length, s + ins.length);
      input.dispatchEvent(new Event('input'));
    }));
    const check = () => {
      const r = checkFormula(input.value, t.expr, cfg.vars);
      const fb = field.querySelector('.fb');
      if (r.ok) {
        solved.add(t.key);
        fb.innerHTML = `<div class="feedback ok">${esc(r.message)}${t.pdfExpr ? ` Dạng chuẩn: ${tex(t.pdfExpr)}` : ''}${cfg.why ? ` ${rich(cfg.why)}` : ''}</div>`;
      } else {
        solved.delete(t.key);
        wrong++;
        fb.innerHTML = `<div class="feedback bad">${esc(r.message)}</div>${wrong >= 2 ? `<button class="btn quiet" type="button" data-reveal>Xem công thức đáp án</button>` : ''}`;
        fb.querySelector('[data-reveal]')?.addEventListener('click', () => {
          fb.insertAdjacentHTML('beforeend', `<div class="feedback info">${tex(`${t.sym} = ${t.pdfExpr ? t.pdfExpr.replace(/^[^=]*=\s*/, '') : toTex(parse(t.expr))}`, true)}${cfg.why ? `<p style="margin:.4rem 0 0">${rich(cfg.why)}</p>` : ''}</div>`);
        }, { once: true });
      }
      done(solved.size === targets.length);
    };
    field.querySelector('[data-check]').addEventListener('click', check);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  });
}

/**
 * Sắp xếp chuỗi bước suy luận logic theo thứ tự nhân-quả.
 */
export function mountOrder(root, q, done) {
  let order = shuffleOrder(q.steps.length, q.id);
  let lastMatches = null;
  let wrong = 0;
  let solved = false;

  const paint = (feedbackHtml = '') => {
    root.innerHTML = `
      <p class="lead">${rich(q.prompt)}</p>
      <p class="hint">Dùng nút Lên / Xuống để đặt các bước theo đúng trình tự suy luận từ xuất phát đến kết luận.</p>
      <ol class="order-list">
        ${order.map((stepIdx, pos) => {
          const state = lastMatches ? (lastMatches[pos] ? 'right' : 'wrong') : '';
          return `<li class="order-item ${state}" data-pos="${pos}">
            <span class="order-num" aria-hidden="true">${pos + 1}</span>
            <span class="order-text">${rich(q.steps[stepIdx])}</span>
            <span class="order-actions">
              <button class="btn quiet" type="button" data-move="-1" data-pos="${pos}" ${solved || pos === 0 ? 'disabled' : ''} aria-label="Đưa bước ${pos + 1} lên">↑</button>
              <button class="btn quiet" type="button" data-move="1" data-pos="${pos}" ${solved || pos === order.length - 1 ? 'disabled' : ''} aria-label="Đưa bước ${pos + 1} xuống">↓</button>
            </span>
          </li>`;
        }).join('')}
      </ol>
      <div class="row">
        <button class="btn" type="button" data-check ${solved ? 'disabled' : ''}>Kiểm tra thứ tự</button>
        ${!solved && wrong >= 2 ? `<button class="btn quiet" type="button" data-reveal>Xem thứ tự đúng</button>` : ''}
      </div>
      <div class="fb" aria-live="polite">${feedbackHtml}</div>
    `;
    root.querySelectorAll('[data-move]').forEach((btn) => btn.addEventListener('click', () => {
      const pos = +btn.dataset.pos;
      const next = pos + +btn.dataset.move;
      if (next < 0 || next >= order.length) return;
      [order[pos], order[next]] = [order[next], order[pos]];
      lastMatches = null;
      paint();
      root.querySelector(`[data-pos="${next}"][data-move="${btn.dataset.move}"]`)?.focus();
    }));
    root.querySelector('[data-check]')?.addEventListener('click', () => {
      const r = gradeOrder(order, q.steps.length);
      lastMatches = r.matches;
      if (r.ok) {
        solved = true;
        paint(`<div class="feedback ok">${esc(r.message)} ${rich(q.why)}</div>`);
        done(true);
      } else {
        wrong++;
        paint(`<div class="feedback bad">${esc(r.message)}</div>`);
        done(false);
      }
    });
    root.querySelector('[data-reveal]')?.addEventListener('click', () => {
      order = q.steps.map((_, i) => i);
      lastMatches = q.steps.map(() => true);
      paint(`<div class="feedback info"><strong>Trình tự logic chuẩn:</strong> ${rich(q.why)}</div>`);
    });
  };
  paint();
}
