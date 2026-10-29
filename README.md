# Tiệm Cận – Vật lý Đại cương 1

Web tĩnh luyện bài tập Cơ – Nhiệt cho học phần **PHY1159** (Trường ĐH Khoa học Tự nhiên, ĐHQGHN). Mỗi bài trong file "Bài tập Cơ – Nhiệt" (bắt buộc) được tách thành các bước có chấm:

1. Dự đoán hiện tượng (mô phỏng chỉ mở sau khi đã dự đoán)
2. Chọn hệ quy chiếu
3. Vẽ sơ đồ lực
4. Lập công thức chữ
5. Thay số

Bên dưới là lời giải mẫu, ẩn dần các bước cuối theo thứ tự bài trong cùng một dạng.

## Trạng thái

| Chương PHY1159 | Bài tập (số hiệu file gốc) | Trạng thái |
| --- | --- | --- |
| 1. Động học chất điểm | 2.1–2.7 | Đã có, mô phỏng diện tích cho 2.1 |
| 2. Động lực học chất điểm | 3.1–3.14 | Đã có, mô phỏng 3.1, sơ đồ lực cho 3.1–3.8 |
| 3–9 | 4.1–11.9 | Chưa nhập |

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
index.html, bai.html     hai trang duy nhất; bai.html?id=3.1 mở Bài 3.1
css/style.css            giao diện
js/core/expr.js          bộ phân tích biểu thức an toàn (không dùng eval), xuất LaTeX
js/core/grader.js        chấm công thức bằng thử số ngẫu nhiên; chấm đáp số sai số 1%
js/core/progress.js      lưu tiến độ trong localStorage
js/data/ch2.js, ch3.js   đề, số liệu, đáp án, hàm mô hình, lời giải mẫu của từng bài
js/data/forces.js        danh mục loại lực và bộ chấm sơ đồ lực
js/sims/                 mô phỏng, vẽ thẳng từ nghiệm giải tích của hàm mô hình
js/ui/                   công cụ sơ đồ lực, hình vẽ, hiển thị KaTeX
vendor/                  KaTeX và font, đóng gói sẵn để không phụ thuộc CDN
tests/                   kiểm thử: mô hình = công thức đáp án = số in trong PDF
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

- Đề bài: "Bài tập Cơ – Nhiệt" (bắt buộc) và đề cương học phần PHY1159, Khoa Vật lý, ĐHKHTN, ĐHQGHN. Đề được chép nguyên văn để học tập.
- [KaTeX](https://katex.org) – giấy phép MIT (`vendor/katex/LICENSE`).
- Font Be Vietnam Pro và Noto Serif – SIL Open Font License 1.1 (`vendor/fonts/`).
- Mã nguồn của dự án: MIT.
