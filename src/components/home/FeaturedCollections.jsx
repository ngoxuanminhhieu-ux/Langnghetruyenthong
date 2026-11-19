import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/heritageData';

export const FeaturedCollections = () => {
  const { navigateTo } = useApp();

  return (
    <section className="bg-[#F5F0E5] py-10 sm:py-12 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matches reference image) */}
        <div className="flex items-center justify-between mb-6 pb-2">
          <div className="relative">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1613] font-normal tracking-tight">
              Bộ sưu tập nổi bật
            </h2>
            {/* Elegant line under 'Bộ' */}
            <div className="absolute -bottom-1.5 left-0 w-9 h-[2px] bg-[#D3B392]" />
          </div>

          <button
            onClick={() => navigateTo('shop', 'all')}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#966548] hover:text-[#1A1613] transition-colors"
          >
            <span>Xem tất cả</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* 5 Horizontal Cards Grid (Matches reference image 100%) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5 pt-2">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => navigateTo('shop', category.id)}
              className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DEC8]/60"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Bottom Label Pill */}
              <div className="px-3.5 py-2.5 sm:py-3 flex items-center justify-between bg-[#FAF7F2] group-hover:bg-[#FFFDF7] transition-colors border-t border-[#E8DEC8]/50">
                <span className="text-xs sm:text-[13px] font-medium text-[#1A1613] line-clamp-1">
                  {category.name}
                </span>
                <span className="text-[#D3B392] text-xs sm:text-sm font-semibold group-hover:translate-x-1 transition-transform ml-1 shrink-0">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
