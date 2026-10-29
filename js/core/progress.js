// Lưu tiến độ trong trình duyệt. Web tĩnh không có máy chủ, nên mọi thứ nằm ở localStorage.
const KEY = 'tiemcan-vldc1-progress-v1';

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* chế độ riêng tư hoặc bộ nhớ bị chặn: bỏ qua, trang vẫn chạy */
  }
}

export function getProgress(id) {
  return readAll()[id] || {};
}

/** Ghi một bước đã làm: step là 'predict' | 'frame' | 'fbd' | 'formula' | 'number'. */
export function markStep(id, step, ok) {
  const all = readAll();
  const p = all[id] || {};
  const prev = p[step];
  // giữ trạng thái "đúng" một khi đã đạt
  p[step] = prev === true ? true : !!ok;
  p.updated = new Date().toISOString().slice(0, 10);
  all[id] = p;
  writeAll(all);
}

/** Bài được coi là xong khi phần đáp số đã đúng. */
export function isDone(id) {
  return getProgress(id).number === true;
}

export function exportProgress() {
  return JSON.stringify(readAll(), null, 2);
}

export function importProgress(json) {
  const data = JSON.parse(json);
  if (typeof data !== 'object' || data === null || Array.isArray(data)) throw new Error('File tiến độ không đúng định dạng');
  writeAll({ ...readAll(), ...data });
}
