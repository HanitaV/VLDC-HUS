// Hình vẽ lại theo hình gốc trong file bài tập (SVG, dùng màu theo theme).
const S = 'stroke="var(--ink)" stroke-width="1.6" fill="none"';
const txt = (x, y, s, extra = '') => `<text x="${x}" y="${y}" fill="var(--ink)" font-size="14" font-family="var(--serif)" font-style="italic" ${extra}>${s}</text>`;
const ceiling = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="var(--ink)" stroke-width="4"/>`;
const pulley = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${S} fill="var(--paper)"/><circle cx="${cx}" cy="${cy}" r="2.2" fill="var(--ink)"/>`;
const block = (x, y, w, h, label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>${label ? txt(x + w + 6, y + h / 2 + 5, label) : ''}`;
const arrowDefs = (id, color) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${color}"/></marker></defs>`;

const wrap = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;

export const FIGURES = {
  'half-ellipse': () => wrap(400, 240, 'Đồ thị vận tốc theo thời gian dạng nửa ellipse', `
    ${arrowDefs('ax-he', 'var(--ink)')}
    <line x1="40" y1="200" x2="380" y2="200" ${S} marker-end="url(#ax-he)"/>
    <line x1="40" y1="200" x2="40" y2="20" ${S} marker-end="url(#ax-he)"/>
    <path d="M40 200 A140 140 0 0 1 320 200" stroke="var(--pen)" stroke-width="2.4" fill="var(--pen-soft)" fill-opacity="0.6" transform="translate(0 0) scale(1 1)"/>
    <line x1="40" y1="60" x2="180" y2="60" stroke="var(--ink-3)" stroke-dasharray="4 4"/>
    ${txt(14, 66, 'υ₀')}${txt(312, 222, 't₀')}${txt(24, 222, '0', 'font-style="normal"')}
    ${txt(366, 222, 't')}${txt(48, 28, 'υ')}
  `),
  conical: () => wrap(400, 260, 'Con lắc nón: dây nghiêng góc alpha với phương thẳng đứng', `
    ${ceiling(150, 250, 30)}
    <line x1="200" y1="30" x2="200" y2="230" stroke="var(--ink-3)" stroke-dasharray="5 5"/>
    <ellipse cx="200" cy="170" rx="104" ry="26" stroke="var(--ink-3)" stroke-dasharray="4 4" fill="none"/>
    <line x1="200" y1="30" x2="304" y2="170" ${S}/>
    <circle cx="304" cy="170" r="9" fill="var(--ink)"/>
    <path d="M200 70 A40 40 0 0 0 223 63" ${S}/>
    ${txt(206, 92, 'α')}${txt(188, 24, 'O')}${txt(258, 96, 'ℓ')}${txt(316, 176, 'm')}
  `),
  'self-hoist': () => wrap(400, 300, 'Người ngồi trên sàn treo, kéo dây vắt qua ròng rọc trên trần', `
    ${ceiling(150, 250, 24)}
    <line x1="200" y1="24" x2="200" y2="46" ${S}/>
    ${pulley(200, 66, 20)}
    <line x1="180" y1="66" x2="180" y2="140" ${S}/>
    <line x1="220" y1="66" x2="220" y2="198" ${S}/>
    <path d="M180 140 L130 262 L250 262 Z" ${S}/>
    <line x1="120" y1="262" x2="262" y2="262" stroke="var(--ink)" stroke-width="5"/>
    <circle cx="196" cy="214" r="9" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M196 223 L196 248 L184 261 M196 248 L210 261 M196 230 L219 200" ${S}/>
    ${txt(268, 270, 'sàn treo', 'font-style="normal" font-size="13" font-family="var(--sans)"')}
    ${txt(228, 236, 'người', 'font-style="normal" font-size="13" font-family="var(--sans)"')}
  `),
  'movable-pulley': () => wrap(400, 300, 'Hệ một ròng rọc cố định và một ròng rọc động', `
    ${ceiling(110, 330, 24)}
    <line x1="160" y1="24" x2="160" y2="50" ${S}/>
    ${pulley(160, 70, 20)}
    <line x1="140" y1="70" x2="140" y2="190" ${S}/>
    ${block(126, 190, 28, 24, 'm₁')}
    <line x1="180" y1="70" x2="180" y2="170" ${S}/>
    ${pulley(200, 170, 20)}
    <line x1="220" y1="170" x2="220" y2="24" ${S}/>
    <line x1="200" y1="170" x2="200" y2="228" ${S}/>
    ${block(186, 228, 28, 24, 'm₂')}
  `),
  'ring-rope': () => wrap(400, 300, 'Vật A treo một đầu dây, vòng B trượt dọc đầu dây kia', `
    ${ceiling(130, 270, 24)}
    <line x1="200" y1="24" x2="200" y2="50" ${S}/>
    ${pulley(200, 70, 20)}
    <line x1="180" y1="70" x2="180" y2="236" ${S}/>
    ${block(162, 236, 36, 22, '')}${txt(100, 252, 'A (m₁)')}
    <line x1="220" y1="70" x2="220" y2="262" ${S}/>
    <rect x="209" y="160" width="22" height="12" rx="3" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    ${txt(238, 172, 'B (m₂)')}
  `),
  wedge: () => wrap(400, 260, 'Vật đứng yên trên đỉnh nêm, nêm có gia tốc a0 hướng sang trái', `
    ${arrowDefs('a0', 'var(--force)')}
    <path d="M110 70 L110 220 L370 220 Z" fill="var(--paper)" ${S}/>
    <g transform="translate(130 80) rotate(30)"><rect x="-16" y="-24" width="28" height="22" fill="var(--ink)"/></g>
    <line x1="96" y1="150" x2="40" y2="150" stroke="var(--force)" stroke-width="2.2" marker-end="url(#a0)"/>
    ${txt(52, 140, 'a₀', 'fill="var(--force)"')}
    <path d="M330 220 A40 40 0 0 1 335 200" ${S}/>
    ${txt(310, 212, 'α')}${txt(124, 54, 'm')}${txt(232, 136, 'S')}
  `),
  'cart-scale': () => wrap(400, 260, 'Người đứng trên cân bàn đặt trên xe nhỏ trượt trên mặt phẳng nghiêng', `
    <path d="M40 230 L360 230 L360 60 Z" fill="var(--paper)" ${S}/>
    <path d="M210 129.8 L290 87.3 L290 64 L210 64 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    <circle cx="222.3" cy="128.9" r="5" fill="var(--ink)"/><circle cx="282.3" cy="97" r="5" fill="var(--ink)"/>
    <rect x="226" y="57" width="48" height="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    <circle cx="250" cy="20" r="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    <line x1="250" y1="28" x2="250" y2="57" ${S}/>
    <path d="M90 230 A50 50 0 0 0 86 214" ${S}/>${txt(98, 222, 'α')}
  `),
  monkey: () => wrap(400, 300, 'Vật khối lượng m và con khỉ khối lượng 2m ở hai đầu dây vắt qua ròng rọc', `
    ${ceiling(130, 270, 24)}
    <line x1="200" y1="24" x2="200" y2="50" ${S}/>
    ${pulley(200, 70, 20)}
    <line x1="180" y1="70" x2="180" y2="200" ${S}/>
    ${block(170, 200, 20, 18, '')}${txt(150, 214, 'm')}
    <line x1="220" y1="70" x2="220" y2="270" ${S}/>
    <circle cx="232" cy="200" r="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M232 208 L234 236 L226 254 M234 236 L244 252 M232 214 L221 206 M232 220 L222 226" ${S}/>
    ${txt(252, 236, '2m')}
  `),
};

export function figureHTML(key) {
  const f = FIGURES[key];
  return f ? f() : '';
}
