// Bộ chấm: so công thức chữ bằng thử số ngẫu nhiên, so đáp số với sai số tương đối.
import { parse, evaluate, variables, ExprError } from './expr.js';

/** PRNG có hạt giống để kết quả chấm lặp lại được. */
export function rng(seed = 20261029) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const close = (x, y, rel) => {
  const scale = Math.max(Math.abs(x), Math.abs(y), 1e-12);
  return Math.abs(x - y) <= rel * scale;
};

/**
 * So biểu thức người học với đáp án.
 * @param {string} input biểu thức người học gõ
 * @param {string} answer biểu thức đáp án (cú pháp của expr.js)
 * @param {Object<string,[number,number]>} ranges miền giá trị hợp lệ của từng biến
 * @returns {{ok:boolean, code:string, message:string, factor?:number}}
 */
export function checkFormula(input, answer, ranges, { trials = 12, seed } = {}) {
  let user;
  try {
    user = parse(input);
  } catch (e) {
    if (e instanceof ExprError) return { ok: false, code: 'syntax', message: e.message };
    throw e;
  }
  const allowed = new Set(Object.keys(ranges));
  const unknown = [...variables(user)].filter((v) => !allowed.has(v));
  if (unknown.length) {
    return {
      ok: false, code: 'unknown-var',
      message: `Đề không cho sẵn ${unknown.map((u) => `"${u}"`).join(', ')}. Nếu đó là đại lượng trung gian bạn vừa tìm (như gia tốc a), hãy thay nó bằng biểu thức theo dữ kiện đề. Các ký hiệu dùng được: ${[...allowed].join(', ')}.`,
    };
  }
  const ans = parse(answer);
  const rand = rng(seed);
  const ratios = [];
  let compared = 0;
  for (let i = 0; i < trials * 3 && compared < trials; i++) {
    const scope = {};
    for (const [k, [lo, hi]] of Object.entries(ranges)) scope[k] = lo + (hi - lo) * rand();
    const a = evaluate(ans, scope);
    const u = evaluate(user, scope);
    if (!Number.isFinite(a) || Math.abs(a) < 1e-9) continue; // điểm suy biến: bỏ qua
    if (!Number.isFinite(u)) return { ok: false, code: 'domain', message: 'Biểu thức của bạn không xác định ở một số giá trị hợp lệ (chia cho 0 hoặc căn số âm).' };
    ratios.push(u / a);
    compared++;
  }
  if (compared === 0) return { ok: false, code: 'internal', message: 'Không thử được đáp án ở miền giá trị này.' };
  if (ratios.every((r) => close(r, 1, 1e-6))) return { ok: true, code: 'ok', message: 'Đúng. Biểu thức của bạn tương đương với đáp án.' };
  const k = ratios[0];
  if (ratios.every((r) => close(r, k, 1e-6))) {
    if (close(k, -1, 1e-6)) return { ok: false, code: 'sign', factor: k, message: 'Gần đúng: biểu thức ngược dấu với đáp án. Kiểm tra lại chiều dương bạn chọn.' };
    return { ok: false, code: 'factor', factor: k, message: `Đúng dạng nhưng lệch một hệ số không đổi (gấp ${fmt(k)} lần đáp án). Kiểm tra lại hệ số 2, 1/2 hoặc g.` };
  }
  return { ok: false, code: 'wrong', message: 'Chưa đúng. Biểu thức của bạn cho kết quả khác đáp án ở các bộ số thử.' };
}

/** Đọc số người học gõ: chấp nhận 1,43 / 1.43 / 1,2e3 / 2/3 / sqrt(2). */
export function parseNumber(input) {
  const raw = String(input).trim();
  if (!raw) throw new ExprError('Chưa nhập đáp số');
  // dấu phẩy thập phân kiểu Việt Nam; bỏ dấu cách ngăn nghìn
  let s = raw.replace(/\s+/g, '');
  s = s.replace(/(\d),(\d)/g, '$1.$2');
  s = s.replace(/[×·]10\^/g, 'e').replace(/\*10\^/g, 'e');
  const tree = parse(s);
  if (variables(tree).size) throw new ExprError('Đáp số chỉ gồm số, không chứa ký hiệu đại lượng');
  return evaluate(tree, {});
}

/**
 * So đáp số với giá trị đúng.
 * @param {string} input
 * @param {number} target
 * @param {number} rel sai số tương đối cho phép (mặc định 1%)
 */
export function checkNumber(input, target, rel = 0.01) {
  let x;
  try {
    x = parseNumber(input);
  } catch (e) {
    if (e instanceof ExprError) return { ok: false, code: 'syntax', message: e.message };
    throw e;
  }
  if (!Number.isFinite(x)) return { ok: false, code: 'domain', message: 'Đáp số phải là số hữu hạn. Kiểm tra phép chia cho 0, căn số âm hoặc số mũ quá lớn.' };
  if (close(x, target, rel)) return { ok: true, code: 'ok', value: x, message: 'Đúng.' };
  if (close(x, -target, rel)) return { ok: false, code: 'sign', value: x, message: 'Sai dấu. Độ lớn đúng nhưng dấu ngược lại.' };
  for (const p of [1e3, 1e-3, 1e2, 1e-2, 3.6, 1 / 3.6]) {
    if (close(x, target * p, rel)) return { ok: false, code: 'unit', value: x, message: 'Con số lệch đúng một hệ số đổi đơn vị. Kiểm tra lại đơn vị: g và kg, cm và m, km/h và m/s.' };
  }
  return { ok: false, code: 'wrong', value: x, message: 'Chưa đúng.' };
}

/** Định dạng số kiểu Việt Nam: dấu phẩy thập phân, 3 chữ số có nghĩa mặc định. */
export function fmt(x, sig = 3) {
  if (!Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  const abs = Math.abs(x);
  let s;
  if (abs >= 1e5 || abs < 1e-3) {
    const e = Math.floor(Math.log10(abs));
    const m = x / 10 ** e;
    s = `${trim(m.toFixed(sig - 1))}·10^${e}`;
  } else {
    const digits = Math.max(0, sig - 1 - Math.floor(Math.log10(abs)));
    s = trim(x.toFixed(digits));
  }
  return s.replace('.', ',');
}
function trim(s) {
  return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
}

/** Xáo trộn thứ tự các bước suy luận một cách lặp lại được và không trùng đáp án. */
export function shuffleOrder(n, seedKey = 'order') {
  const arr = Array.from({ length: n }, (_, i) => i);
  if (n < 2) return arr;
  let h = 2166136261;
  for (const ch of String(seedKey)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = rng(h >>> 0);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.every((v, i) => v === i)) [arr[0], arr[1]] = [arr[1], arr[0]];
  return arr;
}

/** Chấm thứ tự một chuỗi suy luận logic: trả về số bước đúng vị trí và vị trí lệch đầu tiên. */
export function gradeOrder(order, total) {
  if (!Array.isArray(order) || order.length !== total) {
    return { ok: false, rightCount: 0, matches: [], firstWrong: 0, message: 'Số bước chưa khớp.' };
  }
  const matches = order.map((idx, pos) => idx === pos);
  const rightCount = matches.filter(Boolean).length;
  if (rightCount === total) {
    return { ok: true, rightCount, matches, firstWrong: -1, message: 'Đúng. Mạch suy luận liền từ giả thiết đến kết luận.' };
  }
  const firstWrong = matches.indexOf(false);
  return {
    ok: false,
    rightCount,
    matches,
    firstWrong,
    message: `Lệch từ bước ${firstWrong + 1}/${total} (đúng ${rightCount}/${total} vị trí). Kiểm tra xem bước ${firstWrong + 1} đã kế thừa trực tiếp kết quả của bước ${firstWrong || 'đầu'} chưa.`,
  };
}
