import { CHAPTERS, PROBLEMS, PLANNED, SOURCES, THEORY_EXERCISES, theoryChapter, theoryForChapter } from '../data/index.js';
import { isDone, isTheoryDone, getProgress, exportProgress, importProgress } from '../core/progress.js';
import { esc } from '../ui/math.js';
import { chapterPath } from '../data/learningPath.js';

const toc = document.getElementById('toc');
const search = document.getElementById('search');
const status = document.getElementById('status');
const normalize = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const pdf = (url, label, page) => `<a class="resource-link" href="${encodeURI(url)}${page ? `#page=${page}` : ''}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;

function render() {
  const completed = PROBLEMS.filter((p) => isDone(p.id)).length;
  const theoryDone = THEORY_EXERCISES.filter((e) => isTheoryDone(e.id)).length;
  document.getElementById('overall').textContent = `Lý thuyết: ${theoryDone}/${THEORY_EXERCISES.length} bài · Tính toán: ${completed}/${PROBLEMS.length} bài`;
  document.getElementById('home-fact').textContent = `${THEORY_EXERCISES.length} bài tập lý thuyết · ${PROBLEMS.length} bài tính toán · ${CHAPTERS.length} chương theo đề cương`;

  const unfinished = PROBLEMS.filter((p) => !isDone(p.id));
  const started = unfinished.filter((p) => getProgress(p.id).updated).sort((a, b) => getProgress(b.id).updated.localeCompare(getProgress(a.id).updated));
  const next = started[0] || unfinished[0] || PROBLEMS[0];
  const resume = document.getElementById('continue');
  resume.href = `bai.html?id=${next.id}`;
  resume.textContent = started.length ? `Tiếp tục bài ${next.id}` : completed === PROBLEMS.length ? 'Luyện lại bài 2.1' : 'Bắt đầu luyện bài';

  const startTheory = document.getElementById('start-theory');
  if (startTheory) {
    const nextEx = THEORY_EXERCISES.find((e) => !isTheoryDone(e.id)) || THEORY_EXERCISES[0];
    startTheory.href = `lythuyet.html?ch=${nextEx.ch}#${nextEx.stage}`;
    startTheory.textContent = theoryDone === THEORY_EXERCISES.length ? 'Ôn lại lý thuyết Chương 1' : theoryDone ? `Tiếp tục lý thuyết Ch. ${nextEx.ch}` : 'Học lý thuyết Chương 1';
  }

  const query = normalize(search.value.trim());
  let count = 0;
  toc.innerHTML = CHAPTERS.map((ch) => {
    const all = PROBLEMS.filter((p) => p.ch === ch.n);
    const exs = theoryForChapter(ch.n);
    const th = theoryChapter(ch.n);
    const path = chapterPath(ch.n);
    const chapterMatch = normalize(`${ch.n} ${ch.title} ${ch.note} ${th ? th.summary : ''}`).includes(query);
    const matchedStages = new Set(path.filter(({ stage }) => normalize(`${stage.title} ${stage.origin} ${stage.law} ${stage.consequence}`).includes(query)).map(({ stage }) => stage.id));
    const matches = (item) => chapterMatch || normalize(`${item.id} ${item.title}`).includes(query) || path.some(({ stage, exercises, problems }) => matchedStages.has(stage.id) && [...exercises, ...problems].some((entry) => entry.id === item.id));
    const list = all.filter((p) => matches(p) && (status.value !== 'todo' || !isDone(p.id)) && (status.value !== 'done' || isDone(p.id)));
    const tList = exs.filter((e) => matches(e) && status.value !== 'ready' && (status.value !== 'todo' || !isTheoryDone(e.id)) && (status.value !== 'done' || isTheoryDone(e.id)));
    if ((status.value === 'ready' && (!all.length || !list.length)) || ((status.value === 'todo' || status.value === 'done') && !list.length && !tList.length) || (query && !chapterMatch && !list.length && !tList.length && !matchedStages.size)) return '';
    count++;
    const done = all.filter((p) => isDone(p.id)).length;
    const exDone = exs.filter((e) => isTheoryDone(e.id)).length;
    const totalDone = done + exDone;
    const totalAll = all.length + exs.length;
    const calcMeta = all.length ? `${done}/${all.length} bài tính toán` : PLANNED[ch.n] ? `${PLANNED[ch.n]} bài trong PDF` : 'Ôn tập lý thuyết trọng tâm';
    const meta = `${exDone}/${exs.length} bài lý thuyết · ${calcMeta}`;
    const visiblePath = path.filter(({ stage, exercises, problems }) => {
      const hasVisiblePractice = exercises.some((e) => tList.includes(e)) || problems.some((p) => list.includes(p));
      return hasVisiblePractice || ((status.value === 'all') && (chapterMatch || matchedStages.has(stage.id)));
    });
    return `<section class="toc-ch" id="ch${ch.n}" aria-labelledby="h-ch${ch.n}">
      <div class="num" aria-hidden="true">${String(ch.n).padStart(2, '0')}</div>
      <div><h3 id="h-ch${ch.n}">${esc(ch.title)}</h3><p class="chapter-note">${esc(ch.note)}</p><p class="meta">${meta}</p>
      ${totalAll ? `<progress value="${totalDone}" max="${totalAll}" aria-label="Tiến độ chương ${ch.n}"></progress>` : ''}
      <div class="chapter-sources"><a class="resource-link primary-theory" href="lythuyet.html?ch=${ch.n}">Học lý thuyết (${th ? th.stages.length : 0} chặng) →</a>${ch.slide ? pdf(ch.slide, 'Bài giảng PDF') : pdf(SOURCES.outline, 'Xem đề cương')}${ch.page ? pdf(SOURCES.exercises, 'Bài tập gốc', ch.page) : ''}</div></div>
      <details class="chapter-topics"${query || status.value !== 'all' ? ' open' : ''}>
        <summary>Xem ${visiblePath.length} chủ đề và bài tập đi kèm</summary>
        <ol class="topic-list">${visiblePath.map(({ stage, exercises, problems, pdfRefs }) => `<li class="topic-row">
          <a class="topic-title" href="lythuyet.html?ch=${ch.n}#${stage.id}">${esc(stage.title)} <span aria-hidden="true">→</span></a>
          <div class="topic-practice">${exercises.filter((e) => tList.includes(e)).map((e) => `<a class="practice-item${isTheoryDone(e.id) ? ' done' : ''}" href="lythuyet.html?ch=${ch.n}#${e.id}"><span class="practice-kind">Lý thuyết${isTheoryDone(e.id) ? ' · Đã xong' : ''}</span><span>${esc(e.id)} · ${esc(e.title)}</span></a>`).join('')}${problems.filter((p) => list.includes(p)).map((p) => `<a class="practice-item${isDone(p.id) ? ' done' : ''}" href="bai.html?id=${p.id}"><span class="practice-kind">Vận dụng${isDone(p.id) ? ' · Đã xong' : ''}</span><span>Bài ${esc(p.id)}${p.star ? '*' : ''} · ${esc(p.title)}</span></a>`).join('')}</div>
          ${pdfRefs.length && status.value === 'all' ? `<p class="topic-note">Tài liệu đọc và bài tập PDF được gắn ngay trong trang bài học của chủ đề này.</p>` : ''}
        </li>`).join('')}</ol>
      </details>
    </section>`;
  }).join('');
  document.getElementById('result-count').textContent = `${count} chương hiển thị`;
  if (!count) toc.innerHTML = '<p class="empty-results">Không tìm thấy nội dung phù hợp. Hãy thử từ khóa khác hoặc chọn “Tất cả 11 chương”.</p>';
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
