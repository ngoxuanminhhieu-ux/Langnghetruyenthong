import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Check, 
  Sparkles, 
  ArrowRight,
  Star
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';

export const WorkshopCard = ({ workshop, onDetailClick, onBookClick }) => {
  const { schedules } = useWorkshop();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Find next upcoming schedule for this workshop
  const upcomingSchedules = schedules.filter(s => s.workshopId === workshop.id);
  const nextSchedule = upcomingSchedules.find(s => s.status !== 'full') || upcomingSchedules[0];
  const seatsLeft = nextSchedule ? Math.max(0, nextSchedule.maxSeats - nextSchedule.bookedSeats) : 0;

  return (
    <div className="bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Workshop Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17382D]/10">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-[#101813]/90 text-[#D3B392] text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border border-[#D3B392]/40 shadow-md">
          {workshop.categoryLabel || workshop.level}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-[#FFFDF7] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{workshop.rating}</span>
          <span className="text-[10px] text-gray-300">({workshop.reviewsCount})</span>
        </div>

        {/* Available seats pill */}
        <div className="absolute bottom-3 right-3 bg-[#17382D]/95 backdrop-blur-md text-[#FFFDF7] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#D3B392]/30 flex items-center gap-1.5 shadow-md">
          <span className={`w-2 h-2 rounded-full ${seatsLeft > 3 ? 'bg-emerald-400' : seatsLeft > 0 ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`} />
          <span>{seatsLeft > 0 ? `Còn ${seatsLeft} chỗ trống` : 'Đã kín chỗ ca tới'}</span>
        </div>
      </div>

      {/* Workshop Body */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata tags */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-medium">
            <span className="flex items-center gap-1 text-[#17382D]">
              <Clock className="w-3.5 h-3.5 text-[#B69A68]" />
              {workshop.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#17382D]">
              <Users className="w-3.5 h-3.5 text-[#B69A68]" />
              Tối đa {workshop.maxCapacity} người
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={onDetailClick}
            className="font-serif text-xl text-[#17382D] font-bold group-hover:text-[#B69A68] transition-colors leading-snug cursor-pointer"
          >
            {workshop.title}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed line-clamp-2">
            {workshop.shortDesc}
          </p>

          {/* Artisan & Location */}
          <div className="pt-2 border-t border-[#F5F0E5] space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#17382D]">Nghệ nhân:</span>
              <span className="text-[#B69A68] font-medium">{workshop.artisanName}</span>
            </div>
            <div className="flex items-start gap-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#B69A68] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{workshop.location}</span>
            </div>
          </div>

          {/* Included sample perks */}
          <div className="p-3 bg-[#F5F0E5]/60 rounded-xl border border-[#E8DEC8] text-xs space-y-1">
            <div className="font-semibold text-[#17382D] text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B69A68]" />
              Đặc quyền khóa học:
            </div>
            <p className="text-gray-600 text-[11px] line-clamp-1">
              ✓ {workshop.includes[0]}
            </p>
            <p className="text-gray-600 text-[11px] line-clamp-1">
              ✓ {workshop.includes[1]}
            </p>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-4 border-t border-[#E8DEC8] space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-gray-500">Học phí trọn gói:</span>
            <div className="text-right">
              <div className="font-serif font-bold text-xl sm:text-2xl text-[#17382D]">
                {formatPrice(workshop.price)}
              </div>
              {workshop.originalPrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(workshop.originalPrice)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={onDetailClick}
              className="w-full py-2.5 rounded-xl border border-[#17382D] text-[#17382D] hover:bg-[#17382D] hover:text-[#FFFDF7] font-semibold text-xs transition-colors text-center"
            >
              Xem chi tiết
            </button>

            <button
              onClick={onBookClick}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#17382D] to-[#2B1E16] hover:from-[#244A3D] hover:to-[#3D261A] text-[#FFFDF7] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1"
            >
              <span>Đăng ký ngay</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D3B392]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
