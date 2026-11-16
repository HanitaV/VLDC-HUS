import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS, PROBLEMS, THEORY_EXERCISES, THEORY_CHAPTERS, byId } from '../js/data/index.js';
import { chapterPath, stagePractice, problemContext } from '../js/data/learningPath.js';

test('lộ trình giữ thứ tự đủ 11 chương và mọi bài lý thuyết đúng chặng', () => {
  for (const chapter of CHAPTERS) {
    const path = chapterPath(String(chapter.n));
    assert.deepEqual(path.map(({ stage }) => stage.id), THEORY_CHAPTERS.find((c) => c.ch === chapter.n).stages.map((s) => s.id));
    assert.deepEqual(path.flatMap(({ exercises }) => exercises).map((ex) => ex.id).sort(), THEORY_EXERCISES.filter((ex) => ex.ch === chapter.n).map((ex) => ex.id).sort());
    for (const section of path) {
      assert.equal(section.chapter.n, chapter.n);
      assert.ok(section.exercises.every((ex) => ex.stage === section.stage.id));
      assert.ok(section.problems.every((p) => p.ch === chapter.n));
      assert.equal(new Set(section.problems.map((p) => p.id)).size, section.problems.length);
    }
  }
});

test('31 bài tính toán có đường về chặng và bài luyện bản chất tương ứng', () => {
  for (const problem of PROBLEMS) {
    const context = problemContext(problem.id);
    assert.ok(context, problem.id);
    assert.equal(context.stage.id, problem.logic.theoryRef);
    assert.ok(context.problems.some((entry) => entry.id === problem.id));
    assert.deepEqual(problemContext(problem), context);
    assert.ok(context.exercises.every((ex) => ex.stage === problem.logic.theoryRef));
  }
  assert.ok(stagePractice('T3.1').problems.some((p) => p.id === '3.11'));
  assert.ok(stagePractice('T3.4').problems.some((p) => p.id === '3.11'));
});

test('bài tiếp nối giữ cùng chặng, dừng ở cuối và không quay lại chính bài đang làm', () => {
  assert.equal(problemContext('2.1').previous, null);
  assert.equal(problemContext('2.1').next.id, '2.2');
  assert.equal(problemContext('2.3').next, null);
  for (const p of PROBLEMS) {
    const { previous, next, problems } = problemContext(p);
    const index = problems.indexOf(byId(p.id));
    assert.equal(previous, index > 0 ? problems[index - 1] : null);
    assert.equal(next, problems[index + 1] || null);
  }
});

test('tài liệu phân biệt bài giảng với tập bài tập và giữ trang PDF đã có', () => {
  assert.equal(stagePractice('T3.3').pdfRefs[0].href, encodeURI(CHAPTERS.find((c) => c.n === 3).slide));
  assert.ok(stagePractice('T5.1').pdfRefs[0].href.endsWith('#page=7'));
  assert.deepEqual(stagePractice('T1.1').pdfRefs, []);
});

test('mã chương, chặng và bài không tồn tại không tạo đường dẫn giả', () => {
  assert.deepEqual(chapterPath(99), []);
  assert.equal(stagePractice('T99.1'), null);
  assert.equal(stagePractice(), null);
  assert.equal(problemContext('99.1'), null);
  assert.equal(problemContext(null), null);
});
