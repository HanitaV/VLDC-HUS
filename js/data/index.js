// Danh mục chương PHY1159 và toàn bộ bài tập đã nhập.
import ch2 from './ch2.js';
import ch3 from './ch3.js';
import ch4 from './ch4.js';
import { PROBLEM_LOGIC } from './problemLogic.js';
export { CHAPTERS, SOURCES } from './sources.js';
export { THEORY_CHAPTERS, THEORY_EXERCISES, theoryChapter, theoryExById, theoryForChapter, findStage } from './theory/index.js';

export const PLANNED = { 2: 7, 3: 14, 4: 10, 5: 8, 6: 4, 9: 6, 10: 7, 11: 9 };

export const PROBLEMS = [...ch2, ...ch3, ...ch4].map((p) => (
  PROBLEM_LOGIC[p.id] ? { ...p, logic: p.logic || PROBLEM_LOGIC[p.id] } : p
));

export const byId = (id) => PROBLEMS.find((p) => p.id === id);

/** Các bài cùng dạng, theo thứ tự rút dần lời giải mẫu. */
export function groupOf(problem) {
  return PROBLEMS.filter((p) => p.group === problem.group).sort((a, b) => a.fade - b.fade);
}

export const GROUP_NAMES = {
  'cong-ma-sat': 'Công và ma sát',
  'bao-toan-co-nang': 'Bảo toàn cơ năng',
  'va-cham': 'Động lượng và va chạm',
  'do-thi': 'Đọc đồ thị vận tốc',
  'bien-doi-deu': 'Chuyển động biến đổi đều',
  nem: 'Chuyển động ném',
  'cong-van-toc': 'Cộng vận tốc',
  'rong-roc': 'Hệ vật nối dây qua ròng rọc',
  'nghieng-ma-sat': 'Mặt phẳng nghiêng có ma sát',
  tron: 'Chuyển động tròn',
  'phi-quan-tinh': 'Hệ quy chiếu phi quán tính',
};
