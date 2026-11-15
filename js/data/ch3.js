// Chương 3 file bài tập = Chương 2 PHY1159: Động lực học chất điểm.
// Đề bài chép nguyên văn từ "Bài tập Cơ – Nhiệt" (bắt buộc), trang 2–4.
import { G, rad, deg } from './util.js';

const t = String.raw;

/** Mô hình đầy đủ cho Bài 3.1: xét cả ba trường hợp lên dốc, xuống dốc, đứng yên. */
export function inclinePulley({ m1, m2, alpha, mu }) {
  const a = rad(alpha);
  const drive = m2 - m1 * Math.sin(a); // > 0: B kéo A lên dốc
  const fric = mu * m1 * Math.cos(a);
  let acc = 0;
  let state = 'dung-yen';
  if (drive > fric) { acc = (G * (drive - fric)) / (m1 + m2); state = 'len-doc'; }
  else if (drive < -fric) { acc = (G * (drive + fric)) / (m1 + m2); state = 'xuong-doc'; }
  const T = m2 * (G - acc); // acc > 0 nghĩa là B đi xuống
  const F = 2 * T * Math.cos((Math.PI / 2 - a) / 2);
  return { a: acc, T, F, state };
}

const NEWTON_FRAME = {
  q: 'Nên giải bài này trong hệ quy chiếu nào?',
  options: [
    { text: 'Hệ quy chiếu gắn với mặt đất (quán tính)', ok: true, why: 'Mặt phẳng nghiêng và ròng rọc đứng yên, nên làm việc ở hệ quy chiếu mặt đất là gọn nhất: chỉ có lực thật, không cần lực quán tính.' },
    { text: 'Hệ quy chiếu gắn với vật A', ok: false, why: 'Vật A có gia tốc, nên hệ quy chiếu gắn với A là phi quán tính và phải thêm lực quán tính. Không sai, nhưng phức tạp hơn cần thiết.' },
  ],
};

export default [
  {
    id: '3.1', star: true, ch: 3, oldCh: 3, page: 2,
    title: 'Hệ vật trên mặt phẳng nghiêng có ròng rọc',
    group: 'rong-roc', fade: 0,
    statement: t`Một vật A khối lượng $m_1 = 3$ kg nằm trên mặt phẳng nghiêng góc $\alpha = 30^\circ$ so với phương nằm ngang. Vật A được nối với B có khối lượng $m_2 = 2$ kg bằng một sợi dây không co dãn qua một ròng rọc cố định. Hãy xác định gia tốc chuyển động của các vật, lực căng của dây và áp lực lên ròng rọc. Bỏ qua khối lượng sợi dây, ròng rọc và ma sát giữa dây với ròng rọc. Cho biết hệ số ma sát giữa vật A và mặt phẳng nghiêng $\mu = 0{,}1$.`,
    figureNote: 'PDF không có hình cho bài này; hình dưới đây vẽ theo đề và theo đáp số.',
    figure: 'incline-pulley', sim: 'incline-pulley',
    given: [
      { key: 'm1', sym: 'm_1', value: 3, unit: 'kg', label: 'Khối lượng vật A' },
      { key: 'm2', sym: 'm_2', value: 2, unit: 'kg', label: 'Khối lượng vật B' },
      { key: 'alpha', sym: t`\alpha`, value: 30, unit: '°', label: 'Góc nghiêng' },
      { key: 'mu', sym: t`\mu`, value: 0.1, unit: '', label: 'Hệ số ma sát' },
    ],
    vars: { m1: [1, 5], m2: [1, 5], alpha: [0.1, 1.4], mu: [0, 0.5], g: [9, 10] },
    targets: [
      { key: 'a', label: 'Gia tốc', sym: 'a', unit: 'm/s²', expr: 'g*(m2 - m1*sin(alpha) - mu*m1*cos(alpha))/(m1 + m2)', pdfExpr: t`a = \dfrac{g(m_2 - m_1\sin\alpha - \mu m_1\cos\alpha)}{m_1 + m_2}` },
      { key: 'T', label: 'Lực căng dây', sym: 'T', unit: 'N', expr: 'm1*m2*g*(1 + sin(alpha) + mu*cos(alpha))/(m1 + m2)', pdfExpr: t`T = \dfrac{m_1 m_2 g(1 + \sin\alpha + \mu\cos\alpha)}{m_1 + m_2}` },
      { key: 'F', label: 'Áp lực lên trục ròng rọc', sym: 'F', unit: 'N', expr: '2*m1*m2*g*(1 + sin(alpha) + mu*cos(alpha))/(m1 + m2)*cos((pi/2 - alpha)/2)', pdfExpr: t`F = 2T\cos\dfrac{90^\circ - \alpha}{2}` },
    ],
    model: (v) => inclinePulley(v),
    vary: { m1: [2, 4, 0.5], m2: [1.5, 4, 0.5], alpha: [20, 40, 5], mu: [0.05, 0.2, 0.05] },
    predict: {
      q: 'Tạm bỏ qua ma sát. Hệ sẽ chuyển động theo chiều nào?',
      options: [
        { text: 'A trượt lên dốc, B đi xuống', ok: true, why: t`So hai lực kéo dọc dây: $m_2 g = 19{,}6$ N lớn hơn $m_1 g\sin\alpha = 14{,}7$ N. Vì vậy hệ chuyển động theo chiều B đi xuống, và ma sát trên A hướng xuống dốc.` },
        { text: 'A trượt xuống dốc, B đi lên', ok: false, why: t`A nặng hơn B, nhưng chỉ thành phần $m_1 g\sin\alpha = 14{,}7$ N kéo dọc dốc, nhỏ hơn $m_2 g = 19{,}6$ N.` },
        { text: 'Hệ đứng yên', ok: false, why: 'Hai lực kéo dọc dây không bằng nhau, nên khi không có ma sát hệ không thể đứng yên.' },
      ],
    },
    frame: NEWTON_FRAME,
    fbd: {
      note: 'Hệ quy chiếu mặt đất. A đang trượt lên dốc.',
      bodies: [
        { id: 'A', label: 'Vật A', surface: 30, palette: ['P', 'N', 'T', 'Fms', 'Fdi', 'Fqt'],
          expected: [{ type: 'P', angle: 270 }, { type: 'N', angle: 120 }, { type: 'T', angle: 30 }, { type: 'Fms', angle: 210 }] },
        { id: 'B', label: 'Vật B', rope: 90, palette: ['P', 'N', 'T', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }] },
      ],
    },
    solution: [
      { title: 'Định luật II cho từng vật', body: t`Chọn chiều dương: A lên dốc, B đi xuống. Vật A: $T - m_1 g\sin\alpha - \mu m_1 g\cos\alpha = m_1 a$. Vật B: $m_2 g - T = m_2 a$.` },
      { title: 'Cộng hai phương trình để khử T', body: t`$a = \dfrac{g(m_2 - m_1\sin\alpha - \mu m_1\cos\alpha)}{m_1 + m_2} \approx 0{,}47$ m/s².` },
      { title: 'Tính lực căng', body: t`$T = m_2(g - a) = \dfrac{m_1 m_2 g(1 + \sin\alpha + \mu\cos\alpha)}{m_1 + m_2} \approx 18{,}7$ N.` },
      { title: 'Áp lực lên ròng rọc', body: t`Hai nhánh dây cùng lực căng $T$, một nhánh dọc dốc, một nhánh thẳng đứng, hợp với nhau góc $90^\circ - \alpha$. Hợp lực: $F = 2T\cos\dfrac{90^\circ - \alpha}{2} \approx 32{,}3$ N.` },
    ],
  },
  {
    id: '3.2', star: true, ch: 3, oldCh: 3, page: 2,
    title: 'Hệ số ma sát từ thời gian lên và xuống dốc',
    group: 'nghieng-ma-sat', fade: 0,
    statement: t`Một vật được ném lên theo mặt phẳng nghiêng tạo với phương nằm ngang góc $\alpha = 15^\circ$. Tính hệ số ma sát giữa vật và mặt phẳng nghiêng. Biết rằng thời gian đi xuống của vật bằng $n = 2$ lần thời gian đi lên.`,
    given: [
      { key: 'alpha', sym: t`\alpha`, value: 15, unit: '°', label: 'Góc nghiêng' },
      { key: 'n', sym: 'n', value: 2, unit: '', label: 'Tỉ số thời gian xuống / lên' },
    ],
    vars: { alpha: [0.1, 1.2], n: [1.2, 4] },
    targets: [{ key: 'mu', label: 'Hệ số ma sát', sym: t`\mu`, unit: '', expr: '(n^2 - 1)/(n^2 + 1)*tan(alpha)', pdfExpr: t`\mu = \dfrac{n^2 - 1}{n^2 + 1}\,\mathrm{tg}\,\alpha` }],
    model: (v) => ({ mu: ((v.n ** 2 - 1) / (v.n ** 2 + 1)) * Math.tan(rad(v.alpha)) }),
    vary: { alpha: [10, 30, 5], n: [1.5, 3, 0.5] },
    predict: {
      q: 'Vì sao thời gian đi xuống lại dài hơn thời gian đi lên trên cùng một đoạn dốc?',
      options: [
        { text: 'Lúc lên, ma sát cùng chiều với thành phần trọng lực nên vật chậm lại nhanh; lúc xuống, ma sát ngược chiều nên vật nhanh lên chậm', ok: true, why: t`Đúng. Gia tốc lúc lên là $g(\sin\alpha + \mu\cos\alpha)$, lúc xuống là $g(\sin\alpha - \mu\cos\alpha)$, nhỏ hơn.` },
        { text: 'Vì lúc đi lên còn lực ném đẩy vật', ok: false, why: 'Sau khi rời tay, vật không còn chịu lực ném.' },
        { text: 'Vì trọng lực lúc đi xuống nhỏ hơn', ok: false, why: 'Trọng lực không đổi. Chỉ có chiều của lực ma sát đổi.' },
      ],
    },
    fbd: {
      note: 'Cùng một vật ở hai giai đoạn. Hệ quy chiếu mặt đất.',
      bodies: [
        { id: 'len', label: 'Khi đi lên', surface: 15, palette: ['P', 'N', 'Fms', 'Fnem', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'N', angle: 105 }, { type: 'Fms', angle: 195 }] },
        { id: 'xuong', label: 'Khi đi xuống', surface: 15, palette: ['P', 'N', 'Fms', 'Fnem', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'N', angle: 105 }, { type: 'Fms', angle: 15 }] },
      ],
    },
    solution: [
      { title: 'Gia tốc hai giai đoạn', body: t`Lên: $a_1 = g(\sin\alpha + \mu\cos\alpha)$ (chậm dần). Xuống: $a_2 = g(\sin\alpha - \mu\cos\alpha)$ (nhanh dần).` },
      { title: 'Cùng quãng đường', body: t`$s = \tfrac12 a_1 t_1^2 = \tfrac12 a_2 t_2^2$, với $t_2 = n t_1$, nên $a_1 = n^2 a_2$.` },
      { title: 'Giải ra μ', body: t`$\sin\alpha + \mu\cos\alpha = n^2(\sin\alpha - \mu\cos\alpha)$, suy ra $\mu = \dfrac{n^2 - 1}{n^2 + 1}\,\mathrm{tg}\,\alpha = 0{,}6\cdot\mathrm{tg}\,15^\circ \approx 0{,}16$.` },
    ],
  },
  {
    id: '3.3', star: true, ch: 3, oldCh: 3, page: 2,
    title: 'Con lắc nón',
    group: 'tron', fade: 0,
    statement: t`Một vật khối lượng $m = 1$ kg buộc vào đầu dây có chiều dài là $\ell = 30$ cm, đầu kia của dây được giữ cố định tại điểm O. Cho vật chuyển động tròn trong mặt phẳng ngang, còn sợi dây hợp với phương thẳng đứng góc $\alpha = 60^\circ$. Hãy xác định vận tốc $\upsilon$, sức căng $T$ của dây.`,
    figure: 'conical',
    given: [
      { key: 'm', sym: 'm', value: 1, unit: 'kg', label: 'Khối lượng' },
      { key: 'l', sym: t`\ell`, value: 0.3, unit: 'm', label: 'Chiều dài dây' },
      { key: 'alpha', sym: t`\alpha`, value: 60, unit: '°', label: 'Góc dây với phương thẳng đứng' },
    ],
    vars: { m: [0.2, 5], l: [0.1, 2], alpha: [0.1, 1.4], g: [9, 10] },
    targets: [
      { key: 'v', label: 'Vận tốc', sym: t`\upsilon`, unit: 'm/s', expr: 'sqrt(g*l*sin(alpha)*tan(alpha))', pdf: 2.1 },
      { key: 'T', label: 'Lực căng dây', sym: 'T', unit: 'N', expr: 'm*g/cos(alpha)', pdf: 20, pdfTol: 0.03, pdfNote: 'PDF làm tròn 19,6 N thành 20 N.' },
    ],
    model: (v) => {
      const a = rad(v.alpha);
      return { v: Math.sqrt(G * v.l * Math.sin(a) * Math.tan(a)), T: (v.m * G) / Math.cos(a) };
    },
    vary: { m: [0.5, 2, 0.5], l: [0.2, 0.6, 0.1], alpha: [30, 70, 10] },
    predict: {
      q: 'Những lực nào thật sự tác dụng lên vật?',
      options: [
        { text: 'Chỉ trọng lực và lực căng dây', ok: true, why: 'Đúng. Hợp của hai lực này nằm ngang, hướng vào tâm quỹ đạo, và đóng vai trò lực hướng tâm.' },
        { text: 'Trọng lực, lực căng dây và lực hướng tâm', ok: false, why: 'Lực hướng tâm không phải lực thứ ba. Đó là tên gọi của hợp lực P + T.' },
        { text: 'Trọng lực, lực căng dây và lực ly tâm', ok: false, why: 'Lực ly tâm chỉ xuất hiện nếu xét trong hệ quy chiếu quay theo vật. Ở hệ quy chiếu mặt đất không có lực này.' },
      ],
    },
    fbd: {
      note: 'Hệ quy chiếu mặt đất. Vật đang ở bên phải trục quay.',
      bodies: [
        { id: 'vat', label: 'Vật', rope: 150, palette: ['P', 'T', 'Fht', 'N', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 150 }] },
      ],
    },
    solution: [
      { title: 'Bán kính quỹ đạo', body: t`Vật quay trên đường tròn bán kính $r = \ell\sin\alpha$.` },
      { title: 'Phương thẳng đứng: cân bằng', body: t`$T\cos\alpha = mg$, nên $T = \dfrac{mg}{\cos\alpha} = 19{,}6$ N (PDF làm tròn thành 20 N).` },
      { title: 'Phương ngang: hướng tâm', body: t`$T\sin\alpha = \dfrac{m\upsilon^2}{r}$. Chia cho phương trình trên: $\mathrm{tg}\,\alpha = \dfrac{\upsilon^2}{g\ell\sin\alpha}$, nên $\upsilon = \sqrt{g\ell\sin\alpha\,\mathrm{tg}\,\alpha} \approx 2{,}1$ m/s.` },
    ],
  },
  {
    id: '3.4', star: true, ch: 3, oldCh: 3, page: 2,
    title: 'Người trong thang máy',
    group: 'phi-quan-tinh', fade: 0,
    statement: t`Một người khối lượng $m_1 = 60$ kg đứng trong thang máy có khối lượng $m_2 = 300$ kg. Thang máy chuyển động lên trên với gia tốc $a = 0{,}8$ m/s². Tính lực căng của dây cáp treo thang máy, lực người đó nén lên sàn, trong hai trường hợp thang máy chuyển động: a) nhanh dần đều; b) chậm dần đều.`,
    given: [
      { key: 'm1', sym: 'm_1', value: 60, unit: 'kg', label: 'Khối lượng người' },
      { key: 'm2', sym: 'm_2', value: 300, unit: 'kg', label: 'Khối lượng thang máy' },
      { key: 'a', sym: 'a', value: 0.8, unit: 'm/s²', label: 'Độ lớn gia tốc' },
    ],
    vars: { m1: [30, 100], m2: [100, 800], a: [0.1, 3], g: [9, 10] },
    targets: [
      { key: 'Ta', label: 'Lực căng cáp, nhanh dần', sym: 'T_a', unit: 'N', expr: '(m1 + m2)*(g + a)', pdf: 3816 },
      { key: 'Na', label: 'Lực người nén lên sàn, nhanh dần', sym: 'N_a', unit: 'N', expr: 'm1*(g + a)', pdf: 636 },
      { key: 'Tb', label: 'Lực căng cáp, chậm dần', sym: 'T_b', unit: 'N', expr: '(m1 + m2)*(g - a)', pdf: 3240 },
      { key: 'Nb', label: 'Lực người nén lên sàn, chậm dần', sym: 'N_b', unit: 'N', expr: 'm1*(g - a)', pdf: 540 },
    ],
    model: (v) => ({
      Ta: (v.m1 + v.m2) * (G + v.a), Na: v.m1 * (G + v.a),
      Tb: (v.m1 + v.m2) * (G - v.a), Nb: v.m1 * (G - v.a),
    }),
    vary: { m1: [50, 80, 5], m2: [200, 500, 50], a: [0.5, 2, 0.1] },
    predict: {
      q: 'Thang máy đi lên và chậm dần. Gia tốc của nó hướng về đâu?',
      options: [
        { text: 'Hướng xuống', ok: true, why: 'Chậm dần nghĩa là gia tốc ngược chiều vận tốc. Vận tốc hướng lên nên gia tốc hướng xuống.' },
        { text: 'Hướng lên, vì thang máy đang đi lên', ok: false, why: 'Chiều gia tốc không nhất thiết trùng chiều chuyển động. Khi chậm dần, hai chiều này ngược nhau.' },
        { text: 'Bằng không', ok: false, why: 'Vận tốc đang thay đổi, nên gia tốc khác không.' },
      ],
    },
    fbd: {
      note: 'Hệ quy chiếu mặt đất. Trường hợp a, thang máy đi lên nhanh dần.',
      bodies: [
        { id: 'nguoi', label: 'Người', surface: 0, palette: ['P', 'N', 'Fqt', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'N', angle: 90 }] },
        { id: 'thang', label: 'Thang máy', rope: 90, palette: ['P', 'N', 'T', 'Q', 'Fqt'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }, { type: 'Q', angle: 270 }] },
      ],
    },
    solution: [
      { title: 'Cả hệ người + thang', body: t`Chiều dương hướng lên: $T - (m_1 + m_2)g = (m_1 + m_2)a$, nên $T = (m_1 + m_2)(g + a)$.` },
      { title: 'Riêng người', body: t`$N - m_1 g = m_1 a$, nên $N = m_1(g + a)$. Theo định luật III, người nén lên sàn một lực bằng $N$.` },
      { title: 'Hai trường hợp', body: t`a) Nhanh dần, gia tốc hướng lên: $T = 3816$ N, $N = 636$ N. b) Chậm dần, gia tốc hướng xuống, thay $a$ bằng $-a$: $T = 3240$ N, $N = 540$ N.` },
    ],
  },
  {
    id: '3.5', star: true, ch: 3, oldCh: 3, page: 2,
    title: 'Người tự kéo sàn treo',
    group: 'rong-roc', fade: 2,
    statement: t`Một người nặng 72 kg ngồi trên sàn treo nặng 12 kg như hình vẽ. Hỏi người đó phải kéo dây với một lực bằng bao nhiêu để sàn chuyển động nhanh dần đều lên cao được 3 m trong thời gian là 2 s. Tính áp lực của người đó lên sàn.`,
    figure: 'self-hoist',
    given: [
      { key: 'M', sym: 'M', value: 72, unit: 'kg', label: 'Khối lượng người' },
      { key: 'm', sym: 'm', value: 12, unit: 'kg', label: 'Khối lượng sàn' },
      { key: 'h', sym: 'h', value: 3, unit: 'm', label: 'Độ cao nâng' },
      { key: 't', sym: 't', value: 2, unit: 's', label: 'Thời gian' },
    ],
    vars: { M: [40, 100], m: [5, 30], h: [1, 10], t: [1, 5], g: [9, 10] },
    targets: [
      { key: 'F', label: 'Lực người kéo dây', sym: 'F', unit: 'N', expr: '(M + m)*(g + 2*h/t^2)/2', pdf: 475 },
      { key: 'N', label: 'Áp lực của người lên sàn', sym: 'N', unit: 'N', expr: '(M - m)*(g + 2*h/t^2)/2', pdf: 340 },
    ],
    model: (v) => {
      const a = (2 * v.h) / v.t ** 2;
      return { F: ((v.M + v.m) * (G + a)) / 2, N: ((v.M - v.m) * (G + a)) / 2 };
    },
    vary: { M: [55, 80, 5], m: [8, 20, 2], h: [2, 5, 1], t: [2, 4, 1] },
    predict: {
      q: 'Dây vắt qua ròng rọc cố định, một đầu buộc vào sàn, đầu kia người cầm kéo. Dây kéo hệ người + sàn lên với tổng lực bao nhiêu?',
      options: [
        { text: '2F, vì cả hai nhánh dây đều kéo hệ lên', ok: true, why: 'Đúng. Nếu xét hệ người + sàn, hai nhánh dây đều nối vào hệ và đều kéo lên với lực F.' },
        { text: 'F, vì người chỉ kéo một lần', ok: false, why: 'Nhánh dây người cầm kéo người lên với lực F, và nhánh buộc vào sàn cũng kéo sàn lên với lực F.' },
        { text: 'Bằng 0, vì người kéo chính mình', ok: false, why: 'Người không kéo chính mình: dây truyền lực qua ròng rọc gắn vào trần, là vật ngoài hệ.' },
      ],
    },
    fbd: {
      note: 'Hệ quy chiếu mặt đất. Xét riêng từng vật.',
      bodies: [
        { id: 'nguoi', label: 'Người', surface: 0, rope: 90, palette: ['P', 'N', 'T', 'Q', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }, { type: 'N', angle: 90 }] },
        { id: 'san', label: 'Sàn treo', rope: 90, palette: ['P', 'N', 'T', 'Q', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }, { type: 'Q', angle: 270 }] },
      ],
    },
    solution: [
      { title: 'Gia tốc', body: t`Nhanh dần đều từ nghỉ: $h = \tfrac12 a t^2$, nên $a = \dfrac{2h}{t^2} = 1{,}5$ m/s².` },
      { title: 'Hệ người + sàn', body: t`Hai nhánh dây cùng kéo lên: $2F - (M + m)g = (M + m)a$, nên $F = \dfrac{(M + m)(g + a)}{2} \approx 475$ N.` },
      { title: 'Riêng người', body: t`$F + N - Mg = Ma$, nên $N = M(g + a) - F = \dfrac{(M - m)(g + a)}{2} \approx 339$ N. Người nén lên sàn lực bằng $N$ (PDF ghi 340 N).` },
    ],
  },
  {
    id: '3.6', star: true, ch: 3, oldCh: 3, page: 3,
    title: 'Hệ ròng rọc động',
    group: 'rong-roc', fade: 3,
    statement: t`Hãy xác định gia tốc của các vật $m_1$, $m_2$ và các lực căng $T$ của các dây trong hệ mô tả trên hình vẽ. Cho biết dây không co dãn, bỏ qua ma sát, khối lượng của ròng rọc và dây không đáng kể.`,
    figure: 'movable-pulley',
    sample: true,
    given: [
      { key: 'm1', sym: 'm_1', value: 1, unit: 'kg', label: 'Khối lượng vật treo ở ròng rọc cố định' },
      { key: 'm2', sym: 'm_2', value: 1, unit: 'kg', label: 'Khối lượng vật treo ở ròng rọc động' },
    ],
    vars: { m1: [0.5, 5], m2: [0.5, 5], g: [9, 10] },
    targets: [
      { key: 'a1', label: 'Gia tốc vật m₁', sym: 'a_1', unit: 'm/s²', expr: '2*g*(2*m1 - m2)/(4*m1 + m2)', pdfExpr: t`a_1 = 2a_2 = \dfrac{2g(2m_1 - m_2)}{4m_1 + m_2}` },
      { key: 'a2', label: 'Gia tốc vật m₂', sym: 'a_2', unit: 'm/s²', expr: 'g*(2*m1 - m2)/(4*m1 + m2)' },
      { key: 'T1', label: 'Lực căng dây', sym: 'T_1', unit: 'N', expr: '3*m1*m2*g/(4*m1 + m2)', pdfExpr: t`T_1 = \dfrac{3m_1 m_2 g}{4m_1 + m_2}` },
    ],
    model: (v) => {
      const a2 = (G * (2 * v.m1 - v.m2)) / (4 * v.m1 + v.m2);
      return { a1: 2 * a2, a2, T1: (3 * v.m1 * v.m2 * G) / (4 * v.m1 + v.m2) };
    },
    vary: { m1: [0.5, 3, 0.5], m2: [0.5, 3, 0.5] },
    fbd: {
      note: 'Hệ quy chiếu mặt đất. Xét m₂ cùng ròng rọc động như một vật.',
      bodies: [
        { id: 'm1', label: 'Vật m₁', rope: 90, palette: ['P', 'N', 'T', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }] },
        { id: 'm2', label: 'Vật m₂ + ròng rọc động', rope: 90, palette: ['P', 'N', 'T', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }, { type: 'T', angle: 90 }] },
      ],
    },
    solution: [
      { title: 'Liên hệ gia tốc', body: t`Khi $m_2$ (cùng ròng rọc động) đi lên một đoạn $x$, cả hai nhánh dây quanh ròng rọc động cùng ngắn đi $x$, nên $m_1$ đi xuống $2x$. Vậy $a_1 = 2a_2$.` },
      { title: 'Định luật II', body: t`Vật $m_1$ (dương hướng xuống): $m_1 g - T = m_1 a_1$. Vật $m_2$ (dương hướng lên, hai nhánh dây): $2T - m_2 g = m_2 a_2$.` },
      { title: 'Giải hệ', body: t`$a_2 = \dfrac{g(2m_1 - m_2)}{4m_1 + m_2}$, $a_1 = 2a_2$, $T = \dfrac{3m_1 m_2 g}{4m_1 + m_2}$.` },
    ],
  },
  {
    id: '3.7', star: false, ch: 3, oldCh: 3, page: 3,
    title: 'Vòng trượt dọc sợi dây',
    group: 'rong-roc', fade: 1,
    statement: t`Một vật A khối lượng $m_1$ buộc vào một đầu dây vắt qua ròng rọc, đầu kia là một vòng B khối lượng $m_2$ có thể trượt dọc sợi dây. Tính gia tốc chuyển động của vòng B, lực ma sát giữa sợi dây và B khi A chuyển động đều, nếu ban đầu hệ đứng yên. Bỏ qua khối lượng của ròng rọc và ma sát.`,
    figure: 'ring-rope',
    sample: true,
    given: [
      { key: 'm1', sym: 'm_1', value: 0.2, unit: 'kg', label: 'Khối lượng vật A' },
      { key: 'm2', sym: 'm_2', value: 0.5, unit: 'kg', label: 'Khối lượng vòng B' },
    ],
    vars: { m1: [0.1, 2], m2: [0.1, 2], g: [9, 10] },
    targets: [
      { key: 'a', label: 'Gia tốc vòng B', sym: 'a', unit: 'm/s²', expr: '(1 - m1/m2)*g', pdfExpr: t`a = \left(1 - \dfrac{m_1}{m_2}\right)g` },
      { key: 'Fms', label: 'Lực ma sát giữa dây và B', sym: t`F_{ms}`, unit: 'N', expr: 'm1*g', pdfExpr: t`F_{ms} = m_1 g` },
    ],
    model: (v) => ({ a: (1 - v.m1 / v.m2) * G, Fms: v.m1 * G }),
    vary: { m1: [0.1, 0.4, 0.1], m2: [0.5, 1, 0.1] },
    predict: {
      q: 'Ban đầu hệ đứng yên và A chuyển động đều. Vậy vận tốc của A là bao nhiêu?',
      options: [
        { text: 'Bằng 0: A đứng yên suốt', ok: true, why: 'Chuyển động đều với vận tốc ban đầu bằng 0 nghĩa là A đứng yên. Do đó lực căng dây bằng trọng lượng A.' },
        { text: 'Khác 0 và không đổi', ok: false, why: 'Hệ bắt đầu từ trạng thái đứng yên, nên nếu không có gia tốc thì vận tốc vẫn bằng 0.' },
      ],
    },
    fbd: {
      note: 'Hệ quy chiếu mặt đất.',
      bodies: [
        { id: 'A', label: 'Vật A', rope: 90, palette: ['P', 'N', 'T', 'Fms', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'T', angle: 90 }] },
        { id: 'B', label: 'Vòng B', palette: ['P', 'N', 'T', 'Fms', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'Fms', angle: 90 }] },
      ],
    },
    solution: [
      { title: 'Vật A đứng yên', body: t`A chuyển động đều từ trạng thái nghỉ, nên A đứng yên: lực căng dây $T = m_1 g$.` },
      { title: 'Lực ma sát lên B', body: t`Dây không khối lượng, nên lực ma sát dây tác dụng lên B bằng lực căng dây: $F_{ms} = T = m_1 g$, hướng lên.` },
      { title: 'Gia tốc của B', body: t`$m_2 g - F_{ms} = m_2 a$, nên $a = \left(1 - \dfrac{m_1}{m_2}\right)g$.` },
    ],
  },
  {
    id: '3.8', star: true, ch: 3, oldCh: 3, page: 3,
    title: 'Vật trên nêm chuyển động có gia tốc',
    group: 'phi-quan-tinh', fade: 3,
    statement: t`Một vật khối lượng $m$ đứng yên trên đỉnh một mặt phẳng nghiêng nhờ lực ma sát. Cho biết chiều dài mặt phẳng nghiêng $S = 1$ m, góc $\alpha = 30^\circ$, hệ số ma sát giữa vật và mặt phẳng nghiêng $\mu = 0{,}6$. Hỏi: Mặt phẳng nghiêng có thể chuyển động với gia tốc $a_{\max}$ (so với mặt đất) là bao nhiêu để vật vẫn đứng yên trên nêm. Nếu gia tốc chuyển động của mặt phẳng nghiêng là $a_0 = 1$ m/s² thì sau bao nhiêu lâu vật sẽ trượt đến chân mặt phẳng nghiêng.`,
    figure: 'wedge',
    given: [
      { key: 'S', sym: 'S', value: 1, unit: 'm', label: 'Chiều dài mặt nghiêng' },
      { key: 'alpha', sym: t`\alpha`, value: 30, unit: '°', label: 'Góc nghiêng' },
      { key: 'mu', sym: t`\mu`, value: 0.6, unit: '', label: 'Hệ số ma sát' },
      { key: 'a0', sym: 'a_0', value: 1, unit: 'm/s²', label: 'Gia tốc của nêm' },
    ],
    vars: { S: [0.5, 3], alpha: [0.3, 1.1], mu: [0.6, 0.9], a0: [0.5, 5], g: [9, 10] },
    targets: [
      { key: 'amax', label: 'Gia tốc lớn nhất của nêm để vật đứng yên', sym: t`a_{\max}`, unit: 'm/s²', expr: 'g*(mu/tan(alpha) - 1)/(1/tan(alpha) + mu)', pdfExpr: t`a_{\max} = \dfrac{\mu\cot\alpha - 1}{\mu + \cot\alpha}`, pdf: 0.165 },
      { key: 't', label: 'Thời gian trượt đến chân dốc', sym: 't', unit: 's', expr: 'sqrt(2*S/(g*(sin(alpha) - mu*cos(alpha)) + a0*(cos(alpha) + mu*sin(alpha))))', pdfExpr: t`t = \left(\dfrac{2S}{g(\sin\alpha - \mu\cos\alpha) + a_0(\cos\alpha + \mu\sin\alpha)}\right)^{1/2}`, pdf: null },
    ],
    errata: t`Đáp số in trong PDF có hai lỗi. Công thức $a_{\max}$ thiếu thừa số $g$: phải là $a_{\max} = g\,\dfrac{\mu\cot\alpha - 1}{\mu + \cot\alpha}$; con số 0,165 m/s² chỉ đúng khi đã nhân $g = 9{,}8$. Thời gian in là "1 phút 41s" là sai; thay số đúng cho $t \approx 1{,}43$ s.`,
    model: (v) => {
      const a = rad(v.alpha);
      const cot = 1 / Math.tan(a);
      const acc = G * (Math.sin(a) - v.mu * Math.cos(a)) + v.a0 * (Math.cos(a) + v.mu * Math.sin(a));
      return { amax: (G * (v.mu * cot - 1)) / (cot + v.mu), t: Math.sqrt((2 * v.S) / acc) };
    },
    vary: { S: [0.5, 2, 0.5], alpha: [25, 30, 5], mu: [0.6, 0.7, 0.05], a0: [1, 3, 0.5] },
    frame: {
      q: 'Trong hệ quy chiếu gắn với nêm (đang có gia tốc hướng sang trái), cần thêm lực nào lên vật?',
      options: [
        { text: 'Lực quán tính −ma₀, hướng sang phải', ok: true, why: t`Đúng. Hệ quy chiếu gắn với nêm là phi quán tính; mọi vật trong đó chịu thêm $\vec F_{qt} = -m\vec a_0$, ngược chiều gia tốc của nêm.` },
        { text: 'Lực quán tính hướng sang trái, cùng chiều gia tốc', ok: false, why: 'Lực quán tính luôn ngược chiều gia tốc của hệ quy chiếu.' },
        { text: 'Không cần thêm lực nào', ok: false, why: 'Chỉ đúng nếu làm việc ở hệ quy chiếu mặt đất. Ở hệ quy chiếu nêm phải thêm lực quán tính.' },
      ],
    },
    fbd: {
      note: 'Hệ quy chiếu gắn với nêm. Vật đang đứng yên ở đỉnh nêm.',
      bodies: [
        { id: 'vat', label: 'Vật', surface: -30, palette: ['P', 'N', 'Fms', 'Fqt', 'Fdi'],
          expected: [{ type: 'P', angle: 270 }, { type: 'N', angle: 60 }, { type: 'Fqt', angle: 0 }, { type: 'Fms', angle: 150 }] },
      ],
    },
    solution: [
      { title: 'Lực trong hệ quy chiếu nêm', body: t`Lực quán tính $ma_0$ hướng sang phải có thành phần $ma_0\cos\alpha$ dọc dốc hướng xuống, và $ma_0\sin\alpha$ kéo vật ra khỏi mặt dốc. Do đó $N = m(g\cos\alpha - a_0\sin\alpha)$.` },
      { title: 'Điều kiện đứng yên', body: t`$mg\sin\alpha + ma_0\cos\alpha \le \mu N$, suy ra $a_0 \le g\,\dfrac{\mu\cos\alpha - \sin\alpha}{\cos\alpha + \mu\sin\alpha} = g\,\dfrac{\mu\cot\alpha - 1}{\mu + \cot\alpha} \approx 0{,}165$ m/s².` },
      { title: 'Khi nêm có gia tốc 1 m/s²', body: t`Gia tốc vật dọc dốc: $a = g(\sin\alpha - \mu\cos\alpha) + a_0(\cos\alpha + \mu\sin\alpha) \approx 0{,}974$ m/s².` },
      { title: 'Thời gian trượt hết dốc', body: t`$S = \tfrac12 a t^2$, nên $t = \sqrt{2S/a} \approx 1{,}43$ s.` },
    ],
  },
  {
    id: '3.9', star: false, ch: 3, oldCh: 3, page: 3,
    title: 'Mặt nước trong chậu trượt trên dốc',
    group: 'phi-quan-tinh', fade: 2,
    statement: t`Một chậu nước trượt trên mặt dốc có góc nghiêng so với phương ngang là $\alpha$. Hệ số ma sát trượt giữa chậu và mặt dốc là $\mu < \mathrm{tg}\,\alpha$. Hãy xác định góc nghiêng $\beta$ của mặt nước so với mặt dốc.`,
    sample: true,
    given: [
      { key: 'mu', sym: t`\mu`, value: 0.3, unit: '', label: 'Hệ số ma sát' },
    ],
    vars: { mu: [0.05, 0.9] },
    targets: [{ key: 'beta', label: 'Góc mặt nước so với mặt dốc', sym: t`\beta`, unit: '°', angleOut: true, expr: 'arctg(mu)', pdfExpr: t`\beta = \mathrm{arctg}\,\mu` }],
    model: (v) => ({ beta: deg(Math.atan(v.mu)) }),
    vary: { mu: [0.1, 0.6, 0.05] },
    solution: [
      { title: 'Gia tốc của chậu', body: t`$a = g(\sin\alpha - \mu\cos\alpha)$, hướng xuống dốc.` },
      { title: 'Trọng lực hiệu dụng trong hệ quy chiếu chậu', body: t`$\vec g_{hd} = \vec g - \vec a$. Thành phần dọc dốc: $g\sin\alpha - a = \mu g\cos\alpha$. Thành phần vuông góc dốc: $g\cos\alpha$.` },
      { title: 'Mặt nước vuông góc với trọng lực hiệu dụng', body: t`Góc giữa $\vec g_{hd}$ và pháp tuyến của dốc thoả $\mathrm{tg}\,\beta = \dfrac{\mu g\cos\alpha}{g\cos\alpha} = \mu$, nên $\beta = \mathrm{arctg}\,\mu$, không phụ thuộc $\alpha$.` },
    ],
  },
  {
    id: '3.10', star: false, ch: 3, oldCh: 3, page: 3,
    title: 'Cân bàn trên xe trượt dốc',
    group: 'phi-quan-tinh', fade: 1,
    statement: t`Một người đứng trên cân bàn đặt trên xe nhỏ. Khi xe chuyển động không ma sát trên mặt phẳng nghiêng một góc $\alpha$ so với phương nằm ngang thì người đó thấy trọng lượng của mình chỉ còn bằng 3/4 trọng lượng khi xe đứng yên. Hãy xác định góc $\alpha$.`,
    figure: 'cart-scale',
    given: [
      { key: 'k', sym: 'k', value: 0.75, unit: '', label: 'Tỉ số trọng lượng biểu kiến / trọng lượng thật' },
    ],
    vars: { k: [0.1, 0.95] },
    targets: [{ key: 'alpha', label: 'Góc nghiêng', sym: t`\alpha`, unit: '°', angleOut: true, expr: 'arccos(sqrt(k))', pdf: 30 }],
    model: (v) => ({ alpha: deg(Math.acos(Math.sqrt(v.k))) }),
    vary: { k: [0.5, 0.9, 0.05] },
    solution: [
      { title: 'Gia tốc của xe', body: t`Không ma sát: $a = g\sin\alpha$ dọc dốc hướng xuống. Thành phần thẳng đứng của gia tốc: $a_y = g\sin^2\alpha$ hướng xuống.` },
      { title: 'Phương thẳng đứng cho người', body: t`$mg - N = m g\sin^2\alpha$, nên $N = mg\cos^2\alpha$.` },
      { title: 'Giải góc', body: t`$\cos^2\alpha = \tfrac34$, nên $\cos\alpha = \tfrac{\sqrt3}{2}$ và $\alpha = 30^\circ$.` },
    ],
  },
  {
    id: '3.11', star: false, ch: 3, oldCh: 3, page: 4,
    title: 'Con khỉ leo dây qua ròng rọc',
    group: 'rong-roc', fade: 4,
    statement: t`Một sợi dây không co dãn vắt qua một ròng rọc cố định có khối lượng không đáng kể. Một đầu dây treo một vật khối lượng $m$, đầu dây kia có một con khỉ khối lượng $2m$ bám vào. Con khỉ leo lên dây với gia tốc $a'$, so với dây. Hãy tìm gia tốc $a$ của con khỉ đối với mặt đất.`,
    figure: 'monkey',
    sample: true,
    given: [
      { key: 'ap', sym: "a'", value: 14, unit: 'm/s²', label: 'Gia tốc của khỉ so với dây' },
    ],
    vars: { ap: [0, 30], g: [9, 10] },
    targets: [{ key: 'a', label: 'Gia tốc khỉ so với mặt đất', sym: 'a', unit: 'm/s²', expr: '(ap - g)/3', pdfExpr: t`a = \dfrac{a' - g}{3}` }],
    hint: "Trong ô công thức, gõ ap cho a'.",
    model: (v) => ({ a: (v.ap - G) / 3 }),
    vary: { ap: [10, 25, 1] },
    solution: [
      { title: 'Liên hệ gia tốc', body: t`Gọi $A$ là gia tốc của vật $m$ đi lên. Dây bên khỉ đi xuống với gia tốc $A$, nên khỉ có gia tốc so với đất $a = a' - A$ (dương hướng lên).` },
      { title: 'Định luật II', body: t`Vật: $T - mg = mA$. Khỉ: $T - 2mg = 2m a$.` },
      { title: 'Giải', body: t`Khử $T$ và $A$: $a = \dfrac{a' - g}{3}$.` },
    ],
  },
  {
    id: '3.12', star: false, ch: 3, oldCh: 3, page: 4,
    title: 'Lực Coriolis làm nghiêng mặt nước sông',
    group: 'phi-quan-tinh', fade: 4,
    statement: t`Sự quay của trái đất xung quanh trục của mình làm mặt nước trên các sông không nằm trong mặt phẳng nằm ngang. Hãy xác định phía bờ sông bên nào mức nước sẽ cao hơn và tính độ chênh lệch mức nước đó, biết rằng sông nằm ở bán cầu phía bắc và chảy từ bắc xuống nam. Độ rộng sông là $\ell$, vận tốc dòng chảy là $\upsilon$, vĩ độ nơi đó là $\varphi$, vận tốc góc của trái đất quay quanh trục là $\omega$, bỏ qua lực quán tính ly tâm.`,
    sample: true,
    given: [
      { key: 'v', sym: t`\upsilon`, value: 2, unit: 'm/s', label: 'Vận tốc dòng chảy' },
      { key: 'omega', sym: t`\omega`, value: 7.29e-5, unit: 'rad/s', label: 'Vận tốc góc Trái Đất' },
      { key: 'l', sym: t`\ell`, value: 500, unit: 'm', label: 'Độ rộng sông' },
      { key: 'phi', sym: t`\varphi`, value: 21, unit: '°', label: 'Vĩ độ' },
    ],
    vars: { v: [0.5, 5], omega: [1e-5, 1e-4], l: [10, 1000], phi: [0.1, 1.4], g: [9, 10] },
    targets: [{ key: 'h', label: 'Độ chênh mực nước', sym: 'h', unit: 'm', expr: '2*v*omega*l*sin(phi)/g', pdfExpr: t`h = \dfrac{2\upsilon\omega\ell\sin\varphi}{g}` }],
    model: (v) => ({ h: (2 * v.v * v.omega * v.l * Math.sin(rad(v.phi))) / G }),
    vary: { v: [1, 3, 0.5], l: [100, 800, 100], phi: [10, 60, 5] },
    predict: {
      q: 'Sông ở bán cầu Bắc, chảy từ bắc xuống nam. Bờ nào có mực nước cao hơn?',
      options: [
        { text: 'Bờ phải theo chiều dòng chảy, tức bờ tây', ok: true, why: 'Ở bán cầu Bắc, lực Coriolis làm lệch vật chuyển động sang bên phải so với chiều chuyển động. Nước dồn về bờ phải, tức bờ tây khi sông chảy về nam.' },
        { text: 'Bờ trái theo chiều dòng chảy, tức bờ đông', ok: false, why: 'Lệch sang trái chỉ xảy ra ở bán cầu Nam.' },
        { text: 'Hai bờ như nhau', ok: false, why: 'Trái Đất quay, nên trong hệ quy chiếu gắn với mặt đất nước chịu thêm lực Coriolis vuông góc với dòng chảy.' },
      ],
    },
    frame: {
      q: 'Làm việc trong hệ quy chiếu gắn với mặt đất (đang quay), cần thêm lực nào để giải thích độ nghiêng mặt nước?',
      options: [
        { text: 'Lực Coriolis −2m ω × υ', ok: true, why: t`Đúng. Lực này có thành phần nằm ngang $2m\omega\upsilon\sin\varphi$, vuông góc với dòng chảy.` },
        { text: 'Lực ly tâm', ok: false, why: 'Đề cho bỏ qua lực quán tính ly tâm; lực ly tâm cũng không phụ thuộc vận tốc dòng chảy.' },
      ],
    },
    solution: [
      { title: 'Thành phần ngang của lực Coriolis', body: t`$F_C = 2m\omega\upsilon\sin\varphi$, vuông góc với dòng chảy, hướng sang bờ phải (bờ tây).` },
      { title: 'Mặt nước vuông góc với hợp lực', body: t`Mặt nước nghiêng góc $\theta$ với $\mathrm{tg}\,\theta = \dfrac{F_C}{mg} = \dfrac{2\omega\upsilon\sin\varphi}{g}$.` },
      { title: 'Độ chênh mực nước', body: t`$h = \ell\,\mathrm{tg}\,\theta = \dfrac{2\upsilon\omega\ell\sin\varphi}{g}$. Với số liệu luyện tập: khoảng 5 mm.` },
    ],
  },
  {
    id: '3.13', star: false, ch: 3, oldCh: 3, page: 4,
    title: 'Áp lực của đường ray ở xích đạo',
    group: 'phi-quan-tinh', fade: 5,
    statement: t`Một đoàn tầu hỏa khối lượng $m$ đang chuyển động dọc theo đường xích đạo từ đông sang tây với vận tốc $\upsilon$ tương đối so với mặt đất. Biết rằng Trái đất luôn quay quanh trục của mình với vận tốc góc là $\omega$, bỏ qua ma sát, hãy xác định lực tác dụng của đường ray lên đoàn tầu.`,
    sample: true,
    given: [
      { key: 'm', sym: 'm', value: 5e5, unit: 'kg', label: 'Khối lượng đoàn tàu' },
      { key: 'v', sym: t`\upsilon`, value: 20, unit: 'm/s', label: 'Vận tốc so với mặt đất' },
      { key: 'omega', sym: t`\omega`, value: 7.29e-5, unit: 'rad/s', label: 'Vận tốc góc Trái Đất' },
      { key: 'R', sym: 'R', value: 6.37e6, unit: 'm', label: 'Bán kính Trái Đất' },
    ],
    vars: { m: [1e3, 1e6], v: [1, 50], omega: [1e-5, 1e-4], R: [1e6, 1e7], g: [9, 10] },
    targets: [{ key: 'N', label: 'Lực đường ray tác dụng lên tàu', sym: 'N', unit: 'N', expr: 'm*g - m*omega^2*R + 2*m*v*omega - m*v^2/R', pdfExpr: t`N = mg - m\omega^2 R + 2m\upsilon\omega - \dfrac{m\upsilon^2}{R}` }],
    model: (v) => ({ N: v.m * G - v.m * v.omega ** 2 * v.R + 2 * v.m * v.v * v.omega - (v.m * v.v ** 2) / v.R }),
    vary: { v: [10, 40, 5] },
    solution: [
      { title: 'Vận tốc trong hệ quy chiếu quán tính', body: t`Mặt đất ở xích đạo chạy về phía đông với tốc độ $\omega R$. Tàu đi về phía tây nên tốc độ thực là $\omega R - \upsilon$.` },
      { title: 'Định luật II theo phương hướng tâm', body: t`$mg - N = \dfrac{m(\omega R - \upsilon)^2}{R}$.` },
      { title: 'Khai triển', body: t`$N = mg - m\omega^2 R + 2m\upsilon\omega - \dfrac{m\upsilon^2}{R}$.` },
    ],
  },
  {
    id: '3.14', star: false, ch: 3, oldCh: 3, page: 4,
    title: 'Mặt nước trong cốc quay',
    group: 'phi-quan-tinh', fade: 6,
    statement: t`Một cái cốc đựng nước hình trụ quay quanh trục đối xứng hướng theo phương thẳng đứng với vận tốc góc là $\omega$. Hãy xác định phương trình mô tả dạng mặt nước trong cốc.`,
    sample: true,
    given: [
      { key: 'omega', sym: t`\omega`, value: 10, unit: 'rad/s', label: 'Vận tốc góc' },
      { key: 'x', sym: 'x', value: 0.03, unit: 'm', label: 'Khoảng cách tới trục' },
    ],
    vars: { omega: [1, 30], x: [0.005, 0.1], g: [9, 10] },
    targets: [{ key: 'y', label: 'Độ cao mặt nước so với đáy lõm', sym: 'y', unit: 'm', expr: 'omega^2*x^2/(2*g)', pdfExpr: t`y = \dfrac{\omega^2}{2g}x^2` }],
    model: (v) => ({ y: (v.omega ** 2 * v.x ** 2) / (2 * G) }),
    vary: { omega: [5, 20, 1], x: [0.01, 0.05, 0.01] },
    frame: {
      q: 'Trong hệ quy chiếu quay cùng cốc, một phần tử nước trên mặt thoáng chịu những lực nào?',
      options: [
        { text: 'Trọng lực, lực ly tâm mω²x và lực ép của phần nước xung quanh', ok: true, why: 'Đúng. Mặt thoáng luôn vuông góc với hợp của trọng lực và lực ly tâm.' },
        { text: 'Chỉ trọng lực', ok: false, why: 'Hệ quy chiếu quay là phi quán tính; phải thêm lực quán tính ly tâm.' },
      ],
    },
    solution: [
      { title: 'Độ dốc mặt thoáng', body: t`Mặt thoáng vuông góc với hợp lực của $mg$ và $m\omega^2 x$, nên $\dfrac{dy}{dx} = \dfrac{\omega^2 x}{g}$.` },
      { title: 'Tích phân', body: t`Chọn gốc tại đáy lõm: $y = \dfrac{\omega^2}{2g}x^2$, một parabol.` },
    ],
  },
];
