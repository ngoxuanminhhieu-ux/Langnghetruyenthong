import React from 'react';
import { useApp } from '../context/AppContext';
import { HERITAGE_TIMELINE, ARTISANS } from '../data/heritageData';
import { Play, Sparkles, Award, MapPin, Compass, Shield, ArrowRight } from 'lucide-react';

export const HeritagePage = () => {
  const { setIsVideoModalOpen, navigateTo } = useApp();

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      
      {/* Hero Banner for Heritage Story */}
      <section className="bg-[#17382D] text-[#FFFDF7] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[#294638]/40 via-[#17382D] to-[#0E231C]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B69A68]/40 bg-[#294638]/60 text-[#D8C29D] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
            Nghìn Năm Hương Sắc Chuôn Ngọ
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFFDF7] leading-tight">
            Hành trình thiên niên kỷ <br />
            <span className="font-cormorant italic text-[#D8C29D]">Khảm trai xà cừ xứ Đoài</span>
          </h1>

          <p className="text-[#F5F0E5]/80 text-sm sm:text-base font-light leading-relaxed">
            Khám phá lịch sử hình thành từ thời Lý, những bàn tay vàng cung đình Huế và bước chuyển mình di sản số trong kỷ nguyên hiện đại của làng nghề Chuôn Ngọ (Chuyên Mỹ, Phú Xuyên, Hà Nội).
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#B69A68] hover:bg-[#D4BA88] text-[#17382D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Xem phim tài liệu lịch sử</span>
            </button>
            <button
              onClick={() => navigateTo('experience', 'tour')}
              className="px-6 py-3 rounded-full border border-[#F5F0E5]/40 hover:border-[#FFFDF7] text-[#FFFDF7] text-xs sm:text-sm font-medium transition-all"
            >
              Tour thực tế ảo 360° làng nghề
            </button>
          </div>
        </div>
      </section>

      {/* Origin Story & Saint Ancestor Section */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#B69A68]"></span>
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
                Thánh Tổ Nghề Khảm Trai
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
              Tướng quân Trương Công Thành – Người ươm mầm di sản từ triều Lý
            </h2>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
              Theo ngọc phả đình làng Chuôn Ngọ, vào thế kỷ XI dưới triều vua Lý Nhân Tông, Tướng quân Trương Công Thành sau khi cùng quan quân đánh dẹp giặc ngoại xâm gìn giữ bờ cõi đã ngao du sơn thủy. Ông quan sát thấy những mảnh vỏ trai, vỏ ốc trôi dạt ven sông ven biển có ánh xà cừ ngũ sắc lấp lánh lạ thường.
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
              Bằng trí tuệ mẫn tiệp, ông đã mày mò dùng cưa, đục, giũa ghép thử những mảnh vỏ ốc vào gỗ mít, gỗ trắc để tạo nên những bức hoành phi, câu đối lộng lẫy. Sau đó, ông trở về Chuôn Ngọ truyền dạy toàn bộ bí quyết nghề cho dân làng. Từ đó đến nay, người dân Chuôn Ngọ đời đời thờ phụng ông là Thành hoàng làng và Thánh tổ nghề khảm trai.
            </p>

            <div className="p-4 rounded-xl bg-[#F5F0E5]/60 border border-[#E8DEC8] flex items-center gap-4">
              <MapPin className="w-8 h-8 text-[#B69A68] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#17382D] block">Đình làng Chuôn Ngọ – Di tích Lịch sử cấp Quốc gia</span>
                <span className="text-gray-600">Nơi lưu giữ sắc phong của các triều đại phong kiến và tổ chức Lễ hội Giỗ tổ ngày 9 tháng Giêng âm lịch hằng năm.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-2xl relative aspect-[4/3]">
              <img
                src="/images/dinh_chuon_ngo.jpg"
                alt="Đình thờ Thánh tổ nghề khảm trai Chuôn Ngọ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#FFFDF7] text-xs">
                <span>Đình Chuôn Ngọ – Nơi thờ Thánh tổ nghề Trương Công Thành (Di tích Lịch sử Quốc gia)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#17382D] text-[#FFFDF7] py-16 lg:py-20 border-y border-[#294638]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
              Biên niên sử
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFDF7]">
              Các cột mốc vàng son trong lịch sử làng nghề
            </h2>
          </div>

          <div className="relative border-l-2 border-[#B69A68]/40 ml-4 sm:ml-32 space-y-12">
            {HERITAGE_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10 group">
                {/* Milestone dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B69A68] border-4 border-[#17382D] group-hover:scale-125 transition-transform" />

                {/* Desktop year display on the left */}
                <div className="sm:absolute sm:-left-36 top-1 text-xs font-mono font-bold text-[#D8C29D] mb-1 sm:mb-0">
                  {item.year}
                </div>

                <div className="space-y-1.5 bg-[#294638]/60 p-5 rounded-2xl border border-[#B69A68]/30 backdrop-blur-sm">
                  <h3 className="font-serif text-lg font-bold text-[#FFFDF7]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Raw Materials Science & Nature */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
            Báu vật thiên nhiên
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
            Các chất liệu quý cấu thành tác phẩm Chuôn Ngọ
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Sự kết hợp hoàn hảo giữa vỏ ốc biển sâu hàng chục năm tuổi và các dòng gỗ quý bản địa Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] space-y-3 shadow-sm hover:border-[#B69A68] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#17382D] text-[#D8C29D] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-[#17382D]">Ốc xà cừ đỏ Singapore</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Loại ốc biển sâu quý hiếm nhất với sắc đỏ ánh lửa, khi gặp ánh sáng phản chiếu ánh tím và vàng hoàng kim. Chuyên dùng khảm long phụng, hoa sen cung đình.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] space-y-3 shadow-sm hover:border-[#B69A68] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#17382D] text-[#D8C29D] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-[#17382D]">Trai ngọc & Vỏ điệp biển</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Trai ngọc môi vàng Phú Quốc và vỏ điệp Nha Trang mang ánh trắng ngọc ngà, lấp lánh như dát bạc. Phù hợp tuyệt đối cho các mẫu thiết kế lifestyle hiện đại Gen Z.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] space-y-3 shadow-sm hover:border-[#B69A68] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#17382D] text-[#D8C29D] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-[#17382D]">Gỗ Trắc, Gỗ Mun & Sơn Ta</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gỗ trắc đỏ đen, mun hoa sấy đạt chuẩn độ ẩm 10% kết hợp sơn ta Phú Thọ tự nhiên có độ bám dính vĩnh cửu qua hàng trăm năm mà không hề bong tróc.
            </p>
          </div>
        </div>

        {/* CTA Shop */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Chiêm ngưỡng các tác phẩm tại Cửa hàng di sản</span>
            <ArrowRight className="w-4 h-4 text-[#D8C29D]" />
          </button>
        </div>
      </section>

    </div>
  );
};
