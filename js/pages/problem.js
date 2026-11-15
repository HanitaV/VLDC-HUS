// Trang một bài tập: đề → cơ sở lý thuyết theo logic → dự đoán → hệ quy chiếu → sơ đồ lực → công thức → thay số → lời giải mẫu.
import { PROBLEMS, CHAPTERS, SOURCES, byId, groupOf, GROUP_NAMES, findStage } from '../data/index.js';
import { givenValues } from '../data/util.js';
import { checkNumber, fmt } from '../core/grader.js';
import { getProgress, markStep } from '../core/progress.js';
import { mountChoice, mountFormula } from '../ui/exercises.js';
import { rich, tex, esc } from '../ui/math.js';
import { figureHTML } from '../ui/figures.js';
import { mountFBD } from '../ui/fbd.js';
import { mount as mountArea21 } from '../sims/area21.js';
import { mount as mountIncline } from '../sims/inclinePulley.js';

const SIMS = { 'area-21': mountArea21, 'incline-pulley': mountIncline };

const app = document.getElementById('app');
const id = new URLSearchParams(location.search).get('id');
const P = byId(id);

if (!P) {
  app.innerHTML = `<div class="problem-head"><h1>Không tìm thấy bài này</h1><p class="meta">Đường dẫn có thể đã sai số hiệu bài. <a href="./">Về danh sách bài tập</a>.</p></div>`;
} else {
  render();
}

function render() {
  const ch = CHAPTERS.find((c) => c.n === P.ch);
  const stInfo = P.logic ? findStage(P.logic.theoryRef) : null;
  document.title = `Bài ${P.id}${P.star ? '*' : ''}: ${P.title} – Tiệm Cận`;
  document.getElementById('crumbs').innerHTML = `<a href="./#ch${ch.n}">Chương ${ch.n}. ${esc(ch.title)}</a><span aria-hidden="true">/</span><a href="lythuyet.html?ch=${ch.n}">Lý thuyết</a>`;

  let values = givenValues(P);
  let practice = false;
  const prog = getProgress(P.id);
  const attempted = new Set(Object.keys(prog).filter((k) => k !== 'updated'));

  const steps = [];
  if (P.predict) steps.push({ key: 'predict', title: 'Dự đoán trước khi tính' });
  if (P.frame) steps.push({ key: 'frame', title: 'Chọn hệ quy chiếu' });
  if (P.fbd) steps.push({ key: 'fbd', title: 'Vẽ sơ đồ lực' });
  if (P.targets.some((t) => t.expr)) steps.push({ key: 'formula', title: 'Lập công thức' });
  steps.push({ key: 'number', title: 'Thay số' });

  const idx = PROBLEMS.indexOf(P);
  const prev = PROBLEMS[idx - 1];
  const next = PROBLEMS[idx + 1];

  app.innerHTML = `
    <header class="problem-head">
      <h1>${esc(P.title)}</h1>
      <p class="meta">Bài ${P.id}${P.star ? '<span class="star">*</span>' : ''} · Chương ${ch.n}: ${esc(ch.title)}.</p>
    </header>
    <div class="layout">
      <div class="col-lead">
        <blockquote class="statement">${rich(P.statement)}</blockquote>
        <p class="source">${P.adapted ? 'Đề diễn đạt lại từ' : 'Đề chép từ'} <a href="${encodeURI(SOURCES.exercises)}#page=${P.page}" target="_blank" rel="noopener">Bài tập Cơ – Nhiệt, trang ${P.page}</a>.${ch.slide ? ` <a href="${encodeURI(ch.slide)}" target="_blank" rel="noopener">Đọc bài giảng chương ${ch.n}</a>.` : ''}</p>
        ${P.errata ? `<div class="notice errata"><strong>Đính chính đáp số trong PDF.</strong> ${rich(P.errata)}</div>` : ''}
        ${P.sample ? `<div class="notice sample"><strong>Bài có số liệu luyện tập tự chọn.</strong> Các giá trị không nêu trong đề được web đặt thêm để bạn luyện thay số.</div>` : ''}
        ${P.logic ? `<section class="theory-bridge" aria-labelledby="bridge-h">
          <div class="bridge-head">
            <div>
              <p class="eyebrow">Cơ sở lý thuyết &amp; Mạch suy luận logic</p>
              <h2 id="bridge-h">${stInfo ? esc(stInfo.stage.title) : 'Nguyên tắc giải bài'}</h2>
            </div>
            <a class="resource-link" href="lythuyet.html?ch=${ch.n}#${P.logic.theoryRef}">Học ${esc(P.logic.theoryRef)} ↗</a>
          </div>
          <p class="bridge-principle"><strong>Nguyên lý cốt lõi:</strong> ${rich(P.logic.principle)}</p>
          <p class="bridge-cond"><strong>Điều kiện áp dụng &amp; Bẫy sai:</strong> ${rich(P.logic.condition)}</p>
          <details class="bridge-steps">
            <summary>Mạch suy luận 3 bước cho bài này</summary>
            <ol>${P.logic.steps.map((s) => `<li>${rich(s)}</li>`).join('')}</ol>
          </details>
          ${P.logic.check ? `<div class="bridge-check"><p class="eyebrow" style="margin-bottom:0.35rem">Kiểm tra nhanh theo logic</p><div id="logic-check-root"></div></div>` : ''}
        </section>` : ''}
      </div>
      <aside class="bench" aria-label="Số liệu và mô phỏng">
        <div>
          <h2>Số liệu</h2>
          <table class="given"><tbody></tbody></table>
          <p class="given-note" hidden></p>
          ${P.vary ? `<div class="row" style="margin-top:0.6rem"><button class="btn ghost" type="button" data-act="vary">Đổi số liệu</button><button class="btn quiet" type="button" data-act="orig" hidden>Về số liệu đề</button></div>` : ''}
        </div>
        ${P.sim || P.figure ? `<div class="bench-visual">
          ${P.figureNote ? `<p class="figure-note">${esc(P.figureNote)}</p>` : ''}
          <div class="sim-root"></div>
        </div>` : ''}
      </aside>
      <div class="col-steps">
        <ol class="steps">
          ${steps.map((s) => `<li class="step" data-step="${s.key}" data-state="locked"><h2>${s.title}<span class="lock-note"></span></h2><div class="step-body"></div></li>`).join('')}
        </ol>
        <section class="worked" aria-labelledby="worked-h"></section>
        <nav class="group-nav" aria-label="Bài cùng dạng"></nav>
        <nav class="row" style="margin-top:1.5rem" aria-label="Chuyển bài">
          ${prev ? `<a class="btn quiet" href="bai.html?id=${prev.id}">Bài trước: ${prev.id}</a>` : ''}
          ${next ? `<a class="btn quiet" href="bai.html?id=${next.id}">Bài sau: ${next.id}</a>` : ''}
        </nav>
      </div>
    </div>
  `;

  // ----- Bàn thí nghiệm -----
  const tbody = app.querySelector('.given tbody');
  const renderGiven = () => {
    tbody.innerHTML = P.given.map((g) => `<tr><th scope="row">${esc(g.label)}</th><td>${tex(g.sym)} = ${fmt(values[g.key], 4)}${g.unit === '°' ? '°' : g.unit ? ` ${esc(g.unit)}` : ''}</td></tr>`).join('');
    const note = app.querySelector('.given-note');
    note.hidden = !practice && !P.sample;
    note.textContent = practice ? 'Đây là số liệu luyện tập do web đổi, không phải số liệu trong đề. Kết quả luyện số mới không ghi đè tiến độ đề gốc.' : P.sample ? 'Bảng có số liệu tự chọn để luyện thay số. Xem đề phía bên để phân biệt dữ kiện gốc.' : '';
  };
  renderGiven();

  let sim = null;
  const simRoot = app.querySelector('.sim-root');
  if (simRoot) {
    if (P.sim && SIMS[P.sim]) {
      sim = SIMS[P.sim](simRoot, { values });
    } else if (P.figure) {
      simRoot.innerHTML = `<div class="paper">${figureHTML(P.figure)}</div><p class="figure-note">Hình vẽ lại theo hình trong file bài tập.</p>`;
    }
  }
  const simGate = () => {
    if (!P.sim || !simRoot) return;
    const paper = simRoot.querySelector('.paper');
    const locked = P.predict && !attempted.has('predict');
    let gate = paper.querySelector('.gate');
    simRoot.querySelectorAll('button, input').forEach((el) => { el.disabled = !!locked; });
    if (locked && !gate) {
      gate = document.createElement('div');
      gate.className = 'gate';
      gate.textContent = 'Chọn một dự đoán ở bước 1 để mở mô phỏng.';
      paper.appendChild(gate);
    } else if (!locked && gate) gate.remove();
  };
  simGate();

  // ----- Các bước -----
  const stepEls = [...app.querySelectorAll('.step')];
  const refreshLocks = () => {
    let open = true;
    stepEls.forEach((el) => {
      const key = el.dataset.step;
      const done = prog[key] === true || getProgress(P.id)[key] === true;
      el.dataset.state = open ? (done ? 'done' : 'open') : 'locked';
      el.querySelector('.lock-note').textContent = open ? '' : 'Mở sau khi làm bước trước';
      if (!attempted.has(key)) open = false;
    });
    simGate();
    renderWorked();
  };
  const attempt = (key, ok) => {
    attempted.add(key);
    if (!(practice && key === 'number')) markStep(P.id, key, ok);
    refreshLocks();
  };

  const logicRoot = document.getElementById('logic-check-root');
  if (logicRoot && P.logic?.check) {
    mountChoice(logicRoot, P.logic.check, (ok) => markStep(P.id, 'logic', ok), { allowRetry: true });
  }

  for (const el of stepEls) {
    const body = el.querySelector('.step-body');
    const key = el.dataset.step;
    if (key === 'predict') mountChoice(body, P.predict, (ok) => attempt('predict', ok));
    if (key === 'frame') mountChoice(body, P.frame, (ok) => attempt('frame', ok));
    if (key === 'fbd') mountFBD(body, P.fbd, { onAttempt: (ok) => attempt('fbd', ok) });
    if (key === 'formula') mountFormula(body, P, (ok) => attempt('formula', ok));
    if (key === 'number') numberStep(body, (ok) => attempt('number', ok));
  }

  // ----- Đổi số liệu -----
  const varyBtn = app.querySelector('[data-act="vary"]');
  const origBtn = app.querySelector('[data-act="orig"]');
  const applyValues = () => {
    renderGiven();
    sim?.setValues(values);
    const numBody = app.querySelector('[data-step="number"] .step-body');
    numberStep(numBody, (ok) => attempt('number', ok));
  };
  varyBtn?.addEventListener('click', () => {
    const next = { ...values };
    for (const [k, [lo, hi, step]] of Object.entries(P.vary)) {
      const n = Math.round((hi - lo) / step);
      let v;
      do { v = +(lo + step * Math.floor(Math.random() * (n + 1))).toFixed(6); } while (n > 0 && v === values[k] && Object.keys(P.vary).length === 1);
      next[k] = v;
    }
    values = next;
    practice = true;
    origBtn.hidden = false;
    applyValues();
  });
  origBtn?.addEventListener('click', () => {
    values = givenValues(P);
    practice = false;
    origBtn.hidden = true;
    applyValues();
  });

  // ----- Lời giải mẫu rút dần -----
  function renderWorked() {
    const sec = app.querySelector('.worked');
    const group = groupOf(P);
    const pos = group.indexOf(P);
    const total = P.solution.length;
    const visible = Math.max(0, total - P.fade);
    const canOpen = attempted.has('formula') || attempted.has('number');
    const opened = sec.dataset.opened ? +sec.dataset.opened : 0;
    if (visible === total && !sec.dataset.full) {
      sec.innerHTML = `<h2 id="worked-h">Lời giải mẫu</h2>
        <p class="lead">Bài ${pos + 1}/${group.length} của dạng "${GROUP_NAMES[P.group]}" có lời giải mẫu đầy đủ. Nên tự thử các bước trên trước, rồi mở lời giải để đối chiếu.</p>
        <button class="btn ghost" type="button" data-act="open-full">Xem lời giải mẫu</button>`;
      sec.querySelector('[data-act="open-full"]').addEventListener('click', () => { sec.dataset.full = '1'; renderWorked(); });
      renderGroupNav(group);
      return;
    }
    const lead = visible === total
      ? `Bài ${pos + 1}/${group.length} của dạng "${GROUP_NAMES[P.group]}": lời giải mẫu đầy đủ. Đọc kỹ từng bước, rồi thử bài sau cùng dạng.`
      : `Bài ${pos + 1}/${group.length} của dạng "${GROUP_NAMES[P.group]}": ${total - visible} bước cuối được ẩn để bạn tự làm. ${canOpen ? 'Mở từng bước để đối chiếu.' : 'Các bước ẩn mở được sau khi bạn đã thử lập công thức hoặc thay số.'}`;
    sec.innerHTML = `
      <h2 id="worked-h">Lời giải mẫu</h2>
      <p class="lead">${lead}</p>
      <ol>${P.solution.map((s, i) => {
        const show = i < visible + opened;
        if (show) return `<li><span class="t">${esc(s.title)}</span>${rich(s.body)}</li>`;
        const first = i === visible + opened;
        return `<li class="hidden-step"><span class="t">${esc(s.title)}</span>${first ? `<button class="btn quiet" type="button" data-act="open-step" ${canOpen ? '' : 'disabled'}>Mở bước này</button>` : ''}</li>`;
      }).join('')}</ol>`;
    sec.querySelector('[data-act="open-step"]')?.addEventListener('click', () => {
      sec.dataset.opened = String(opened + 1);
      renderWorked();
    });
    renderGroupNav(group);
  }

  function renderGroupNav(group) {
    const nav = app.querySelector('.group-nav');
    nav.innerHTML = group.length > 1 ? `Cùng dạng "${esc(GROUP_NAMES[P.group])}", theo thứ tự từ có lời giải đủ đến tự làm:
      <ol>${group.map((g) => `<li><a class="chip" href="bai.html?id=${g.id}" ${g === P ? 'aria-current="page" style="border-color:var(--pen)"' : ''}>${g.id}${g.star ? '<span class="star">*</span>' : ''}</a></li>`).join('')}</ol>` : '';
  }

  // ----- Thay số -----
  function numberStep(root, done) {
    const out = P.model(values);
    root.innerHTML = `
      <p class="lead">${practice ? 'Dùng số liệu luyện tập ở bảng bên.' : 'Dùng số liệu ở bảng bên.'} Nếu cần, lấy g = 9,8 m/s². Web chấp nhận sai số 1%. Gõ số thập phân bằng dấu phẩy hoặc dấu chấm đều được.</p>
      ${P.targets.map((t, i) => `
        <div class="field" data-t="${t.key}">
          <label for="n-${i}">${tex(t.sym)} <span class="unit">(${esc(t.label)}${t.unit ? `, ${esc(t.unit)}` : ''})</span></label>
          <div class="input-row">
            <input class="input" id="n-${i}" autocomplete="off" inputmode="decimal">
            <button class="btn" type="button" data-check>Kiểm tra</button>
          </div>
          <div class="fb" aria-live="polite"></div>
        </div>`).join('')}
    `;
    const solved = new Set();
    root.querySelectorAll('.field').forEach((field) => {
      const t = P.targets.find((x) => x.key === field.dataset.t);
      const target = out[t.key];
      const input = field.querySelector('input');
      let wrong = 0;
      input.addEventListener('input', () => { solved.delete(t.key); field.querySelector('.fb').innerHTML = ''; });
      const check = () => {
        const r = checkNumber(input.value, target);
        const fb = field.querySelector('.fb');
        if (r.ok) {
          solved.add(t.key);
          const pdfNote = !practice && t.pdfNote ? ` ${t.pdfNote}` : '';
          fb.innerHTML = `<div class="feedback ok">Đúng. Giá trị chính xác hơn: ${fmt(target, 4)}${t.unit ? ` ${esc(t.unit)}` : ''}.${esc(pdfNote)}</div>`;
        } else {
          solved.delete(t.key);
          wrong++;
          fb.innerHTML = `<div class="feedback bad">${esc(r.message)}</div>${wrong >= 2 ? `<button class="btn quiet" type="button" data-reveal>Xem đáp số</button>` : ''}`;
          fb.querySelector('[data-reveal]')?.addEventListener('click', () => {
            fb.insertAdjacentHTML('beforeend', `<div class="feedback info">${tex(t.sym)} ≈ ${fmt(target, 4)}${t.unit ? ` ${esc(t.unit)}` : ''}</div>`);
          }, { once: true });
        }
        done(solved.size === P.targets.length);
      };
      field.querySelector('[data-check]').addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    });
  }

  refreshLocks();
}
