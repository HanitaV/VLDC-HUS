// Trang lý thuyết theo mạch suy luận logic và bài tập lý thuyết cho từng chương (Chương 1–11).
import { CHAPTERS, PROBLEMS, SOURCES, byId, theoryChapter, theoryForChapter } from '../data/index.js';
import { isDone, isTheoryDone, markStep } from '../core/progress.js';
import { mountChoice, mountFormula, mountOrder } from '../ui/exercises.js';
import { rich, esc } from '../ui/math.js';

const KIND_LABEL = {
  choice: 'Trắc nghiệm bản chất',
  order: 'Sắp xếp mạch suy luận',
  formula: 'Thiết lập biểu thức',
};

const rawCh = Number(new URLSearchParams(location.search).get('ch'));
const ch = CHAPTERS.find((c) => c.n === rawCh) || CHAPTERS[0];
const th = theoryChapter(ch.n);
const exs = theoryForChapter(ch.n);
const chProblems = PROBLEMS.filter((p) => p.ch === ch.n);

document.title = `Chương ${ch.n}: ${ch.title} – Lý thuyết & Logic – Tiệm Cận`;
document.getElementById('crumbs').innerHTML = `
  <a href="./">Mục lục</a><span aria-hidden="true">/</span>
  <a href="./#ch${ch.n}">Chương ${ch.n}</a><span aria-hidden="true">/</span>
  <span aria-current="page">Lý thuyết &amp; Logic</span>
`;

const app = document.getElementById('app');

function stageRefsHTML(stage) {
  const stageExs = exs.filter((e) => e.stage === stage.id);
  const probs = stage.problems || [];
  const pdfRefs = stage.pdfRefs || [];
  if (!stageExs.length && !probs.length && !pdfRefs.length) return '';

  return `<div class="stage-links">
    ${stageExs.length ? `<div class="stage-link-row">
      <span class="stage-link-label">Bài tập lý thuyết:</span>
      <span class="tchips">${stageExs.map((e) => `<a class="tchip${isTheoryDone(e.id) ? ' done' : ''}" href="#${e.id}" data-jump="${e.id}">${esc(e.id)}</a>`).join('')}</span>
    </div>` : ''}
    ${probs.length ? `<div class="stage-link-row">
      <span class="stage-link-label">Áp dụng vào bài tính toán:</span>
      <span class="chips">${probs.map((pid) => {
        const p = byId(pid);
        return `<a class="chip${isDone(pid) ? ' done' : ''}" href="bai.html?id=${pid}" title="${esc(p ? p.title : pid)}">Bài ${pid}${p?.star ? '<span class="star" aria-label="bài có dấu sao">*</span>' : ''}</a>`;
      }).join('')}</span>
    </div>` : ''}
    ${pdfRefs.length ? `<ul class="stage-pdf-list">${pdfRefs.map((ref) => `<li><a class="resource-link" href="${encodeURI(SOURCES.exercises)}#page=${ref.page}" target="_blank" rel="noopener">${esc(ref.label)} <span aria-hidden="true">↗</span></a> — ${rich(ref.note)}</li>`).join('')}</ul>` : ''}
  </div>`;
}

function renderProgressText() {
  const exDone = exs.filter((e) => isTheoryDone(e.id)).length;
  const probDone = chProblems.filter((p) => isDone(p.id)).length;
  const parts = [`Đã hoàn thành ${exDone}/${exs.length} bài lý thuyết`];
  if (chProblems.length) parts.push(`${probDone}/${chProblems.length} bài tính toán chương ${ch.n}`);
  else if (ch.page) parts.push(`Bài tập phần này xem trong PDF (tr. ${ch.page})`);
  return parts.join(' · ');
}

const prevCh = CHAPTERS.find((c) => c.n === ch.n - 1);
const nextCh = CHAPTERS.find((c) => c.n === ch.n + 1);

app.innerHTML = `
  <header class="problem-head">
    <p class="eyebrow">Chương ${ch.n} · Lý thuyết theo mạch logic</p>
    <h1>${esc(ch.title)}</h1>
    <p class="lead">${rich(th ? th.summary : ch.note)}</p>
    <p class="meta" id="theory-progress" role="status">${esc(renderProgressText())}</p>
    <nav class="logic-nav" aria-label="Chuyển nhanh giữa 11 chương lý thuyết">
      ${CHAPTERS.map((c) => `<a class="logic-ch${c.n === ch.n ? ' current' : ''}" href="lythuyet.html?ch=${c.n}"${c.n === ch.n ? ' aria-current="page"' : ''} title="Chương ${c.n}: ${esc(c.title)}">${String(c.n).padStart(2, '0')}</a>`).join('')}
    </nav>
    <p class="source">
      ${ch.slide ? `<a href="${encodeURI(ch.slide)}" target="_blank" rel="noopener">Đọc bài giảng PDF chương ${ch.n} ↗</a>.` : `<a href="${encodeURI(SOURCES.outline)}" target="_blank" rel="noopener">Xem đề cương học phần ↗</a>.`}
      ${ch.page ? ` <a href="${encodeURI(SOURCES.exercises)}#page=${ch.page}" target="_blank" rel="noopener">Bài tập bắt buộc PDF (tr. ${ch.page}) ↗</a>.` : ''}
    </p>
  </header>

  <section class="logic-section" aria-labelledby="logic-flow-title">
    <div class="section-head">
      <h2 id="logic-flow-title">Chuỗi suy luận cốt lõi của chương ${ch.n}</h2>
      <p class="meta">Đi từ hiện tượng → quy luật → bẫy hay sai → cách áp dụng</p>
    </div>
    <div class="logic-stages">
      ${(th?.stages || []).map((st, idx) => `
        <article class="logic-stage" id="${st.id}" aria-labelledby="h-${st.id}">
          <div class="logic-stage-head">
            <p class="eyebrow">${esc(st.id)} · Chặng ${idx + 1}/${th.stages.length}</p>
            <h3 id="h-${st.id}">${esc(st.title)}</h3>
          </div>
          <ol class="logic-rail">
            <li data-role="origin"><span class="rail-tag">1. Xuất phát / Hiện tượng</span><div class="rail-body">${rich(st.origin)}</div></li>
            <li data-role="law"><span class="rail-tag">2. Định luật &amp; Quy luật</span><div class="rail-body">${rich(st.law)}</div></li>
            <li data-role="trap"><span class="rail-tag">3. Điều kiện &amp; Bẫy hay sai</span><div class="rail-body">${rich(st.trap)}</div></li>
            <li data-role="consequence"><span class="rail-tag">4. Hệ quả &amp; Cách dùng vào bài</span><div class="rail-body">${rich(st.consequence)}</div></li>
          </ol>
          ${stageRefsHTML(st)}
        </article>
      `).join('')}
    </div>
  </section>

  <section class="theory-ex-section" id="luyen-ly-thuyet" aria-labelledby="theory-ex-title">
    <div class="section-head">
      <h2 id="theory-ex-title">Bài tập lý thuyết theo logic (${exs.length} bài)</h2>
      <p class="meta">Làm bài nào web lưu tiến độ bài đó ngay trên trình duyệt</p>
    </div>
    <div class="theory-ex-list">
      ${exs.map((ex) => {
        const done = isTheoryDone(ex.id);
        return `
          <article class="theory-ex${done ? ' done' : ''}" id="${ex.id}" data-ex="${ex.id}" aria-labelledby="h-${ex.id}">
            <div class="theory-ex-head">
              <div class="theory-ex-meta">
                <span class="kind-badge">${esc(KIND_LABEL[ex.kind] || ex.kind)}</span>
                <a class="stage-ref" href="#${ex.stage}">Liên kết chặng ${esc(ex.stage)}</a>
              </div>
              <span class="ex-state" data-state>${done ? 'Đã hoàn thành' : 'Chưa xong'}</span>
            </div>
            <h3 id="h-${ex.id}">${esc(ex.id)} · ${esc(ex.title)}</h3>
            <div class="ex-body"></div>
          </article>`;
      }).join('')}
    </div>
  </section>

  <nav class="pager" aria-label="Chuyển chương và sang bài tập">
    ${prevCh ? `<a href="lythuyet.html?ch=${prevCh.n}"><span class="label">← Lý thuyết trước</span><span class="name">Chương ${prevCh.n}: ${esc(prevCh.title)}</span></a>` : '<span></span>'}
    ${chProblems.length
      ? `<a class="pager-mid" href="bai.html?id=${chProblems[0].id}"><span class="label">Thực hành tính toán</span><span class="name">Sang Bài ${chProblems[0].id} (${chProblems.length} bài)</span></a>`
      : ch.page
        ? `<a class="pager-mid" href="${encodeURI(SOURCES.exercises)}#page=${ch.page}" target="_blank" rel="noopener"><span class="label">Bài tập chương ${ch.n}</span><span class="name">Mở bài tập PDF (tr. ${ch.page}) ↗</span></a>`
        : '<span></span>'}
    ${nextCh ? `<a class="next" href="lythuyet.html?ch=${nextCh.n}"><span class="label">Lý thuyết tiếp →</span><span class="name">Chương ${nextCh.n}: ${esc(nextCh.title)}</span></a>` : ''}
  </nav>
`;

const statusEl = document.getElementById('theory-progress');

exs.forEach((ex) => {
  const card = app.querySelector(`[data-ex="${ex.id}"]`);
  const body = card.querySelector('.ex-body');
  const stateEl = card.querySelector('[data-state]');
  const onAttempt = (ok) => {
    markStep(ex.id, 'theory', ok);
    if (ok) {
      card.classList.add('done');
      stateEl.textContent = 'Đã hoàn thành';
      app.querySelectorAll(`[data-jump="${ex.id}"]`).forEach((chip) => chip.classList.add('done'));
      statusEl.textContent = renderProgressText();
    }
  };
  if (ex.kind === 'choice') mountChoice(body, ex, onAttempt, { allowRetry: true });
  else if (ex.kind === 'order') mountOrder(body, ex, onAttempt);
  else if (ex.kind === 'formula') mountFormula(body, { ...ex, lead: ex.prompt }, onAttempt, { idPrefix: `f-${ex.id}` });
});

if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
}
