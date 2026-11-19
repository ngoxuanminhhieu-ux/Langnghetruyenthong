import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Heart, ShoppingBag, Box, QrCode, ArrowRight } from 'lucide-react';

export const QuickViewModal = () => {
  const { isQuickViewOpen, setIsQuickViewOpen, quickViewProduct, addToCart, navigateTo, openAR, openPassport } = useApp();
  const [qty, setQty] = useState(1);
  const [customNote, setCustomNote] = useState('');

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#B69A68] shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#17382D]/5 border border-[#E8DEC8] relative">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2">
              <button
                onClick={() => {
                  setIsQuickViewOpen(false);
                  openAR(quickViewProduct);
                }}
                className="px-3 py-1.5 rounded-full bg-[#17382D]/90 text-[#FFFDF7] text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5"
              >
                <Box className="w-3.5 h-3.5 text-[#B69A68]" />
                <span>Xem WebAR</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickViewOpen(false);
                  openPassport(quickViewProduct.digitalPassport.serialNumber);
                }}
                className="px-3 py-1.5 rounded-full bg-white/90 text-[#17382D] text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5 border border-[#E8DEC8]"
              >
                <QrCode className="w-3.5 h-3.5 text-[#B69A68]" />
                <span>Tem QR</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-wider text-[#B69A68] font-bold">
              Tuyệt Tác Chuôn Ngọ
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] leading-snug">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-[#B69A68]">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-gray-700">({quickViewProduct.reviewsCount} đánh giá)</span>
            </div>

            <div className="space-y-1">
              <div className="font-serif font-bold text-2xl text-[#17382D]">
                {formatPrice(quickViewProduct.price)}
              </div>
              <div className="text-xs text-gray-500">
                Chính sách cọc 55%: <strong className="text-[#17382D]">{formatPrice(Math.round(quickViewProduct.price * 0.55))}</strong>
              </div>
            </div>

            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-light">
              {quickViewProduct.story}
            </p>

            {/* Quick Personalization Box */}
            <div className="p-3 rounded-xl bg-[#F5F0E5]/80 border border-[#B69A68]/40 space-y-1.5 text-xs">
              <label className="font-bold text-[#17382D] flex items-center justify-between">
                <span>Khắc tên cá nhân hóa (Miễn phí):</span>
                <span className="text-[10px] text-[#B69A68] font-normal">Tùy chọn</span>
              </label>
              <input
                type="text"
                placeholder="VD: Khắc tên 'Minh Anh' lên sản phẩm"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                maxLength={40}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#17382D]"
              />
            </div>

            <div className="pt-2 border-t border-[#E8DEC8] flex items-center gap-3">
              <div className="flex items-center border border-[#E8DEC8] rounded-xl bg-white p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#17382D]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, qty, customNote.trim() ? { note: `Khắc tên: ${customNote.trim()}` } : null);
                  setIsQuickViewOpen(false);
                }}
                className="flex-grow py-3 rounded-xl bg-[#17382D] text-[#FFFDF7] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#294638]"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C29D]" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={() => {
                  setIsQuickViewOpen(false);
                  const el = document.getElementById('home-customizer-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    window.dispatchEvent(new CustomEvent('focus-home-customizer'));
                  } else {
                    navigateTo('experience', 'crafting');
                  }
                }}
                className="text-xs font-semibold text-[#B69A68] hover:underline"
              >
                Mở Studio Cá Nhân Hóa 3D →
              </button>

              <button
                onClick={() => {
                  setIsQuickViewOpen(false);
                  navigateTo('product-detail', quickViewProduct.id);
                }}
                className="text-xs text-gray-500 hover:text-[#17382D]"
              >
                Chi tiết →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

