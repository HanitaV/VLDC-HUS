// Mỗi bài: hàm mô hình phải khớp (1) công thức đáp án và (2) con số in trong PDF.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROBLEMS, CHAPTERS, SOURCES, PLANNED, THEORY_CHAPTERS, THEORY_EXERCISES, findStage, theoryForChapter } from '../js/data/index.js';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import { givenValues, scopeOf, deg } from '../js/data/util.js';
import { calc } from '../js/core/expr.js';
import { checkFormula } from '../js/core/grader.js';
import { FORCES } from '../js/data/forces.js';

const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-12);

test('có đủ 31 bài Chương 2–4, id và số chương khớp tài liệu', () => {
  assert.equal(PROBLEMS.length, 31);
  assert.equal(new Set(PROBLEMS.map((p) => p.id)).size, 31);
  for (const p of PROBLEMS) assert.equal(p.ch, Number(p.id.split('.')[0]));
  for (const n of [2, 3, 4]) assert.equal(PROBLEMS.filter((p) => p.ch === n).length, PLANNED[n]);
});

test('đề cương đủ 11 chương và mọi đường dẫn PDF đều tồn tại', () => {
  assert.deepEqual(CHAPTERS.map((c) => c.n), Array.from({ length: 11 }, (_, i) => i + 1));
  for (const path of [...Object.values(SOURCES), ...CHAPTERS.map((c) => c.slide).filter(Boolean)]) assert.ok(existsSync(path), path);
});

test('Chương 4: nghiệm số độc lập và bảo toàn năng lượng', () => {
  const first = PROBLEMS.find((p) => p.id === '4.1');
  const v = givenValues(first);
  const { S, A } = first.model(v);
  assert.ok(Math.abs(v.m * 9.8 * S * Math.sin(Math.PI / 6) - A - v.m * v.v0 ** 2 / 2) < 1e-9);
  const collision = PROBLEMS.find((p) => p.id === '4.8');
  const c = givenValues(collision);
  const out = collision.model(c);
  const speedAfter = c.m * out.v / (c.M + c.m);
  assert.ok(Math.abs(speedAfter ** 2 / (2 * 9.8) - c.l * (1 - Math.cos(Math.PI / 6))) < 1e-12);
  assert.ok(Math.abs(PROBLEMS.find((p) => p.id === '4.9').model({ M: 70, m: 3, v: 8, mu: 0.02 }).S - 0.2998750521) < 1e-9);
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

test('Lý thuyết 11 chương, 35 bài tập lý thuyết và cầu nối 31 bài tính toán hợp lệ', () => {
  const mod = { exports: {} };
  vm.runInNewContext(readFileSync('vendor/katex/katex.min.js', 'utf8'), { module: mod, exports: mod.exports });
  const katex = mod.exports;
  const checkKatex = (val, path) => {
    if (typeof val === 'string') {
      assert.equal(/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(val), false, `${path} chứa ký tự điều khiển`);
      for (const part of val.split(/(\$[^$]+\$)/g)) {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          assert.doesNotThrow(() => katex.renderToString(part.slice(1, -1), { throwOnError: true, strict: false }), `${path}: ${part}`);
        }
      }
    } else if (Array.isArray(val)) val.forEach((x, i) => checkKatex(x, `${path}[${i}]`));
    else if (val && typeof val === 'object') Object.entries(val).forEach(([k, v]) => checkKatex(v, `${path}.${k}`));
  };

  assert.deepEqual(THEORY_CHAPTERS.map((c) => c.ch), Array.from({ length: 11 }, (_, i) => i + 1));
  const problemIds = new Set(PROBLEMS.map((p) => p.id));
  for (const ch of THEORY_CHAPTERS) {
    assert.ok(ch.summary.length > 20, `chương ${ch.ch} thiếu summary`);
    assert.ok(ch.stages.length >= 2, `chương ${ch.ch} cần >= 2 chặng`);
    checkKatex(ch, `THEORY_CHAPTERS[${ch.ch}]`);
    for (const st of ch.stages) {
      for (const k of ['id', 'title', 'origin', 'law', 'trap', 'consequence']) assert.ok(st[k], `${st.id} thiếu ${k}`);
      for (const pid of st.problems ?? []) {
        assert.ok(problemIds.has(pid), `${st.id} liên kết sai bài ${pid}`);
        assert.equal(Number(pid.split('.')[0]), ch.ch, `${st.id} liên kết chéo chương ${pid}`);
      }
      for (const ref of st.pdfRefs ?? []) assert.ok(Number.isInteger(ref.page) && ref.page >= 1, `${st.id} thiếu trang PDF`);
    }
    assert.ok(theoryForChapter(ch.ch).length >= 3, `chương ${ch.ch} thiếu bài tập lý thuyết`);
  }

  assert.equal(THEORY_EXERCISES.length, 35);
  assert.equal(new Set(THEORY_EXERCISES.map((e) => e.id)).size, 35);
  const altForms = {
    'L1.3:A': 'M*L*L/(T*T)',
    'L1.3:p': 'M/L/T^2',
    'L2.3:L': '2*v0^2*sin(alpha)*cos(alpha)/g',
    'L8.3:T': '5*(Tf - 32)/9 + 273',
    'L9.3:Q': 'm*lambda + m*c*dT',
    'L10.3:A': 'n*R*T*(ln(V2) - ln(V1))',
    'L11.3:eta': '(T1 - T2)/T1',
  };
  for (const ex of THEORY_EXERCISES) {
    assert.match(ex.id, /^L\d+\.\d+$/);
    const st = findStage(ex.stage);
    assert.ok(st && st.ch === ex.ch, `${ex.id} trỏ sai chặng ${ex.stage}`);
    checkKatex(ex, ex.id);
    if (ex.kind === 'choice') assert.equal(ex.options.filter((o) => o.ok).length, 1, `${ex.id} phải có đúng 1 đáp án đúng`);
    if (ex.kind === 'order') assert.ok(ex.steps.length >= 3, `${ex.id} cần >= 3 bước`);
    if (ex.kind === 'formula') {
      for (const tg of ex.targets) {
        assert.ok(checkFormula(tg.expr, tg.expr, ex.vars).ok, `${ex.id}:${tg.key} không tự khớp`);
        const alt = altForms[`${ex.id}:${tg.key}`];
        if (alt) assert.ok(checkFormula(alt, tg.expr, ex.vars).ok, `${ex.id}:${tg.key} không nhận dạng tương đương ${alt}`);
      }
    }
  }

  for (const p of PROBLEMS) {
    assert.ok(p.logic, `Bài ${p.id} thiếu logic`);
    checkKatex(p.logic, `PROBLEM_LOGIC[${p.id}]`);
    const st = findStage(p.logic.theoryRef);
    assert.ok(st && st.ch === p.ch, `Bài ${p.id} trỏ sai theoryRef ${p.logic.theoryRef}`);
    assert.ok(p.logic.principle && p.logic.condition && p.logic.steps.length === 3, `Bài ${p.id} thiếu nội dung logic`);
    if (p.logic.check) assert.equal(p.logic.check.options.filter((o) => o.ok).length, 1, `Bài ${p.id} check phải có 1 đáp án đúng`);
  }
});
