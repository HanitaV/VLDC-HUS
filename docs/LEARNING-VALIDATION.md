# Kiểm tra giao diện và luồng học

Ngày 16/11/2026. `npm test`: 86/86 qua. Cú pháp ba module trang và `git diff --check` đều qua.

`tests/browser.html` chạy thực tế trên Edge headless: **30/30 luồng qua**. Bao gồm tìm kiếm/lọc chủ đề, chấm công thức và đáp số, tách tiến độ số liệu luyện tập khỏi đề gốc, mở đủ 31 bài tính toán và 11 chương với KaTeX hợp lệ, trả lời câu hỏi lý thuyết, ôn đúng chặng rồi trở lại bài xuất phát, đổi fragment và nút Back. Helper kiểm thử được sửa để chờ `hashchange` khi điều hướng trong cùng tài liệu và tải lại khi cần khởi tạo trang mới.

Đã xem ảnh chụp Edge headless: mục lục 390 px, lý thuyết chương 3 ở 1440 và 390 px, bài 3.1 ở 390 px. Không thấy phần nội dung chồng lấn trong những ảnh đã kiểm tra. Chưa kiểm tra trực quan mọi chương ở mọi độ rộng hoặc trên thiết bị thật.

## Bộ kiểm tra thiết kế

GATE: FAIL 27 (round 2 of 3). Không có waiver. Bộ kiểm tra được viết cho website giới thiệu sản phẩm; các yêu cầu màn hình cố định, visual quảng bá, hiệu ứng moment và tên lớp .wrap không phù hợp trực tiếp với mục lục học tập trong dự án. Kết quả này không được báo cáo là PASS. Những cảnh báo sau được giữ nguyên để có thể rà soát:

| Kiểm tra | Vị trí | Nhận xét của công cụ |
| --- | --- | --- |
| hero-fill | section#chuong "Chọn chương để học" | the next section shows on the first screen: it starts at 603px on a 900px screen (the hero ends at 603px) |
| flush | section#ch11 "11 Entropi và nguyên lý thứ hai của nhiệ" | its last line sits 0px above the lower edge of section#chuong, where the ground changes to section#tai-lieu |
| no-visual | main#main > section.home-intro "Vật lý đại cương, học đến đâu luyện đến " | no picture, effect or mock in this section; a feature section needs a visual |
| text-only | section#chuong "Chọn chương để học" | the section is only text: no picture, icon, mock or effect in it (2 sections like it at this width) |
| text-only | section#tai-lieu "Tài liệu và tiến độ học" | the closing section is only text: no picture, icon, mock or effect in it (2 sections like it at this width) |
| copy-headings | h3#h-ch4 "Công và năng lượng" | "Công và năng lượng" names no product, part, place or section (6 headings like it; at most one brand line per page) (and 5 more like it: "Trường hấp dẫn và chuyển", "Cơ sở của thuyết tương đ", "Nhiệt độ", "Tài liệu của giảng viên", ...) |
| moment-none | (the page) | a software page (--type) deals no moment: every kind carries one, two on a long page (moments.md) |
| hero-screen | main#main > section.home-intro "Cơ – Nhiệt · Lý thuyết logic gắn với bài" | the hero ends at 603px on a 900px screen, 297px above the fold: it ends at the fold, 1px either way (SR-1) |
| hero-screen | section#chuong "Chọn chương để họcLý thuyết: 0/35 bài · " | 297px of the next section shows on the first screen (from 603px on a 900px screen): nothing below the hero shows at load (SR-1) |
| section-height | section#chuong "Chọn chương để họcLý thuyết: 0/35 bài · " | the section is 2956px tall (3.3 screens), 1156px over two screens (1800px): every section after the hero is one screen or two, 2px either way (SR-2) |
| section-height | footer.site-foot "Nguồn đề: "Bài tập Cơ – Nhiệt" (bắt buộc" | the section is 64px tall (0.1 screens), 836px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2) |
| section-height | section#tai-lieu "Tài liệu và tiến độ học Tài liệu của giả" | the section is 351px tall (0.4 screens), 549px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2) |
| section-height | main#main > section.home-intro "Cơ – Nhiệt · Lý thuyết logic gắn với bài" | the section starts at 93px, 93px below the screen grid (0 x 900px): sections start on whole screens (and 1 more like it: "Tài liệu và tiến độ học ") (SR-2) |
| section-air | section#ch1 > details.chapter-topics "Xem 2 chủ đề và bài luyện theo kiến thức" | a top border across 92% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3) |
| section-air | section#ch2 > details.chapter-topics "Xem 3 chủ đề và bài luyện theo kiến thức" | a top border across 92% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3) |
| section-air | section#ch3 > details.chapter-topics "Xem 4 chủ đề và bài luyện theo kiến thức" | a top border across 92% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (and 8 more like it: "Xem 3 chủ đề và bài luyệ", "Xem 3 chủ đề và bài luyệ", "Xem 3 chủ đề và bài luyệ") (SR-3) |
| one-section | h2#catalog-title "Chọn chương để học" | the screen at scroll 93px (the top of section 1) shows 390px of section 2 and the heading of section 2 whole and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4) |
| one-section | h2#resources-title "Tài liệu và tiến độ học" | the screen at scroll 3201px (the top of section 3) shows 351px of section 3 and the heading of section 3 whole and the content of 2 sections, over 24px each beside section 2: a screen shows one section (another may peek 8px, 24px WARN) (SR-4) |
| one-section | section#ch1 "01 Mở đầu vật lý họcĐo lường, thứ nguyên" | a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (SR-4) |
| one-section | section#ch2 "02 Động học chất điểmVận tốc, gia tốc, c" | a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (SR-4) |
| one-section | section#ch3 "03 Động lực học chất điểmĐịnh luật Newto" | a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (and 8 more like it: "04 Công và năng lượngCôn", "05 Chuyển động của vật r", "06 Trường hấp dẫn và chu") (SR-4) |
| container-edges | header.site-head "Đến nội dung Tiệm Cận Vật lý Đại cương 1" | a <header> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6) |
| container-edges | footer.site-foot "Nguồn đề: "Bài tập Cơ – Nhiệt" (bắt buộc" | a <footer> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6) |
| container-edges | main#main > section.home-intro "Cơ – Nhiệt · Lý thuyết logic gắn với bài" | the section needs exactly one in-flow child .wrap (it has 2 in-flow children, 0 .wrap) (and 3 more like it: "Chọn chương để họcLý thu", "Tài liệu và tiến độ học ", "Nguồn đề: "Bài tập Cơ – ") (SR-6) |
| container-edges | section#ch1 > div:nth-of-type(2) > p.chapter-note "Đo lường, thứ nguyên và hệ đơn vị SI" | 22 text blocks start on a left line at x 179, 83px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "0/3 bài lý thuyết · Ôn tập lý th", "Vận tốc, gia tốc, chuyển động né", "0/3 bài lý thuyết · 0/7 bài tính") (SR-6) |
| container-edges | section#ch1 > div.num "01" | 11 text blocks start on a left line at x 115, 19px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "02", "03", "04") (SR-6) |
| container | page | no .wrap |

Giữ 16 WARN của bộ kiểm tra, gồm nhãn, độ dài câu, cỡ chữ phụ và cấu trúc landing page. Không dùng nội dung hay hình ảnh giả để đáp ứng tiêu chí quảng bá. Giao diện dùng hệ màu, font và thành phần sẵn có; không thêm ảnh, tên thương hiệu, số liệu thành tích hay phụ thuộc mới.

Chưa đo hiệu quả học tập thực tế hoặc thực hiện kiểm toán accessibility toàn diện.
