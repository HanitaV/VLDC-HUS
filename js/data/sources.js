// Danh mục đối chiếu trực tiếp với đề cương và các PDF trong repo.
const base = 'docs/pdf_slides_from_teacher/';
export const SOURCES = {
  outline: `${base}De cuong Co-Nhiet.pdf`,
  exercises: `${base}Bai tap Co - Nhiet (Bat buoc).pdf`,
  extra: `${base}B-i t-p m-n C- Nhi-t.docx.pdf`,
  correction: `${base}B-i t-p ch--ng 3- chia nh- c-u h-i.docx.pdf`,
};
export const CHAPTERS = [
  { n: 1, title: 'Mở đầu vật lý học', note: 'Đo lường, thứ nguyên và hệ đơn vị SI', slide: 'Ch--ng 1-M- --u V-t l- h-c(1).pdf' },
  { n: 2, title: 'Động học chất điểm', note: 'Vận tốc, gia tốc, chuyển động ném và chuyển động tròn', slide: 'Ch--ng 2---ng h-c ch-t -i-m.pdf', page: 1 },
  { n: 3, title: 'Động lực học chất điểm', note: 'Định luật Newton, động lượng và hệ quy chiếu', slide: 'Ch--ng 3---ng l-c h-c ch-t -i-m.pdf', page: 2 },
  { n: 4, title: 'Công và năng lượng', note: 'Công, cơ năng và va chạm', slide: 'Ch--ng 4-C-ng v- N-ng l--ng.pdf', page: 4 },
  { n: 5, title: 'Chuyển động của vật rắn', note: 'Khối tâm, mômen quán tính và chuyển động quay', slide: 'Ch--ng 5-Chuy-n --ng c-a v-t r-n.pdf', page: 6 },
  { n: 6, title: 'Trường hấp dẫn và chuyển động trong trường xuyên tâm', note: 'Hấp dẫn, các định luật Kepler và vận tốc vũ trụ', page: 8 },
  { n: 7, title: 'Cơ sở của thuyết tương đối hẹp', note: 'Phép biến đổi Lorentz, không gian, thời gian và năng lượng' },
  { n: 8, title: 'Nhiệt độ', note: 'Nguyên lý số không, nhiệt giai và sự nở vì nhiệt', slide: 'Ch--ng 8- Nhi-t --.pdf' },
  { n: 9, title: 'Nhiệt và nguyên lý thứ nhất của nhiệt động lực học', note: 'Nhiệt, công, nội năng và truyền nhiệt', slide: 'Ch--ng 9- Nhi-t v- nguy-n l- th- nh-t c-a nhi-t --ng l-c.pdf', page: 9 },
  { n: 10, title: 'Thuyết động học chất khí', note: 'Khí lý tưởng, phân bố phân tử và nhiệt dung', slide: 'Ch--ng 10-Thuy-t --ng h-c ch-t kh- (2).pdf', page: 10 },
  { n: 11, title: 'Entropi và nguyên lý thứ hai của nhiệt động lực học', note: 'Động cơ nhiệt, chu trình Carnot và entropi', slide: 'Ch--ng 11- Entropi v- nguy-n l- th- hai c-a nhi-t --ng l-c h-c.pdf', page: 11 },
].map((ch) => ({ ...ch, slide: ch.slide ? base + ch.slide : null }));
