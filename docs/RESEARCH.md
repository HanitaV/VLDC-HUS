# Đối chiếu tài liệu và hoàn thiện website

Ngày thực hiện: 15/11/2026.

Website là công cụ tự học Cơ – Nhiệt. Áp dụng `ponytail` cho phạm vi sửa code; `design-taste-frontend` cho độ rõ, cạnh nội dung, tương tác và kiểm tra trên trình duyệt; `teaching-resource-generator` và `learning-assessor` cho cấu trúc bài, phản hồi và đối chiếu lời giải.

## Kết quả đọc tài liệu

- `De cuong Co-Nhiet.pdf`: 2 trang, 11 chương. Tài liệu này không cung cấp cơ sở cho ánh xạ 9 chương mà phiên bản trước dùng. Mục lục mới giữ nguyên số chương của PDF; mã bài 2.1–3.14 không đổi để bảo toàn liên kết và tiến độ.
- `Bai tap Co - Nhiet (Bat buoc).pdf`: 13 trang, 65 bài thuộc các chương 2, 3, 4, 5, 6, 9, 10, 11. Các chương 1, 7, 8 không có bài trong tập này.
- `B-i t-p m-n C- Nhi-t.docx.pdf`: tập bài bổ sung 15 trang, được liên kết riêng, không trộn mã với tập bắt buộc.
- `B-i t-p ch--ng 3- chia nh- c-u h-i.docx.pdf`: 1 trang tách câu hỏi của bài nêm chuyển động; đây không phải bản đính chính. Website giữ phần giải thích sai số 3.8 đã có.
- Có slide chương 1, 2, 3, 4, 5, 8, 9, 10, 11; chưa có slide chương 6, 7. Các đường dẫn đều trỏ đến file sẵn có, không dùng tài liệu bên ngoài thay thế.

## Những phần đã triển khai

- Mục lục 11 chương, 31 bài luyện ở chương 2–4; hiển thị rõ các chương chỉ có tài liệu PDF.
- Mở bài giảng, đề cương và trang bài tập gốc từ mục lục và trang bài luyện. Workflow Pages đóng gói cả thư mục PDF.
- Tìm kiếm số bài, tên chương, chủ đề có hoặc không dấu; lọc bài đã xong, chưa xong, chương có bài luyện; tiếp tục bài đã bắt đầu.
- Sao lưu JSON, khôi phục có kiểm tra cấu trúc; nhập file lỗi không ghi đè dữ liệu; nhập bản cũ không làm mất bước đã đạt.
- Khi localStorage bị chặn hoặc đầy, vẫn giữ tiến độ trong bộ nhớ của phiên để có thể tải bản sao. Dữ liệu trong bộ nhớ này mất khi tải lại trang.
- Khi sửa một ô đáp án đã đúng, ô đó phải được kiểm tra lại trước khi cùng các ô khác hoàn thành bước. Luyện với bộ số mới không đánh dấu hoàn thành đáp số đề gốc.
- Bộ chấm đáp số từ chối vô cực và NaN; trước đây `1/0` hoặc `10^999` có thể bị nhận là đúng do phép so sai số với vô cực.
- Skip link, focus bàn phím, nhãn trường nhập, vùng thông báo, tương tác giảm chuyển động, các nút tối thiểu 44 px và bố cục hẹp.

## Quy ước cho bài 4.1–4.10

Đề được diễn đạt lại, mô tả hình bằng chữ để bài tự đủ dữ kiện. Giá trị bổ sung để luyện thay số có thông báo riêng; lời giải trình bày theo ký hiệu nên vẫn dùng được khi đổi số.

- 4.2: `l` là hình chiếu ngang AC, `s` là tổng khoảng ngang AB, không phải chiều dài dốc. Chiều dương CB hướng từ C đến B nên gia tốc âm.
- 4.3: bỏ qua quay; va chạm với mặt đất đảo dấu vận tốc thẳng đứng và giữ thành phần ngang. Kết quả `7H/8` khớp đáp số tài liệu.
- 4.5: số liệu 30 cm của đề được đổi sang 0,3 m; tỉ số khối lượng `n=2` là số tự chọn.
- 4.6: vật trượt, không lăn. Công thức mất tiếp xúc dùng miền `R < H' < 2,5R`; không áp dụng cho mọi độ cao thả.
- 4.8: chỉ bảo toàn động lượng ngang trong va chạm mềm; bảo toàn cơ năng ở giai đoạn con lắc đi lên. Trường nhập yêu cầu **phần trăm**, đáp án nhân 100.
- 4.9: vận tốc đá so với đất, theo quy ước ngầm của đáp số PDF. Nếu hiểu vận tốc so với người thì công thức khác; quy ước đã được nói rõ trong đề luyện.
- 4.10: bộ chấm dùng gần đúng `m << M` theo đáp số PDF. Lời giải cũng ghi nghiệm có `M+m` để phân biệt với gần đúng.

## Kiểm chứng và phạm vi

Kiểm thử Node kiểm tra mã bài không trùng, số chương, tồn tại mọi PDF, dữ liệu trắc nghiệm/sơ đồ lực, mô hình so với biểu thức đáp án và số PDF khi có; thêm kiểm tra độc lập về năng lượng ở 4.1, va chạm–con lắc ở 4.8 và đáp số 4.9. Kiểm thử tiến độ bao gồm file lỗi, cấu trúc sai, gộp dữ liệu và bộ nhớ bị chặn.

Giao diện giữ kiểu công cụ học tập, nội dung có chiều cao tự nhiên. Không áp dụng yêu cầu trang quảng bá như mỗi chương chiếm nguyên màn hình, shader hoặc hiệu ứng cuộn. Các kiểm tra gate dành cho landing page có thể báo những tiêu chí này; kết quả thực tế được báo trong phản hồi bàn giao.

Chưa có bộ chấm cho 34 bài còn lại của tập bắt buộc; các bài đó được truy cập bằng PDF. Chưa bổ sung mô phỏng mới ngoài hai mô phỏng hiện có. Chưa triển khai hoặc kiểm tra trên tên miền GitHub Pages thực tế.

## Kết quả gate giao diện

- `npm test`: 78/78 kiểm thử qua.
- `tests/browser.html`: 12/12 luồng qua, gồm mở cả 31 trang bài và kiểm tra không có lỗi công thức KaTeX, tìm kiếm, lọc tiến độ, sửa đáp án, đáp số vô cực, luyện số mới và đường dẫn sai.
- `copy-lint.mjs index.html --kind software`: 0 FAIL, 0 WARN.
- Đã chụp và xem trang chủ ở 1440, 1024, 820, 768, 390 px; xem trang 4.8 ở 390 px. Gate cũng đi ở 320 px: không tràn ngang hoặc chồng nội dung; còn WARN kích thước vùng bấm logo và phần danh sách hướng dẫn nằm qua nếp gấp màn hình.
- Các kiểm tra đường dẫn, độ tương phản, thứ tự heading và focus của gate qua. Chưa chạy toàn bộ phần tương tác của `consistency` (hover, form, vòng lặp, các bài kiểm tra cuộn); gate dùng chế độ quick.
- `perf.mjs`, trung vị 3 lần mỗi kích thước: tổng tải 177,3 KiB, không request lỗi, không long task. LCP 160 ms ở 1440 và 212 ms ở 390; CLS 0,067 và 0. Đây là phép đo local trên CPU, không phải số đo người dùng thực tế.
- Perf còn **FAIL về số file font** ở cả hai kích thước: 9 file (139,6 KiB) do các weight/subset font local hiện có. Tổng dung lượng font vẫn trong ngưỡng của skill; chưa tối ưu lại bộ font.

GATE: OPEN 24 (rounds used up)

Không có waiver. Giữ hệ giao diện ứng dụng học tập: font Be Vietnam Pro và Noto Serif đóng gói local, màu xanh, nền sáng/tối theo hệ điều hành. Không có ảnh thay thế, giá, thông tin liên hệ hay tên miền giả định. Giọng văn hướng dẫn học, nêu rõ dữ kiện và quy ước; không thêm hiệu ứng cuộn cho mục lục bài tập.

Các FAIL còn mở, giữ nguyên từ báo cáo của skill:

- hero-fill / section#chuong "Chọn chương để học" / the next section shows on the first screen: it starts at 589px on a 900px screen (the hero ends at 589px)
- no-visual / main#main > section.home-intro "Luyện bài tập Cơ – Nhiệt từng bước." / no picture, effect or mock in this section; a feature section needs a visual
- no-visual / section#chuong "Chọn chương để học" / no picture, effect or mock in this section; a feature section needs a visual
- text-only / section#tai-lieu "Tài liệu và tiến độ học" / the closing section is only text: no picture, icon, mock or effect in it
- card-visual / div#toc "01 Mở đầu vật lý học Đo lường, thứ nguyê" / 11 cards hold only text: no picture, icon, UI fragment or effect in any of them
- button-styles / (the page) / 3 button styles on the page: soft, fill #7aaaf0, outline #7aaaf0 x1 ("Bắt đầu luyện bài"); soft, fill #171e2b, outline #2b3546 x7 ("3.3 * : Con lắc nón"); soft, outline #7aaaf0 x1 ("Tải tiến độ")
- copy-headings / h3#h-ch1 "Mở đầu vật lý học" / "Mở đầu vật lý học" names no product, part, place or section (11 headings like it; at most one brand line per page) (and 10 more like it: "Động học chất điểm", "Động lực học chất điểm", "Công và năng lượng", "Chuyển động của vật rắn", ...)
- moment-none / (the page) / a software page (--type) deals no moment: every kind carries one, two on a long page (moments.md)
- hero-screen / main#main > section.home-intro "Cơ – Nhiệt · Học và luyện theo tài liệu " / the hero ends at 589px on a 900px screen, 311px above the fold: it ends at the fold, 1px either way (SR-1)
- hero-screen / section#chuong "Chọn chương để họcĐã hoàn thành 0/31 bài" / 311px of the next section shows on the first screen (from 589px on a 900px screen): nothing below the hero shows at load (SR-1)
- section-height / footer.site-foot "Nguồn đề: "Bài tập Cơ – Nhiệt" (bắt buộc" / the section is 64px tall (0.1 screens), 836px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- section-height / section#chuong "Chọn chương để họcĐã hoàn thành 0/31 bài" / the section is 2355px tall (2.6 screens), 555px over two screens (1800px): every section after the hero is one screen or two, 2px either way (SR-2)
- section-height / section#tai-lieu "Tài liệu và tiến độ học Tài liệu của giả" / the section is 351px tall (0.4 screens), 549px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- one-section / h2#catalog-title "Chọn chương để học" / the screen at scroll 93px (the top of section 1) shows 404px of section 2 and the heading of section 2 whole and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- one-section / h2#resources-title "Tài liệu và tiến độ học" / the screen at scroll 2586px (the top of section 3) shows 351px of section 3 and the heading of section 3 whole and the content of 2 sections, over 24px each beside section 2: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- one-section / section#ch2 "02 Động học chất điểmVận tốc, gia tốc, c" / a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (SR-4)
- one-section / section#ch3 "03 Động lực học chất điểmĐịnh luật Newto" / a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (SR-4)
- one-section / section#ch4 "04 Công và năng lượngCông, cơ năng và va" / a band: a box 100% of the section wide on a ground of its own that holds only text: the section's own ground is the band (SR-4)
- container-edges / header.site-head "Đến nội dung Tiệm Cận Vật lý Đại cương 1" / a <header> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- container-edges / footer.site-foot "Nguồn đề: "Bài tập Cơ – Nhiệt" (bắt buộc" / a <footer> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- container-edges / main#main > section.home-intro "Cơ – Nhiệt · Học và luyện theo tài liệu " / the section needs exactly one in-flow child .wrap (it has 2 in-flow children, 0 .wrap) (and 3 more like it: "Chọn chương để họcĐã hoà", "Tài liệu và tiến độ học ", "Nguồn đề: "Bài tập Cơ – ") (SR-6)
- container-edges / section#ch1 > div:nth-of-type(2) > p.chapter-note "Đo lường, thứ nguyên và hệ đơn vị SI" / 22 text blocks start on a left line at x 179, 83px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "Chưa có bài luyện tương tác", "Vận tốc, gia tốc, chuyển động né", "0/7 bài đã hoàn thành") (SR-6)
- container-edges / section#ch1 > div.num "01" / 11 text blocks start on a left line at x 115, 19px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "02", "03", "04") (SR-6)
- container / page / no .wrap
