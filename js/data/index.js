// Danh mục chương PHY1159 và toàn bộ bài tập đã nhập.
import ch2 from './ch2.js';
import ch3 from './ch3.js';

/** 9 chương của đề cương PHY1159, ánh xạ sang chương trong file bài tập (đề cương cũ). */
export const CHAPTERS = [
  { n: 1, title: 'Động học chất điểm', old: '2', note: '' },
  { n: 2, title: 'Động lực học chất điểm', old: '3', note: '' },
  { n: 3, title: 'Công và năng lượng', old: '4', note: '' },
  { n: 4, title: 'Chuyển động của vật rắn', old: '5', note: '' },
  { n: 5, title: 'Trường hấp dẫn', old: '6', note: 'Tự học' },
  { n: 6, title: 'Nguyên lý số không và nguyên lý I nhiệt động lực học', old: '9', note: '' },
  { n: 7, title: 'Thuyết động học chất khí', old: '10', note: '' },
  { n: 8, title: 'Các hiện tượng động học của chất khí', old: '', note: 'Chưa có bài tập trong file' },
  { n: 9, title: 'Entropi và nguyên lý II nhiệt động lực học', old: '11', note: '' },
];

/** Số bài trong file bài tập theo chương cũ, để hiển thị phần chưa nhập. */
export const PLANNED = { 1: 7, 2: 14, 3: 10, 4: 8, 5: 4, 6: 6, 7: 7, 8: 0, 9: 9 };

export const PROBLEMS = [...ch2, ...ch3];

export const byId = (id) => PROBLEMS.find((p) => p.id === id);

/** Các bài cùng dạng, theo thứ tự rút dần lời giải mẫu. */
export function groupOf(problem) {
  return PROBLEMS.filter((p) => p.group === problem.group).sort((a, b) => a.fade - b.fade);
}

export const GROUP_NAMES = {
  'do-thi': 'Đọc đồ thị vận tốc',
  'bien-doi-deu': 'Chuyển động biến đổi đều',
  nem: 'Chuyển động ném',
  'cong-van-toc': 'Cộng vận tốc',
  'rong-roc': 'Hệ vật nối dây qua ròng rọc',
  'nghieng-ma-sat': 'Mặt phẳng nghiêng có ma sát',
  tron: 'Chuyển động tròn',
  'phi-quan-tinh': 'Hệ quy chiếu phi quán tính',
};
