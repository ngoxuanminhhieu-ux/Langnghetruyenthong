import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOPS } from '../../data/heritageData';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WorkshopPreview = () => {
  const { navigateTo, openWorkshop } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <section className="bg-[#FFFDF7] py-16 lg:py-20 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8DEC8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#B69A68]"></span>
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
                Gắn kết di sản
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17382D]">
              Trải nghiệm tinh hoa làng nghề
            </h2>
          </div>

          <button
            onClick={() => navigateTo('workshop')}
            className="mt-4 md:mt-0 text-xs sm:text-sm font-semibold text-[#17382D] hover:text-[#B69A68] flex items-center gap-1.5 transition-colors group"
          >
            <span>Xem tất cả lịch workshop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17382D]/10">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#17382D]/90 text-[#FFFDF7] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-[#B69A68]/30">
                    {formatPrice(ws.price)} / người
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#B69A68] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{ws.type}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#17382D] group-hover:text-[#B69A68] transition-colors leading-snug">
                    {ws.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {ws.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-gray-500 border-t border-[#F5F0E5]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#B69A68] shrink-0" />
                      <span>{ws.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#B69A68] shrink-0" />
                      <span>Hướng dẫn: {ws.artisan}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => openWorkshop(ws)}
                  className="w-full py-2.5 rounded-xl bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow"
                >
                  <span>Đặt lịch trải nghiệm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 4 Quick Activity Pillars */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => navigateTo('experience', 'tour')}
            className="p-4 rounded-xl bg-[#F5F0E5]/60 hover:bg-[#F5F0E5] border border-[#E8DEC8] cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="text-xs font-bold text-[#17382D] mb-1">1. Tham quan làng nghề</div>
            <div className="text-[11px] text-gray-600">Đình thờ tổ nghề & xưởng mộc cổ Chuyên Mỹ</div>
          </div>
          <div 
            onClick={() => navigateTo('experience', 'game')}
            className="p-4 rounded-xl bg-[#F5F0E5]/60 hover:bg-[#F5F0E5] border border-[#E8DEC8] cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="text-xs font-bold text-[#17382D] mb-1">2. Trải nghiệm chế tác</div>
            <div className="text-[11px] text-gray-600">Cưa lọng vỏ ốc & đục chạm gỗ trắc</div>
          </div>
          <div 
            onClick={() => navigateTo('workshop')}
            className="p-4 rounded-xl bg-[#F5F0E5]/60 hover:bg-[#F5F0E5] border border-[#E8DEC8] cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="text-xs font-bold text-[#17382D] mb-1">3. Học làm thủ công</div>
            <div className="text-[11px] text-gray-600">Tự làm bút ký khảm trai &amp; vòng tay xà cừ</div>
          </div>
          <div 
            onClick={() => navigateTo('heritage')}
            className="p-4 rounded-xl bg-[#F5F0E5]/60 hover:bg-[#F5F0E5] border border-[#E8DEC8] cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="text-xs font-bold text-[#17382D] mb-1">4. Gặp gỡ nghệ nhân</div>
            <div className="text-[11px] text-gray-600">Lắng nghe chuyện đời, chuyện nghề nghìn năm</div>
          </div>
        </div>

      </div>
    </section>
  );
};

