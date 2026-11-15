// Diễn đạt lại bài 4.1–4.10 từ PDF bắt buộc; số liệu tự chọn được đánh dấu sample.
import { G, rad } from './util.js';
const t = String.raw;
const g = (key, sym, value, unit, label) => ({ key, sym, value, unit, label });
const target = (key, sym, label, unit, expr) => ({ key, sym, label, unit, expr });

export default [
  {
    id: '4.1', star: true, page: 4, title: 'Ném vật lên dốc có ma sát', group: 'cong-ma-sat', fade: 0, sample: true,
    statement: t`Vật khối lượng $m$ được ném lên mặt phẳng nghiêng góc $\alpha$ với vận tốc $v_0$. Hệ số ma sát trượt là $\mu$. Tìm quãng đường $S$ đến khi dừng và công $A_{ms}$ của lực ma sát trên đoạn đó.`,
    given: [g('m', 'm', 2, 'kg', 'Khối lượng'), g('v0', 'v_0', 10, 'm/s', 'Vận tốc đầu'), g('alpha', '\\alpha', 30, '°', 'Góc nghiêng'), g('mu', '\\mu', 0.2, '', 'Hệ số ma sát')],
    vars: { m: [1, 5], v0: [2, 15], alpha: [0.2, 1], mu: [0.05, 0.4], g: [9, 10] },
    vary: { v0: [4, 14, 2], mu: [0.1, 0.3, 0.05] },
    targets: [target('S', 'S', 'Quãng đường', 'm', 'v0^2/(2*g*(sin(alpha)+mu*cos(alpha)))'), target('A', 'A_{ms}', 'Công ma sát', 'J', '-mu*m*v0^2*cos(alpha)/(2*(sin(alpha)+mu*cos(alpha)))')],
    model: ({ m, v0, alpha, mu }) => { const S = v0 ** 2 / (2 * G * (Math.sin(rad(alpha)) + mu * Math.cos(rad(alpha)))); return { S, A: -mu * m * G * Math.cos(rad(alpha)) * S }; },
    predict: { q: 'Khi vật trượt lên dốc, công của ma sát mang dấu nào?', options: [
      { text: 'Âm', ok: true, why: 'Ma sát ngược chiều dịch chuyển nên công âm.' },
      { text: 'Dương', ok: false, why: 'Ma sát cản chuyển động lên dốc, làm giảm động năng.' },
      { text: 'Bằng không', ok: false, why: 'Chỉ phản lực vuông góc chuyển động mới có công bằng không ở đây.' },
    ] },
    solution: [
      { title: 'Định lý động năng', body: t`$0-\tfrac12mv_0^2=-mgS\sin\alpha-\mu mgS\cos\alpha$.` },
      { title: 'Tìm quãng đường', body: t`$S=\dfrac{v_0^2}{2g(\sin\alpha+\mu\cos\alpha)}$.` },
      { title: 'Công của ma sát', body: t`$A_{ms}=-\mu mg\cos\alpha\,S=-\dfrac{\mu mv_0^2\cos\alpha}{2(\sin\alpha+\mu\cos\alpha)}$.` },
    ],
  },
  {
    id: '4.2', star: true, page: 4, title: 'Trượt xuống dốc rồi dừng trên mặt ngang', group: 'cong-ma-sat', fade: 1, sample: true,
    statement: t`Vật bắt đầu đứng yên tại D, cao $h$ so với mặt ngang. A là chân đường thẳng đứng qua D; C là chân dốc với $AC=l$. Vật trượt theo DC rồi CB và dừng tại B, với $AB=s>l$. Hệ số ma sát trên hai đoạn bằng nhau. Tìm $\mu$, gia tốc dọc DC (chiều xuống dốc) và CB (chiều C đến B).`,
    given: [g('h', 'h', 3, 'm', 'Độ cao'), g('l', 'l', 4, 'm', 'Hình chiếu ngang của dốc'), g('s', 's', 10, 'm', 'Tổng khoảng ngang AB')],
    vars: { h: [1, 4], l: [2, 5], s: [6, 15], g: [9, 10] },
    targets: [target('mu', '\\mu', 'Hệ số ma sát', '', 'h/s'), target('a1', 'a_{DC}', 'Gia tốc trên dốc', 'm/s²', 'g*h*(1-l/s)/sqrt(h^2+l^2)'), target('a2', 'a_{CB}', 'Gia tốc trên mặt ngang', 'm/s²', '-g*h/s')],
    model: ({ h, l, s }) => ({ mu: h / s, a1: G * h * (1 - l / s) / Math.hypot(h, l), a2: -G * h / s }),
    solution: [
      { title: 'Cân bằng năng lượng toàn đường', body: t`Công ma sát trên dốc là $-\mu mgl$, trên mặt ngang là $-\mu mg(s-l)$. Vì vận tốc đầu và cuối bằng không: $mgh=\mu mgs$, nên $\mu=h/s$.` },
      { title: 'Gia tốc trên từng đoạn', body: t`$\sin\alpha=h/\sqrt{h^2+l^2}$, $\cos\alpha=l/\sqrt{h^2+l^2}$. Do đó $a_{DC}=g(\sin\alpha-\mu\cos\alpha)$ và $a_{CB}=-\mu g$.` },
    ],
  },
  {
    id: '4.3', star: false, page: 5, title: 'Quả cầu nảy lên sau khi rời dốc', group: 'bao-toan-co-nang', fade: 0, sample: true,
    statement: t`Quả cầu bắt đầu đứng yên ở độ cao $H$, trượt không ma sát trên dốc dài $l=H/3$, nghiêng $30^\circ$, rồi rời dốc và rơi xuống mặt ngang. Va chạm với mặt ngang hoàn toàn đàn hồi, bỏ qua quay và sức cản. Tìm độ cao cực đại sau khi nảy.`,
    given: [g('H', 'H', 8, 'm', 'Độ cao ban đầu')], vars: { H: [1, 20] }, vary: { H: [2, 16, 2] },
    targets: [target('h', 'h_{max}', 'Độ cao sau nảy', 'm', '7*H/8')], model: ({ H }) => ({ h: 7 * H / 8 }),
    solution: [
      { title: 'Vận tốc rời dốc', body: t`Độ giảm cao trên dốc là $l\sin30^\circ=H/6$. Bảo toàn cơ năng cho $v^2=2gH/6$, thành phần ngang $v_x=v\cos30^\circ$.` },
      { title: 'Năng lượng còn lại ở đỉnh sau nảy', body: t`Va chạm đàn hồi chỉ đảo dấu thành phần vận tốc thẳng đứng. Ở đỉnh, $mgH=mgh_{max}+\tfrac12mv_x^2$. Suy ra $h_{max}=H-H/8=7H/8$.` },
    ],
  },
  {
    id: '4.4', star: true, page: 5, title: 'Chọn độ cao mép dốc để bay xa nhất', group: 'bao-toan-co-nang', fade: 1, sample: true,
    statement: t`Vòng đệm trượt không ma sát từ trạng thái nghỉ ở độ cao $H$, rồi rời mép dốc theo phương ngang ở độ cao $h$ và rơi xuống mặt đất. Chọn $h$ để tầm xa $S$ lớn nhất; tìm $S_{max}$.`,
    given: [g('H', 'H', 6, 'm', 'Độ cao thả')], vars: { H: [1, 20] }, vary: { H: [2, 16, 2] },
    targets: [target('h', 'h', 'Độ cao mép tối ưu', 'm', 'H/2'), target('S', 'S_{max}', 'Tầm xa lớn nhất', 'm', 'H')], model: ({ H }) => ({ h: H / 2, S: H }),
    solution: [
      { title: 'Vận tốc và thời gian bay', body: t`$v=\sqrt{2g(H-h)}$, $t=\sqrt{2h/g}$. Do đó $S=vt=2\sqrt{h(H-h)}$.` },
      { title: 'Cực đại hóa tầm xa', body: t`$h(H-h)=H^2/4-(h-H/2)^2$ lớn nhất tại $h=H/2$. Khi đó $S_{max}=H$.` },
    ],
  },
  {
    id: '4.5', star: true, page: 5, title: 'Vật còn bay lên sau khi dây chùng', group: 'bao-toan-co-nang', fade: 2, sample: true,
    statement: t`Hai vật $m_1$ và $m_2=nm_1$ ($n>1$) nối bằng dây qua ròng rọc lý tưởng. Ban đầu $m_1$ chạm đất, $m_2$ cao $h_2=30$ cm. Thả hệ từ nghỉ. Sau khi $m_2$ chạm đất, $m_1$ tiếp tục bay lên. Tìm độ cao lớn nhất $h_1$ so với đất.`,
    given: [g('n', 'n', 2, '', 'Tỉ số khối lượng (tự chọn)'), g('h2', 'h_2', 0.3, 'm', 'Độ cao ban đầu của vật 2')], vars: { n: [1.2, 5], h2: [0.1, 1] },
    targets: [target('h1', 'h_1', 'Độ cao cực đại', 'm', '2*n*h2/(n+1)')], model: ({ n, h2 }) => ({ h1: 2 * n * h2 / (n + 1) }),
    solution: [
      { title: 'Giai đoạn dây căng', body: t`$a=g(n-1)/(n+1)$; khi vật 2 chạm đất, $v^2=2ah_2$ và vật 1 đang ở độ cao $h_2$.` },
      { title: 'Giai đoạn dây chùng', body: t`Vật 1 bay thêm $v^2/(2g)$. Tổng độ cao $h_1=h_2+(n-1)h_2/(n+1)=2nh_2/(n+1)$.` },
    ],
  },
  {
    id: '4.6', star: true, page: 5, title: 'Điều kiện đi hết vòng tròn', group: 'bao-toan-co-nang', fade: 1, sample: true,
    statement: t`Vật nhỏ trượt không ma sát trong máng có vòng tròn thẳng đứng bán kính $R$. Tìm độ cao thả tối thiểu $H_{min}$ so với đáy để vật không rời máng ở đỉnh. Nếu thả ở độ cao $H'$ với $R<H'<2{,}5R$, tìm độ cao $h'$ tại điểm rời máng. Bỏ qua chuyển động quay của vật.`,
    given: [g('R', 'R', 1, 'm', 'Bán kính vòng'), g('Hp', "H'", 2, 'm', 'Độ cao thả cho phần b')], vars: { R: [1, 2], Hp: [2.1, 2.4] },
    targets: [target('H', 'H_{min}', 'Độ cao tối thiểu', 'm', '5*R/2'), target('h', "h'", 'Độ cao rời máng', 'm', '(2*Hp+R)/3')], model: ({ R, Hp }) => ({ H: 2.5 * R, h: (2 * Hp + R) / 3 }),
    solution: [
      { title: 'Tại đỉnh vòng', body: t`Điều kiện phản lực $N\ge0$ cho $v_{đỉnh}^2\ge gR$. Cơ năng: $mgH=2mgR+\tfrac12mv_{đỉnh}^2$, nên $H_{min}=5R/2$.` },
      { title: 'Tại điểm mất tiếp xúc', body: t`Khi $N=0$, $v^2=g(h'-R)$. Kết hợp $v^2=2g(H'-h')$ được $h'=(2H'+R)/3$. Công thức phần b dùng khi vật đi đến nửa trên nhưng chưa đủ năng lượng qua đỉnh.` },
    ],
  },
  {
    id: '4.7', star: false, page: 5, title: 'Neutron va chạm đàn hồi với carbon', group: 'va-cham', fade: 0,
    statement: t`Neutron khối lượng $m$ va chạm đàn hồi với hạt nhân carbon đứng yên, khối lượng $M=12m$. Sau va chạm neutron chuyển động vuông góc hướng ban đầu. Tìm tỉ số $n=K_{trước}/K_{sau}$ của neutron.`,
    given: [g('r', 'M/m', 12, '', 'Tỉ số khối lượng')], vars: { r: [2, 20] },
    targets: [target('n', 'n', 'Số lần động năng giảm', '', '(r+1)/(r-1)')], model: ({ r }) => ({ n: (r + 1) / (r - 1) }),
    solution: [
      { title: 'Bảo toàn động lượng theo hai trục', body: t`Hai vận tốc của neutron vuông góc nhau nên động lượng hạt nhân sau va chạm thỏa $P^2=m^2(v^2+u^2)$.` },
      { title: 'Bảo toàn động năng', body: t`$\tfrac12mv^2=\tfrac12mu^2+P^2/(2M)$. Suy ra $(M-m)v^2=(M+m)u^2$ và $n=(M+m)/(M-m)=13/11$.` },
    ],
  },
  {
    id: '4.8', star: true, page: 6, title: 'Con lắc thử đạn', group: 'va-cham', fade: 1, sample: true,
    statement: t`Viên đạn khối lượng $m$ bay ngang, cắm vào vật khối lượng $M$ treo bằng dây dài $l$. Vật và đạn cùng lên đến góc $\alpha$ với phương thẳng đứng. Tìm vận tốc đạn trước va chạm và phần trăm động năng ban đầu chuyển thành nội năng trong va chạm.`,
    given: [g('m', 'm', 0.01, 'kg', 'Khối lượng đạn'), g('M', 'M', 1, 'kg', 'Khối lượng vật'), g('l', 'l', 1, 'm', 'Chiều dài dây'), g('alpha', '\\alpha', 30, '°', 'Góc lệch cực đại')],
    vars: { m: [0.01, 0.1], M: [0.5, 2], l: [0.5, 2], alpha: [0.1, 1], g: [9, 10] },
    targets: [target('v', 'v', 'Vận tốc đạn', 'm/s', '(M+m)/m*sqrt(2*g*l*(1-cos(alpha)))'), target('loss', 'p', 'Phần trăm động năng mất', '%', '100*M/(M+m)')],
    model: ({ m, M, l, alpha }) => ({ v: (M + m) / m * Math.sqrt(2 * G * l * (1 - Math.cos(rad(alpha)))), loss: 100 * M / (M + m) }),
    solution: [
      { title: 'Tách va chạm và chuyển động con lắc', body: t`Trong va chạm mềm, bảo toàn động lượng ngang: $mv=(M+m)V$. Sau va chạm mới bảo toàn cơ năng: $V^2=2gl(1-\cos\alpha)$.` },
      { title: 'Vận tốc đạn', body: t`$v=\dfrac{M+m}{m}\sqrt{2gl(1-\cos\alpha)}$. Không áp dụng bảo toàn cơ năng trong lúc đạn cắm vào vật.` },
      { title: 'Phần động năng mất', body: t`$K_{sau}/K_{trước}=m/(M+m)$ nên phần trăm mất là $100M/(M+m)$.` },
    ],
  },
  {
    id: '4.9', star: true, page: 6, title: 'Người trượt băng ném đá', group: 'va-cham', fade: 2,
    statement: t`Người khối lượng $M=70$ kg đứng yên trên băng, ném ngang hòn đá khối lượng $m=3$ kg với vận tốc $v=8$ m/s. Lấy vận tốc đá so với mặt đất (quy ước theo đáp số PDF). Hệ số ma sát người–băng là $\mu=0{,}02$. Tìm quãng đường giật lùi đến khi dừng.`,
    given: [g('M', 'M', 70, 'kg', 'Khối lượng người'), g('m', 'm', 3, 'kg', 'Khối lượng đá'), g('v', 'v', 8, 'm/s', 'Vận tốc đá so với đất'), g('mu', '\\mu', 0.02, '', 'Hệ số ma sát')],
    vars: { M: [50, 90], m: [1, 5], v: [3, 12], mu: [0.01, 0.05], g: [9, 10] }, vary: { v: [4, 12, 1] },
    targets: [target('S', 'S', 'Quãng đường giật lùi', 'm', '(m*v/M)^2/(2*mu*g)')], model: ({ M, m, v, mu }) => ({ S: (m * v / M) ** 2 / (2 * mu * G) }),
    solution: [
      { title: 'Động lượng lúc ném', body: t`Bỏ qua xung lượng ma sát trong khoảng ném ngắn, $MV+mv=0$ nên tốc độ giật lùi $|V|=mv/M$.` },
      { title: 'Công ma sát sau khi ném', body: t`$\mu MgS=\tfrac12MV^2$, nên $S=(mv/M)^2/(2\mu g)\approx0{,}300$ m.` },
    ],
  },
  {
    id: '4.10', star: false, page: 6, title: 'Súng trên xe chuyển động', group: 'va-cham', fade: 2, sample: true,
    statement: t`Xe và súng khối lượng $M$ đang chạy với vận tốc $V$. Súng bắn viên đạn khối lượng $m$ theo hướng chếch lên góc $\alpha$ so với sàn, cùng chiều xe. Sau bắn, xe còn vận tốc $V/3$. Tìm tốc độ đạn so với súng khi ra nòng. Dùng gần đúng $m\ll M$ như đáp số trong PDF.`,
    given: [g('M', 'M', 1000, 'kg', 'Khối lượng xe và súng'), g('m', 'm', 1, 'kg', 'Khối lượng đạn'), g('V', 'V', 3, 'm/s', 'Vận tốc xe ban đầu'), g('alpha', '\\alpha', 30, '°', 'Góc nòng súng')],
    vars: { M: [1000, 3000], m: [0.1, 1], V: [1, 5], alpha: [0.1, 1] },
    targets: [target('v', 'v', 'Vận tốc tương đối (gần đúng)', 'm/s', '2*M*V/(3*m*cos(alpha))')], model: ({ M, m, V, alpha }) => ({ v: 2 * M * V / (3 * m * Math.cos(rad(alpha))) }),
    solution: [
      { title: 'Bảo toàn động lượng ngang', body: t`Trước bắn: $(M+m)V$. Sau bắn: $MV/3+m(V/3+v\cos\alpha)$. Do đó nghiệm chính xác là $v=2(M+m)V/(3m\cos\alpha)$.` },
      { title: 'Gần đúng của PDF', body: t`Khi $m\ll M$, thay $M+m\approx M$ được $v\approx2MV/(3m\cos\alpha)$. Bộ chấm của bài này dùng biểu thức gần đúng đó; điều kiện đã nêu ở đề.` },
    ],
  },
].map((p) => ({ ...p, ch: 4, oldCh: 4, adapted: true }));
