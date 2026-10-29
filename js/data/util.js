// Tiện ích dùng chung cho dữ liệu bài tập.
export const G = 9.8; // m/s², đúng giá trị PDF dùng khi tính đáp số
export const rad = (deg) => (deg * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;

/** Bảng số liệu {key: value} từ mảng given của một bài. */
export function givenValues(problem, override = {}) {
  const out = {};
  for (const g of problem.given) out[g.key] = g.key in override ? override[g.key] : g.value;
  return out;
}

/** Scope cho bộ tính biểu thức: đổi góc sang radian, thêm g. */
export function scopeOf(problem, values) {
  const scope = { g: G };
  for (const g of problem.given) {
    const v = values[g.key];
    scope[g.key] = g.unit === '°' ? rad(v) : v;
  }
  return scope;
}
