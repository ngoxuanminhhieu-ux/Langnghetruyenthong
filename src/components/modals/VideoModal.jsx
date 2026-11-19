import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, ExternalLink, Play, Film, CheckCircle2 } from 'lucide-react';

export const VideoModal = () => {
  const { isVideoModalOpen, setIsVideoModalOpen } = useApp();

  const VIDEOS = [
    {
      id: 'PmIe2AV2WqQ',
      title: 'Phim Tài Liệu VTV4: Làng Khảm Trai Chuôn Ngọ',
      source: 'VTV4 - Đài Truyền hình Việt Nam',
      description: 'Phóng sự đặc biệt khám phá cái nôi nghề khảm trai nghìn năm tuổi, quy trình tuyển chọn vỏ ốc xà cừ đỏ Singapore và đôi bàn tay vàng của các nghệ nhân họ Trương Chuôn Ngọ.',
      duration: '15:20'
    },
    {
      id: '-e4nc64W7-g',
      title: 'Khám Phá Bí Mật Làng Nghề Khảm Trai Chuôn Ngọ',
      source: 'Hanoi Review - Đài Phát thanh & Truyền hình Hà Nội',
      description: 'Cận cảnh kỹ thuật cưa lọng nét tơ tóc, mài phẳng nước và bí quyết gắn sơn ta Phú Thọ lưu giữ màu sắc ngũ quang hàng trăm năm.',
      duration: '12:45'
    }
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const activeVideo = VIDEOS[activeVideoIndex];

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#17382D] rounded-3xl overflow-hidden border border-[#B69A68] shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 px-5 sm:px-6 flex items-center justify-between border-b border-[#294638] bg-[#0E231C] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#D8C29D]">
            <Sparkles className="w-4 h-4 text-[#B69A68]" />
            <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              Thước Phim Di Sản: Khảm Trai Chuôn Ngọ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Open in YouTube */}
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#D8C29D] hover:text-[#FFFDF7] flex items-center gap-1 px-3 py-1 rounded-full bg-[#17382D] border border-[#B69A68]/40 transition-colors"
              title="Mở trong tab mới"
            >
              <span>Xem trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="w-8 h-8 rounded-full bg-[#17382D] text-[#FFFDF7] hover:bg-[#294638] flex items-center justify-center transition-colors border border-white/10"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Playlist Selector Tabs */}
        <div className="bg-[#17382D] px-4 py-2 border-b border-[#294638] flex items-center gap-2 overflow-x-auto shrink-0">
          {VIDEOS.map((vid, idx) => (
            <button
              key={vid.id}
              onClick={() => setActiveVideoIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all ${
                activeVideoIndex === idx
                  ? 'bg-[#B69A68] text-[#17382D] font-bold shadow-sm'
                  : 'bg-[#294638] text-[#F5F0E5]/80 hover:bg-[#325644] hover:text-[#FFFDF7]'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Tập {idx + 1}: {vid.source.split(' - ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <iframe
            key={activeVideo.id}
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Description & Actions */}
        <div className="p-4 sm:p-5 bg-[#0E231C] text-[#FFFDF7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shrink-0 border-t border-[#294638]">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#17382D] text-[#B69A68] border border-[#B69A68]/30">
                {activeVideo.source}
              </span>
              <h4 className="font-serif font-bold text-sm text-[#FFFDF7]">
                {activeVideo.title}
              </h4>
            </div>
            <p className="text-[#F5F0E5]/75 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
              {activeVideo.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-[#B69A68] text-[#D8C29D] hover:bg-[#17382D] font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Xem chất lượng 4K</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="px-5 py-2 rounded-full bg-[#B69A68] text-[#17382D] font-bold text-xs hover:bg-[#D4BA88] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
