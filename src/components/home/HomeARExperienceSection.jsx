import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Product3DViewer } from '../experience/Product3DViewer';
import { ShareModal } from '../experience/ShareModal';
import { MOTIFS, COLOR_SWATCHES, SIZES } from '../../utils/motherOfPearlTextures';
import { PRODUCTS } from '../../data/heritageData';
import { 
  Box, 
  Smartphone, 
  RotateCw, 
  Maximize2, 
  Camera, 
  Share2, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ArrowRight,
  Info,
  Edit3,
  Type,
  Award,
  Layers,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const HomeARExperienceSection = () => {
  const { addToCart, showToast, setIsCartOpen, navigateTo } = useApp();

  // State
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [isARMode, setIsARMode] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const [selectedMotif, setSelectedMotif] = useState('lotus');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSpec, setSelectedSpec] = useState('0.5mm');
  const [engravedText, setEngravedText] = useState('Minh Anh');
  const [selectedWood, setSelectedWood] = useState('Gỗ Mun hoa');
  const [rightTab, setRightTab] = useState('customizer'); // 'customizer' or 'info'

  const customizerPanelRef = useRef(null);

  // Active product & 3D type mapping
  const activeProduct = PRODUCTS[selectedProductIndex] || PRODUCTS[0];
  const PRODUCT_TYPES_3D = ['pen', 'bowl', 'bangle', 'beads', 'charms', 'necklace'];
  const active3DType = PRODUCT_TYPES_3D[selectedProductIndex] || 'pen';

  const activeColorObj = COLOR_SWATCHES.find(c => c.id === selectedColor) || COLOR_SWATCHES[0];
  const activeMotifObj = MOTIFS[selectedMotif] || MOTIFS.lotus;

  // Sync sensible defaults when switching products
  useEffect(() => {
    if (selectedProductIndex === 0) {
      setSelectedSpec('0.5mm');
      setSelectedWood('Gỗ Mun hoa');
    } else if (selectedProductIndex === 1) {
      setSelectedSpec('ĐK 11.5cm');
      setSelectedWood('Gỗ Mít sơn ta 9 lớp');
    } else if (selectedProductIndex === 2) {
      setSelectedSpec('Size M');
      setSelectedWood('Titan mạ bạc 925');
    } else if (selectedProductIndex === 3) {
      setSelectedSpec('8mm');
      setSelectedWood('Hộp khung mica');
    } else if (selectedProductIndex === 4) {
      setSelectedSpec('Set 3 món');
      setSelectedWood('Khay mộc');
    } else if (selectedProductIndex === 5) {
      setSelectedSpec('ĐK 4.8cm');
      setSelectedWood('Gỗ Mun & Dây sáp');
    }
  }, [selectedProductIndex]);

  // Listen to quick event from HeroBanner
  useEffect(() => {
    const handleFocusCustomizer = () => {
      setRightTab('customizer');
      setIsARMode(false);
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);
      if (customizerPanelRef.current) {
        customizerPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('focus-home-customizer', handleFocusCustomizer);
    return () => window.removeEventListener('focus-home-customizer', handleFocusCustomizer);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleAddToCart = () => {
    const customizedProduct = {
      ...activeProduct,
      name: `${activeProduct.name} (Tùy biến: ${engravedText ? `Khắc "${engravedText}" • ` : ''}${selectedSpec})`
    };

    const customization = {
      productName: activeProduct.name,
      engravedText: engravedText.trim(),
      motif: activeMotifObj.name,
      color: activeColorObj.name,
      spec: selectedSpec,
      wood: selectedWood,
      note: `Tùy biến độc bản: ${engravedText ? `Khắc "${engravedText}"` : 'Tiêu chuẩn'} • ${selectedWood} • ${selectedSpec}`
    };

    addToCart(customizedProduct, 1, customization);
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.65 } });
    showToast(`Đã lưu thiết kế "${activeProduct.name}" vào giỏ hàng!`);
    setIsCartOpen(true);
  };

  const handleSnapshotCaptured = (dataUrl) => {
    const link = document.createElement('a');
    link.download = `TanKham_${activeProduct.id}_${selectedMotif}_3D.png`;
    link.href = dataUrl;
    link.click();
    showToast('Đã tải ảnh chụp thiết kế 3D cá nhân hóa về thiết bị!');
  };

  return (
    <section 
      id="home-customizer-section" 
      className="bg-[#101813] text-[#FFFDF7] py-14 lg:py-20 border-b border-[#D3B392]/20 relative overflow-hidden"
    >
      <div id="home-ar-experience-section" className="absolute -top-20" />

      {/* Atmospheric lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D3B392]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#17382D]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D3B392]/20 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172B20] text-[#D3B392] text-xs font-semibold uppercase tracking-wider border border-[#D3B392]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Chế Tác Độc Bản &amp; Trải Nghiệm AR</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFFDF7] font-bold">
              Cá Nhân Hóa Sản Phẩm &amp; Trải Nghiệm 3D AR
            </h2>
            
            <p className="text-xs sm:text-sm text-[#F5F0E5]/80 font-light max-w-2xl leading-relaxed">
              Tự tay chọn họa tiết xà cừ, màu sơn mài, chất liệu gỗ và <strong>nhập tên khắc riêng</strong> hiển thị trực tiếp trên mô hình 3D theo thời gian thực trước khi nghệ nhân Chuôn Ngọ bắt tay chế tác.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center bg-[#172B20] p-1 rounded-full border border-[#D3B392]/30 shadow-inner self-start md:self-auto shrink-0 gap-1">
            <button
              onClick={() => {
                setIsARMode(false);
                setRightTab('customizer');
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                !isARMode && rightTab === 'customizer'
                  ? 'bg-[#295741] text-[#FFFDF7] shadow-lg border border-[#D3B392]/60'
                  : 'text-[#F5F0E5]/70 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-[#D3B392]" />
              <span>Cá nhân hóa 3D</span>
            </button>

            <button
              onClick={() => setIsARMode(true)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isARMode
                  ? 'bg-[#295741] text-[#FFFDF7] shadow-lg border border-[#D3B392]/60'
                  : 'text-[#F5F0E5]/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#D3B392]" />
              <span>AR Không gian</span>
            </button>

            <button
              onClick={() => {
                setIsARMode(false);
                showToast('Đã kích hoạt xoay 360 độ tự do');
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                !isARMode
                  ? 'bg-[#295741]/50 text-[#FFFDF7]'
                  : 'text-[#F5F0E5]/70 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-[#D3B392]" />
              <span>Xoay 360°</span>
            </button>
          </div>
        </div>

        {/* Authentic Product Switcher Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-[#D3B392] uppercase font-bold tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chọn tác phẩm thủ công Chuôn Ngọ để tùy biến 3D &amp; AR:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PRODUCTS.filter(p => p.id !== 'CNH-006').map((prod, idx) => {
              const isSelected = selectedProductIndex === idx;
              const icons = ['🖋️', '🥣', '💍', '📿', '✨', '⚪'];
              return (
                <button
                  key={prod.id}
                  data-product-idx={idx}
                  onClick={() => {
                    setSelectedProductIndex(idx);
                    showToast(`Đã chuyển sang mô phỏng 3D: ${prod.name}`);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#172B20] text-[#D3B392] border-[#D3B392] shadow-xl scale-102 ring-2 ring-[#D3B392]/50'
                      : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-base">{icons[idx]}</span>
                  <span>{prod.name.split('"')[0].trim()}</span>
                  <span className="text-[11px] opacity-85 font-mono text-[#D3B392]">
                    {formatPrice(prod.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Experience Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT TOOLBAR + CENTER 3D VIEWER (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col sm:flex-row gap-4 items-stretch relative min-h-[520px]">
            
            {/* Left Vertical Dock */}
            <div className="sm:w-16 flex sm:flex-col items-center justify-center sm:justify-start gap-2 bg-[#172B20]/90 backdrop-blur-md p-2 rounded-2xl border border-[#D3B392]/30 shadow-xl shrink-0 self-center sm:self-start z-20">
              <button
                onClick={() => {
                  setIsARMode(false);
                  setRightTab('customizer');
                  setIsHighlighted(true);
                  setTimeout(() => setIsHighlighted(false), 1500);
                }}
                title="Tùy biến & Khắc tên"
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold bg-[#295741] text-white border border-[#D3B392]/60 hover:bg-[#326a50]"
              >
                <Edit3 className="w-4 h-4 text-[#D3B392]" />
                <span>Khắc tên</span>
              </button>

              <button
                onClick={() => setIsARMode(!isARMode)}
                title="Bật/Tắt WebAR trong không gian thực"
                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-all ${
                  isARMode ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>AR</span>
              </button>

              <button
                onClick={() => {
                  setIsARMode(false);
                  showToast('Đang kích hoạt chế độ xoay 360 độ quanh tác phẩm');
                }}
                title="Chế độ xoay 360 độ"
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
              >
                <RotateCw className="w-4 h-4" />
                <span>360°</span>
              </button>

              <button
                onClick={() => setShowDimensions(!showDimensions)}
                title="Bật/Tắt thước đo kích thước 3D"
                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-all ${
                  showDimensions ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                }`}
              >
                <Maximize2 className="w-4 h-4" />
                <span>Kích thước</span>
              </button>

              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('trigger-product-snapshot'));
                  showToast('Đang tạo ảnh chụp độ nét cao...');
                }}
                title="Chụp ảnh tác phẩm thiết kế"
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
              >
                <Camera className="w-4 h-4" />
                <span>Chụp ảnh</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                title="Chia sẻ liên kết thiết kế & QR Code"
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
              >
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </button>
            </div>

            {/* 3D Product Stage */}
            <div className="flex-1 relative rounded-3xl overflow-hidden border border-[#D3B392]/30 shadow-2xl bg-black/60 min-h-[500px] flex flex-col">
              
              {/* Live Engraved Text Pill Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D3B392]/50 text-xs text-[#FFFDF7] flex items-center gap-2 shadow-lg">
                <Type className="w-3.5 h-3.5 text-[#D3B392]" />
                <span>{activeProduct.name.split('"')[0].trim()}: <strong className="text-[#D3B392] font-serif">{engravedText ? `Khắc "${engravedText}"` : 'Tùy biến độc bản'}</strong></span>
              </div>

              <Product3DViewer
                productType={active3DType}
                motif={selectedMotif}
                color={selectedColor}
                size={selectedSpec}
                engravedText={engravedText}
                showDimensions={showDimensions}
                isARMode={isARMode}
                onExitAR={() => setIsARMode(false)}
                onCaptureSnapshot={handleSnapshotCaptured}
                onSelectColor={(newColor) => setSelectedColor(newColor)}
                autoRotateDefault={false}
                className="w-full h-full"
              />
            </div>

          </div>

          {/* RIGHT CUSTOMIZER & INFO PANEL (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col" ref={customizerPanelRef}>
            <div className={`bg-[#FFFDF7] text-[#17382D] rounded-3xl p-6 sm:p-7 shadow-2xl border transition-all duration-500 flex flex-col justify-between h-full space-y-5 ${
              isHighlighted ? 'border-[#B69A68] ring-4 ring-[#D3B392]/60 scale-[1.01]' : 'border-[#D3B392]/40'
            }`}>
              
              {/* Tabs */}
              <div>
                <div className="flex items-center border-b border-[#E8DEC8] pb-1 gap-6 text-xs sm:text-sm font-semibold mb-4">
                  <button
                    onClick={() => setRightTab('customizer')}
                    className={`pb-2.5 flex items-center gap-1.5 transition-all ${
                      rightTab === 'customizer'
                        ? 'border-b-2 border-[#17382D] text-[#17382D] font-bold'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <Edit3 className="w-4 h-4 text-[#B69A68]" />
                    <span>Cá nhân hóa sản phẩm</span>
                  </button>

                  <button
                    onClick={() => setRightTab('info')}
                    className={`pb-2.5 flex items-center gap-1.5 transition-all ${
                      rightTab === 'info'
                        ? 'border-b-2 border-[#17382D] text-[#17382D] font-bold'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>Thông tin di sản</span>
                  </button>
                </div>

                {/* TAB 1: CUSTOMIZER */}
                {rightTab === 'customizer' && (
                  <div className="space-y-4 text-xs">
                    
                    {/* 1. KHẮC TÊN / LỜI CHÚC CÁ NHÂN HÓA (ĐẶC QUYỀN ĐỘC BẢN) */}
                    <div className="p-3.5 rounded-2xl bg-[#F5F0E5] border border-[#B69A68]/40 space-y-2">
                      <div className="flex items-center justify-between font-bold text-[#17382D]">
                        <span className="flex items-center gap-1.5">
                          <Type className="w-4 h-4 text-[#B69A68]" />
                          Khắc Tên / Kỷ Niệm Cá Nhân Hóa (Miễn phí):
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">{engravedText.length}/20</span>
                      </div>

                      <input
                        type="text"
                        maxLength={20}
                        value={engravedText}
                        onChange={(e) => setEngravedText(e.target.value)}
                        placeholder="Nhập tên riêng, năm kỷ niệm hoặc lời chúc..."
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D3B392] rounded-xl focus:outline-none focus:border-[#17382D] text-xs font-semibold text-[#17382D] shadow-inner"
                      />

                      {/* Quick Presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-gray-500">Gợi ý nhanh:</span>
                        {['Minh Anh', 'Thuận Buồm Xuôi Gió', 'Bách Niên Hảo Hợp', 'Kỷ Niệm 2026'].map(preset => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setEngravedText(preset)}
                            className="px-2 py-0.5 rounded-lg bg-white border border-[#E8DEC8] hover:border-[#B69A68] text-[10px] text-gray-700 transition-colors"
                          >
                            +{preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. HỌA TIẾT KHẢM TRAI */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-gray-800">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B69A68]"></span>
                          Họa tiết khảm xà cừ:
                        </span>
                        <span className="text-[11px] text-[#B69A68] font-normal">{activeMotifObj.sub}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {Object.values(MOTIFS).map(m => (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMotif(m.id)}
                            className={`p-2 rounded-2xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                              selectedMotif === m.id
                                ? 'border-[#17382D] bg-[#17382D]/5 shadow-sm ring-2 ring-[#B69A68]/50'
                                : 'border-[#E8DEC8] hover:border-gray-400 bg-white'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#E8DEC8] relative bg-black/10">
                              <img src={m.thumbnail} alt={m.name} className="w-full h-full object-cover" />
                              {selectedMotif === m.id && (
                                <div className="absolute inset-0 bg-[#17382D]/40 flex items-center justify-center">
                                  <Check className="w-4 h-4 text-[#D3B392]" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-center line-clamp-1">{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. MÀU NỀN SƠN MÀI */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-gray-800">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B69A68]"></span>
                          Màu nền sơn mài hoàng cung:
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">{activeColorObj.text}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {COLOR_SWATCHES.map(sw => (
                          <button
                            key={sw.id}
                            onClick={() => setSelectedColor(sw.id)}
                            title={sw.name}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              selectedColor === sw.id ? 'scale-125 ring-2 ring-[#B69A68] shadow-md' : 'hover:scale-110'
                            }`}
                            style={{ backgroundColor: sw.hex, borderColor: sw.borderHex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 4. CHẤT LIỆU & QUY CÁCH TÙY BIẾN THEO SẢN PHẨM */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block font-bold text-gray-800 mb-1">
                          {selectedProductIndex === 2 ? 'Viền kim loại:' : (selectedProductIndex === 1 ? 'Cốt gỗ tự nhiên:' : 'Chất liệu hộp gỗ:')}
                        </span>
                        <select
                          value={selectedWood}
                          onChange={(e) => setSelectedWood(e.target.value)}
                          className="w-full px-2.5 py-2 bg-white border border-[#E8DEC8] rounded-xl text-xs focus:outline-none"
                        >
                          {selectedProductIndex === 2 ? (
                            <>
                              <option value="Titan mạ bạc 925">Titan mạ bạc 925 cao cấp</option>
                              <option value="Titan mạ vàng Champagne">Titan mạ vàng Champagne 18K</option>
                            </>
                          ) : selectedProductIndex === 1 ? (
                            <>
                              <option value="Gỗ Mít sơn ta 9 lớp">Gỗ Mít sơn ta 9 lớp cổ truyền</option>
                              <option value="Gỗ Mít men bóng Nano">Gỗ Mít men bóng Nano di sản</option>
                            </>
                          ) : (
                            <>
                              <option value="Gỗ Mun hoa">Gỗ Mun hoa sọc</option>
                              <option value="Gỗ Trắc đỏ">Gỗ Trắc đỏ Gia Lai</option>
                              <option value="Gỗ Hương đá">Gỗ Hương đá thơm</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <span className="block font-bold text-gray-800 mb-1">
                          {selectedProductIndex === 0 ? 'Cỡ ngòi bút:' : (selectedProductIndex === 1 ? 'Đường kính bát:' : (selectedProductIndex === 2 ? 'Size vòng tay:' : (selectedProductIndex === 3 ? 'Kích thước hạt:' : 'Quy cách set:')))}
                        </span>
                        <div className="flex gap-1">
                          {selectedProductIndex === 0 ? (
                            ['0.5mm', '0.7mm', '1.0mm'].map(spec => (
                              <button
                                key={spec}
                                onClick={() => setSelectedSpec(spec)}
                                className={`flex-1 py-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                                  selectedSpec === spec
                                    ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                                    : 'bg-white text-gray-700 border-[#E8DEC8] hover:bg-gray-100'
                                }`}
                              >
                                {spec}
                              </button>
                            ))
                          ) : selectedProductIndex === 1 ? (
                            ['11.5cm', '14cm', '16cm'].map(dia => (
                              <button
                                key={dia}
                                onClick={() => setSelectedSpec(`ĐK ${dia}`)}
                                className={`flex-1 py-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                                  selectedSpec === `ĐK ${dia}` || (selectedSpec === '11.5cm' && dia === '11.5cm')
                                    ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                                    : 'bg-white text-gray-700 border-[#E8DEC8] hover:bg-gray-100'
                                }`}
                              >
                                {dia}
                              </button>
                            ))
                          ) : selectedProductIndex === 2 ? (
                            ['S', 'M', 'L'].map(sz => (
                              <button
                                key={sz}
                                onClick={() => setSelectedSpec(`Size ${sz}`)}
                                className={`flex-1 py-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                                  selectedSpec === `Size ${sz}` || (selectedSpec === 'Size M' && sz === 'M')
                                    ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                                    : 'bg-white text-gray-700 border-[#E8DEC8] hover:bg-gray-100'
                                }`}
                              >
                                {sz}
                              </button>
                            ))
                          ) : selectedProductIndex === 3 ? (
                            ['8mm', '10mm'].map(hb => (
                              <button
                                key={hb}
                                onClick={() => setSelectedSpec(hb)}
                                className={`flex-1 py-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                                  selectedSpec === hb || (selectedSpec === '8mm' && hb === '8mm')
                                    ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                                    : 'bg-white text-gray-700 border-[#E8DEC8] hover:bg-gray-100'
                                }`}
                              >
                                {hb}
                              </button>
                            ))
                          ) : (
                            ['Set 3 món', 'Set 5 món'].map(sm => (
                              <button
                                key={sm}
                                onClick={() => setSelectedSpec(sm)}
                                className={`flex-1 py-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                                  selectedSpec === sm || (selectedSpec === 'Set 3 món' && sm === 'Set 3 món')
                                    ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                                    : 'bg-white text-gray-700 border-[#E8DEC8] hover:bg-gray-100'
                                }`}
                              >
                                {sm}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: PRODUCT INFORMATION */}
                {rightTab === 'info' && (
                  <div className="space-y-4 text-xs text-gray-600 leading-relaxed font-light">
                    <p className="font-serif italic text-sm text-[#8B3A1E]">
                      {activeProduct.name}
                    </p>
                    <p>
                      {activeProduct.story || 'Tác phẩm được chế tác thủ công tại làng nghề Chuôn Ngọ, là sự kết tinh giữa kỹ thuật cưa lọng truyền thống và nghệ thuật mỹ nghệ đương đại.'}
                    </p>
                    <div className="p-3 bg-[#F5F0E5] rounded-xl space-y-1.5 text-[11px] text-[#2B1E16]">
                      <div>• <strong>Chất liệu cẩn:</strong> {activeProduct.shellType || 'Ốc đỏ Singapore & xà cừ ngũ sắc đại dương'}</div>
                      <div>• <strong>Cốt gỗ / Thân:</strong> {activeProduct.woodType || 'Gỗ quý tự nhiên sấy tiêu chuẩn'}</div>
                      <div>• <strong>Nghệ nhân:</strong> {activeProduct.artisan} ({activeProduct.artisanExperience})</div>
                      <div>• <strong>Định danh số:</strong> {activeProduct.digitalPassport?.serialNumber || 'CNH-2026-HERITAGE'}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Giá hoàn thiện (Đã gồm tùy biến):</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Cọc trước 55%: {formatPrice(Math.round(activeProduct.price * 0.55))}</span>
                  </div>
                  <div className="font-serif font-bold text-2xl text-[#17382D]">
                    {formatPrice(activeProduct.price)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#17382D] to-[#2B1E16] hover:from-[#244A3D] hover:to-[#3D261A] text-[#FFFDF7] font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D3B392]" />
                    <span>Lưu Thiết Kế &amp; Đặt Hàng</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      showToast(isFavorite ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã lưu thiết kế cá nhân hóa vào yêu thích');
                    }}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors shrink-0 ${
                      isFavorite ? 'bg-red-50 border-red-300 text-red-600' : 'border-[#E8DEC8] hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Link to Fullscreen Studio */}
                <div className="text-center pt-1">
                  <button
                    onClick={() => navigateTo('experience', 'crafting')}
                    className="text-[11px] text-[#B69A68] hover:text-[#17382D] font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Mở rộng toàn màn hình Studio 3D Nghệ nhân</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={{
          id: activeProduct.id,
          name: `${activeProduct.name} (${engravedText || activeMotifObj.name})`,
          price: activeProduct.price
        }}
        motif={activeMotifObj.name}
        color={activeColorObj.name}
        size={selectedSpec}
      />
    </section>
  );
};
