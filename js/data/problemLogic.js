// Cầu nối lý thuyết theo logic cho toàn bộ 31 bài tính toán (2.1–4.10).
const t = String.raw;

export const PROBLEM_LOGIC = {
  // ----- Chương 2 -----
  '2.1': {
    theoryRef: 'T2.1',
    principle: t`Quãng đường là tích phân $\int \upsilon\,dt$, tức diện tích hình phẳng giới hạn bởi đồ thị $\upsilon(t)$ và trục thời gian.`,
    condition: t`Đồ thị ở đây luôn có $\upsilon \ge 0$ nên diện tích từng đoạn chính là quãng đường đi được, không bị triệt tiêu âm.`,
    steps: [
      'Đọc các mốc thời gian thay đổi quy luật vận tốc trên đồ thị.',
      'Tách đồ thị thành các hình thang, tam giác và hình chữ nhật rời nhau.',
      'Cộng diện tích từng đoạn và kiểm tra thứ nguyên (m/s)·s = m.',
    ],
  },
  '2.2': {
    theoryRef: 'T2.1',
    principle: t`Diện tích dưới đường cong $\upsilon(t)$ vẫn bằng quãng đường ngay cả khi gia tốc biến đổi liên tục không đều.`,
    condition: 'Không dùng công thức $s = \\upsilon_0 t + \\tfrac12 a t^2$ vì đồ thị là nửa ellipse, tức gia tốc không phải hằng số.',
    steps: [
      'Nhận diện hình dạng đường cong $\\upsilon(t)$ là nửa trên của ellipse trên hệ trục $(t, \\upsilon)$.',
      'Xác định đúng hai bán trục theo đơn vị trục hoành ($t_0/2$) và trục tung ($\\upsilon_0$).',
      'Lấy nửa diện tích ellipse $\\tfrac12\\pi a b$ và kiểm tra thứ nguyên là m/s · s = m.',
    ],
    check: {
      q: 'Vì sao KHÔNG áp dụng được công thức $s = \\tfrac12 \\upsilon_0 t_0$ hay $s = \\upsilon_0 t_0 + \\tfrac12 a t_0^2$ cho đồ thị nửa ellipse?',
      options: [
        { text: 'Vì đồ thị cong nên gia tốc thay đổi theo thời gian, chỉ tích phân diện tích $\\int \\upsilon\\,dt$ còn đúng', ok: true, why: 'Đúng. Công thức biến đổi đều chỉ ứng với đồ thị $\\upsilon(t)$ là đường thẳng.' },
        { text: 'Vì vật chuyển động theo quỹ đạo hình ellipse trong không gian', ok: false, why: 'Đây là đồ thị $\\upsilon(t)$, không phải hình dạng quỹ đạo trong không gian.' },
      ],
    },
  },
  '2.3': {
    theoryRef: 'T2.1',
    principle: 'Chuyển động thẳng nhanh dần đều từ nghỉ có quãng đường tăng tỉ lệ bình phương thời gian ($s = \\tfrac12 a t^2$).',
    condition: 'Tàu xuất phát từ nghỉ ($\\upsilon_0 = 0$), các toa dài bằng nhau $L$ và gia tốc $a$ không đổi suốt quá trình.',
    steps: [
      'Gắn mốc $t=0$ ở đầu toa 1, $x=0$ ở người quan sát; viết phương trình đi hết $k$ toa: $kL = \\tfrac12 a t_k^2$.',
      'Lập tỉ số với phương trình toa 1 ($L = \\tfrac12 a \\tau^2$) để khử hai ẩn chưa biết $L$ và $a$.',
      'Lấy hiệu thời điểm hết toa $n$ và toa $n-1$; kiểm tra tính đơn điệu: $n$ càng lớn $\\Delta t$ càng nhỏ.',
    ],
  },
  '2.4': {
    theoryRef: 'T2.2',
    principle: 'Vật chuyển động thẳng đứng chỉ chịu trọng lực $\\vec g$ không đổi, nên đồ thị $h(t)$ đối xứng qua thời điểm đạt đỉnh cao nhất.',
    condition: 'Bỏ qua lực cản không khí để gia tốc hướng xuống bằng $g$ suốt cả lúc lên và lúc rơi xuống.',
    steps: [
      'Chọn trục thẳng đứng hướng lên từ điểm ném, viết phương trình tọa độ bậc hai $h = \\upsilon_0 t - \\tfrac12 g t^2$.',
      'Hai lần qua độ cao $h$ ứng với hai nghiệm $t_1 < t_2$; dùng tổng và hiệu nghiệm để khử $t_1, t_2$ sang $t_0$.',
      'Kiểm tra trường hợp biên $h = 0$: phải ra tổng thời gian bay $2\\upsilon_0/g$.',
    ],
    check: {
      q: 'Tại hai lần đi qua cùng độ cao $h$ (khi lên và khi xuống), đại lượng nào của vật giống nhau?',
      options: [
        { text: 'Tốc độ bằng nhau và khoảng thời gian từ lúc qua $h$ lên đỉnh bằng từ đỉnh về lại $h$', ok: true, why: 'Đúng. Nhờ tính đối xứng của chuyển động gia tốc hằng $\\vec g$ không cản.' },
        { text: 'Véc-tơ vận tốc hoàn toàn giống nhau ở hai lần', ok: false, why: 'Độ lớn bằng nhau nhưng chiều ngược nhau (lúc lên dương, lúc xuống âm).' },
      ],
    },
  },
  '2.5': {
    theoryRef: 'T2.3',
    principle: 'Trong hệ quy chiếu gắn với một vật đang bay tự do, mọi vật bay tự do khác đều chuyển động thẳng đều vì gia tốc $\\vec g$ triệt tiêu nhau.',
    condition: 'Xét tại thời điểm $t$ khi cả hai vật đều còn ở trên không (chưa chạm đất).',
    steps: [
      'Viết hai véc-tơ vị trí $\\vec r_1(t)$ và $\\vec r_2(t)$ cùng gia tốc $\\vec g$.',
      'Lấy hiệu $\\vec r_1 - \\vec r_2$ để khử số hạng $\\tfrac12 \\vec g t^2$, đưa bài toán về độ lớn hiệu vận tốc đầu.',
      'Kiểm tra xem $t = 1{,}7$ s đã vượt quá thời gian bay của hai vật chưa.',
    ],
  },
  '2.6': {
    theoryRef: 'T2.2',
    principle: t`Bán kính cong tại mỗi điểm quỹ đạo đo tốc độ đổi hướng vận tốc qua gia tốc pháp tuyến: $R = \\upsilon^2 / a_n$.`,
    condition: 'Tổng gia tốc tại mọi điểm trên không là $\\vec g$; $a_n$ là thành phần của $\\vec g$ vuông góc với $\\vec\\upsilon$ ở đúng vị trí đang xét.',
    steps: [
      'Xác định phương của $\\vec\\upsilon$ ở đỉnh (nằm ngang) và ở lúc chạm đất (hợp phương ngang góc $\\alpha$).',
      'Chiếu $\\vec g$ lên phương vuông góc với $\\vec\\upsilon$ tại từng điểm để tìm $a_n$.',
      'Thay tốc độ tương ứng vào $R = \\upsilon^2/a_n$; kiểm tra vật lý: ở đỉnh vận tốc nhỏ hơn và $a_n$ lớn nhất nên $R_B < R_C$.',
    ],
    check: {
      q: 'Tại điểm cao nhất của quỹ đạo ném xiên, gia tốc toàn phần và gia tốc pháp tuyến bằng bao nhiêu?',
      options: [
        { text: 'Cả gia tốc toàn phần lẫn gia tốc pháp tuyến đều bằng $g$', ok: true, why: 'Đúng. Ở đỉnh vận tốc nằm ngang nên $\\vec g$ vuông góc hoàn toàn với $\\vec\\upsilon$, tức $a_t = 0$ và $a_n = g$.' },
        { text: 'Gia tốc bằng 0 vì vật dừng lại ở điểm cao nhất', ok: false, why: 'Chỉ thành phần thẳng đứng $\\upsilon_y = 0$, vật vẫn còn $\\upsilon_x$ và vẫn chịu trọng lực nên gia tốc luôn là $g$.' },
      ],
    },
  },
  '2.7': {
    theoryRef: 'T2.3',
    principle: t`Vận tốc tương đối tuân theo phép trừ véc-tơ $\vec\upsilon' = \vec\upsilon_{\text{đất}} - \vec\upsilon_{\text{tàu}}$.`,
    condition: 'Phải đọc đúng quy ước hướng gió: "thổi từ Đông Nam" nghĩa là véc-tơ vận tốc gió hướng về phía Tây Bắc.',
    steps: [
      'Chọn hệ trục $Ox$ hướng Đông, $Oy$ hướng Bắc gắn với mặt đất.',
      'Phân tích hai véc-tơ $\\vec\\upsilon_{\\text{tàu}}$ và $\\vec\\upsilon_{\\text{gió}}$ ra tọa độ $(v_x, v_y)$, rồi lấy hiệu.',
      'Tính độ lớn và góc từ hai thành phần tọa độ của $\\vec\\upsilon\'$.',
    ],
    check: {
      q: 'Gió thổi từ hướng Đông Nam sang Tây Bắc khi tàu chạy về hướng Đông. Trong hệ quy chiếu tàu, thành phần gió ngược chiều tàu mạnh hơn hay yếu đi?',
      options: [
        { text: 'Mạnh hơn, vì tàu chạy về Đông ngược chiều thành phần gió sang Tây nên hai độ lớn cộng vào nhau', ok: true, why: 'Đúng. $\\upsilon_x\' = -\\upsilon\\cos\\varphi - \\upsilon_0$ có độ lớn $\\upsilon_0 + \\upsilon\\cos\\varphi$.' },
        { text: 'Yếu đi, vì gió thổi từ Đông Nam có thành phần cùng hướng Đông với tàu', ok: false, why: '"Thổi ĐẾN TỪ hướng Đông Nam" nghĩa là đi hướng Tây Bắc, ngược chiều Đông.' },
      ],
    },
  },

  // ----- Chương 3 -----
  '3.1': {
    theoryRef: 'T3.1',
    principle: 'Mỗi vật tuân theo Định luật II Newton trong hệ quy chiếu quán tính; dây không dãn giữ hai vật cùng độ lớn gia tốc và lực căng dây như nhau khi bỏ qua khối lượng ròng rọc.',
    condition: 'Phải so sánh lực kéo $m_2 g$ với $m_1 g\\sin\\alpha$ trước để biết chiều chuyển động dự kiến rồi mới đặt đúng chiều lực ma sát trượt.',
    steps: [
      'Xác định chiều chuyển động (hoặc kiểm tra điều kiện đứng yên khi $|m_2 - m_1\\sin\\alpha| \\le \\mu m_1\\cos\\alpha$).',
      'Vẽ tách riêng lực thật tác dụng lên A và B trong hệ quy chiếu mặt đất.',
      'Viết ĐL II cho từng vật dọc dây, cộng vế khử $T$ tìm $a$, suy ra $T$ rồi tổng hợp hai nhánh dây trên ròng rọc.',
    ],
  },
  '3.2': {
    theoryRef: 'T3.1',
    principle: 'Cùng quãng đường trên dốc, chiều lực ma sát đổi dấu giữa lúc lên và lúc xuống làm gia tốc hai giai đoạn khác nhau.',
    condition: 'Sau khi ném, vật không còn "lực ném"; để vật trượt xuống được thì $\\mathrm{tg}\\,\\alpha > \\mu$.',
    steps: [
      'Viết gia tốc độ lớn khi đi lên (trọng lực + ma sát cùng kéo xuống) và khi đi xuống (ngược nhau).',
      'Dùng đối xứng quãng đường $s = \\tfrac12 a_1 t_1^2 = \\tfrac12 a_2 t_2^2$ (lên chậm dần đến dừng ngược lại của xuống nhanh dần từ nghỉ).',
      'Thay $t_2 = n t_1$ để khử $s, g$ và giải ra $\\mu$; kiểm tra biên $n=1 \\Rightarrow \\mu=0$.',
    ],
  },
  '3.3': {
    theoryRef: 'T3.2',
    principle: 'Chuyển động tròn đều cần hợp lực hướng vào tâm đường tròn quỹ đạo bằng $m\\upsilon^2/r$, còn theo phương thẳng đứng lực cân bằng.',
    condition: 'Trong hệ quy chiếu mặt đất chỉ có hai lực thật $\\vec P$ và $\\vec T$; bán kính quỹ đạo tròn là $r = \\ell\\sin\\alpha$, không phải $\\ell$.',
    steps: [
      'Vẽ đúng hai lực thật $\\vec P$ và $\\vec T$ lên vật ở hệ quy chiếu mặt đất.',
      'Chiếu lên phương thẳng đứng ($a_y = 0$) để rút ra $T$, và lên phương ngang hướng tâm ($a_n = \\upsilon^2/r$).',
      'Khử $T$ để tìm $\\upsilon$; kiểm tra góc $\\alpha \\to 0 \\Rightarrow \\upsilon \\to 0$ và $T \\to mg$.',
    ],
  },
  '3.4': {
    theoryRef: 'T3.4',
    principle: 'Chiều gia tốc phụ thuộc vào việc thang máy tăng tốc hay giảm tốc chứ không chỉ phụ thuộc chiều chuyển động; người nén lên sàn đúng bằng phản lực sàn đẩy người (ĐL III).',
    condition: 'Thang máy đi lên và chậm dần đều có gia tốc hướng xuống dưới ($a_y = -a$).',
    steps: [
      'Xác định chiều của $\\vec a$ trong từng trường hợp (nhanh dần vs chậm dần khi đi lên).',
      'Áp dụng ĐL II cho cả hệ (người + thang) để tìm lực căng cáp $T$, và cho riêng người để tìm phản lực $N$.',
      'Kiểm tra định tính: đi lên nhanh dần thấy nặng hơn ($N > mg$), đi lên chậm dần thấy nhẹ hơn ($N < mg$).',
    ],
  },
  '3.5': {
    theoryRef: 'T3.1',
    principle: 'Khi coi (người + sàn) là một hệ, cả hai nhánh dây vắt qua ròng rọc cố định đều kéo hệ hướng lên trên với cùng lực căng $F$.',
    condition: 'Dây và ròng rọc nhẹ không ma sát nên lực căng hai bên ròng rọc bằng nhau và bằng lực tay người kéo dây.',
    steps: [
      'Tính gia tốc $a$ từ dữ kiện động học $h = \\tfrac12 a t^2$.',
      'Viết ĐL II cho cả hệ (người + sàn) để thấy tổng lực kéo lên là $2F$, giải ngay ra $F$.',
      'Tách riêng người (chịu trọng lực, lực kéo dây $F$ hướng lên, phản lực sàn $N$ hướng lên) để tìm áp lực $N$.',
    ],
  },
  '3.6': {
    theoryRef: 'T3.1',
    principle: 'Dây không dãn vắt qua ròng rọc động làm quãng đường dịch chuyển và gia tốc hai vật tỉ lệ $a_1 = 2a_2$, còn ròng rọc nhẹ chịu hai nhánh dây kéo bằng nhau ($2T$).',
    condition: 'Ròng rọc động không khối lượng và không ma sát nên tổng lực trên nó phải bằng 0 $\\Rightarrow T_2 = 2T_1$.',
    steps: [
      'Tìm liên hệ động học giữa hai vật: vật $m_2$ lên đoạn $x$ thì phải nhả $2x$ dây nên $a_1 = 2a_2$.',
      'Viết ĐL II cho riêng $m_1$ và cho cụm ($m_2$ + ròng rọc động).',
      'Khử $T$ tìm $a_2$, suy ra $a_1, T$; kiểm tra giới hạn $2m_1 = m_2 \\Rightarrow a_1 = a_2 = 0$.',
    ],
    check: {
      q: 'Vì sao khi $m_1$ đi xuống đoạn $2x$ thì $m_2$ (gắn ròng rọc động) chỉ đi lên đoạn $x$?',
      options: [
        { text: 'Vì hai nhánh dây song song hai bên ròng rọc động đều ngắn bớt $x$, tổng chiều dài dây nhả cho $m_1$ là $2x$', ok: true, why: 'Đúng. Bảo toàn chiều dài dây cho $\\Delta x_1 = 2\\Delta x_2$, lấy đạo hàm hai lần được $a_1 = 2a_2$.' },
        { text: 'Vì lực căng dây ở bên $m_2$ chỉ bằng một nửa bên $m_1$', ok: false, why: 'Dây liên tục nhẹ nên lực căng dọc suốt sợi dây đều bằng nhau.' },
      ],
    },
  },
  '3.7': {
    theoryRef: 'T3.1',
    principle: 'Chuyển động đều từ trạng thái nghỉ nghĩa là vận tốc bằng 0 suốt quá trình; dây nhẹ không ma sát trục nên lực ma sát giữa dây và vòng bằng đúng lực căng dây.',
    condition: 'Nếu lực căng dây là $T$ và dây có khối lượng bằng 0, hợp lực lên đoạn dây tiếp xúc vòng B phải bằng 0 $\\Rightarrow F_{ms} = T$.',
    steps: [
      'Từ giả thiết ban đầu đứng yên và A chuyển động đều $\\Rightarrow a_A = 0 \\Rightarrow T = m_1 g$.',
      'Từ điều kiện dây không khối lượng $\\Rightarrow F_{ms} = T = m_1 g$ tác dụng lên vòng B hướng lên.',
      'Viết ĐL II cho vòng B ($m_2 g - F_{ms} = m_2 a$); kiểm tra biên $m_1 = m_2 \\Rightarrow a = 0$.',
    ],
  },
  '3.8': {
    theoryRef: 'T3.4',
    principle: 'Xét trong hệ quy chiếu gắn với nêm (phi quán tính), ngoài các lực thật vật còn chịu lực quán tính $-m\\vec a_0$ làm tăng lực kéo xuống dốc và giảm áp lực nén vào dốc.',
    condition: 'Khi nêm chạy sang trái với gia tốc $a_0$, lực quán tính hướng sang phải tạo thêm thành phần hướng ra khỏi dốc $ma_0\\sin\\alpha$, khiến ma sát nghỉ cực đại bị giảm đi.',
    steps: [
      'Chuyển sang HQC gắn nêm, vẽ đủ 4 lực: $\\vec P$, $\\vec N$, $\\vec F_{ms}$ và $\\vec F_{qt} = -m\\vec a_0$.',
      'Chiếu lên phương vuông góc dốc để thấy $N = m(g\\cos\\alpha - a_0\\sin\\alpha)$ giảm khi $a_0$ tăng.',
      'Áp điều kiện cân bằng $F_{kéo} \\le \\mu N$ để tìm $a_{\\max}$; khi $a_0 > a_{\\max}$ dùng ĐL II tìm gia tốc trượt rồi tính $t = \\sqrt{2S/a}$.',
    ],
    check: {
      q: 'Vì sao khi nêm tăng tốc sang trái, vật trên đỉnh nêm lại dễ trượt xuống dốc hơn?',
      options: [
        { text: 'Lực quán tính hướng sang phải vừa kéo vật xuôi dốc thêm $ma_0\\cos\\alpha$, vừa nhấc vật bớt tì vào dốc làm giảm phản lực $N$ và giảm ma sát cực đại', ok: true, why: 'Đúng. Cả tử số lực kéo tăng lên lẫn mẫu số lực ma sát giữ lại giảm xuống.' },
        { text: 'Chỉ vì trọng lực hiệu dụng tăng lên theo phương thẳng đứng', ok: false, why: 'Lực quán tính nằm ngang, không làm tăng thành phần thẳng đứng.' },
      ],
    },
  },
  '3.9': {
    theoryRef: 'T3.4',
    principle: 'Trong hệ quy chiếu gắn với chậu đang trượt thẳng có gia tốc $\\vec a$, mặt thoáng chất lỏng cân bằng luôn vuông góc với trọng lực hiệu dụng $\\vec g_{hd} = \\vec g - \\vec a$.',
    condition: 'Chỉ đúng khi chậu trượt ổn định với gia tốc không đổi $\\vec a$ và $\\mu < \\mathrm{tg}\\,\\alpha$ (chậu thực sự trượt xuống).',
    steps: [
      'Tính gia tốc $\\vec a$ của chậu trượt xuống dốc có ma sát: $a = g(\\sin\\alpha - \\mu\\cos\\alpha)$.',
      'Chuyển sang HQC gắn chậu, cộng gia tốc trọng trường $\\vec g$ với $-\\vec a$ thành $\\vec g_{hd}$ theo hai trục dọc dốc và vuông góc dốc.',
      'Mặt nước vuông góc $\\vec g_{hd}$ nên góc nghiêng $\\beta$ so với mặt dốc thỏa $\\mathrm{tg}\\,\\beta = g_{hd,\\parallel}/g_{hd,\\perp}$.',
    ],
    check: {
      q: 'Nếu mặt dốc hoàn toàn không có ma sát ($\\mu = 0$), mặt nước trong chậu đang trượt sẽ hợp với mặt dốc một góc bao nhiêu?',
      options: [
        { text: 'Bằng $0^\\circ$, tức song song với mặt dốc', ok: true, why: 'Đúng. Khi $\\mu=0$ thì $a = g\\sin\\alpha$ triệt tiêu sạch thành phần dọc dốc của trọng lực, $\\vec g_{hd}$ vuông góc đúng với mặt dốc.' },
        { text: 'Vẫn nằm ngang như khi chậu đứng yên ($\\beta = \\alpha$)', ok: false, why: 'Khi có gia tốc dọc dốc, phần tử nước chịu lực quán tính kéo ngược lên dốc làm mặt thoáng nghiêng theo dốc.' },
      ],
    },
  },
  '3.10': {
    theoryRef: 'T3.4',
    principle: 'Số chỉ của cân bàn chính là độ lớn phản lực $N$ vuông góc mặt cân; khi xe trượt dốc, gia tốc hướng xuống khiến trọng lượng biểu kiến $N$ nhỏ hơn $mg$.',
    condition: 'Cân đặt song song mặt xe (tức nghiêng theo mặt phẳng nghiêng), nên phản lực $N$ vuông góc mặt phẳng nghiêng!',
    steps: [
      'Tính gia tốc của xe không ma sát dọc dốc: $a = g\\sin\\alpha$.',
      'Chiếu phương trình ĐL II theo phương vuông góc mặt dốc (không có chuyển động theo phương này $\\Rightarrow N = mg\\cos\\alpha$ hay thẳng đứng $N\\cos\\alpha$?) — chú ý cân đặt trên sàn xe nằm ngang hay song song dốc! Theo hình và đáp số $N = mg\\cos^2\\alpha$, mặt cân nằm ngang nên chiếu theo phương thẳng đứng: $mg - N = m a_y = m g\\sin^2\\alpha$.',
      'Đặt $N/mg = \\cos^2\\alpha = 3/4$ và giải ra góc $\\alpha$.',
    ],
    check: {
      q: 'Theo hình vẽ đề bài (bàn cân nằm ngang trên xe trượt dốc không ma sát), vì sao số chỉ cân là $mg\\cos^2\\alpha$ chứ không phải $mg\\cos\\alpha$?',
      options: [
        { text: 'Vì bàn cân nằm ngang nên phản lực $N$ hướng thẳng đứng lên; chiếu ĐL II theo phương thẳng đứng cho $mg - N = m(a\\sin\\alpha) = mg\\sin^2\\alpha$', ok: true, why: 'Đúng. Đọc kỹ phương của phản lực mặt cân và gia tốc đứng $a_y = g\\sin^2\\alpha$ sẽ tránh nhầm $mg\\cos\\alpha$.' },
        { text: 'Vì hệ số ma sát làm giảm phản lực xuống thêm một lần $\\cos\\alpha$', ok: false, why: 'Đề bài cho xe trượt KHÔNG ma sát.' },
      ],
    },
  },
  '3.11': {
    theoryRef: 'T3.1',
    principle: 'Liên hệ gia tốc tương đối $\\vec a_{\\text{khỉ/đất}} = \\vec a_{\\text{khỉ/dây}} + \\vec a_{\\text{dây/đất}}$ ghép cùng Định luật II Newton cho vật và khỉ.',
    condition: 'Dây không dãn, nhẹ nên lực căng dây tác dụng lên vật $m$ và lên tay khỉ $2m$ bằng nhau.',
    steps: [
      'Chọn chiều dương hướng lên ở cả hai bên: nếu vật $m$ đi lên với gia tốc $A$ thì dây bên khỉ đi xuống với gia tốc $A$.',
      'Viết $a = a\' - A$ và hai phương trình ĐL II: $T - mg = mA$ và $T - 2mg = 2ma$.',
      'Khử $T$ và $A$ để biểu diễn $a$ theo $a\'$ và $g$.',
    ],
    check: {
      q: 'Để con khỉ $2m$ đứng yên so với mặt đất ($a = 0$), nó phải leo lên dây với gia tốc $a\'$ so với dây bằng bao nhiêu?',
      options: [
        { text: 'Bằng $g$: khi đó vật $m$ rơi xuống với gia tốc $g$? Kiểm tra $a = (a\'-g)/3 = 0 \\Rightarrow a\' = g$, lúc này $T = 2mg$ kéo vật $m$ đi lên với gia tốc $A = g$', ok: true, why: 'Đúng! Khi $a\'=g$, khỉ kéo dây làm lực căng tăng lên $2mg$, đẩy vật $m$ đi lên với gia tốc $g$ đúng bằng tốc độ khỉ leo lên dây nên khỉ đứng yên tại chỗ.' },
        { text: 'Bằng $0$, chỉ cần bám yên vào dây', ok: false, why: 'Khỉ nặng $2m$ gấp đôi vật $m$; nếu bám yên, khỉ sẽ tụt xuống với gia tốc $g/3$.' },
      ],
    },
  },
  '3.12': {
    theoryRef: 'T3.4',
    principle: 'Nước chảy trên Trái Đất đang quay chịu lực quán tính Coriolis $\\vec F_C = -2m(\\vec\\omega \\times \\vec\\upsilon)$; mặt nước cân bằng vuông góc với hợp lực của trọng lực và lực Coriolis ngang.',
    condition: 'Đề bỏ qua lực ly tâm và xét dòng chảy ở bán cầu Bắc từ Bắc xuống Nam nên thành phần Coriolis nằm ngang bằng $2m\\omega\\upsilon\\sin\\varphi$ hướng sang bờ phải (bờ tây).',
    steps: [
      'Xác định chiều $\\vec\\omega$ (hướng cực Bắc), $\\vec\\upsilon$ (về Nam) và dùng quy tắc bàn tay phải tìm hướng $\\vec F_C = -2m(\\vec\\omega \\times \\vec\\upsilon)$.',
      'Lấy độ lớn thành phần nằm ngang $F_{C,\\text{ngang}} = 2m\\omega\\upsilon\\sin\\varphi$.',
      'Từ điều kiện mặt thoáng vuông góc hợp lực ($\\mathrm{tg}\\,\\theta = F_{C,\\text{ngang}}/mg$) tính độ chênh lệch $h = \\ell\\,\\mathrm{tg}\\,\\theta$.',
    ],
  },
  '3.13': {
    theoryRef: 'T3.4',
    principle: 'Có thể giải gọn ở hệ quy chiếu quán tính (vận tốc thực của tàu ở xích đạo là $\\omega R - \\upsilon$) hoặc ở hệ quy chiếu Trái Đất (cộng lực ly tâm $m\\omega^2 R$ và lực Coriolis hướng tâm $2m\\upsilon\\omega$).',
    condition: 'Tàu chạy từ Đông sang Tây, ngược chiều Trái Đất quay (Tây sang Đông), nên tốc độ tuyệt đối giảm đi thành $\\omega R - \\upsilon$.',
    steps: [
      'Chọn chiều hướng vào tâm Trái Đất: $mg - N = m a_{ht}$.',
      'Viết vận tốc tuyệt đối của tàu tại xích đạo khi đi về Tây: $\\upsilon_{qt} = \\omega R - \\upsilon$.',
      'Khai triển $\\frac{m(\\omega R - \\upsilon)^2}{R}$ để thấy rõ lần lượt lực ly tâm và lực Coriolis; kiểm tra dấu khi tàu chạy ngược lại về Đông.',
    ],
    check: {
      q: 'Nếu tàu quay đầu chạy từ TÂY sang ĐÔNG (cùng chiều tự quay của Trái Đất), áp lực lên đường ray sẽ thay đổi thế nào so với chạy về Tây?',
      options: [
        { text: 'Giảm xuống, vì lực Coriolis đổi hướng ra ngoài (giảm $N$ giống hiệu ứng ly tâm tăng)', ok: true, why: 'Đúng. Khi đi về Đông, tốc độ tuyệt đối là $\\omega R + \\upsilon$ lớn hơn nên $N$ giảm bớt $2m\\upsilon\\omega$ thay vì tăng thêm.' },
        { text: 'Không đổi vì lực ly tâm chỉ phụ thuộc $\\omega$ và $R$', ok: false, why: 'Lực ly tâm không đổi nhưng lực Coriolis phụ thuộc hướng vận tốc $\\vec\\upsilon$ của tàu.' },
      ],
    },
  },
  '3.14': {
    theoryRef: 'T3.4',
    principle: 'Trong hệ quy chiếu quay cùng cốc nước với tốc độ góc $\\omega$, mỗi phần tử nước trên mặt thoáng chịu trọng lực $mg$ hướng xuống và lực quán tính ly tâm $m\\omega^2 x$ hướng ra xa trục.',
    condition: 'Nước đã quay ổn định cùng tốc độ góc $\\omega$ với cốc (đứng yên tương đối so với cốc nên không có lực Coriolis).',
    steps: [
      'Trong hệ quy chiếu quay, xác định hai lực khối tác dụng lên phần tử nước tại khoảng cách $x$: $mg$ thẳng đứng và $m\\omega^2 x$ nằm ngang.',
      'Mặt thoáng đẳng thế luôn vuông góc với hợp lực, nên độ dốc tiếp tuyến thỏa $dy/dx = \\omega^2 x / g$.',
      'Tích phân theo $x$ từ trục quay ($x=0, y=0$) để thu được mặt paraboloid tròn xoay.',
    ],
  },

  // ----- Chương 4 -----
  '4.1': {
    theoryRef: 'T4.1',
    principle: 'Độ biến thiên động năng bằng tổng công của MỌI lực tác dụng (trọng lực và ma sát trượt); phản lực vuông góc đường đi nên công bằng 0.',
    condition: 'Dùng Định lý Động năng ngay cả khi có ma sát; không dùng bảo toàn cơ năng vì ma sát trượt sinh công âm.',
    steps: [
      'Xác định công của từng lực trên đoạn trượt lên $S$: trọng lực ($-mgS\\sin\\alpha$), ma sát ($-\\mu mgS\\cos\\alpha$), phản lực ($0$).',
      'Áp dụng $0 - \\tfrac12 m\\upsilon_0^2 = A_P + A_{ms}$ để rút gọn $m$ và tìm $S$.',
      'Thay $S$ vừa tìm vào công ma sát $A_{ms}$; kiểm tra dấu: $A_{ms} < 0$.',
    ],
  },
  '4.2': {
    theoryRef: 'T4.1',
    principle: 'Vật bắt đầu nghỉ và kết thúc cũng đứng yên ($\\Delta W_đ = 0$), nên tổng công trọng lực trên toàn hành trình cân bằng đúng với tổng công ma sát.',
    condition: 'Công trọng lực chỉ phụ thuộc độ cao $h$, còn công ma sát trên đoạn nghiêng dài $DC$ bằng $-\\mu mg\\cos\\alpha\\cdot DC = -\\mu mgl$ với $l$ là hình chiếu ngang!',
    steps: [
      'Tính công ma sát trên dốc: nhận ra $DC\\cos\\alpha = l$ nên tổng công ma sát hai đoạn rút gọn đẹp thành $-\\mu mgs$.',
      'Áp dụng định lý biến thiên cơ năng từ lúc nghỉ ở D đến lúc dừng ở B để giải ngay $\\mu = h/s$.',
      'Dùng ĐL II tính gia tốc từng đoạn; kiểm tra chiều dương từ C đến B khiến $a_{CB} < 0$ (chậm dần).',
    ],
    check: {
      q: 'Vì sao công của lực ma sát trên dốc nghiêng DC chỉ phụ thuộc hình chiếu ngang $AC = l$ mà không cần tính độ dài $DC$?',
      options: [
        { text: 'Vì lực ma sát tỉ lệ $\\cos\\alpha$ còn quãng đường là $l/\\cos\\alpha$, hai thừa số $\\cos\\alpha$ triệt tiêu nhau', ok: true, why: 'Đúng. $A_{ms,DC} = -\\mu mg\\cos\\alpha \\cdot (l/\\cos\\alpha) = -\\mu mgl$.' },
        { text: 'Vì trên dốc nghiêng không có lực ma sát', ok: false, why: 'Đề bài cho hệ số ma sát bằng nhau trên cả hai đoạn DC và CB.' },
      ],
    },
  },
  '4.3': {
    theoryRef: 'T4.2',
    principle: 'Không có ma sát và va chạm hoàn toàn đàn hồi với mặt sàn cứng nằm ngang nên toàn bộ cơ năng ban đầu $mgH$ được bảo toàn; ở đỉnh sau khi nảy vẫn còn động năng chuyển động ngang!',
    condition: 'Va chạm với mặt sàn nằm ngang giữ nguyên thành phần vận tốc ngang $\\upsilon_x$, chỉ đảo dấu $\\upsilon_y$; do đó tại điểm cao nhất sau nảy vật KHÔNG đứng yên mà vẫn bay ngang với vận tốc $\\upsilon_x$.',
    steps: [
      'Tính vận tốc rời mép dốc bằng bảo toàn cơ năng trên độ giảm cao $l\\sin30^\\circ = H/6$.',
      'Chiếu lấy vận tốc ngang $\\upsilon_x = \\upsilon\\cos30^\\circ$ — đại lượng không đổi suốt khi rơi và nảy lên.',
      'Viết bảo toàn cơ năng giữa trạng thái đầu và đỉnh sau khi nảy: $mgH = mgh_{\\max} + \\tfrac12 m\\upsilon_x^2$.',
    ],
    check: {
      q: 'Tại sao sau va chạm hoàn toàn đàn hồi với mặt ngang, quả cầu không nảy lên được đúng bằng độ cao ban đầu $H$?',
      options: [
        { text: 'Vì tại đỉnh cao nhất sau khi nảy, quả cầu vẫn còn vận tốc ngang $\\upsilon_x \\ne 0$ mang theo động năng $\\tfrac12 m\\upsilon_x^2$', ok: true, why: 'Đúng. Tổng cơ năng vẫn là $mgH$, nhưng một phần $\\tfrac18 mgH$ nằm ở động năng ngang nên thế năng cực đại chỉ còn $\\tfrac78 mgH$.' },
        { text: 'Vì va chạm đàn hồi vẫn làm mất một phần cơ năng thành nhiệt', ok: false, why: 'Va chạm hoàn toàn đàn hồi bảo toàn cơ năng; không mất nhiệt.' },
      ],
    },
  },
  '4.4': {
    theoryRef: 'T4.2',
    principle: 'Kết hợp bảo toàn cơ năng (để biết tốc độ rời mép dốc theo $H-h$) với động học ném ngang (tầm xa tỉ lệ $\\sqrt{h(H-h)}$).',
    condition: 'Trượt không ma sát nên tốc độ rời mép ngang chỉ phụ thuộc độ giảm thế năng $H - h$, không phụ thuộc hình dạng ngọn đồi.',
    steps: [
      'Từ bảo toàn cơ năng tìm $\\upsilon = \\sqrt{2g(H-h)}$ tại mép dốc độ cao $h$.',
      'Viết thời gian rơi tự do theo phương đứng $t = \\sqrt{2h/g}$ để biểu diễn tầm xa $S = \\upsilon t = 2\\sqrt{h(H-h)}$.',
      'Tìm cực đại của tích $h(H-h)$ khi tổng hai thừa số không đổi bằng $H$ (đạt tại $h = H/2$).',
    ],
    check: {
      q: 'Nếu nâng độ cao mép dốc $h$ lên quá cao gần sát $H$, chuyện gì làm tầm xa $S$ giảm đi?',
      options: [
        { text: 'Thời gian rơi $t$ tăng lên nhưng vận tốc ngang lúc rời mép $\\upsilon = \\sqrt{2g(H-h)}$ giảm mạnh về 0', ok: true, why: 'Đúng. Tầm xa $S = 2\\sqrt{h(H-h)}$ cân bằng giữa độ cao rơi $h$ và quãng lấy đà $H-h$.' },
        { text: 'Vận tốc ngang tăng nhưng thời gian bay bằng không', ok: false, why: 'Khi $h \\to H$ thì vật lấy đà ít nên $\\upsilon \\to 0$ chứ không tăng.' },
      ],
    },
  },
  '4.5': {
    theoryRef: 'T4.2',
    principle: 'Tách chuyển động thành hai giai đoạn: khi dây căng cả hệ bảo toàn cơ năng (hoặc dùng ĐL II), sau khi $m_2$ chạm đất dây bị chùng nên $m_1$ chỉ bay tự do như vật ném thẳng đứng lên.',
    condition: 'Lúc $m_2$ vừa chạm đất, dây chùng ngay lập tức ($T=0$), vật $m_1$ tiếp tục đi lên một mình mà KHÔNG kéo theo $m_2$.',
    steps: [
      'Giai đoạn 1 (dây căng): bảo toàn cơ năng cho hệ hai vật đi đoạn $h_2$ để tìm $\\upsilon^2$ ngay lúc $m_2$ chạm đất.',
      'Giai đoạn 2 (dây chùng): riêng $m_1$ đang ở độ cao $h_2$ bay lên thêm $\\Delta h = \\upsilon^2/(2g)$.',
      'Cộng $h_1 = h_2 + \\Delta h$; kiểm tra biên $n \\to 1 \\Rightarrow h_1 \\to h_2$ (hệ đứng yên).',
    ],
    check: {
      q: 'Sai lầm nào xảy ra nếu giữ nguyên phương trình bảo toàn cơ năng một mạch từ đầu đến lúc $m_1$ đạt độ cao cực đại $h_1$?',
      options: [
        { text: 'Lúc $m_2$ đập đất mất hết động năng vào va chạm mềm với đất, và sau đó dây chùng nên không được bỏ qua động năng $m_2$ lúc chạm đất', ok: true, why: 'Đúng. Khi $m_2$ chạm đất, một phần cơ năng ban đầu của hệ là động năng $\\tfrac12 m_2 \\upsilon^2$ bị tiêu tán khi $m_2$ dừng lại ở mặt đất!' },
        { text: 'Vì dây không dãn nên lực căng dây làm tổng cơ năng giai đoạn 1 không bảo toàn', ok: false, why: 'Lực căng là nội lực sinh tổng công bằng 0 khi hai vật đi cùng đoạn đường, nên giai đoạn 1 cơ năng hệ VẪN bảo toàn.' },
      ],
    },
  },
  '4.6': {
    theoryRef: 'T4.2',
    principle: 'Vật trượt trong máng tròn thẳng đứng vừa thỏa mãn bảo toàn cơ năng vừa thỏa phương trình hướng tâm $N + mg\\cos\\theta = m\\upsilon^2/R$; điểm rời máng xảy ra khi phản lực $N$ giảm xuống bằng 0.',
    condition: 'Tại đỉnh vòng tròn, vật không chỉ cần tới được đỉnh ($\\upsilon \\ge 0$) mà phải đủ nhanh để trọng lực không kéo rơi khỏi máng ($N \\ge 0 \\Rightarrow \\upsilon^2 \\ge gR$). Công thức phần b chỉ áp dụng cho nửa trên ($R < H\' < 2{,}5R$).',
    steps: [
      'Áp dụng định luật II theo phương hướng tâm tại điểm bất kỳ trên vòng tròn để biểu diễn phản lực $N$ theo $\\upsilon^2$ và độ cao.',
      'Ở đỉnh ($h=2R$), đặt $N \\ge 0 \\Rightarrow \\upsilon^2 \\ge gR$, ghép với bảo toàn cơ năng suy ra $H_{\\min} = 2{,}5R$.',
      'Với $R < H\' < 2{,}5R$, đặt $N = 0$ tại độ cao $h\'$ trên nửa vòng trên để giải ra $h\' = (2H\' + R)/3$.',
    ],
    check: {
      q: 'Vì sao thả vật từ độ cao $H = 2R$ (đúng bằng đỉnh vòng tròn) thì vật KHÔNG đi hết được vòng tròn dù không có ma sát?',
      options: [
        { text: 'Vì nếu đến được đỉnh thì $\\upsilon=0$, lực hướng tâm cần thiết bằng 0 trong khi trọng lực $mg$ vẫn kéo vật rơi xuống bên trong vòng', ok: true, why: 'Đúng. Trước khi lên tới đỉnh, ở một góc thuộc nửa trên, phản lực $N$ đã triệt tiêu về 0 và vật rời máng rơi vào trong theo quỹ đạo parabol.' },
        { text: 'Vì vật còn quay nên cần thêm động năng quay', ok: false, why: 'Đề giả thiết vật nhỏ trượt không quay; ngay cả trượt không quay vẫn phải thỏa $H \\ge 2{,}5R$.' },
      ],
    },
  },
  '4.7': {
    theoryRef: 'T4.3',
    principle: 'Va chạm đàn hồi trong không gian không bắt buộc hai vật chuyển động cùng một đường thẳng: phải bảo toàn ĐỘNG LƯỢNG dưới dạng véc-tơ (định lý Pythagore khi hai phương vuông góc) kết hợp bảo toàn ĐỘNG NĂNG.',
    condition: 'Vận tốc neutron sau va chạm vuông góc vận tốc đầu nên tam giác động lượng $\\vec P_C = \\vec p_{\\text{trước}} - \\vec p_{\\text{sau}}$ là tam giác vuông.',
    steps: [
      'Viết bảo toàn động lượng véc-tơ $\\vec p_1 = \\vec p_1\' + \\vec P_C$, bình phương hai vế khi $\\vec p_1 \\perp \\vec p_1\'$ được $P_C^2 = m^2(\\upsilon^2 + u^2)$.',
      'Thế $P_C^2/(2M)$ vào phương trình bảo toàn động năng $\\tfrac12 m\\upsilon^2 = \\tfrac12 mu^2 + \\frac{P_C^2}{2M}$.',
      'Rút tỉ số $n = \\upsilon^2/u^2 = (M+m)/(M-m)$; kiểm tra giới hạn $M \\to \\infty \\Rightarrow n \\to 1$ (bia đứng bất động nên neutron nảy không mất năng lượng).',
    ],
    check: {
      q: 'Trong tam giác động lượng của neutron trước, neutron sau và hạt nhân carbon sau va chạm, cạnh nào là cạnh huyền?',
      options: [
        { text: 'Động lượng hạt nhân carbon sau va chạm $\\vec P_C$, vì $\\vec P_C = \\vec p_{\\text{trước}} - \\vec p_{\\text{sau}}$ và hai véc-tơ kia vuông góc', ok: true, why: 'Đúng. Do đó $P_C^2 = p_{\\text{trước}}^2 + p_{\\text{sau}}^2$.' },
        { text: 'Động lượng neutron trước va chạm', ok: false, why: 'Neutron trước va chạm vuông góc với neutron sau va chạm nên đó là hai cạnh góc vuông.' },
      ],
    },
  },
  '4.8': {
    theoryRef: 'T4.3',
    principle: 'Tách làm hai giai đoạn liên tiếp: va chạm mềm bảo toàn động lượng ngang (cơ năng giảm thành nội năng), sau va chạm mới bảo toàn cơ năng để nâng con lắc lên góc $\\alpha$.',
    condition: 'Không áp dụng bảo toàn cơ năng cho giai đoạn đạn găm vào vật M; phần trăm năng lượng mất tính trên động năng ban đầu nhân 100%.',
    steps: [
      'Giai đoạn 1 (va chạm mềm): $m\\upsilon = (M+m)V$.',
      'Giai đoạn 2 (con lắc đi lên): $\\tfrac12(M+m)V^2 = (M+m)gl(1-\\cos\\alpha)$ tìm được $V$, suy ngược ra $\\upsilon$.',
      'Tính phần trăm mất mát $\\frac{\\Delta W}{W_{đ,\\text{đầu}}} = \\frac{M}{M+m}\\cdot 100\\%$; kiểm tra $M \\gg m \\Rightarrow$ mất gần 100%.',
    ],
    check: {
      q: 'Nếu khối lượng bao cát $M$ lớn gấp 99 lần khối lượng viên đạn $m$, phần trăm động năng ban đầu của đạn bị chuyển thành nội năng là bao nhiêu?',
      options: [
        { text: '99%, vì phần mất là $\\frac{M}{M+m}\\cdot 100\\%$', ok: true, why: 'Đúng! Phần lớn động năng viên đạn biến thành nhiệt và biến dạng; chỉ 1% biến thành động năng con lắc đi lên.' },
        { text: '1%, vì va chạm chỉ làm mất một phần nhỏ', ok: false, why: 'Ngược lại: tỉ lệ còn lại dưới dạng cơ năng mới là $\\frac{m}{M+m} = 1\\%$.' },
      ],
    },
  },
  '4.9': {
    theoryRef: 'T4.3',
    principle: 'Trong khoảnh khắc ném rất ngắn, bỏ qua xung lượng ma sát nên hệ người + đá bảo toàn động lượng ngang; sau khi rời tay mới dùng định lý động năng với lực ma sát để tìm quãng đường giật lùi.',
    condition: 'Vận tốc $v = 8$ m/s của đá lấy so với mặt đất (theo quy ước đáp số PDF), nên dùng trực tiếp $MV + mv = 0$.',
    steps: [
      'Giai đoạn 1 (ném đá): $0 = mv - MV \\Rightarrow V = mv/M$.',
      'Giai đoạn 2 (trượt lùi trên băng): công ma sát $-\\mu MgS = 0 - \\tfrac12 MV^2$.',
      'Khử $M$ ở giai đoạn 2 và thay $V$; kiểm tra định tính: $M$ càng lớn thì giật lùi càng ngắn.',
    ],
    check: {
      q: 'Nếu người vẫn ném đá đi với vận tốc $v = 8$ m/s nhưng hiểu là vận tốc SO VỚI NGƯỜI sau khi giật lùi thì kết quả có giống không?',
      options: [
        { text: 'Khác: khi đó vận tốc đá so với đất chỉ là $v - V$, nên mẫu số sẽ là $M + m$ thay vì $M$', ok: true, why: 'Đúng. Khi $m \\ll M$ hai giá trị gần nhau, nhưng phân biệt rõ hệ quy chiếu của vận tốc ném là nguyên tắc bắt buộc trong bảo toàn động lượng.' },
        { text: 'Hoàn toàn giống nhau vì vận tốc tương đối bằng vận tốc tuyệt đối', ok: false, why: 'Người bị giật lùi về phía sau nên vận tốc đá so với đất nhỏ hơn vận tốc đá so với người.' },
      ],
    },
  },
  '4.10': {
    theoryRef: 'T4.3',
    principle: 'Xung lượng phản lực đường ray giữ phương đứng cân bằng khi bắn chếch lên, nhưng theo phương ngang không có ma sát nên tổng động lượng ngang của hệ (xe+súng+đạn) bảo toàn.',
    condition: 'Nòng súng bắn về phía trước với vận tốc $\\upsilon$ SO VỚI SÚNG (khi xe đã lùi tốc độ còn $V/3$), nên vận tốc ngang của đạn so với đất là $V/3 + \\upsilon\\cos\\alpha$. Đáp số PDF dùng xấp xỉ $m \\ll M$.',
    steps: [
      'Chọn trục ngang theo chiều xe chạy; viết tổng động lượng ngang trước bắn $(M+m)V$.',
      'Viết tổng động lượng ngang sau bắn bằng tổng của xe ($MV/3$) và thành phần ngang của đạn ($m(V/3 + \\upsilon\\cos\\alpha)$).',
      'Giải ra $\\upsilon$, nhận xét khi $m \\ll M$ thì $(M+m) \\approx M$ khớp với đáp số PDF.',
    ],
    check: {
      q: 'Vì sao chỉ bảo toàn động lượng theo phương NGANG mà KHÔNG bảo toàn động lượng theo phương THẲNG ĐỨNG khi bắn đạn chếch góc $\\alpha$?',
      options: [
        { text: 'Vì khi đạn giật xuống, đường ray tác dụng thêm xung phản lực thẳng đứng lên xe khiến tổng ngoại lực đứng khác 0', ok: true, why: 'Đúng. Còn theo phương ngang bỏ qua ma sát nên ngoại lực ngang bằng 0.' },
        { text: 'Vì đạn không có thành phần vận tốc thẳng đứng', ok: false, why: 'Nòng súng chếch góc $\\alpha > 0$ nên đạn có thành phần vận tốc thẳng đứng $\\upsilon\\sin\\alpha$.' },
      ],
    },
  },
};
