# Tiệm Cận – Vật lý Đại cương 1

Web tĩnh luyện bài tập Cơ – Nhiệt cho học phần **PHY1159** (Trường ĐH Khoa học Tự nhiên, ĐHQGHN). Mỗi bài đã nhập từ file "Bài tập Cơ – Nhiệt" (bắt buộc) được tách thành các bước có chấm, tùy nội dung bài:

1. Dự đoán hiện tượng (mô phỏng chỉ mở sau khi đã dự đoán)
2. Chọn hệ quy chiếu
3. Vẽ sơ đồ lực
4. Lập công thức chữ
5. Thay số

Bên dưới là lời giải mẫu, ẩn dần các bước cuối theo thứ tự bài trong cùng một dạng.

## Trạng thái

| Chương PHY1159 | Lý thuyết &amp; Bài tập | Trạng thái |
| --- | --- | --- |
| 1, 7, 8 | Lý thuyết logic + L1.1–L1.3, L7.1–L7.3, L8.1–L8.3 | Đầy đủ lý thuyết &amp; bài tập lý thuyết tương tác |
| 2. Động học chất điểm | Lý thuyết + L2.1–L2.3 + Bài 2.1–2.7 | Lý thuyết logic gắn kết trực tiếp với 7 bài tính toán &amp; mô phỏng |
| 3. Động lực học chất điểm | Lý thuyết + L3.1–L3.5 + Bài 3.1–3.14 | Lý thuyết logic gắn kết với 14 bài tính toán &amp; sơ đồ lực |
| 4. Công và năng lượng | Lý thuyết + L4.1–L4.3 + Bài 4.1–4.10 | Lý thuyết logic gắn kết với 10 bài tính toán |
| 5, 6, 9, 10, 11 | Lý thuyết + L5.1–L11.3 + Bài 5.1–11.9 (PDF) | Lý thuyết logic &amp; bài tập lý thuyết tương tác + liên kết từng bài trong PDF |

Mục lục dùng **11 chương của `docs/pdf_slides_from_teacher/De cuong Co-Nhiet.pdf`**. Toàn bộ 11 chương đều có trang lý thuyết theo mạch logic (`lythuyet.html?ch=N`) kèm 35 bài tập lý thuyết (`L1.1`–`L11.3`), kết hợp hai chiều với 31 bài tính toán (`2.1`–`4.10`), tìm kiếm không dấu, lọc theo tiến độ và xuất/nhập tiến độ bằng JSON. Liên kết tài liệu dùng đường dẫn tương đối, chạy được trong GitHub Pages đặt dưới tên repo.

Các quyết định đối chiếu tài liệu, quy ước vật lý và giới hạn kiểm tra được ghi trong [docs/RESEARCH.md](docs/RESEARCH.md).

Đính chính đã ghi trên web: Bài 3.8 (đáp số thời gian và công thức a_max in sai trong PDF).

## Chạy trên máy

Không cần cài đặt hay build. Từ thư mục dự án:

```bash
python3 -m http.server 8000   # rồi mở http://localhost:8000
npm test                      # chạy kiểm thử (cần Node 20 trở lên)
```

Phải mở qua server cục bộ, không mở trực tiếp file `index.html`, vì trang dùng ES module.

## Đăng lên GitHub Pages

1. Tạo repo mới trên GitHub, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Vào **Settings → Pages**, mục **Build and deployment → Source**, chọn **GitHub Actions**.
3. Mỗi lần đẩy lên `main`, workflow `.github/workflows/pages.yml` chạy kiểm thử; nếu qua thì đăng web. Địa chỉ có dạng `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

## Cấu trúc

```
index.html, bai.html, lythuyet.html   mục lục 11 chương, trang luyện bài tính toán, trang lý thuyết & bài tập logic
css/style.css                       giao diện
js/core/expr.js                     bộ phân tích biểu thức an toàn (không dùng eval), xuất LaTeX
js/core/grader.js                   chấm công thức, chấm đáp số sai số 1%, chấm sắp xếp suy luận
js/core/progress.js                 lưu tiến độ bài tính toán và bài lý thuyết trong localStorage
js/data/ch2.js–ch4.js               đề, số liệu, đáp án, hàm mô hình, lời giải mẫu của từng bài
js/data/theory/                     mạch suy luận 11 chương (mech.js, thermo.js) và 35 bài tập lý thuyết
js/data/problemLogic.js             cầu nối lý thuyết theo logic cho 31 bài tính toán
js/data/sources.js                  11 chương và đường dẫn tài liệu gốc
js/data/forces.js                   danh mục loại lực và bộ chấm sơ đồ lực
js/sims/                            mô phỏng, vẽ thẳng từ nghiệm giải tích của hàm mô hình
js/ui/                              công cụ sơ đồ lực, thành phần trắc nghiệm/công thức/sắp xếp, hình vẽ, KaTeX
vendor/                             KaTeX và font, đóng gói sẵn để không phụ thuộc CDN
tests/                              kiểm thử: mô hình = công thức = số PDF, và mạch logic 11 chương
```

## Thêm một bài mới

Mỗi bài là một object trong `js/data/chN.js`. Trường quan trọng:

- `given`: số liệu đề (góc ghi đơn vị `'°'`, web tự đổi sang radian khi tính).
- `targets[].expr`: công thức đáp án theo cú pháp của `expr.js`; `pdf`: con số in trong PDF nếu có.
- `model(values)`: **một** hàm tính mọi đáp số. Mô phỏng, bộ chấm và kiểm thử đều dùng hàm này.
- `vars`: miền giá trị để thử công thức; `vary`: miền giá trị cho nút "Đổi số liệu".
- `predict`, `frame`: câu trắc nghiệm, đúng một phương án `ok: true`.
- `fbd.bodies[].expected`: các lực đúng, góc tính bằng độ từ phương ngang bên phải, ngược chiều kim đồng hồ.
- `solution`, `group`, `fade`: lời giải mẫu và vị trí trong dạng bài (0 = lời giải đầy đủ).

Sau khi thêm, chạy `npm test`. Kiểm thử sẽ báo nếu hàm mô hình lệch công thức hoặc lệch đáp số PDF quá 1%.

## Nguồn và giấy phép

- Đề bài: "Bài tập Cơ – Nhiệt" (bắt buộc) và đề cương trong `docs/pdf_slides_from_teacher/`. Bài 2–3 được chép theo tài liệu; bài 4.1–4.10 được diễn đạt lại, bổ sung mô tả hình bằng chữ và ghi rõ giả thiết để tự luyện. Số liệu tự chọn được đánh dấu trên trang bài.
- [KaTeX](https://katex.org) – giấy phép MIT (`vendor/katex/LICENSE`).
- Font Be Vietnam Pro và Noto Serif – SIL Open Font License 1.1 (`vendor/fonts/`).
- Mã nguồn của dự án: MIT.
