import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  QrCode, 
  Box, 
  Edit3, 
  Users, 
  ArrowRight
} from 'lucide-react';

export const HeroBanner = () => {
  const { 
    navigateTo, 
    setIsVideoModalOpen, 
    openPassport, 
    openAR 
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Nền tảng thương mại di sản số Tân Khảm',
      titlePrimary: 'Tân Khảm',
      titleSecondary: 'Tân sắc diện - Khảm tinh hoa',
      description: 'Kết nối di sản làng nghề khảm trai Chuôn Ngọ truyền thống với thế hệ hiện đại qua thương mại điện tử và trải nghiệm số.',
      ctaPrimary: 'Khám phá sản phẩm',
      ctaSecondary: 'Xem video giới thiệu',
      artwork: '/images/hero_seamless_artwork.png?v=2026',
      alt: 'Tân Khảm - Tân sắc diện, Khảm tinh hoa'
    },
    {
      badge: 'Dự án SV Start-up 2026',
      titlePrimary: 'Di sản sống',
      titleSecondary: 'Phong cách đương đại',
      description: 'Hiện đại hóa chất liệu xà cừ nghìn năm thành phụ kiện lifestyle và quà tặng cá nhân hóa cho thế hệ trẻ.',
      ctaPrimary: 'Xem BST Gen Z',
      ctaSecondary: 'Câu chuyện di sản',
      artwork: '/images/hero_seamless_artwork.png?v=2026',
      alt: 'Bộ sưu tập khảm trai Gen Z'
    },
    {
      badge: 'Kinh doanh tạo tác động xã hội',
      titlePrimary: 'Ký quỹ 55%',
      titleSecondary: 'Bảo trợ nghệ nhân Chuôn Ngọ',
      description: 'Mô hình đặt trước linh hoạt, tài trợ 100% nguyên liệu quý và tiền công cho nghệ nhân làng nghề.',
      ctaPrimary: 'Tìm hiểu cơ chế',
      ctaSecondary: 'Gặp gỡ nghệ nhân',
      artwork: '/images/hero_seamless_artwork.png?v=2026',
      alt: 'Bảo trợ nghệ nhân làng nghề'
    }
  ];

  // Auto slide every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative bg-[#101813] text-[#FFFDF7] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex items-center select-none border-b border-[#D3B392]/15">
      
      {/* 
        QUIET LUXURY ATMOSPHERE:
        Deep lacquer midnight background with ambient champagne-gold (#D3B392) museum lighting
        and ultra-sharp 3K mother-of-pearl inlay centerpiece.
      */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#101813]">
        {/* Ambient warm champagne/tan museum lighting behind typography */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 25% 45%, rgba(211, 179, 146, 0.45) 0%, rgba(150, 101, 72, 0.15) 50%, transparent 75%)'
          }}
        />

        {/* Authentic Full-Width 3K Mother-of-Pearl Centerpiece */}
        <img
          src={active.artwork}
          alt={active.alt}
          className="absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-700 opacity-100 contrast-[1.05] brightness-[1.02]"
        />

        {/* Mobile-only subtle dark tint for high text legibility on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101813] via-[#101813]/85 to-transparent sm:hidden z-10" />

        {/* Ambient Luxury Brand Watermark in Background */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 z-10 pointer-events-none opacity-25 hidden md:flex flex-col items-end text-right select-none">
          <span className="font-serif text-2xl lg:text-3xl font-light tracking-[0.25em] text-[#E7C6A2]">
            TÂN KHẢM
          </span>
          <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.25em] text-[#D3B392] mt-1 font-medium">
            Tân sắc diện - Khảm tinh hoa
          </span>
        </div>
      </div>

      {/* Slide Navigation Left Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Slide trước"
        className="absolute left-3 sm:left-5 z-20 w-9 h-9 rounded-full border border-[#FFFDF7]/20 hover:border-[#D3B392] bg-black/25 hover:bg-[#D3B392]/20 text-[#FFFDF7] hover:text-[#E7C6A2] flex items-center justify-center transition-all backdrop-blur-md shadow-lg"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Slide Navigation Right Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
        className="absolute right-3 sm:right-5 z-20 w-9 h-9 rounded-full border border-[#FFFDF7]/20 hover:border-[#D3B392] bg-black/25 hover:bg-[#D3B392]/20 text-[#FFFDF7] hover:text-[#E7C6A2] flex items-center justify-center transition-all backdrop-blur-md shadow-lg"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Main Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full relative z-10">
        <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">
          
          {/* 1. Small Pill Badge: "Nền tảng thương mại di sản số" */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#D3B392]/40 text-[#E7C6A2] text-[11px] sm:text-[12px] font-medium tracking-wider uppercase bg-[#D3B392]/10 backdrop-blur-md shadow-sm">
              {active.badge}
            </span>
          </div>

          {/* 2. Large Typography Heading */}
          <div className="space-y-0.5">
            <h1 className="font-serif leading-[1.15]">
              <span className="block font-cormorant italic text-3xl sm:text-4xl lg:text-5xl font-light text-[#E7C6A2]">
                {active.titlePrimary}
              </span>
              <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FFFDF7] tracking-tight">
                {active.titleSecondary}
              </span>
            </h1>
          </div>

          {/* 3. Description Subtitle */}
          <p className="text-[#F5F0E5]/85 text-sm sm:text-base font-light leading-relaxed max-w-lg">
            {active.description}
          </p>

          {/* 4. Two CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            {/* Primary CTA Button (Champagne Tan Pill) */}
            <button
              onClick={() => {
                if (currentSlide === 0) navigateTo('shop');
                else if (currentSlide === 1) navigateTo('shop', 'phu-kien-ca-nhan');
                else navigateTo('cart');
              }}
              className="px-6 py-2.5 sm:py-3 rounded-full bg-[#D3B392] hover:bg-[#E7C6A2] text-[#141A16] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_25px_rgba(211,179,146,0.3)] hover:shadow-[0_6px_30px_rgba(211,179,146,0.45)] transition-all"
            >
              <span>{active.ctaPrimary}</span>
              <span className="text-sm">→</span>
            </button>

            {/* Secondary CTA Button (Glassmorphism Pill) */}
            <button
              onClick={() => {
                if (currentSlide === 0) setIsVideoModalOpen(true);
                else navigateTo('heritage');
              }}
              className="px-5 py-2.5 sm:py-3 rounded-full border border-[#FFFDF7]/30 hover:border-[#D3B392] bg-white/[0.04] hover:bg-[#D3B392]/15 text-[#FFFDF7] font-medium text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-sm shadow-sm"
            >
              <div className="w-5 h-5 rounded-full border border-[#E7C6A2] flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-[#E7C6A2] ml-0.5" />
              </div>
              <span>{active.ctaSecondary}</span>
            </button>
          </div>

          {/* 5. 4 Utilities Row (Quiet Luxury styling with subtle gold accents) */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs max-w-2xl">
            {/* Utility 1 */}
            <div 
              onClick={() => openPassport()}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <QrCode className="w-5 h-5 text-[#D3B392] shrink-0 group-hover:text-[#E7C6A2] group-hover:scale-110 transition-all" strokeWidth={1.6} />
              <div className="leading-tight">
                <span className="block text-[12px] font-medium text-[#FFFDF7] group-hover:text-[#E7C6A2] transition-colors">Định danh</span>
                <span className="block text-[11px] text-[#D3B392]/80">di sản số</span>
              </div>
            </div>

            {/* Utility 2 */}
            <div 
              onClick={() => {
                const el = document.getElementById('home-ar-experience-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  openAR();
                }
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <Box className="w-5 h-5 text-[#D3B392] shrink-0 group-hover:text-[#E7C6A2] group-hover:scale-110 transition-all" strokeWidth={1.6} />
              <div className="leading-tight">
                <span className="block text-[12px] font-medium text-[#FFFDF7] group-hover:text-[#E7C6A2] transition-colors">Trải nghiệm</span>
                <span className="block text-[11px] text-[#D3B392]/80">AR/VR</span>
              </div>
            </div>

            {/* Utility 3 */}
            <div 
              onClick={() => {
                const el = document.getElementById('home-customizer-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('focus-home-customizer'));
                } else {
                  navigateTo('experience', 'customizer');
                }
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <Edit3 className="w-5 h-5 text-[#D3B392] shrink-0 group-hover:text-[#E7C6A2] group-hover:scale-110 transition-all" strokeWidth={1.6} />
              <div className="leading-tight">
                <span className="block text-[12px] font-medium text-[#FFFDF7] group-hover:text-[#E7C6A2] transition-colors">Cá nhân hóa</span>
                <span className="block text-[11px] text-[#D3B392]/80">sản phẩm</span>
              </div>
            </div>

            {/* Utility 4 */}
            <div 
              onClick={() => navigateTo('workshop')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <Users className="w-5 h-5 text-[#D3B392] shrink-0 group-hover:text-[#E7C6A2] group-hover:scale-110 transition-all" strokeWidth={1.6} />
              <div className="leading-tight">
                <span className="block text-[12px] font-medium text-[#FFFDF7] group-hover:text-[#E7C6A2] transition-colors">Workshop</span>
                <span className="block text-[11px] text-[#D3B392]/80">trải nghiệm nghề</span>
              </div>
            </div>
          </div>

        </div>

        {/* 6. Carousel 3 Dots Bottom Right */}
        <div className="absolute bottom-4 right-6 sm:right-10 flex items-center space-x-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? 'w-6 h-1.5 bg-[#D3B392] shadow-[0_0_8px_rgba(211,179,146,0.5)]' 
                  : 'w-2 h-2 bg-[#FFFDF7]/30 hover:bg-[#FFFDF7]/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
