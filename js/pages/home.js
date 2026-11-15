import { CHAPTERS, PROBLEMS, PLANNED, SOURCES, THEORY_EXERCISES, theoryChapter, theoryForChapter } from '../data/index.js';
import { isDone, isTheoryDone, getProgress, exportProgress, importProgress } from '../core/progress.js';
import { esc } from '../ui/math.js';

const toc = document.getElementById('toc');
const search = document.getElementById('search');
const status = document.getElementById('status');
const normalize = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const pdf = (url, label, page) => `<a class="resource-link" href="${encodeURI(url)}${page ? `#page=${page}` : ''}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;

function render() {
  const completed = PROBLEMS.filter((p) => isDone(p.id)).length;
  const theoryDone = THEORY_EXERCISES.filter((e) => isTheoryDone(e.id)).length;
  document.getElementById('overall').textContent = `Lý thuyết: ${theoryDone}/${THEORY_EXERCISES.length} bài · Tính toán: ${completed}/${PROBLEMS.length} bài`;
  document.getElementById('home-fact').textContent = `${THEORY_EXERCISES.length} bài lý thuyết logic · ${PROBLEMS.length} bài tính toán · ${CHAPTERS.length} chương theo đề cương`;

  const unfinished = PROBLEMS.filter((p) => !isDone(p.id));
  const started = unfinished.filter((p) => getProgress(p.id).updated).sort((a, b) => getProgress(b.id).updated.localeCompare(getProgress(a.id).updated));
  const next = started[0] || unfinished[0] || PROBLEMS[0];
  const resume = document.getElementById('continue');
  resume.href = `bai.html?id=${next.id}`;
  resume.textContent = started.length ? `Tiếp tục bài ${next.id}` : completed === PROBLEMS.length ? 'Luyện lại bài 2.1' : 'Bắt đầu luyện bài';

  const startTheory = document.getElementById('start-theory');
  if (startTheory) {
    const nextEx = THEORY_EXERCISES.find((e) => !isTheoryDone(e.id)) || THEORY_EXERCISES[0];
    startTheory.href = `lythuyet.html?ch=${nextEx.ch}`;
    startTheory.textContent = theoryDone ? `Tiếp tục lý thuyết Ch. ${nextEx.ch}` : 'Học lý thuyết Chương 1';
  }

  const query = normalize(search.value.trim());
  let count = 0;
  toc.innerHTML = CHAPTERS.map((ch) => {
    const all = PROBLEMS.filter((p) => p.ch === ch.n);
    const exs = theoryForChapter(ch.n);
    const th = theoryChapter(ch.n);
    const chapterMatch = normalize(`${ch.n} ${ch.title} ${ch.note} ${th ? th.summary : ''}`).includes(query);
    const list = all.filter((p) => (chapterMatch || normalize(`${p.id} ${p.title}`).includes(query)) && (status.value !== 'todo' || !isDone(p.id)) && (status.value !== 'done' || isDone(p.id)));
    const tList = exs.filter((e) => (chapterMatch || normalize(`${e.id} ${e.title}`).includes(query)) && status.value !== 'ready' && (status.value !== 'todo' || !isTheoryDone(e.id)) && (status.value !== 'done' || isTheoryDone(e.id)));
    if ((status.value === 'ready' && !all.length) || ((status.value === 'todo' || status.value === 'done') && !list.length && !tList.length) || (query && !chapterMatch && !list.length && !tList.length)) return '';
    count++;
    const done = all.filter((p) => isDone(p.id)).length;
    const exDone = exs.filter((e) => isTheoryDone(e.id)).length;
    const totalDone = done + exDone;
    const totalAll = all.length + exs.length;
    const calcMeta = all.length ? `${done}/${all.length} bài tính toán` : PLANNED[ch.n] ? `${PLANNED[ch.n]} bài trong PDF` : 'Ôn tập lý thuyết trọng tâm';
    const meta = `${exDone}/${exs.length} bài lý thuyết · ${calcMeta}`;
    return `<section class="toc-ch" id="ch${ch.n}" aria-labelledby="h-ch${ch.n}">
      <div class="num" aria-hidden="true">${String(ch.n).padStart(2, '0')}</div>
      <div><h3 id="h-ch${ch.n}">${esc(ch.title)}</h3><p class="chapter-note">${esc(ch.note)}</p><p class="meta">${meta}</p>
      ${totalAll ? `<progress value="${totalDone}" max="${totalAll}" aria-label="Tiến độ chương ${ch.n}"></progress>` : ''}
      <div class="chapter-sources"><a class="resource-link primary-theory" href="lythuyet.html?ch=${ch.n}">Lý thuyết theo logic (${th ? th.stages.length : 0} chặng) →</a>${ch.slide ? pdf(ch.slide, 'Bài giảng PDF') : pdf(SOURCES.outline, 'Xem đề cương')}${ch.page ? pdf(SOURCES.exercises, 'Bài tập gốc', ch.page) : ''}</div></div>
      ${tList.length ? `<div class="theory-track"><span class="track-label">Lý thuyết (${exDone}/${exs.length}):</span><div class="tchips">${tList.map((e) => `<a class="tchip${isTheoryDone(e.id) ? ' done' : ''}" href="lythuyet.html?ch=${ch.n}#${e.id}" title="${esc(e.title)}">${esc(e.id)}<span class="visually-hidden">: ${esc(e.title)}${isTheoryDone(e.id) ? ', đã hoàn thành' : ''}</span></a>`).join('')}</div></div>` : ''}
      ${list.length ? `<div class="chips">${list.map((p) => `<a class="chip${isDone(p.id) ? ' done' : ''}" href="bai.html?id=${p.id}" title="${esc(p.title)}">${p.id}${p.star ? '<span class="star" aria-label="bài có dấu sao">*</span>' : ''}<span class="visually-hidden">: ${esc(p.title)}${isDone(p.id) ? ', đã hoàn thành' : ''}</span></a>`).join('')}</div>` : ''}
    </section>`;
  }).join('');
  document.getElementById('result-count').textContent = `${count} chương hiển thị`;
  if (!count) toc.innerHTML = '<p class="empty-results">Không có nội dung phù hợp. Hãy đổi từ khóa hoặc chọn “Tất cả chương”.</p>';
}
search.addEventListener('input', render);
status.addEventListener('change', render);
window.addEventListener('pageshow', render);
window.addEventListener('storage', render);
document.getElementById('source-links').innerHTML = [
  [SOURCES.outline, 'Đề cương Cơ – Nhiệt (11 chương)'],
  [SOURCES.exercises, 'Bài tập Cơ – Nhiệt bắt buộc'],
  [SOURCES.extra, 'Bài tập môn Cơ – Nhiệt bổ sung'],
  [SOURCES.correction, 'Bài tập chương 3 chia nhỏ câu hỏi'],
].map(([url, label]) => `<li>${pdf(url, label)}</li>`).join('');
const feedback = document.getElementById('backup-status');
document.getElementById('export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([exportProgress()], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url; a.download = `tiemcan-tien-do-${new Date().toISOString().slice(0, 10)}.json`;
  a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  feedback.textContent = 'Đã tạo file tiến độ để tải xuống.';
});
document.getElementById('import').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error('File vượt quá 1 MB');
    importProgress(await file.text());
    feedback.textContent = 'Đã khôi phục tiến độ. Các bước đã đúng trên máy này vẫn được giữ lại.';
    render();
  } catch (error) { feedback.textContent = `Không thể khôi phục: ${error.message}. Hãy chọn file JSON đã tải từ Tiệm Cận.`; }
  event.target.value = '';
});
render();
