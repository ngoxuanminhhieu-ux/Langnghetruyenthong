import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ARTISANS, CRAFTING_STEPS } from '../../data/heritageData';
import { 
  Award, 
  Play, 
  Sparkles, 
  ChevronRight, 
  CheckCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ArtisansAndProcess = () => {
  const { setIsVideoModalOpen, navigateTo } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-[#F5F0E5]/50 py-16 lg:py-20 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#B69A68]"></span>
            <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
              Kế Thừa & Khởi Sắc
            </span>
            <span className="w-6 h-[2px] bg-[#B69A68]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
            Bàn tay nghệ nhân – Tinh hoa tạo tác
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-light">
            Gặp gỡ những bàn tay vàng làng Chuôn Ngọ đã dành trọn cả cuộc đời để gìn giữ, phát triển và số hóa nghệ thuật chạm khảm xà cừ nghìn năm.
          </p>
        </div>

        {/* Artisans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Artisan Portrait */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#17382D]/10">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/90 via-[#0E231C]/20 to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute top-3 left-3 bg-[#B69A68] text-[#17382D] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{artisan.experience}</span>
                </div>

                {/* Artisan Name Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-[#FFFDF7]">
                    {artisan.name}
                  </h3>
                  <p className="text-xs text-[#D8C29D]">
                    {artisan.role}
                  </p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed italic border-l-2 border-[#B69A68] pl-3">
                    "{artisan.quote}"
                  </p>

                  <div className="text-xs text-gray-500 pt-2 border-t border-[#F5F0E5]">
                    <span className="font-semibold text-[#17382D] block mb-1">Thế mạnh chế tác:</span>
                    <span className="text-gray-700">{artisan.specialty}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#B69A68] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {artisan.worksCount}+ Tác phẩm
                  </span>

                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="text-xs font-semibold text-[#17382D] hover:text-[#B69A68] flex items-center gap-1 transition-colors"
                  >
                    <span>Xem câu chuyện</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6 Crafting Steps Interactive Presentation */}
        <div className="bg-[#17382D] rounded-3xl p-6 sm:p-10 text-[#FFFDF7] border border-[#294638] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B69A68]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#294638] gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold block mb-1">
                Kỹ nghệ truyền thống
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF7]">
                5 Bước chế tác khảm trai Chuôn Ngọ
              </h3>
            </div>
            
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B69A68] hover:bg-[#D4BA88] text-[#17382D] font-bold text-xs transition-colors self-start md:self-auto"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Xem video quy trình chế tác</span>
            </button>
          </div>

          {/* Steps Timeline Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {CRAFTING_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  activeStep === idx 
                    ? 'bg-[#294638] border-[#B69A68] shadow-lg scale-102' 
                    : 'bg-[#17382D]/80 border-[#294638] hover:border-[#F5F0E5]/30 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="font-mono text-xs font-bold text-[#D8C29D] mb-1">
                  BƯỚC {step.step}
                </div>
                <div className="text-xs font-semibold text-[#FFFDF7] line-clamp-1">
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Showcase */}
          <div className="bg-[#294638]/60 border border-[#B69A68]/30 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-sm">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17382D] border border-[#B69A68]/40 text-[#D8C29D] text-xs font-mono">
                <span>Công đoạn số {CRAFTING_STEPS[activeStep].step} / 05</span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl text-[#FFFDF7]">
                {CRAFTING_STEPS[activeStep].title}
              </h4>

              <p className="text-[#F5F0E5]/85 text-sm sm:text-base leading-relaxed font-light">
                {CRAFTING_STEPS[activeStep].desc}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#D8C29D]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#B69A68]" />
                  Đòi hỏi độ chính xác sai số dưới 0.1mm
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#B69A68]" />
                  100% Thao tác tay thủ công
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#B69A68]/50 shadow-xl relative group">
                <img
                  src={CRAFTING_STEPS[activeStep].image}
                  alt={CRAFTING_STEPS[activeStep].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

