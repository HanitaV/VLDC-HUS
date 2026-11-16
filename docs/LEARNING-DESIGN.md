# Tổ chức lại mạch học lý thuyết và bài tập

Ngày rà soát: 16/11/2026. Phạm vi: website tự học PHY1159, 11 chương, 33 chặng lý thuyết, 35 câu luyện bản chất và 31 bài tính toán đã nhập.

## Vấn đề trong bản hiện tại

Nội dung đã có khung dự đoán → giải thích → ví dụ mẫu → tự luyện → vận dụng, nhưng liên kết giữa các phần chưa được trình bày đủ rõ để người học biết mình nên làm gì tiếp theo.

- Mục lục bài tính toán và lộ trình lý thuyết lấy dữ liệu từ các danh sách riêng. Tên hoặc mã bài ngắn chưa cho thấy bài dùng kiến thức nào.
- Đường từ bài học sang bài tập lấy `stage.problems`; đường ngược lại lấy `problem.logic.theoryRef`. Hai danh sách chưa luôn khớp. Bài 3.11 được liệt kê ở T3.4 nhưng giải thích chính dựa vào T3.1. Vì vậy, quay lại lý thuyết Newton rồi tìm bài này có thể không thấy nó.
- Khối tự luyện ở chặng chưa có câu riêng vẫn hiện tiêu đề nhưng rỗng; số thứ tự cố định có thể nhảy bước khi thiếu ví dụ. Người học khó phân biệt một phần chưa có nội dung với một phần cần hoàn thành.
- Các liên kết dạng chip chỉ hiện số bài, khiến người học phải mở từng bài mới biết chủ đề. Phần lý thuyết và bài luyện thiếu câu chuyển tiếp giải thích nhiệm vụ học.
- T3.3 có liên kết ghi “Slide 3.3 – Tên lửa” nhưng được dựng bằng đường dẫn tập bài tập. Nhãn tài liệu và tài liệu đích không khớp.

Đây là nhận xét từ dữ liệu và mã giao diện trong repo; chưa có khảo sát sinh viên hoặc dữ liệu hành vi học để đo mức độ ảnh hưởng.

## Cơ sở nghiên cứu

Hướng dẫn [Organizing Instruction and Study to Improve Student Learning của What Works Clearinghouse, IES](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) khuyến nghị xen kẽ lời giải mẫu và bài tự giải, gắn biểu diễn trừu tượng với ví dụ cụ thể, dùng câu hỏi ôn tập để gọi lại kiến thức và yêu cầu người học giải thích lập luận. Hướng dẫn phân biệt mức bằng chứng: xen kẽ ví dụ/bài tập và nối biểu diễn có mức vừa; ôn tập bằng câu hỏi và câu hỏi giải thích có mức mạnh; câu hỏi mở đầu có mức tối thiểu.

Cách bố trí cụ thể dưới đây là suy luận thiết kế cho website này từ các khuyến nghị trên. Nguồn không chứng minh rằng giao diện theo chặng hoặc số bước đề xuất sẽ tự làm tăng kết quả học tập.

## Mạch học đề xuất

Mỗi chặng cần trả lời ba câu: “đang học ý nào?”, “luyện bằng bài nào?”, “sau bài này đi đâu?”. Trình tự giữ những nội dung đã có:

1. **Câu hỏi mở đầu:** đưa ra một quyết định vật lý trước khi đọc giải thích. Cho phép bỏ qua để người ôn tập đi thẳng tới nội dung; trả lời câu mở đầu không được tính là đã hiểu chặng.
2. **Giải thích:** nối hiện tượng, định luật, điều kiện áp dụng và cách dùng vào bài. Giữ cảnh báo ngộ nhận sát định luật liên quan.
3. **Ví dụ mẫu nếu có:** nêu tên bài, nguyên lý được chọn và các bước giải. Tách rõ việc xem mẫu với việc tự làm bài đó.
4. **Kiểm tra bản chất nếu có:** đặt câu lý thuyết ngay trong chặng của nó, phản hồi tại nơi trả lời. Hoàn thành câu này chỉ có nghĩa là đã qua câu luyện bản chất.
5. **Vận dụng nếu có:** hiện tên bài tính toán và mối liên hệ với chặng; chỉ rõ bài tương tác hay tài liệu PDF. Khi sang bài tính toán, cho đường về đúng chặng và câu ôn bản chất tương ứng.

Chặng thiếu một loại hoạt động không nên tạo một khối trống hoặc ngụ ý rằng người học đã hoàn thành hoạt động đó. Không khóa việc đọc lý thuyết bằng điều kiện phải trả lời đúng.

## Ánh xạ dữ liệu dùng chung

`js/data/learningPath.js` tổng hợp từ dữ liệu hiện có, không tạo thêm quan hệ chủ đề bằng cách đoán từ tiêu đề:

- `chapterPath(ch)` giữ nguyên thứ tự chặng của chương.
- `stagePractice(stageId)` trả về chương, chặng, câu bản chất, bài tính toán và tài liệu.
- `problemContext(problemOrId)` lấy chặng chính từ `logic.theoryRef`, kèm bài trước/sau trong chặng đó.
- Bài thuộc chặng là hợp của `stage.problems` và quan hệ ngược `logic.theoryRef`, bỏ trùng và giữ thứ tự khai báo trước. Với 3.11, cả hai quan hệ có sẵn được giữ; chặng chính khi quay lại vẫn là T3.1. Đây không phải quyết định rằng hai chặng là kiến thức tương đương.
- Liên kết có nhãn Slide dùng bài giảng chương. Không giữ `#page=2` cho T3.3 vì chưa xác minh đó là trang slide; các bài tập PDF vẫn dùng trang đã khai báo.

Kiểm thử `tests/learningPath.test.mjs` kiểm tra đủ chương, mọi câu bản chất nằm đúng chặng, 31 bài có đường ngược, thứ tự bài kế tiếp, liên kết tài liệu và mã không tồn tại. Bộ chấm, công thức, mã bài và dữ liệu tiến độ cũ không cần đổi để cải thiện cách tổ chức này.

## Khoảng trống nội dung cần phân biệt

Năm chặng chưa có câu luyện bản chất riêng: T4.1, T5.1, T6.1, T10.2 và T11.1. Một số chặng chỉ có bài PDF; T6.3 và T10.2 chưa có bài vận dụng tính toán được gắn riêng. Không tự lấy câu của chặng bên cạnh để lấp chỗ trống, vì có thể đánh giá sai mục tiêu kiến thức.

Các chương 5, 6, 9, 10, 11 vẫn có 34 bài trong PDF chưa có bộ chấm tương tác. Cải thiện đường dẫn không thay thế việc nhập đề, lời giải và kiểm chứng vật lý cho những bài đó.

Trong đợt này, ưu tiên nối rõ những tài nguyên đã kiểm chứng và trình bày trung thực phần hiện có. Bổ sung câu luyện mới cần xác định mục tiêu đo được, điều kiện vật lý, đáp án và phản hồi sai cụ thể trước khi nhập.

## Kiểm tra hiệu quả sau khi dùng

Kiểm tra giao diện và đường dẫn có thể xác nhận luồng hoạt động, nhưng chưa đo được việc học. Với sinh viên thực, có thể cho ba nhiệm vụ: tìm bài áp dụng một định luật, từ bài đang bí quay về đúng kiến thức, và chọn bài tiếp theo sau khi hoàn thành. Ghi lại số lần mở nhầm, thời gian tìm và khả năng giải thích lý do chọn định luật; dùng bài kiểm tra trước/sau riêng nếu cần đánh giá kết quả học.

Chưa có số liệu thực nghiệm cho bản sửa này; không báo cáo tăng tốc độ học hay tăng điểm số.
