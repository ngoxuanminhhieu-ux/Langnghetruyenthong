// Procedural texture generators for authentic Vietnamese craft village (Làng nghề Chuôn Ngọ)
// High-resolution, lightweight canvas textures for flagstone roads, ancient brick gates,
// terracotta tile roofs, weathered plaster walls, wood shutters, mother-of-pearl masterpieces,
// bougainvillea canopies, and traditional signage matching real-life Chuôn Ngọ heritage photos.

// 1. ANCIENT VILLAGE FLAGSTONE ROAD TEXTURE (Đường lát gạch cổ / đá làng quê)
export function createVillageRoadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base earth tone (warm terracotta stone & aged grey-buff matching target concept art)
  ctx.fillStyle = '#6E6257';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle soil noise and weathering
  for (let i = 0; i < 5000; i++) {
    const nx = Math.random() * canvas.width;
    const ny = Math.random() * canvas.height;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';
    ctx.fillRect(nx, ny, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }

  // Paved rectangular stone bricks pattern
  const rows = 32;
  const rowHeight = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const cols = 12;
    const colWidth = canvas.width / cols;
    const offset = (r % 2) * (colWidth / 2);

    for (let c = -1; c < cols + 1; c++) {
      const x = c * colWidth + offset + (Math.sin(r * 4.2 + c) * 3);
      const w = colWidth - 4;
      const h = rowHeight - 4;

      // Individual stone color variation (earthy grey, warm terracotta, buff stone)
      const toneVariation = Math.sin(r * 11 + c * 7);
      let stoneColor;
      if (toneVariation > 0.45) {
        stoneColor = '#94877A'; // lighter warm buff
      } else if (toneVariation < -0.35) {
        stoneColor = '#60564D'; // darker weathered stone
      } else if (toneVariation > 0.1) {
        stoneColor = '#8A7563'; // muted warm terracotta brick
      } else {
        stoneColor = '#7A6E63'; // medium stone
      }

      ctx.fillStyle = stoneColor;
      ctx.fillRect(x + 2, y + 2, w, h);

      // Stone bevel highlight
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 2, y + 2, w, h);

      // Cracks and stone texture
      if (Math.random() > 0.65) {
        ctx.strokeStyle = 'rgba(25, 20, 15, 0.25)';
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 6);
        ctx.lineTo(x + w * 0.4, y + h * 0.6);
        ctx.lineTo(x + w * 0.8, y + h * 0.8);
        ctx.stroke();
      }

      // Moss in crevices (greenish patina)
      if (Math.random() > 0.55) {
        ctx.fillStyle = 'rgba(55, 75, 45, 0.35)';
        ctx.fillRect(x + 1, y + h - 1, w + 2, 3);
        ctx.fillRect(x + w - 1, y + 1, 3, h + 2);
      }

      // Subtle dry fallen leaves
      if (Math.random() > 0.92) {
        ctx.fillStyle = '#C87D32';
        ctx.beginPath();
        ctx.ellipse(x + w * 0.5, y + h * 0.5, 4, 2, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mortar groove line
    ctx.strokeStyle = '#42372E';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  return canvas;
}

// 2. ANCIENT WEATHERED BRICK TEXTURE FOR VILLAGE GATE (Gạch cổ rêu phong Cổng Làng - matching Photo 1)
export function createAncientBrickTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep aged masonry background (charcoal-brown mortar)
  ctx.fillStyle = '#3A2E26';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const rows = 40;
  const rowHeight = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const cols = 16;
    const colWidth = canvas.width / cols;
    const offset = (r % 2) * (colWidth / 2);

    for (let c = -1; c < cols + 1; c++) {
      const x = c * colWidth + offset;
      const w = colWidth - 3;
      const h = rowHeight - 3;

      const noise = Math.sin(r * 19 + c * 23);
      let brickColor;
      if (noise > 0.5) brickColor = '#8A452D'; // Terracotta red-orange
      else if (noise > 0) brickColor = '#6E3825'; // Aged brick
      else if (noise > -0.5) brickColor = '#593021'; // Dark burned brick
      else brickColor = '#46281B'; // Charcoal stained brick

      ctx.fillStyle = brickColor;
      ctx.fillRect(x + 1.5, y + 1.5, w, h);

      // Weathered edges
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(x + 1.5, y + h - 1.5, w, 2);

      // Ancient lime / salt efflorescence (Vết vôi mốc trắng cổ kính)
      if (Math.sin(r * 5 + c * 7) > 0.6) {
        ctx.fillStyle = 'rgba(235, 230, 215, 0.2)';
        ctx.fillRect(x + 4, y + 3, w * 0.7, h * 0.6);
      }

      // Green moss patina in mortar joints
      if (r > 28 || Math.random() > 0.8) {
        ctx.fillStyle = 'rgba(45, 68, 38, 0.45)';
        ctx.fillRect(x, y + h - 1, w + 3, 2.5);
      }
    }
  }

  return canvas;
}

// 3. TERRACOTTA CURVED ROOF TILE TEXTURE (Mái ngói âm dương / ngói mũi hài rêu phong)
export function createRoofTileTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base terracotta clay
  ctx.fillStyle = '#8B3A22';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const tileRows = 24;
  const rowH = canvas.height / tileRows;

  for (let r = 0; r < tileRows; r++) {
    const y = r * rowH;

    // Overlapping tile shadow gradient
    const grad = ctx.createLinearGradient(0, y, 0, y + rowH);
    grad.addColorStop(0, '#5C2214');
    grad.addColorStop(0.3, '#A3462A');
    grad.addColorStop(0.7, '#8C3820');
    grad.addColorStop(1, '#4A1C10');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, canvas.width, rowH);

    // Vertical tile grooves
    const tileCols = 16;
    const colW = canvas.width / tileCols;
    for (let c = 0; c < tileCols; c++) {
      const cx = c * colW;
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx, y + rowH);
      ctx.stroke();

      // Top arc highlight of each curved tile
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(cx + 3, y + 1, colW - 6, 2.5);
    }

    // Patina moss patches
    if (r % 3 === 0) {
      ctx.fillStyle = 'rgba(45, 65, 38, 0.25)';
      ctx.fillRect(Math.sin(r) * 100 + 150, y, 120, rowH);
    }
  }

  return canvas;
}

// 4. HISTORIC WHITEWASH PLASTER WALL (Tường vôi rêu phong nhà cổ)
export function createPlasterWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm ivory-cream plaster
  ctx.fillStyle = '#DDD4C4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle plaster grain noise
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 3, 3);
  }

  // Base damp moss stain rising from the ground (Chân tường rêu ẩm)
  const mossGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 180);
  mossGrad.addColorStop(0, 'rgba(40, 52, 35, 0.55)');
  mossGrad.addColorStop(0.5, 'rgba(70, 75, 55, 0.25)');
  mossGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = mossGrad;
  ctx.fillRect(0, canvas.height - 180, canvas.width, 180);

  // Subtle vertical water streak stains
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * canvas.width;
    const grad = ctx.createLinearGradient(x, 0, x, 300);
    grad.addColorStop(0, 'rgba(50, 45, 38, 0.18)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 8, 0, 16, 260 + Math.random() * 80);
  }

  return canvas;
}

// 5. TRADITIONAL WOODEN SHUTTERS & DOORS (Cửa bức bàn gỗ lim - matching Photo 2)
export function createWoodDoorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark rich lim wood tone
  ctx.fillStyle = '#3E2415';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vertical wood grain lines
  for (let y = 0; y < canvas.height; y += 2) {
    ctx.strokeStyle = Math.sin(y * 0.1) > 0 ? '#4E2E1B' : '#321D11';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Two traditional door panels (Cửa 2 cánh)
  const panelW = canvas.width / 2;
  for (let p = 0; p < 2; p++) {
    const px = p * panelW;

    // Raised outer door frame
    ctx.strokeStyle = '#22140B';
    ctx.lineWidth = 6;
    ctx.strokeRect(px + 10, 10, panelW - 20, canvas.height - 20);

    // Upper louvered slats (chấn song / nan gỗ thoáng khí như ảnh 2)
    const slatH = 6;
    for (let sy = 30; sy < 220; sy += 12) {
      ctx.fillStyle = '#2A180E';
      ctx.fillRect(px + 20, sy, panelW - 40, slatH);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(px + 20, sy, panelW - 40, 1.5);
    }

    // Lower solid wood panel with traditional carved border
    ctx.strokeStyle = '#5E3820';
    ctx.lineWidth = 3;
    ctx.strokeRect(px + 22, 250, panelW - 44, canvas.height - 280);

    // Antique Brass Ring Pull (Tay nắm vòng đồng cổ)
    const ringX = p === 0 ? px + panelW - 24 : px + 24;
    const ringY = 270;
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(ringX, ringY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#8A6D24';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = '#E5C158';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ringX, ringY + 12, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  return canvas;
}

// 6. MASTERPIECE MOTHER-OF-PEARL MURAL TEXTURE (Bức tranh Thuận Buồm Xuôi Gió khảm trai phát sáng - matching Photo 3)
export function createInlaidMuralTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep mirror black lacquer background (Sơn then đen bóng)
  ctx.fillStyle = '#08080A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ornate Gold Leaf Frame (Khung gỗ dát vàng)
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

  ctx.strokeStyle = '#FFF1C5';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Glowing Golden Full Moon (Mặt trăng xà cừ phát quang)
  const moonGrad = ctx.createRadialGradient(580, 160, 5, 580, 160, 48);
  moonGrad.addColorStop(0, '#FFFCE6');
  moonGrad.addColorStop(0.4, '#FFE082');
  moonGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
  ctx.fillStyle = moonGrad;
  ctx.beginPath();
  ctx.arc(580, 160, 48, 0, Math.PI * 2);
  ctx.fill();

  // Calligraphy Title "Thuận Buồm Xuôi Gió" in gold pearl
  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#F5D77F';
  ctx.fillText('Thuận Buồm Xuôi Gió', 80, 80);

  // Intricate Mother-of-pearl Sailing Junk Ships (Thuyền buồm cẩn xà cừ ngũ sắc)
  const drawSailingJunk = (x, y, scale) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const pearlGrad = ctx.createLinearGradient(0, -100, 80, 50);
    pearlGrad.addColorStop(0, '#FFFDF7');
    pearlGrad.addColorStop(0.3, '#E0F7FA');
    pearlGrad.addColorStop(0.6, '#FFF8E1');
    pearlGrad.addColorStop(1, '#FCE4EC');

    // Hull
    ctx.fillStyle = '#C5A059';
    ctx.beginPath();
    ctx.moveTo(-60, 40);
    ctx.quadraticCurveTo(0, 55, 70, 35);
    ctx.lineTo(55, 15);
    ctx.lineTo(-45, 18);
    ctx.closePath();
    ctx.fill();

    // 3 Large Battened Sails
    for (let s = 0; s < 3; s++) {
      const sx = -25 + s * 35;
      const sh = 90 - s * 10;
      ctx.fillStyle = pearlGrad;
      ctx.beginPath();
      ctx.moveTo(sx, 18);
      ctx.quadraticCurveTo(sx + 35, -sh * 0.4, sx + 25, -sh);
      ctx.quadraticCurveTo(sx + 5, -sh * 0.6, sx, 18);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let b = 1; b <= 4; b++) {
        const by = 18 - (sh + 18) * (b / 5);
        ctx.strokeStyle = 'rgba(180, 140, 60, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx + 2, by);
        ctx.lineTo(sx + 24, by - 4);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  // Draw fleet vessels
  drawSailingJunk(760, 240, 1.2);
  drawSailingJunk(630, 250, 0.95);
  drawSailingJunk(520, 260, 0.75);
  drawSailingJunk(430, 270, 0.55);

  // Waves
  ctx.save();
  ctx.strokeStyle = '#F5D77F';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 440);
  for (let wx = 40; wx < canvas.width - 40; wx += 30) {
    ctx.quadraticCurveTo(wx + 15, 430, wx + 30, 440);
  }
  ctx.stroke();
  ctx.restore();

  return canvas;
}

// 7. PINK BOUGAINVILLEA FLOWER CANOPY (Cụm giàn hoa giấy rực rỡ bên hiên nhà - Image 5)
export function createBougainvilleaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const colors = ['#E91E63', '#EC407A', '#F06292', '#D81B60', '#C2185B', '#FF4081'];
  const leafColors = ['#2E7D32', '#388E3C', '#1B5E20', '#4CAF50'];

  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 6 + Math.random() * 14;

    // Green leaf
    if (Math.random() > 0.35) {
      ctx.fillStyle = leafColors[Math.floor(Math.random() * leafColors.length)];
      ctx.beginPath();
      ctx.ellipse(x - 4, y - 4, r * 1.2, r * 0.7, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flower petal
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Center stamen dot
    ctx.fillStyle = '#FFF9C4';
    ctx.beginPath();
    ctx.arc(x + 1, y + 1, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

// 8. MOTHER-OF-PEARL FRAMED "PHÚC" (福) ARTWORK (Tranh chữ Phúc khảm trai - matching Photo 2)
export function createPhucInlayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Black mirror lacquer
  ctx.fillStyle = '#08080B';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ornate Gold & Wood Frame
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

  ctx.strokeStyle = '#8A6D24';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Iridescent Pearl Gradient for the character
  const pearlGrad = ctx.createLinearGradient(120, 120, 400, 400);
  pearlGrad.addColorStop(0, '#FFFFFF');
  pearlGrad.addColorStop(0.25, '#D5F5FF');
  pearlGrad.addColorStop(0.5, '#FFF2D6');
  pearlGrad.addColorStop(0.75, '#FBD9E5');
  pearlGrad.addColorStop(1, '#E6FAEE');

  // Calligraphy Character "福" (Phúc) in mother-of-pearl
  ctx.font = 'bold 240px "Playfair Display", "Times New Roman", serif';
  ctx.fillStyle = pearlGrad;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('福', 256, 256);

  // Subtle shell grain highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeText('福', 256, 256);

  // Decorative corner clouds
  const drawCornerCloud = (cx, cy) => {
    ctx.fillStyle = pearlGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 6, 10, 0, Math.PI * 2);
    ctx.arc(cx - 10, cy - 6, 10, 0, Math.PI * 2);
    ctx.fill();
  };
  drawCornerCloud(40, 40);
  drawCornerCloud(472, 40);
  drawCornerCloud(40, 472);
  drawCornerCloud(472, 472);

  return canvas;
}

// 9. MOTHER-OF-PEARL LOTUS PAINTING PLAQUE (Tranh Sen khảm trai trưng bày trên giá đỡ - Image 5)
export function createLotusInlayPlaqueTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Black mirror lacquer
  ctx.fillStyle = '#0A0A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark wood & gold frame
  ctx.strokeStyle = '#2B1A0E';
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Iridescent Pearl Lotus Flower
  const pearlGrad = ctx.createLinearGradient(160, 200, 360, 480);
  pearlGrad.addColorStop(0, '#FFFFFF');
  pearlGrad.addColorStop(0.2, '#FFE8F0');
  pearlGrad.addColorStop(0.4, '#FEE4CB');
  pearlGrad.addColorStop(0.7, '#D4F1F4');
  pearlGrad.addColorStop(1, '#FFFDF7');

  const centerX = 256;
  const centerY = 320;

  // Lotus Leaves
  const leafGrad = ctx.createLinearGradient(150, 400, 380, 520);
  leafGrad.addColorStop(0, '#A7D7C5');
  leafGrad.addColorStop(0.5, '#74B49B');
  leafGrad.addColorStop(1, '#5C8D75');
  ctx.fillStyle = leafGrad;
  ctx.beginPath();
  ctx.ellipse(centerX - 40, centerY + 140, 110, 55, -0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Lotus Petals
  const petalCount = 12;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const px = centerX + Math.cos(angle) * 35;
    const py = centerY + Math.sin(angle) * 30;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = pearlGrad;
    ctx.beginPath();
    ctx.ellipse(0, -65, 30, 68, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#E8A598';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  // Center lotus core
  ctx.fillStyle = '#FFE082';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#B78103';
  for (let s = 0; s < 7; s++) {
    const sa = (s / 7) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(centerX + Math.cos(sa) * 16, centerY + Math.sin(sa) * 16, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dragonfly
  ctx.save();
  ctx.translate(370, 160);
  ctx.rotate(-0.4);
  ctx.fillStyle = pearlGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 4, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(230, 248, 255, 0.85)';
  ctx.beginPath();
  ctx.ellipse(-18, -6, 20, 6, 0.2, 0, Math.PI * 2);
  ctx.ellipse(18, -6, 20, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  return canvas;
}

// 10. ROUND INLAY TRAY / PLATTER (Mâm cẩn ốc ngũ sắc - matching Photo 4 & Image 5)
export function createRoundTrayInlayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark mahogany wooden disc
  ctx.fillStyle = '#2A180E';
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Concentric carved wood bevel rim
  ctx.strokeStyle = '#4A2A18';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.stroke();

  // Inlaid Brass border ring
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 224, 0, Math.PI * 2);
  ctx.stroke();

  // Intricate Mother-of-pearl Plum Blossom
  const pearlGrad = ctx.createLinearGradient(120, 120, 390, 390);
  pearlGrad.addColorStop(0, '#FFFFFF');
  pearlGrad.addColorStop(0.3, '#E0F7FA');
  pearlGrad.addColorStop(0.6, '#FFF8E1');
  pearlGrad.addColorStop(1, '#FCE4EC');

  ctx.strokeStyle = '#8D6E63';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(120, 380);
  ctx.quadraticCurveTo(200, 320, 256, 260);
  ctx.quadraticCurveTo(320, 200, 390, 170);
  ctx.stroke();

  const blossoms = [
    [160, 340], [210, 300], [270, 240], [310, 210], [360, 180],
    [240, 330], [290, 270], [340, 230]
  ];
  blossoms.forEach(([bx, by]) => {
    ctx.fillStyle = pearlGrad;
    for (let p = 0; p < 5; p++) {
      const pa = (p / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(bx + Math.cos(pa) * 8, by + Math.sin(pa) * 8, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(bx, by, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

// 11. WORKSHOP SIGNBOARD "XƯỞNG KHẢM TRAI" (Biển hiệu xưởng nghệ nhân gỗ sơn son thếp vàng - Image 5)
export function createWorkshopSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2E190E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 3) {
    ctx.fillStyle = Math.sin(y * 0.2) > 0 ? '#3A2012' : '#24140B';
    ctx.fillRect(0, y, canvas.width, 1.5);
  }

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 5;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  ctx.strokeStyle = '#F3E5AB';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  ctx.font = 'bold 44px "Playfair Display", "Times New Roman", serif';
  ctx.fillStyle = '#E8CA75';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Xưởng khảm trai', 256, 64);

  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.lineWidth = 1;
  ctx.strokeText('Xưởng khảm trai', 256, 64);

  return canvas;
}

// 12. CRAFTING STANDEE "TRẢI NGHIỆM CHẾ TÁC KHẢM TRAI" (Biển A-frame trải nghiệm - Image 5)
export function createCraftingStandeeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#301A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  ctx.font = 'bold 26px "Playfair Display", serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText('Trải nghiệm', 192, 60);
  ctx.fillText('chế tác', 192, 95);
  ctx.fillText('khảm trai', 192, 130);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 160);
  ctx.lineTo(314, 160);
  ctx.stroke();

  const centerX = 192;
  const centerY = 290;
  const petalCount = 8;
  for (let p = 0; p < petalCount; p++) {
    const angle = (p / petalCount) * Math.PI * 2;
    ctx.save();
    ctx.translate(centerX + Math.cos(angle) * 16, centerY + Math.sin(angle) * 14);
    ctx.rotate(angle);
    ctx.fillStyle = '#FCE4EC';
    ctx.beginPath();
    ctx.ellipse(0, -38, 16, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#E91E63';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = '#FFE082';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.fillText('✦ Nhấn [E] Để Bắt Đầu ✦', 192, 450);

  return canvas;
}

// 13. VILLAGE GATE MAIN INSCRIPTION "LÀNG NGHỀ CHUÔN NGỌ" (Đại tự cổng làng - Image 5)
export function createGateInscriptionTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#D9CFBE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }

  ctx.strokeStyle = '#5A4A3E';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  ctx.font = 'bold 36px "Playfair Display", "Times New Roman", serif';
  ctx.fillStyle = '#2E1E14';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Làng nghề Chuôn Ngọ', 256, 64);

  return canvas;
}

// 14. VILLAGE GATE ARCH CHINESE PLAQUE "大高火" (Đại Cao Hỏa - matching Photo 1)
export function createGateArchPlaqueTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#EDE4D4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#3D3126';
  ctx.lineWidth = 5;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  ctx.font = 'bold 52px "SimSun", "Songti SC", "Playfair Display", serif';
  ctx.fillStyle = '#1E1612';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('大 高 火', 192, 64);

  return canvas;
}

// 15. TRADITIONAL FESTIVAL BANNER "CỜ HỘI DI SẢN" (Image 5)
export function createHeritageFlagTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#C62828';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#FDD835';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = '#FDD835';
  for (let y = 10; y < canvas.height - 10; y += 30) {
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, y);
    ctx.lineTo(canvas.width, y + 15);
    ctx.lineTo(canvas.width - 10, y + 30);
    ctx.fill();
  }

  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.arc(128, 256, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#C62828';
  ctx.beginPath();
  ctx.arc(128, 256, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.fillStyle = '#FDD835';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DI SẢN', 128, 256);

  return canvas;
}
