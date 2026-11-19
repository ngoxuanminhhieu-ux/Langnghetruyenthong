import React from 'react';
import { X, Award, Sparkles, Play, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';
import { useApp } from '../../context/AppContext';

export const ArtisanDetailModal = () => {
  const { selectedArtisan, isArtisanModalOpen, closeArtisanProfile, workshops, openBooking } = useWorkshop();
  const { setIsVideoModalOpen } = useApp();

  if (!isArtisanModalOpen || !selectedArtisan) return null;

  const ledWorkshops = workshops.filter(w => w.artisanId === selectedArtisan.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#D3B392] shadow-2xl my-6 flex flex-col text-[#2B1E16]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#17382D] to-[#2B1E16] text-[#FFFDF7] p-5 sm:p-6 border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D3B392]">Hồ Sơ Nghệ Nhân Chuôn Ngọ</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">{selectedArtisan.name}</h3>
            </div>
          </div>

          <button
            onClick={closeArtisanProfile}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#101813] text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Image Col (5 cols) */}
            <div className="sm:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D3B392]/50 shadow-md bg-black">
              <img
                src={selectedArtisan.image}
                alt={selectedArtisan.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-center text-[#D3B392] font-mono border border-white/10">
                {selectedArtisan.experience}
              </span>
            </div>

            {/* Intro Col (7 cols) */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B69A68]">
                  {selectedArtisan.role}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#17382D]">
                  {selectedArtisan.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Chuyên môn: {selectedArtisan.specialty}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#E8DEC8] text-xs text-[#2B1E16] italic border-l-4 border-l-[#B69A68]">
                "{selectedArtisan.quote}"
              </div>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 text-[#D3B392] fill-current" />
                <span>Xem video phỏng vấn nghệ nhân (3:45)</span>
              </button>
            </div>
          </div>

          {/* Full Bio */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <h5 className="font-serif font-bold text-sm text-[#17382D]">Tiểu sử & Sự nghiệp di sản</h5>
            <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
              {selectedArtisan.bio}
            </p>
          </div>

          {/* Awards */}
          {selectedArtisan.awards && (
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-sm text-[#17382D]">Danh hiệu & Khen thưởng</h5>
              <div className="flex flex-wrap gap-2">
                {selectedArtisan.awards.map((a, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#17382D]/10 text-[#17382D] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-[#B69A68]" />
                    <span>{a}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Workshops currently instructed */}
          {ledWorkshops.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
              <h5 className="font-serif font-bold text-sm text-[#17382D]">
                Các lớp Workshop do nghệ nhân trực tiếp giảng dạy ({ledWorkshops.length}):
              </h5>
              <div className="space-y-2">
                {ledWorkshops.map(ws => (
                  <div
                    key={ws.id}
                    className="p-3.5 rounded-2xl bg-[#F5F0E5]/60 border border-[#E8DEC8] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#17382D]">{ws.title}</div>
                      <div className="text-[11px] text-gray-600 mt-0.5">{ws.duration} • {ws.categoryLabel}</div>
                    </div>
                    <button
                      onClick={() => {
                        closeArtisanProfile();
                        openBooking(ws);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#17382D] hover:bg-[#B69A68] text-[#FFFDF7] font-bold text-xs transition-colors shadow-sm shrink-0"
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
