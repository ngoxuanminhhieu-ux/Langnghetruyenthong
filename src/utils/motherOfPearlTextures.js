// Utility to generate high-resolution textures for traditional Chuon Ngo mother-of-pearl inlays (Khảm trai)
// Generates textures for: Lotus (Hoa sen), Dragonfly (Chuồn chuồn), Apricot blossom (Mai), Koi carp (Cá chép)
// and mother-of-pearl iridescence maps

export const MOTIFS = {
  lotus: {
    id: 'lotus',
    name: 'Bút Ký Cửu Long',
    sub: 'Khảm Ốc Ngũ Sắc 18K',
    description: 'Thân bút nạm ốc đỏ xà cừ ngũ sắc kèm hộp gỗ mun sơn mài khắc tên mạ vàng',
    thumbnail: '/images/product_but_ky_kham_trai.jpg'
  },
  dragonfly: {
    id: 'dragonfly',
    name: 'Bát Cẩn Trứng',
    sub: 'Hoàng Kim Rạn Sắc',
    description: 'Bát gỗ mít cẩn vỏ trứng nung màu hổ phách kết hợp xà cừ ngũ sắc độc bản',
    thumbnail: '/images/product_bat_can_trung.jpg'
  },
  apricot: {
    id: 'apricot',
    name: 'Vòng Bản Liền',
    sub: 'Bạch Ngọc Liên Hoa',
    description: 'Phiến xà cừ ngọc trai biển ghép liền mạch viền hợp kim mạ bạc quý phái',
    thumbnail: '/images/product_vong_tay_ban_kham_trai.jpg'
  },
  koi: {
    id: 'koi',
    name: 'Chuỗi Hạt & Charm',
    sub: 'Tâm An Tịnh Độ',
    description: 'Chuỗi hạt xà cừ đại dương tiện tròn bóng kèm set charm mộc bản độc nhất',
    thumbnail: '/images/product_chuoi_hat_xa_cu.jpg'
  }
};

export const COLOR_SWATCHES = [
  { id: 'black', name: 'Sơn Then (Gỗ Mun/Trắc)', hex: '#121214', borderHex: '#3A3A40', text: 'Đen gỗ mun huyền bí' },
  { id: 'red', name: 'Sơn Son Huyết Dụ', hex: '#6B171E', borderHex: '#992B34', text: 'Đỏ sơn son hoàng cung' },
  { id: 'green', name: 'Xanh Lục Bảo', hex: '#16382C', borderHex: '#255241', text: 'Xanh ngọc lục bảo di sản' },
  { id: 'blue', name: 'Xanh Lam Chàm', hex: '#1B2A44', borderHex: '#2D446A', text: 'Xanh lam chàm cổ điển' },
  { id: 'pearl', name: 'Xà Cừ Toàn Phần', hex: '#ECE8DF', borderHex: '#D5CBB9', text: 'Ánh xà cừ ngọc trai tự nhiên' }
];

export const SIZES = [
  { id: 'S', label: 'S (12×8×5 cm)', dims: { l: 12, w: 8, h: 5 }, scale: [0.85, 0.85, 0.85], price: 1550000 },
  { id: 'M', label: 'M (15×10×6 cm)', dims: { l: 15, w: 10, h: 6 }, scale: [1.0, 1.0, 1.0], price: 1850000 },
  { id: 'L', label: 'L (18×12×7 cm)', dims: { l: 18, w: 12, h: 7 }, scale: [1.18, 1.18, 1.18], price: 2250000 }
];

// Generates canvas texture for top lid mother-of-pearl inlay
export function createLidInlayCanvas(motifId, colorId, engravedText = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  const baseColor = COLOR_SWATCHES.find(c => c.id === colorId)?.hex || '#121214';

  // Background lacquer
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle lacquer wood grain sheen
  ctx.save();
  ctx.globalAlpha = 0.07;
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(300, y + Math.sin(y * 0.02) * 8, 700, y - Math.cos(y * 0.02) * 8, canvas.width, y);
    ctx.stroke();
  }
  ctx.restore();

  // Ornate traditional mother-of-pearl outer border (Viền chỉ cẩn xà cừ)
  ctx.save();
  ctx.strokeStyle = '#E8D2A8';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  // Corner floral ornaments (Hoa góc)
  const drawCornerFlourish = (x, y, angle) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#F5E6CC';
    ctx.beginPath();
    ctx.arc(16, 16, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D8BF92';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.quadraticCurveTo(16, 16, 32, 0);
    ctx.stroke();
    ctx.restore();
  };
  drawCornerFlourish(36, 36, 0);
  drawCornerFlourish(canvas.width - 36, 36, Math.PI / 2);
  drawCornerFlourish(canvas.width - 36, canvas.height - 36, Math.PI);
  drawCornerFlourish(36, canvas.height - 36, -Math.PI / 2);

  // Inner border
  ctx.strokeStyle = 'rgba(232, 210, 168, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, canvas.width - 104, canvas.height - 104);
  ctx.restore();

  // Draw specific traditional motif
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 - (engravedText ? 24 : 0);

  if (motifId === 'lotus') {
    drawLotusMotif(ctx, cx, cy);
  } else if (motifId === 'dragonfly') {
    drawDragonflyMotif(ctx, cx, cy);
  } else if (motifId === 'apricot') {
    drawApricotMotif(ctx, cx, cy);
  } else if (motifId === 'koi') {
    drawKoiMotif(ctx, cx, cy);
  } else {
    drawLotusMotif(ctx, cx, cy);
  }

  // Draw engraved personalization text if present
  if (engravedText && engravedText.trim()) {
    ctx.save();
    const textY = canvas.height - 90;
    
    // Decorative golden banner plate
    ctx.fillStyle = 'rgba(216, 191, 146, 0.15)';
    ctx.strokeStyle = '#D8BF92';
    ctx.lineWidth = 1.5;
    const bannerW = Math.min(520, Math.max(260, engravedText.length * 20 + 80));
    ctx.beginPath();
    ctx.roundRect(cx - bannerW / 2, textY - 26, bannerW, 46, 12);
    ctx.fill();
    ctx.stroke();

    // Small mother of pearl studs on banner
    ctx.fillStyle = '#FFF5E0';
    ctx.beginPath();
    ctx.arc(cx - bannerW / 2 + 12, textY - 3, 3.5, 0, Math.PI * 2);
    ctx.arc(cx + bannerW / 2 - 12, textY - 3, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Engraved Text with mother-of-pearl inlay gradient
    const textGrad = ctx.createLinearGradient(cx - 150, textY, cx + 150, textY);
    textGrad.addColorStop(0, '#FFEAC2');
    textGrad.addColorStop(0.3, '#E8C68E');
    textGrad.addColorStop(0.5, '#FFFBF2');
    textGrad.addColorStop(0.8, '#D8BF92');
    textGrad.addColorStop(1, '#FFEAC2');

    ctx.fillStyle = textGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '600 22px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '3px';
    ctx.fillText(engravedText.trim(), cx, textY - 3);
    ctx.restore();
  }

  return canvas;
}

// 1. LOTUS MOTIF (Hoa Sen Tây Hồ)
function drawLotusMotif(ctx, cx, cy) {
  ctx.save();

  // Lotus leaves in background
  const drawLotusLeaf = (x, y, r, angle) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, r);
    grad.addColorStop(0, '#668772');
    grad.addColorStop(0.6, '#466854');
    grad.addColorStop(1, '#2D4B39');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();

    // Leaf veins in mother-of-pearl
    ctx.strokeStyle = '#D9DEC9';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.55);
      ctx.stroke();
    }
    ctx.restore();
  };

  drawLotusLeaf(cx - 190, cy + 50, 100, -0.2);
  drawLotusLeaf(cx + 200, cy + 40, 95, 0.25);
  drawLotusLeaf(cx - 90, cy + 120, 80, 0.1);
  drawLotusLeaf(cx + 100, cy + 125, 85, -0.15);

  // Central Lotus Bloom (Hoa Sen nở rộ)
  // Gradients representing iridescent pink/white mother-of-pearl (Ốc đỏ ngũ sắc)
  const pearlPink = ctx.createLinearGradient(cx, cy - 120, cx, cy + 40);
  pearlPink.addColorStop(0, '#FFF5F0');
  pearlPink.addColorStop(0.3, '#FBD2D8');
  pearlPink.addColorStop(0.7, '#E59BA8');
  pearlPink.addColorStop(1, '#C97184');

  const pearlWhite = ctx.createLinearGradient(cx - 60, cy - 80, cx + 60, cy + 40);
  pearlWhite.addColorStop(0, '#FFFFFF');
  pearlWhite.addColorStop(0.4, '#FCE8E8');
  pearlWhite.addColorStop(0.8, '#F0CBD4');
  pearlWhite.addColorStop(1, '#DC98A6');

  // Petal helper
  const drawPetal = (x, y, w, h, rot, fill) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = fill;
    ctx.strokeStyle = '#FFFDF7';
    ctx.lineWidth = 1.2;

    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.bezierCurveTo(w * 0.9, -h * 0.5, w * 0.8, h * 0.4, 0, h);
    ctx.bezierCurveTo(-w * 0.8, h * 0.4, -w * 0.9, -h * 0.5, 0, -h);
    ctx.fill();
    ctx.stroke();

    // Inlay vein
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.85);
    ctx.lineTo(0, h * 0.7);
    ctx.stroke();
    ctx.restore();
  };

  // Outer petals layer
  drawPetal(cx - 100, cy - 10, 34, 75, -0.85, pearlPink);
  drawPetal(cx + 100, cy - 10, 34, 75, 0.85, pearlPink);
  drawPetal(cx - 80, cy - 45, 36, 85, -0.55, pearlPink);
  drawPetal(cx + 80, cy - 45, 36, 85, 0.55, pearlPink);
  drawPetal(cx - 45, cy - 75, 38, 95, -0.28, pearlWhite);
  drawPetal(cx + 45, cy - 75, 38, 95, 0.28, pearlWhite);
  drawPetal(cx, cy - 90, 40, 105, 0, pearlWhite);

  // Front petals layer
  drawPetal(cx - 60, cy + 10, 35, 75, -0.65, pearlWhite);
  drawPetal(cx + 60, cy + 10, 35, 75, 0.65, pearlWhite);
  drawPetal(cx - 30, cy + 20, 36, 80, -0.3, pearlPink);
  drawPetal(cx + 30, cy + 20, 36, 80, 0.3, pearlPink);
  drawPetal(cx, cy + 25, 38, 85, 0, pearlWhite);

  // Golden lotus pod (Gương sen nhị vàng)
  ctx.fillStyle = '#E5C065';
  ctx.strokeStyle = '#FFF5D0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 32, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Pod seeds (Hạt sen xà cừ)
  ctx.fillStyle = '#5A4616';
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const r = i % 2 === 0 ? 16 : 8;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * (r * 0.6), 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Side small lotus buds
  drawPetal(cx - 170, cy - 50, 20, 48, -0.4, pearlPink);
  drawPetal(cx + 175, cy - 40, 22, 50, 0.35, pearlPink);

  ctx.restore();
}

// 2. DRAGONFLY MOTIF (Vũ Điệu Chuồn Ngọ)
function drawDragonflyMotif(ctx, cx, cy) {
  ctx.save();

  // Subtle lotus pond rippling in background
  ctx.strokeStyle = 'rgba(216, 191, 146, 0.3)';
  ctx.lineWidth = 1.5;
  for (let r = 80; r <= 280; r += 50) {
    ctx.beginPath();
    ctx.ellipse(cx, cy + 60, r, r * 0.45, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Water lily floating below
  drawLotusMotifMini(ctx, cx - 110, cy + 90, 0.6);
  drawLotusMotifMini(ctx, cx + 130, cy + 70, 0.5);

  // Giant central mother-of-pearl Dragonfly
  const dfX = cx;
  const dfY = cy - 30;

  // Wings (Mother of pearl iridescent translucent mesh)
  const drawWing = (x, y, w, h, angle) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const wingGrad = ctx.createLinearGradient(0, -h / 2, w, h / 2);
    wingGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    wingGrad.addColorStop(0.3, 'rgba(225, 240, 255, 0.85)');
    wingGrad.addColorStop(0.6, 'rgba(255, 225, 240, 0.8)');
    wingGrad.addColorStop(1, 'rgba(220, 250, 235, 0.85)');

    ctx.fillStyle = wingGrad;
    ctx.strokeStyle = '#D8BF92';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(w * 0.3, -h * 0.6, w * 0.8, -h * 0.4, w, 0);
    ctx.bezierCurveTo(w * 0.8, h * 0.5, w * 0.3, h * 0.5, 0, 0);
    ctx.fill();
    ctx.stroke();

    // Wing delicate veins
    ctx.strokeStyle = 'rgba(180, 140, 90, 0.5)';
    ctx.lineWidth = 0.8;
    for (let step = 0.2; step <= 0.8; step += 0.2) {
      ctx.beginPath();
      ctx.moveTo(w * step, -h * 0.2);
      ctx.lineTo(w * step, h * 0.25);
      ctx.stroke();
    }
    ctx.restore();
  };

  // 4 Wings
  drawWing(dfX - 10, dfY - 10, 160, 48, -0.2);
  drawWing(dfX + 10, dfY - 10, -160, 48, 0.2);
  drawWing(dfX - 8, dfY + 12, 135, 42, -0.42);
  drawWing(dfX + 8, dfY + 12, -135, 42, 0.42);

  // Dragonfly Body in iridescent Mother-of-pearl segment
  const bodyGrad = ctx.createLinearGradient(dfX, dfY - 50, dfX, dfY + 150);
  bodyGrad.addColorStop(0, '#FFF5D0');
  bodyGrad.addColorStop(0.2, '#D4B06A');
  bodyGrad.addColorStop(0.6, '#4E987B');
  bodyGrad.addColorStop(1, '#9B456B');

  // Head
  ctx.fillStyle = '#F3E5C8';
  ctx.strokeStyle = '#B89758';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(dfX, dfY - 36, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Eyes
  ctx.fillStyle = '#6E1E34';
  ctx.beginPath();
  ctx.arc(dfX - 8, dfY - 40, 5, 0, Math.PI * 2);
  ctx.arc(dfX + 8, dfY - 40, 5, 0, Math.PI * 2);
  ctx.fill();

  // Thorax
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(dfX, dfY - 8, 11, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Abdomen segments
  for (let i = 0; i < 9; i++) {
    const segY = dfY + 18 + i * 14;
    const segW = Math.max(4, 9 - i * 0.6);
    ctx.beginPath();
    ctx.ellipse(dfX, segY, segW, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawLotusMotifMini(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#F5D3D9';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  for (let a = -0.6; a <= 0.6; a += 0.3) {
    ctx.beginPath();
    ctx.ellipse(a * 40, -15, 16, 32, a, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

// 3. APRICOT BLOSSOM MOTIF (Hoa Mai Khai Phú Quý)
function drawApricotMotif(ctx, cx, cy) {
  ctx.save();

  // Branches (Cành mai uốn lượn phong cách bon-sai truyền thống)
  ctx.strokeStyle = '#8B5A2B';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 240, cy + 130);
  ctx.bezierCurveTo(cx - 140, cy + 110, cx - 80, cy + 10, cx - 20, cy - 30);
  ctx.bezierCurveTo(cx + 40, cy - 70, cx + 130, cy - 90, cx + 220, cy - 110);
  ctx.stroke();

  // Sub branches
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - 80, cy + 30);
  ctx.quadraticCurveTo(cx - 50, cy + 90, cx + 40, cy + 120);
  ctx.moveTo(cx + 30, cy - 60);
  ctx.quadraticCurveTo(cx + 90, cy + 10, cx + 180, cy + 40);
  ctx.stroke();

  // Gold bark texture
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw 5-petal Apricot Blossoms (Hoa mai 5 cánh ngọc)
  const drawBlossom = (x, y, r, angle = 0, isGold = false) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, r);
    if (isGold) {
      grad.addColorStop(0, '#FFF5D0');
      grad.addColorStop(0.5, '#F3D270');
      grad.addColorStop(1, '#D99B26');
    } else {
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.5, '#FFF2D6');
      grad.addColorStop(1, '#F0C968');
    }

    // 5 Petals
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const px = Math.cos(a) * r * 0.65;
      const py = Math.sin(a) * r * 0.65;
      ctx.fillStyle = grad;
      ctx.strokeStyle = '#FFFDF7';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Stamen center (Nhụy hoa)
    ctx.fillStyle = '#B43214';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fill();

    // Golden pistils
    ctx.strokeStyle = '#FFF090';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35);
      ctx.stroke();
    }
    ctx.restore();
  };

  // Main blossoms
  drawBlossom(cx - 30, cy - 40, 48, 0.2, true);
  drawBlossom(cx + 80, cy - 80, 42, -0.4, false);
  drawBlossom(cx - 120, cy + 20, 38, 0.5, true);
  drawBlossom(cx + 140, cy + 25, 36, 0.1, false);
  drawBlossom(cx + 190, cy - 100, 32, -0.2, true);
  drawBlossom(cx - 190, cy + 90, 30, 0.3, false);
  drawBlossom(cx + 20, cy + 95, 34, -0.5, true);

  // Tiny buds
  const drawBud = (x, y) => {
    ctx.fillStyle = '#E5533D';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FDE89A';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  drawBud(cx + 225, cy - 115);
  drawBud(cx - 225, cy + 120);
  drawBud(cx + 175, cy + 45);

  ctx.restore();
}

// 4. KOI CARP MOTIF (Lý Ngư Vọng Nguyệt / Cá Chép)
function drawKoiMotif(ctx, cx, cy) {
  ctx.save();

  // Full Moon (Vầng trăng ngọc xà cừ chiếu sáng)
  const moonGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
  moonGrad.addColorStop(0, 'rgba(255, 252, 238, 0.4)');
  moonGrad.addColorStop(0.7, 'rgba(235, 215, 175, 0.2)');
  moonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = moonGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.fill();

  // Water ripples
  ctx.strokeStyle = 'rgba(216, 191, 146, 0.4)';
  ctx.lineWidth = 1.5;
  for (let r = 70; r <= 220; r += 50) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw two yin-yang Koi carps (Song ngư vượt vũ môn)
  const drawKoiFish = (x, y, angle, isRed = true) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const fishLen = 140;

    // Body Gradient
    const grad = ctx.createLinearGradient(0, -fishLen * 0.4, 0, fishLen * 0.6);
    if (isRed) {
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.25, '#FF6B4A');
      grad.addColorStop(0.65, '#D42A20');
      grad.addColorStop(1, '#FFFFFF');
    } else {
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#F5B041');
      grad.addColorStop(0.7, '#D4AC0D');
      grad.addColorStop(1, '#FFFFFF');
    }

    // Fins (Vây cá mỏng xà cừ)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.strokeStyle = '#D8BF92';
    ctx.lineWidth = 1.2;

    // Pectoral fins
    ctx.beginPath();
    ctx.ellipse(-26, -15, 14, 34, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(26, -15, 14, 34, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Flowing tail fin (Đuôi cá xòe lụa)
    ctx.beginPath();
    ctx.moveTo(0, fishLen * 0.45);
    ctx.bezierCurveTo(-45, fishLen * 0.75, -50, fishLen * 1.05, 0, fishLen * 0.85);
    ctx.bezierCurveTo(50, fishLen * 1.05, 45, fishLen * 0.75, 0, fishLen * 0.45);
    ctx.fill();
    ctx.stroke();

    // Fish Main Body
    ctx.fillStyle = grad;
    ctx.strokeStyle = '#FFFDF7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -fishLen * 0.4);
    ctx.bezierCurveTo(34, -fishLen * 0.2, 30, fishLen * 0.2, 0, fishLen * 0.45);
    ctx.bezierCurveTo(-30, fishLen * 0.2, -34, -fishLen * 0.2, 0, -fishLen * 0.4);
    ctx.fill();
    ctx.stroke();

    // Scales (Vảy cá cẩn ốc)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    for (let row = -15; row <= 35; row += 12) {
      ctx.beginPath();
      ctx.arc(0, row, 12, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }

    // Eyes
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.arc(-11, -fishLen * 0.28, 3.5, 0, Math.PI * 2);
    ctx.arc(11, -fishLen * 0.28, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Fish 1 (Red Ruby koi)
  drawKoiFish(cx - 65, cy, 0.6, true);
  // Fish 2 (Golden koi)
  drawKoiFish(cx + 65, cy, 0.6 + Math.PI, false);

  ctx.restore();
}

// Side panels inlay canvas (Front, back, left, right faces)
export function createSideInlayCanvas(colorId, width = 512, height = 256, isFront = false) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const baseColor = COLOR_SWATCHES.find(c => c.id === colorId)?.hex || '#121214';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Border inlay
  ctx.strokeStyle = '#E8D2A8';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Floral scrolls (Họa tiết hoa văn góc và dải chỉ)
  const cy = height / 2;
  const cx = width / 2;

  // Wave tendril
  ctx.strokeStyle = 'rgba(232, 210, 168, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, cy);
  ctx.bezierCurveTo(cx * 0.5, cy - 25, cx * 0.5, cy + 25, cx, cy);
  ctx.bezierCurveTo(cx * 1.5, cy - 25, cx * 1.5, cy + 25, width - 32, cy);
  ctx.stroke();

  // If front face, leave center for the brass lock, but decorate sides with mother-of-pearl flowers
  const drawSideFlower = (x, y) => {
    ctx.fillStyle = '#FFF5EB';
    ctx.strokeStyle = '#D8BF92';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * 12, y + Math.sin(a) * 12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = '#E5C065';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  if (isFront) {
    drawSideFlower(cx - 100, cy);
    drawSideFlower(cx + 100, cy);
  } else {
    drawSideFlower(cx, cy);
    drawSideFlower(cx - 140, cy);
    drawSideFlower(cx + 140, cy);
  }

  return canvas;
}

// ============================================================================
// AUTHENTIC HIGH-FIDELITY TEXTURE GENERATORS MATCHING REAL CHUÔN NGỌ SAMPLES
// ============================================================================

/**
 * 1. BÚT KÝ KHẢM ỐC XÀ CỪ NGŨ SẮC (Paua / Abalone Shell Mosaic)
 * Authentic iridescent mosaic tiles with abalone green/cyan/magenta hues & gold wire veins
 */
export function createPauaMosaicTexture(colorId = 'black') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep abalone dark lacquer foundation
  ctx.fillStyle = '#061318';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 28;
  const rows = 12;
  const tileW = canvas.width / cols;
  const tileH = canvas.height / rows;

  // Authentic Paua/Abalone & Red Singapore Shell Palettes
  const shellPalettes = [
    ['#0A3A40', '#00B4D8', '#48E5C2', '#C7F9CC'], // Peacock Emerald/Cyan
    ['#0F4C5C', '#17C3B2', '#70E000', '#D8F3DC'], // Vibrant Sea Green
    ['#3C096C', '#7B2CBF', '#9D4EDD', '#E0AAFF'], // Royal Shell Violet
    ['#5B0E2D', '#D62246', '#FF5A5F', '#FFB4A2'], // Singapore Red Abalone
    ['#1D2D44', '#3E5C76', '#748CAB', '#F0EBD8'], // Deep Ocean Mother-of-Pearl
    ['#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'], // Iridescent Prism
    ['#8B5E3C', '#D4A373', '#FAEDCD', '#FFF1E6'], // Golden Lip Pearl
    ['#023E8A', '#0077B6', '#0096C7', '#90E0EF'], // Azure Lapis Abalone
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Deterministic jitter for authentic hand-cut mosaic tiles
      const hash1 = (c * 37 + r * 53) % 9;
      const hash2 = (c * 47 + r * 29) % 9;
      const hash3 = ((c + 1) * 37 + r * 53) % 9;
      const hash4 = (c * 47 + (r + 1) * 29) % 9;

      const jx1 = hash1 - 4;
      const jy1 = hash2 - 4;
      const jx2 = hash3 - 4;
      const jy2 = hash4 - 4;

      const x0 = c * tileW + 1.2;
      const y0 = r * tileH + 1.2;
      const w0 = tileW - 2.4;
      const h0 = tileH - 2.4;

      const palIdx = (c * 3 + r * 5) % shellPalettes.length;
      const pal = shellPalettes[palIdx];

      const gradAngle = ((c + r * 3) % 5) * 0.4;
      const grad = ctx.createLinearGradient(
        x0, y0,
        x0 + Math.cos(gradAngle) * w0,
        y0 + Math.sin(gradAngle) * h0
      );
      grad.addColorStop(0, pal[0]);
      grad.addColorStop(0.35, pal[1]);
      grad.addColorStop(0.7, pal[2]);
      grad.addColorStop(1, pal[3]);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x0 + jx1, y0 + jy1);
      ctx.lineTo(x0 + w0 + jx2, y0 + jy1);
      ctx.lineTo(x0 + w0 + jx2, y0 + h0 + jy2);
      ctx.lineTo(x0 + jx1, y0 + h0 + jy2);
      ctx.closePath();
      ctx.fill();

      // Natural curved shell growth ridges inside tile
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.85;
      const ridgeCx = x0 + w0 * 0.4 + jx1;
      const ridgeCy = y0 + h0 * 0.4 + jy1;
      for (let ri = 4; ri < Math.max(w0, h0) * 1.4; ri += 5.5) {
        ctx.beginPath();
        ctx.arc(ridgeCx, ridgeCy, ri, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Specular pearl shimmer
      const shim = ctx.createRadialGradient(
        x0 + w0 * 0.35, y0 + h0 * 0.35, 1,
        x0 + w0 * 0.35, y0 + h0 * 0.35, w0 * 0.65
      );
      shim.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      shim.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      shim.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shim;
      ctx.fill();
      ctx.restore();

      // Golden wire / dark lacquer seam between mosaic tiles
      ctx.strokeStyle = (c + r) % 3 === 0 ? '#E0B554' : '#140E0A';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(x0 + jx1, y0 + jy1);
      ctx.lineTo(x0 + w0 + jx2, y0 + jy1);
      ctx.lineTo(x0 + w0 + jx2, y0 + h0 + jy2);
      ctx.lineTo(x0 + jx1, y0 + h0 + jy2);
      ctx.closePath();
      ctx.stroke();
    }
  }

  return canvas;
}

/**
 * 2. BÁT SƠN MÀI CẨN VỎ TRỨNG & KHẢM XÀ CỪ (Eggshell Lacquer Voronoi Crackle)
 * Authentic Chuôn Ngọ "Cẩn trứng": roasted amber/burnt orange eggshell flakes with vermilion lacquer
 */
export function createEggshellCrackleTexture(colorId = 'black') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep rich cinnabar / vermilion lacquer foundation
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  baseGrad.addColorStop(0, '#120401'); // Deep blackish Ta lacquer at foot
  baseGrad.addColorStop(0.35, '#350A03');
  baseGrad.addColorStop(0.7, '#6E1404');
  baseGrad.addColorStop(1, '#8A1B05'); // Rich vermilion Ta lacquer
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // High-density irregular Voronoi eggshell crackle grid (Authentic Chuôn Ngọ Cẩn Trứng)
  const cols = 58;
  const rows = 58;
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    const vNorm = r / rows; // 0 = foot, 1 = rim
    for (let c = 0; c < cols; c++) {
      // Natural seed jitter
      const jx = (((c * 73 + r * 97) % 23) / 23 - 0.5) * cellW * 0.75;
      const jy = (((c * 59 + r * 83) % 23) / 23 - 0.5) * cellH * 0.75;
      const cx = (c + 0.5) * cellW + jx;
      const cy = (r + 0.5) * cellH + jy;

      // Organic polygonal vertices (5-7 points)
      const numPts = 5 + ((c * 17 + r * 19) % 3);
      const rad = Math.min(cellW, cellH) * 0.44;

      // Authentic roasted eggshell coloration matching Image 4
      // Scorched golden-amber, orange-yellow, and vermilion gradations
      let fillColor;
      const toneSeed = ((c * 31 + r * 47) % 11) / 11;
      const isPearlAccent = ((c * 13 + r * 29) % 16) === 0; // 6% shimmering mother-of-pearl flakes

      if (isPearlAccent) {
        // Glistening mother-of-pearl flake
        fillColor = toneSeed > 0.5 ? '#B8FFF0' : '#FFD9EC';
      } else if (vNorm < 0.4) {
        // Scorched / roasted eggshell (Hổ phách nung lửa & vàng cam rực rỡ)
        if (toneSeed < 0.25) fillColor = '#D35400';
        else if (toneSeed < 0.5) fillColor = '#E67E22';
        else if (toneSeed < 0.75) fillColor = '#F39C12';
        else if (toneSeed < 0.9) fillColor = '#F5B041';
        else fillColor = '#C0392B';
      } else if (vNorm < 0.75) {
        // Mid-belly warm roasted amber & honey gold
        if (toneSeed < 0.3) fillColor = '#F8C471';
        else if (toneSeed < 0.55) fillColor = '#FAD7A0';
        else if (toneSeed < 0.8) fillColor = '#FDEBD0';
        else fillColor = '#E67E22';
      } else {
        // Upper rim creamy ivory & porcelain white
        if (toneSeed < 0.45) fillColor = '#FFFDF7';
        else if (toneSeed < 0.75) fillColor = '#FDFBF4';
        else if (toneSeed < 0.9) fillColor = '#F8F1DF';
        else fillColor = '#FDEBD0';
      }

      ctx.fillStyle = fillColor;

      ctx.beginPath();
      for (let p = 0; p < numPts; p++) {
        const ang = (p / numPts) * Math.PI * 2;
        const pRad = rad * (0.8 + (((p * 41 + c * 11 + r * 13) % 7) / 7) * 0.35);
        const px = cx + Math.cos(ang) * pRad;
        const py = cy + Math.sin(ang) * pRad;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Fine dark lacquer crackle fissure between eggshell fragments
      ctx.strokeStyle = isPearlAccent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(25, 7, 3, 0.85)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Micro-shading inside flake to simulate natural shell curvature
      if (!isPearlAccent && rad > 5) {
        const shadeGrad = ctx.createRadialGradient(cx - 1.5, cy - 1.5, 1, cx, cy, rad * 0.75);
        shadeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        shadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
        ctx.fillStyle = shadeGrad;
        ctx.fill();
      }
    }
  }

  // Clear lacquer gloss glaze overlay
  ctx.save();
  const glossGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  glossGrad.addColorStop(0, 'rgba(255, 240, 215, 0.15)');
  glossGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
  glossGrad.addColorStop(1, 'rgba(215, 115, 30, 0.18)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.restore();

  return canvas;
}

/**
 * 3. VÒNG TAY BẢN LIỀN KHẢM XÀ CỪ (Seamless Segmented Mother-of-Pearl Cuff)
 * 16 curved rectangular tiles of natural silver-lip pearl shell with radial growth lines & fine joints
 */
export function createBangleShellTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background warm amber-silver foundation
  ctx.fillStyle = '#E8E0D2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numTiles = 16;
  const tileWidth = canvas.width / numTiles;

  for (let i = 0; i < numTiles; i++) {
    const x = i * tileWidth;
    const tileH = canvas.height;

    // Per-tile natural shell tone variation (Silver-lip Pearl Shell)
    const tileSeed = (i * 31) % 11;
    let baseColor1, baseColor2;
    if (tileSeed < 3) {
      baseColor1 = '#FFFDF8';
      baseColor2 = '#F6EEDD'; // Soft warm ivory
    } else if (tileSeed < 7) {
      baseColor1 = '#FAF6EC';
      baseColor2 = '#EDE2CB'; // Natural amber-tinted pearl
    } else if (tileSeed < 9) {
      baseColor1 = '#FFFFFF';
      baseColor2 = '#F0E8D8'; // Pure silver pearl
    } else {
      baseColor1 = '#FFF8EB';
      baseColor2 = '#E5D6BA'; // Golden oyster cloud
    }

    const tGrad = ctx.createLinearGradient(x, 0, x + tileWidth, tileH);
    tGrad.addColorStop(0, baseColor1);
    tGrad.addColorStop(0.5, baseColor2);
    tGrad.addColorStop(1, baseColor1);

    ctx.fillStyle = tGrad;
    ctx.fillRect(x + 1, 0, tileWidth - 2, tileH);

    // Natural concentric/curved oyster growth rings
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + 1, 0, tileWidth - 2, tileH);
    ctx.clip();

    ctx.strokeStyle = 'rgba(200, 175, 140, 0.35)';
    ctx.lineWidth = 1.2;
    const ringOriginX = x + (i % 2 === 0 ? -20 : tileWidth + 20);
    const ringOriginY = tileH * (0.3 + (tileSeed % 5) * 0.1);
    for (let r = 15; r < 320; r += 16) {
      ctx.beginPath();
      ctx.arc(ringOriginX, ringOriginY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Pearlescent rainbow cloud sheen (pink & aqua luminescence)
    const sheenGrad = ctx.createRadialGradient(
      x + tileWidth * 0.45, tileH * 0.5, 5,
      x + tileWidth * 0.45, tileH * 0.5, tileWidth * 0.7
    );
    sheenGrad.addColorStop(0, 'rgba(255, 230, 240, 0.45)'); // Opal pink
    sheenGrad.addColorStop(0.4, 'rgba(220, 255, 245, 0.35)'); // Opal seafoam
    sheenGrad.addColorStop(0.8, 'rgba(255, 245, 215, 0.3)');  // Opal gold
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(x + 1, 0, tileWidth - 2, tileH);

    ctx.restore();

    // Hairline handcrafted tile seam line (Mối ghép xà cừ tự nhiên)
    ctx.strokeStyle = '#A67C38';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, tileH);
    ctx.stroke();

    // Seam subtle highlight bevel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(x + 1.8, 0);
    ctx.lineTo(x + 1.8, tileH);
    ctx.stroke();
  }

  // Top & bottom thin metallic gold/silver hairline border
  ctx.strokeStyle = 'rgba(180, 140, 80, 0.9)';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

/**
 * 4. HỘP ĐỰNG BÚT SƠN MÀI MỞ NẮP (Luxury Pen Presentation Box Lid)
 * Lacquer box lid underside with mother-of-pearl lotus inlay & gold calligraphy
 */
export function createPenBoxLidCanvas(colorId = 'black', engravedText = '', motifId = 'lotus') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const baseColor = COLOR_SWATCHES.find(c => c.id === colorId)?.hex || '#121214';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lacquer wood grain reflection sheen
  ctx.save();
  ctx.globalAlpha = 0.06;
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(300, y + Math.sin(y * 0.03) * 6, 700, y - Math.cos(y * 0.03) * 6, canvas.width, y);
    ctx.stroke();
  }
  ctx.restore();

  // Ornate traditional gold & shell border (Viền chỉ mạ vàng)
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2 - 20;

  // Mother-of-pearl Lotus Inlay in center
  drawLotusMotif(ctx, cx, cy);

  // Gold calligraphy / engraved text banner at bottom
  const textToShow = engravedText?.trim() || 'TÂN KHẢM • CHUÔN NGỌ HERITAGE';
  ctx.save();
  const bannerY = canvas.height - 65;
  const bannerW = Math.min(580, Math.max(300, textToShow.length * 18 + 90));

  ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cx - bannerW / 2, bannerY - 22, bannerW, 44, 10);
  ctx.fill();
  ctx.stroke();

  // Small mother-of-pearl corner studs
  ctx.fillStyle = '#FFF5E0';
  ctx.beginPath();
  ctx.arc(cx - bannerW / 2 + 14, bannerY, 3.5, 0, Math.PI * 2);
  ctx.arc(cx + bannerW / 2 - 14, bannerY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Calligraphy text
  const textGrad = ctx.createLinearGradient(cx - 150, bannerY, cx + 150, bannerY);
  textGrad.addColorStop(0, '#FFE8B8');
  textGrad.addColorStop(0.5, '#FFFDF8');
  textGrad.addColorStop(1, '#D4AF37');
  ctx.fillStyle = textGrad;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 4;
  ctx.font = '600 20px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '3px';
  ctx.fillText(textToShow, cx, bannerY);
  ctx.restore();

  return canvas;
}
