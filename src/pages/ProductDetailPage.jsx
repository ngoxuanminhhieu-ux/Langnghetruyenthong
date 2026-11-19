import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/heritageData';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Box, 
  QrCode, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Check, 
  ChevronRight,
  Share2,
  Info
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    openAR, 
    openPassport,
    showToast
  } = useApp();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [customEngraving, setCustomEngraving] = useState('');
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'specs', 'artisan', 'passport'

  const isFav = wishlist.includes(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const depositAmount = Math.round(product.price * 0.55);

  const handleAddToCart = () => {
    const custom = customEngraving.trim() ? { note: `Khắc tên/thông điệp: ${customEngraving.trim()}` } : null;
    addToCart(product, quantity, custom);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết tác phẩm vào khay nhớ tạm');
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-[#17382D]">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-[#17382D]">Sản phẩm</button>
          <span>/</span>
          <span className="text-[#17382D] font-semibold line-clamp-1">{product.name}</span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Gallery Col (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#17382D]/5 border border-[#E8DEC8] shadow-md group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Shimmer overlay effect */}
              <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30 iridescent-shimmer" />

              {/* AR & QR Quick Action Buttons */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  onClick={() => openAR(product)}
                  className="px-3.5 py-1.5 rounded-full bg-[#17382D]/90 text-[#FFFDF7] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md hover:bg-[#17382D] transition-all"
                >
                  <Box className="w-3.5 h-3.5 text-[#B69A68]" />
                  <span>Trải nghiệm WebAR 3D</span>
                </button>
                <button
                  onClick={() => navigateTo('passport', product.id)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FFFDF7]/90 text-[#17382D] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md hover:bg-white transition-all border border-[#E8DEC8]"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#8B3A1E]" />
                  <span>Quét QR Hộ chiếu số: {product.id === 'CNH-001' ? 'SP001' : product.id}</span>
                </button>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isFav ? 'bg-[#D9383A] text-white' : 'bg-white/90 text-gray-700 hover:text-[#D9383A]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#17382D] shadow-md scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Actions Col (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
                  Tuyệt Tác Làng Nghề Chuôn Ngọ
                </span>
                <button 
                  onClick={handleShare}
                  className="text-gray-400 hover:text-[#17382D] transition-colors p-1"
                  title="Chia sẻ tác phẩm"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17382D] leading-tight">
                {product.name}
              </h1>

              {/* Rating & Artisan Byline */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1 text-[#B69A68]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-700">({product.reviewsCount} đánh giá từ khách hàng)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">
                  Tác giả: <strong className="text-[#17382D]">{product.artisan}</strong>
                </span>
              </div>
            </div>

            {/* Price section with Smart Deposit Highlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F0E5]/60 border border-[#E8DEC8] space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#17382D]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-[#17382D] text-[#FFFDF7] font-medium">
                  Đã bao gồm VAT & Tem QR
                </span>
              </div>

              {/* SV Startup Smart Deposit Callout */}
              <div className="pt-3 border-t border-[#E8DEC8]/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#17382D]">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
                    Chính sách đặt cọc linh hoạt 55%:
                  </span>
                  <span className="font-mono font-bold text-base text-[#17382D]">
                    {formatPrice(depositAmount)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Bạn chỉ cần cọc trước <strong>55%</strong> để tài trợ 100% nguyên liệu ốc quý và tiền công cho nghệ nhân. <strong>45%</strong> còn lại thanh toán khi nhận hàng và quét tem QR Passport xác thực.
                </p>
              </div>
            </div>

            {/* Personalization Studio Box (For Gen Z & Gifting) */}
            <div className="p-4 rounded-xl border border-[#B69A68]/40 bg-[#FFFDF7] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#17382D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
                  Cá nhân hóa sản phẩm (Khắc tên / Lời chúc miễn phí):
                </label>
                <span className="text-[11px] text-[#B69A68] font-semibold">Tùy chọn</span>
              </div>
              <input
                type="text"
                placeholder="VD: Nguyễn Minh Anh - Khắc chữ Thư pháp mặt đáy"
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                maxLength={60}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8DEC8] rounded-lg focus:border-[#17382D] focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 block">
                Nghệ nhân sẽ khảm xà cừ hoặc khắc laser chữ theo nội dung yêu cầu của bạn.
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#E8DEC8] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg text-gray-600 hover:bg-[#F5F0E5] flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-[#17382D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg text-gray-600 hover:bg-[#F5F0E5] flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow py-3.5 px-6 rounded-xl bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8C29D]" />
                  <span>Thêm vào giỏ hàng • {formatPrice(product.price * quantity)}</span>
                </button>
              </div>

              {/* Direct WebAR & Customizer Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openAR(product)}
                  className="py-2.5 px-4 rounded-xl border border-[#17382D] text-[#17382D] hover:bg-[#17382D] hover:text-[#FFFDF7] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Box className="w-4 h-4 text-[#B69A68]" />
                  <span>Mô phỏng WebAR không gian</span>
                </button>
                <button
                  onClick={() => navigateTo('passport', product.id)}
                  className="py-2.5 px-4 rounded-xl border border-[#8B3A1E] text-[#8B3A1E] hover:bg-[#8B3A1E] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Hồ sơ di sản số (QR Passport)</span>
                </button>
              </div>
            </div>

            {/* Reassurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8DEC8] text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>Bảo hành xà cừ trọn đời</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>Giao hàng bảo hiểm toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>Kiểm tra trước khi trả 45%</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Story / Specifications / Artisan / Digital Passport */}
        <div className="mt-16 border-t border-[#E8DEC8] pt-10">
          <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-4 overflow-x-auto">
            {[
              { id: 'story', label: 'Câu chuyện tác phẩm' },
              { id: 'specs', label: 'Quy cách & Chất liệu' },
              { id: 'artisan', label: 'Hồ sơ nghệ nhân' },
              { id: 'passport', label: 'Chứng thư di sản số' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#17382D] text-[#FFFDF7] shadow-sm'
                    : 'text-gray-600 hover:text-[#17382D] hover:bg-[#F5F0E5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'story' && (
              <div className="max-w-3xl space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-light">
                <h3 className="font-serif text-2xl text-[#17382D]">Hồn cốt di sản trong từng thớ xà cừ</h3>
                <p>{product.story}</p>
                <div className="p-4 bg-[#F5F0E5]/60 rounded-xl border border-[#E8DEC8] space-y-2 mt-4">
                  <span className="font-bold text-[#17382D] text-xs uppercase tracking-wider block">
                    Đặc điểm chế tác nổi bật:
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B69A68]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-[#E8DEC8]">
                      <td className="py-3 font-semibold text-[#17382D] w-1/3">Chất liệu gỗ:</td>
                      <td className="py-3 text-gray-700">{product.woodType}</td>
                    </tr>
                    <tr className="border-b border-[#E8DEC8]">
                      <td className="py-3 font-semibold text-[#17382D]">Loại vỏ ốc / Xà cừ:</td>
                      <td className="py-3 text-gray-700">{product.shellType}</td>
                    </tr>
                    <tr className="border-b border-[#E8DEC8]">
                      <td className="py-3 font-semibold text-[#17382D]">Kích thước:</td>
                      <td className="py-3 text-gray-700">{product.dimensions}</td>
                    </tr>
                    <tr className="border-b border-[#E8DEC8]">
                      <td className="py-3 font-semibold text-[#17382D]">Trọng lượng:</td>
                      <td className="py-3 text-gray-700">{product.weight}</td>
                    </tr>
                    <tr className="border-b border-[#E8DEC8]">
                      <td className="py-3 font-semibold text-[#17382D]">Lớp hoàn thiện:</td>
                      <td className="py-3 text-gray-700">{product.digitalPassport.lacquerType}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#17382D]">Xuất xứ:</td>
                      <td className="py-3 text-gray-700">Làng nghề khảm trai Chuôn Ngọ, Chuyên Mỹ, Phú Xuyên, Hà Nội</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'artisan' && (
              <div className="max-w-2xl bg-[#FFFDF7] p-6 rounded-2xl border border-[#E8DEC8] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#17382D] text-[#FFFDF7] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#B69A68]">
                    {product.artisan.split(' ').pop()[0]}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#17382D]">{product.artisan}</h4>
                    <p className="text-xs text-[#B69A68] font-medium">{product.artisanExperience}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "Người nghệ nhân làng Chuôn Ngọ luôn tâm niệm: Mỗi nét cưa, mỗi nhát đục là một lời tri ân gửi đến bậc tiền nhân mở nghề. Chúng tôi trao gửi trọn vẹn sự tinh túy vào từng tác phẩm gửi tới quý khách hàng."
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('heritage')}
                    className="text-xs font-bold text-[#17382D] hover:text-[#B69A68] underline"
                  >
                    Xem tiểu sử nghệ nhân đầy đủ →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'passport' && (
              <div className="max-w-2xl bg-[#17382D] text-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#B69A68]/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#294638]">
                  <span className="text-xs font-mono text-[#D8C29D]">
                    SỐ SERIAL: {product.digitalPassport.serialNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/40">
                    ĐÃ XÁC THỰC
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#F5F0E5]/60 block mb-0.5">Nguồn gốc vỏ ốc:</span>
                    <span className="font-medium text-[#FFFDF7]">{product.digitalPassport.provenanceShell}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F0E5]/60 block mb-0.5">Lô chế tác:</span>
                    <span className="font-medium text-[#FFFDF7]">{product.digitalPassport.batch}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F0E5]/60 block mb-0.5">Ngày giám định:</span>
                    <span className="font-medium text-[#FFFDF7]">{product.digitalPassport.inspectionDate}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F0E5]/60 block mb-0.5">Cơ quan chứng nhận:</span>
                    <span className="font-medium text-[#FFFDF7]">{product.digitalPassport.certifiedBy}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#294638] flex items-center justify-between">
                  <span className="text-[11px] text-[#F5F0E5]/70">
                    Tem mã QR được khắc laser chìm và tích hợp liên kết số vĩnh cửu.
                  </span>
                  <button
                    onClick={() => navigateTo('passport', product.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#8B3A1E] text-white text-xs font-bold hover:bg-[#A34524] transition-colors"
                  >
                    Xem chi tiết Hộ chiếu số →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-[#E8DEC8] pt-12">
            <h3 className="font-serif text-2xl text-[#17382D] mb-6">
              Tác phẩm cùng bộ sưu tập
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('product-detail', p.id)}
                  className="group cursor-pointer rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#B69A68] p-4 transition-all shadow-sm hover:shadow-lg"
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#17382D]/5">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#17382D] group-hover:text-[#B69A68] line-clamp-1">
                    {p.name}
                  </h4>
                  <div className="text-xs font-bold text-[#17382D] mt-1">
                    {formatPrice(p.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
