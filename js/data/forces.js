// Danh mục loại lực dùng trong công cụ sơ đồ lực.
// missing: phản hồi khi người học bỏ sót lực này; extra: khi vẽ thừa.
const t = String.raw;

export const FORCES = {
  P: {
    label: 'P', name: 'Trọng lực',
    missing: 'Thiếu trọng lực P. Mọi vật có khối lượng gần mặt đất đều chịu trọng lực, hướng thẳng đứng xuống.',
    extra: 'Có thêm một trọng lực không cần thiết. Mỗi vật chỉ có một trọng lực.',
  },
  N: {
    label: 'N', name: 'Phản lực',
    missing: 'Thiếu phản lực N. Bề mặt mà vật tì lên luôn đẩy vật theo phương vuông góc với bề mặt.',
    extra: 'Vật này không tì lên bề mặt nào, nên không có phản lực N.',
  },
  T: {
    label: 'T', name: 'Lực căng dây',
    missing: 'Thiếu lực căng dây T. Dây buộc vào vật thì kéo vật dọc theo dây, về phía dây.',
    extra: 'Có lực căng không ứng với đoạn dây nào nối vào vật.',
  },
  Fms: {
    label: t`F_{ms}`, name: 'Lực ma sát',
    missing: 'Thiếu lực ma sát. Đề cho hệ số ma sát, nên mặt tiếp xúc có ma sát, ngược chiều chuyển động tương đối.',
    extra: 'Bài này bỏ qua ma sát ở vật này.',
  },
  Fqt: {
    label: t`F_{qt}`, name: 'Lực quán tính',
    missing: 'Thiếu lực quán tính. Trong hệ quy chiếu có gia tốc a, mỗi vật chịu thêm lực quán tính −ma.',
    extra: 'Lực quán tính chỉ xuất hiện khi làm việc trong hệ quy chiếu có gia tốc. Ở hệ quy chiếu mặt đất không có lực này.',
  },
  Fht: {
    label: t`F_{ht}`, name: 'Lực hướng tâm',
    missing: '',
    extra: 'Lực hướng tâm không phải một lực riêng. Đó là tên gọi của hợp lực các lực thật (ở đây là P và T) khi vật chuyển động tròn.',
  },
  Fdi: {
    label: t`F_{đ}`, name: 'Lực đẩy theo chiều chuyển động',
    missing: '',
    extra: 'Không có "lực đẩy theo chiều chuyển động". Vật chuyển động không cần một lực cùng chiều duy trì; mỗi lực phải do một vật cụ thể tác dụng.',
  },
  Fnem: {
    label: t`F_{ném}`, name: 'Lực ném',
    missing: '',
    extra: 'Lực ném chỉ tác dụng trong lúc tay còn chạm vật. Sau khi rời tay, không còn lực ném.',
  },
  Q: {
    label: t`N'`, name: 'Áp lực của vật khác',
    missing: 'Thiếu áp lực của vật đè lên. Theo định luật III Newton, vật đè lên sàn thì sàn chịu một lực bằng và ngược chiều phản lực.',
    extra: 'Áp lực này tác dụng lên vật khác, không vẽ vào sơ đồ của vật đang xét.',
  },
};

/** Góc (độ, ngược chiều kim đồng hồ từ trục x) chuẩn hoá về [0, 360). */
export const norm = (a) => ((a % 360) + 360) % 360;
/** Hiệu góc nhỏ nhất giữa hai hướng. */
export const angleDiff = (a, b) => {
  const d = Math.abs(norm(a) - norm(b));
  return Math.min(d, 360 - d);
};

/**
 * Chấm sơ đồ lực của một vật.
 * @param {{type:string, angle:number}[]} drawn các mũi tên người học vẽ
 * @param {{type:string, angle:number}[]} expected đáp án
 * @param {number} tol sai số góc cho phép (độ)
 */
export function gradeBody(drawn, expected, tol = 12) {
  const left = drawn.map((d) => ({ ...d, used: false }));
  const issues = [];
  let matched = 0;
  // ghép đúng loại và đúng hướng trước
  const pending = [];
  for (const e of expected) {
    const hit = left.find((d) => !d.used && d.type === e.type && angleDiff(d.angle, e.angle) <= tol);
    if (hit) { hit.used = true; matched++; } else pending.push(e);
  }
  // đúng loại nhưng sai hướng
  for (const e of pending) {
    const wrongDir = left.find((d) => !d.used && d.type === e.type);
    if (wrongDir) {
      wrongDir.used = true;
      issues.push({ kind: 'direction', type: e.type, message: `${FORCES[e.type].name} đang sai hướng. ${directionHint(e.type)}` });
    } else {
      issues.push({ kind: 'missing', type: e.type, message: FORCES[e.type].missing });
    }
  }
  for (const d of left.filter((x) => !x.used)) {
    issues.push({ kind: 'extra', type: d.type, message: FORCES[d.type].extra });
  }
  return { ok: issues.length === 0, matched, total: expected.length, issues };
}

function directionHint(type) {
  switch (type) {
    case 'P': return 'Trọng lực luôn hướng thẳng đứng xuống dưới.';
    case 'N': return 'Phản lực vuông góc với bề mặt tiếp xúc và hướng ra khỏi bề mặt.';
    case 'T': return 'Lực căng dây hướng dọc theo dây, từ vật về phía dây.';
    case 'Fms': return 'Ma sát song song với bề mặt và ngược chiều chuyển động (hoặc xu hướng chuyển động) của vật.';
    case 'Fqt': return 'Lực quán tính ngược chiều với gia tốc của hệ quy chiếu.';
    case 'Q': return 'Áp lực của vật đè lên hướng vào bề mặt bị đè.';
    default: return '';
  }
}
