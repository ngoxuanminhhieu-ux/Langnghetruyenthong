import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/heritageData';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim() === '' ? [] : PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.story.toLowerCase().includes(query.toLowerCase()) ||
    p.shellType.toLowerCase().includes(query.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#B69A68] shadow-2xl p-6 space-y-6">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8DEC8] pb-4">
          <Search className="w-5 h-5 text-[#B69A68] absolute left-2" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm tác phẩm, bút ký xà cừ, bát cẩn trứng, vòng tay, charm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 text-sm sm:text-base bg-transparent focus:outline-none text-[#17382D] placeholder-gray-400 font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors absolute right-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Categories Tags */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
            Gợi ý tìm kiếm:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('shop', c.id);
                }}
                className="px-3 py-1.5 rounded-full bg-[#F5F0E5] hover:bg-[#E8DEC8] text-[#17382D] transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <span className="text-xs text-gray-500 block">
              Kết quả ({results.length}):
            </span>

            {results.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                Không tìm thấy tác phẩm nào phù hợp với từ khóa "{query}"
              </div>
            ) : (
              results.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('product-detail', p.id);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F0E5] cursor-pointer transition-colors"
                >
                  <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-[#E8DEC8]" />
                  <div className="flex-grow">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#17382D] line-clamp-1">{p.name}</h4>
                    <span className="text-[11px] text-[#B69A68]">{p.shellType}</span>
                  </div>
                  <div className="text-xs font-bold text-[#17382D]">
                    {formatPrice(p.price)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

