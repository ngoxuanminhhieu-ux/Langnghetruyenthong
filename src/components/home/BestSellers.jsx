import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/heritageData';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Box, 
  QrCode, 
  ArrowRight,
  Eye,
  Edit3
} from 'lucide-react';

export const BestSellers = () => {
  const { 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    openAR, 
    openPassport,
    openQuickView
  } = useApp();

  // Pick top 5 authentic handcrafted products for display
  const featuredProducts = PRODUCTS.slice(0, 5);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <section className="bg-[#FFFDF7] py-16 lg:py-20 border-b border-[#F5F0E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8DEC8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#B69A68]"></span>
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-semibold">
                Tuyệt tác thủ công
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#17382D]">
              Sản phẩm bán chạy & Tinh hoa tạo tác
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs sm:text-sm font-semibold text-[#17382D] hover:text-[#B69A68] flex items-center gap-1.5 transition-colors group"
            >
              <span>Xem tất cả sản phẩm ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 5-Column Product Grid for all 5 authentic craft masterpieces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {featuredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Badges Top Left */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {product.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#17382D] text-[#FFFDF7] shadow-sm">
                      Nổi bật
                    </span>
                  )}
                  {product.isNew && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#B69A68] text-[#17382D] shadow-sm">
                      Mới
                    </span>
                  )}
                </div>

                {/* Wishlist Button Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label="Yêu thích"
                  className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isFav 
                      ? 'bg-[#D9383A] text-white shadow-md' 
                      : 'bg-white/90 text-gray-600 hover:text-[#D9383A] hover:bg-white shadow-sm'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Product Image with Hover Overlay */}
                <div 
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="relative aspect-square w-full overflow-hidden bg-[#17382D]/5 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Hover Action Bar */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="w-10 h-10 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      title="Xem nhanh"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAR(product);
                      }}
                      className="w-10 h-10 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      title="Xem WebAR 3D"
                    >
                      <Box className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPassport(product.digitalPassport.serialNumber);
                      }}
                      className="w-10 h-10 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      title="Xem Tem QR Định danh"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const el = document.getElementById('home-customizer-section');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.dispatchEvent(new CustomEvent('focus-home-customizer'));
                        } else {
                          navigateTo('product-detail', product.id);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      title="Cá nhân hóa sản phẩm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#FFFDF7]">
                  <div className="space-y-1.5">
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-[#B69A68]">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-700">({product.reviewsCount})</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => navigateTo('product-detail', product.id)}
                      className="font-serif text-base sm:text-lg font-medium text-[#17382D] hover:text-[#B69A68] transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    {/* Material note */}
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.shellType}
                    </p>

                    {/* Digital Passport QR Badge */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('passport', product.id);
                      }}
                      className="pt-1.5 flex items-center justify-between text-[11px] text-[#8B3A1E] font-medium cursor-pointer hover:underline group/qr"
                      title="Xem Hộ chiếu di sản số của tác phẩm này"
                    >
                      <span className="flex items-center gap-1">
                        <QrCode className="w-3.5 h-3.5 text-[#8B3A1E] group-hover/qr:scale-110 transition-transform" />
                        <span>Mã định danh: <strong>{product.id === 'CNH-001' ? 'SP001' : product.id}</strong></span>
                      </span>
                      <span className="text-[10px] text-gray-400 group-hover/qr:text-[#8B3A1E]">Quét xem →</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-4 mt-2 border-t border-[#F5F0E5] flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-bold text-[#17382D]">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-xl bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:shadow"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

