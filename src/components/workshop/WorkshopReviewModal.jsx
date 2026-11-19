import React, { useState } from 'react';
import { X, Star, Sparkles, Camera, Check } from 'lucide-react';
import { useWorkshop } from '../../context/WorkshopContext';
import { useApp } from '../../context/AppContext';

export const WorkshopReviewModal = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, workshops, submitReview } = useWorkshop();
  const { user } = useApp();

  const [selectedWorkshopId, setSelectedWorkshopId] = useState(workshops[0]?.id || 'WS-01');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState(user?.name || 'Nguyễn Minh Anh');
  const [role, setRole] = useState('Học viên trải nghiệm');
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('/images/product_but_ky_kham_trai.jpg');
  const [selectedTags, setSelectedTags] = useState(['Trải nghiệm tuyệt vời', 'Sản phẩm ưng ý']);

  if (!isReviewModalOpen) return null;

  const availableTags = [
    'Trải nghiệm tuyệt vời',
    'Nhiệt tình 1-1',
    'Sản phẩm ưng ý',
    'Cơm quê ngon',
    'Bút ký sắc nét',
    'Ý nghĩa giáo dục',
    'An toàn cho bé'
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview({
      workshopId: selectedWorkshopId,
      studentName: name,
      studentRole: role,
      rating,
      comment,
      projectImage: selectedImage,
      tags: selectedTags
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#D3B392] shadow-2xl p-6 sm:p-8 space-y-5 text-[#2B1E16]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsReviewModalOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B69A68] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Chia Sẻ Trải Nghiệm Khảm Trai
          </span>
          <h3 className="font-serif text-2xl text-[#17382D] font-bold">
            Gửi Đánh Giá Của Bạn
          </h3>
          <p className="text-xs text-gray-500 font-light">
            Nhận xét của bạn sẽ giúp lan tỏa vẻ đẹp di sản làng Chuôn Ngọ đến cộng đồng.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Workshop Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Khóa học bạn đã tham gia *</label>
            <select
              value={selectedWorkshopId}
              onChange={(e) => setSelectedWorkshopId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
            >
              {workshops.map(w => (
                <option key={w.id} value={w.id}>{w.title}</option>
              ))}
            </select>
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1.5">Mức độ hài lòng của bạn *</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-sm text-[#17382D]">
                {rating === 5 ? '5/5 - Cực kỳ hài lòng' : `${rating}/5 Sao`}
              </span>
            </div>
          </div>

          {/* Attendee Name & Role */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Họ và tên *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Nghề nghiệp / Giới thiệu</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="VD: Sinh viên, Designer"
                className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Cảm nhận chi tiết của bạn *</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ về sự hướng dẫn của nghệ nhân, tác phẩm bạn tự tay làm được, không khí tại xưởng mộc..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Finished Product Photo Selector */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#B69A68]" />
              Chọn ảnh thành phẩm đính kèm:
            </label>
            <div className="flex gap-2">
              {[
                '/images/product_but_ky_kham_trai.jpg',
                '/images/product_bat_can_trung.jpg',
                '/images/product_vong_tay_ban_kham_trai.jpg',
                '/images/product_chuoi_hat_xa_cu.jpg'
              ].map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === img ? 'border-[#17382D] ring-2 ring-[#B69A68]' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {selectedImage === img && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Từ khóa trải nghiệm:</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#17382D] text-[#FFFDF7]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#17382D] hover:bg-[#244A3D] text-[#FFFDF7] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#D3B392]" />
              <span>Gửi Đánh Giá Trải Nghiệm</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
