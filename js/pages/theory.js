// Bài học theo chặng: dự đoán → giải thích → ví dụ mẫu → luyện tập → vận dụng.
// Thứ tự theo chu trình học vật lý (Mazur: dự đoán trước; Knight/Sweller: ví dụ mẫu rồi giảm dần hỗ trợ).
import { CHAPTERS, PROBLEMS, SOURCES, theoryChapter, theoryForChapter } from '../data/index.js';
import { PROBES } from '../data/theory/probes.js';
import { chapterPath } from '../data/learningPath.js';
import { isDone, isTheoryDone, markStep } from '../core/progress.js';
import { mountChoice, mountFormula, mountOrder } from '../ui/exercises.js';
import { rich, esc } from '../ui/math.js';

const KIND_LABEL = { choice: 'Trắc nghiệm bản chất', order: 'Sắp xếp mạch suy luận', formula: 'Thiết lập biểu thức' };

const rawCh = Number(new URLSearchParams(location.search).get('ch'));
const ch = CHAPTERS.find((c) => c.n === rawCh) || CHAPTERS[0];
const th = theoryChapter(ch.n);
const route = chapterPath(ch.n);
const stages = route.map((part) => part.stage);
const exs = theoryForChapter(ch.n);
const chProblems = PROBLEMS.filter((p) => p.ch === ch.n);
const partOf = (st) => route.find((part) => part.stage.id === st.id);
const exOf = (st) => partOf(st).exercises;
const stageDone = (st) => exOf(st).length > 0 && exOf(st).every((e) => isTheoryDone(e.id));

document.title = `Chương ${ch.n}: ${ch.title} – Bài học – Tiệm Cận`;
document.getElementById('crumbs').innerHTML = `
  <a href="./">Mục lục</a><span aria-hidden="true">/</span>
  <a href="./#ch${ch.n}">Chương ${ch.n}</a><span aria-hidden="true">/</span>
  <span aria-current="page">Bài học</span>`;

const app = document.getElementById('app');
const prevCh = CHAPTERS.find((c) => c.n === ch.n - 1);
const nextCh = CHAPTERS.find((c) => c.n === ch.n + 1);
const returnProblem = PROBLEMS.find((p) => p.id === new URLSearchParams(location.search).get('from'));

function workedHTML(st, n) {
  const p = partOf(st).problems.find((x) => x.solution?.length);
  if (!p) return '';
  return `<section class="lesson-step" id="${st.id}-worked" data-step="worked">
    <h4><span class="step-no">${n}</span> Ví dụ mẫu</h4>
    <p class="hint">Chú ý cách chọn quy luật và kiểm tra điều kiện áp dụng trước khi xem các bước biến đổi.</p>
    <details class="worked-ex">
      <summary>Bài ${esc(p.id)}: ${esc(p.title)}</summary>
      <blockquote class="statement">${rich(p.statement)}</blockquote>
      ${p.logic ? `<p class="worked-why"><strong>Vì sao chọn cách này:</strong> ${rich(p.logic.principle)}</p>` : ''}
      <ol class="worked-steps">${p.solution.map((s) => `<li><strong>${esc(s.title)}.</strong> ${rich(s.body)}</li>`).join('')}</ol>
      <p class="hint">Sau khi đọc xong, hãy tự giải lại bài này tại <a href="bai.html?id=${esc(p.id)}">trang Bài ${esc(p.id)}</a>.</p>
    </details>
  </section>`;
}

function applyHTML(st, n) {
  const { problems: probs, pdfRefs } = partOf(st);
  if (!probs.length && !pdfRefs.length) return '';
  return `<section class="lesson-step" id="${st.id}-apply" data-step="apply">
    <h4><span class="step-no">${n}</span> ${probs.length ? 'Vận dụng vào bài tính toán' : 'Vận dụng và đọc thêm'}</h4>
    ${probs.length ? `<p class="stage-link-label">Chọn một bài dưới đây để tự áp dụng quy luật vừa học (bạn có thể quay lại đúng chặng này bất cứ lúc nào).</p><div class="practice-links">${probs.map((p) => `
      <a class="practice-link${isDone(p.id) ? ' done' : ''}" href="bai.html?id=${esc(p.id)}">
        <span class="practice-link-title">Bài ${esc(p.id)} · ${esc(p.title)}${p.star ? '<span class="star" aria-label="bài có dấu sao">*</span>' : ''}</span>
        <span class="practice-link-meta">${isDone(p.id) ? 'Đã hoàn thành' : 'Tự giải theo từng bước'} <span aria-hidden="true">→</span></span>
      </a>`).join('')}</div>` : ''}
    ${pdfRefs.length ? '<p class="hint">Đọc tài liệu gốc hoặc tự giải các bài trong PDF trên giấy, sau đó đối chiếu lại với quy luật và điều kiện ở trên (các bài PDF chưa hỗ trợ chấm tự động).</p>' : ''}
    ${pdfRefs.length ? `<ul class="stage-pdf-list">${pdfRefs.map((ref) => `<li><a class="resource-link" href="${esc(ref.href)}" target="_blank" rel="noopener">${esc(ref.label)} <span aria-hidden="true">↗</span></a> ${rich(ref.note)}</li>`).join('')}</ul>` : ''}
  </section>`;
}

function stageHTML(st, i) {
  const last = i === stages.length - 1;
  const part = partOf(st);
  const hasWorked = part.problems.some((p) => p.solution?.length);
  const steps = [
    ...(PROBES[st.id] ? [['predict', 'Dự đoán']] : []),
    ['explain', 'Hiểu quy luật'],
    ...(hasWorked ? [['worked', 'Ví dụ mẫu']] : []),
    ...(part.exercises.length ? [['practice', 'Tự kiểm tra']] : []),
    ...(part.problems.length || part.pdfRefs.length ? [['apply', 'Vận dụng']] : []),
  ];
  const stepNo = (key) => steps.findIndex(([id]) => id === key) + 1;
  return `<article class="lesson-stage logic-stage" id="${st.id}" data-stage="${i}" aria-labelledby="h-${st.id}" hidden>
    <div class="logic-stage-head">
      <p class="eyebrow">Chặng ${i + 1}/${stages.length}</p>
      <h3 id="h-${st.id}" tabindex="-1">${esc(st.title)}</h3>
      <p class="stage-context">${i > 0 ? `Tiếp nối chặng trước: ${esc(stages[i - 1].title)}.` : 'Đi từ hiện tượng thực tế đến quy luật vật lý và cách vận dụng.'}</p>
      <nav class="stage-outline" aria-label="Các bước của chặng ${i + 1}">${steps.map(([key, label], n) => `<a href="#${st.id}-${key}">${n + 1}. ${label}</a>`).join('')}</nav>
    </div>
    <section class="lesson-step" id="${st.id}-predict" data-step="predict">
      <h4><span class="step-no">${stepNo('predict')}</span> Dự đoán trước khi đọc</h4>
      <p class="hint">Hãy thử chọn câu trả lời trước khi đọc giải thích bên dưới để tự kiểm tra trực giác vật lý của mình.</p>
      <div class="probe-root"></div>
    </section>
    <section class="lesson-step explain" id="${st.id}-explain" data-step="explain">
      <h4><span class="step-no">${stepNo('explain')}</span> Quy luật và điều kiện áp dụng</h4>
      <ol class="logic-rail">
        <li data-role="origin"><span class="rail-tag">Hiện tượng cần giải thích</span><div class="rail-body">${rich(st.origin)}</div></li>
        <li data-role="law"><span class="rail-tag">Quy luật rút ra</span><div class="rail-body">${rich(st.law)}</div></li>
        <li data-role="trap"><span class="rail-tag">Điều kiện áp dụng &amp; lỗi hay gặp</span><div class="rail-body">${rich(st.trap)}</div></li>
        <li data-role="consequence"><span class="rail-tag">Cách vận dụng vào bài tập</span><div class="rail-body">${rich(st.consequence)}</div></li>
      </ol>
    </section>
    ${workedHTML(st, stepNo('worked'))}
    ${part.exercises.length ? `<section class="lesson-step" id="${st.id}-practice" data-step="practice">
      <h4><span class="step-no">${stepNo('practice')}</span> Tự kiểm tra lý thuyết · ${exOf(st).length} bài</h4>
      <p class="hint">Áp dụng quy luật vừa học để trả lời các câu hỏi sau. Hệ thống sẽ giải thích ngay nếu bạn chọn nhầm.</p>
      <div class="theory-ex-list">
        ${exOf(st).map((ex) => `<article class="theory-ex${isTheoryDone(ex.id) ? ' done' : ''}" id="${ex.id}" data-ex="${ex.id}" aria-labelledby="h-${ex.id}">
          <div class="theory-ex-head"><span class="kind-badge">${esc(KIND_LABEL[ex.kind] || ex.kind)}</span><span class="ex-state" data-state>${isTheoryDone(ex.id) ? 'Đã hoàn thành' : 'Chưa xong'}</span></div>
          <h5 id="h-${ex.id}">${esc(ex.id)} · ${esc(ex.title)}</h5>
          <div class="ex-body"></div>
        </article>`).join('')}
      </div>
    </section>` : ''}
    ${applyHTML(st, stepNo('apply'))}
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
    <p class="eyebrow">Chương ${ch.n} · Lý thuyết theo chặng</p>
    <h1>${esc(ch.title)}</h1>
    <p class="lead">${rich(th ? th.summary : ch.note)}</p>
    ${returnProblem ? `<a class="btn quiet lesson-return" href="bai.html?id=${esc(returnProblem.id)}">← Trở lại Bài ${esc(returnProblem.id)} · ${esc(returnProblem.title)}</a>` : ''}
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
    <div class="stage-overview">
      <h2>Các chặng trong chương ${ch.n}</h2>
      <p>Bạn nên học lần lượt từng chặng bên dưới, hoặc chọn ngay chặng cần ôn tập.</p>
      <p class="hint">Dấu ✓ xuất hiện khi bạn hoàn thành hết các bài tự kiểm tra trong chặng.</p>
    </div>
    <ol class="lesson-path" id="lesson-path">
      ${route.map(({ stage: st, exercises, problems, pdfRefs }, i) => `<li><button type="button" class="path-btn" data-go="${i}"><span class="path-no">${i + 1}</span><span class="path-copy"><span class="path-title">${esc(st.title)}</span><span class="path-detail">${exercises.length} bài tự kiểm tra${problems.length ? ` · ${problems.length} bài tính toán` : ''}${pdfRefs.length ? ` · ${pdfRefs.length} mục tài liệu` : ''}</span></span></button></li>`).join('')}
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
  if (scroll) stageEls[i].scrollIntoView({ behavior: 'auto', block: 'start' });
}
app.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]');
  if (go) {
    const i = Number(go.dataset.go);
    history.pushState(null, '', `#${stages[i].id}`);
    show(i);
    stageEls[i].querySelector('h3').focus({ preventScroll: true });
  }
});

stages.forEach((st, i) => {
  const el = stageEls[i];
  const probe = PROBES[st.id];
  if (probe) mountChoice(el.querySelector('.probe-root'), probe, () => {}, { allowRetry: false });
  else el.querySelector('[data-step="predict"]').hidden = true;

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

refreshStatus();
function followHash() {
  let id = location.hash.slice(1);
  try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
  const target = id ? document.getElementById(id) : null;
  const index = target ? stageEls.findIndex((el) => el === target || el.contains(target)) : -1;
  const startAt = Math.max(0, index);
  show(startAt, false);
  if (index >= 0) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
}
window.addEventListener('hashchange', followHash);
window.addEventListener('popstate', followHash);
followHash();
