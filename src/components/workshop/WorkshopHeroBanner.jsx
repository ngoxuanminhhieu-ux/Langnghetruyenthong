import React from 'react';
import { 
  Sparkles, 
  Award, 
  Users, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';

export const WorkshopHeroBanner = ({ onExploreClick, onCalendarClick }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101813] via-[#17382D] to-[#2B1E16] text-[#FFFDF7] border border-[#D3B392]/40 shadow-2xl mb-12">
      {/* Background subtle overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: `url('/images/heritage_crafting_hero.jpg')` }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D3B392]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#17382D]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:py-20 max-w-5xl">
        {/* Heritage Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101813]/80 border border-[#D3B392]/50 text-[#D3B392] text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D3B392]" />
          <span>Di Sản Văn Hóa & Nghệ Thuật Khảm Trai Nghìn Năm</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFFDF7] font-bold leading-tight sm:leading-tight mb-5">
          Chạm Tay Vào Tinh Hoa <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D3B392] via-[#F5E6D3] to-[#C5A880]">
            Khảm Trai Chuôn Ngọ
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-[#F5F0E5]/90 font-light max-w-3xl leading-relaxed mb-8">
          Không chỉ là một buổi học thủ công thông thường, đây là hành trình đắm mình vào cái nôi di sản xà cừ nghìn năm. Tự tay cầm cưa lọng chỉ, chọn từng phiến ốc ngũ sắc và mang về tác phẩm độc bản lưu niệm của riêng bạn dưới sự chỉ dạy trực tiếp của các Nghệ nhân Ưu tú.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#D3B392]/25 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D3B392]/15 border border-[#D3B392]/40 flex items-center justify-center text-[#D3B392] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-[#FFFDF7]">4.9 / 5.0</div>
              <div className="text-[11px] text-[#D3B392]">Từ 320+ học viên</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D3B392]/15 border border-[#D3B392]/40 flex items-center justify-center text-[#D3B392] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-[#FFFDF7]">Kèm 1 - 1</div>
              <div className="text-[11px] text-[#D3B392]">Nghệ nhân đứng lớp</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D3B392]/15 border border-[#D3B392]/40 flex items-center justify-center text-[#D3B392] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-[#FFFDF7]">100%</div>
              <div className="text-[11px] text-[#D3B392]">Đem tác phẩm về</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D3B392]/15 border border-[#D3B392]/40 flex items-center justify-center text-[#D3B392] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-[#FFFDF7]">Tem QR</div>
              <div className="text-[11px] text-[#D3B392]">Định danh di sản số</div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D3B392] to-[#B69A68] hover:from-[#E7C6A2] hover:to-[#C5A880] text-[#101813] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Khám phá các chương trình</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onCalendarClick}
            className="px-6 py-3.5 rounded-full bg-[#101813]/80 hover:bg-[#101813] text-[#FFFDF7] border border-[#D3B392]/60 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#D3B392]" />
            <span>Xem lịch ca học tuần này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
