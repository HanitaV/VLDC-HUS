// Bài học theo chặng: dự đoán → giải thích → ví dụ mẫu → luyện tập → vận dụng.
// Thứ tự theo chu trình học vật lý (Mazur: dự đoán trước; Knight/Sweller: ví dụ mẫu rồi giảm dần hỗ trợ).
import { CHAPTERS, PROBLEMS, SOURCES, byId, theoryChapter, theoryForChapter } from '../data/index.js';
import { PROBES } from '../data/theory/probes.js';
import { isDone, isTheoryDone, markStep } from '../core/progress.js';
import { mountChoice, mountFormula, mountOrder } from '../ui/exercises.js';
import { rich, esc } from '../ui/math.js';

const KIND_LABEL = { choice: 'Trắc nghiệm bản chất', order: 'Sắp xếp mạch suy luận', formula: 'Thiết lập biểu thức' };

const rawCh = Number(new URLSearchParams(location.search).get('ch'));
const ch = CHAPTERS.find((c) => c.n === rawCh) || CHAPTERS[0];
const th = theoryChapter(ch.n);
const stages = th?.stages || [];
const exs = theoryForChapter(ch.n);
const chProblems = PROBLEMS.filter((p) => p.ch === ch.n);
const exOf = (st) => exs.filter((e) => e.stage === st.id);
const stageDone = (st) => exOf(st).length > 0 && exOf(st).every((e) => isTheoryDone(e.id));

document.title = `Chương ${ch.n}: ${ch.title} – Bài học – Tiệm Cận`;
document.getElementById('crumbs').innerHTML = `
  <a href="./">Mục lục</a><span aria-hidden="true">/</span>
  <a href="./#ch${ch.n}">Chương ${ch.n}</a><span aria-hidden="true">/</span>
  <span aria-current="page">Bài học</span>`;

const app = document.getElementById('app');
const prevCh = CHAPTERS.find((c) => c.n === ch.n - 1);
const nextCh = CHAPTERS.find((c) => c.n === ch.n + 1);

function workedHTML(st) {
  const p = (st.problems || []).map(byId).find((x) => x?.solution);
  if (!p) return '';
  return `<section class="lesson-step" data-step="worked">
    <h4><span class="step-no">3</span> Ví dụ mẫu: xem người giải làm từng bước</h4>
    <details class="worked-ex">
      <summary>Bài ${esc(p.id)}: ${esc(p.title)}</summary>
      <blockquote class="statement">${rich(p.statement)}</blockquote>
      ${p.logic ? `<p class="worked-why"><strong>Vì sao chọn cách này:</strong> ${rich(p.logic.principle)}</p>` : ''}
      <ol class="worked-steps">${p.solution.map((s) => `<li><strong>${esc(s.title)}.</strong> ${rich(s.body)}</li>`).join('')}</ol>
      <p class="hint">Che lời giải lại và tự làm bước đầu của bài này tại <a href="bai.html?id=${esc(p.id)}">trang bài ${esc(p.id)}</a> sau khi làm xong phần luyện.</p>
    </details>
  </section>`;
}

function applyHTML(st) {
  const probs = st.problems || [];
  const pdfRefs = st.pdfRefs || [];
  if (!probs.length && !pdfRefs.length) return '';
  return `<section class="lesson-step" data-step="apply">
    <h4><span class="step-no">5</span> Vận dụng vào bài tập thật</h4>
    ${probs.length ? `<p class="stage-link-label">Bài tính toán dùng đúng kiến thức này:</p><div class="chips">${probs.map((pid) => {
      const p = byId(pid);
      return `<a class="chip${isDone(pid) ? ' done' : ''}" href="bai.html?id=${pid}" title="${esc(p ? p.title : pid)}">Bài ${pid}${p?.star ? '<span class="star" aria-label="bài có dấu sao">*</span>' : ''}</a>`;
    }).join('')}</div>` : ''}
    ${pdfRefs.length ? `<ul class="stage-pdf-list">${pdfRefs.map((ref) => `<li><a class="resource-link" href="${encodeURI(SOURCES.exercises)}#page=${ref.page}" target="_blank" rel="noopener">${esc(ref.label)} <span aria-hidden="true">↗</span></a> ${rich(ref.note)}</li>`).join('')}</ul>` : ''}
  </section>`;
}

function stageHTML(st, i) {
  const last = i === stages.length - 1;
  return `<article class="lesson-stage logic-stage" id="${st.id}" data-stage="${i}" aria-labelledby="h-${st.id}" hidden>
    <div class="logic-stage-head">
      <p class="eyebrow">Chặng ${i + 1}/${stages.length}</p>
      <h3 id="h-${st.id}">${esc(st.title)}</h3>
    </div>
    <section class="lesson-step" data-step="predict">
      <h4><span class="step-no">1</span> Dự đoán trước khi đọc</h4>
      <p class="hint">Chọn theo trực giác. Sai cũng không sao: câu này để bạn thấy chỗ quan niệm cần sửa.</p>
      <div class="probe-root"></div>
      <button class="btn quiet skip-probe" type="button">Bỏ qua, xem giải thích</button>
    </section>
    <section class="lesson-step explain" data-step="explain" hidden>
      <h4><span class="step-no">2</span> Giải thích theo mạch nhân – quả</h4>
      <ol class="logic-rail">
        <li data-role="origin"><span class="rail-tag">Xuất phát: hiện tượng cần giải thích</span><div class="rail-body">${rich(st.origin)}</div></li>
        <li data-role="law"><span class="rail-tag">Quy luật rút ra</span><div class="rail-body">${rich(st.law)}</div></li>
        <li data-role="trap"><span class="rail-tag">Điều kiện đúng và chỗ hay nhầm</span><div class="rail-body">${rich(st.trap)}</div></li>
        <li data-role="consequence"><span class="rail-tag">Dùng vào bài thế nào</span><div class="rail-body">${rich(st.consequence)}</div></li>
      </ol>
    </section>
    ${workedHTML(st)}
    <section class="lesson-step" data-step="practice">
      <h4><span class="step-no">4</span> Tự luyện (${exOf(st).length ? exOf(st).length + ' bài' : 'chưa có bài riêng, xem phần vận dụng'})</h4>
      <div class="theory-ex-list">
        ${exOf(st).map((ex) => `<article class="theory-ex${isTheoryDone(ex.id) ? ' done' : ''}" id="${ex.id}" data-ex="${ex.id}" aria-labelledby="h-${ex.id}">
          <div class="theory-ex-head"><span class="kind-badge">${esc(KIND_LABEL[ex.kind] || ex.kind)}</span><span class="ex-state" data-state>${isTheoryDone(ex.id) ? 'Đã hoàn thành' : 'Chưa xong'}</span></div>
          <h5 id="h-${ex.id}">${esc(ex.id)} · ${esc(ex.title)}</h5>
          <div class="ex-body"></div>
        </article>`).join('')}
      </div>
    </section>
    ${applyHTML(st)}
    <nav class="stage-nav" aria-label="Chuyển chặng">
      ${i > 0 ? `<button class="btn quiet" type="button" data-go="${i - 1}">← Chặng trước</button>` : '<span></span>'}
      ${last
        ? (nextCh ? `<a class="btn" href="lythuyet.html?ch=${nextCh.n}">Sang chương ${nextCh.n} →</a>` : '<span></span>')
        : `<button class="btn" type="button" data-go="${i + 1}">Chặng tiếp theo →</button>`}
    </nav>
  </article>`;
}

app.innerHTML = `
  <header class="problem-head">
    <p class="eyebrow">Chương ${ch.n} · Bài học theo chặng</p>
    <h1>${esc(ch.title)}</h1>
    <p class="lead">${rich(th ? th.summary : ch.note)}</p>
    <p class="meta" id="theory-progress" role="status"></p>
    <nav class="logic-nav" aria-label="Chuyển nhanh giữa 11 chương">
      ${CHAPTERS.map((c) => `<a class="logic-ch${c.n === ch.n ? ' current' : ''}" href="lythuyet.html?ch=${c.n}"${c.n === ch.n ? ' aria-current="page"' : ''} title="Chương ${c.n}: ${esc(c.title)}">${String(c.n).padStart(2, '0')}</a>`).join('')}
    </nav>
    <p class="source">
      ${ch.slide ? `<a href="${encodeURI(ch.slide)}" target="_blank" rel="noopener">Bài giảng PDF chương ${ch.n} ↗</a>` : `<a href="${encodeURI(SOURCES.outline)}" target="_blank" rel="noopener">Đề cương học phần ↗</a>`}
      ${ch.page ? ` · <a href="${encodeURI(SOURCES.exercises)}#page=${ch.page}" target="_blank" rel="noopener">Bài tập PDF (tr. ${ch.page}) ↗</a>` : ''}
    </p>
  </header>
  <section class="lesson" aria-label="Lộ trình bài học chương ${ch.n}">
    <ol class="lesson-path" id="lesson-path">
      ${stages.map((st, i) => `<li><button type="button" class="path-btn" data-go="${i}"><span class="path-no">${i + 1}</span><span class="path-title">${esc(st.title)}</span></button></li>`).join('')}
    </ol>
    <div class="lesson-body">${stages.map(stageHTML).join('')}</div>
  </section>
  <nav class="pager" aria-label="Chuyển chương và sang bài tập">
    ${prevCh ? `<a href="lythuyet.html?ch=${prevCh.n}"><span class="label">← Chương trước</span><span class="name">Chương ${prevCh.n}: ${esc(prevCh.title)}</span></a>` : '<span></span>'}
    ${chProblems.length
      ? `<a class="pager-mid" href="bai.html?id=${chProblems[0].id}"><span class="label">Thực hành tính toán</span><span class="name">Sang Bài ${chProblems[0].id} (${chProblems.length} bài)</span></a>`
      : ch.page
        ? `<a class="pager-mid" href="${encodeURI(SOURCES.exercises)}#page=${ch.page}" target="_blank" rel="noopener"><span class="label">Bài tập chương ${ch.n}</span><span class="name">Mở bài tập PDF (tr. ${ch.page}) ↗</span></a>`
        : '<span></span>'}
    ${nextCh ? `<a class="next" href="lythuyet.html?ch=${nextCh.n}"><span class="label">Chương sau →</span><span class="name">Chương ${nextCh.n}: ${esc(nextCh.title)}</span></a>` : ''}
  </nav>`;

const stageEls = [...app.querySelectorAll('.lesson-stage')];
const pathBtns = [...app.querySelectorAll('.path-btn')];
const statusEl = document.getElementById('theory-progress');

function refreshStatus() {
  const exDone = exs.filter((e) => isTheoryDone(e.id)).length;
  const parts = [`Đã làm ${exDone}/${exs.length} bài lý thuyết`];
  if (chProblems.length) parts.push(`${chProblems.filter((p) => isDone(p.id)).length}/${chProblems.length} bài tính toán`);
  statusEl.textContent = parts.join(' · ');
  pathBtns.forEach((b, i) => b.classList.toggle('done', stageDone(stages[i])));
}

function show(i, scroll = true) {
  stageEls.forEach((el, k) => { el.hidden = k !== i; });
  pathBtns.forEach((b, k) => { b.classList.toggle('current', k === i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
  history.replaceState(null, '', `#${stages[i].id}`);
  if (scroll) stageEls[i].scrollIntoView({ behavior: 'auto', block: 'start' });
}
app.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]');
  if (go) show(Number(go.dataset.go));
});

stages.forEach((st, i) => {
  const el = stageEls[i];
  const reveal = () => { el.querySelector('[data-step="explain"]').hidden = false; el.querySelector('.skip-probe').hidden = true; };
  const probe = PROBES[st.id];
  if (probe) mountChoice(el.querySelector('.probe-root'), probe, reveal, { allowRetry: false });
  else { el.querySelector('[data-step="predict"]').hidden = true; reveal(); }
  el.querySelector('.skip-probe').addEventListener('click', reveal);

  exOf(st).forEach((ex) => {
    const card = el.querySelector(`[data-ex="${ex.id}"]`);
    const body = card.querySelector('.ex-body');
    const stateEl = card.querySelector('[data-state]');
    const onAttempt = (ok) => {
      markStep(ex.id, 'theory', ok);
      if (ok) {
        card.classList.add('done');
        stateEl.textContent = 'Đã hoàn thành';
        refreshStatus();
      }
    };
    if (ex.kind === 'choice') mountChoice(body, ex, onAttempt, { allowRetry: true });
    else if (ex.kind === 'order') mountOrder(body, ex, onAttempt);
    else if (ex.kind === 'formula') mountFormula(body, { ...ex, lead: ex.prompt }, onAttempt, { idPrefix: `f-${ex.id}` });
  });
});

const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
const startAt = target ? Math.max(0, stageEls.findIndex((el) => el === target || el.contains(target))) : 0;
refreshStatus();
show(startAt, !!target);
if (target && target !== stageEls[startAt]) {
  stageEls[startAt].querySelector('[data-step="explain"]').hidden = false;
  target.scrollIntoView({ behavior: 'auto', block: 'start' });
}
