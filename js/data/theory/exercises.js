// Bộ bài tập lý thuyết theo logic cho cả 11 chương PHY1159 (choice, order, formula).
const t = String.raw;

export const THEORY_EXERCISES = [
  // ----- Chương 1 -----
  {
    id: 'L1.1', ch: 1, stage: 'T1.1', kind: 'order',
    title: 'Quy trình xây dựng thuyết vật lý thực nghiệm',
    prompt: 'Sắp xếp 5 bước nghiên cứu của vật lý học theo đúng mạch logic thực nghiệm (Slide Chương 1):',
    steps: [
      'Quan sát hiện tượng tự nhiên và đặt câu hỏi định lượng.',
      'Thực hiện thí nghiệm định tính và định lượng để đo các đại lượng liên quan.',
      'Xử lý số liệu đo để tìm quy luật và đề xuất giả thuyết.',
      'Hệ thống hóa giả thuyết, định luật và hệ quả thành thuyết vật lý.',
      'Kiểm chứng giới hạn đúng của lý thuyết và ứng dụng vào thực tiễn.',
    ],
    why: 'Kiến thức vật lý đi từ quan sát và đo lường → quy luật thực nghiệm → giả thuyết/định luật → lý thuyết hoàn chỉnh → kiểm chứng ứng dụng, không tự suy đoán tách rời đo lường.',
  },
  {
    id: 'L1.2', ch: 1, stage: 'T1.2', kind: 'choice',
    title: 'Giới hạn của phép kiểm tra thứ nguyên',
    q: t`Trong một bài làm, sinh viên rút ra chu kỳ con lắc lò xo là $T = 4\pi \sqrt{\dfrac{m}{k}}$ (với $[k] = [F]/L = M/T^2$). Phân tích thứ nguyên cho ta kết luận nào chính xác nhất?`,
    options: [
      {
        text: t`Thứ nguyên hai vế khớp nhau, nhưng vẫn chưa kết luận được hệ số $4\pi$ đúng hay sai`,
        ok: true,
        why: t`Đúng. $\sqrt{M/(M/T^2)} = T$ nên công thức đúng về thứ nguyên; nhưng phân tích thứ nguyên không phát hiện được sai số ở hằng số không thứ nguyên ($4\pi$ thay vì $2\pi$).`,
      },
      {
        text: 'Vì thứ nguyên hai vế khớp nên công thức chắc chắn đúng hoàn toàn',
        ok: false,
        why: 'Đúng thứ nguyên là điều kiện cần, chưa phải điều kiện đủ để khẳng định hệ số số học phía trước.',
      },
      {
        text: t`Thứ nguyên của $\sqrt{m/k}$ là $1/T$ nên công thức sai ngay từ thứ nguyên`,
        ok: false,
        why: t`Kiểm tra lại: $k = F/x$ có thứ nguyên $(M L/T^2)/L = M/T^2$, nên $m/k$ có thứ nguyên $T^2$ và $\sqrt{m/k}$ có thứ nguyên $T$.`,
      },
    ],
  },
  {
    id: 'L1.3', ch: 1, stage: 'T1.2', kind: 'formula',
    title: 'Tìm thứ nguyên của Công và Áp suất',
    prompt: t`Từ $[F] = M L / T^2$, hãy biểu diễn thứ nguyên của công cơ học $[A]$ ($A = F s$) và áp suất $[p]$ ($p = F / S$) theo các thứ nguyên cơ bản $M$, $L$, $T$.`,
    hint: 'Dùng chữ hoa M, L, T đúng như trong đề (ví dụ M*L/T^2).',
    vars: { M: [1, 10], L: [1, 10], T: [1, 10] },
    targets: [
      { key: 'A', sym: '[A]', label: 'Thứ nguyên của công', unit: '', expr: 'M*L^2/T^2', pdfExpr: 'M L^2 T^{-2}' },
      { key: 'p', sym: '[p]', label: 'Thứ nguyên của áp suất', unit: '', expr: 'M/(L*T^2)', pdfExpr: 'M L^{-1} T^{-2}' },
    ],
    why: t`Vì $[s] = L$ và $[S] = L^2$, nên $[A] = (M L/T^2)\cdot L = M L^2/T^2$ và $[p] = (M L/T^2)/L^2 = M/(L T^2)$.`,
  },

  // ----- Chương 2 -----
  {
    id: 'L2.1', ch: 2, stage: 'T2.1', kind: 'choice',
    title: 'Tốc độ không đổi có đồng nghĩa với gia tốc bằng không?',
    q: t`Một chất điểm chuyển động tròn đều trên đường tròn bán kính $R$ với tốc độ $\upsilon$ không đổi. Phát biểu nào mô tả đúng trạng thái gia tốc của chất điểm?`,
    options: [
      {
        text: t`Gia tốc tiếp tuyến $a_t = 0$, nhưng gia tốc toàn phần khác 0 vì còn gia tốc pháp tuyến $a_n = \upsilon^2/R$`,
        ok: true,
        why: t`Đúng. $a_t = d\upsilon/dt = 0$ chỉ nói độ lớn không đổi; phương của $\vec\upsilon$ liên tục quay vào tâm nên $a_n = \upsilon^2/R \ne 0$.`,
      },
      {
        text: 'Vì tốc độ không đổi nên gia tốc bằng 0',
        ok: false,
        why: t`Gia tốc là đạo hàm của VÉC-TƠ vận tốc $\vec\upsilon$, không phải của tốc độ vô hướng $\upsilon$. Đổi phương cũng sinh gia tốc.`,
      },
      {
        text: 'Gia tốc khác 0 nhưng luôn tiếp tuyến với quỹ đạo để giữ vật đi theo vòng tròn',
        ok: false,
        why: 'Gia tốc giữ quỹ đạo cong phải hướng về phía lõm (vuông góc với vận tốc), không phải tiếp tuyến.',
      },
    ],
  },
  {
    id: 'L2.2', ch: 2, stage: 'T2.2', kind: 'order',
    title: 'Mạch suy luận bán kính cong của quỹ đạo ném xiên',
    prompt: t`Sắp xếp chuỗi suy luận để tìm bán kính cong $R$ của quỹ đạo ném xiên từ vận tốc đầu $\upsilon_0$, góc ném $\alpha$ (nền cho Bài 2.6):`,
    steps: [
      t`Bỏ qua sức cản nên tại mọi điểm vật chỉ có gia tốc trọng trường $\vec a = \vec g$ hướng thẳng đứng xuống.`,
      t`Phân tích $\vec a$ theo phương vuông góc với $\vec\upsilon$ để tìm gia tốc pháp tuyến $a_n = \upsilon^2/R$.`,
      t`Tại điểm cao nhất, $\vec\upsilon$ nằm ngang có độ lớn $\upsilon_0\cos\alpha$ và vuông góc $\vec g$, nên $a_n = g$ và $R_B = \upsilon_0^2\cos^2\alpha/g$.`,
      t`Tại điểm chạm đất đối xứng, $\upsilon = \upsilon_0$ hợp phương ngang góc $\alpha$, nên thành phần vuông góc $\vec\upsilon$ là $a_n = g\cos\alpha$ và $R_C = \upsilon_0^2/(g\cos\alpha)$.`,
    ],
    why: t`Bán kính cong tại điểm bất kỳ luôn rút từ $R = \upsilon^2/a_n$, trong đó $a_n$ là hình chiếu của tổng gia tốc $\vec g$ lên pháp tuyến quỹ đạo.`,
  },
  {
    id: 'L2.3', ch: 2, stage: 'T2.3', kind: 'formula',
    title: 'Thiết lập công thức tầm xa ném xiên',
    prompt: t`Từ $x = \upsilon_0\cos\alpha\cdot t$ và $y = \upsilon_0\sin\alpha\cdot t - \tfrac12 g t^2$, khử thời gian bay để lập biểu thức tầm xa $L$ khi vật trở về độ cao $y = 0$.`,
    vars: { v0: [5, 30], alpha: [0.2, 1.3], g: [9, 10] },
    targets: [
      { key: 'L', sym: 'L', label: 'Tầm xa ném xiên', unit: 'm', expr: 'v0^2*sin(2*alpha)/g', pdfExpr: t`L = \dfrac{\upsilon_0^2\sin 2\alpha}{g}` },
    ],
    why: t`Vật về $y=0$ ở $t = 2\upsilon_0\sin\alpha/g$. Thay vào $x$: $L = \upsilon_0\cos\alpha \cdot \tfrac{2\upsilon_0\sin\alpha}{g} = \tfrac{\upsilon_0^2\sin 2\alpha}{g}$.`,
  },

  // ----- Chương 3 -----
  {
    id: 'L3.1', ch: 3, stage: 'T3.1', kind: 'choice',
    title: 'Phân biệt lực thật và ngộ nhận Định luật III',
    q: t`Khi một hòn đá được ném trượt lên mặt dốc có ma sát (sau khi đã rời tay), lập luận nào sau đây ĐÚNG theo Định luật Newton trong hệ quy chiếu mặt đất?`,
    options: [
      {
        text: 'Chỉ còn trọng lực, phản lực của dốc và lực ma sát; không còn lực ném nào tác dụng lên hòn đá',
        ok: true,
        why: 'Sau khi rời tay, tay không còn tiếp xúc hòn đá nữa nên lực ném chấm dứt. Vật đi lên được nhờ vận tốc ban đầu (quán tính) và bị trọng lực + ma sát làm chậm dần.',
      },
      {
        text: 'Phải vẽ thêm lực ném hướng lên dốc vì vật vẫn đang đi lên',
        ok: false,
        why: 'Chuyển động không cần lực cùng chiều để duy trì; lực chỉ quyết định gia tốc (sự thay đổi vận tốc).',
      },
      {
        text: 'Trọng lực và phản lực của mặt dốc là cặp lực – phản lực của Định luật III nên luôn cân bằng nhau',
        ok: false,
        why: 'Cặp Định luật III đặt lên HAI vật khác nhau (dốc đẩy vật và vật đè dốc), còn trọng lực và phản lực cùng đặt lên một vật và trên dốc nghiêng thậm chí không cùng phương.',
      },
    ],
  },
  {
    id: 'L3.2', ch: 3, stage: 'T3.2', kind: 'choice',
    title: 'Bản chất lực hướng tâm trong hệ quy chiếu quán tính',
    q: 'Khi giải bài con lắc nón (Bài 3.3) trong hệ quy chiếu mặt đất, có nên vẽ thêm một mũi tên "lực hướng tâm" bên cạnh trọng lực và lực căng dây không?',
    options: [
      {
        text: 'Không: lực hướng tâm chỉ là tên gọi của hợp lực theo phương hướng tâm do P và T tạo ra',
        ok: true,
        why: t`Đúng. Nếu vẽ thêm $F_{ht}$ cùng $P$ và $T$ sẽ bị đếm trùng lực hai lần khi viết $\sum\vec F = m\vec a$.`,
      },
      {
        text: 'Có: vì chuyển động tròn luôn phải có một lực hướng tâm riêng tác dụng lên vật',
        ok: false,
        why: 'Mọi lực thật đều phải do một vật cụ thể tác dụng (Trái Đất hút, dây kéo); không có vật nào sinh ra một lực riêng tên "hướng tâm".',
      },
      {
        text: 'Không cần lực hướng tâm, chỉ cần thêm lực ly tâm kéo ra ngoài để vật cân bằng',
        ok: false,
        why: 'Lực ly tâm chỉ xuất hiện nếu bạn đổi sang hệ quy chiếu quay gắn với vật. Ở hệ quy chiếu mặt đất, vật có gia tốc hướng tâm nên hợp lực phải khác không.',
      },
    ],
  },
  {
    id: 'L3.3', ch: 3, stage: 'T3.3', kind: 'order',
    title: 'Chứng minh công thức tên lửa Tsiolkovsky',
    prompt: 'Sắp xếp trình tự suy luận công thức vận tốc tên lửa $\\upsilon = u\\ln(m_0/m)$ (Slide 3.3):',
    steps: [
      t`Coi hệ tên lửa + khối khí phụt là cô lập nên tổng động lượng $\vec P$ bảo toàn trong khoảng phụt $dm$.`,
      t`Viết động lượng trước và sau khi phụt $dm$ với vận tốc khí là $\vec\upsilon + \vec u$: $m\vec\upsilon = (m - dm)(\vec\upsilon + d\vec\upsilon) + dm(\vec\upsilon + \vec u)$.`,
      t`Bỏ qua số hạng vô cùng nhỏ bậc hai $dm\,d\vec\upsilon$ thu được $m\,d\vec\upsilon + \vec u\,dm = 0$.`,
      t`Chiếu ngược chiều phụt khí và tích phân từ $(m_0, \upsilon_0=0)$ đến $(m, \upsilon)$ được $\upsilon = u\ln(m_0/m)$.`,
    ],
    why: 'Khối lượng của tên lửa giảm dần ($dm < 0$ nếu xét tăng khối lượng khí, hoặc $m$ giảm từ $m_0$ về $m$) nên phải tích phân phương trình bảo toàn động lượng vi phân.',
  },
  {
    id: 'L3.4', ch: 3, stage: 'T3.3', kind: 'formula',
    title: 'Lập công thức Tsiolkovsky cho tên lửa',
    prompt: t`Tên lửa khối lượng đầu $m_0$ xuất phát từ nghỉ, phụt khí với tốc độ không đổi $u$ so với tên lửa. Khi khối lượng còn lại $m$ ($m < m_0$), lập biểu thức độ lớn vận tốc $\upsilon$.`,
    vars: { u: [500, 3000], m0: [10, 50], m: [1, 9] },
    targets: [
      { key: 'v', sym: t`\upsilon`, label: 'Vận tốc tên lửa', unit: 'm/s', expr: 'u*ln(m0/m)', pdfExpr: t`\upsilon = u\ln\dfrac{m_0}{m}` },
    ],
    why: t`Tích phân $\int_0^\upsilon d\upsilon = -u \int_{m_0}^{m} \frac{dm'}{m'} = u\ln\frac{m_0}{m}$.`,
  },
  {
    id: 'L3.5', ch: 3, stage: 'T3.4', kind: 'choice',
    title: 'Điều kiện xuất hiện lực quán tính và lực Coriolis',
    q: t`Trong hệ quy chiếu gắn với Trái Đất đang quay với vận tốc góc $\vec\omega$, khi nào một vật chịu thêm lực Coriolis $\vec F_C = -2m(\vec\omega \times \vec\upsilon')$?`,
    options: [
      {
        text: t`Chỉ khi vật có vận tốc $\vec\upsilon' \ne 0$ đối với mặt đất (và không song song trục quay Trái Đất)`,
        ok: true,
        why: t`Đúng. Nếu vật đứng yên trên mặt đất ($\vec\upsilon' = 0$) thì lực Coriolis bằng 0, vật chỉ chịu lực quán tính ly tâm $-m\omega^2\vec r_\perp$.`,
      },
      {
        text: 'Mọi vật có khối lượng trên Trái Đất đều chịu lực Coriolis kể cả khi nằm yên trên bàn',
        ok: false,
        why: t`Vật nằm yên chịu lực ly tâm do quay, nhưng $\vec F_C$ tỉ lệ với $\vec\upsilon'$ nên bằng 0 khi vật đứng yên so với Trái Đất.`,
      },
      {
        text: 'Lực Coriolis là lực hút do Trái Đất tác dụng nên có phản lực đặt vào tâm Trái Đất',
        ok: false,
        why: 'Lực Coriolis và lực ly tâm đều là lực quán tính (lực ảo), không có vật tác dụng và không có cặp phản lực theo Định luật III.',
      },
    ],
  },

  // ----- Chương 4 -----
  {
    id: 'L4.1', ch: 4, stage: 'T4.2', kind: 'order',
    title: 'Chứng minh Định lý biến thiên cơ năng',
    prompt: 'Sắp xếp chuỗi logic chứng minh định lý $W_2 - W_1 = A_{kt}$ (Slide 4.4.2):',
    steps: [
      t`Phân chia mọi lực tác dụng lên chất điểm thành hai nhóm: lực thế $\vec F_t$ và lực không thế $\vec F_{kt}$.`,
      t`Viết Định lý Động năng cho mọi lực: $W_{đ2} - W_{đ1} = A_t + A_{kt}$.`,
      t`Thay công của lực thế theo Định lý Thế năng: $A_t = W_{t1} - W_{t2}$.`,
      t`Chuyển vế gộp động năng và thế năng cùng thời điểm: $(W_{đ2}+W_{t2}) - (W_{đ1}+W_{t1}) = A_{kt}$.`,
    ],
    why: 'Định lý biến thiên cơ năng thực chất là hệ quả trực tiếp khi ghép Định lý Động năng (đúng cho mọi lực) với định nghĩa Thế năng (chỉ tách riêng công của lực thế).',
  },
  {
    id: 'L4.2', ch: 4, stage: 'T4.3', kind: 'choice',
    title: 'Chọn đúng định luật bảo toàn cho hai giai đoạn con lắc thử đạn',
    q: t`Trong bài con lắc thử đạn (Bài 4.8: đạn bay ngang cắm vào bao cát treo dây rồi cùng lên tới góc lệch $\alpha$), vì sao KHÔNG viết ngay $\tfrac12 m\upsilon^2 = (M+m)gl(1-\cos\alpha)$?`,
    options: [
      {
        text: 'Vì quá trình đạn găm vào vật là va chạm mềm, phần lớn động năng biến thành nội năng nên cơ năng KHÔNG bảo toàn lúc va chạm',
        ok: true,
        why: 'Phải tách 2 giai đoạn: (1) trong va chạm ngắn bảo toàn động lượng ngang để tìm vận tốc ngay sau va chạm $V$; (2) từ sau va chạm trở đi mới dùng bảo toàn cơ năng.',
      },
      {
        text: 'Vì lực căng dây làm tổng động lượng không bảo toàn theo phương ngang',
        ok: false,
        why: 'Ngay lúc va chạm ngắn dây còn thẳng đứng nên lực căng dây và trọng lực đều thẳng đứng, không gây xung lực theo phương ngang; động lượng ngang VẪN bảo toàn.',
      },
      {
        text: 'Vì sau khi găm vào vật, lực ma sát của không khí làm cơ năng không bảo toàn khi con lắc đi lên',
        ok: false,
        why: 'Đề bỏ qua cản không khí nên giai đoạn đi lên sau va chạm vẫn bảo toàn cơ năng; phần năng lượng mất xảy ra ngay ở va chạm mềm.',
      },
    ],
  },
  {
    id: 'L4.3', ch: 4, stage: 'T4.3', kind: 'formula',
    title: 'Năng lượng tiêu hao trong va chạm mềm',
    prompt: t`Vật $m_1$ chuyển động với tốc độ $\upsilon_1$ đến va chạm mềm (dính vào) vật $m_2$ đang đứng yên. Lập biểu thức phần động năng $\Delta W = W_{đ1} - W_{đ2}$ chuyển thành nội năng.`,
    vars: { m1: [1, 10], m2: [1, 10], v1: [1, 20] },
    targets: [
      { key: 'dW', sym: t`\Delta W`, label: 'Động năng chuyển thành nội năng', unit: 'J', expr: 'm1*m2*v1^2/(2*(m1 + m2))', pdfExpr: t`\Delta W = \dfrac{m_1 m_2 \upsilon_1^2}{2(m_1 + m_2)}` },
    ],
    why: t`Bảo toàn động lượng cho $V = \frac{m_1\upsilon_1}{m_1+m_2}$. Lấy $\frac12 m_1\upsilon_1^2 - \frac12(m_1+m_2)V^2$ rút gọn được $\frac{m_1 m_2}{2(m_1+m_2)}\upsilon_1^2$.`,
  },

  // ----- Chương 5 -----
  {
    id: 'L5.1', ch: 5, stage: 'T5.3', kind: 'order',
    title: 'Chứng minh Định lý biến thiên mômen động lượng',
    prompt: 'Sắp xếp chuỗi logic chứng minh $\\frac{d\\vec L}{dt} = \\vec M_{ng}$ cho hệ chất điểm (Slide 5.5.2):',
    steps: [
      t`Xuất phát từ định nghĩa mômen động lượng toàn hệ $\vec L = \sum \vec r_i \times m_i\vec\upsilon_i$.`,
      t`Lấy đạo hàm theo thời gian bằng quy tắc tích: $\frac{d\vec L}{dt} = \sum \left(\vec\upsilon_i \times m_i\vec\upsilon_i + \vec r_i \times m_i\vec a_i\right)$.`,
      t`Nhận xét $\vec\upsilon_i \times m_i\vec\upsilon_i = 0$ (cùng phương) và thay $m_i\vec a_i = \vec f_i + \vec F_i$.`,
      t`Triệt tiêu tổng mômen nội lực $\sum \vec r_i \times \vec f_i = 0$ theo Định luật III Newton để còn $\sum \vec r_i \times \vec F_i = \vec M_{ng}$.`,
    ],
    why: 'Tương tự phương trình khối tâm, chính Định luật III Newton (cặp nội lực trực đối cùng giá) làm tổng mômen nội lực triệt tiêu sạch.',
  },
  {
    id: 'L5.2', ch: 5, stage: 'T5.2', kind: 'choice',
    title: 'Bảo toàn mômen động lượng khi có ma sát nội bộ',
    q: 'Hai đĩa đồng trục quay tự do với tốc độ góc khác nhau $\\omega_1, \\omega_2$. Khi thả đĩa trên rơi xuống đĩa dưới, ma sát giữa hai mặt đĩa làm chúng quay chung tốc độ góc $\\omega$. Đại lượng nào bảo toàn?',
    options: [
      {
        text: 'Tổng mômen động lượng bảo toàn vì ma sát giữa hai đĩa là nội lực; động năng quay giảm do ma sát sinh nhiệt',
        ok: true,
        why: 'Đúng (Bài 5.7 PDF). Cặp lực ma sát giữa hai đĩa có mômen trực đối triệt tiêu nhau nên $\\sum M_{ng} = 0 \\Rightarrow L = \\text{const}$, còn công ma sát trượt làm giảm động năng.',
      },
      {
        text: 'Cả mômen động lượng lẫn động năng quay đều bảo toàn vì trục quay không có ma sát',
        ok: false,
        why: 'Trục không ma sát chỉ giữ cho $M_{ng} = 0$; giữa hai đĩa có ma sát trượt nên quá trình ghép đĩa giống va chạm mềm quay, luôn hao hụt động năng.',
      },
      {
        text: 'Cả mômen động lượng lẫn động năng đều giảm vì lực ma sát sinh mômen cản',
        ok: false,
        why: 'Ma sát làm đĩa nhanh chậm lại và làm đĩa chậm nhanh lên với hai mômen bằng nhau ngược dấu, nên tổng mômen động lượng không đổi.',
      },
    ],
  },
  {
    id: 'L5.3', ch: 5, stage: 'T5.2', kind: 'formula',
    title: 'Áp dụng định lý Steiner–Huygens cho thanh mảnh',
    prompt: t`Biết mômen quán tính của thanh mảnh đồng chất khối lượng $m$, dài $L$ đối với trục vuông góc qua trung điểm là $I_0 = \tfrac{1}{12}mL^2$. Lập mômen quán tính $I$ đối với trục song song đi qua một đầu thanh.`,
    vars: { m: [1, 10], L: [0.5, 5] },
    targets: [
      { key: 'I', sym: 'I', label: 'Mômen quán tính qua đầu thanh', unit: 'kg·m²', expr: 'm*L^2/3', pdfExpr: t`I = \dfrac{1}{3}mL^2` },
    ],
    why: t`Khoảng cách từ trung điểm (khối tâm) đến đầu thanh là $d = L/2$. Theo Steiner–Huygens: $I = \tfrac{1}{12}mL^2 + m(L/2)^2 = \tfrac13 mL^2$.`,
  },

  // ----- Chương 6 -----
  {
    id: 'L6.1', ch: 6, stage: 'T6.2', kind: 'choice',
    title: 'Định luật Kepler II từ bản chất trường xuyên tâm',
    q: 'Vì sao hành tinh chuyển động quanh Mặt Trời luôn đi nhanh hơn khi ở cận điểm (gần Mặt Trời) và chậm hơn khi ở viễn điểm?',
    options: [
      {
        text: t`Lực hấp dẫn là lực xuyên tâm nên mômen lực đối với Mặt Trời bằng 0; mômen động lượng $\vec L = \vec r \times m\vec\upsilon$ bảo toàn, nên $r$ giảm thì $\upsilon$ tăng`,
        ok: true,
        why: 'Đúng. Khi $r$ nhỏ nhất (cận điểm), $\\vec r \\perp \\vec\\upsilon$ nên $L = m r \\upsilon$; $L$ không đổi buộc $\\upsilon$ cực đại tại cận điểm. Điều này tương đương định luật diện tích Kepler II.',
      },
      {
        text: 'Vì cơ năng ở cận điểm lớn hơn ở viễn điểm',
        ok: false,
        why: 'Lực hấp dẫn là lực thế nên cơ năng $E = \\tfrac12 m\\upsilon^2 - GMm/r$ không đổi dọc toàn quỹ đạo; thế năng âm nhỏ hơn kéo động năng lớn hơn, và định luật diện tích gắn trực tiếp với bảo toàn $\\vec L$.',
      },
      {
        text: 'Vì ở gần Mặt Trời, lực hấp dẫn có thêm thành phần tiếp tuyến đẩy hành tinh tăng tốc',
        ok: false,
        why: 'Với quỹ đạo tròn thì vuông góc; với ellipse lực hướng tâm vẫn tạo thành phần tiếp tuyến khi $r$ thay đổi, nhưng quy luật định lượng cho tốc độ quét diện tích xuất phát từ bảo toàn $\\vec L$.',
      },
    ],
  },
  {
    id: 'L6.2', ch: 6, stage: 'T6.3', kind: 'order',
    title: 'Tìm vận tốc vũ trụ cấp II bằng bảo toàn cơ năng',
    prompt: 'Sắp xếp chuỗi logic xác định vận tốc thoát $\\upsilon_2$ từ bề mặt hành tinh bán kính $R$, khối lượng $M$:',
    steps: [
      t`Chọn mốc thế năng hấp dẫn ở vô cực $U(\infty) = 0$ nên tại mặt hành tinh $U(R) = -G\frac{Mm}{R}$.`,
      t`Áp dụng bảo toàn cơ năng vì chỉ có trọng trường hấp dẫn là lực thế tác dụng sau khi phóng.`,
      t`Đặt điều kiện thoát tối thiểu khi vật ra tới $r \to \infty$ vừa dừng ($\upsilon_\infty = 0$), tức tổng cơ năng $E = 0$.`,
      t`Giải $\frac12 m\upsilon_2^2 - G\frac{Mm}{R} = 0$ để thu được $\upsilon_2 = \sqrt{2GM/R} = \sqrt{2}\upsilon_1$.`,
    ],
    why: 'Vì thế năng hấp dẫn mang dấu âm, cần động năng ban đầu đúng bằng $|U(R)|$ để tổng cơ năng không âm và tàu không bị kéo quay lại.',
  },
  {
    id: 'L6.3', ch: 6, stage: 'T6.2', kind: 'formula',
    title: 'Chu kỳ quỹ đạo ellipse từ định luật Kepler III',
    prompt: t`Hành tinh chuyển động quanh Mặt Trời khối lượng $M$ trên quỹ đạo ellipse có khoảng cách cực tiểu $r$ và cực đại $R$ (Bài 6.4 PDF). Lập biểu thức chu kỳ quay $T$ theo $r, R, G, M$.`,
    vars: { r: [1, 5], R: [6, 15], G: [1, 5], M: [1, 10] },
    targets: [
      { key: 'T', sym: 'T', label: 'Chu kỳ quay', unit: 's', expr: 'pi*sqrt((r+R)^3/(2*G*M))', pdfExpr: t`T = \pi\sqrt{\dfrac{(r+R)^3}{2GM}}` },
    ],
    why: t`Bán trục lớn ellipse là $a = \frac{r+R}{2}$. Thay vào Kepler III $T = 2\pi\sqrt{\frac{a^3}{GM}}$ được $T = \pi\sqrt{\frac{(r+R)^3}{2GM}}$.`,
  },

  // ----- Chương 7 -----
  {
    id: 'L7.1', ch: 7, stage: 'T7.2', kind: 'choice',
    title: 'Nhận diện thời gian riêng và chiều dài riêng',
    q: t`Một hạt không bền sống được thời gian riêng $\tau_0$ khi đứng yên trong phòng thí nghiệm. Khi nó bay qua phòng thí nghiệm với tốc độ $\upsilon = 0{,}8c$, quan sát viên trong phòng thí nghiệm đo được thời gian sống của hạt là bao nhiêu?`,
    options: [
      {
        text: t`$\tau = \gamma\tau_0 > \tau_0$, vì thời gian sống ngắn nhất $\tau_0$ chỉ đo được trong hệ quy chiếu gắn với hạt`,
        ok: true,
        why: t`Đúng. Hai sự kiện (hạt sinh ra và phân rã) xảy ra tại cùng một điểm trong hệ gắn với hạt nên $\tau_0$ là thời gian riêng; người đứng ở phòng thí nghiệm thấy hạt bay lâu hơn ($\gamma = 5/3$).`,
      },
      {
        text: t`$\tau = \tau_0/\gamma < \tau_0$, vì thời gian bị co ngắn khi chuyển động nhanh`,
        ok: false,
        why: 'Chiều dài mới co ngắn ($l = l_0/\\gamma$), còn khoảng thời gian đo ở hệ không gắn với hai biến cố luôn DÃN ra ($\\Delta t = \\gamma \\Delta t_0$).',
      },
      {
        text: t`Bằng đúng $\tau_0$ vì đồng hồ phòng thí nghiệm luôn chạy chuẩn`,
        ok: false,
        why: 'Theo thuyết tương đối hẹp, tốc độ trôi của thời gian giữa hai biến cố phụ thuộc vào hệ quy chiếu chuyển động tương đối.',
      },
    ],
  },
  {
    id: 'L7.2', ch: 7, stage: 'T7.1', kind: 'order',
    title: 'Mạch logic hình thành thuyết tương đối hẹp',
    prompt: 'Sắp xếp 4 mắt xích dẫn từ cơ học cổ điển sang biến đổi Lorentz:',
    steps: [
      'Phát hiện phép cộng vận tốc Galileo mâu thuẫn với tính bất biến của tốc độ ánh sáng c trong điện từ học.',
      'Đặt hai tiên đề Einstein: đồng nhất các định luật trong mọi hệ quán tính và c bất biến trong chân không.',
      'Từ yêu cầu $x^2 - c^2 t^2 = x\'^2 - c^2 t\'^2$ rút ra phép biến đổi Lorentz và nhân tử $\\gamma = (1 - \\upsilon^2/c^2)^{-1/2}$.',
      'Suy ra dãn thời gian, co chiều dài và khôi phục lại phép biến đổi Galileo khi $\\upsilon \\ll c$.',
    ],
    why: 'Thuyết tương đối hẹp không bác bỏ cơ học Newton ở tốc độ thường mà mở rộng nó để tương thích với $c$ bất biến.',
  },
  {
    id: 'L7.3', ch: 7, stage: 'T7.3', kind: 'formula',
    title: 'Động năng tương đối tính',
    prompt: t`Từ năng lượng toàn phần $E = \gamma m_0 c^2$ và năng lượng nghỉ $E_0 = m_0 c^2$ (với $\gamma = 1/\sqrt{1-\upsilon^2/c^2}$), lập biểu thức động năng $K$ theo $m_0, \upsilon, c$.`,
    vars: { m0: [1, 5], v: [1, 4], c: [5, 10] },
    targets: [
      { key: 'K', sym: 'K', label: 'Động năng tương đối tính', unit: 'J', expr: 'm0*c^2*(1/sqrt(1 - v^2/c^2) - 1)', pdfExpr: t`K = m_0 c^2\left(\dfrac{1}{\sqrt{1-\upsilon^2/c^2}} - 1\right)` },
    ],
    why: t`$K = E - E_0 = (\gamma - 1)m_0 c^2$. Khi $\upsilon \ll c$, khai triển cho $K \approx \tfrac12 m_0\upsilon^2$.`,
  },

  // ----- Chương 8 -----
  {
    id: 'L8.1', ch: 8, stage: 'T8.1', kind: 'choice',
    title: 'Thang nhiệt độ, độ biến thiên và lỗ khoét dãn nở nhiệt',
    q: 'Phát biểu nào sau đây ĐÚNG về nhiệt độ và sự nở vì nhiệt?',
    options: [
      {
        text: t`Độ tăng nhiệt độ $\Delta T = 25^\circ\text{C}$ đúng bằng $\Delta T = 25\text{ K}$, và khi nung nóng một vòng kim loại, đường kính lỗ rỗng bên trong nở to ra`,
        ok: true,
        why: 'Đúng. Độ lớn 1 K bằng 1 °C nên hiệu nhiệt độ như nhau; và mọi kích thước hình học của vật đẳng hướng (kể cả lỗ rỗng) đều tăng theo hệ số $1+\\alpha\\Delta T$.',
      },
      {
        text: t`Độ tăng nhiệt độ $25^\circ\text{C}$ ứng với độ tăng $298\text{ K}$`,
        ok: false,
        why: 'Chỉ GIÁ TRỊ nhiệt độ $25^\\circ\\text{C}$ mới ứng với $273+25 = 298\\text{ K}$; còn HIỆU nhiệt độ $T_2 - T_1$ trên hai thang hoàn toàn bằng nhau.',
      },
      {
        text: 'Khi nung nóng tấm kim loại có lỗ tròn, phần kim loại nở vào trong làm lỗ nhỏ lại',
        ok: false,
        why: 'Vật liệu quanh chu vi lỗ dãn dài thêm $\\Delta C = \\alpha C\\Delta T > 0$ nên bán kính lỗ phải tăng lên tương ứng.',
      },
    ],
  },
  {
    id: 'L8.2', ch: 8, stage: 'T8.3', kind: 'order',
    title: 'Suy ra hệ số nở khối bằng ba lần hệ số nở dài',
    prompt: 'Sắp xếp trình tự chứng minh $\\beta \\approx 3\\alpha$ cho vật rắn đẳng hướng:',
    steps: [
      t`Xét khối hộp chữ nhật đồng chất đẳng hướng có kích thước ban đầu $L_1, L_2, L_3$ và thể tích $V_0 = L_1 L_2 L_3$.`,
      t`Khi tăng nhiệt độ thêm $\Delta T$, mỗi cạnh tăng theo công thức nở dài: $L_i' = L_i(1 + \alpha\Delta T)$.`,
      t`Tính thể tích mới $V = V_0(1 + \alpha\Delta T)^3 = V_0\left[1 + 3\alpha\Delta T + 3(\alpha\Delta T)^2 + (\alpha\Delta T)^3\right]$.`,
      t`Vì $\alpha\Delta T \ll 1$, bỏ qua bậc hai và bậc ba để có $\Delta V/V_0 \approx 3\alpha\Delta T$, tức $\beta \approx 3\alpha$.`,
    ],
    why: 'Liên hệ $\\beta = 3\\alpha$ chỉ là xấp xỉ bậc nhất đúng cho chất rắn đẳng hướng khi $\\alpha\\Delta T$ rất nhỏ.',
  },
  {
    id: 'L8.3', ch: 8, stage: 'T8.2', kind: 'formula',
    title: 'Đổi nhiệt độ từ thang Fahrenheit sang Kelvin',
    prompt: t`Từ $T_C = T - 273$ và $T_F = \tfrac95 T_C + 32$ trên Slide Chương 8, hãy lập biểu thức nhiệt độ Kelvin $T$ theo nhiệt độ Fahrenheit $T_F$ (dùng biến Tf).`,
    hint: 'Gõ Tf cho nhiệt độ Fahrenheit.',
    vars: { Tf: [40, 220] },
    targets: [
      { key: 'T', sym: 'T', label: 'Nhiệt độ Kelvin', unit: 'K', expr: '273 + 5*(Tf - 32)/9', pdfExpr: t`T = 273 + \dfrac{5}{9}(T_F - 32)` },
    ],
    why: t`Từ $T_F - 32 = \tfrac95 T_C \Rightarrow T_C = \tfrac59(T_F - 32)$, rồi cộng $273$ để sang Kelvin.`,
  },

  // ----- Chương 9 -----
  {
    id: 'L9.1', ch: 9, stage: 'T9.1', kind: 'choice',
    title: 'Hàm trạng thái ΔU vs Hàm quá trình Q, A',
    q: 'Khí biến đổi từ trạng thái đầu A sang trạng thái cuối B theo ba đường khác nhau 1, 2, 3 trên giản đồ $pV$ (Bài 9.5 PDF). Kết luận nào đúng?',
    options: [
      {
        text: t`Cả ba đường có $\Delta U$ bằng nhau, nhưng công $A$ (diện tích dưới mỗi đường) và nhiệt $Q = \Delta U + A$ khác nhau`,
        ok: true,
        why: 'Đúng. Nội năng $U$ là hàm trạng thái chỉ phụ thuộc hai điểm đầu–cuối A và B; còn $A$ và $Q$ phụ thuộc đường đi giữa A và B.',
      },
      {
        text: t`Vì điểm đầu và điểm cuối giống nhau nên nhiệt lượng $Q$ nhận được trên cả ba đường bằng nhau`,
        ok: false,
        why: 'Nhiệt lượng $Q$ là hàm quá trình: đường đi qua áp suất cao sinh công lớn hơn nên cần cấp nhiệt nhiều hơn.',
      },
      {
        text: t`Nếu quá trình là dãn nở tự do vào chân không từ A đến B thì $\Delta U$ khác 0 vì không sinh công`,
        ok: false,
        why: 'Dãn nở tự do cách nhiệt có $Q=0$ và $A=0$, nên theo Nguyên lý I thì $\\Delta U = 0$.',
      },
    ],
  },
  {
    id: 'L9.2', ch: 9, stage: 'T9.2', kind: 'order',
    title: 'Suy luận dấu nhiệt và công cho một chu trình kín trên giản đồ pV',
    prompt: 'Sắp xếp các bước logic phân tích một chu trình thuận chiều kim đồng hồ trên giản đồ $pV$ (theo quy ước $\\Delta U = Q - A$):',
    steps: [
      'Trên đường dãn nở phía trên (áp suất lớn), khí sinh công dương lớn hơn độ lớn công nhận vào ở đường nén phía dưới.',
      t`Tổng công cả chu trình $A = \oint p\,dV$ bằng diện tích hình kín và mang dấu dương ($A > 0$).`,
      t`Sau một chu trình kín hệ trở về đúng trạng thái ban đầu nên biến thiên nội năng $\Delta U = 0$.`,
      t`Từ Nguyên lý I $\Delta U = Q - A$ suy ra $Q = A > 0$: máy đã nhận nhiệt ròng để sinh công có ích.`,
    ],
    why: 'Diện tích khép kín trên giản đồ $pV$ cho công chu trình; $\\Delta U = 0$ nối thẳng công đó với nhiệt ròng trao đổi $Q$.',
  },
  {
    id: 'L9.3', ch: 9, stage: 'T9.3', kind: 'formula',
    title: 'Nhiệt lượng chuyển pha và tăng nhiệt độ',
    prompt: t`Khối nước đá khối lượng $m$ ở $0^\circ\text{C}$ nhận nhiệt để nóng chảy hoàn toàn (nhiệt nóng chảy riêng $\lambda$) rồi tăng nhiệt độ thêm $\Delta T$ (nhiệt dung riêng nước $c$). Viết biểu thức tổng nhiệt lượng $Q$ (dùng dT cho $\Delta T$).`,
    hint: 'Gõ dT cho ΔT và chọn phím λ cho nhiệt nóng chảy.',
    vars: { m: [0.5, 5], lambda: [100, 400], c: [1, 10], dT: [5, 50] },
    targets: [
      { key: 'Q', sym: 'Q', label: 'Tổng nhiệt lượng cần cấp', unit: 'J', expr: 'm*(lambda + c*dT)', pdfExpr: t`Q = m(\lambda + c\,\Delta T)` },
    ],
    why: 'Trong giai đoạn nóng chảy đẳng nhiệt tại $0^\\circ\\text{C}$, nhiệt lượng là $m\\lambda$; sau đó nước lỏng tăng $\\Delta T$ cần thêm $mc\\Delta T$.',
  },

  // ----- Chương 10 -----
  {
    id: 'L10.1', ch: 10, stage: 'T10.3', kind: 'order',
    title: 'Chứng minh Hệ thức Mayer Cp − Cv = R',
    prompt: 'Sắp xếp trình tự logic chứng minh $C_P - C_V = R$ cho $n$ mol khí lý tưởng (Slide 10.6):',
    steps: [
      t`Xét $n$ mol khí lý tưởng nhận nhiệt tăng thêm $\Delta T$: độ biến thiên nội năng luôn là $\Delta U = n C_V \Delta T$.`,
      t`Nếu quá trình là đẳng áp ($p = \text{const}$), khí nhận nhiệt $Q = n C_P \Delta T$ và dãn nở sinh công $A = p\Delta V$.`,
      t`Từ phương trình trạng thái $pV = nRT$ với $p = \text{const}$ suy ra công dãn nở $A = n R \Delta T$.`,
      t`Thay $\Delta U$, $Q$ và $A$ vào Nguyên lý I $\Delta U = Q - A$ rồi chia cho $n\Delta T$ được $C_P - C_V = R$.`,
    ],
    why: 'Sở dĩ $C_P > C_V$ đúng bằng $R$ vì khi đun đẳng áp, ngoài phần tăng nội năng như đẳng tích, hệ phải tốn thêm nhiệt để sinh công dãn nở $nR\\Delta T$.',
  },
  {
    id: 'L10.2', ch: 10, stage: 'T10.1', kind: 'choice',
    title: 'So sánh động năng vi mô, vận tốc căn quân phương và dãn nở đoạn nhiệt',
    q: t`Hai bình riêng chứa khí $H_2$ ($\mu=2$) và $O_2$ ($\mu=32$) ở CÙNG nhiệt độ $T$. Nhận xét nào sau đây ĐÚNG?`,
    options: [
      {
        text: t`Động năng tịnh tiến trung bình của mỗi phân tử hai khí bằng nhau ($= \tfrac32 kT$), nhưng $\upsilon_{rms}$ của $H_2$ gấp $4$ lần $O_2$`,
        ok: true,
        why: t`Đúng. $\overline{E_đ} = \tfrac32 kT$ chỉ phụ thuộc $T$; còn $\upsilon_{rms} = \sqrt{3RT/\mu}$ tỉ lệ nghịch $\sqrt{\mu}$, nên $\sqrt{32/2} = 4$.`,
      },
      {
        text: 'Phân tử $O_2$ nặng hơn nên có động năng trung bình lớn hơn ở cùng nhiệt độ',
        ok: false,
        why: 'Ở cân bằng nhiệt cùng $T$, nhiệt độ chính là thước đo động năng tịnh tiến trung bình nên cả hai có cùng $\\tfrac32 kT$.',
      },
      {
        text: 'Hai khí cùng nhiệt độ nên có tốc độ căn quân phương bằng nhau',
        ok: false,
        why: 'Cùng động năng $\\tfrac12 m\\overline{\\upsilon^2}$ thì phân tử khối lượng $m$ nhỏ hơn phải chuyển động nhanh hơn.',
      },
    ],
  },
  {
    id: 'L10.3', ch: 10, stage: 'T10.3', kind: 'formula',
    title: 'Công sinh ra trong quá trình dãn nở đẳng nhiệt',
    prompt: t`Cho $n$ mol khí lý tưởng dãn nở đẳng nhiệt ở nhiệt độ tuyệt đối $T$ từ thể tích $V_1$ đến $V_2$ ($V_2 > V_1$). Tích phân $A = \int_{V_1}^{V_2} p\,dV$ để lập biểu thức công $A$.`,
    hint: 'Viết tích có khoảng cách hoặc dấu * giữa các chữ cái, ví dụ n*R*T*ln(V2/V1).',
    vars: { n: [1, 5], R: [5, 10], T: [200, 400], V1: [1, 4], V2: [5, 12] },
    targets: [
      { key: 'A', sym: 'A', label: 'Công dãn nở đẳng nhiệt', unit: 'J', expr: 'n*R*T*ln(V2/V1)', pdfExpr: t`A = nRT\ln\dfrac{V_2}{V_1}` },
    ],
    why: t`Thay $p = nRT/V$ (với $T$ hằng số) vào $\int_{V_1}^{V_2} p\,dV$ được $nRT\ln(V_2/V_1)$.`,
  },

  // ----- Chương 11 -----
  {
    id: 'L11.1', ch: 11, stage: 'T11.3', kind: 'choice',
    title: 'Cách tính biến thiên Entropi cho quá trình bất thuận nghịch',
    q: 'Khí lý tưởng dãn nở tự do (cách nhiệt, $Q=0$) từ thể tích $V_1$ sang $V_2 > V_1$ vào chân không. Vì sao biến thiên Entropi $\\Delta S$ của khí lại LỚN HƠN 0 dù không trao đổi nhiệt ($Q=0$)?',
    options: [
      {
        text: 'Vì $S$ là hàm trạng thái nên phải tính $\\Delta S = \\int (\\delta Q/T)_{tn}$ dọc theo một quá trình thuận nghịch (như dãn đẳng nhiệt) nối cùng hai trạng thái đầu–cuối',
        ok: true,
        why: t`Đúng. Bất đẳng thức $\Delta S > \int \delta Q/T$ luôn xảy ra ở quá trình bất thuận nghịch; thay bằng dãn đẳng nhiệt thuận nghịch cho $\Delta S = nR\ln(V_2/V_1) > 0$.`,
      },
      {
        text: 'Thực ra $\\Delta S = 0$ vì $Q = 0$ nên $\\int \\delta Q/T = 0$',
        ok: false,
        why: 'Công thức $\\Delta S = \\int \\delta Q/T$ chỉ đúng cho quá trình THUẬN NGHỊCH; dãn nở tự do là bất thuận nghịch nên $\\Delta S > 0$.',
      },
      {
        text: 'Vì trong dãn nở tự do, nhiệt độ khí tăng vọt nên entropi tăng',
        ok: false,
        why: 'Với khí lý tưởng dãn nở tự do vào chân không, $Q=0, A=0 \\Rightarrow \\Delta U = 0$ nên nhiệt độ đầu và cuối bằng nhau ($T_2 = T_1$); entropi tăng do thể tích (độ hỗn độn vị trí) tăng.',
      },
    ],
  },
  {
    id: 'L11.2', ch: 11, stage: 'T11.3', kind: 'order',
    title: 'Mạch suy luận từ Định lý Carnot tới Nguyên lý tăng Entropi',
    prompt: 'Sắp xếp 4 bước nối tiếp xây dựng khái niệm Entropi từ Định lý Carnot (Slide 11.5):',
    steps: [
      t`Từ Định lý Carnot viết bất đẳng thức cho chu trình hai nguồn: $\frac{Q_1}{T_1} + \frac{Q_2}{T_2} \le 0$.`,
      t`Chia nhỏ chu trình bất kỳ thành vô số chu trình Carnot sơ cấp để thu được bất đẳng thức Clausius $\oint \frac{\delta Q}{T} \le 0$.`,
      t`Từ trường hợp thuận nghịch ($\oint (\delta Q/T)_{tn} = 0$) suy ra $\Delta S = \int_1^2 (\delta Q/T)_{tn}$ không phụ thuộc đường đi: $S$ là hàm trạng thái.`,
      t`Kết hợp $\Delta S \ge \int \frac{\delta Q}{T}$ với hệ cô lập ($\delta Q = 0$) để rút ra Nguyên lý tăng Entropi $\Delta S \ge 0$.`,
    ],
    why: 'Entropi không xuất hiện ngẫu nhiên mà được chứng minh chặt chẽ là hàm trạng thái nhờ dấu "=" trong bất đẳng thức Clausius cho chu trình thuận nghịch.',
  },
  {
    id: 'L11.3', ch: 11, stage: 'T11.2', kind: 'formula',
    title: 'Hiệu suất lý tưởng của chu trình Carnot',
    prompt: t`Động cơ Carnot nhận nhiệt ở nguồn nóng $T_1$ và tỏa nhiệt ở nguồn lạnh $T_2$ ($T_1 > T_2$, đơn vị K). Lập biểu thức hiệu suất tối đa $\eta$.`,
    vars: { T1: [400, 800], T2: [200, 380] },
    targets: [
      { key: 'eta', sym: t`\eta`, label: 'Hiệu suất Carnot', unit: '', expr: '1 - T2/T1', pdfExpr: t`\eta = 1 - \dfrac{T_2}{T_1}` },
    ],
    why: t`Với chu trình Carnot thuận nghịch, $\frac{Q_2}{Q_1} = \frac{T_2}{T_1}$, nên $\eta = 1 - \frac{Q_2}{Q_1} = 1 - \frac{T_2}{T_1}$.`,
  },
];
