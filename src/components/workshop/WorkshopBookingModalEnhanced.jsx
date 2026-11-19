import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  CreditCard,
  Tag,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';
import { useApp } from '../../context/AppContext';

export const WorkshopBookingModalEnhanced = () => {
  const { 
    isBookingModalOpen, 
    closeBooking, 
    bookingWorkshop, 
    preselectedSchedule, 
    schedules, 
    checkCapacity, 
    bookWorkshop 
  } = useWorkshop();
  const { user, showToast } = useApp();

  // Form states
  const [selectedScheduleId, setSelectedScheduleId] = useState('');
  const [participants, setParticipants] = useState(1);
  const [name, setName] = useState(user?.name || 'Nguyễn Minh Anh');
  const [phone, setPhone] = useState(user?.phone || '0988 123 456');
  const [email, setEmail] = useState(user?.email || 'minhanh.heritage@gmail.com');
  const [customNote, setCustomNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('deposit50'); // 'deposit50' or 'full'

  // Result state
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Available schedules for current booking workshop
  const availableSchedules = bookingWorkshop 
    ? schedules.filter(s => s.workshopId === bookingWorkshop.id && s.status !== 'full')
    : [];

  useEffect(() => {
    if (preselectedSchedule) {
      setSelectedScheduleId(preselectedSchedule.id);
    } else if (availableSchedules.length > 0) {
      setSelectedScheduleId(availableSchedules[0].id);
    }
    setBookingSuccessData(null);
    setPromoApplied(false);
    setPromoCode('');
  }, [bookingWorkshop, preselectedSchedule]);

  if (!isBookingModalOpen || !bookingWorkshop) return null;

  const currentSchedule = schedules.find(s => s.id === selectedScheduleId);
  const availableSeats = currentSchedule ? Math.max(0, currentSchedule.maxSeats - currentSchedule.bookedSeats) : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Price calculation
  const unitPrice = bookingWorkshop.price;
  const subtotal = unitPrice * participants;
  let discountPercent = 0;
  if (promoApplied) {
    const code = promoCode.trim().toUpperCase();
    if (code === 'CHUONNGO10' || code === 'GENZ2026') discountPercent = 0.1;
    if (code === 'HERITAGE20') discountPercent = 0.2;
  }
  const discountAmount = Math.round(subtotal * discountPercent);
  const totalCost = subtotal - discountAmount;
  const payableNow = paymentMethod === 'full' ? totalCost : Math.round(totalCost * 0.5);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'CHUONNGO10' || code === 'GENZ2026' || code === 'HERITAGE20') {
      setPromoApplied(true);
      showToast(`Áp dụng mã ${code} thành công!`);
    } else {
      showToast('Mã ưu đãi không hợp lệ. Hãy thử: CHUONNGO10 hoặc GENZ2026', 'error');
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedScheduleId) {
      showToast('Vui lòng chọn ca học phù hợp', 'error');
      return;
    }

    if (participants > availableSeats) {
      showToast(`Số người (${participants}) vượt quá số chỗ trống (${availableSeats})!`, 'error');
      return;
    }

    const res = bookWorkshop({
      workshopId: bookingWorkshop.id,
      scheduleId: selectedScheduleId,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      participants,
      customNote,
      promoCode: promoApplied ? promoCode : '',
      paymentMethod
    });

    if (res.success) {
      setBookingSuccessData(res.booking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#D3B392] shadow-2xl my-6 flex flex-col text-[#2B1E16]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#17382D] to-[#2B1E16] text-[#FFFDF7] p-5 sm:p-6 border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D3B392] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Đăng Ký Khóa Học Di Sản
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {bookingWorkshop.title}
            </h3>
          </div>

          <button
            onClick={closeBooking}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#101813] text-white flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh]">
          {!bookingSuccessData ? (
            /* STEP 1: BOOKING FORM */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Workshop Summary Card */}
              <div className="p-4 bg-[#F5F0E5] rounded-2xl border border-[#E8DEC8] flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[#17382D] block">{bookingWorkshop.categoryLabel}</span>
                  <span className="text-gray-600">Thời lượng: <strong>{bookingWorkshop.duration}</strong> • Hướng dẫn: <strong>{bookingWorkshop.artisanName}</strong></span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block text-[11px]">Học phí / người:</span>
                  <span className="font-serif font-bold text-base text-[#17382D]">
                    {formatPrice(bookingWorkshop.price)}
                  </span>
                </div>
              </div>

              {/* 1. Select Schedule Session */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#17382D] uppercase tracking-wider">
                  1. Chọn Ca Học & Ngày Trải Nghiệm *
                </label>

                {availableSchedules.length === 0 ? (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Hiện tất cả các ca của workshop này đã kín chỗ. Vui lòng chọn workshop khác hoặc liên hệ hotline để mở thêm ca mới.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableSchedules.map(sched => {
                      const seats = Math.max(0, sched.maxSeats - sched.bookedSeats);
                      const isSelected = selectedScheduleId === sched.id;

                      return (
                        <div
                          key={sched.id}
                          onClick={() => {
                            setSelectedScheduleId(sched.id);
                            if (participants > seats) setParticipants(seats || 1);
                          }}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D] shadow-md ring-2 ring-[#B69A68]/50'
                              : 'bg-white hover:bg-[#F5F0E5]/60 border-[#E8DEC8] text-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-xs">{sched.dateDisplay}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-[#D3B392] text-[#101813]' : seats <= 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              Còn {seats} chỗ
                            </span>
                          </div>
                          <div className={`text-[11px] mt-1 flex items-center gap-1 ${isSelected ? 'text-[#D3B392]' : 'text-gray-500'}`}>
                            <Clock className="w-3 h-3" />
                            <span>{sched.timeSlot}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Number of Participants & Capacity Validation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#17382D] uppercase tracking-wider">
                    2. Số Lượng Người Tham Gia *
                  </label>
                  <span className="text-xs text-gray-500">
                    (Ca học hiện còn: <strong className="text-emerald-700">{availableSeats} chỗ</strong>)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E8DEC8] rounded-xl bg-white overflow-hidden shadow-xs">
                    <button
                      type="button"
                      disabled={participants <= 1}
                      onClick={() => setParticipants(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-[#F5F0E5] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-[#17382D]">
                      {participants}
                    </span>
                    <button
                      type="button"
                      disabled={participants >= availableSeats}
                      onClick={() => {
                        if (participants < availableSeats) {
                          setParticipants(prev => prev + 1);
                        } else {
                          showToast(`Chỉ còn ${availableSeats} chỗ trống cho ca học này!`, 'info');
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-[#F5F0E5] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xs text-gray-500">
                    {participants > 1 ? `Nhóm ${participants} người (Được xếp bàn liền kề)` : '1 người tham gia'}
                  </span>
                </div>

                {availableSeats > 0 && participants >= availableSeats && (
                  <p className="text-[11px] text-amber-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Bạn đã chọn tối đa số chỗ còn lại của ca học này.
                  </p>
                )}
              </div>

              {/* 3. Attendee Personal Information */}
              <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
                <label className="block text-xs font-bold text-[#17382D] uppercase tracking-wider">
                  3. Thông Tin Người Đại Diện Đăng Ký *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="block text-gray-700 font-semibold mb-1">Họ và tên *</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Minh Anh"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#17382D]"
                    />
                  </div>

                  <div>
                    <span className="block text-gray-700 font-semibold mb-1">Số điện thoại liên hệ *</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0988 123 456"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#17382D]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <span className="block text-gray-700 font-semibold mb-1">Email nhận vé số & mã QR *</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="minhanh.heritage@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#17382D]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <span className="block text-gray-700 font-semibold mb-1">
                      Yêu cầu riêng / Khắc tên cá nhân hóa / Dòng điện thoại (nếu có)
                    </span>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="VD: Dòng máy iPhone 16 Pro Max - Khắc chữ 'Minh Anh' lên ốp"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#17382D]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Promo Code & Payment Option */}
              <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
                <label className="block text-xs font-bold text-[#17382D] uppercase tracking-wider">
                  4. Mã Ưu Đãi & Phương Thức Thanh Toán
                </label>

                {/* Promo Code Input */}
                <div className="flex gap-2 text-xs">
                  <div className="relative flex-grow">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Nhập mã ưu đãi (VD: CHUONNGO10, GENZ2026)"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none font-mono uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] font-semibold rounded-xl text-xs shrink-0 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>

                {promoApplied && (
                  <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã giảm {discountPercent * 100}% học phí (-{formatPrice(discountAmount)})
                  </p>
                )}

                {/* Payment Option Selector */}
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div
                    onClick={() => setPaymentMethod('deposit50')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'deposit50'
                        ? 'bg-[#F5F0E5] border-[#17382D] text-[#17382D] font-bold shadow-xs'
                        : 'bg-white border-[#E8DEC8] text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'deposit50'}
                        onChange={() => setPaymentMethod('deposit50')}
                        className="text-[#17382D]"
                      />
                      <span>Đặt cọc 50% giữ chỗ</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 pl-5">
                      Thanh toán trước: {formatPrice(Math.round(totalCost * 0.5))}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('full')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'full'
                        ? 'bg-[#F5F0E5] border-[#17382D] text-[#17382D] font-bold shadow-xs'
                        : 'bg-white border-[#E8DEC8] text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'full'}
                        onChange={() => setPaymentMethod('full')}
                        className="text-[#17382D]"
                      />
                      <span>Thanh toán 100% trọn gói</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 pl-5">
                      Thanh toán trước: {formatPrice(totalCost)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Footer */}
              <div className="p-4 bg-[#101813] text-[#FFFDF7] rounded-2xl border border-[#D3B392]/40 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Học phí ({participants} người):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D3B392]">
                    <span>Ưu đãi di sản:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-sm">Số tiền cần thanh toán:</span>
                  <span className="font-serif font-bold text-xl text-[#D3B392]">
                    {formatPrice(payableNow)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={availableSeats === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#17382D] via-[#244A3D] to-[#2B1E16] hover:from-[#244A3D] hover:to-[#3D261A] text-[#FFFDF7] font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 text-[#D3B392]" />
                <span>Xác nhận đăng ký & Nhận vé di sản số</span>
              </button>
            </form>
          ) : (
            /* STEP 2: SUCCESS RECEIPT WITH DIGITAL HERITAGE TICKET */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              
              {/* Congratulation banner */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#B69A68]">
                  Đăng Ký Thành Công!
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17382D]">
                  Chào Mừng Bạn Đến Với Chuôn Ngọ
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto font-light">
                  Lịch hẹn trải nghiệm của bạn đã được lưu vào hệ thống làng nghề. Nghệ nhân Chuôn Ngọ đã sẵn sàng đón tiếp bạn!
                </p>
              </div>

              {/* DIGITAL PASS TICKET CARD */}
              <div className="bg-[#101813] text-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-2 border-[#D3B392] shadow-2xl text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#D3B392]/30">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-[#FFFDF7]">Chuôn Ngọ Heritage</span>
                    <span className="text-[10px] font-mono text-[#D3B392] uppercase bg-[#17382D] px-2 py-0.5 rounded">
                      Vé Di Sản Số
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#D3B392] font-bold">
                    #{bookingSuccessData.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-8 space-y-2 text-xs">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase">Khóa học trải nghiệm</div>
                      <div className="font-serif font-bold text-base text-[#D3B392]">
                        {bookingSuccessData.workshopTitle}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase">Thời gian</div>
                        <div className="font-semibold text-[#FFFDF7]">{bookingSuccessData.sessionDate}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase">Học viên ({bookingSuccessData.participants} người)</div>
                        <div className="font-semibold text-[#FFFDF7]">{bookingSuccessData.customerName}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-gray-400 uppercase">Địa điểm</div>
                      <div className="text-gray-300 font-light">{bookingSuccessData.location}</div>
                    </div>

                    {bookingSuccessData.customNote && (
                      <div className="p-2 rounded bg-black/40 border border-[#D3B392]/20 text-[11px] text-gray-300">
                        Ghi chú khắc: {bookingSuccessData.customNote}
                      </div>
                    )}
                  </div>

                  {/* QR Ticket Code Box */}
                  <div className="sm:col-span-4 bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-md">
                    <QrCode className="w-24 h-24 text-[#101813]" />
                    <span className="text-[9px] font-mono font-bold text-gray-800 mt-1">
                      {bookingSuccessData.qrCode}
                    </span>
                    <span className="text-[8px] text-gray-500">Mã Check-in vào xưởng</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D3B392]/20 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Trạng thái: <strong className="text-emerald-400">Đã xác nhận giữ chỗ</strong></span>
                  <span>Đã thanh toán: <strong className="text-[#D3B392]">{formatPrice(bookingSuccessData.paidAmount)}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast('Đã lưu mã vé QR vào tài khoản cá nhân!');
                    closeBooking();
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hoàn tất & Về trang Workshop</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
