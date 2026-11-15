// Tổng hợp lý thuyết theo logic và bài tập lý thuyết cho cả 11 chương PHY1159.
import { MECH_CHAPTERS } from './mech.js';
import { THERMO_CHAPTERS } from './thermo.js';
import { THEORY_EXERCISES } from './exercises.js';

export const THEORY_CHAPTERS = [...MECH_CHAPTERS, ...THERMO_CHAPTERS].sort((a, b) => a.ch - b.ch);
export { THEORY_EXERCISES };

export const theoryChapter = (ch) => THEORY_CHAPTERS.find((c) => c.ch === Number(ch));
export const theoryExById = (id) => THEORY_EXERCISES.find((e) => e.id === id);
export const theoryForChapter = (ch) => THEORY_EXERCISES.filter((e) => e.ch === Number(ch));

/** Tra cứu nhanh một chặng lý thuyết theo mã (ví dụ 'T3.4'). */
export function findStage(stageId) {
  for (const ch of THEORY_CHAPTERS) {
    const stage = ch.stages.find((s) => s.id === stageId);
    if (stage) return { ch: ch.ch, stage };
  }
  return null;
}
