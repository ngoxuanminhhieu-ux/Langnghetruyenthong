import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/heritageData';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  Star, 
  Heart, 
  ShoppingBag, 
  Box, 
  QrCode, 
  Eye, 
  Check,
  RotateCcw
} from 'lucide-react';

export const ShopPage = () => {
  const { 
    selectedCategoryId, 
    setSelectedCategoryId, 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    openAR,
    openPassport,
    openQuickView
  } = useApp();

  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all'); // all, under-1m, 1m-2m, above-2m
  const [shellFilter, setShellFilter] = useState('all'); // all, singapore, ngoc-trai, cuu-khong
  const [sortBy, setSortBy] = useState('featured'); // featured, price-asc, price-desc, rating

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategoryId !== 'all' && product.category !== selectedCategoryId) {
        return false;
      }
      // Search
      if (search && !product.name.toLowerCase().includes(search.toLowerCase()) && !product.story.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // Price range
      if (priceRange === 'under-1m' && product.price >= 1000000) return false;
      if (priceRange === '1m-2m' && (product.price < 1000000 || product.price > 2000000)) return false;
      if (priceRange === 'above-2m' && product.price <= 2000000) return false;
      // Shell filter
      if (shellFilter !== 'all') {
        if (shellFilter === 'singapore' && !product.shellType.toLowerCase().includes('singapore')) return false;
        if (shellFilter === 'ngoc-trai' && !product.shellType.toLowerCase().includes('trai')) return false;
        if (shellFilter === 'cuu-khong' && !product.shellType.toLowerCase().includes('cửu khổng')) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategoryId, search, priceRange, shellFilter, sortBy]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const resetFilters = () => {
    setSelectedCategoryId('all');
    setSearch('');
    setPriceRange('all');
    setShellFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-[#17382D]">Trang chủ</button>
            <span>/</span>
            <span className="text-[#17382D] font-semibold">Cửa hàng di sản</span>
            {selectedCategoryId !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#B69A68]">{CATEGORIES.find(c => c.id === selectedCategoryId)?.name}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
                Tuyển tập tinh hoa khảm trai Chuôn Ngọ
              </h1>
              <p className="text-gray-600 text-sm mt-1 max-w-2xl font-light">
                Mỗi tác phẩm là độc bản chế tác thủ công từ bàn tay nghệ nhân ưu tú, định danh số bằng mã QR và tích hợp công nghệ trải nghiệm WebAR.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tác phẩm, chất liệu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E8DEC8] focus:border-[#17382D] rounded-full focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter & Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#F5F0E5]/50 border border-[#E8DEC8] rounded-2xl p-5 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
                <span className="font-serif font-bold text-[#17382D] flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4 text-[#B69A68]" />
                  Bộ lọc sản phẩm
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#B69A68] hover:text-[#17382D] flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  Đặt lại
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17382D] block">
                  Danh mục chế tác
                </span>
                <div className="space-y-1 text-sm">
                  <button
                    onClick={() => setSelectedCategoryId('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategoryId === 'all' 
                        ? 'bg-[#17382D] text-[#FFFDF7]' 
                        : 'text-gray-700 hover:bg-[#E8DEC8]/50'
                    }`}
                  >
                    <span>Tất cả danh mục</span>
                    <span className="text-[11px] opacity-70">({PRODUCTS.length})</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategoryId === cat.id 
                          ? 'bg-[#17382D] text-[#FFFDF7]' 
                          : 'text-gray-700 hover:bg-[#E8DEC8]/50'
                      }`}
                    >
                      <span className="line-clamp-1">{cat.name}</span>
                      <span className="text-[11px] opacity-70">
                        ({PRODUCTS.filter(p => p.category === cat.id).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17382D] block">
                  Khoảng giá (VNĐ)
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'Tất cả mức giá' },
                    { id: 'under-1m', label: 'Dưới 1.000.000 đ' },
                    { id: '1m-2m', label: '1.000.000 đ – 2.000.000 đ' },
                    { id: 'above-2m', label: 'Trên 2.000.000 đ' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === item.id}
                        onChange={() => setPriceRange(item.id)}
                        className="text-[#17382D] focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shell Type Filter */}
              <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17382D] block">
                  Loại vỏ ốc / Xà cừ
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'Tất cả chất liệu' },
                    { id: 'singapore', label: 'Ốc đỏ Singapore quý hiếm' },
                    { id: 'ngoc-trai', label: 'Xà cừ trai ngọc môi vàng' },
                    { id: 'cuu-khong', label: 'Ốc cửu khổng biển sâu' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="shell"
                        checked={shellFilter === item.id}
                        onChange={() => setShellFilter(item.id)}
                        className="text-[#17382D] focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SV Startup Highlight Box */}
              <div className="p-3.5 rounded-xl bg-[#17382D] text-[#FFFDF7] text-xs space-y-1.5">
                <span className="font-semibold text-[#D8C29D] block">Cơ Chế Đặt Cọc 55%</span>
                <p className="text-[#F5F0E5]/80 text-[11px] leading-relaxed">
                  Áp dụng cho mọi sản phẩm! Trả trước 55% hỗ trợ nghệ nhân Chuôn Ngọ mua nguyên liệu, 45% trả khi nhận hàng.
                </p>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Toolbar: Count & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-[#F5F0E5]/30 rounded-xl border border-[#E8DEC8]">
              <span className="text-xs text-gray-600">
                Hiển thị <strong className="text-[#17382D]">{filteredProducts.length}</strong> tác phẩm thủ công
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sắp xếp theo:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#E8DEC8] rounded-lg px-2.5 py-1 text-xs text-[#17382D] focus:outline-none"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E8DEC8] p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F0E5] text-[#17382D] mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#17382D]">Không tìm thấy tác phẩm phù hợp</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Hãy thử điều chỉnh lại bộ lọc giá hoặc danh mục để tìm kiếm các sản phẩm khác của làng nghề.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isFav = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      {product.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#17382D] text-[#FFFDF7] shadow-sm">
                          Nổi bật
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#B69A68] text-[#17382D] shadow-sm">
                          Mới
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isFav 
                          ? 'bg-[#D9383A] text-white shadow-md' 
                          : 'bg-white/90 text-gray-600 hover:text-[#D9383A] hover:bg-white shadow-sm'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Image */}
                    <div 
                      onClick={() => navigateTo('product-detail', product.id)}
                      className="relative aspect-square w-full overflow-hidden bg-[#17382D]/5 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Action hover */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="w-9 h-9 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                          title="Xem nhanh"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAR(product);
                          }}
                          className="w-9 h-9 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                          title="Xem WebAR 3D"
                        >
                          <Box className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openPassport(product.digitalPassport.serialNumber);
                          }}
                          className="w-9 h-9 rounded-full bg-white text-[#17382D] hover:bg-[#B69A68] hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                          title="Xem Tem QR Định danh"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-grow justify-between bg-[#FFFDF7]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#B69A68]">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span className="font-semibold text-gray-700 text-[11px]">({product.reviewsCount})</span>
                        </div>

                        <h3 
                          onClick={() => navigateTo('product-detail', product.id)}
                          className="font-serif text-sm font-semibold text-[#17382D] hover:text-[#B69A68] transition-colors cursor-pointer line-clamp-2 leading-snug"
                        >
                          {product.name}
                        </h3>

                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {product.shellType}
                        </p>

                        {/* Digital Passport QR Badge */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo('passport', product.id);
                          }}
                          className="pt-1 flex items-center justify-between text-[10.5px] text-[#8B3A1E] font-medium cursor-pointer hover:underline"
                          title="Xem Hộ chiếu di sản số"
                        >
                          <span className="flex items-center gap-1">
                            <QrCode className="w-3 h-3 text-[#8B3A1E]" />
                            <span>Mã định danh: <strong>{product.id === 'CNH-001' ? 'SP001' : product.id}</strong></span>
                          </span>
                          <span className="text-[10px] text-gray-400 hover:text-[#8B3A1E]">Quét xem →</span>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="pt-3 mt-2 border-t border-[#F5F0E5] flex items-center justify-between">
                        <div>
                          <div className="text-sm sm:text-base font-bold text-[#17382D]">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-[10px] text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-3 py-1.5 rounded-lg bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Mua</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </main>

        </div>

      </div>
    </div>
  );
};
