// Một ánh xạ dùng chung cho mục lục, bài học và đường quay lại từ bài luyện.
import { CHAPTERS, PROBLEMS, byId } from './index.js';
import { THEORY_CHAPTERS, THEORY_EXERCISES, findStage } from './theory/index.js';
import { SOURCES } from './sources.js';

export function stagePractice(stageId) {
  const found = findStage(stageId);
  if (!found) return null;
  const { stage } = found;
  const chapter = CHAPTERS.find((ch) => ch.n === found.ch);
  const ids = [...new Set([
    ...(stage.problems || []),
    ...PROBLEMS.filter((p) => p.logic?.theoryRef === stageId).map((p) => p.id),
  ])];
  return {
    chapter,
    stage,
    exercises: THEORY_EXERCISES.filter((ex) => ex.stage === stageId),
    problems: ids.map(byId).filter(Boolean),
    pdfRefs: (stage.pdfRefs || []).map((ref) => ({
      ...ref,
      // Nhãn Slide chỉ đến bài giảng; page của bản cũ chưa xác minh là trang slide.
      href: /^Slide\b/.test(ref.label) && chapter.slide
        ? encodeURI(chapter.slide)
        : `${encodeURI(SOURCES.exercises)}#page=${ref.page}`,
    })),
  };
}

export function chapterPath(ch) {
  const chapter = THEORY_CHAPTERS.find((entry) => entry.ch === Number(ch));
  return chapter ? chapter.stages.map((stage) => stagePractice(stage.id)) : [];
}

export function problemContext(problemOrId) {
  const problem = typeof problemOrId === 'string' ? byId(problemOrId) : problemOrId;
  if (!problem) return null;
  const context = stagePractice(problem.logic?.theoryRef);
  if (!context) return null;
  const index = context.problems.findIndex((entry) => entry.id === problem.id);
  return {
    ...context,
    previous: index > 0 ? context.problems[index - 1] : null,
    next: index >= 0 ? context.problems[index + 1] || null : null,
  };
}
