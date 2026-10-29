// Mỗi bài: hàm mô hình phải khớp (1) công thức đáp án và (2) con số in trong PDF.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROBLEMS } from '../js/data/index.js';
import { givenValues, scopeOf, deg } from '../js/data/util.js';
import { calc } from '../js/core/expr.js';
import { checkFormula } from '../js/core/grader.js';
import { FORCES } from '../js/data/forces.js';

const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-12);

test('có đủ 21 bài Chương 2–3, id không trùng', () => {
  assert.equal(PROBLEMS.length, 21);
  assert.equal(new Set(PROBLEMS.map((p) => p.id)).size, 21);
});

for (const p of PROBLEMS) {
  test(`Bài ${p.id}: mô hình khớp công thức và đáp số PDF`, () => {
    const values = givenValues(p);
    const out = p.model(values);
    const scope = scopeOf(p, values);
    for (const tg of p.targets) {
      const m = out[tg.key];
      assert.ok(Number.isFinite(m), `${tg.key} của mô hình không phải số`);
      if (tg.expr) {
        let e = calc(tg.expr, scope);
        if (tg.angleOut) e = deg(e);
        assert.ok(rel(m, e) < 1e-9, `${tg.key}: mô hình ${m} ≠ công thức ${e}`);
        // công thức đáp án phải tự khớp chính nó qua bộ chấm
        const r = checkFormula(tg.expr, tg.expr, p.vars);
        assert.ok(r.ok, `${tg.key}: bộ chấm không công nhận chính đáp án (${r.message})`);
      }
      if (typeof tg.pdf === 'number') {
        const tol = tg.pdfTol ?? 0.01;
        assert.ok(rel(m, tg.pdf) <= tol, `${tg.key}: mô hình ${m} lệch đáp số PDF ${tg.pdf} quá ${tol * 100}%`);
      }
    }
  });

  test(`Bài ${p.id}: dữ liệu đầy đủ`, () => {
    assert.ok(p.statement.length > 20);
    assert.ok(p.solution?.length >= 2, 'thiếu lời giải mẫu');
    for (const g of p.given) assert.ok(g.key && g.label, 'số liệu thiếu key/label');
    for (const opt of [p.predict, p.frame].filter(Boolean)) {
      assert.equal(opt.options.filter((o) => o.ok).length, 1, 'câu trắc nghiệm phải có đúng một đáp án đúng');
    }
    for (const b of p.fbd?.bodies ?? []) {
      for (const e of b.expected) {
        assert.ok(FORCES[e.type], `loại lực ${e.type} không có trong danh mục`);
        assert.ok(b.palette.includes(e.type), `lực ${e.type} của ${b.id} không có trên bảng chọn`);
      }
    }
  });
}

test('Bài 3.8: đáp số thời gian in trong PDF ("1 phút 41s") là sai, đúng là ≈ 1,43 s', () => {
  const p = PROBLEMS.find((x) => x.id === '3.8');
  const { t } = p.model(givenValues(p));
  assert.ok(Math.abs(t - 1.433) < 0.001);
  assert.ok(Math.abs(t - 101) > 90);
  assert.ok(p.errata);
});

test('Bài 3.1: mô hình xử lý cả trường hợp đứng yên và trượt xuống', () => {
  const p = PROBLEMS.find((x) => x.id === '3.1');
  assert.equal(p.model({ m1: 3, m2: 2, alpha: 30, mu: 0.1 }).state, 'len-doc');
  assert.equal(p.model({ m1: 3, m2: 1.5, alpha: 30, mu: 0.1 }).state, 'dung-yen');
  const down = p.model({ m1: 4, m2: 1, alpha: 40, mu: 0.1 });
  assert.equal(down.state, 'xuong-doc');
  assert.ok(down.a < 0);
});
