import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';

export const WorkshopCalendarView = ({ onSelectWorkshop, onBookSession }) => {
  const { schedules, workshops } = useWorkshop();
  const [filterShift, setFilterShift] = useState('all'); // all, morning, afternoon, evening, allday
  const [filterWorkshop, setFilterWorkshop] = useState('all');

  // Filter schedules
  const filteredSchedules = schedules.filter(s => {
    if (filterShift !== 'all' && s.shift !== filterShift) return false;
    if (filterWorkshop !== 'all' && s.workshopId !== filterWorkshop) return false;
    return true;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Calendar Header Intro */}
      <div className="bg-[#101813] rounded-3xl p-6 sm:p-10 text-[#FFFDF7] border border-[#D3B392]/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17382D] text-[#D3B392] text-xs font-semibold uppercase tracking-wider border border-[#D3B392]/40">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Lịch Vận Hành Thời Gian Thực</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-[#FFFDF7] font-bold">
            Lịch Tổ Chức & Tình Trạng Chỗ Trống
          </h2>

          <p className="text-xs sm:text-sm text-[#F5F0E5]/80 font-light leading-relaxed">
            Hệ thống tự động đồng bộ số lượng chỗ còn lại theo thời gian thực. Mỗi ca học chỉ nhận từ 8 đến 12 học viên để đảm bảo chất lượng hướng dẫn 1-1 của nghệ nhân.
          </p>

          {/* Quick Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-gray-300">Còn nhiều chỗ trống</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-gray-300">Sắp hết chỗ (≤ 2 chỗ)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="text-gray-300">Đã đủ số lượng học viên</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#D3B392]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DEC8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Filter by Shift */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <span className="font-bold text-[#17382D] mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#B69A68]" />
            Ca học:
          </span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'morning', label: 'Ca Sáng (09:00 - 12:30)' },
            { id: 'afternoon', label: 'Ca Chiều (13:30 - 17:30)' },
            { id: 'allday', label: 'Cả ngày (Làng nghề)' },
            { id: 'evening', label: 'Tối Trực tuyến' }
          ].map(shift => (
            <button
              key={shift.id}
              onClick={() => setFilterShift(shift.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                filterShift === shift.id
                  ? 'bg-[#17382D] text-[#FFFDF7] shadow-xs'
                  : 'bg-[#F5F0E5] text-gray-700 hover:bg-[#E8DEC8]'
              }`}
            >
              {shift.label}
            </button>
          ))}
        </div>

        {/* Filter by Workshop */}
        <div className="text-xs shrink-0 flex items-center gap-2">
          <span className="font-bold text-[#17382D]">Chương trình:</span>
          <select
            value={filterWorkshop}
            onChange={(e) => setFilterWorkshop(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#17382D]"
          >
            <option value="all">Tất cả các chương trình</option>
            {workshops.map(w => (
              <option key={w.id} value={w.id}>{w.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {filteredSchedules.map((sched) => {
          const ws = workshops.find(w => w.id === sched.workshopId) || workshops[0];
          const availableSeats = Math.max(0, sched.maxSeats - sched.bookedSeats);
          const percentBooked = Math.round((sched.bookedSeats / sched.maxSeats) * 100);
          const isFull = sched.status === 'full' || availableSeats === 0;
          const isFilling = !isFull && availableSeats <= 2;

          // Parse date parts for modern date badge
          const dateParts = sched.date.split('-');
          const day = dateParts[2];
          const month = `T${Number(dateParts[1])}`;

          return (
            <div
              key={sched.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 shadow-xs hover:shadow-md grid grid-cols-1 lg:grid-cols-12 gap-5 items-center ${
                isFull ? 'border-gray-200 opacity-80' : isFilling ? 'border-amber-400/80 bg-amber-50/10' : 'border-[#E8DEC8] hover:border-[#B69A68]'
              }`}
            >
              {/* Date Block (2 cols) */}
              <div className="lg:col-span-2 flex items-center lg:flex-col justify-start lg:justify-center p-3 rounded-2xl bg-[#F5F0E5]/80 border border-[#E8DEC8] text-center gap-3 lg:gap-1">
                <div className="font-serif font-bold text-2xl sm:text-3xl text-[#17382D]">
                  {day}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#B69A68] uppercase">Tháng {month}</div>
                  <div className="text-[10px] text-gray-500 font-medium">2026</div>
                </div>
              </div>

              {/* Workshop & Session Info (6 cols) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#17382D]/10 text-[#17382D] text-[10px] font-bold uppercase">
                    {ws.categoryLabel}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-semibold text-[#B69A68]">
                    {sched.artisanName}
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectWorkshop(ws.id)}
                  className="font-serif text-lg sm:text-xl text-[#17382D] font-bold hover:text-[#B69A68] cursor-pointer transition-colors leading-snug"
                >
                  {ws.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1 font-semibold text-gray-800">
                    <Clock className="w-3.5 h-3.5 text-[#B69A68]" />
                    {sched.timeSlot}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B69A68]" />
                    {sched.location}
                  </span>
                </div>
              </div>

              {/* Capacity & Seats (2 cols) */}
              <div className="lg:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Chỗ trống:</span>
                  <span className={`font-bold ${
                    isFull ? 'text-red-600' : isFilling ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    {isFull ? 'Hết chỗ' : `Còn ${availableSeats} chỗ`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFull ? 'bg-red-500' : isFilling ? 'bg-amber-500' : 'bg-[#17382D]'
                    }`}
                    style={{ width: `${percentBooked}%` }}
                  />
                </div>
                <div className="text-[10px] text-gray-400 text-right">
                  Đã đăng ký {sched.bookedSeats}/{sched.maxSeats} học viên
                </div>
              </div>

              {/* Booking CTA (2 cols) */}
              <div className="lg:col-span-2 flex flex-col items-end justify-center space-y-1">
                <div className="font-serif font-bold text-lg text-[#17382D]">
                  {formatPrice(ws.price)}
                </div>

                <button
                  disabled={isFull}
                  onClick={() => onBookSession(ws, sched)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isFull
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : isFilling
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                      : 'bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] shadow-md'
                  }`}
                >
                  {isFull ? (
                    <span>Đã kín chỗ</span>
                  ) : (
                    <>
                      <span>Đăng ký ca này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
