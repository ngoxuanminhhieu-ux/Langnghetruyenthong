import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useWorkshop } from '../context/WorkshopContext';
import { PRODUCTS, CATEGORIES } from '../data/heritageData';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Calendar, 
  QrCode, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  ShieldCheck, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  Award,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  X,
  Search,
  Filter
} from 'lucide-react';

export const AdminPage = () => {
  const { navigateTo, showToast, user } = useApp();
  const { 
    workshops, 
    schedules, 
    bookings, 
    artisans, 
    reviews,
    addWorkshop, 
    updateWorkshop, 
    deleteWorkshop,
    addSchedule, 
    updateSchedule, 
    deleteSchedule,
    updateBookingStatus, 
    cancelBooking,
    addArtisan, 
    updateArtisan, 
    deleteArtisan,
    deleteReview 
  } = useWorkshop();

  const [activeTab, setActiveTab] = useState('dashboard'); 
  // 'dashboard', 'workshops', 'schedules', 'bookings', 'artisans', 'reviews', 'products', 'orders', 'qr-generator'

  // Products state (allows adding new)
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_admin_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.some(p => p.id === 'CNH-001' && p.name.includes('Bút Ký'))) {
          return parsed;
        }
      }
      return PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Orders state
  const [ordersList, setOrdersList] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'ORD-829104',
          customer: { fullName: 'Nguyễn Minh Anh', phone: '0988 123 456' },
          items: [{ product: PRODUCTS[1], quantity: 1 }],
          total: 520000,
          paidAmount: 286000,
          status: 'Đang mài bóng bằng lá chuối khô',
          date: '10/11/2026'
        },
        {
          orderId: 'ORD-519283',
          customer: { fullName: 'Trần Hoàng Long', phone: '0912 345 678' },
          items: [{ product: PRODUCTS[0], quantity: 1 }],
          total: 1850000,
          paidAmount: 1017500,
          status: 'Cưa lọng xà cừ',
          date: '12/11/2026'
        }
      ];
    } catch {
      return [];
    }
  });

  // QR Generator state
  const [newSerial, setNewSerial] = useState('CNH-2026-XACU-' + Math.floor(1000 + Math.random() * 9000));
  const [qrWood, setQrWood] = useState('Gỗ Trắc đỏ tự nhiên');
  const [qrShell, setQrShell] = useState('Ốc xà cừ đỏ Singapore');
  const [qrArtisan, setQrArtisan] = useState('Nghệ nhân Ưu tú Trương Kim Thành');
  const [generatedPassports, setGeneratedPassports] = useState([
    { serial: 'CNH-2026-XACU-00189', item: 'Hộp Trang Sức Bách Liên', artisan: 'Trương Kim Thành', date: '24/10/2026' },
    { serial: 'CNH-2026-PEN-00101', item: 'Bút Ký Cửu Long Vọng Nguyệt', artisan: 'Trương Kim Thành', date: '02/11/2026' }
  ]);

  // Workshop Form Modal state
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [editingWorkshopId, setEditingWorkshopId] = useState(null);
  const [wsTitle, setWsTitle] = useState('');
  const [wsCategory, setWsCategory] = useState('offline-studio');
  const [wsCategoryLabel, setWsCategoryLabel] = useState('Studio Hà Nội');
  const [wsLevel, setWsLevel] = useState('Cơ bản (Người mới bắt đầu)');
  const [wsDuration, setWsDuration] = useState('3.5 giờ');
  const [wsPrice, setWsPrice] = useState(650000);
  const [wsOriginalPrice, setWsOriginalPrice] = useState(850000);
  const [wsArtisanName, setWsArtisanName] = useState('Nghệ nhân Trương Công Hùng');
  const [wsArtisanId, setWsArtisanId] = useState('ART-CHUONNGO-003');
  const [wsLocation, setWsLocation] = useState('36 Tràng Tiền, Hoàn Kiếm, Hà Nội');
  const [wsMaxCapacity, setWsMaxCapacity] = useState(12);
  const [wsShortDesc, setWsShortDesc] = useState('');
  const [wsImage, setWsImage] = useState('/images/product_but_ky_kham_trai.jpg');

  // Schedule Form Modal state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedWorkshopId, setSchedWorkshopId] = useState(workshops[0]?.id || 'WS-01');
  const [schedDate, setSchedDate] = useState('2026-11-28');
  const [schedDateDisplay, setSchedDateDisplay] = useState('Thứ Bảy, 28/11/2026');
  const [schedTimeSlot, setSchedTimeSlot] = useState('09:00 - 12:30');
  const [schedShift, setSchedShift] = useState('morning');
  const [schedMaxSeats, setSchedMaxSeats] = useState(12);
  const [schedLocation, setSchedLocation] = useState('36 Tràng Tiền, Hoàn Kiếm, Hà Nội');

  // Artisan Form Modal state
  const [isArtisanFormOpen, setIsArtisanFormOpen] = useState(false);
  const [artName, setArtName] = useState('');
  const [artRole, setArtRole] = useState('Truyền nhân làng Chuôn Ngọ');
  const [artExp, setArtExp] = useState('20 năm tuổi nghề');
  const [artSpecialty, setArtSpecialty] = useState('Cưa lọng xà cừ ngũ sắc');
  const [artBio, setArtBio] = useState('');
  const [artQuote, setArtQuote] = useState('');
  const [artImage, setArtImage] = useState('/images/artisan_truong_cong_hung.jpg');

  // Booking search/filter
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Workshop metrics
  const totalWorkshopStudents = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.participants : sum, 0);
  const totalWorkshopRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.totalPrice : sum, 0);
  const totalOpenSchedules = schedules.filter(s => s.status !== 'full').length;

  const totalProductRevenue = ordersList.reduce((sum, o) => sum + (o.total || 0), 0);

  // Open Add Workshop Form
  const handleOpenAddWorkshop = () => {
    setEditingWorkshopId(null);
    setWsTitle('');
    setWsCategory('offline-studio');
    setWsCategoryLabel('Studio Hà Nội');
    setWsLevel('Cơ bản (Người mới bắt đầu)');
    setWsDuration('3.5 giờ');
    setWsPrice(650000);
    setWsOriginalPrice(850000);
    setWsArtisanName('Nghệ nhân Trương Công Hùng');
    setWsArtisanId('ART-CHUONNGO-003');
    setWsLocation('Không Gian Di Sản, 36 Tràng Tiền, Hoàn Kiếm, Hà Nội');
    setWsMaxCapacity(12);
    setWsShortDesc('Tự tay cưa lọng và khảm xà cừ ngũ sắc mang về.');
    setWsImage('/images/product_but_ky_kham_trai.jpg');
    setIsWorkshopModalOpen(true);
  };

  // Open Edit Workshop Form
  const handleOpenEditWorkshop = (ws) => {
    setEditingWorkshopId(ws.id);
    setWsTitle(ws.title);
    setWsCategory(ws.category);
    setWsCategoryLabel(ws.categoryLabel || 'Studio Hà Nội');
    setWsLevel(ws.level);
    setWsDuration(ws.duration);
    setWsPrice(ws.price);
    setWsOriginalPrice(ws.originalPrice || ws.price);
    setWsArtisanName(ws.artisanName);
    setWsArtisanId(ws.artisanId);
    setWsLocation(ws.location);
    setWsMaxCapacity(ws.maxCapacity);
    setWsShortDesc(ws.shortDesc);
    setWsImage(ws.image);
    setIsWorkshopModalOpen(true);
  };

  // Submit Workshop Form
  const handleSaveWorkshop = (e) => {
    e.preventDefault();
    const data = {
      title: wsTitle,
      category: wsCategory,
      categoryLabel: wsCategoryLabel,
      level: wsLevel,
      duration: wsDuration,
      price: Number(wsPrice),
      originalPrice: Number(wsOriginalPrice),
      artisanName: wsArtisanName,
      artisanId: wsArtisanId,
      location: wsLocation,
      maxCapacity: Number(wsMaxCapacity),
      shortDesc: wsShortDesc,
      fullDesc: wsShortDesc,
      image: wsImage,
      includes: [
        'Trọn bộ phôi gỗ và nguyên liệu ốc xà cừ',
        'Dụng cụ cưa lọng nghệ nhân an toàn',
        'Cơm trưa / thức uống trà thảo mộc',
        'Cấp Tem QR Định danh Di sản số'
      ]
    };

    if (editingWorkshopId) {
      updateWorkshop(editingWorkshopId, data);
    } else {
      addWorkshop(data);
    }
    setIsWorkshopModalOpen(false);
  };

  // Submit Schedule Form
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    const targetWs = workshops.find(w => w.id === schedWorkshopId);
    addSchedule({
      workshopId: schedWorkshopId,
      date: schedDate,
      dateDisplay: schedDateDisplay,
      timeSlot: schedTimeSlot,
      shift: schedShift,
      maxSeats: Number(schedMaxSeats),
      artisanName: targetWs ? targetWs.artisanName : 'Nghệ nhân Chuôn Ngọ',
      location: schedLocation
    });
    setIsScheduleModalOpen(false);
  };

  // Submit Artisan Form
  const handleSaveArtisan = (e) => {
    e.preventDefault();
    addArtisan({
      name: artName,
      role: artRole,
      experience: artExp,
      specialty: artSpecialty,
      bio: artBio || 'Nghệ nhân truyền đời làng nghề khảm trai Chuôn Ngọ.',
      quote: artQuote || 'Mỗi thớ ốc xà cừ đều phản chiếu nét đẹp đất trời.',
      image: artImage,
      awards: ['Nghệ nhân Tiêu biểu Làng nghề']
    });
    setIsArtisanFormOpen(false);
  };

  // Generate QR Passport
  const handleGeneratePassport = (e) => {
    e.preventDefault();
    const newEntry = {
      serial: newSerial,
      item: 'Tác phẩm ' + qrWood,
      artisan: qrArtisan,
      date: new Date().toLocaleDateString('vi-VN')
    };
    setGeneratedPassports([newEntry, ...generatedPassports]);
    showToast(`Đã cấp thành công Tem QR Passport: ${newSerial}`);
    setNewSerial('CNH-2026-XACU-' + Math.floor(1000 + Math.random() * 9000));
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingStatusFilter !== 'all' && b.status !== bookingStatusFilter) return false;
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      const matchName = b.customerName?.toLowerCase().includes(q);
      const matchPhone = b.customerPhone?.toLowerCase().includes(q);
      const matchId = b.id?.toLowerCase().includes(q);
      const matchWs = b.workshopTitle?.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchId && !matchWs) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-10 sm:py-14 text-[#2B1E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-[#17382D] to-[#2B1E16] rounded-3xl p-6 sm:p-8 text-[#FFFDF7] border border-[#D3B392]/50 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101813]/80 text-[#D3B392] text-xs font-semibold uppercase tracking-wider border border-[#D3B392]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hệ Thống Quản Trị Di Sản Số Chuôn Ngọ</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              Bảng Điều Khiển & Quản Lý Workshop
            </h1>
            <p className="text-xs text-[#F5F0E5]/80 font-light">
              Đang đăng nhập: <strong>{user?.name || 'Quản Trị Viên'}</strong> • Phân quyền: <strong>Admin (Toàn quyền)</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('workshop')}
              className="px-4 py-2.5 rounded-full bg-[#D3B392] hover:bg-[#E7C6A2] text-[#101813] font-bold text-xs shadow-md transition-colors"
            >
              Xem Trang Workshop →
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2.5 rounded-full border border-[#F5F0E5]/40 hover:border-[#FFFDF7] text-xs font-semibold text-[#FFFDF7] transition-colors"
            >
              Về Trang Chủ
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-4 mb-8 overflow-x-auto text-xs sm:text-sm">
          {[
            { id: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
            { id: 'workshops', label: `Workshop (${workshops.length})`, icon: Sparkles },
            { id: 'schedules', label: `Lịch & Ca học (${schedules.length})`, icon: Calendar },
            { id: 'bookings', label: `Đăng ký (${bookings.length})`, icon: Users },
            { id: 'artisans', label: `Nghệ nhân (${artisans.length})`, icon: Award },
            { id: 'reviews', label: `Đánh giá (${reviews.length})`, icon: Star },
            { id: 'products', label: 'Sản phẩm', icon: Package },
            { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
            { id: 'qr-generator', label: 'Tem QR Passport', icon: QrCode }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#17382D] text-[#FFFDF7] shadow-sm font-bold'
                    : 'text-gray-600 hover:text-[#17382D] hover:bg-[#F5F0E5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D3B392]' : 'text-[#B69A68]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Doanh Thu Workshop</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#17382D]">
                  {formatPrice(totalWorkshopRevenue)}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{totalWorkshopStudents} học viên đã tham gia</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Ca Học Đang Mở</span>
                  <Calendar className="w-4 h-4 text-[#B69A68]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#17382D]">
                  {totalOpenSchedules} / {schedules.length}
                </div>
                <div className="text-[11px] text-gray-500">
                  Sẵn sàng đón học viên tháng 11
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Hồ Sơ Nghệ Nhân</span>
                  <Award className="w-4 h-4 text-[#B69A68]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#17382D]">
                  {artisans.length} Bậc thầy
                </div>
                <div className="text-[11px] text-[#B69A68] font-medium">
                  Truyền nhân họ Trương & họ Trần
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Đánh Giá Hài Lòng</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#17382D]">
                  4.9 / 5.0
                </div>
                <div className="text-[11px] text-amber-600 font-semibold">
                  100% đánh giá 5 sao
                </div>
              </div>
            </div>

            {/* Recent Bookings Quick Table */}
            <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
                <h4 className="font-serif font-bold text-base text-[#17382D]">
                  Học viên mới đăng ký Workshop gần đây
                </h4>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-[#B69A68] hover:underline font-semibold"
                >
                  Xem toàn bộ danh sách ({bookings.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E8DEC8] text-gray-500">
                      <th className="py-2.5">Mã Vé</th>
                      <th className="py-2.5">Học Viên</th>
                      <th className="py-2.5">Chương Trình</th>
                      <th className="py-2.5">Ca Học</th>
                      <th className="py-2.5">Số Người</th>
                      <th className="py-2.5">Học Phí</th>
                      <th className="py-2.5">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="border-b border-[#F5F0E5] hover:bg-[#F5F0E5]/30">
                        <td className="py-3 font-mono font-bold text-[#17382D]">{b.id}</td>
                        <td className="py-3 font-semibold">{b.customerName}</td>
                        <td className="py-3 max-w-xs line-clamp-1">{b.workshopTitle}</td>
                        <td className="py-3 text-gray-600">{b.sessionDate}</td>
                        <td className="py-3 font-bold text-center">{b.participants}</td>
                        <td className="py-3 font-bold text-emerald-700">{formatPrice(b.totalPrice)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : b.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'cancelled' ? 'Đã hủy' : b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: WORKSHOP CRUD ================= */}
        {activeTab === 'workshops' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] font-bold">
                  Quản lý Chương trình Workshop ({workshops.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Thêm mới, sửa đổi thông tin khóa học, giá vé, thời lượng và nghệ nhân giảng dạy.
                </p>
              </div>

              <button
                onClick={handleOpenAddWorkshop}
                className="px-4 py-2.5 rounded-full bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Workshop Mới</span>
              </button>
            </div>

            {/* Workshops Table */}
            <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F0E5]/60 text-[#17382D] font-bold border-b border-[#E8DEC8]">
                    <tr>
                      <th className="py-3.5 px-4">Hình ảnh</th>
                      <th className="py-3.5 px-4">Tên Workshop</th>
                      <th className="py-3.5 px-4">Loại hình</th>
                      <th className="py-3.5 px-4">Học phí</th>
                      <th className="py-3.5 px-4">Thời lượng</th>
                      <th className="py-3.5 px-4">Sức chứa</th>
                      <th className="py-3.5 px-4">Nghệ nhân</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workshops.map(ws => (
                      <tr key={ws.id} className="border-b border-[#F5F0E5] hover:bg-[#F5F0E5]/30">
                        <td className="py-3 px-4">
                          <img src={ws.image} alt="" className="w-12 h-10 rounded-lg object-cover border border-[#E8DEC8]" />
                        </td>
                        <td className="py-3 px-4 font-bold text-[#17382D] max-w-xs">
                          {ws.title}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-semibold">
                            {ws.categoryLabel}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#17382D]">
                          {formatPrice(ws.price)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{ws.duration}</td>
                        <td className="py-3 px-4 text-gray-600">Tối đa {ws.maxCapacity}</td>
                        <td className="py-3 px-4 font-medium text-[#B69A68]">{ws.artisanName}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditWorkshop(ws)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteWorkshop(ws.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SCHEDULES CRUD ================= */}
        {activeTab === 'schedules' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] font-bold">
                  Quản lý Lịch & Các Ca Học ({schedules.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Mở ca học mới, theo dõi sức chứa, số chỗ đã đăng ký và số chỗ còn trống.
                </p>
              </div>

              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Mở Ca Học Mới</span>
              </button>
            </div>

            {/* Schedules Table */}
            <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F0E5]/60 text-[#17382D] font-bold border-b border-[#E8DEC8]">
                    <tr>
                      <th className="py-3.5 px-4">Mã Ca</th>
                      <th className="py-3.5 px-4">Chương trình Workshop</th>
                      <th className="py-3.5 px-4">Ngày tổ chức</th>
                      <th className="py-3.5 px-4">Khung giờ</th>
                      <th className="py-3.5 px-4">Nghệ nhân</th>
                      <th className="py-3.5 px-4 text-center">Đã Đặt / Tối Đa</th>
                      <th className="py-3.5 px-4">Trạng thái chỗ</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map(sched => {
                      const ws = workshops.find(w => w.id === sched.workshopId);
                      const available = Math.max(0, sched.maxSeats - sched.bookedSeats);

                      return (
                        <tr key={sched.id} className="border-b border-[#F5F0E5] hover:bg-[#F5F0E5]/30">
                          <td className="py-3 px-4 font-mono font-bold text-[#17382D]">{sched.id}</td>
                          <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs line-clamp-1">
                            {ws?.title || sched.workshopId}
                          </td>
                          <td className="py-3 px-4 font-bold text-[#17382D]">{sched.dateDisplay}</td>
                          <td className="py-3 px-4">{sched.timeSlot}</td>
                          <td className="py-3 px-4 text-gray-600">{sched.artisanName}</td>
                          <td className="py-3 px-4 text-center font-bold font-mono">
                            {sched.bookedSeats} / {sched.maxSeats}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              available === 0 ? 'bg-red-100 text-red-800' : available <= 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {available === 0 ? 'Đã kín chỗ' : `Còn ${available} chỗ`}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteSchedule(sched.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                              title="Xóa ca học"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: BOOKINGS MANAGEMENT ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] font-bold">
                  Quản lý Danh sách Đăng ký Học viên ({bookings.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Xác nhận check-in, cập nhật thanh toán và hỗ trợ hủy vé hoàn lại chỗ trống.
                </p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Tìm theo tên học viên, SĐT hoặc mã vé..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FFFDF7] border border-[#E8DEC8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="font-bold text-gray-700">Trạng thái:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="attended">Đã tham gia check-in</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F0E5]/60 text-[#17382D] font-bold border-b border-[#E8DEC8]">
                    <tr>
                      <th className="py-3.5 px-4">Mã Vé</th>
                      <th className="py-3.5 px-4">Học Viên</th>
                      <th className="py-3.5 px-4">Liên Hệ</th>
                      <th className="py-3.5 px-4">Khóa Học</th>
                      <th className="py-3.5 px-4">Ca Học</th>
                      <th className="py-3.5 px-4 text-center">SL</th>
                      <th className="py-3.5 px-4">Học Phí</th>
                      <th className="py-3.5 px-4">Ghi Chú</th>
                      <th className="py-3.5 px-4">Trạng Thái</th>
                      <th className="py-3.5 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(b => (
                      <tr key={b.id} className="border-b border-[#F5F0E5] hover:bg-[#F5F0E5]/30">
                        <td className="py-3 px-4 font-mono font-bold text-[#17382D]">{b.id}</td>
                        <td className="py-3 px-4 font-bold text-gray-900">{b.customerName}</td>
                        <td className="py-3 px-4 text-gray-600">
                          <div>{b.customerPhone}</div>
                          <div className="text-[10px] text-gray-400">{b.customerEmail}</div>
                        </td>
                        <td className="py-3 px-4 max-w-xs line-clamp-1">{b.workshopTitle}</td>
                        <td className="py-3 px-4 text-gray-600 text-[11px]">{b.sessionDate}</td>
                        <td className="py-3 px-4 text-center font-bold">{b.participants}</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">
                          {formatPrice(b.totalPrice)}
                        </td>
                        <td className="py-3 px-4 text-gray-500 max-w-xs text-[11px] italic">
                          {b.customNote || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : b.status === 'attended' ? 'bg-blue-100 text-blue-800' : b.status === 'completed' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'attended' ? 'Đã check-in' : b.status === 'completed' ? 'Đã nhận đồ' : 'Đã hủy'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {b.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(b.id, 'attended')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px]"
                                title="Check-in học viên"
                              >
                                Check-in
                              </button>
                              <button
                                onClick={() => cancelBooking(b.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-[10px]"
                                title="Hủy vé & hoàn lại chỗ"
                              >
                                Hủy vé
                              </button>
                            </>
                          )}
                          {b.status === 'attended' && (
                            <button
                              onClick={() => updateBookingStatus(b.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[10px]"
                            >
                              Hoàn tất
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ARTISANS CRUD ================= */}
        {activeTab === 'artisans' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] font-bold">
                  Quản lý Hồ sơ Nghệ nhân ({artisans.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Cập nhật tiểu sử, thành tựu danh hiệu và chuyên môn truyền thống của các bậc thầy.
                </p>
              </div>

              <button
                onClick={() => setIsArtisanFormOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Nghệ Nhân Mới</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artisans.map(a => (
                <div key={a.id} className="bg-white p-6 rounded-3xl border border-[#E8DEC8] space-y-4 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D3B392]" />
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#17382D]">{a.name}</h4>
                        <p className="text-xs text-[#B69A68] font-medium">{a.experience}</p>
                        <p className="text-[10px] text-gray-400">{a.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 font-light leading-relaxed">
                      {a.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">ID: {a.id}</span>
                    <button
                      onClick={() => deleteArtisan(a.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Xóa nghệ nhân"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: REVIEWS MODERATION ================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#17382D] font-bold">
                Quản lý & Kiểm duyệt Đánh giá Học viên ({reviews.length})
              </h3>
              <p className="text-xs text-gray-500">
                Theo dõi cảm nhận trải nghiệm, ảnh sản phẩm thực tế và xóa nhận xét spam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.studentAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#D3B392]" />
                      <div>
                        <div className="font-bold text-sm text-[#17382D]">{rev.studentName}</div>
                        <div className="text-[10px] text-gray-400">{rev.studentRole} • {rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 font-light leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono text-[11px]">{rev.workshopTitle}</span>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="text-red-500 hover:text-red-700 p-1 flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl text-[#17382D]">Quản lý danh mục sản phẩm ({productsList.length})</h3>
              <p className="text-xs text-gray-500">Danh mục tác phẩm mỹ nghệ khảm xà cừ Chuôn Ngọ.</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F0E5]/60 text-[#17382D] font-bold border-b border-[#E8DEC8]">
                  <tr>
                    <th className="py-3 px-4">Hình ảnh</th>
                    <th className="py-3 px-4">Tên tác phẩm</th>
                    <th className="py-3 px-4">Giá bán</th>
                    <th className="py-3 px-4">Chất liệu ốc</th>
                    <th className="py-3 px-4">Nghệ nhân</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map(p => (
                    <tr key={p.id} className="border-b border-[#F5F0E5]">
                      <td className="py-3 px-4">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      </td>
                      <td className="py-3 px-4 font-bold text-[#17382D]">{p.name}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">{formatPrice(p.price)}</td>
                      <td className="py-3 px-4 text-gray-600">{p.shellType}</td>
                      <td className="py-3 px-4 text-gray-600">{p.artisan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 8: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-serif text-xl text-[#17382D]">Quản lý đơn hàng thủ công mỹ nghệ</h3>
            <div className="space-y-3">
              {ordersList.map((ord, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>Mã Đơn: {ord.orderId}</span>
                    <span className="text-emerald-700">{formatPrice(ord.total)}</span>
                  </div>
                  <div>Khách hàng: {ord.customer?.fullName} • SĐT: {ord.customer?.phone}</div>
                  <div>Trạng thái: <strong>{ord.status}</strong></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 9: QR PASSPORT ================= */}
        {activeTab === 'qr-generator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl text-[#17382D]">Bộ công cụ phát hành Tem QR Passport Di sản</h3>
              <p className="text-xs text-gray-500">
                Tạo mã định danh số vĩnh cửu cho tác phẩm và chứng chỉ hoàn thành workshop.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-4">
                <form onSubmit={handleGeneratePassport} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Mã Serial Number *</label>
                    <input
                      type="text"
                      required
                      value={newSerial}
                      onChange={(e) => setNewSerial(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-[#E8DEC8] rounded-xl font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Chất liệu gỗ *</label>
                    <input
                      type="text"
                      value={qrWood}
                      onChange={(e) => setQrWood(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Xuất xứ xà cừ *</label>
                    <input
                      type="text"
                      value={qrShell}
                      onChange={(e) => setQrShell(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] font-bold text-xs flex items-center justify-center gap-2 mt-4"
                  >
                    <QrCode className="w-4 h-4 text-[#D3B392]" />
                    <span>Xác thực & Tạo Tem QR mới</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#17382D] text-[#FFFDF7] p-6 rounded-2xl border border-[#B69A68] text-center space-y-3">
                  <span className="text-xs font-mono text-[#D8C29D]">MẪU IN TEM LASER & QR CODE</span>
                  <div className="w-36 h-36 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center border-2 border-[#B69A68]">
                    <QrCode className="w-28 h-28 text-[#17382D]" />
                    <span className="text-[9px] font-mono text-gray-800 font-bold">{newSerial}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= MODAL: ADD / EDIT WORKSHOP ================= */}
      {isWorkshopModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFDF7] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#B69A68] space-y-4 shadow-2xl my-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
              <h3 className="font-serif text-xl text-[#17382D] font-bold">
                {editingWorkshopId ? 'Cập Nhật Workshop' : 'Thêm Chương Trình Workshop Mới'}
              </h3>
              <button onClick={() => setIsWorkshopModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkshop} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tên chương trình workshop *</label>
                <input
                  type="text"
                  required
                  value={wsTitle}
                  onChange={(e) => setWsTitle(e.target.value)}
                  placeholder="VD: Nghệ Thuật Cưa Lọng Khảm Trai Hiện Đại"
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phân loại *</label>
                  <select
                    value={wsCategory}
                    onChange={(e) => {
                      setWsCategory(e.target.value);
                      if (e.target.value === 'offline-village') setWsCategoryLabel('Làng Chuôn Ngọ');
                      if (e.target.value === 'offline-studio') setWsCategoryLabel('Studio Hà Nội');
                      if (e.target.value === 'family') setWsCategoryLabel('Gia đình & Trẻ em');
                      if (e.target.value === 'online-diy') setWsCategoryLabel('Trực tuyến & DIY Kit');
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  >
                    <option value="offline-studio">Studio Hà Nội</option>
                    <option value="offline-village">Làng Chuôn Ngọ</option>
                    <option value="family">Gia đình & Trẻ em</option>
                    <option value="online-diy">Trực tuyến & DIY Kit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Học phí (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={wsPrice}
                    onChange={(e) => setWsPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Thời lượng *</label>
                  <input
                    type="text"
                    required
                    value={wsDuration}
                    onChange={(e) => setWsDuration(e.target.value)}
                    placeholder="VD: 3.5 giờ"
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Sức chứa tối đa / ca *</label>
                  <input
                    type="number"
                    required
                    value={wsMaxCapacity}
                    onChange={(e) => setWsMaxCapacity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nghệ nhân phụ trách *</label>
                <select
                  value={wsArtisanName}
                  onChange={(e) => {
                    setWsArtisanName(e.target.value);
                    const found = artisans.find(a => a.name === e.target.value);
                    if (found) setWsArtisanId(found.id);
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                >
                  {artisans.map(a => (
                    <option key={a.id} value={a.name}>{a.name} ({a.experience})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Địa điểm tổ chức *</label>
                <input
                  type="text"
                  required
                  value={wsLocation}
                  onChange={(e) => setWsLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Mô tả ngắn gọn *</label>
                <textarea
                  rows={2}
                  required
                  value={wsShortDesc}
                  onChange={(e) => setWsShortDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setIsWorkshopModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#17382D] text-[#FFFDF7] rounded-xl font-bold"
                >
                  {editingWorkshopId ? 'Lưu Thay Đổi' : 'Thêm Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD SCHEDULE ================= */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#B69A68] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
              <h3 className="font-serif text-xl text-[#17382D] font-bold">Mở Ca Học Mới</h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Workshop *</label>
                <select
                  value={schedWorkshopId}
                  onChange={(e) => setSchedWorkshopId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                >
                  {workshops.map(w => (
                    <option key={w.id} value={w.id}>{w.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Ngày (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={schedDate}
                    onChange={(e) => {
                      setSchedDate(e.target.value);
                      const d = new Date(e.target.value);
                      const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                      setSchedDateDisplay(`${days[d.getDay()]}, ${d.toLocaleDateString('vi-VN')}`);
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Khung giờ *</label>
                  <input
                    type="text"
                    required
                    value={schedTimeSlot}
                    onChange={(e) => setSchedTimeSlot(e.target.value)}
                    placeholder="VD: 09:00 - 12:30"
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Buổi / Ca *</label>
                  <select
                    value={schedShift}
                    onChange={(e) => setSchedShift(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  >
                    <option value="morning">Sáng (09:00 - 12:30)</option>
                    <option value="afternoon">Chiều (13:30 - 17:30)</option>
                    <option value="allday">Cả ngày (Làng nghề)</option>
                    <option value="evening">Tối (Trực tuyến Zoom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số chỗ tối đa *</label>
                  <input
                    type="number"
                    required
                    value={schedMaxSeats}
                    onChange={(e) => setSchedMaxSeats(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Địa điểm *</label>
                <input
                  type="text"
                  required
                  value={schedLocation}
                  onChange={(e) => setSchedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#17382D] text-[#FFFDF7] rounded-xl font-bold"
                >
                  Mở Ca Học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD ARTISAN ================= */}
      {isArtisanFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#B69A68] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
              <h3 className="font-serif text-xl text-[#17382D] font-bold">Thêm Hồ Sơ Nghệ Nhân Mới</h3>
              <button onClick={() => setIsArtisanFormOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArtisan} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Họ tên Nghệ nhân *</label>
                <input
                  type="text"
                  required
                  value={artName}
                  onChange={(e) => setArtName(e.target.value)}
                  placeholder="VD: Nghệ nhân Bàn tay Vàng Trần Bá Dinh"
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Chức danh / Danh hiệu *</label>
                  <input
                    type="text"
                    required
                    value={artRole}
                    onChange={(e) => setArtRole(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số năm kinh nghiệm *</label>
                  <input
                    type="text"
                    required
                    value={artExp}
                    onChange={(e) => setArtExp(e.target.value)}
                    placeholder="VD: 35 năm tuổi nghề"
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Chuyên môn sở trường *</label>
                <input
                  type="text"
                  required
                  value={artSpecialty}
                  onChange={(e) => setArtSpecialty(e.target.value)}
                  placeholder="VD: Kỹ thuật cưa lọng nét chỉ tơ & cẩn ốc đỏ"
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Triết lý nghề nghiệp</label>
                <input
                  type="text"
                  value={artQuote}
                  onChange={(e) => setArtQuote(e.target.value)}
                  placeholder="Câu nói tâm đắc của nghệ nhân"
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tiểu sử tóm tắt</label>
                <textarea
                  rows={2}
                  value={artBio}
                  onChange={(e) => setArtBio(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setIsArtisanFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#17382D] text-[#FFFDF7] rounded-xl font-bold"
                >
                  Lưu Nghệ Nhân
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
