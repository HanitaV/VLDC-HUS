// Chương 2 file bài tập = Chương 1 PHY1159: Động học chất điểm.
// Đề bài chép nguyên văn từ "Bài tập Cơ – Nhiệt" (bắt buộc), trang 1–2.
import { G, rad, deg } from './util.js';

const t = String.raw;

// Đồ thị v(t) của Bài 2.1, đọc từ hình trong PDF (trang 1).
export const GRAPH_21 = [
  [0, 0], [2, 8], [10, 8], [12, 4], [16, 4],
];
/** Quãng đường = diện tích dưới đồ thị v(t) từ 0 đến tEnd. */
export function areaUnder(points, tEnd) {
  let s = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [t0, v0] = points[i];
    const [t1, v1] = points[i + 1];
    if (tEnd <= t0) break;
    const tb = Math.min(t1, tEnd);
    const vb = v0 + ((v1 - v0) * (tb - t0)) / (t1 - t0);
    s += ((v0 + vb) / 2) * (tb - t0);
  }
  return s;
}

export default [
  {
    id: '2.1', star: false, ch: 2, oldCh: 2, page: 1,
    title: 'Quãng đường từ đồ thị vận tốc',
    group: 'do-thi', fade: 0,
    statement: t`Một người chạy đua với vận tốc thay đổi theo thời gian được minh họa bằng đồ thị trên hình vẽ. Hỏi người đó chạy được quãng đường là bao nhiêu trong 16 s.`,
    figure: 'vt-graph', sim: 'area-21',
    given: [{ key: 'tEnd', sym: 't', value: 16, unit: 's', label: 'Thời gian chạy' }],
    vars: {},
    targets: [{ key: 's', label: 'Quãng đường', sym: 's', unit: 'm', expr: null, pdf: 100 }],
    model: (v) => ({ s: areaUnder(GRAPH_21, v.tEnd) }),
    predict: {
      q: 'Trên đồ thị v(t), quãng đường đi được ứng với đại lượng hình học nào?',
      options: [
        { text: 'Diện tích phần nằm dưới đồ thị', ok: true, why: t`Đúng. Trong khoảng thời gian ngắn $\Delta t$ vật đi được $v\,\Delta t$, đúng bằng diện tích một dải hẹp dưới đồ thị.` },
        { text: 'Độ dốc của đồ thị', ok: false, why: 'Độ dốc của đồ thị v(t) là gia tốc, không phải quãng đường.' },
        { text: 'Giá trị v lớn nhất nhân 16 s', ok: false, why: 'Chỉ đúng nếu người chạy giữ 8 m/s suốt 16 s. Ở đây vận tốc thay đổi.' },
      ],
    },
    solution: [
      { title: 'Chia đồ thị thành các hình đơn giản', body: t`Đọc đồ thị: tăng đều từ 0 lên 8 m/s trong 2 s đầu, giữ 8 m/s đến $t = 10$ s, giảm đều về 4 m/s lúc $t = 12$ s, rồi giữ 4 m/s đến 16 s.` },
      { title: 'Tính diện tích từng phần', body: t`Tam giác: $\tfrac12\cdot 2\cdot 8 = 8$ m. Chữ nhật: $8\cdot 8 = 64$ m. Hình thang: $\tfrac12(8+4)\cdot 2 = 12$ m. Chữ nhật cuối: $4\cdot 4 = 16$ m.` },
      { title: 'Cộng lại', body: t`$s = 8 + 64 + 12 + 16 = 100$ m.` },
    ],
  },
  {
    id: '2.2', star: true, ch: 2, oldCh: 2, page: 1,
    title: 'Đồ thị vận tốc dạng nửa ellipse',
    group: 'do-thi', fade: 1,
    statement: t`Đồ thị phụ thuộc vận tốc của vật vào thời gian có dạng nửa ellipse như hình vẽ. Vận tốc cực đại của vật là $\upsilon_0$, thời gian chuyển động là $t_0$. Hãy xác định quãng đường mà vật đi được trong thời gian đó.`,
    figure: 'half-ellipse',
    sample: true,
    given: [
      { key: 'v0', sym: t`\upsilon_0`, value: 6, unit: 'm/s', label: 'Vận tốc cực đại' },
      { key: 't0', sym: 't_0', value: 10, unit: 's', label: 'Thời gian chuyển động' },
    ],
    vars: { v0: [1, 20], t0: [1, 30] },
    targets: [{ key: 's', label: 'Quãng đường', sym: 's', unit: 'm', expr: 'pi*v0*t0/4', pdfExpr: t`s = \dfrac{\pi\upsilon_0 t_0}{4}` }],
    model: (v) => ({ s: (Math.PI * v.v0 * v.t0) / 4 }),
    vary: { v0: [2, 12, 1], t0: [4, 20, 2] },
    solution: [
      { title: 'Quãng đường là diện tích nửa ellipse', body: t`Ellipse có hai bán trục: $a = t_0/2$ (theo trục thời gian) và $b = \upsilon_0$ (theo trục vận tốc). Diện tích ellipse đầy đủ là $\pi a b$.` },
      { title: 'Lấy một nửa', body: t`$s = \tfrac12 \pi \cdot \tfrac{t_0}{2}\cdot \upsilon_0 = \dfrac{\pi \upsilon_0 t_0}{4}$.` },
    ],
  },
  {
    id: '2.3', star: false, ch: 2, oldCh: 2, page: 1,
    title: 'Toa tàu thứ n đi qua người quan sát',
    group: 'bien-doi-deu', fade: 0,
    statement: t`Một người quan sát đứng ngang với đầu tầu hoả lúc nó bắt đầu chuyển động và nhận thấy toa đầu tiên chạy ngang qua mình mất một khoảng thời gian $\tau = 4$ s. Hỏi toa tầu thứ $n = 7$ chạy ngang qua người đó trong khoảng thời gian là bao nhiêu lâu? Biết rằng chuyển động của tầu là nhanh dần đều, độ dài của các toa là như nhau và bỏ qua độ dài chỗ nối giữa các toa.`,
    given: [
      { key: 'tau', sym: t`\tau`, value: 4, unit: 's', label: 'Thời gian toa đầu đi qua' },
      { key: 'n', sym: 'n', value: 7, unit: '', label: 'Số thứ tự toa' },
    ],
    vars: { tau: [1, 10], n: [2, 20] },
    targets: [{ key: 'dt', label: 'Thời gian toa thứ n đi qua', sym: t`\Delta t`, unit: 's', expr: 'tau*(sqrt(n) - sqrt(n-1))', pdfExpr: t`\Delta t = \tau(\sqrt n - \sqrt{n-1})`, pdf: 0.785 }],
    model: (v) => ({ dt: v.tau * (Math.sqrt(v.n) - Math.sqrt(v.n - 1)) }),
    vary: { tau: [2, 6, 1], n: [3, 12, 1] },
    predict: {
      q: 'Toa thứ 7 đi qua người quan sát mất thời gian thế nào so với toa đầu (4 s)?',
      options: [
        { text: 'Ít hơn nhiều so với 4 s', ok: true, why: 'Tàu nhanh dần, nên các toa sau đi qua nhanh hơn.' },
        { text: 'Bằng 4 s', ok: false, why: 'Chỉ đúng nếu tàu chạy đều. Tàu đang nhanh dần.' },
        { text: 'Lâu hơn 4 s', ok: false, why: 'Tàu càng lúc càng nhanh nên mỗi toa đi qua càng nhanh.' },
      ],
    },
    solution: [
      { title: 'Viết quãng đường theo thời gian', body: t`Gọi chiều dài một toa là $L$, gia tốc $a$. Từ lúc bắt đầu, sau thời gian $t$ tàu đi được $\tfrac12 a t^2$. Toa đầu đi qua: $L = \tfrac12 a\tau^2$.` },
      { title: 'Thời điểm hết toa thứ n−1 và thứ n', body: t`Hết $k$ toa khi $kL = \tfrac12 a t_k^2$, nên $t_k = \tau\sqrt{k}$.` },
      { title: 'Lấy hiệu', body: t`$\Delta t = t_n - t_{n-1} = \tau(\sqrt n - \sqrt{n-1}) = 4(\sqrt7-\sqrt6) \approx 0{,}785$ s.` },
    ],
  },
  {
    id: '2.4', star: true, ch: 2, oldCh: 2, page: 1,
    title: 'Vật ném thẳng đứng qua độ cao h hai lần',
    group: 'bien-doi-deu', fade: 1,
    statement: t`Một vật được ném lên trên theo phương thẳng đứng. Người quan sát thấy vật đó đi qua vị trí có độ cao $h$ hai lần và khoảng thời gian giữa hai lần đó là $t_0$. Tìm vận tốc ban đầu và thời gian chuyển động của vật từ lúc ném đến khi vật rơi về vị trí ban đầu.`,
    sample: true,
    given: [
      { key: 'h', sym: 'h', value: 20, unit: 'm', label: 'Độ cao' },
      { key: 't0', sym: 't_0', value: 2, unit: 's', label: 'Khoảng thời gian giữa hai lần qua h' },
    ],
    vars: { h: [1, 50], t0: [0.5, 5], g: [9, 10] },
    targets: [
      { key: 'v0', label: 'Vận tốc ban đầu', sym: t`\upsilon_0`, unit: 'm/s', expr: '(g/2)*sqrt(t0^2 + 8*h/g)', pdfExpr: t`\upsilon_0 = \dfrac g2\left(t_0^2 + \dfrac{8h}{g}\right)^{1/2}` },
      { key: 'T', label: 'Thời gian chuyển động', sym: t`\Delta t`, unit: 's', expr: 'sqrt(t0^2 + 8*h/g)', pdfExpr: t`\Delta t = \left(t_0^2 + \dfrac{8h}{g}\right)^{1/2}` },
    ],
    model: (v) => {
      const T = Math.sqrt(v.t0 ** 2 + (8 * v.h) / G);
      return { v0: (G / 2) * T, T };
    },
    vary: { h: [5, 40, 5], t0: [1, 4, 0.5] },
    solution: [
      { title: 'Hai thời điểm qua độ cao h', body: t`$h = \upsilon_0 t - \tfrac12 g t^2$ là phương trình bậc hai theo $t$, có hai nghiệm $t_1 < t_2$.` },
      { title: 'Hiệu hai nghiệm', body: t`$t_2 - t_1 = \dfrac{2}{g}\sqrt{\upsilon_0^2 - 2gh} = t_0$, suy ra $\upsilon_0^2 = \dfrac{g^2 t_0^2}{4} + 2gh$.` },
      { title: 'Rút gọn và tính tổng thời gian', body: t`$\upsilon_0 = \dfrac g2\sqrt{t_0^2 + \dfrac{8h}{g}}$. Vật về chỗ ném sau $\Delta t = \dfrac{2\upsilon_0}{g} = \sqrt{t_0^2 + \dfrac{8h}{g}}$.` },
    ],
  },
  {
    id: '2.5', star: true, ch: 2, oldCh: 2, page: 1,
    title: 'Khoảng cách giữa hai vật ném cùng lúc',
    group: 'nem', fade: 0,
    statement: t`Hai vật được ném đi đồng thời từ cùng một điểm. Vật thứ nhất được ném thẳng đứng lên trên với vận tốc $\upsilon_0 = 25$ m/s, vật thứ hai được ném với cùng vận tốc ban đầu $\upsilon_0$ và tạo với phương ngang góc $\alpha = 60^\circ$. Xác định khoảng cách giữa hai vật sau thời gian $t = 1{,}7$ s.`,
    given: [
      { key: 'v0', sym: t`\upsilon_0`, value: 25, unit: 'm/s', label: 'Vận tốc ban đầu' },
      { key: 'alpha', sym: t`\alpha`, value: 60, unit: '°', label: 'Góc ném vật thứ hai' },
      { key: 't', sym: 't', value: 1.7, unit: 's', label: 'Thời điểm xét' },
    ],
    vars: { v0: [5, 40], alpha: [0.2, 1.4], t: [0.1, 2] },
    targets: [{ key: 's', label: 'Khoảng cách', sym: 's', unit: 'm', expr: 'v0*t*sqrt(2 - 2*sin(alpha))', pdfExpr: null, pdf: 22 }],
    model: (v) => ({ s: v.v0 * v.t * Math.sqrt(2 - 2 * Math.sin(rad(v.alpha))) }),
    vary: { v0: [10, 30, 5], alpha: [30, 75, 15], t: [0.5, 2, 0.5] },
    predict: {
      q: 'Khoảng cách giữa hai vật thay đổi thế nào theo thời gian (khi cả hai còn đang bay)?',
      options: [
        { text: 'Tăng đều, tỉ lệ thuận với t', ok: true, why: t`Hai vật có cùng gia tốc $\vec g$, nên trong hệ quy chiếu gắn với vật này, vật kia chuyển động thẳng đều.` },
        { text: 'Tăng theo t² như rơi tự do', ok: false, why: t`Gia tốc $\vec g$ của hai vật như nhau nên triệt tiêu khi lấy hiệu vị trí.` },
        { text: 'Tăng rồi giảm', ok: false, why: 'Hiệu vận tốc của hai vật không đổi theo thời gian, nên khoảng cách chỉ tăng.' },
      ],
    },
    solution: [
      { title: 'Lấy hiệu hai véc-tơ vị trí', body: t`$\vec r_1 = \vec\upsilon_{01}t + \tfrac12\vec g t^2$, $\vec r_2 = \vec\upsilon_{02}t + \tfrac12\vec g t^2$, nên $\vec r_1 - \vec r_2 = (\vec\upsilon_{01} - \vec\upsilon_{02})\,t$.` },
      { title: 'Độ lớn hiệu vận tốc', body: t`$\vec\upsilon_{01} = (0;\ \upsilon_0)$, $\vec\upsilon_{02} = (\upsilon_0\cos\alpha;\ \upsilon_0\sin\alpha)$. Hiệu có độ lớn $\upsilon_0\sqrt{2 - 2\sin\alpha}$.` },
      { title: 'Thay số', body: t`$s = 25\cdot 1{,}7\cdot\sqrt{2 - 2\sin 60^\circ} \approx 22$ m. Lúc này cả hai vật vẫn đang bay (vật thứ nhất rơi về sau $2\upsilon_0/g \approx 5{,}1$ s).` },
    ],
  },
  {
    id: '2.6', star: true, ch: 2, oldCh: 2, page: 1,
    title: 'Bán kính cong của quỹ đạo ném xiên',
    group: 'nem', fade: 1,
    statement: t`Một hòn đá được ném với vận tốc ban đầu $\upsilon_0 = 20$ m/s theo phương hợp với phương nằm ngang góc $\alpha = 60^\circ$. Xác định bán kính cong $R$ của quỹ đạo hòn đá tại điểm cao nhất và tại điểm nó rơi xuống mặt đất. Bỏ qua sức cản của không khí.`,
    given: [
      { key: 'v0', sym: t`\upsilon_0`, value: 20, unit: 'm/s', label: 'Vận tốc ban đầu' },
      { key: 'alpha', sym: t`\alpha`, value: 60, unit: '°', label: 'Góc ném' },
    ],
    vars: { v0: [5, 40], alpha: [0.2, 1.4], g: [9, 10] },
    targets: [
      { key: 'RB', label: 'Bán kính cong tại điểm cao nhất', sym: 'R_B', unit: 'm', expr: 'v0^2*cos(alpha)^2/g', pdfExpr: t`R_B = \dfrac{\upsilon_0^2\cos^2\alpha}{g}` },
      { key: 'RC', label: 'Bán kính cong tại điểm chạm đất', sym: 'R_C', unit: 'm', expr: 'v0^2/(g*cos(alpha))', pdfExpr: t`R_C = \dfrac{\upsilon_0^2}{g\cos\alpha}` },
    ],
    model: (v) => {
      const c = Math.cos(rad(v.alpha));
      return { RB: (v.v0 ** 2 * c * c) / G, RC: v.v0 ** 2 / (G * c) };
    },
    vary: { v0: [10, 30, 5], alpha: [30, 75, 15] },
    solution: [
      { title: 'Bán kính cong từ gia tốc pháp tuyến', body: t`Tại mọi điểm: $R = \dfrac{\upsilon^2}{a_n}$, với $a_n$ là thành phần của $\vec g$ vuông góc với vận tốc.` },
      { title: 'Tại điểm cao nhất', body: t`Vận tốc nằm ngang, $\upsilon = \upsilon_0\cos\alpha$, và $a_n = g$. Vậy $R_B = \dfrac{\upsilon_0^2\cos^2\alpha}{g} \approx 10{,}2$ m.` },
      { title: 'Tại điểm chạm đất', body: t`$\upsilon = \upsilon_0$, vận tốc hợp với phương ngang góc $\alpha$, nên $a_n = g\cos\alpha$. Vậy $R_C = \dfrac{\upsilon_0^2}{g\cos\alpha} \approx 81{,}6$ m.` },
    ],
  },
  {
    id: '2.7', star: false, ch: 2, oldCh: 2, page: 2,
    title: 'Vận tốc gió trong hệ quy chiếu gắn với tàu',
    group: 'cong-van-toc', fade: 0,
    statement: t`Một con tầu chuyển động dọc theo xích đạo về hướng Đông với vận tốc $\upsilon_0 = 30$ km/h. Trong lúc đó có một luồng gió với vận tốc $\upsilon = 15$ km/h thổi đến từ hướng Đông Nam và hợp với phương xích đạo một góc $\varphi = 60^\circ$. Hãy xác định vận tốc $\upsilon'$ của luồng gió so với tầu và $\varphi'$ – góc giữa hướng gió và xích đạo trong hệ quy chiếu gắn với con tầu.`,
    given: [
      { key: 'v0', sym: t`\upsilon_0`, value: 30, unit: 'km/h', label: 'Vận tốc tàu' },
      { key: 'v', sym: t`\upsilon`, value: 15, unit: 'km/h', label: 'Vận tốc gió' },
      { key: 'phi', sym: t`\varphi`, value: 60, unit: '°', label: 'Góc giữa gió và xích đạo' },
    ],
    vars: { v0: [5, 50], v: [5, 50], phi: [0.2, 1.4] },
    targets: [
      { key: 'vr', label: 'Vận tốc gió so với tàu', sym: t`\upsilon'`, unit: 'km/h', expr: 'sqrt(v0^2 + v^2 + 2*v0*v*cos(phi))', pdf: 39.7 },
      { key: 'phir', label: 'Góc giữa hướng gió và xích đạo', sym: t`\varphi'`, unit: '°', angleOut: true, expr: 'arctg(v*sin(phi)/(v0 + v*cos(phi)))', pdf: 19, pdfTol: 0.01 },
    ],
    model: (v) => {
      const p = rad(v.phi);
      return {
        vr: Math.sqrt(v.v0 ** 2 + v.v ** 2 + 2 * v.v0 * v.v * Math.cos(p)),
        phir: deg(Math.atan((v.v * Math.sin(p)) / (v.v0 + v.v * Math.cos(p)))),
      };
    },
    vary: { v0: [10, 40, 5], v: [5, 25, 5], phi: [30, 75, 15] },
    solution: [
      { title: 'Công thức cộng vận tốc', body: t`Vận tốc gió so với tàu: $\vec\upsilon' = \vec\upsilon - \vec\upsilon_0$.` },
      { title: 'Viết theo toạ độ', body: t`Trục $Ox$ hướng Đông, $Oy$ hướng Bắc. Gió từ Đông Nam thổi về Tây Bắc: $\vec\upsilon = (-\upsilon\cos\varphi;\ \upsilon\sin\varphi)$. Tàu: $\vec\upsilon_0 = (\upsilon_0;\ 0)$.` },
      { title: 'Độ lớn và góc', body: t`$\vec\upsilon' = (-(\upsilon_0 + \upsilon\cos\varphi);\ \upsilon\sin\varphi)$, nên $\upsilon' = \sqrt{\upsilon_0^2 + \upsilon^2 + 2\upsilon_0\upsilon\cos\varphi} \approx 39{,}7$ km/h và $\tan\varphi' = \dfrac{\upsilon\sin\varphi}{\upsilon_0 + \upsilon\cos\varphi}$, $\varphi' \approx 19^\circ$.` },
    ],
  },
];
