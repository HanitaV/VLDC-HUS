import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { getProgress, markStep, isDone, isTheoryDone, exportProgress, importProgress } from '../js/core/progress.js';

let saved;
beforeEach(() => {
  saved = new Map();
  globalThis.localStorage = { getItem: (key) => saved.get(key) ?? '{}', setItem: (key, value) => saved.set(key, value) };
});
test('ghi tiến độ, giữ bước đúng và xuất nhập được', () => {
  markStep('2.1', 'number', true);
  const backup = exportProgress();
  markStep('2.1', 'number', false);
  assert.ok(isDone('2.1'));
  importProgress('{"2.1":{"number":false},"4.1":{"formula":true}}');
  assert.ok(isDone('2.1'));
  assert.ok(getProgress('4.1').formula);
  saved.clear();
  importProgress(backup);
  assert.ok(isDone('2.1'));
});
test('file hỏng hoặc cấu trúc sai không ghi đè dữ liệu', () => {
  markStep('2.1', 'number', true);
  const previous = exportProgress();
  for (const bad of ['null', '[]', 'true', '{', '{"2.1":null}', '{"2.1":{"number":"true"}}', '{"__proto__":{"number":true}}', '{"2.1":{"updated":{}}}']) {
    assert.throws(() => importProgress(bad));
    assert.equal(exportProgress(), previous);
  }
});
test('localStorage chứa giá trị sai không làm trang lỗi', () => {
  globalThis.localStorage.getItem = () => 'null';
  assert.doesNotThrow(() => getProgress('2.1'));
  globalThis.localStorage.getItem = () => '[]';
  assert.doesNotThrow(() => markStep('3.1', 'predict', false));
});
test('bộ nhớ bị chặn: vẫn làm bài và xuất tiến độ trong phiên', () => {
  globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  markStep('4.2', 'number', true);
  assert.ok(isDone('4.2'));
  assert.ok(JSON.parse(exportProgress())['4.2'].number);
});

test('bộ nhớ đầy sau lần lưu trước: bản sao giữ kết quả mới', async () => {
  const progress = await import('../js/core/progress.js?quota-test');
  globalThis.localStorage = { getItem: () => '{"2.1":{"number":true}}', setItem() { throw new Error('quota'); } };
  progress.markStep('4.3', 'number', true);
  assert.ok(progress.isDone('4.3'));
  assert.ok(progress.isDone('2.1'));
});

test('lưu tiến độ bài tập lý thuyết L*.N và bước logic độc lập với bài tính toán', () => {
  markStep('L1.1', 'theory', true);
  markStep('L1.1', 'theory', false);
  assert.equal(isTheoryDone('L1.1'), true);
  assert.equal(isDone('L1.1'), false);
  markStep('2.2', 'logic', true);
  assert.equal(getProgress('2.2').logic, true);
  assert.equal(isDone('2.2'), false);
  assert.throws(() => importProgress('{"L1.1":{"theory":"true"}}'));
});
