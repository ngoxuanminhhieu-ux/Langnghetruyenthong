import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/heritageData';
import { QRCodeGenerator } from '../components/common/QRCodeGenerator';
import { 
  QrCode, 
  CheckCircle2, 
  Leaf, 
  ShoppingBag, 
  Heart, 
  Maximize2, 
  MapPin, 
  Layers, 
  Box, 
  Gift, 
  Settings, 
  BookOpen, 
  Info, 
  User, 
  Grid, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronLeft,
  X,
  Share2,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DigitalPassportPage = ({ productId = 'CNH-001' }) => {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    showToast, 
    openAR, 
    wishlist, 
    setWishlist 
  } = useApp();

  // Find targeted product by ID or fallback
  const targetId = productId || selectedProductId || 'CNH-001';
  const resolvedId = targetId.startsWith('SP00') ? targetId.replace('SP00', 'CNH-00') : targetId;
  const product = PRODUCTS.find(p => p.id === resolvedId || p.id === targetId) || PRODUCTS[0];

  // Specific Passport Metadata
  const passportCode = product.id.startsWith('CNH-00') ? product.id.replace('CNH-00', 'SP00') : product.id;
  const passportTitle = product.name;
  const passportSubtitle = 'Tinh hoa khảm trai truyền thống hơn 1.000 năm';
  const passportPrice = product.price;

  // Gallery Thumbnails
  const defaultGallery = [
    product.image || '/images/hd_cat_box.jpg',
    '/images/cat_box.jpg',
    '/images/hd_cat_gift.jpg',
    '/images/hd_cat_tray.jpg'
  ];
  const gallery = product.gallery && product.gallery.length >= 4 ? product.gallery : defaultGallery;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorite = wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isFavorite) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      showToast('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
      setWishlist(prev => [...prev, product.id]);
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
      showToast('Đã thêm vào danh sách yêu thích');
    }
  };

  const handleCopyUrl = () => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://chuonngo-heritage.vn/qr/${passportCode}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    showToast(`Đã sao chép liên kết định danh di sản: ${url}`);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 5 Crafting Steps data with authentic visuals
  const stepsData = [
    {
      num: 1,
      title: 'Chọn và xử lý vỏ trai',
      img: '/images/craft_step_1.jpg',
      desc: 'Tuyển chọn vỏ trai cửu khổng, vỏ ốc đỏ tự nhiên ngũ sắc, ngâm và tẩy làm sạch lớp biểu bì thô.'
    },
    {
      num: 2,
      title: 'Cắt tạo họa tiết',
      img: '/images/craft_step_2.jpg',
      desc: 'Can nét hoa văn lên giấy dán vỏ ốc, dùng cưa lọng dây cung mảnh như sợi tóc cưa từng đường uốn lượn.'
    },
    {
      num: 3,
      title: 'Khảm và gắn họa tiết',
      img: '/images/craft_step_3.jpg',
      desc: 'Đục chìm lòng gỗ vừa khít độ dày mảnh xà cừ, gắn chặt bằng sơn ta tự nhiên và ép phẳng.'
    },
    {
      num: 4,
      title: 'Mài, hoàn thiện bề mặt',
      img: '/images/craft_step_4.jpg',
      desc: 'Mài phẳng bằng cát mịn phù sa sông Hồng, đánh bóng bằng lá chuối khô để xà cừ phát ánh ngũ sắc.'
    },
    {
      num: 5,
      title: 'Sơn phủ và kiểm tra chất lượng',
      img: '/images/craft_step_5.jpg',
      desc: 'Phủ bóng bảo vệ, kiểm định chất lượng làng nghề và dán tem QR Hộ chiếu di sản số.'
    }
  ];

  // Related products (excluding current)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#2B1E16] font-sans pb-28 select-none">
      
      {/* 1. SIMULATED BROWSER TOP BAR (Matching User's Mobile Screenshot) */}
      <div className="bg-[#101813] text-[#FFFDF7] border-b border-[#D3B392]/20 sticky top-0 z-40 shadow-sm backdrop-blur-md">
        
        {/* Top Status & Address Pill */}
        <div className="max-w-3xl mx-auto px-4 pt-2.5 pb-2">
          <div className="flex items-center justify-between gap-3 bg-[#1A261F] border border-[#D3B392]/30 rounded-full px-4 py-1.5 shadow-inner">
            <div className="flex items-center gap-2 text-xs text-[#D8C29D]">
              <span className="text-[11px] font-mono text-emerald-400">🔒</span>
              <span className="font-mono text-[11px] sm:text-xs text-white/90 truncate">
                chuonngo-heritage.vn/qr/{passportCode}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleCopyUrl}
                title="Sao chép đường dẫn định danh"
                className="text-xs px-2 py-0.5 rounded-full bg-white/10 hover:bg-[#D3B392]/30 text-[#D8C29D] flex items-center gap-1 transition-colors"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px] hidden sm:inline">Sao chép</span>
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D3B392] hover:bg-[#E7C6A2] text-[#101813] font-bold transition-colors"
              >
                Trang chủ
              </button>
            </div>
          </div>
        </div>

        {/* Website Brand Header inside Passport View */}
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between border-t border-white/5">
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 p-1 flex items-center justify-center border border-[#D3B392]/40">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M50 15 C50 15, 38 40, 38 60 C38 72, 44 80, 50 80 C56 80, 62 72, 62 60 C62 40, 50 15, 50 15 Z" fill="#FFFDF7" />
                <path d="M50 30 C42 42, 22 55, 24 72 C25 80, 34 82, 42 80 C48 78, 50 74, 50 72" fill="#D3B392" />
                <path d="M50 30 C58 42, 78 55, 76 72 C75 80, 66 82, 58 80 C52 78, 50 74, 50 72" fill="#D3B392" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold text-[#FFFDF7] leading-none">
                Tân Khảm
              </span>
              <span className="text-[8px] tracking-[0.16em] text-[#D3B392] uppercase mt-0.5">
                Tân sắc diện - Khảm tinh hoa
              </span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#D8C29D] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Tất cả sản phẩm</span>
            <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

      </div>

      {/* MAIN CONTAINER (Centered, Max-w-3xl like mobile-first luxury card) */}
      <div className="max-w-3xl mx-auto px-3 sm:px-5 pt-4 sm:pt-6 space-y-5">
        
        {/* =========================================================================
            SECTION 1: HERO PRODUCT CARD (HỘ CHIẾU DI SẢN SỐ)
        ========================================================================= */}
        <section 
          id="overview"
          className="bg-[#FFFDF7] rounded-3xl p-4 sm:p-6 border border-[#E8DEC8] shadow-[0_8px_30px_rgba(43,30,22,0.06)] space-y-5"
        >
          {/* Top Identification Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]/60">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFE3] border border-[#D3B392]/60 text-xs font-semibold text-[#17382D]">
              <QrCode className="w-3.5 h-3.5 text-[#8B3A1E]" />
              <span>Hộ chiếu di sản số</span>
              <span className="text-gray-300">|</span>
              <span className="font-mono text-gray-700">Mã định danh: {passportCode}</span>
            </div>

            <span className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Chính gốc Chuôn Ngọ
            </span>
          </div>

          {/* Grid Layout: Main Image (Left) + Details (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* Image Section (5 cols) */}
            <div className="md:col-span-6 space-y-3">
              {/* Big Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black/5 border border-[#E8DEC8] group shadow-inner">
                <img 
                  src={gallery[activeImageIndex]} 
                  alt={passportTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Expand / Zoom button */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-xs"
                  title="Xem phóng to ảnh chi tiết"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2">
                {gallery.slice(0, 4).map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white ${
                      activeImageIndex === idx 
                        ? 'border-[#8B3A1E] shadow-md scale-102' 
                        : 'border-[#E8DEC8] hover:border-gray-400 opacity-80'
                    }`}
                  >
                    <img src={thumb} alt={`Chi tiết ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Purchase Actions (7 cols) */}
            <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
              
              <div className="space-y-2">
                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1813] leading-snug">
                  {passportTitle}
                </h1>

                {/* Italic Subtitle */}
                <p className="font-serif italic text-sm text-[#8B6E4A]">
                  {passportSubtitle}
                </p>

                {/* 2 Trust Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-50 text-[11px] font-medium shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    Xác thực di sản
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#524432] text-[#F3EADB] text-[11px] font-medium shadow-xs">
                    <Leaf className="w-3 h-3 text-[#D3B392]" />
                    Thủ công 100%
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-gray-700 font-light leading-relaxed pt-1">
                  {product.story || 'Tác phẩm được chế tác thủ công tại làng nghề Chuôn Ngọ, là sự kết tinh giữa kỹ thuật truyền thống tinh xảo và vẻ đẹp hiện đại, sang trọng.'}
                </p>
              </div>

              {/* Price & CTA Buttons */}
              <div className="space-y-3 pt-2">
                {/* Big Price */}
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#8B3A1E]">
                  {passportPrice.toLocaleString('vi-VN')} đ
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#8B3A1E] hover:bg-[#A34524] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Mua sản phẩm</span>
                  </button>

                  <button
                    onClick={toggleWishlist}
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                      isFavorite 
                        ? 'bg-rose-50 border-rose-300 text-rose-600' 
                        : 'bg-white border-[#E8DEC8] text-gray-500 hover:text-rose-500 hover:bg-rose-50'
                    }`}
                    title="Lưu vào danh sách yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => openAR(product)}
                    className="px-3.5 h-11 rounded-xl bg-[#17382D] hover:bg-[#23533E] text-[#D3B392] font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    title="Mở mô phỏng 3D WebAR"
                  >
                    <Box className="w-4 h-4" />
                    <span className="hidden sm:inline">Xem 3D</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 2: 4 SPECIFICATIONS GRID (THÔNG SỐ TÁC PHẨM)
        ========================================================================= */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          
          {/* Box 1: Xuất xứ */}
          <div className="bg-[#FFFDF7] p-3.5 sm:p-4 rounded-2xl border border-[#E8DEC8] space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#8B3A1E]" />
              <span>Xuất xứ</span>
            </div>
            <p className="font-bold text-xs sm:text-[13px] text-[#1F1813] leading-snug">
              Làng Chuôn Ngọ
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              (Chuyên Mỹ, Phú Xuyên, Hà Nội)
            </p>
          </div>

          {/* Box 2: Chất liệu */}
          <div className="bg-[#FFFDF7] p-3.5 sm:p-4 rounded-2xl border border-[#E8DEC8] space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Layers className="w-3.5 h-3.5 text-[#8B3A1E]" />
              <span>Chất liệu</span>
            </div>
            <p className="font-bold text-xs sm:text-[13px] text-[#1F1813] leading-snug">
              Gỗ sơn, vỏ trai tự nhiên
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              (xà cừ), sơn mài
            </p>
          </div>

          {/* Box 3: Kích thước */}
          <div className="bg-[#FFFDF7] p-3.5 sm:p-4 rounded-2xl border border-[#E8DEC8] space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Box className="w-3.5 h-3.5 text-[#8B3A1E]" />
              <span>Kích thước</span>
            </div>
            <p className="font-bold text-xs sm:text-[13px] text-[#1F1813] leading-snug">
              12 × 12 × 6 cm
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              (Trọng lượng: ~480g)
            </p>
          </div>

          {/* Box 4: Ứng dụng */}
          <div className="bg-[#FFFDF7] p-3.5 sm:p-4 rounded-2xl border border-[#E8DEC8] space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Gift className="w-3.5 h-3.5 text-[#8B3A1E]" />
              <span>Ứng dụng</span>
            </div>
            <p className="font-bold text-xs sm:text-[13px] text-[#1F1813] leading-snug">
              Đựng trang sức,
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              quà tặng, trang trí
            </p>
          </div>

        </section>

        {/* =========================================================================
            SECTION 3: TWO SPOTLIGHT CARDS (NGHỆ NHÂN & LÀNG NGHỀ)
        ========================================================================= */}
        <section id="artisan" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Card 1: Nghệ nhân chế tác */}
          <div 
            onClick={() => navigateTo('workshop')}
            className="bg-[#FFFDF7] p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-xs flex gap-3.5 items-start cursor-pointer hover:border-[#8B3A1E] transition-all group"
          >
            <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-[#E8DEC8] bg-black">
              <img 
                src="/images/artisan_truong_kim_thanh.jpg" 
                alt="Nghệ nhân Nguyễn Văn Hòa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <User className="w-3 h-3 text-[#8B3A1E]" />
                  <span>Nghệ nhân chế tác</span>
                </span>
                <span className="text-gray-400 group-hover:text-[#8B3A1E] transition-colors">→</span>
              </div>
              <h3 className="font-bold text-sm text-[#1F1813]">
                {product.artisan || 'Nghệ nhân Nguyễn Văn Hòa'}
              </h3>
              <p className="text-[11px] text-gray-600 font-light leading-relaxed line-clamp-3">
                {product.artisanExperience ? `${product.artisanExperience} gắn bó với nghề khảm trai, bậc thầy gìn giữ kỹ thuật cưa lọng tơ tóc và cẩn xà cừ cổ truyền làng Chuôn Ngọ.` : 'Hơn 40 năm gắn bó với nghề khảm trai, nghệ nhân ưu tiên gìn giữ kỹ thuật cổ truyền và đào tạo thế hệ trẻ tại làng Chuôn Ngọ.'}
              </p>
            </div>
          </div>

          {/* Card 2: Làng nghề Chuôn Ngọ */}
          <div 
            onClick={() => navigateTo('experience')}
            className="bg-[#FFFDF7] p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-xs flex gap-3.5 items-start cursor-pointer hover:border-[#8B3A1E] transition-all group"
          >
            <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-[#E8DEC8] bg-black">
              <img 
                src="/images/dinh_chuon_ngo.jpg" 
                alt="Làng nghề Chuôn Ngọ" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#8B3A1E]" />
                  <span>Làng nghề Chuôn Ngọ</span>
                </span>
                <span className="text-gray-400 group-hover:text-[#8B3A1E] transition-colors">→</span>
              </div>
              <h3 className="font-bold text-sm text-[#1F1813]">
                Đệ nhất làng nghề khảm trai
              </h3>
              <p className="text-[11px] text-gray-600 font-light leading-relaxed line-clamp-3">
                Làng nghề khảm trai, mài vỏ ốc xà cừ có lịch sử hơn 1.000 năm, được xem là một trong những cái nôi của nghệ thuật khảm trai Việt Nam.
              </p>
            </div>
          </div>

        </section>

        {/* =========================================================================
            SECTION 4: QUY TRÌNH CHẾ TÁC (5 STEPS WITH CONNECTING ARROWS)
        ========================================================================= */}
        <section 
          id="process"
          className="bg-[#FFFDF7] p-4 sm:p-6 rounded-3xl border border-[#E8DEC8] shadow-xs space-y-4"
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#8B3A1E]" />
            <h2 className="font-bold text-sm sm:text-base text-[#1F1813]">
              Quy trình chế tác
            </h2>
          </div>

          {/* 5 Horizontal Steps with Connecting Arrows */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
            {stepsData.map((st, i) => (
              <div key={st.num} className="flex flex-col items-center text-center space-y-2 relative">
                
                {/* Step Thumbnail Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-xs bg-black/5">
                  <img src={st.img} alt={st.title} className="w-full h-full object-cover" />
                  
                  {/* Step Number Badge */}
                  <span className="absolute bottom-1.5 left-1.5 w-5 h-5 rounded-full bg-[#8B3A1E] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    {st.num}
                  </span>
                </div>

                {/* Step Title */}
                <p className="text-[11px] font-bold text-[#1F1813] leading-tight px-1">
                  {st.title}
                </p>

                {/* Arrow to Next Step (Desktop only) */}
                {i < stepsData.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/3 -translate-y-1/2 text-gray-400 font-bold text-xs pointer-events-none z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: CÂU CHUYỆN DI SẢN (HERITAGE STORY)
        ========================================================================= */}
        <section 
          id="story"
          className="bg-[#FFFDF7] p-4 sm:p-6 rounded-3xl border border-[#E8DEC8] shadow-xs space-y-4"
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B3A1E]" />
            <h2 className="font-bold text-sm sm:text-base text-[#1F1813]">
              Câu chuyện di sản
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Left Lotus Artwork Illustration */}
            <div className="sm:col-span-4 rounded-2xl overflow-hidden border border-[#E8DEC8] bg-[#F5EFE3] p-3 flex items-center justify-center">
              <img 
                src="/images/story_lotus_clean.jpg" 
                alt="Minh họa tranh sen khảm trai Chuôn Ngọ"
                className="w-full h-auto max-h-40 object-contain rounded-xl"
              />
            </div>

            {/* Right Story Paragraph */}
            <div className="sm:col-span-8">
              <p className="text-xs sm:text-[13px] text-gray-700 font-light leading-relaxed">
                Khảm trai Chuôn Ngọ không chỉ là nghề, mà là ký ức văn hóa được truyền qua nhiều thế hệ. Mỗi đường khảm, mỗi mảnh xà cừ lấp lánh trên chiếc hộp là câu chuyện về sự khéo léo, tỉ mỉ và tình yêu với nghề của người thợ. Sản phẩm không chỉ lưu giữ những món trang sức quý, mà còn lưu giữ một phần hồn cốt của làng nghề Việt.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: SẢN PHẨM LIÊN QUAN (RELATED AUTHENTICATED PRODUCTS)
        ========================================================================= */}
        <section 
          id="related"
          className="bg-[#FFFDF7] p-4 sm:p-6 rounded-3xl border border-[#E8DEC8] shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-[#8B3A1E]" />
              <h2 className="font-bold text-sm sm:text-base text-[#1F1813]">
                Sản phẩm định danh liên quan
              </h2>
            </div>
            <button 
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#8B3A1E] hover:underline font-semibold"
            >
              Xem tất cả →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedProducts.map(rel => (
              <div 
                key={rel.id}
                className="p-3 rounded-2xl border border-[#E8DEC8] bg-[#FDFBF7] space-y-2 hover:border-[#8B3A1E] transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-black/5 relative">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono">
                    {rel.id}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-[#1F1813] line-clamp-1">{rel.name}</h4>
                  <p className="text-xs font-bold text-[#8B3A1E]">{rel.price.toLocaleString('vi-VN')} đ</p>
                </div>

                <button
                  onClick={() => {
                    navigateTo('passport', rel.id);
                  }}
                  className="w-full py-1.5 rounded-lg bg-[#F5EFE3] hover:bg-[#8B3A1E] hover:text-white text-[#17382D] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-3 h-3" />
                  <span>Xem Hộ chiếu số</span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* =========================================================================
          7. BOTTOM FLOATING STICKY NAVIGATION BAR (MATCHING USER'S PHOTO)
      ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#E8DEC8] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-2">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between text-center">
          
          {/* Tab 1: Tổng quan */}
          <button
            onClick={() => scrollToSection('overview', 'overview')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
              activeTab === 'overview' ? 'text-[#8B3A1E] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'overview' ? 'bg-[#8B3A1E]/10' : ''}`}>
              <Info className="w-4 h-4" />
            </div>
            <span>Tổng quan</span>
          </button>

          {/* Tab 2: Nghệ nhân */}
          <button
            onClick={() => scrollToSection('artisan', 'artisan')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
              activeTab === 'artisan' ? 'text-[#8B3A1E] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'artisan' ? 'bg-[#8B3A1E]/10' : ''}`}>
              <User className="w-4 h-4" />
            </div>
            <span>Nghệ nhân</span>
          </button>

          {/* Tab 3: Quy trình */}
          <button
            onClick={() => scrollToSection('process', 'process')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
              activeTab === 'process' ? 'text-[#8B3A1E] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'process' ? 'bg-[#8B3A1E]/10' : ''}`}>
              <Layers className="w-4 h-4" />
            </div>
            <span>Quy trình</span>
          </button>

          {/* Tab 4: Câu chuyện */}
          <button
            onClick={() => scrollToSection('story', 'story')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
              activeTab === 'story' ? 'text-[#8B3A1E] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'story' ? 'bg-[#8B3A1E]/10' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span>Câu chuyện</span>
          </button>

          {/* Tab 5: Sản phẩm liên quan */}
          <button
            onClick={() => scrollToSection('related', 'related')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
              activeTab === 'related' ? 'text-[#8B3A1E] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'related' ? 'bg-[#8B3A1E]/10' : ''}`}>
              <Grid className="w-4 h-4" />
            </div>
            <span>Sản phẩm</span>
          </button>

        </div>
      </div>

      {/* FULL-SCREEN ZOOM IMAGE MODAL */}
      {isZoomOpen && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
        >
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <img 
            src={gallery[activeImageIndex]} 
            alt={passportTitle} 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" 
          />
        </div>
      )}

    </div>
  );
};
