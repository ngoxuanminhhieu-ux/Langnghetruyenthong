import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MousePointer } from 'lucide-react';

export const DialogueGuide = ({ 
  currentLocationName = 'Đường Làng Chuôn Ngọ', 
  dialogueText = 'Chào mừng bạn đến với làng nghề Chuôn Ngọ!\nHãy cùng khám phá quy trình khảm trai và tự tay trải nghiệm một số công đoạn nhé!',
  onToggleMap = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 pointer-events-auto select-none font-sans max-w-2xl w-[92%] sm:w-auto">
      
      {/* 1. DIALOGUE CAPSULE BANNER */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full sm:w-auto min-w-[340px] max-w-xl bg-[#18231c]/80 hover:bg-[#18231c]/90 backdrop-blur-md rounded-full px-4 sm:px-5 py-2 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3.5 cursor-pointer transition-all active:scale-[0.99]"
      >
        {/* Chibi Guide Avatar with Nón Lá */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-300/60 shadow-md bg-[#253e30]">
            <img 
              src="/images/chibi_guide_avatar.jpg" 
              alt="Hướng dẫn viên làng nghề"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/guide_avatar.jpg';
              }}
            />
          </div>
          {/* Green dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#18231c]" />
        </div>

        {/* Dialogue Text Lines */}
        <div className="flex-1 min-w-0 pr-1">
          {isExpanded ? (
            <div className="text-left space-y-0.5">
              {dialogueText.includes('\n') ? (
                dialogueText.split('\n').map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "text-[13px] font-medium text-white/95 leading-tight" : "text-[12px] text-white/80 leading-tight"}>
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-[12.5px] text-white/95 leading-tight">
                  {dialogueText}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[12px] text-white/70 italic">
              Nhấp để mở rộng hướng dẫn viên...
            </p>
          )}
        </div>

        {/* Down Chevron / Expand */}
        <div className="text-white/60 hover:text-white transition-colors shrink-0">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* 2. KEYBOARD CONTROLS CAPSULE PILL BAR */}
      <div className="hidden sm:flex items-center gap-4 px-5 py-1.5 rounded-full bg-[#18231c]/75 backdrop-blur-md border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-[12px] text-white/85">
        
        {/* WASD */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 font-mono text-[10px] font-bold">
            <span className="px-1.5 py-0.5 rounded bg-white/15 text-white">W</span>
            <span className="px-1.5 py-0.5 rounded bg-white/15 text-white">A</span>
            <span className="px-1.5 py-0.5 rounded bg-white/15 text-white">S</span>
            <span className="px-1.5 py-0.5 rounded bg-white/15 text-white">D</span>
          </div>
          <span className="text-white/80">Di chuyển</span>
        </div>

        <span className="text-white/20">|</span>

        {/* Mouse */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-white/15 flex items-center justify-center text-white">
            <MousePointer className="w-3 h-3" />
          </div>
          <span className="text-white/80">Xoay góc nhìn</span>
        </div>

        <span className="text-white/20">|</span>

        {/* Interact E */}
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-white/15 font-mono text-[10px] font-bold text-white">
            E
          </span>
          <span className="text-white/80">Tương tác</span>
        </div>

        <span className="text-white/20">|</span>

        {/* Map M */}
        <div 
          onClick={onToggleMap}
          className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
        >
          <span className="px-1.5 py-0.5 rounded bg-white/15 font-mono text-[10px] font-bold text-white">
            M
          </span>
          <span className="text-white/80">Mở bản đồ</span>
        </div>

      </div>

    </div>
  );
};
