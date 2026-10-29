// Hiển thị công thức bằng KaTeX (nạp từ CDN). Nếu KaTeX không tải được, hiện nguyên văn.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function tex(src, display = false) {
  const k = globalThis.katex;
  if (!k) return `<code>${esc(src)}</code>`;
  return k.renderToString(src, { throwOnError: false, displayMode: display, strict: false });
}

/** Chuỗi có đoạn $...$ → HTML: văn bản được escape, công thức qua KaTeX. */
export function rich(src) {
  const parts = String(src).split(/(\$[^$]+\$)/g);
  return parts.map((p) => (p.startsWith('$') && p.endsWith('$') && p.length > 2 ? tex(p.slice(1, -1)) : esc(p))).join('');
}

export { esc };
