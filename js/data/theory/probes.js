// Câu dự đoán mở đầu mỗi chặng (kiểu ConceptTest): người học chọn trước khi đọc lý thuyết.
// Mỗi câu nhắm một quan niệm sai phổ biến mà chặng đó sẽ giải quyết.
const t = String.raw;

export const PROBES = {
  'T1.1': {
    q: 'Một công thức rất đẹp và chứng minh toán học chặt chẽ nhưng thí nghiệm đo được lại lệch rõ rệt. Vật lý học xử lý thế nào?',
    options: [
      { text: 'Công thức phải được xem lại hoặc giới hạn phạm vi áp dụng, vì thí nghiệm là tiêu chuẩn kiểm chứng', ok: true, why: 'Đúng. Vật lý bắt đầu và kết thúc ở đo lường; mô hình chỉ đúng trong phạm vi đã kiểm chứng.' },
      { text: 'Giữ công thức vì toán học đã chứng minh, coi số đo là sai', ok: false, why: 'Toán học đúng chỉ bảo đảm suy luận chặt, chưa bảo đảm mô hình khớp tự nhiên.' },
    ],
  },
  'T1.2': {
    q: t`Một công thức cho kết quả có thứ nguyên đúng. Điều đó cho phép kết luận gì?`,
    options: [
      { text: 'Công thức không bị sai về thứ nguyên, nhưng hệ số số học vẫn có thể sai', ok: true, why: 'Đúng. Thứ nguyên là điều kiện cần, chưa phải điều kiện đủ.' },
      { text: 'Công thức chắc chắn đúng hoàn toàn', ok: false, why: t`Thứ nguyên không phát hiện được sai hệ số như $\tfrac12$ hay $2\pi$.` },
    ],
  },
  'T2.1': {
    q: 'Xe chạy một vòng sân vận động rồi về đúng điểm xuất phát. Độ lớn vận tốc trung bình của cả vòng là bao nhiêu?',
    options: [
      { text: 'Bằng 0, vì độ dịch chuyển bằng 0', ok: true, why: 'Đúng. Vận tốc trung bình lấy độ dịch chuyển (véc-tơ) chia cho thời gian, không lấy quãng đường.' },
      { text: 'Bằng quãng đường một vòng chia cho thời gian', ok: false, why: 'Đó là tốc độ trung bình, một đại lượng khác.' },
    ],
  },
  'T2.2': {
    q: 'Vật chuyển động tròn với tốc độ không đổi. Gia tốc của nó thế nào?',
    options: [
      { text: 'Khác 0 và hướng vào tâm, vì phương của vận tốc liên tục đổi', ok: true, why: 'Đúng. Gia tốc đo sự đổi của véc-tơ vận tốc, gồm cả đổi phương.' },
      { text: 'Bằng 0, vì tốc độ không đổi', ok: false, why: 'Tốc độ không đổi chỉ làm gia tốc tiếp tuyến bằng 0, còn gia tốc pháp tuyến vẫn tồn tại.' },
    ],
  },
  'T2.3': {
    q: 'Hai viên đá cùng được ném trong không khí, bỏ qua sức cản. Người ngồi trên viên đá thứ nhất nhìn thấy viên thứ hai chuyển động thế nào?',
    options: [
      { text: 'Thẳng đều, vì hai vật cùng gia tốc g nên hiệu gia tốc bằng 0', ok: true, why: 'Đúng. Trong hệ gắn với vật rơi tự do, vật rơi tự do khác chuyển động thẳng đều.' },
      { text: 'Rơi nhanh dần xuống dưới như trong hệ mặt đất', ok: false, why: 'Gia tốc tương đối bằng hiệu hai gia tốc, mà hiệu này bằng 0.' },
    ],
  },
  'T3.1': {
    q: 'Một quả bóng vừa rời tay bay lên. Ngoài trọng lực (bỏ qua sức cản), còn lực nào tác dụng lên bóng?',
    options: [
      { text: 'Không còn lực nào khác; bóng lên nhờ quán tính', ok: true, why: 'Đúng. Mỗi lực phải chỉ ra được vật gây lực. Sau khi rời tay không còn "lực ném".' },
      { text: 'Còn lực ném của tay theo chiều chuyển động', ok: false, why: 'Tay không còn tiếp xúc, nên không còn lực của tay lên bóng.' },
    ],
  },
  'T3.2': {
    q: 'Con lắc nón quay đều trong mặt phẳng ngang. Lực nào là "lực hướng tâm"?',
    options: [
      { text: 'Hợp lực của các lực thật (trọng lực, lực căng) theo phương hướng vào tâm', ok: true, why: 'Đúng. Lực hướng tâm là tên gọi của hợp lực theo phương hướng tâm, không phải một lực thứ ba.' },
      { text: 'Một lực riêng, cộng thêm vào trọng lực và lực căng', ok: false, why: 'Thêm vào sẽ đếm lực hai lần.' },
    ],
  },
  'T3.3': {
    q: 'Hai xe trượt trên băng không ma sát, một xe đẩy xe kia rồi tách ra. Đại lượng nào của cả hệ giữ nguyên?',
    options: [
      { text: 'Tổng động lượng', ok: true, why: 'Đúng. Hệ cô lập: ngoại lực theo phương ngang bằng 0 nên động lượng toàn phần bảo toàn.' },
      { text: 'Tổng động năng', ok: false, why: 'Lực đẩy sinh công nên động năng thay đổi.' },
    ],
  },
  'T3.4': {
    q: 'Bạn đứng trong thang máy đang đi lên và chậm dần. Số chỉ cân dưới chân so với khi thang đứng yên?',
    options: [
      { text: 'Nhỏ hơn, vì gia tốc hướng xuống', ok: true, why: 'Đúng. Chiều gia tốc quyết định số cân, không phải chiều chuyển động.' },
      { text: 'Lớn hơn, vì thang đang đi lên', ok: false, why: 'Đi lên chậm dần có gia tốc hướng xuống, nên phản lực sàn nhỏ hơn trọng lượng.' },
    ],
  },
  'T4.1': {
    q: 'Vật trượt lên dốc có ma sát rồi dừng lại. Muốn tìm quãng đường lên, cách nhanh nhất là gì?',
    options: [
      { text: 'Dùng định lý động năng: độ biến thiên động năng bằng tổng công của mọi lực', ok: true, why: 'Đúng. Không cần tính gia tốc và thời gian, chỉ cần công của trọng lực và ma sát.' },
      { text: 'Dùng bảo toàn cơ năng như khi không có ma sát', ok: false, why: 'Ma sát trượt sinh công âm nên cơ năng không bảo toàn.' },
    ],
  },
  'T4.2': {
    q: 'Một vật trượt không ma sát từ hai dốc có hình dạng khác nhau nhưng cùng độ cao. Tốc độ ở chân dốc?',
    options: [
      { text: 'Bằng nhau, vì chỉ phụ thuộc độ giảm thế năng', ok: true, why: 'Đúng. Phản lực không sinh công nên cơ năng bảo toàn, tốc độ chỉ phụ thuộc độ cao.' },
      { text: 'Dốc thoải hơn cho tốc độ lớn hơn', ok: false, why: 'Dốc thoải đi lâu hơn nhưng cuối cùng tốc độ vẫn như nhau.' },
    ],
  },
  'T4.3': {
    q: 'Đạn găm vào bao cát treo. Ngay sau va chạm, đại lượng nào bảo toàn?',
    options: [
      { text: 'Động lượng; cơ năng thì không vì một phần thành nhiệt và biến dạng', ok: true, why: 'Đúng. Va chạm mềm bảo toàn động lượng, còn bảo toàn cơ năng chỉ dùng sau va chạm.' },
      { text: 'Cơ năng, vì không có ma sát', ok: false, why: 'Quá trình găm vào làm mất cơ năng dù không có ma sát với mặt ngoài.' },
    ],
  },
  'T5.1': {
    q: 'Một người đi từ đầu này sang đầu kia của chiếc thuyền trên mặt nước lặng. Khối tâm của hệ người + thuyền?',
    options: [
      { text: 'Đứng yên, vì nội lực không làm đổi chuyển động khối tâm', ok: true, why: 'Đúng. Chỉ ngoại lực mới làm khối tâm có gia tốc, thuyền sẽ trôi ngược lại.' },
      { text: 'Dịch về phía người đi', ok: false, why: 'Lực người đẩy thuyền là nội lực của hệ.' },
    ],
  },
  'T5.2': {
    q: 'Ròng rọc có khối lượng quay khi kéo vật. Lực căng dây hai bên ròng rọc?',
    options: [
      { text: 'Khác nhau, vì hiệu hai lực tạo mômen làm ròng rọc quay nhanh dần', ok: true, why: 'Đúng. Với ròng rọc có momen quán tính, hiệu hai lực căng nhân bán kính bằng Iβ.' },
      { text: 'Luôn bằng nhau', ok: false, why: 'Chỉ bằng nhau khi ròng rọc nhẹ hoặc quay đều.' },
    ],
  },
  'T5.3': {
    q: 'Hai đĩa quay cùng trục, đĩa nhanh rơi lên đĩa chậm và cuối cùng quay chung. Đại lượng nào bảo toàn?',
    options: [
      { text: 'Mômen động lượng; động năng giảm vì ma sát toả nhiệt', ok: true, why: 'Đúng. Ma sát là nội lực nên không đổi mômen động lượng nhưng vẫn tiêu hao động năng.' },
      { text: 'Động năng quay', ok: false, why: 'Động năng bị mất một phần do công ma sát.' },
    ],
  },
  'T6.1': {
    q: 'Lực hấp dẫn của một quả cầu đồng chất lên chất điểm bên ngoài tính thế nào?',
    options: [
      { text: 'Như thể toàn bộ khối lượng tập trung ở tâm cầu', ok: true, why: 'Đúng. Đó là hệ quả của nguyên lý chồng chất cho vật đối xứng cầu.' },
      { text: 'Không tính được nếu không biết cấu trúc bên trong', ok: false, why: 'Với phân bố đối xứng cầu, chỉ cần tổng khối lượng và khoảng cách tới tâm.' },
    ],
  },
  'T6.2': {
    q: 'Hành tinh quay quanh Mặt Trời trên quỹ đạo ellipse. Hành tinh chuyển động nhanh nhất ở đâu?',
    options: [
      { text: 'Gần Mặt Trời nhất, vì mômen động lượng bảo toàn', ok: true, why: 'Đúng. Lực hấp dẫn xuyên tâm nên L = m r v sinθ không đổi, r nhỏ thì v lớn.' },
      { text: 'Xa Mặt Trời nhất, vì lực hút yếu nhất', ok: false, why: 'Lực yếu không có nghĩa là vận tốc lớn; mômen động lượng quyết định.' },
    ],
  },
  'T6.3': {
    q: 'Vận tốc thoát khỏi Trái Đất của một tàu 1 tấn so với tàu 10 tấn?',
    options: [
      { text: 'Như nhau, vì khối lượng m triệt tiêu trong phương trình cơ năng', ok: true, why: 'Đúng. Động năng và thế năng đều tỉ lệ m nên vận tốc thoát không phụ thuộc m.' },
      { text: 'Tàu nặng cần vận tốc lớn hơn', ok: false, why: 'Tàu nặng cần nhiều năng lượng hơn, nhưng vận tốc thoát thì không đổi.' },
    ],
  },
  'T7.1': {
    q: 'Một phi công bật đèn pha khi tàu chạy với tốc độ 0,5c. Người đứng yên đo tốc độ ánh sáng của đèn là?',
    options: [
      { text: 'c, không phải 1,5c', ok: true, why: 'Đúng. Tiên đề Einstein: tốc độ ánh sáng trong chân không như nhau trong mọi hệ quán tính.' },
      { text: '1,5c theo quy tắc cộng vận tốc', ok: false, why: 'Quy tắc cộng Galileo không còn đúng ở tốc độ gần c.' },
    ],
  },
  'T7.2': {
    q: 'Phi hành gia trên tàu đo một khoảng thời gian bằng đồng hồ của mình. Người trên mặt đất đo khoảng này thế nào?',
    options: [
      { text: 'Dài hơn; đồng hồ gắn với vật đo được thời gian riêng, ngắn nhất', ok: true, why: 'Đúng. Hai biến cố xảy ra cùng một chỗ trên tàu nên đồng hồ tàu đo thời gian riêng.' },
      { text: 'Ngắn hơn', ok: false, why: 'Thời gian đo ở hệ khác dãn ra theo hệ số gamma.' },
    ],
  },
  'T7.3': {
    q: 'Một hạt chuyển động với tốc độ 0,9c. Động năng của nó có tính bằng nửa m₀v² không?',
    options: [
      { text: 'Không; phải dùng K = (γ − 1)m₀c²', ok: true, why: 'Đúng. Công thức Newton chỉ là giới hạn khi v rất nhỏ so với c.' },
      { text: 'Có, công thức đó luôn đúng', ok: false, why: 'Ở 0,9c sai số rất lớn.' },
    ],
  },
  'T8.1': {
    q: 'Hai vật A và B cùng nhiệt độ. Khi cho tiếp xúc nhau chúng có trao đổi nhiệt ròng không?',
    options: [
      { text: 'Không, vì đã ở cân bằng nhiệt', ok: true, why: 'Đúng. Nhiệt độ là đại lượng quyết định chiều truyền nhiệt, không phải nhiệt dung hay nhiệt năng.' },
      { text: 'Có, vật nào có nhiệt năng lớn hơn sẽ truyền cho vật kia', ok: false, why: 'Chỉ chênh lệch nhiệt độ mới gây truyền nhiệt ròng.' },
    ],
  },
  'T8.2': {
    q: 'Nhiệt độ tăng thêm 20 °C thì trên thang Kelvin tăng thêm?',
    options: [
      { text: '20 K', ok: true, why: 'Đúng. Một độ chia của hai thang bằng nhau nên độ biến thiên giống nhau.' },
      { text: '293 K', ok: false, why: '293 K là giá trị nhiệt độ ứng với 20 °C, không phải độ biến thiên.' },
    ],
  },
  'T8.3': {
    q: 'Nung nóng tấm kim loại có khoét lỗ tròn ở giữa. Lỗ?',
    options: [
      { text: 'Nở to ra, như thể lỗ cũng là kim loại', ok: true, why: 'Đúng. Mọi khoảng cách giữa hai điểm trên vật đều tăng cùng hệ số.' },
      { text: 'Co nhỏ lại vì kim loại nở vào trong', ok: false, why: 'Kim loại nở theo mọi hướng, kéo giãn cả lỗ.' },
    ],
  },
  'T9.1': {
    q: 'Khí đi từ trạng thái 1 sang 2 theo hai đường khác nhau trên giản đồ pV. Đại lượng nào giống nhau ở hai đường?',
    options: [
      { text: 'Độ biến thiên nội năng', ok: true, why: 'Đúng. Nội năng là hàm trạng thái; công và nhiệt phụ thuộc đường đi.' },
      { text: 'Công do khí sinh ra', ok: false, why: 'Công bằng diện tích dưới đường nên khác nhau theo đường.' },
    ],
  },
  'T9.2': {
    q: 'Khí dãn nở đoạn nhiệt (không trao đổi nhiệt) và sinh công. Nhiệt độ khí?',
    options: [
      { text: 'Giảm, vì khí dùng chính nội năng để sinh công', ok: true, why: 'Đúng. Q = 0 nên ΔU = −A, A > 0 thì nội năng và nhiệt độ giảm.' },
      { text: 'Không đổi', ok: false, why: 'Đó là quá trình đẳng nhiệt, cần nhận nhiệt từ ngoài.' },
    ],
  },
  'T9.3': {
    q: 'Cấp nhiệt cho cục đá ở −10 °C. Khi nhiệt độ đạt 0 °C đá bắt đầu nóng chảy. Trong lúc nóng chảy, nhiệt độ?',
    options: [
      { text: 'Giữ 0 °C đến khi đá tan hết', ok: true, why: 'Đúng. Nhiệt cấp vào dùng cho chuyển pha (Q = mλ), không làm tăng nhiệt độ.' },
      { text: 'Tiếp tục tăng đều', ok: false, why: 'Chỉ tăng đều khi không có chuyển pha.' },
    ],
  },
  'T10.1': {
    q: 'Cùng nhiệt độ, khí hiđrô và khí ôxi có động năng tịnh tiến trung bình của một phân tử thế nào?',
    options: [
      { text: 'Bằng nhau, nhưng phân tử hiđrô chuyển động nhanh hơn', ok: true, why: 'Đúng. Động năng trung bình là 3kT/2, nên khí nhẹ có vận tốc lớn hơn.' },
      { text: 'Hiđrô có động năng lớn hơn vì nhanh hơn', ok: false, why: 'Nhanh hơn nhưng khối lượng nhỏ hơn, tích vẫn bằng nhau.' },
    ],
  },
  'T10.2': {
    q: 'Nội năng của khí lý tưởng thay đổi thế nào trong quá trình đẳng nhiệt?',
    options: [
      { text: 'Không đổi, vì nội năng chỉ phụ thuộc nhiệt độ', ok: true, why: 'Đúng. Khi T không đổi thì ΔU = 0 và nhiệt nhận vào đúng bằng công sinh ra.' },
      { text: 'Tăng khi thể tích tăng', ok: false, why: 'Khí lý tưởng không có thế năng tương tác nên U không phụ thuộc thể tích.' },
    ],
  },
  'T10.3': {
    q: 'Từ cùng trạng thái, khí dãn đến cùng thể tích theo đường đẳng nhiệt và đoạn nhiệt. Đường nào sinh nhiều công hơn?',
    options: [
      { text: 'Đẳng nhiệt, vì khí được nhận nhiệt bù vào nên áp suất giảm chậm hơn', ok: true, why: 'Đúng. Ở quá trình đoạn nhiệt khí tự mất nội năng nên áp suất giảm nhanh hơn.' },
      { text: 'Đoạn nhiệt', ok: false, why: 'Đường đoạn nhiệt dốc hơn nên diện tích dưới nó nhỏ hơn.' },
    ],
  },
  'T11.1': {
    q: 'Nguyên lý I cho phép nhiệt tự truyền từ vật lạnh sang vật nóng nếu năng lượng vẫn bảo toàn. Điều đó có xảy ra không?',
    options: [
      { text: 'Không tự xảy ra; Nguyên lý II quy định chiều của quá trình', ok: true, why: 'Đúng. Bảo toàn năng lượng chưa đủ để xác định quá trình nào có thể tự diễn ra.' },
      { text: 'Có, vì năng lượng vẫn bảo toàn', ok: false, why: 'Thực tế nhiệt chỉ tự truyền từ nóng sang lạnh.' },
    ],
  },
  'T11.2': {
    q: 'Có thể chế tạo động cơ nhiệt hiệu suất 100% nếu loại hết ma sát không?',
    options: [
      { text: 'Không; hiệu suất tối đa bị giới hạn bởi hai nguồn nhiệt (1 − T₂/T₁)', ok: true, why: 'Đúng. Giới hạn này là của Nguyên lý II, không phụ thuộc vật liệu hay ma sát.' },
      { text: 'Có, nếu không còn ma sát', ok: false, why: 'Cần nhả một phần nhiệt cho nguồn lạnh dù không có ma sát.' },
    ],
  },
  'T11.3': {
    q: 'Một hệ cô lập thực hiện quá trình tự phát. Entropy của hệ?',
    options: [
      { text: 'Không giảm; quá trình thuận nghịch giữ nguyên, bất thuận nghịch làm tăng', ok: true, why: 'Đúng. Entropy hệ cô lập luôn không giảm.' },
      { text: 'Có thể giảm nếu hệ tự sắp xếp trật tự hơn', ok: false, why: 'Hệ cô lập không tự giảm entropy.' },
    ],
  },
};
