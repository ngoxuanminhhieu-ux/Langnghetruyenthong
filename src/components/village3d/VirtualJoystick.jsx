import React, { useRef, useState } from 'react';
import { Hand, Flame } from 'lucide-react';

export const VirtualJoystick = ({
  onMove = () => {},
  onSprintToggle = () => {},
  onInteract = () => {},
  canInteract = true,
  isSprinting = false
}) => {
  const joystickRef = useRef(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [internalSprinting, setInternalSprinting] = useState(false);

  const radius = 42;

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateKnob(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateKnob(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setKnobPos({ x: 0, y: 0 });
    onMove({ x: 0, z: 0 });
  };

  const updateKnob = (e) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.hypot(dx, dy);

    const clampedDist = Math.min(radius, dist);
    const angle = Math.atan2(dy, dx);

    const finalX = Math.cos(angle) * clampedDist;
    const finalY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: finalX, y: finalY });

    const normX = finalX / radius;
    const normZ = finalY / radius;
    onMove({ x: normX, z: normZ });
  };

  const toggleSprint = () => {
    const next = !internalSprinting;
    setInternalSprinting(next);
    onSprintToggle(next);
  };

  const handleArrowPress = (dx, dz) => {
    onMove({ x: dx, z: dz });
    setTimeout(() => {
      onMove({ x: 0, z: 0 });
    }, 250);
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 font-sans">
      
      {/* 1. VIRTUAL JOYSTICK / D-PAD (BOTTOM-LEFT) */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <div
          ref={joystickRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-28 h-28 rounded-full bg-[#18231c]/70 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center touch-none cursor-pointer group"
        >
          {/* 4 Directional Arrows */}
          {/* Top Arrow ▲ */}
          <button
            onClick={(e) => { e.stopPropagation(); handleArrowPress(0, -1); }}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[9px] border-b-white/80" />
          </button>

          {/* Bottom Arrow ▼ */}
          <button
            onClick={(e) => { e.stopPropagation(); handleArrowPress(0, 1); }}
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white/80" />
          </button>

          {/* Left Arrow ◀ */}
          <button
            onClick={(e) => { e.stopPropagation(); handleArrowPress(-1, 0); }}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[9px] border-r-white/80" />
          </button>

          {/* Right Arrow ▶ */}
          <button
            onClick={(e) => { e.stopPropagation(); handleArrowPress(1, 0); }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-white/80" />
          </button>

          {/* Draggable Inner Knob / Thumbstick */}
          <div
            className="w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-md flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
            }}
          >
            <div className="w-4 h-4 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* 2. TWO CIRCULAR ACTION BUTTONS (BOTTOM-RIGHT) */}
      <div className="absolute bottom-6 right-6 pointer-events-auto flex items-center gap-3.5">
        
        {/* Button 1: Glowing Hand (Tương tác / Interact E) */}
        <button
          onClick={onInteract}
          title="Tương tác khám phá [E]"
          className="relative w-14 h-14 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 backdrop-blur-md border-2 border-white/30 hover:border-amber-300 shadow-[0_0_24px_rgba(255,255,255,0.25)] flex items-center justify-center text-white transition-all active:scale-90 group"
        >
          {/* Subtle glowing ring */}
          <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-30 pointer-events-none" />
          
          {/* Hand Icon */}
          <Hand className="w-6 h-6 text-white group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </button>

        {/* Button 2: Sprint Runner (Chạy nhanh / Shift) */}
        <button
          onClick={toggleSprint}
          title="Chạy nhanh [Shift]"
          className={`relative w-14 h-14 rounded-full backdrop-blur-md border-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all active:scale-90 ${
            internalSprinting || isSprinting
              ? 'bg-amber-500/80 border-amber-300 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)]'
              : 'bg-[#18231c]/75 hover:bg-[#25382c]/85 border-white/30 text-white/90'
          }`}
        >
          {/* Running Athlete Icon */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
          </svg>
        </button>

      </div>

    </div>
  );
};
