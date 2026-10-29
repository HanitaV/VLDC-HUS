// Bộ phân tích và tính biểu thức toán an toàn (không dùng eval).
// Hỗ trợ: + - * / ^, nhân ngầm (2g, m1 g, g(m2-m1)), dấu âm,
// hàm sin cos tg/tan cotg/cot sqrt abs exp ln lg arcsin arccos arctg/arctan,
// hằng pi/π, chữ Hy Lạp (α μ ω φ θ β τ λ ρ υ) và chỉ số dưới (m₁ → m1).

const GREEK = {
  'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'θ': 'theta',
  'λ': 'lambda', 'μ': 'mu', 'µ': 'mu', 'ν': 'nu', 'ρ': 'rho', 'σ': 'sigma',
  'τ': 'tau', 'φ': 'phi', 'ϕ': 'phi', 'ω': 'omega', 'υ': 'v', 'ℓ': 'l', 'π': 'pi',
  'η': 'eta',
};
const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
const SUP = { '²': '^2', '³': '^3' };

const FUNCS = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, tg: Math.tan,
  cot: (x) => 1 / Math.tan(x), cotg: (x) => 1 / Math.tan(x),
  sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp,
  ln: Math.log, lg: Math.log10, log: Math.log,
  arcsin: Math.asin, asin: Math.asin, arccos: Math.acos, acos: Math.acos,
  arctan: Math.atan, arctg: Math.atan, atan: Math.atan,
};
const CONSTS = { pi: Math.PI };

export class ExprError extends Error {}

/** Chuẩn hoá chuỗi người học gõ: ký tự Hy Lạp, chỉ số, dấu nhân, căn. */
export function normalize(src) {
  let s = String(src);
  s = s.replace(/[₀-₉]/g, (c) => SUB[c]);
  s = s.replace(/[²³]/g, (c) => SUP[c]);
  s = s.replace(/[αβγδθλμµνρστφϕωυℓπη]/g, (c) => ` ${GREEK[c]} `);
  s = s.replace(/[·×∙⋅]/g, '*').replace(/[÷:]/g, '/').replace(/[−–]/g, '-');
  s = s.replace(/√/g, ' sqrt ');
  return s;
}

function tokenize(src) {
  const s = normalize(src);
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
      if (!m) throw new ExprError(`Số không hợp lệ ở vị trí ${i + 1}`);
      out.push({ t: 'num', v: parseFloat(m[0]) });
      i += m[0].length;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_][A-Za-z_0-9]*/.exec(s.slice(i));
      out.push({ t: 'id', v: m[0] });
      i += m[0].length;
      continue;
    }
    if ('+-*/^()'.includes(c)) { out.push({ t: c }); i++; continue; }
    if (c === ',') throw new ExprError('Dùng dấu chấm cho số thập phân trong công thức (ví dụ 0.5).');
    throw new ExprError(`Ký tự "${c}" không dùng được trong công thức`);
  }
  return out;
}

/** Phân tích chuỗi thành cây biểu thức. */
export function parse(src) {
  const toks = tokenize(src);
  if (toks.length === 0) throw new ExprError('Chưa nhập biểu thức');
  let p = 0;
  const peek = () => toks[p];
  const eat = (t) => {
    if (!toks[p] || toks[p].t !== t) throw new ExprError(t === ')' ? 'Thiếu dấu ")"' : `Thiếu "${t}"`);
    return toks[p++];
  };
  const startsPrimary = (tk) => tk && (tk.t === 'num' || tk.t === 'id' || tk.t === '(');

  function expr() {
    let node = term();
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = toks[p++].t;
      node = { k: 'bin', op, a: node, b: term() };
    }
    return node;
  }
  function term() {
    let node = unary();
    for (;;) {
      const tk = peek();
      if (tk && (tk.t === '*' || tk.t === '/')) {
        p++;
        node = { k: 'bin', op: tk.t, a: node, b: unary() };
      } else if (startsPrimary(tk)) {
        node = { k: 'bin', op: '*', a: node, b: power() }; // nhân ngầm
      } else break;
    }
    return node;
  }
  function unary() {
    const tk = peek();
    if (tk && (tk.t === '-' || tk.t === '+')) {
      p++;
      const a = unary();
      return tk.t === '-' ? { k: 'neg', a } : a;
    }
    return power();
  }
  function power() {
    const base = primary();
    if (peek() && peek().t === '^') {
      p++;
      return { k: 'bin', op: '^', a: base, b: unary() };
    }
    return base;
  }
  function primary() {
    const tk = peek();
    if (!tk) throw new ExprError('Biểu thức bị cụt ở cuối');
    if (tk.t === 'num') { p++; return { k: 'num', v: tk.v }; }
    if (tk.t === '(') { p++; const e = expr(); eat(')'); return e; }
    if (tk.t === 'id') {
      p++;
      const name = tk.v;
      if (FUNCS[name]) {
        // hàm: cho phép sin(x) hoặc sin x
        if (peek() && peek().t === '(') { p++; const a = expr(); eat(')'); return { k: 'fn', f: name, a }; }
        return { k: 'fn', f: name, a: power() };
      }
      if (name in CONSTS) return { k: 'num', v: CONSTS[name] };
      return { k: 'var', name };
    }
    throw new ExprError(`Không hiểu "${tk.t}" ở đây`);
  }

  const tree = expr();
  if (p < toks.length) throw new ExprError(toks[p].t === ')' ? 'Thừa dấu ")"' : 'Có phần thừa ở cuối biểu thức');
  return tree;
}

/** Tập tên biến xuất hiện trong cây. */
export function variables(tree, acc = new Set()) {
  if (!tree) return acc;
  if (tree.k === 'var') acc.add(tree.name);
  if (tree.a) variables(tree.a, acc);
  if (tree.b) variables(tree.b, acc);
  return acc;
}

/** Tính giá trị cây với bảng biến scope. */
export function evaluate(tree, scope = {}) {
  switch (tree.k) {
    case 'num': return tree.v;
    case 'var':
      if (!(tree.name in scope)) throw new ExprError(`Biến "${tree.name}" không có trong bài này`);
      return scope[tree.name];
    case 'neg': return -evaluate(tree.a, scope);
    case 'fn': return FUNCS[tree.f](evaluate(tree.a, scope));
    case 'bin': {
      const a = evaluate(tree.a, scope);
      const b = evaluate(tree.b, scope);
      switch (tree.op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '^': return Math.pow(a, b);
      }
    }
  }
  throw new ExprError('Biểu thức không hợp lệ');
}

const TEX_VAR = {
  alpha: '\\alpha', beta: '\\beta', gamma: '\\gamma', delta: '\\delta', theta: '\\theta',
  lambda: '\\lambda', mu: '\\mu', nu: '\\nu', rho: '\\rho', sigma: '\\sigma', tau: '\\tau',
  phi: '\\varphi', omega: '\\omega', eta: '\\eta', l: '\\ell', v: '\\upsilon', ap: "a'",
};
const TEX_FN = { tan: '\\mathrm{tg}\\,', tg: '\\mathrm{tg}\\,', cot: '\\cot', cotg: '\\cot', arctan: '\\mathrm{arctg}\\,', arctg: '\\mathrm{arctg}\\,', atan: '\\mathrm{arctg}\\,', ln: '\\ln', lg: '\\lg', log: '\\ln' };
const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

/** Chuyển cây sang LaTeX để người học thấy web đã đọc biểu thức thế nào. */
export function toTex(tree) {
  const v = (name) => {
    const m = /^([A-Za-z]+?)(\d+)$/.exec(name);
    if (m) return `${TEX_VAR[m[1]] || m[1]}_{${m[2]}}`;
    return TEX_VAR[name] || (name.length > 1 ? `\\mathit{${name}}` : name);
  };
  const go = (n, parentPrec = 0) => {
    switch (n.k) {
      case 'num': {
        if (Math.abs(n.v - Math.PI) < 1e-15) return '\\pi';
        return String(n.v).replace('.', '{,}');
      }
      case 'var': return v(n.name);
      case 'neg': {
        const s = `-${go(n.a, 2)}`;
        return parentPrec > 1 ? `\\left(${s}\\right)` : s;
      }
      case 'fn': {
        if (n.f === 'sqrt') return `\\sqrt{${go(n.a)}}`;
        if (n.f === 'abs') return `\\left|${go(n.a)}\\right|`;
        if (n.f === 'exp') return `e^{${go(n.a)}}`;
        const name = TEX_FN[n.f] || `\\${n.f}`;
        return `${name}\\left(${go(n.a)}\\right)`;
      }
      case 'bin': {
        const p = PREC[n.op];
        let s;
        if (n.op === '/') s = `\\dfrac{${go(n.a)}}{${go(n.b)}}`;
        else if (n.op === '^') s = `{${go(n.a, 4)}}^{${go(n.b)}}`;
        else if (n.op === '*') s = `${go(n.a, 2)}\\,${go(n.b, 2)}`;
        else s = `${go(n.a, 1)} ${n.op} ${go(n.b, n.op === '-' ? 2 : 1)}`;
        return p < parentPrec && n.op !== '/' ? `\\left(${s}\\right)` : s;
      }
    }
    return '?';
  };
  return go(tree);
}

/** Tiện ích: tính thẳng từ chuỗi. */
export function calc(src, scope = {}) {
  return evaluate(parse(src), scope);
}
