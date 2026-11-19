import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Heart,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, openPassport } = useApp();

  return (
    <footer className="bg-[#0E231C] text-[#FFFDF7] border-t border-[#294638] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#294638]">
          
          {/* Col 1: Brand & Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFFDF7] to-[#F5F0E5] p-1.5 flex items-center justify-center border border-[#B69A68]">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <path d="M50 15 C50 15, 38 40, 38 60 C38 72, 44 80, 50 80 C56 80, 62 72, 62 60 C62 40, 50 15, 50 15 Z" fill="#17382D" />
                  <path d="M50 30 C42 42, 22 55, 24 72 C25 80, 34 82, 42 80 C48 78, 50 74, 50 72" fill="#B69A68" />
                  <path d="M50 30 C58 42, 78 55, 76 72 C75 80, 66 82, 58 80 C52 78, 50 74, 50 72" fill="#B69A68" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide text-[#FFFDF7] block">
                  Tân Khảm
                </span>
                <span className="text-[10px] tracking-[0.14em] text-[#D8C29D] uppercase block mt-0.5">
                  Tân sắc diện - Khảm tinh hoa
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F5F0E5]/80 leading-relaxed font-light">
              Nền tảng thương mại di sản số kết hợp công nghệ WebAR và tem định danh sản phẩm. Kết nối di sản làng nghề Chuôn Ngọ nghìn năm tuổi với phong cách sống đương đại của thế hệ trẻ.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#D8C29D]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17382D] border border-[#B69A68]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B69A68]" />
                Dự án Khởi nghiệp SV Start-up 2026
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#B69A68]">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E5]/80">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#FFFDF7] transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#FFFDF7] transition-colors">
                  Tất cả sản phẩm
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'phu-kien-ca-nhan')} className="hover:text-[#FFFDF7] transition-colors">
                  BST Gen Z Lifestyle
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('heritage')} className="hover:text-[#FFFDF7] transition-colors">
                  Câu chuyện di sản
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workshop')} className="hover:text-[#FFFDF7] transition-colors">
                  Lịch workshop làng nghề
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-[#B69A68] hover:underline transition-colors">
                  Cổng Quản trị Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Heritage Tech & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#B69A68]">
              Chính Sách & Di Sản Số
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E5]/80">
              <li>
                <button 
                  onClick={() => openPassport()} 
                  className="flex items-center gap-1.5 hover:text-[#FFFDF7] transition-colors text-left"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#B69A68] shrink-0" />
                  <span>Tra cứu Tem QR Passport</span>
                </button>
              </li>
              <li>
                <span className="block text-gray-300 font-medium">Chính sách đặt cọc 55% bảo trợ nghệ nhân</span>
                <span className="text-[11px] text-[#F5F0E5]/60">Tài trợ 100% nguyên liệu cho nghệ nhân sản xuất</span>
              </li>
              <li>
                <span className="hover:text-[#FFFDF7] cursor-pointer">Chính sách kiểm tra hàng trước khi nhận</span>
              </li>
              <li>
                <span className="hover:text-[#FFFDF7] cursor-pointer">Bảo hành gắn kết xà cừ trọn đời</span>
              </li>
              <li>
                <span className="hover:text-[#FFFDF7] cursor-pointer">Chính sách bảo mật thông tin</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Village Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#B69A68]">
              Địa Chỉ & Liên Hệ
            </h4>
            <div className="space-y-2.5 text-xs text-[#F5F0E5]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B69A68] shrink-0 mt-0.5" />
                <span>Thôn Chuôn Ngọ, Xã Chuyên Mỹ, Huyện Phú Xuyên, TP. Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span className="font-mono">0988 123 456 / 024 3385 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>lienhe@chuonngoheritage.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>Mở cửa tham quan: 08:00 - 17:30 hằng ngày</span>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <a href="#facebook" className="px-3 py-1 rounded bg-[#17382D] hover:bg-[#294638] text-[#F5F0E5] transition-colors">
                Facebook
              </a>
              <a href="#instagram" className="px-3 py-1 rounded bg-[#17382D] hover:bg-[#294638] text-[#F5F0E5] transition-colors">
                Instagram
              </a>
              <a href="#tiktok" className="px-3 py-1 rounded bg-[#17382D] hover:bg-[#294638] text-[#F5F0E5] transition-colors">
                TikTok
              </a>
              <a href="#youtube" className="px-3 py-1 rounded bg-[#17382D] hover:bg-[#294638] text-[#F5F0E5] transition-colors">
                YouTube
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E5]/60 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Tân Khảm – Tân sắc diện - Khảm tinh hoa. Bản quyền thuộc về Nhóm Khởi nghiệp Sinh viên.</span>
          </div>
          <div className="flex items-center gap-1 text-[#D8C29D]">
            <span>Gìn giữ bởi tình yêu di sản truyền thống</span>
            <Heart className="w-3.5 h-3.5 text-[#D9383A] fill-current" />
            <span>Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

