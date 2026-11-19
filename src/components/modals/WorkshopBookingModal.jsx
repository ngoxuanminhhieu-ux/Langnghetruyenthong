import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useWorkshop } from '../../context/WorkshopContext';
import { X, Calendar, Users, MapPin, CheckCircle, Sparkles, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkshopBookingModal = () => {
  const { isWorkshopModalOpen, setIsWorkshopModalOpen, activeWorkshop, user, showToast } = useApp();
  const { bookWorkshop, schedules } = useWorkshop();

  const [participants, setParticipants] = useState(1);
  const [name, setName] = useState(user?.name || 'Nguyễn Minh Anh');
  const [phone, setPhone] = useState(user?.phone || '0988 123 456');
  const [email, setEmail] = useState(user?.email || 'minhanh.heritage@gmail.com');
  const [note, setNote] = useState('');
  const [bookedData, setBookedData] = useState(null);

  if (!isWorkshopModalOpen || !activeWorkshop) return null;

  // Find a matching schedule
  const wsSchedules = schedules.filter(s => s.workshopId === activeWorkshop.id && s.status !== 'full');
  const defaultSchedule = wsSchedules[0] || schedules[0];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const totalCost = (activeWorkshop.price || 650000) * participants;

  const handleBooking = (e) => {
    e.preventDefault();
    if (defaultSchedule) {
      const res = bookWorkshop({
        workshopId: activeWorkshop.id,
        scheduleId: defaultSchedule.id,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        participants,
        customNote: note,
        paymentMethod: 'deposit50'
      });
      if (res.success) {
        setBookedData(res.booking);
      }
    } else {
      setBookedData({
        id: 'WBK-' + Math.floor(10000 + Math.random() * 90000),
        sessionDate: 'Cuối tuần này'
      });
      confetti({ particleCount: 100, spread: 70 });
      showToast('Đăng ký workshop thành công! Nghệ nhân Chuôn Ngọ đã lưu lịch hẹn.');
    }
  };

  const handleClose = () => {
    setBookedData(null);
    setIsWorkshopModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#D3B392] shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!bookedData ? (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B69A68] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Đặt Chỗ Trải Nghiệm Làng Nghề
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#17382D]">
                {activeWorkshop.title}
              </h3>
              <p className="text-xs text-gray-500">
                {activeWorkshop.categoryLabel || activeWorkshop.type} • Hướng dẫn: {activeWorkshop.artisanName || activeWorkshop.artisan}
              </p>
            </div>

            <div className="p-3 bg-[#F5F0E5]/60 rounded-xl border border-[#E8DEC8] flex items-center justify-between text-xs">
              <span className="text-gray-600">Học phí:</span>
              <span className="font-serif font-bold text-base text-[#17382D]">
                {formatPrice(activeWorkshop.price)} / người
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Họ và tên người tham gia *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:border-[#17382D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số lượng người *</label>
                  <select
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} người</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email nhận vé điện tử *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Ghi chú (khắc tên / dòng điện thoại)</label>
                <input
                  type="text"
                  placeholder="VD: Dòng máy iPhone 16 Pro Max, khắc tên..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Tổng chi phí ({participants} người):</span>
                <span className="font-serif font-bold text-lg text-[#17382D]">
                  {formatPrice(totalCost)}
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Xác nhận đặt lịch</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#17382D] text-[#D8C29D] mx-auto flex items-center justify-center font-bold text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-[#17382D]">Đặt lịch workshop thành công!</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
              Chuôn Ngọ Heritage đã ghi nhận mã vé <strong>#{bookedData.id}</strong>. Thông tin xác nhận và mã QR đã được gửi về số điện thoại <strong>{phone}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-[#17382D] text-[#FFFDF7] font-bold text-xs"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
