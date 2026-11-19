import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const HeritageStoryPreview = () => {
  const { navigateTo, setIsVideoModalOpen } = useApp();

  return (
    <section className="bg-[#17382D] text-[#FFFDF7] py-16 lg:py-20 relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#294638]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B69A68]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Rich Storytelling Images Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#B69A68]/40 aspect-[4/3]">
              <img
                src="/images/dinh_chuon_ngo.jpg"
                alt="Đình làng Chuôn Ngọ - Di tích Lịch sử cấp Quốc gia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#B69A68] text-xs font-semibold tracking-wider uppercase block mb-1">
                  Đình Thờ Thánh Tổ Nghề
                </span>
                <h4 className="text-lg font-serif text-[#FFFDF7] font-medium">
                  Trương Công Thành – Khởi nguồn tinh hoa từ triều Lý (Thế kỷ XI)
                </h4>
              </div>
            </div>

            {/* Overlapping small badge card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#294638] border border-[#B69A68] rounded-xl p-4 shadow-2xl max-w-xs z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#B69A68]/20 border border-[#B69A68] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-[#D8C29D]" />
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-[#FFFDF7]">1000+ Năm</div>
                  <div className="text-xs text-[#F5F0E5]/80">Gìn giữ & kế thừa liên tục qua các thế hệ nghệ nhân</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#B69A68]" />
                Di sản ngàn năm
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFDF7] leading-tight">
                Hành trình gìn giữ <br />
                <span className="font-cormorant italic text-[#D8C29D]">tinh hoa di sản Chuôn Ngọ</span>
              </h2>
            </div>

            <p className="text-[#F5F0E5]/85 text-base sm:text-lg leading-relaxed font-light">
              Nằm bên dòng sông Nhuệ trù phú, làng Chuôn Ngọ (Chuyên Mỹ, Phú Xuyên, Hà Nội) từ lâu đã nức tiếng là cái nôi chạm khảm xà cừ đỉnh cao nhất của Việt Nam. Từng vỏ ốc biển sâu trải qua hàng chục công đoạn cưa, đục, giũa, mài công phu dưới bàn tay tài hoa của nghệ nhân để trở thành những tác phẩm mỹ nghệ bất hủ.
            </p>

            {/* Key Value Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFDF7]">Chất liệu quý tự nhiên tuyển chọn</h4>
                  <p className="text-xs text-[#F5F0E5]/75">Ốc xà cừ đỏ Singapore ngũ sắc, trai ngọc môi vàng, vỏ điệp biển và gỗ trắc, gỗ mun lâu năm không cong vênh.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFDF7]">Kỹ thuật cưa lọng sợi tóc độc bản</h4>
                  <p className="text-xs text-[#F5F0E5]/75">Đường nét ghép nối khít khao đến mức mắt thường không thể nhìn thấy khe hở, mài phẳng nhẵn bóng bằng lá chuối khô cổ truyền.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFDF7]">Định danh di sản số & Bảo trợ nghệ nhân</h4>
                  <p className="text-xs text-[#F5F0E5]/75">Mỗi sản phẩm gắn tem QR Passport xác thực nguồn gốc và áp dụng chính sách đặt cọc linh hoạt 55% hỗ trợ chi phí trực tiếp cho nghệ nhân.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('heritage')}
                className="px-7 py-3 rounded-full bg-[#B69A68] hover:bg-[#D4BA88] text-[#17382D] font-bold text-sm shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Khám phá di sản</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-6 py-3 rounded-full border border-[#F5F0E5]/40 hover:border-[#FFFDF7] text-[#FFFDF7] font-medium text-sm transition-all"
              >
                Xem phim tài liệu làng nghề
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

