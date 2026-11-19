import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Sparkles, 
  Award, 
  Play, 
  Star, 
  ShieldCheck, 
  Share2, 
  Heart,
  ChevronRight,
  BookOpen,
  Eye,
  Wrench,
  Palette
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';
import { useApp } from '../../context/AppContext';

export const WorkshopDetailView = ({ workshopId, onBack, onBookWorkshop, onOpenArtisanProfile, onOpenReviewModal }) => {
  const { workshops, schedules, workshopSteps, reviews, artisans } = useWorkshop();
  const { setIsVideoModalOpen, showToast } = useApp();

  const workshop = workshops.find(w => w.id === workshopId) || workshops[0];
  const [selectedImage, setSelectedImage] = useState(workshop.gallery ? workshop.gallery[0] : workshop.image);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Find artisan
  const artisan = artisans.find(a => a.id === workshop.artisanId) || {
    name: workshop.artisanName,
    role: 'Nghệ nhân Làng Chuôn Ngọ',
    experience: 'Nhiều năm kinh nghiệm',
    image: '/images/artisan_truong_kim_thanh.jpg',
    quote: 'Mỗi vỏ ốc xà cừ thô ráp đều ẩn chứa vầng hào quang của đất trời.'
  };

  // Find upcoming sessions for this workshop
  const workshopSchedules = schedules.filter(s => s.workshopId === workshop.id);

  // Filter reviews for this workshop
  const workshopReviews = reviews.filter(r => r.workshopId === workshop.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết Workshop vào bộ nhớ tạm!');
  };

  // Icon mapping for 6 steps
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#D3B392]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#D3B392]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-[#D3B392]" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#D3B392]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#D3B392]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#D3B392]" />;
      default: return <Sparkles className="w-5 h-5 text-[#D3B392]" />;
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DEC8]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#17382D] hover:text-[#B69A68] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách chương trình</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#E8DEC8] hover:bg-[#F5F0E5] text-gray-700 transition-colors"
              title="Chia sẻ workshop"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Gallery Col (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-md bg-black">
              <img
                src={selectedImage}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />

              {/* Video button trigger */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute bottom-4 left-4 bg-[#101813]/85 hover:bg-[#101813] text-[#FFFDF7] text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md border border-[#D3B392]/50 flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <div className="w-5 h-5 rounded-full bg-[#D3B392] text-[#101813] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Xem video phóng sự xưởng nghề (3:45)</span>
              </button>

              <div className="absolute top-4 left-4 bg-[#17382D]/90 text-[#D3B392] text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border border-[#D3B392]/30">
                {workshop.categoryLabel}
              </div>
            </div>

            {/* Thumbnail selector */}
            {workshop.gallery && workshop.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {workshop.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img ? 'border-[#B69A68] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Info & Quick Book Card Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
                  {workshop.level}
                </span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{workshop.rating} ({workshop.reviewsCount} đánh giá)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17382D] font-bold leading-tight">
                {workshop.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {workshop.shortDesc}
              </p>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E8DEC8] text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F0E5] flex items-center justify-center text-[#B69A68]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px]">Thời lượng</div>
                    <div className="font-semibold text-[#17382D]">{workshop.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F0E5] flex items-center justify-center text-[#B69A68]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px]">Quy mô lớp</div>
                    <div className="font-semibold text-[#17382D]">Tối đa {workshop.maxCapacity} người</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F0E5] flex items-center justify-center text-[#B69A68] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px]">Địa điểm tổ chức</div>
                    <div className="font-semibold text-[#17382D] line-clamp-1">{workshop.location}</div>
                  </div>
                </div>
              </div>

              {/* Price card */}
              <div className="p-4 bg-gradient-to-r from-[#17382D]/10 to-[#B69A68]/15 rounded-2xl border border-[#D3B392]/50 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-600 block">Học phí trọn gói trọn gói / người:</span>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#17382D]">
                    {formatPrice(workshop.price)}
                  </div>
                </div>
                {workshop.originalPrice && (
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block">
                      {formatPrice(workshop.originalPrice)}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Tiết kiệm {formatPrice(workshop.originalPrice - workshop.price)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="space-y-2">
              <button
                onClick={() => onBookWorkshop(workshop)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#17382D] via-[#244A3D] to-[#2B1E16] hover:from-[#244A3D] hover:to-[#3D261A] text-[#FFFDF7] font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-[#D3B392]" />
                <span>Đăng ký tham gia ngay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Đảm bảo 100% giữ chỗ
                </span>
                <span>•</span>
                <span>Được đổi ca trước 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Story */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#B69A68]"></span>
            <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
              Giới thiệu chương trình
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17382D]">
            Hành trình hòa mình vào di sản nghệ thuật
          </h2>

          <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
            {workshop.fullDesc}
          </p>

          {/* Learning outcomes */}
          {workshop.learningOutcomes && (
            <div className="pt-4 border-t border-[#F5F0E5]">
              <h4 className="font-serif font-bold text-[#17382D] text-sm mb-3">
                Bạn sẽ nhận được gì sau buổi trải nghiệm?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {workshop.learningOutcomes.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F5F0E5]/60 rounded-2xl border border-[#E8DEC8] text-xs space-y-1">
                    <span className="w-5 h-5 rounded-full bg-[#17382D] text-[#D3B392] font-mono text-[10px] font-bold flex items-center justify-center mb-1">
                      0{idx + 1}
                    </span>
                    <p className="text-gray-800 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section: Quy Trình 6 Bước Khảm Trai Chuôn Ngọ */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#B69A68]"></span>
              <span className="text-xs uppercase tracking-widest text-[#B69A68] font-bold">
                Quy trình trải nghiệm thực tế
              </span>
              <span className="w-6 h-[2px] bg-[#B69A68]"></span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#17382D]">
              6 Bước Tạo Tác Độc Bản Cùng Nghệ Nhân
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              Quy trình được chuẩn hóa từ tinh hoa nghìn năm làng Chuôn Ngọ, thiết kế an toàn và phù hợp cho cả những người chưa từng cầm cưa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopSteps.map((stepItem) => (
              <div
                key={stepItem.step}
                className="bg-white rounded-3xl p-6 border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#101813] text-[#D3B392] flex items-center justify-center shadow-md">
                    {getStepIcon(stepItem.icon)}
                  </div>
                  <span className="font-mono text-xl font-bold text-[#D3B392]">
                    #{stepItem.step}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                    <span>{stepItem.duration}</span>
                    <span>•</span>
                    <span className="text-[#B69A68]">{stepItem.highlight}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#17382D] group-hover:text-[#B69A68] transition-colors">
                    {stepItem.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Lịch Các Ca Học Sắp Diễn Ra */}
        <div className="bg-[#101813] text-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#D3B392]/30 shadow-2xl mb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D3B392]/20">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D3B392] uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Lịch tổ chức sắp tới</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF7]">
                Các Ca Học Mở Đăng Ký
              </h3>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Sức chứa giới hạn để nghệ nhân có thể cầm tay chỉ việc cho từng học viên. Vui lòng chọn ca phù hợp:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workshopSchedules.map((sched) => {
              const available = Math.max(0, sched.maxSeats - sched.bookedSeats);
              const isFull = sched.status === 'full' || available === 0;

              return (
                <div
                  key={sched.id}
                  className="bg-[#17382D]/70 rounded-2xl p-5 border border-[#D3B392]/25 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-serif font-bold text-base text-[#FFFDF7]">
                        {sched.dateDisplay}
                      </div>
                      <div className="text-xs text-[#D3B392] flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{sched.timeSlot}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      isFull 
                        ? 'bg-red-950/80 text-red-300 border-red-800' 
                        : available <= 2 
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800 animate-pulse' 
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    }`}>
                      {isFull ? 'ĐÃ KÍN CHỖ' : `CÒN ${available} CHỖ`}
                    </span>
                  </div>

                  <div className="text-xs text-gray-300 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D3B392] shrink-0" />
                    <span className="line-clamp-1">{sched.location}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#D3B392]/15">
                    <span className="text-[11px] text-gray-400">
                      Hướng dẫn: <strong className="text-[#FFFDF7]">{sched.artisanName}</strong>
                    </span>

                    <button
                      disabled={isFull}
                      onClick={() => onBookWorkshop(workshop, sched)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isFull
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#D3B392] to-[#B69A68] text-[#101813] hover:scale-105 shadow-md'
                      }`}
                    >
                      {isFull ? 'Hết chỗ' : 'Chọn ca này →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Thông tin Nghệ nhân hướng dẫn */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm mb-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#D3B392]/60 shadow-lg bg-black">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-center text-[#D3B392] font-mono border border-white/10">
                {artisan.experience}
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#B69A68]">
                  Nghệ nhân phụ trách chuyên môn
                </span>
                <h3 className="font-serif text-2xl text-[#17382D] font-bold">
                  {artisan.name}
                </h3>
                <p className="text-xs text-gray-500">{artisan.role}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#E8DEC8] text-xs text-[#2B1E16] italic border-l-4 border-l-[#B69A68]">
                "{artisan.quote || 'Di sản nghìn năm chỉ thực sự sống khi nó được người trẻ yêu mến và trân trọng.'}"
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                {artisan.bio || 'Là người gắn bó máu thịt với thớ gỗ và vỏ ốc xà cừ, nghệ nhân sẽ trực tiếp đồng hành, truyền thụ kỹ năng cưa lọng và thẩm mỹ tạo hình cho bạn trong suốt khóa học.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenArtisanProfile(artisan)}
                  className="px-4 py-2 rounded-full border border-[#17382D] text-[#17382D] hover:bg-[#17382D] hover:text-[#FFFDF7] text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-[#B69A68]" />
                  <span>Xem hồ sơ & thành tựu nghệ nhân →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Đánh giá của Học viên */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DEC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B69A68] uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Cảm nhận từ người trải nghiệm</span>
              </div>
              <h3 className="font-serif text-2xl text-[#17382D]">
                Đánh Giá Từ Học Viên ({workshopReviews.length})
              </h3>
            </div>

            <button
              onClick={() => onOpenReviewModal(workshop.id)}
              className="px-4 py-2.5 rounded-full bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D3B392]" />
              <span>Viết đánh giá của bạn</span>
            </button>
          </div>

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workshopReviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.studentAvatar}
                      alt={rev.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-[#D3B392]"
                    />
                    <div>
                      <div className="font-serif font-bold text-sm text-[#17382D]">{rev.studentName}</div>
                      <div className="text-[11px] text-gray-400">{rev.studentRole} • {rev.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-light leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.projectImage && (
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <img src={rev.projectImage} alt="Thành phẩm" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <span className="text-[11px] text-gray-500 italic">Tác phẩm tự tay học viên hoàn thành</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
