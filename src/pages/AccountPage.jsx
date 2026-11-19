import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/heritageData';
import { 
  User, 
  Package, 
  QrCode, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';

export const AccountPage = () => {
  const { user, setUser, wishlist, navigateTo, openPassport, showToast } = useApp();
  const { bookings } = useWorkshop();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'workshops', 'passports', 'wishlist', 'profile'
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chuonngo_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        // Sample initial order
        const initial = [
          {
            orderId: 'ORD-829104',
            items: [
              { product: PRODUCTS[1], quantity: 1, customization: { note: 'Khắc chữ Thư pháp: MINH ANH' } }
            ],
            total: 520000,
            paidAmount: 286000,
            remainingAmount: 234000,
            paymentMode: 'deposit55',
            customer: user || { fullName: 'Nguyễn Minh Anh' },
            date: '10/11/2026',
            status: 'Đang mài bóng bằng lá chuối khô',
            step: 5 // out of 6
          }
        ];
        setOrders(initial);
      }
    } catch {
      setOrders([]);
    }
  }, [user]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Đã đăng xuất tài khoản', 'info');
    navigateTo('home');
  };

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-[#17382D] rounded-3xl p-6 sm:p-8 text-[#FFFDF7] border border-[#B69A68]/40 shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-[#B69A68] text-[#17382D] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#FFFDF7] shadow-lg shrink-0">
              {user ? user.name.split(' ').pop()[0] : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="font-serif text-2xl font-bold text-[#FFFDF7]">
                  {user ? user.name : 'Khách hàng di sản'}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#294638] text-[#D8C29D] text-[10px] font-mono border border-[#B69A68]/30">
                  Thành viên Bảo trợ
                </span>
              </div>
              <p className="text-xs text-[#F5F0E5]/80 mt-1">
                {user?.email || 'minhanh.heritage@gmail.com'} • {user?.phone || '0988 123 456'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              className="px-4 py-2 rounded-full bg-[#294638] hover:bg-[#38604d] text-[#D8C29D] text-xs font-semibold border border-[#B69A68]/40 transition-colors"
            >
              Cổng Quản Trị Admin →
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-[#F5F0E5]/30 hover:border-[#FFFDF7] text-xs font-semibold text-[#F5F0E5] flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'orders', label: 'Tiến độ đơn hàng & Chế tác', icon: Package },
            { id: 'workshops', label: `Vé Workshop Di Sản (${bookings.length})`, icon: Calendar },
            { id: 'passports', label: 'Bộ sưu tập Tem QR Passport', icon: QrCode },
            { id: 'wishlist', label: 'Tác phẩm yêu thích', icon: Heart },
            { id: 'profile', label: 'Thông tin cá nhân', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#17382D] text-[#FFFDF7] shadow-sm'
                    : 'text-gray-600 hover:text-[#17382D] hover:bg-[#F5F0E5]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#B69A68]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Orders with Artisan Crafting Stage Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E8DEC8] p-8 space-y-3">
                <Package className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="font-serif text-lg text-[#17382D]">Chưa có đơn hàng nào</h3>
                <p className="text-xs text-gray-500">Hãy đặt mua tác phẩm khảm trai đầu tiên để bảo trợ nghệ nhân Chuôn Ngọ.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-5 py-2 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold"
                >
                  Khám phá tác phẩm
                </button>
              </div>
            ) : (
              orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#E8DEC8] shadow-sm p-6 sm:p-8 space-y-6"
                >
                  {/* Order header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DEC8] gap-3">
                    <div>
                      <span className="text-xs font-mono text-[#B69A68] font-bold">MÃ ĐƠN: {ord.orderId}</span>
                      <div className="text-xs text-gray-500 mt-0.5">Ngày đặt: {ord.date}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#17382D] text-[#FFFDF7]">
                        {ord.status}
                      </span>
                      <span className="font-serif font-bold text-base text-[#17382D]">
                        {formatPrice(ord.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="space-y-3">
                    {ord.items.map((it, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-4 text-xs">
                        <img
                          src={it.product.image}
                          alt={it.product.name}
                          className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-[#E8DEC8]"
                        />
                        <div className="flex-grow">
                          <h4 className="font-serif font-bold text-[#17382D] text-sm">{it.product.name}</h4>
                          <span className="text-gray-500">Số lượng: {it.quantity} • {formatPrice(it.product.price)}</span>
                          {it.customization?.note && (
                            <span className="text-[#B69A68] block mt-0.5 italic">{it.customization.note}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Artisan Fabrication Milestone Flow (Visual Pipeline) */}
                  <div className="bg-[#F5F0E5]/60 p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
                    <span className="text-xs font-bold text-[#17382D] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#B69A68]" />
                      Hành trình tạo tác thủ công của nghệ nhân Chuôn Ngọ:
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                      {[
                        { step: 1, name: 'Đã cọc 55%', desc: 'Ký quỹ vật tư' },
                        { step: 2, name: 'Cưa lọng', desc: 'Xẻ vỏ ốc xà cừ' },
                        { step: 3, name: 'Đục thớ gỗ', desc: 'Gọt gỗ trắc/mun' },
                        { step: 4, name: 'Gắn sơn ta', desc: 'Nhựa sơn Phú Thọ' },
                        { step: 5, name: 'Mài lá chuối', desc: 'Lên sắc ngũ quang' },
                        { step: 6, name: 'Giao hàng', desc: 'Thu nốt 45%' }
                      ].map(st => {
                        const isCurrent = st.step === 5;
                        const isPast = st.step <= 5;
                        return (
                          <div 
                            key={st.step}
                            className={`p-2.5 rounded-xl border transition-all ${
                              isCurrent 
                                ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D] shadow-md ring-2 ring-[#B69A68]'
                                : (isPast ? 'bg-[#294638]/20 text-[#17382D] border-[#B69A68]/40' : 'bg-white text-gray-400 border-gray-200 opacity-60')
                            }`}
                          >
                            <div className="text-[10px] font-mono font-bold mb-0.5">BƯỚC {st.step}</div>
                            <div className="font-semibold text-xs">{st.name}</div>
                            <div className="text-[9px] mt-0.5 opacity-80">{st.desc}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-gray-600 flex items-center justify-between pt-1">
                      <span>Đã thanh toán trước 55%: <strong>{formatPrice(ord.paidAmount)}</strong></span>
                      <span>Còn lại khi nhận hàng: <strong className="text-[#17382D]">{formatPrice(ord.remainingAmount)}</strong></span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB WORKSHOPS: Booked Workshop Digital Passes */}
        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <div className="border-b border-[#E8DEC8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-xl text-[#17382D] font-bold">
                  Vé & Lịch Hẹn Trải Nghiệm Workshop ({bookings.length})
                </h3>
                <p className="text-xs text-gray-600">
                  Mã vé di sản số dùng để check-in trực tiếp tại xưởng mộc làng Chuôn Ngọ hoặc Studio Hà Nội.
                </p>
              </div>

              <button
                onClick={() => navigateTo('workshop')}
                className="px-4 py-2 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold hover:bg-[#244A3D] transition-colors self-start sm:self-auto"
              >
                + Đăng ký thêm workshop
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E8DEC8] p-8 space-y-3">
                <Calendar className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="font-serif text-lg text-[#17382D]">Bạn chưa đăng ký workshop nào</h3>
                <p className="text-xs text-gray-500">Hãy tham gia khóa cưa lọng khảm xà cừ cùng các nghệ nhân lão thành Chuôn Ngọ.</p>
                <button
                  onClick={() => navigateTo('workshop')}
                  className="px-5 py-2.5 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold"
                >
                  Khám phá các khóa học →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="bg-[#101813] text-[#FFFDF7] p-6 rounded-3xl border-2 border-[#D3B392] shadow-xl space-y-4 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#D3B392]/30">
                      <span className="font-mono text-xs text-[#D3B392] font-bold">
                        MÃ VÉ: #{bk.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        bk.status === 'confirmed' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {bk.status === 'confirmed' ? 'ĐÃ XÁC NHẬN GIỮ CHỖ' : bk.status}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <img src={bk.workshopImage || '/images/product_but_ky_kham_trai.jpg'} alt="" className="w-16 h-16 rounded-xl object-cover border border-[#D3B392] shrink-0" />
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#FFFDF7] leading-snug">{bk.workshopTitle}</h4>
                        <p className="text-xs text-[#D3B392] mt-0.5">Thời gian: {bk.sessionDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Người tham gia:</span>
                        <span className="font-semibold">{bk.customerName} ({bk.participants} người)</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Học phí:</span>
                        <span className="text-[#D3B392] font-bold">{formatPrice(bk.totalPrice)}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-[#D3B392]/20 text-[11px] text-gray-300 flex items-center justify-between">
                      <span className="line-clamp-1">Địa điểm: {bk.location}</span>
                      <QrCode className="w-6 h-6 text-[#D3B392] shrink-0 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Scanned Heritage QR Passports */}
        {activeTab === 'passports' && (
          <div className="space-y-6">
            <div className="border-b border-[#E8DEC8] pb-4">
              <h3 className="font-serif text-xl text-[#17382D]">
                Hồ sơ định danh số các tác phẩm sở hữu
              </h3>
              <p className="text-xs text-gray-600">
                Mỗi tem QR là một chứng chỉ mật mã xác nhận tính nguyên bản, tuổi đời gỗ và nghệ nhân chế tác độc quyền.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[PRODUCTS[0], PRODUCTS[1]].map((prod, i) => (
                <div
                  key={i}
                  className="bg-[#17382D] text-[#FFFDF7] p-6 rounded-2xl border border-[#B69A68]/60 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#294638]">
                    <span className="font-mono text-xs text-[#D8C29D]">
                      {prod.digitalPassport.serialNumber}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      CHỨNG NHẬN DI SẢN CHUÔN NGỌ
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <img src={prod.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-[#B69A68]" />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#FFFDF7]">{prod.name}</h4>
                      <p className="text-xs text-[#D8C29D]">Nghệ nhân: {prod.artisan}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#294638]">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Loại vỏ ốc:</span>
                      <span className="text-[#FFFDF7] font-medium">{prod.shellType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Chất liệu gỗ:</span>
                      <span className="text-[#FFFDF7] font-medium">{prod.woodType}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openPassport(prod.digitalPassport.serialNumber)}
                    className="w-full py-2 rounded-xl bg-[#B69A68] hover:bg-[#D4BA88] text-[#17382D] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Xem toàn văn chứng thư số & Xuất PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E8DEC8] p-8">
                <Heart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="font-serif text-lg text-[#17382D]">Danh sách yêu thích trống</h3>
                <p className="text-xs text-gray-500">Nhấp vào biểu tượng trái tim ở góc các sản phẩm để lưu lại tại đây.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {wishlistProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo('product-detail', p.id)}
                    className="group cursor-pointer rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#B69A68] p-4 transition-all shadow-sm"
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
            )}
          </div>
        )}

        {/* TAB 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-xl text-[#17382D]">Thông tin tài khoản</h3>
            <div className="space-y-3 text-xs text-gray-700">
              <div>
                <span className="font-semibold block text-gray-500">Họ và tên:</span>
                <span className="text-sm font-medium">{user?.name || 'Nguyễn Minh Anh'}</span>
              </div>
              <div>
                <span className="font-semibold block text-gray-500">Email:</span>
                <span className="text-sm font-medium">{user?.email || 'minhanh.heritage@gmail.com'}</span>
              </div>
              <div>
                <span className="font-semibold block text-gray-500">Số điện thoại:</span>
                <span className="text-sm font-medium">{user?.phone || '0988 123 456'}</span>
              </div>
              <div>
                <span className="font-semibold block text-gray-500">Địa chỉ giao hàng mặc định:</span>
                <span className="text-sm font-medium">{user?.address || 'Số 18 Tràng Tiền, Phường Tràng Tiền, Hoàn Kiếm, Hà Nội'}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
