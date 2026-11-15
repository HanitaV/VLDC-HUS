// Lý thuyết theo mạch logic cho Chương 7–11 (Tương đối hẹp & Nhiệt học PHY1159).
export const THERMO_CHAPTERS = [
  {
    ch: 7,
    summary: 'Tiên đề tốc độ ánh sáng c bất biến buộc phải thay phép biến đổi Galileo bằng Lorentz, khiến thời gian – không gian phụ thuộc hệ quy chiếu và gắn khối lượng nghỉ với năng lượng E₀ = m₀c².',
    stages: [
      {
        id: 'T7.1',
        title: 'Từ biến đổi Galileo đến hai tiên đề Einstein',
        origin: 'Các định luật Newton bất biến dưới biến đổi Galileo ($x\'=x-Vt,\\ t\'=t$), nhưng phương trình điện từ Maxwell cho tốc độ ánh sáng $c$ không đổi trong chân không, mâu thuẫn với công thức cộng vận tốc cổ điển.',
        law: 'Thuyết tương đối hẹp đặt trên hai tiên đề: (1) mọi định luật vật lý có cùng dạng trong mọi hệ quy chiếu quán tính; (2) tốc độ ánh sáng $c$ trong chân không như nhau theo mọi hướng và trong mọi hệ quy chiếu quán tính, không phụ thuộc chuyển động của nguồn hay người quan sát.',
        trap: 'Tiên đề II chỉ nói ánh sáng trong chân không có tốc độ $c$ bất biến, không phải mọi hạt đều có tốc độ bất biến; không tồn tại môi trường "ête" tuyệt đối để đo vận tốc tuyệt đối.',
        consequence: 'Để $c$ bất biến khi đổi hệ quy chiếu, cả không gian lẫn thời gian đều phải biến đổi trộn lẫn vào nhau qua phép biến đổi Lorentz.',
      },
      {
        id: 'T7.2',
        title: 'Biến đổi Lorentz, dãn thời gian và co độ dài',
        origin: 'Đòi hỏi tọa độ sáng $x^2 - c^2 t^2 = x\'^2 - c^2 t\'^2$ bất biến dẫn tới phép biến đổi Lorentz với hệ số $\\gamma = \\frac{1}{\\sqrt{1 - \\upsilon^2/c^2}} \\ge 1$.',
        law: 'Nếu hai biến cố xảy ra tại cùng một vị trí trong hệ gắn với vật (khoảng thời gian riêng $\\Delta t_0$), thì trong hệ quy chiếu khác đang chuyển động tương đối với tốc độ $\\upsilon$, khoảng thời gian đo được dãn ra thành $\\Delta t = \\gamma\\,\\Delta t_0$. Ngược lại, chiều dài dọc phương chuyển động co ngắn: $l = l_0/\\gamma$ (với $l_0$ là chiều dài riêng đo trong hệ mà vật đứng yên).',
        trap: 'Sai lầm phổ biến nhất là gán nhầm $\\Delta t_0$ cho người đứng ở mặt đất. Khoảng thời gian riêng $\\Delta t_0$ là khoảng thời gian ngắn nhất, luôn do đồng hồ gắn với vật (hai biến cố tại CÙNG MỘT ĐIỂM) đo được; còn chiều dài riêng $l_0$ là chiều dài lớn nhất, đo trong hệ mà thước ĐỨNG YÊN.',
        consequence: 'Hai sự kiện đồng thời ở hai nơi khác nhau trong hệ này có thể xảy ra lệch thời gian trong hệ khác.',
      },
      {
        id: 'T7.3',
        title: 'Động lực học tương đối tính và hệ thức E = mc²',
        origin: 'Để bảo toàn động lượng đúng với biến đổi Lorentz ở mọi tốc độ gần $c$, động lượng phải định nghĩa là $\\vec p = \\gamma m_0\\vec\\upsilon$ (với $m_0$ là khối lượng nghỉ).',
        law: 'Tính công tăng tốc hạt từ nghỉ cho động năng $K = (\\gamma - 1)m_0 c^2 = E - E_0$, với năng lượng toàn phần $E = \\gamma m_0 c^2$ và năng lượng nghỉ $E_0 = m_0 c^2$. Khử $\\gamma$ giữa $E$ và $p$ được hệ thức bất biến $E^2 = (pc)^2 + (m_0 c^2)^2$.',
        trap: 'Không thay $\\tfrac12 m_0\\upsilon^2$ khi $\\upsilon$ cỡ $0{,}1c$ trở lên; công thức Newton chỉ là giới hạn khi $\\upsilon \\ll c$ (khai triển $\\gamma \\approx 1 + \\tfrac{\\upsilon^2}{2c^2}$ cho lại $\\tfrac12 m_0\\upsilon^2$). Hạt không khối lượng nghỉ ($m_0 = 0$, như photon) vẫn có động lượng $p = E/c$.',
        consequence: 'Mọi thay đổi năng lượng liên kết hoặc tỏa nhiệt $\\Delta E$ đều ứng với độ biến thiên khối lượng $\\Delta m = \\Delta E/c^2$.',
      },
    ],
  },
  {
    ch: 8,
    summary: 'Nguyên lý số 0 định nghĩa nhiệt độ như đại lượng cân bằng nhiệt; các thang đo liên hệ tuyến tính qua hai điểm chuẩn, còn dãn nở khối bằng 3 lần dãn nở dài ở vật rắn đẳng hướng.',
    stages: [
      {
        id: 'T8.1',
        title: 'Nguyên lý số 0 và ý nghĩa nhiệt độ',
        origin: 'Đưa hai vật tiếp xúc nhiệt sẽ có sự trao đổi năng lượng đến khi trạng thái vĩ mô không đổi nữa (cân bằng nhiệt).',
        law: 'Nguyên lý số 0: nếu vật A và vật B cùng cân bằng nhiệt với vật thứ ba T (nhiệt kế), thì A và B cân bằng nhiệt với nhau. Tính chất bắc cầu này khẳng định tồn tại hàm trạng thái duy nhất gọi là nhiệt độ: hai vật cân bằng nhiệt khi và chỉ khi có cùng nhiệt độ.',
        trap: 'Hai vật có cùng nhiệt độ không nhất thiết có cùng nhiệt dung hay cùng nhiệt năng; chúng chỉ không truyền nhiệt ròng cho nhau khi tiếp xúc.',
        consequence: 'Nguyên lý 0 cho phép chế tạo nhiệt kế dựa trên một tính chất phụ thuộc đều vào nhiệt độ (chiều dài cột thủy ngân, áp suất khí đẳng tích...).',
      },
      {
        id: 'T8.2',
        title: 'Các thang nhiệt giai và quy tắc nội suy tuyến tính',
        origin: 'Mỗi thang nhiệt giai chọn hai điểm chuẩn cố định (điểm ba/đóng băng và điểm sôi chuẩn của nước) rồi chia khoảng giữa thành số độ đều nhau.',
        law: 'Từ tỉ lệ tuyến tính $\\frac{y - y_1}{x - x_1} = \\frac{y_2 - y_1}{x_2 - x_1}$, với Celsius $(0;\\,100)$, Kelvin $(273;\\,373)$ và Fahrenheit $(32;\\,212)$ suy ra $T_C = T - 273$ và $T_F = \\tfrac95 T_C + 32$.',
        trap: 'Phân biệt GIÁ TRỊ nhiệt độ với ĐỘ BIẾN THIÊN nhiệt độ: $20^\\circ\\text{C}$ ứng với $293\\text{ K}$, nhưng "tăng thêm $20^\\circ\\text{C}$" chính xác là $\\Delta T = 20\\text{ K}$ (vì độ lớn 1 độ chia trên thang C và thang K bằng nhau), còn trên thang F là $\\Delta T_F = \\tfrac95\\cdot 20 = 36^\\circ\\text{F}$.',
        consequence: 'Trong mọi công thức vật lý chứa hiệu $\\Delta T$ (như $mc\\Delta T$, $\\alpha L\\Delta T$) có thể thay $\\Delta T$ bằng $^\\circ\\text{C}$ hay $\\text{K}$ như nhau, nhưng công thức chứa $T$ tuyệt đối (như $pV=nRT$, Carnot) bắt buộc dùng Kelvin.',
      },
      {
        id: 'T8.3',
        title: 'Sự nở vì nhiệt của chất rắn và chất lỏng',
        origin: 'Khi nhiệt độ tăng, biên độ dao động nhiệt quanh vị trí cân bằng tăng làm khoảng cách trung bình giữa các nguyên tử tăng lên.',
        law: 'Với vật rắn đẳng hướng: nở dài $\\Delta L = \\alpha L\\Delta T$, nở khối $\\Delta V = \\beta V\\Delta T$. Xét khối hộp thể tích $V_0 = L_1 L_2 L_3$, khi tăng $\\Delta T$: $V = V_0(1+\\alpha\\Delta T)^3 \\approx V_0(1+3\\alpha\\Delta T)$ do $\\alpha\\Delta T \\ll 1$, suy ra $\\beta \\approx 3\\alpha$.',
        trap: 'Khi nung nóng một tấm kim loại có khoét lỗ tròn ở giữa, lỗ tròn NỞ TO RA chứ không co lại, vì mọi khoảng cách giữa hai điểm bất kỳ trên vật đều tăng theo cùng hệ số $1 + \\alpha\\Delta T$.',
        consequence: 'Thứ nguyên của cả $\\alpha$ và $\\beta$ đều là $\\text{K}^{-1}$ (hoặc $^\\circ\\text{C}^{-1}$), không phụ thuộc đơn vị độ dài.',
      },
    ],
  },
  {
    ch: 9,
    summary: 'Nội năng U chỉ phụ thuộc trạng thái, còn công A và nhiệt Q phụ thuộc đường đi; Nguyên lý I ΔU = Q − A liên kết ba đại lượng đó thành bảo toàn năng lượng cho quá trình nhiệt.',
    stages: [
      {
        id: 'T9.1',
        title: 'Nội năng (hàm trạng thái) và Nhiệt, Công (hàm quá trình)',
        origin: 'Khí trong xi-lanh chuyển từ trạng thái 1 sang trạng thái 2 theo nhiều đường khác nhau trên giản đồ $pV$. Công hệ sinh ra là $A = \\int_1^2 p\\,dV$ (diện tích dưới đường biểu diễn), còn nhiệt $Q$ cũng phụ thuộc đường đi.',
        law: 'Theo quy ước của giáo trình: $Q > 0$ khi hệ nhận nhiệt, $A > 0$ khi hệ dãn nở sinh công ($dV > 0$). Nhiệt $Q$ và công $A$ là hàm quá trình (chỉ xuất hiện khi có biến đổi), còn nội năng $U$ là tổng động năng và thế năng chuyển động nhiệt vi mô — một hàm đơn giá của trạng thái.',
        trap: 'Nhiều sách dùng $\\Delta U = Q + A$ với $A$ là công hệ NHẬN; slide và bài tập học phần PHY1159 dùng $\\Delta U = Q - A$ với $A = \\int p\\,dV$ là công hệ SINH RA. Phải giữ nhất quán một quy ước để không sai dấu.',
        consequence: 'Nếu hai quá trình nối cùng điểm đầu 1 và điểm cuối 2 trên giản đồ $pV$, chúng có $\\Delta U$ bằng nhau dù $A$ và $Q$ khác nhau.',
        pdfRefs: [
          { label: 'Bài 9.3–9.5 (tr. 10–11 PDF): Tính công, nội năng theo giản đồ pV', page: 10, note: 'Tính công từ diện tích dưới đồ thị $pV$ và dùng chung $\\Delta U$ cho mọi đường cùng đầu–cuối.' },
        ],
      },
      {
        id: 'T9.2',
        title: 'Nguyên lý I Nhiệt động lực học và các quá trình đặc biệt',
        origin: 'Thực nghiệm chứng minh dù $Q$ và $A$ thay đổi theo đường đi giữa hai trạng thái cho trước, hiệu $Q - A$ luôn giữ cùng một giá trị.',
        law: 'Nguyên lý I: $\\Delta U = Q - A$ (dạng vi phân $dU = \\delta Q - \\delta A$). Đẳng tích ($dV=0 \\Rightarrow A=0$): $\\Delta U = Q$. Đoạn nhiệt ($Q=0$): $\\Delta U = -A$. Chu trình kín ($\\Delta U = 0$): $Q = A$ — không thể chế tạo động cơ vĩnh cửu loại I sinh công mà không nhận năng lượng.',
        trap: 'Quá trình dãn nở tự do của khí cách nhiệt vào chân không có $Q = 0$ và $A = 0$ (không đẩy lực cản nào), nên $\\Delta U = 0$; tuy nhiên các trạng thái trung gian không cân bằng nên không vẽ thành đường cong liên tục trên giản đồ $pV$.',
        consequence: 'Với chu trình thuận chiều kim đồng hồ trên $pV$, công $A_{\\text{ck}} > 0$ nên $Q_{\\text{ck}} = A_{\\text{ck}} > 0$ (hệ nhận nhiệt ròng để sinh công).',
        pdfRefs: [
          { label: 'Bài 9.6 (tr. 11 PDF): Chu trình có đoạn nhiệt', page: 11, note: 'Áp dụng $\\Delta U_{\\text{ck}} = 0 \\Rightarrow Q_{AB} + Q_{CA} = A_{\\text{ck}}$ vì $Q_{BC}=0$.' },
        ],
      },
      {
        id: 'T9.3',
        title: 'Nhiệt dung, nhiệt chuyển pha và dẫn nhiệt trạng thái dừng',
        origin: 'Khi nhận nhiệt, vật có thể tăng nhiệt độ ($Q = mc\\Delta T$) hoặc chuyển pha đẳng nhiệt ($Q = mL$). Khi có chênh lệch nhiệt độ qua tường nhiều lớp, nhiệt truyền từ nóng sang lạnh.',
        law: 'Tại trạng thái dừng (nhiệt độ mỗi lớp không đổi theo thời gian), thông lượng nhiệt qua mọi lớp nối tiếp phải bằng nhau: $H = k_i A \\frac{\\Delta T_i}{L_i} = \\text{const}$.',
        trap: 'Trong bài pha trộn đá – nước hoặc cấp nhiệt hữu hạn $Q$, phải tính mốc nhiệt cần để đá tăng lên $0^\\circ\\text{C}$ và mốc nóng chảy hoàn toàn trước; nếu $Q$ thiếu thì hỗn hợp dừng ở $0^\\circ\\text{C}$ gồm cả nước và đá.',
        consequence: 'Với tường nhiều lớp nối tiếp ở trạng thái dừng, độ sụt nhiệt độ trên mỗi lớp tỉ lệ với "nhiệt trở" $L_i/k_i$ của lớp đó.',
        pdfRefs: [
          { label: 'Bài 9.1–9.2 (tr. 9–10 PDF): Nóng chảy đá và tường dẫn nhiệt 4 lớp', page: 9, note: 'Kiểm tra ngưỡng $0^\\circ\\text{C}$ ở bài 9.1 và cân bằng thông lượng $k_i\\Delta T_i/L_i$ ở bài 9.2.' },
        ],
      },
    ],
  },
  {
    ch: 10,
    summary: 'Mô hình khí lý tưởng nối áp suất vĩ mô với va chạm vi mô, nhiệt độ với động năng tịnh tiến, bậc tự do với nhiệt dung mol và phương trình đoạn nhiệt pV^γ = const.',
    stages: [
      {
        id: 'T10.1',
        title: 'Phương trình cơ bản thuyết động học và quãng đường tự do trung bình',
        origin: 'Xét $N$ phân tử khí lý tưởng va chạm đàn hồi lên thành bình lập phương cạnh $L$: mỗi lần va chạm vào mặt vuông góc $Ox$ truyền xung lượng $2m\\upsilon_{ix}$ trong chu kỳ $2L/\\upsilon_{ix}$.',
        law: 'Cộng lực của $N$ phân tử (với $\\overline{\\upsilon_x^2} = \\tfrac13\\overline{\\upsilon^2}$) cho phương trình cơ bản $p = \\frac{n\\mu}{3V}\\upsilon_{rms}^2$. Kết hợp $pV = nRT$ thu được $T = \\frac{\\mu}{3R}\\upsilon_{rms}^2$ và động năng tịnh tiến trung bình $\\overline{E_đ} = \\frac32 kT$ — nhiệt độ tuyệt đối là thước đo động năng tịnh tiến trung bình. Giữa hai lần va chạm, phân tử đi quãng đường tự do trung bình $\\lambda = \\frac{1}{\\sqrt{2}n_0\\pi d^2} = \\frac{kT}{\\sqrt{2}p\\pi d^2}$.',
        trap: 'Ở cùng một nhiệt độ $T$, mọi khí lý tưởng đều có CÙNG động năng tịnh tiến trung bình $\\tfrac32 kT$, nhưng khí nhẹ hơn (khối lượng mol $\\mu$ nhỏ) có $\\upsilon_{rms} = \\sqrt{3RT/\\mu}$ LỚN hơn.',
        consequence: 'Nếu giữ nguyên nhiệt độ mà giảm áp suất $p$ thì mật độ phân tử $n_0$ giảm nên $\\lambda$ tăng tỉ lệ nghịch với $p$.',
        pdfRefs: [
          { label: 'Bài 10.1 & 10.7 (tr. 11–12 PDF): Trạng thái khí và quãng đường tự do TB', page: 11, note: 'Dùng $p_1 V_1 / T_1 = p_2 V_2 / T_2$ (nhiệt độ Kelvin) và tỉ lệ $\\lambda \\propto T/(p d^2)$.' },
        ],
      },
      {
        id: 'T10.2',
        title: 'Phân bố đều theo bậc tự do và nội năng khí lý tưởng',
        origin: 'Phân tử không chỉ tịnh tiến mà còn có thể quay nếu gồm nhiều nguyên tử (tại nhiệt độ phòng chưa kích thích dao động).',
        law: 'Định luật phân bố đều: mỗi bậc tự do nhận năng lượng trung bình $\\tfrac12 kT$. Với đơn nguyên tử ($i=3$), lưỡng nguyên tử ($i=5$), đa nguyên tử ($i=6$), nội năng của $n$ mol khí lý tưởng là $U = n\\frac{i}{2}RT$.',
        trap: 'Nội năng của khí lý tưởng chỉ phụ thuộc vào nhiệt độ $T$ (và $n, i$), KHÔNG phụ thuộc thể tích hay áp suất — nên mọi quá trình đẳng nhiệt của khí lý tưởng đều có $\\Delta U = 0$ và $Q = A$.',
        consequence: 'Từ $U(T)$ suy thẳng ra công thức $\\Delta U = n C_V \\Delta T$ áp dụng được cho MỌI quá trình của khí lý tưởng, không riêng quá trình đẳng tích.',
      },
      {
        id: 'T10.3',
        title: 'Nhiệt dung mol, hệ thức Mayer và đẳng nhiệt – đoạn nhiệt',
        origin: 'So sánh nhiệt lượng cần cấp để tăng $n$ mol khí thêm $\\Delta T$ trong quá trình đẳng tích (không sinh công) và đẳng áp (vừa tăng nội năng vừa sinh công $A = p\\Delta V = nR\\Delta T$).',
        law: 'Đẳng tích: $Q = \\Delta U \\Rightarrow C_V = \\frac{i}{2}R$. Đẳng áp: $n C_P \\Delta T = n C_V \\Delta T + nR\\Delta T \\Rightarrow C_P - C_V = R$ (hệ thức Mayer), và tỉ số $\\gamma = C_P/C_V = \\frac{i+2}{i}$. Với quá trình đẳng nhiệt $A = nRT\\ln(V_2/V_1)$; với quá trình đoạn nhiệt ($Q=0$) kết hợp $dU = -p\\,dV$ và $pV = nRT$ cho $pV^\\gamma = \\text{const}$ và công $A = \\frac{nR}{\\gamma - 1}(T_1 - T_2)$.',
        trap: 'Từ cùng trạng thái $(p_1, V_1)$ dãn đến cùng $V_2 > V_1$, quá trình đoạn nhiệt sinh công ÍT HƠN quá trình đẳng nhiệt vì khí tự tiêu nội năng để sinh công nên nhiệt độ $T$ và áp suất giảm nhanh hơn ($\\gamma > 1$).',
        consequence: 'Trên giản đồ $pV$, đường đoạn nhiệt luôn dốc hơn đường đẳng nhiệt đi qua cùng điểm.',
        pdfRefs: [
          { label: 'Bài 10.2–10.6 (tr. 11–12 PDF): Đẳng nhiệt, đẳng áp và tính $C_P, C_V$', page: 11, note: 'Phân biệt $A = nRT\\ln(V_2/V_1)$ (đẳng nhiệt) với $A = nR\\Delta T$ (đẳng áp).' },
        ],
      },
    ],
  },
  {
    ch: 11,
    summary: 'Nguyên lý II chỉ ra chiều tự phát của quá trình nhiệt, giới hạn hiệu suất Carnot qua hai nguồn nhiệt và dẫn tới hàm trạng thái Entropi luôn không giảm trong hệ cô lập.',
    stages: [
      {
        id: 'T11.1',
        title: 'Quá trình thuận nghịch và Nguyên lý II (Thomson – Clausius)',
        origin: 'Nguyên lý I cho phép mọi quá trình bảo toàn năng lượng, nhưng thực tế nhiệt chỉ tự truyền từ nóng sang lạnh và ma sát chỉ biến công thành nhiệt chứ không tự ngược lại.',
        law: 'Hai cách phát biểu tương đương của Nguyên lý II: (1) Thomson: không thể biến hoàn toàn nhiệt thành công mà không gây biến đổi nào khác ở môi trường — không tồn tại động cơ vĩnh cửu loại II, hiệu suất động cơ nhiệt $\\eta = \\frac{A}{Q_1} = 1 - \\frac{Q_2}{Q_1} < 1$; (2) Clausius: nhiệt không thể tự truyền từ vật lạnh sang vật nóng nếu không tốn công — máy lạnh có hệ số làm lạnh $k = \\frac{Q_2}{A} = \\frac{Q_2}{Q_1 - Q_2}$.',
        trap: 'Đừng nhầm $k$ (hệ số làm lạnh, có thể lớn hơn $1$) với $\\eta$ (hiệu suất động cơ nhiệt, luôn nhỏ hơn $1$). Và ở bài chu trình tùy ý, $Q_1$ là tổng nhiệt HẤP THỤ trên các đoạn nhận nhiệt ($Q>0$), không phải nhiệt ròng $Q_1 - Q_2$.',
        consequence: 'Để tính hiệu suất bất kỳ chu trình nào, phải phân tích từng đoạn xem đoạn nào $Q > 0$ (cộng vào $Q_1$) và đoạn nào $Q < 0$ (tỏa $Q_2$).',
        pdfRefs: [
          { label: 'Bài 11.1–11.4 (tr. 12 PDF): Tủ lạnh, chu trình nhiệt và động cơ Stirling', page: 12, note: 'Xác định rõ các đoạn $Q>0$ để chia đúng cho $Q_1$ khi tính $\\eta = A/Q_1$.' },
        ],
      },
      {
        id: 'T11.2',
        title: 'Chu trình Carnot và Định lý Carnot',
        origin: 'Ghép 2 quá trình đẳng nhiệt thuận nghịch ở $T_1, T_2$ với 2 quá trình đoạn nhiệt thuận nghịch tạo thành chu trình Carnot khép kín.',
        law: 'Từ biểu thức nhiệt đẳng nhiệt $Q_1 = nRT_1\\ln(V_B/V_A)$, $Q_2 = nRT_2\\ln(V_C/V_D)$ và hệ thức đoạn nhiệt $T_1 V^{ \\gamma-1 } = T_2 V^{\\gamma-1}$ suy ra $V_B/V_A = V_C/V_D$, nên hiệu suất Carnot chỉ phụ thuộc nhiệt độ hai nguồn: $\\eta_C = \\frac{T_1 - T_2}{T_1} = 1 - \\frac{T_2}{T_1}$. Định lý Carnot: mọi động cơ chạy giữa hai nguồn $T_1, T_2$ có $\\eta \\le \\eta_C$ (dấu $=$ khi thuận nghịch).',
        trap: 'Tuyệt đối đổi $T_1, T_2$ sang độ Kelvin trước khi thế vào $1 - T_2/T_1$. Động cơ Carnot chỉ đạt $\\eta = 1$ khi $T_2 = 0\\text{ K}$ (không thể đạt được).',
        consequence: 'Hiệu suất Carnot là trần vật lý tối đa mà mọi động cơ thực không thể vượt qua.',
        pdfRefs: [
          { label: 'Bài 11.8 (tr. 13 PDF): Chu trình chữ nhật trên giản đồ T–S', page: 13, note: 'Hình chữ nhật trên đồ thị $T-S$ chính là chu trình Carnot: $Q_1 = T_1(S_2-S_1)$ và $A = (T_1-T_2)(S_2-S_1)$.' },
        ],
      },
      {
        id: 'T11.3',
        title: 'Bất đẳng thức Clausius, Entropi và nguyên lý tăng Entropi',
        origin: 'Từ $\\frac{Q_1 - |Q_2|}{Q_1} \\le \\frac{T_1 - T_2}{T_1}$, quy ước nhiệt nhận dương và tỏa âm cho $\\frac{Q_1}{T_1} + \\frac{Q_2}{T_2} \\le 0$. Chia nhỏ chu trình bất kỳ thành vô số chu trình Carnot sơ cấp cho bất đẳng thức Clausius $\\oint \\frac{\\delta Q}{T} \\le 0$.',
        law: 'Với quá trình thuận nghịch, $\\oint \\frac{\\delta Q}{T} = 0$, nên tích phân $\\Delta S = S_2 - S_1 = \\int_1^2 \\left(\\frac{\\delta Q}{T}\\right)_{tn}$ không phụ thuộc đường đi: $S$ là một HÀM TRẠNG THÁI gọi là Entropi (đơn vị J/K). Với quá trình bất kỳ: $\\Delta S \\ge \\int_1^2 \\frac{\\delta Q}{T}$. Riêng hệ cô lập ($\\delta Q = 0$): $\\Delta S \\ge 0$ — Entropi tăng trong mọi quá trình thực tế, chỉ hướng thời gian và đạt cực đại ở cân bằng ($S = k\\ln W$).',
        trap: 'Để tính $\\Delta S$ của một quá trình BẤT THUẬN NGHỊCH (như dãn nở tự do vào chân không hay trộn nước nóng–lạnh), KHÔNG lấy $\\int \\delta Q/T$ dọc theo quá trình thực tế (nhiều khi $\\delta Q=0$ lại tưởng $\\Delta S=0$!); vì $S$ là hàm trạng thái, phải thay bằng một quá trình THUẬN NGHỊCH tưởng tượng nối cùng hai trạng thái đầu–cuối rồi tính $\\int (\\delta Q/T)_{tn}$.',
        consequence: 'Diện tích dưới đường cong trên giản đồ $T-S$ là nhiệt lượng trao đổi $Q = \\int T\\,dS$ trong quá trình thuận nghịch.',
        pdfRefs: [
          { label: 'Bài 11.5–11.7 & 11.9 (tr. 12–13 PDF): Biến thiên Entropi & đồ thị T–S', page: 12, note: 'Tính $\\Delta S = \\int mc\\,dT/T + mL/T_{cp}$ và đọc nhiệt lượng từ diện tích trên đồ thị $T-S$.' },
        ],
      },
    ],
  },
];
