// Lưu tiến độ trong trình duyệt. Web tĩnh không có máy chủ, nên mọi thứ nằm ở localStorage.
const KEY = 'tiemcan-vldc1-progress-v1';
const STEPS = new Set(['logic', 'predict', 'frame', 'fbd', 'formula', 'number', 'theory']);
const ID_RE = /^(?:L\d+|\d+)\.\d+$/;
let memory = {};
let storageBlocked = false;

function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('File tiến độ không đúng định dạng');
  const clean = {};
  for (const [id, progress] of Object.entries(data)) {
    if (!ID_RE.test(id) || !progress || typeof progress !== 'object' || Array.isArray(progress)) throw new Error('Dữ liệu bài tập không hợp lệ');
    const entry = {};
    for (const [step, value] of Object.entries(progress)) {
      if (STEPS.has(step) && typeof value === 'boolean') entry[step] = value;
      else if (step === 'updated' && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) entry.updated = value;
      else throw new Error('Dữ liệu bước làm bài không hợp lệ');
    }
    clean[id] = entry;
  }
  return clean;
}

function readAll() {
  if (storageBlocked) return memory;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? validate(JSON.parse(raw)) : memory;
  } catch {
    return memory;
  }
}

function writeAll(data) {
  memory = data;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    storageBlocked = true;
    /* chế độ riêng tư hoặc bộ nhớ bị chặn: bỏ qua, trang vẫn chạy */
  }
}

export function getProgress(id) {
  return readAll()[id] || {};
}

/** Ghi một bước đã làm: step là 'logic' | 'predict' | 'frame' | 'fbd' | 'formula' | 'number' | 'theory'. */
export function markStep(id, step, ok) {
  if (!ID_RE.test(id) || !STEPS.has(step)) throw new Error('Bài hoặc bước làm không hợp lệ');
  const all = readAll();
  const p = all[id] || {};
  const prev = p[step];
  // giữ trạng thái "đúng" một khi đã đạt
  p[step] = prev === true ? true : !!ok;
  p.updated = new Date().toISOString().slice(0, 10);
  all[id] = p;
  writeAll(all);
}

/** Bài tính toán được coi là xong khi phần đáp số đã đúng. */
export function isDone(id) {
  return getProgress(id).number === true;
}

/** Bài tập lý thuyết được coi là xong khi đã trả lời đúng phần lý thuyết. */
export function isTheoryDone(id) {
  return getProgress(id).theory === true;
}

export function exportProgress() {
  return JSON.stringify(readAll(), null, 2);
}

export function importProgress(json) {
  const data = validate(JSON.parse(json));
  const all = readAll();
  for (const [id, incoming] of Object.entries(data)) {
    const previous = all[id] || {};
    const merged = { ...previous, ...incoming };
    for (const step of STEPS) if (previous[step] === true) merged[step] = true;
    if (previous.updated > (incoming.updated || '')) merged.updated = previous.updated;
    all[id] = merged;
  }
  writeAll(all);
}
