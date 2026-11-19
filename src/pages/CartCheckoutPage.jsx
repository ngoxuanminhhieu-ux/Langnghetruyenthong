import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  CheckCircle, 
  Sparkles, 
  Info,
  CreditCard,
  Building,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartCheckoutPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    user, 
    navigateTo, 
    showToast 
  } = useApp();

  // Payment Option: 'deposit55' (55% deposit) vs 'full100' (100% full payment)
  const [paymentMode, setPaymentMode] = useState('deposit55');
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr', 'card', 'cod'

  // Shipping form
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Nguyễn Minh Anh',
    phone: user?.phone || '0988 123 456',
    email: user?.email || 'minhanh.heritage@gmail.com',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    address: user?.address || 'Số 18 Tràng Tiền, Phường Tràng Tiền',
    note: ''
  });

  const [orderSuccess, setOrderSuccess] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Calculations
  const discount = paymentMode === 'full100' ? Math.round(cartTotal * 0.05) : 0;
  const shippingFee = cartTotal > 1500000 ? 0 : 35000;
  const finalTotal = cartTotal - discount + shippingFee;

  const depositRate = 0.55;
  const depositAmount = Math.round(finalTotal * depositRate);
  const remainingAmount = finalTotal - depositAmount;

  // SV Startup Social Impact Breakdown
  const artisanCogs = Math.round(cartTotal * 0.50); // 50% paid to artisans
  const packagingAndQr = Math.round(cartTotal * 0.10); // 10% for logistics, QR passport & packaging
  const startupMargin = cartTotal - artisanCogs - packagingAndQr; // 40% gross margin

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      showToast('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng', 'info');
      return;
    }

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      items: [...cart],
      total: finalTotal,
      paidAmount: paymentMode === 'deposit55' ? depositAmount : finalTotal,
      remainingAmount: paymentMode === 'deposit55' ? remainingAmount : 0,
      paymentMode,
      paymentMethod,
      customer: formData,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Đã cọc 55% - Chờ nghệ nhân khởi công'
    };

    // Save order in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('chuonngo_orders') || '[]');
      existing.unshift(orderData);
      localStorage.setItem('chuonngo_orders', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setOrderSuccess(orderData);
    clearCart();
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    showToast('Đặt hàng thành công! Nghệ nhân Chuôn Ngọ đã nhận thông tin bảo trợ.');
  };

  if (orderSuccess) {
    return (
      <div className="bg-[#FFFDF7] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#17382D] text-[#FFFDF7] mx-auto flex items-center justify-center border-4 border-[#B69A68] shadow-2xl">
            <CheckCircle className="w-10 h-10 text-[#D8C29D]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
              Xác Nhận Đơn Hàng Thành Công
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
              Cảm ơn bạn đã đồng hành gìn giữ di sản!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              Mã đơn hàng: <strong className="font-mono text-[#17382D]">{orderSuccess.orderId}</strong>. Nghệ nhân làng Chuôn Ngọ đã nhận tiền bảo trợ cọc 55% và bắt đầu chuẩn bị phôi gỗ & vỏ ốc xà cừ.
            </p>
          </div>

          {/* Payment QR Box for Bank Transfer */}
          <div className="bg-[#F5F0E5]/80 rounded-2xl p-6 border border-[#E8DEC8] text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
              <span className="text-xs font-bold text-[#17382D] uppercase">
                Thông tin thanh toán VietQR
              </span>
              <span className="text-xs font-mono text-[#B69A68] font-bold">
                {formatPrice(orderSuccess.paidAmount)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* VietQR Mockup */}
              <div className="w-36 h-36 bg-white p-2 rounded-xl border border-[#B69A68] shrink-0 shadow-md flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-[#17382D]" />
                <span className="text-[9px] font-mono font-bold text-[#17382D]">VietQR • Chuyển 24/7</span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700">
                <div>Ngân hàng: <strong>Vietcombank (Hà Nội)</strong></div>
                <div>Số tài khoản: <strong className="font-mono text-sm text-[#17382D]">1028 999 888</strong></div>
                <div>Chủ tài khoản: <strong>CHUON NGO HERITAGE STARTUP</strong></div>
                <div>Nội dung chuyển khoản: <strong className="font-mono text-[#17382D] bg-white px-2 py-0.5 rounded border border-[#E8DEC8]">{orderSuccess.orderId}</strong></div>
                <div className="text-[11px] text-[#B69A68] pt-1">
                  * Hệ thống sẽ tự động kích hoạt tiến độ chế tác ngay khi nhận chuyển khoản.
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo('account')}
              className="px-6 py-3 rounded-full bg-[#17382D] text-[#FFFDF7] font-bold text-xs shadow-md hover:bg-[#294638]"
            >
              Theo dõi tiến độ chế tác của nghệ nhân →
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-3 rounded-full border border-[#E8DEC8] text-xs font-semibold text-gray-700 hover:bg-[#F5F0E5]"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFDF7] min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F5F0E5] text-gray-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-[#17382D]">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-gray-500">
            Hãy khám phá các tác phẩm khảm trai tinh xảo hoặc tự thiết kế sản phẩm cá nhân hóa cho riêng mình.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded-full bg-[#17382D] text-[#FFFDF7] font-bold text-xs"
          >
            Khám phá cửa hàng di sản →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#E8DEC8]">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#17382D]">
            Giỏ hàng & Đặt hàng bảo trợ
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light mt-1">
            Ứng dụng mô hình tài trợ dòng tiền trực tiếp: Khách cọc 55% chi trả 100% vật tư & tiền công nghệ nhân Chuôn Ngọ.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Cart Items & Shipping Info (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Cart Items List */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#17382D] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#B69A68]" />
                Danh sách tác phẩm ({cart.length})
              </h3>

              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-[#17382D]/5 border border-[#E8DEC8] shrink-0"
                    />

                    <div className="flex-grow space-y-1">
                      <h4 className="font-serif text-sm font-semibold text-[#17382D] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-bold text-[#17382D]">
                        {formatPrice(item.product.price)}
                      </div>
                      {item.customization?.note && (
                        <div className="text-[11px] text-[#B69A68] italic line-clamp-1">
                          {item.customization.note}
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#E8DEC8] rounded-lg bg-[#F5F0E5]/40 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(idx, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-white rounded"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#17382D]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(idx, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-white rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(idx)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Customer Shipping Information */}
            <div className="space-y-4 pt-4 border-t border-[#E8DEC8]">
              <h3 className="font-serif text-lg font-bold text-[#17382D] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B69A68]" />
                Thông tin nhận hàng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Họ và tên người nhận *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Email nhận tem QR Passport *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Địa chỉ giao hàng chi tiết *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Số nhà, ngõ, tên đường, phường/xã..."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Ghi chú cho nghệ nhân chế tác (nếu có)</label>
                  <textarea
                    rows={2}
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Yêu cầu riêng về đóng gói hộp quà, thời gian giao hoặc khắc chữ..."
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: SV Startup Payment Mechanism & Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SV Startup Smart Deposit Selector */}
            <div className="bg-[#17382D] text-[#FFFDF7] rounded-3xl p-6 border border-[#B69A68]/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#294638]">
                <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mô Hình Khởi Nghiệp SV Startup
                </span>
                <span className="text-[10px] font-mono text-[#D8C29D]">Escrow 55%</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#FFFDF7]">
                Lựa chọn cơ chế thanh toán:
              </h4>

              <div className="space-y-3">
                {/* Option 1: Deposit 55% */}
                <label 
                  onClick={() => setPaymentMode('deposit55')}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMode === 'deposit55'
                      ? 'bg-[#294638] border-[#B69A68] shadow-md'
                      : 'bg-[#17382D]/70 border-[#294638] opacity-75 hover:opacity-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymode"
                    checked={paymentMode === 'deposit55'}
                    onChange={() => setPaymentMode('deposit55')}
                    className="mt-1 accent-[#B69A68]"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[#FFFDF7] flex items-center gap-2">
                      <span>Đặt cọc linh hoạt 55% bảo trợ nghệ nhân</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#B69A68] text-[#17382D] text-[10px] font-bold">
                        Khuyên dùng
                      </span>
                    </div>
                    <p className="text-[#F5F0E5]/80 text-[11px] leading-relaxed">
                      Chỉ trả <strong>{formatPrice(depositAmount)}</strong> hôm nay. Khoản cọc bao phủ 100% tiền gỗ, vỏ ốc và tiền công nghệ nhân. 45% còn lại trả khi nhận hàng.
                    </p>
                  </div>
                </label>

                {/* Option 2: Full 100% */}
                <label 
                  onClick={() => setPaymentMode('full100')}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMode === 'full100'
                      ? 'bg-[#294638] border-[#B69A68] shadow-md'
                      : 'bg-[#17382D]/70 border-[#294638] opacity-75 hover:opacity-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymode"
                    checked={paymentMode === 'full100'}
                    onChange={() => setPaymentMode('full100')}
                    className="mt-1 accent-[#B69A68]"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[#FFFDF7] flex items-center gap-2">
                      <span>Thanh toán toàn bộ 100% (Giảm ngay 5%)</span>
                    </div>
                    <p className="text-[#F5F0E5]/80 text-[11px]">
                      Tiết kiệm {formatPrice(Math.round(cartTotal * 0.05))} và tặng kèm 01 móc khóa khảm ốc xà cừ Chuôn Ngọ.
                    </p>
                  </div>
                </label>
              </div>

              {/* Startup Financial Transparency Accordion */}
              <div className="pt-3 border-t border-[#294638] text-[11px] space-y-1.5 text-[#F5F0E5]/80">
                <span className="font-bold text-[#D8C29D] block">Minh bạch cơ cấu dòng tiền xã hội:</span>
                <div className="flex justify-between">
                  <span>• Trả trước cho nghệ nhân Chuôn Ngọ (COGS 50%):</span>
                  <span className="font-mono">{formatPrice(artisanCogs)}</span>
                </div>
                <div className="flex justify-between">
                  <span>• Chi phí vận hành, bao bì & cấp tem QR (15%):</span>
                  <span className="font-mono">{formatPrice(packagingAndQr)}</span>
                </div>
                <div className="flex justify-between text-[#D8C29D]">
                  <span>• Quỹ tái đầu tư bảo tồn làng nghề:</span>
                  <span className="font-mono">{formatPrice(startupMargin)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#FFFDF7] p-5 rounded-2xl border border-[#E8DEC8] space-y-3">
              <span className="text-xs font-bold text-[#17382D] block">Phương thức chuyển tiền:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'vietqr', label: 'VietQR 24/7', icon: QrCode },
                  { id: 'card', label: 'Thẻ Visa/Master', icon: CreditCard },
                  { id: 'cod', label: 'Chuyển khoản cọc', icon: Building }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D]'
                          : 'bg-white text-gray-700 border-[#E8DEC8] hover:border-[#B69A68]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#B69A68]" />
                      <span className="text-[11px] font-semibold">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Cost Breakdown */}
            <div className="bg-[#F5F0E5]/60 p-5 rounded-2xl border border-[#E8DEC8] space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính giá trị sản phẩm:</span>
                <span className="font-medium text-gray-900">{formatPrice(cartTotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Ưu đãi thanh toán 100% (-5%):</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển bảo hiểm:</span>
                <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
              </div>

              <div className="pt-2 border-t border-[#E8DEC8] flex justify-between items-baseline text-sm">
                <span className="font-bold text-[#17382D]">Tổng giá trị đơn hàng:</span>
                <span className="font-serif font-bold text-lg text-[#17382D]">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {paymentMode === 'deposit55' && (
                <div className="p-3 bg-[#17382D] text-[#FFFDF7] rounded-xl flex items-center justify-between text-xs font-bold">
                  <span>SỐ TIỀN CỌC 55% THANH TOÁN NGAY:</span>
                  <span className="font-mono text-sm text-[#D8C29D]">{formatPrice(depositAmount)}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <span>
                Xác nhận đặt hàng • {formatPrice(paymentMode === 'deposit55' ? depositAmount : finalTotal)}
              </span>
              <ArrowRight className="w-4 h-4 text-[#D8C29D]" />
            </button>

            <div className="text-center text-[11px] text-gray-500">
              Đảm bảo 100% an toàn thanh toán • Cấp mã định danh di sản QR kèm bảo hành
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
