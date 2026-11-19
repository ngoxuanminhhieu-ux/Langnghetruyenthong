import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product3DViewer } from '../experience/Product3DViewer';
import { MOTIFS, COLOR_SWATCHES, SIZES } from '../../utils/motherOfPearlTextures';
import { 
  X, 
  Box, 
  Smartphone, 
  RotateCw, 
  Maximize2, 
  Camera, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WebARModal = () => {
  const { isARModalOpen, setIsARModalOpen, arTargetProduct, addToCart, navigateTo, showToast } = useApp();

  const [motif, setMotif] = useState('lotus');
  const [color, setColor] = useState('black');
  const [size, setSize] = useState('M');
  const [showDimensions, setShowDimensions] = useState(false);
  const [isARMode, setIsARMode] = useState(false);

  if (!isARModalOpen || !arTargetProduct) return null;

  const activeSizeObj = SIZES.find(s => s.id === size) || SIZES[1];
  const activeColorObj = COLOR_SWATCHES.find(c => c.id === color) || COLOR_SWATCHES[0];
  const activeMotifObj = MOTIFS[motif] || MOTIFS.lotus;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...arTargetProduct,
      price: activeSizeObj.price || arTargetProduct.price,
      name: `${arTargetProduct.name} (${activeMotifObj.name} - ${activeColorObj.name})`
    };
    addToCart(itemToAdd, 1, {
      motif: activeMotifObj.name,
      color: activeColorObj.name,
      size: activeSizeObj.label
    });
    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    } catch {}
    setIsARModalOpen(false);
  };

  const handleSnapshotCaptured = (dataUrl) => {
    const link = document.createElement('a');
    link.download = `ChuonNgo_${motif}_${color}_3D.png`;
    link.href = dataUrl;
    link.click();
    showToast('Đã lưu ảnh chụp 3D độ nét cao!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#101813] rounded-3xl overflow-hidden border border-[#D3B392]/60 shadow-2xl flex flex-col text-[#FFFDF7] max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 px-6 bg-[#172B20] border-b border-[#D3B392]/25 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-[#FFFDF7]">
                  Trải Nghiệm WebAR 3D &amp; Xoay 360°
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#101813] text-[#D3B392] text-[10px] font-mono border border-[#D3B392]/30">
                  Three.js 3D Realtime
                </span>
              </div>
              <p className="text-xs text-[#D3B392]/80">{arTargetProduct.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsARModalOpen(false);
                navigateTo('experience', 'crafting');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101813] hover:bg-[#101813]/80 border border-[#D3B392]/40 text-[#D3B392] text-xs font-semibold transition-colors"
            >
              <span>Mở Toàn Màn Hình</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsARModalOpen(false)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#101813] text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Stage & Controls Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 items-stretch">
          
          {/* LEFT 3D VIEWER CONTAINER (8 cols) */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-3 min-h-[380px] sm:min-h-[460px]">
            
            {/* Left Toolbar */}
            <div className="sm:w-14 flex sm:flex-col items-center justify-center sm:justify-start gap-2 bg-[#172B20]/90 p-2 rounded-2xl border border-[#D3B392]/30 shrink-0 self-center sm:self-start z-10">
              <button
                onClick={() => setIsARMode(!isARMode)}
                title="Bật/Tắt WebAR trong không gian thực"
                className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold transition-all ${
                  isARMode ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>AR</span>
              </button>

              <button
                onClick={() => {
                  setIsARMode(false);
                  showToast('Đang kích hoạt chế độ xoay 360 độ');
                }}
                title="Xoay 360 độ"
                className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-[#D8C29D] hover:bg-white/10"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>360°</span>
              </button>

              <button
                onClick={() => setShowDimensions(!showDimensions)}
                title="Bật/Tắt kích thước 3D"
                className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold transition-all ${
                  showDimensions ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Kích thước</span>
              </button>

              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('trigger-product-snapshot'));
                  showToast('Đang chụp ảnh...');
                }}
                title="Chụp ảnh tác phẩm"
                className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-[#D8C29D] hover:bg-white/10"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Chụp</span>
              </button>
            </div>

            {/* Three.js Canvas Stage */}
            <div className="flex-1 relative rounded-2xl overflow-hidden border border-[#D3B392]/30 shadow-xl bg-black/60 min-h-[360px]">
              <Product3DViewer
                motif={motif}
                color={color}
                size={size}
                showDimensions={showDimensions}
                isARMode={isARMode}
                onExitAR={() => setIsARMode(false)}
                onCaptureSnapshot={handleSnapshotCaptured}
                onSelectColor={(newColor) => setColor(newColor)}
                autoRotateDefault={false}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* RIGHT CUSTOMIZER CONTROLS (4 cols) */}
          <div className="lg:col-span-4 bg-[#FFFDF7] text-[#17382D] rounded-2xl p-4 sm:p-5 border border-[#D3B392]/40 flex flex-col justify-between space-y-4">
            <div className="space-y-4 text-xs">
              <span className="font-serif font-bold text-base text-[#17382D] block pb-2 border-b border-[#E8DEC8]">
                Tùy Chỉnh Thiết Kế 3D
              </span>

              {/* Motifs */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block text-[11px] uppercase tracking-wider">
                  1. Họa tiết khảm: <strong>{activeMotifObj.name}</strong>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {Object.values(MOTIFS).map(m => (
                    <div
                      key={m.id}
                      onClick={() => setMotif(m.id)}
                      className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        motif === m.id
                          ? 'border-[#17382D] bg-[#17382D]/10 ring-2 ring-[#B69A68]/40'
                          : 'border-[#E8DEC8] hover:border-gray-400 bg-white'
                      }`}
                    >
                      <img src={m.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-[10px] font-semibold text-center line-clamp-1">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block text-[11px] uppercase tracking-wider">
                  2. Màu nền sơn: <strong>{activeColorObj.name}</strong>
                </label>
                <div className="flex items-center gap-2.5">
                  {COLOR_SWATCHES.map(sw => (
                    <button
                      key={sw.id}
                      onClick={() => setColor(sw.id)}
                      title={sw.name}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        color === sw.id ? 'scale-125 ring-2 ring-[#B69A68]' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: sw.hex, borderColor: sw.borderHex }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block text-[11px] uppercase tracking-wider">
                  3. Kích thước
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {SIZES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`py-1.5 px-1 rounded-xl text-center border font-semibold text-[11px] transition-all ${
                        size === s.id
                          ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                          : 'bg-white text-gray-700 border-[#E8DEC8]'
                      }`}
                    >
                      {s.id} ({s.dims.l}x{s.dims.w}cm)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-3 border-t border-[#E8DEC8] space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Giá hoàn thiện:</span>
                <span className="font-serif font-bold text-xl text-[#17382D]">
                  {formatPrice(activeSizeObj.price)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsARModalOpen(false);
                    navigateTo('product-detail', arTargetProduct.id);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-[#17382D] text-[#17382D] hover:bg-gray-100 font-semibold text-xs text-center transition-colors"
                >
                  Xem chi tiết
                </button>

                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#17382D] to-[#2B1E16] hover:from-[#244A3D] hover:to-[#3D261A] text-[#FFFDF7] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D3B392]" />
                  <span>Thêm vào giỏ</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
