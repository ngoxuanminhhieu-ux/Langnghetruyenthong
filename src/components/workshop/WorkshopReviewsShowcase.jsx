import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  Award, 
  MessageSquare, 
  ThumbsUp, 
  Heart, 
  Camera, 
  Plus,
  CheckCircle2
} from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';

export const WorkshopReviewsShowcase = ({ onOpenReviewModal }) => {
  const { reviews, studentShowcase } = useWorkshop();
  const [filterRating, setFilterRating] = useState('all');

  const filteredReviews = reviews.filter(r => {
    if (filterRating === '5' && r.rating !== 5) return false;
    if (filterRating === '4' && r.rating < 4) return false;
    return true;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* 1. Overall Stats Card */}
      <div className="bg-gradient-to-r from-[#17382D] to-[#2B1E16] text-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#D3B392]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101813]/60 text-[#D3B392] text-xs font-semibold uppercase tracking-wider border border-[#D3B392]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Niềm Tự Hào Của Học Viên Chuôn Ngọ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Cảm Nhận & Thành Quả Trải Nghiệm
          </h2>

          <p className="text-xs sm:text-sm text-[#F5F0E5]/80 max-w-xl font-light leading-relaxed">
            Mỗi học viên đến với xưởng mộc Chuôn Ngọ đều bắt đầu bằng sự bỡ ngỡ và ra về với một tác phẩm xà cừ óng ánh tự tay mình hoàn thiện cùng một tâm hồn tràn đầy niềm tự hào dân tộc.
          </p>
        </div>

        {/* Rating Score Card */}
        <div className="bg-[#101813]/80 p-6 rounded-2xl border border-[#D3B392]/40 text-center space-y-2 shrink-0 w-full sm:w-auto">
          <div className="font-serif font-bold text-4xl sm:text-5xl text-[#FFFDF7]">
            4.9 <span className="text-sm font-normal text-gray-400">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="text-xs text-[#D3B392]">
            Dựa trên 320+ lượt học viên
          </div>

          <button
            onClick={() => onOpenReviewModal()}
            className="w-full mt-2 py-2 px-4 rounded-xl bg-gradient-to-r from-[#D3B392] to-[#B69A68] text-[#101813] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Gửi đánh giá của bạn</span>
          </button>
        </div>
      </div>

      {/* 2. Student Showcase Gallery */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E8DEC8]">
          <div>
            <span className="text-xs font-bold text-[#B69A68] uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              Góc Tự Hào Của Học Viên
            </span>
            <h3 className="font-serif text-2xl text-[#17382D] font-bold">
              Tác Phẩm Học Viên Tự Tay Chế Tác
            </h3>
          </div>
          <span className="text-xs text-gray-500">100% ảnh chụp thành phẩm thực tế tại xưởng</span>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {studentShowcase.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#B69A68] shadow-xs hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-black/10">
                <img
                  src={sc.image}
                  alt={sc.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-center text-[#D3B392] font-semibold border border-white/10 line-clamp-1">
                  {sc.badge}
                </span>
              </div>

              <div className="p-3 space-y-1 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#17382D] line-clamp-1 group-hover:text-[#B69A68]">
                    {sc.title}
                  </h4>
                  <p className="text-[11px] text-gray-500">{sc.student}</p>
                </div>
                <div className="text-[10px] text-[#B69A68] font-medium pt-1 border-t border-gray-100">
                  {sc.workshopTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Detailed Reviews List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E8DEC8]">
          <h3 className="font-serif text-2xl text-[#17382D] font-bold">
            Nhận Xét & Đánh Giá Chi Tiết ({reviews.length})
          </h3>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                filterRating === 'all'
                  ? 'bg-[#17382D] text-[#FFFDF7]'
                  : 'bg-[#F5F0E5] text-gray-700 hover:bg-[#E8DEC8]'
              }`}
            >
              Tất cả nhận xét
            </button>
            <button
              onClick={() => setFilterRating('5')}
              className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1 transition-colors ${
                filterRating === '5'
                  ? 'bg-[#17382D] text-[#FFFDF7]'
                  : 'bg-[#F5F0E5] text-gray-700 hover:bg-[#E8DEC8]'
              }`}
            >
              <span>5 Sao</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#E8DEC8] hover:border-[#B69A68] shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.studentAvatar}
                    alt={rev.studentName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D3B392]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#17382D]">
                      {rev.studentName}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      {rev.studentRole} • {rev.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#F5F0E5] px-2.5 py-1 rounded-full border border-[#E8DEC8]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Workshop Title */}
              <div className="text-xs font-semibold text-[#B69A68] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{rev.workshopTitle}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
                "{rev.comment}"
              </p>

              {/* Product photo if attached */}
              {rev.projectImage && (
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F5F0E5]/60 border border-[#E8DEC8]">
                  <img
                    src={rev.projectImage}
                    alt="Tác phẩm"
                    className="w-14 h-14 rounded-xl object-cover border border-[#E8DEC8] shrink-0"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#17382D] block">Thành phẩm hoàn thành</span>
                    <span className="text-[11px] text-gray-500">Đã kiểm định & cấp Tem QR Di sản</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              {rev.tags && rev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rev.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-[#17382D]/10 text-[#17382D] text-[10px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
