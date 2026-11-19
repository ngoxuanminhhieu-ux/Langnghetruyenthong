import React from 'react';
import { 
  Award, 
  Sparkles, 
  Play, 
  Calendar, 
  ArrowRight, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';
import { useApp } from '../../context/AppContext';

export const WorkshopArtisansView = ({ onSelectArtisan, onBookWorkshop }) => {
  const { artisans, workshops } = useWorkshop();
  const { setIsVideoModalOpen } = useApp();

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className="w-6 h-[2px] bg-[#B69A68]"></span>
          <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
            Bậc Thầy Thủ Công & Truyền Nhân Di Sản
          </span>
          <span className="w-6 h-[2px] bg-[#B69A68]"></span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#17382D]">
          Đội Ngũ Nghệ Nhân Giảng Dạy
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
          Mỗi nghệ nhân đứng lớp tại Chuôn Ngọ Heritage đều là người con máu thịt của làng nghề, mang trong mình hàng thập kỷ tôi luyện đôi mắt thẩm âm xà cừ và đôi bàn tay cưa lọng điêu luyện.
        </p>
      </div>

      {/* Artisans Full Cards */}
      <div className="space-y-8">
        {artisans.map((artisan) => {
          // Find workshops led by this artisan
          const ledWorkshops = workshops.filter(w => w.artisanId === artisan.id);

          return (
            <div
              key={artisan.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Photo & Video Trigger (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#D3B392]/50 shadow-lg bg-black group">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-[#D3B392] border border-white/10">
                    {artisan.experience}
                  </div>

                  {/* Video Play Overlay */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute bottom-4 left-4 right-4 bg-[#101813]/90 hover:bg-[#101813] text-[#FFFDF7] p-2.5 rounded-2xl backdrop-blur-md border border-[#D3B392]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-xl"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D3B392] text-[#101813] flex items-center justify-center">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Xem phóng sự nghề nghiệp</span>
                  </button>
                </div>
              </div>

              {/* Bio & Details (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#B69A68] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
                    <span>{artisan.role}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#17382D] font-bold">
                    {artisan.name}
                  </h3>
                </div>

                {/* Quote */}
                <div className="p-4 rounded-2xl bg-[#F5F0E5] border border-[#E8DEC8] text-xs text-[#2B1E16] italic border-l-4 border-l-[#B69A68]">
                  "{artisan.quote}"
                </div>

                {/* Biography */}
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  {artisan.bio}
                </p>

                {/* Awards / Achievements */}
                {artisan.awards && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                      Danh hiệu & Thành tựu tiêu biểu:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {artisan.awards.map((award, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#17382D]/10 text-[#17382D] text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5 text-[#B69A68]" />
                          <span>{award}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workshops led by this artisan */}
                {ledWorkshops.length > 0 && (
                  <div className="pt-4 border-t border-[#E8DEC8]">
                    <span className="text-xs font-bold text-[#17382D] block mb-2">
                      Các chương trình Workshop đang trực tiếp đứng lớp:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ledWorkshops.map(ws => (
                        <div
                          key={ws.id}
                          className="p-3 rounded-xl bg-[#FFFDF7] border border-[#E8DEC8] hover:border-[#B69A68] flex items-center justify-between text-xs transition-colors"
                        >
                          <div className="space-y-0.5 pr-2">
                            <div className="font-serif font-bold text-[#17382D] line-clamp-1">{ws.title}</div>
                            <div className="text-[11px] text-gray-500">{ws.duration} • {ws.categoryLabel}</div>
                          </div>
                          <button
                            onClick={() => onBookWorkshop(ws)}
                            className="px-3 py-1.5 rounded-lg bg-[#17382D] text-[#FFFDF7] hover:bg-[#B69A68] text-[11px] font-bold shrink-0 transition-colors"
                          >
                            Đăng ký
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
