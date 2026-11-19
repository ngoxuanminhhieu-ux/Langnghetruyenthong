import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/heritageData';
import { X, QrCode, ShieldCheck, CheckCircle2, Award, Download, Search, Sparkles } from 'lucide-react';

export const DigitalPassportModal = () => {
  const { isPassportModalOpen, setIsPassportModalOpen, activePassportCode, showToast } = useApp();
  const [searchInput, setSearchInput] = useState(activePassportCode || 'CNH-2026-XACU-00189');

  if (!isPassportModalOpen) return null;

  // Find matching product or fallback
  const matchedProduct = PRODUCTS.find(p => p.digitalPassport?.serialNumber === searchInput) || PRODUCTS[0];
  const passport = matchedProduct.digitalPassport;

  const handleDownloadCertificate = () => {
    showToast('Đã lưu chứng thư định danh số Chuôn Ngọ vào máy của bạn');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl overflow-hidden border-2 border-[#B69A68] shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 px-6 bg-[#17382D] text-[#FFFDF7] flex items-center justify-between border-b border-[#B69A68]/40 shrink-0">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#B69A68]" />
            <div>
              <span className="font-serif text-sm font-bold block text-[#FFFDF7]">
                Tem Định Danh Di Sản Số – Chuôn Ngọ Heritage
              </span>
              <span className="text-[10px] text-[#D8C29D] font-mono block">
                Digital Product Passport & Cryptographic Seal
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPassportModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#294638] text-[#FFFDF7] hover:bg-[#3d6b53] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body with Scroll */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Serial lookup input */}
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tra cứu số Serial khác (VD: CNH-2026-XACU-00189)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E8DEC8] rounded-xl font-mono focus:outline-none focus:border-[#17382D]"
              />
            </div>
          </div>

          {/* Authentic Certificate Card */}
          <div className="rounded-2xl border-2 border-[#B69A68] bg-gradient-to-b from-[#FFFDF7] to-[#F5F0E5] p-6 sm:p-8 shadow-inner relative space-y-6">
            
            {/* Top Seal & Heading */}
            <div className="text-center space-y-1">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#17382D] text-[#D8C29D] flex items-center justify-center border-2 border-[#B69A68] shadow-md mb-2">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#B69A68] uppercase block">
                CHỨNG NHẬN ĐỘC BẢN DI SẢN LÀNG NGHỀ
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#17382D]">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-gray-600 font-serif italic">
                Tác phẩm chế tác thủ công độc bản tại Làng Chuôn Ngọ, Chuyên Mỹ, Phú Xuyên, Hà Nội
              </p>
            </div>

            {/* Serial & QR Code Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-white border border-[#E8DEC8]">
              <div className="space-y-1.5 text-xs text-left">
                <span className="text-gray-400 text-[10px] font-mono block">MÃ SỐ ĐỊNH DANH (SERIAL NO.):</span>
                <span className="text-sm font-mono font-bold text-[#17382D] block bg-[#F5F0E5] px-2.5 py-1 rounded border border-[#E8DEC8]">
                  {passport.serialNumber}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Xác thực chính gốc làng Chuôn Ngọ
                </span>
              </div>

              {/* QR Code Graphic */}
              <div className="w-24 h-24 p-2 bg-[#FFFDF7] rounded-xl border border-[#B69A68] flex items-center justify-center shrink-0 shadow-sm">
                <QrCode className="w-full h-full text-[#17382D]" />
              </div>
            </div>

            {/* Passport Specifications Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-white/70 border border-[#E8DEC8]">
                <span className="text-gray-500 text-[10px] block">Nghệ nhân thực hiện:</span>
                <span className="font-bold text-[#17382D] text-sm block mt-0.5">{matchedProduct.artisan}</span>
                <span className="text-[10px] text-[#B69A68]">{matchedProduct.artisanExperience}</span>
              </div>

              <div className="p-3 rounded-lg bg-white/70 border border-[#E8DEC8]">
                <span className="text-gray-500 text-[10px] block">Xuất xứ vỏ ốc xà cừ:</span>
                <span className="font-bold text-[#17382D] text-xs block mt-0.5">{passport.provenanceShell}</span>
              </div>

              <div className="p-3 rounded-lg bg-white/70 border border-[#E8DEC8]">
                <span className="text-gray-500 text-[10px] block">Chất liệu gỗ tuyển chọn:</span>
                <span className="font-bold text-[#17382D] text-xs block mt-0.5">{matchedProduct.woodType}</span>
              </div>

              <div className="p-3 rounded-lg bg-white/70 border border-[#E8DEC8]">
                <span className="text-gray-500 text-[10px] block">Lớp phủ truyền thống:</span>
                <span className="font-bold text-[#17382D] text-xs block mt-0.5">{passport.lacquerType}</span>
              </div>
            </div>

            {/* Signatures & Seals */}
            <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 text-[10px] block">Ngày kiểm định:</span>
                <span className="font-mono text-gray-700 font-bold">{passport.inspectionDate}</span>
              </div>

              <div className="text-right">
                <span className="text-gray-400 text-[10px] block">Tổ chức chứng nhận:</span>
                <span className="font-serif font-bold text-[#17382D]">{passport.certifiedBy}</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">
              * Mã QR Passport tích hợp vĩnh viễn trên sản phẩm vật lý.
            </span>

            <button
              onClick={handleDownloadCertificate}
              className="px-5 py-2.5 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#D8C29D]" />
              <span>Tải chứng thư số (PDF)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

