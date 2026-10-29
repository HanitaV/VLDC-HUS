// Trang chủ: mục lục 9 chương PHY1159, mỗi chương liệt kê bài tập đã có trên web.
import { CHAPTERS, PROBLEMS, PLANNED } from '../data/index.js';
import { isDone } from '../core/progress.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const toc = document.getElementById('toc');
toc.innerHTML = CHAPTERS.map((ch) => {
  const list = PROBLEMS.filter((p) => p.ch === ch.n);
  const planned = PLANNED[ch.n];
  const done = list.filter((p) => isDone(p.id)).length;
  let meta;
  if (list.length) {
    meta = `Bài ${list[0].id}–${list.at(-1).id} trong file bài tập (chương ${ch.old} cũ). Đã làm xong ${done}/${list.length} bài.`;
  } else if (planned) {
    meta = `${planned} bài trong file bài tập (chương ${ch.old} cũ). Đang soạn, chưa có trên web.`;
  } else {
    meta = `${ch.note}. Sẽ có bài luyện tự soạn và mô phỏng khái niệm.`;
  }
  if (list.length && ch.note) meta = `${ch.note}. ${meta}`;
  return `
    <section class="toc-ch${list.length ? '' : ' empty'}" id="ch${ch.n}" aria-labelledby="h-ch${ch.n}">
      <div class="num" aria-hidden="true">${ch.n}</div>
      <div>
        <h2 id="h-ch${ch.n}">${esc(ch.title)}</h2>
        <p class="meta">${esc(meta)}</p>
      </div>
      ${list.length ? `<div class="chips">${list.map((p) => `
        <a class="chip${isDone(p.id) ? ' done' : ''}" href="bai.html?id=${p.id}" title="${esc(p.title)}">
          ${p.id}${p.star ? '<span class="star" aria-label="bài có dấu sao">*</span>' : ''}<span class="visually-hidden">: ${esc(p.title)}${isDone(p.id) ? ', đã làm xong' : ''}</span>
        </a>`).join('')}</div>` : ''}
    </section>`;
}).join('');
