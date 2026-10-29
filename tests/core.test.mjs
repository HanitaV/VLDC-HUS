import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calc, parse, ExprError } from '../js/core/expr.js';
import { checkFormula, checkNumber, parseNumber, fmt } from '../js/core/grader.js';
import { gradeBody } from '../js/data/forces.js';

test('bộ tính: thứ tự phép toán, nhân ngầm, hàm, chữ Hy Lạp', () => {
  assert.equal(calc('2+3*4'), 14);
  assert.equal(calc('-2^2'), -4);
  assert.equal(calc('2^3^2'), 512);
  assert.equal(calc('2g', { g: 10 }), 20);
  assert.equal(calc('g(m2 - m1)', { g: 10, m2: 3, m1: 1 }), 20);
  assert.ok(Math.abs(calc('sin(pi/6)') - 0.5) < 1e-12);
  assert.ok(Math.abs(calc('tg α', { alpha: Math.PI / 4 }) - 1) < 1e-12);
  assert.equal(calc('μ m₁ g', { mu: 0.5, m1: 2, g: 10 }), 10);
  assert.equal(calc('√4'), 2);
  assert.equal(calc('3·2'), 6);
});

test('bộ tính: báo lỗi dễ hiểu', () => {
  assert.throws(() => parse('(1+2'), ExprError);
  assert.throws(() => parse('1+'), ExprError);
  assert.throws(() => parse('1,5'), ExprError);
  assert.throws(() => calc('x+1'), ExprError);
});

test('chấm công thức: chấp nhận mọi dạng tương đương', () => {
  const ans = 'g*(m2 - m1*sin(alpha) - mu*m1*cos(alpha))/(m1 + m2)';
  const ranges = { m1: [1, 5], m2: [1, 5], alpha: [0.1, 1.4], mu: [0, 0.5], g: [9, 10] };
  assert.ok(checkFormula('(m2 g - m1 g sin α - μ m1 g cos α)/(m2 + m1)', ans, ranges).ok);
  assert.equal(checkFormula('-(m2 - m1 sin α - μ m1 cos α) g/(m1+m2)', ans, ranges).code, 'sign');
  assert.equal(checkFormula('2g(m2 - m1 sin α - μ m1 cos α)/(m1+m2)', ans, ranges).code, 'factor');
  assert.equal(checkFormula('g(m2 - m1 sin α)/(m1+m2)', ans, ranges).code, 'wrong');
  assert.equal(checkFormula('g(m2 - M)/(m1+m2)', ans, ranges).code, 'unknown-var');
  assert.equal(checkFormula('g(m2 -', ans, ranges).code, 'syntax');
});

test('chấm đáp số: dấu phẩy thập phân, sai số 1%, gợi ý đơn vị', () => {
  assert.equal(parseNumber('1,43'), 1.43);
  assert.equal(parseNumber('3 816'), 3816);
  assert.equal(parseNumber('1,2·10^3'), 1200);
  assert.ok(checkNumber('1,43', 1.4331).ok);
  assert.ok(checkNumber('1.44', 1.4331).ok);
  assert.ok(!checkNumber('1.5', 1.4331).ok);
  assert.equal(checkNumber('-18,7', 18.66).code, 'sign');
  assert.equal(checkNumber('1430', 1.4331).code, 'unit');
  assert.equal(checkNumber('abc', 1).code, 'syntax');
});

test('định dạng số kiểu Việt Nam', () => {
  assert.equal(fmt(1.4331), '1,43');
  assert.equal(fmt(18.66), '18,7');
  assert.equal(fmt(3816), '3816');
  assert.equal(fmt(0.0045918), '0,00459');
});

test('chấm sơ đồ lực', () => {
  const expected = [{ type: 'P', angle: 270 }, { type: 'N', angle: 120 }, { type: 'T', angle: 30 }];
  assert.ok(gradeBody([{ type: 'P', angle: 268 }, { type: 'N', angle: 125 }, { type: 'T', angle: 30 }], expected).ok);
  const r = gradeBody([{ type: 'P', angle: 270 }, { type: 'N', angle: 90 }, { type: 'Fdi', angle: 30 }], expected);
  assert.equal(r.ok, false);
  assert.deepEqual(r.issues.map((i) => i.kind).sort(), ['direction', 'extra', 'missing']);
  // hai lực cùng loại (hai nhánh dây)
  const two = [{ type: 'T', angle: 90 }, { type: 'T', angle: 90 }, { type: 'P', angle: 270 }];
  assert.ok(gradeBody([{ type: 'T', angle: 92 }, { type: 'P', angle: 270 }, { type: 'T', angle: 88 }], two).ok);
  assert.equal(gradeBody([{ type: 'T', angle: 92 }, { type: 'P', angle: 270 }], two).ok, false);
});
