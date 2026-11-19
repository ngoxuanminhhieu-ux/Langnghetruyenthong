import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  BookOpen, 
  Sparkles, 
  Trophy, 
  Plus, 
  Minus, 
  X,
  Compass,
  MapPin
} from 'lucide-react';
import { VILLAGE_HOTSPOTS } from '../../data/villageData';

export const MiniMap = ({ 
  playerPosition = { x: 0, z: 20 }, 
  playerRotation = Math.PI, 
  onFastTravel = () => {},
  activeHotspotId = null,
  onOpenJournal = () => {},
  onOpenCollection = () => {},
  onOpenAchievements = () => {}
}) => {
  const [isFullMap, setIsFullMap] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Village coordinates range: x: [-18, 18], z: [-26, 12]
  const worldToMap = (x, z) => {
    const minX = -18, maxX = 18;
    const minZ = -26, maxZ = 12;
    const left = ((x - minX) / (maxX - minX)) * 100;
    const top = ((z - minZ) / (maxZ - minZ)) * 100;
    return { 
      left: `${Math.max(10, Math.min(90, left))}%`, 
      top: `${Math.max(10, Math.min(90, top))}%` 
    };
  };

  const playerPos = worldToMap(playerPosition.x, playerPosition.z);

  const legendItems = [
    { id: 'gate', label: 'Cổng làng', color: '#ef4444' }, // red
    { id: 'artisan', label: 'Xưởng chế tác', color: '#ef4444' }, // red
    { id: 'gallery', label: 'Nhà trưng bày', color: '#eab308' }, // yellow
    { id: 'craft', label: 'Khu trải nghiệm', color: '#eab308' }, // yellow
    { id: 'shop', label: 'Cửa hàng di sản', color: '#a16207' }, // brown
  ];

  return (
    <>
      {/* TOP RIGHT CONTAINER: 4 FLOATING BUTTONS + MINIMAP CARD */}
      <div className="absolute top-4 right-6 z-30 flex flex-col items-end gap-3 pointer-events-auto select-none font-sans">
        
        {/* 1. ROW OF 4 FLOATING CIRCULAR BUTTONS */}
        <div className="flex items-center gap-2.5">
          {/* Button 1: Bản đồ */}
          <button
            onClick={() => setIsFullMap(true)}
            className="flex flex-col items-center gap-1 group transition-transform active:scale-95"
            title="Mở bản đồ toàn màn hình (M)"
          >
            <div className="w-12 h-12 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 backdrop-blur-md border border-white/15 hover:border-[#D3B392]/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center text-[#D3B392] group-hover:text-amber-300 transition-colors">
              <MapIcon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-white/90 drop-shadow-md">Bản đồ</span>
          </button>

          {/* Button 2: Nhật ký */}
          <button
            onClick={onOpenJournal}
            className="flex flex-col items-center gap-1 group transition-transform active:scale-95"
            title="Nhật ký di sản"
          >
            <div className="w-12 h-12 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 backdrop-blur-md border border-white/15 hover:border-[#D3B392]/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center text-[#D3B392] group-hover:text-amber-300 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-white/90 drop-shadow-md">Nhật ký</span>
          </button>

          {/* Button 3: Bộ sưu tập */}
          <button
            onClick={onOpenCollection}
            className="flex flex-col items-center gap-1 group transition-transform active:scale-95"
            title="Bộ sưu tập kiệt tác khảm trai"
          >
            <div className="w-12 h-12 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 backdrop-blur-md border border-white/15 hover:border-[#D3B392]/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center text-[#D3B392] group-hover:text-amber-300 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-white/90 drop-shadow-md">Bộ sưu tập</span>
          </button>

          {/* Button 4: Thành tích */}
          <button
            onClick={onOpenAchievements}
            className="flex flex-col items-center gap-1 group transition-transform active:scale-95"
            title="Huy hiệu & Thành tích"
          >
            <div className="w-12 h-12 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 backdrop-blur-md border border-white/15 hover:border-[#D3B392]/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center text-[#D3B392] group-hover:text-amber-300 transition-colors">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-white/90 drop-shadow-md">Thành tích</span>
          </button>
        </div>

        {/* 2. MINI-MAP CARD */}
        <div className="w-48 bg-[#18231c]/80 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)] text-white">
          
          {/* Map Preview Window */}
          <div 
            onClick={() => setIsFullMap(true)}
            className="relative w-full h-36 rounded-xl overflow-hidden border border-white/15 bg-[#1b3427] cursor-pointer group shadow-inner"
          >
            {/* Illustrated Topo Map */}
            <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
              {/* Grass / Ground */}
              <rect width="100" height="100" fill="#2d4a37" />
              
              {/* Village Garden & Tree Patches */}
              <circle cx="20" cy="25" r="14" fill="#203828" opacity="0.7" />
              <circle cx="80" cy="30" r="16" fill="#203828" opacity="0.7" />
              <circle cx="22" cy="75" r="12" fill="#203828" opacity="0.7" />
              <circle cx="78" cy="80" r="15" fill="#203828" opacity="0.7" />

              {/* Lotus Pond (Ao Sen) */}
              <ellipse cx="28" cy="40" rx="12" ry="8" fill="#1b4d45" stroke="#387e74" strokeWidth="0.8" />
              
              {/* Houses (grey/brown blocks) */}
              <rect x="10" y="52" width="16" height="12" rx="1" fill="#4d3525" opacity="0.85" />
              <rect x="74" y="48" width="18" height="14" rx="1" fill="#4d3525" opacity="0.85" />
              <rect x="72" y="16" width="16" height="12" rx="1" fill="#5c3829" opacity="0.85" />

              {/* Main Stone Village Street (diagonal/curved beige ribbon) */}
              <path 
                d="M 50 10 L 50 45 L 35 60 L 50 95" 
                stroke="#cbb396" 
                strokeWidth="11" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
              />
              <path 
                d="M 50 45 L 75 55" 
                stroke="#cbb396" 
                strokeWidth="8" 
                strokeLinecap="round" 
                fill="none" 
              />

              {/* Hotspot Pins */}
              {/* Cổng làng */}
              <circle cx="50" cy="86" r="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              {/* Xưởng chế tác */}
              <circle cx="34" cy="58" r="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              {/* Nhà trưng bày */}
              <circle cx="52" cy="22" r="3" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
              {/* Khu trải nghiệm */}
              <circle cx="70" cy="54" r="3" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
              {/* Cửa hàng di sản */}
              <circle cx="74" cy="22" r="3" fill="#a16207" stroke="#ffffff" strokeWidth="1" />
            </svg>

            {/* Player Cyan/Teal Heading Arrow (▲) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-150"
              style={{ left: playerPos.left, top: playerPos.top }}
            >
              <div 
                className="w-4 h-4 flex items-center justify-center"
                style={{ transform: `rotate(${playerRotation}rad)` }}
              >
                <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-b-[9px] border-b-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
              </div>
            </div>

            {/* Vertical Zoom Controls on right side (+ / -) */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-2 right-2 flex flex-col bg-black/50 backdrop-blur-md rounded-md border border-white/20 overflow-hidden text-white/90 z-20 shadow-md"
            >
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
                className="w-5 h-5 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90"
                title="Phóng to"
              >
                <Plus className="w-3 h-3" />
              </button>
              <div className="w-full h-px bg-white/20" />
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                className="w-5 h-5 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90"
                title="Thu nhỏ"
              >
                <Minus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Mini-Map Legend List */}
          <div className="pt-2 px-1 space-y-1">
            {legendItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  const spot = VILLAGE_HOTSPOTS.find(h => h.id === item.id);
                  if (spot) onFastTravel(spot);
                }}
                className="flex items-center gap-2 text-[11px] text-white/80 hover:text-white cursor-pointer py-0.5 transition-colors group"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* FULLSCREEN VILLAGE MAP MODAL */}
      {isFullMap && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#FFFDF7] max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FFFDF7]">
                    Bản Đồ Không Gian Làng Nghề Chuôn Ngọ
                  </h3>
                  <p className="text-xs text-[#D3B392]">
                    Chọn địa điểm bất kỳ để xem thông tin hoặc di chuyển nhanh (Fast Travel)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFullMap(false)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: Map Area + Location Info Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
              
              {/* Map Canvas (8 cols) */}
              <div className="md:col-span-7 lg:col-span-8 relative min-h-[380px] bg-[#142A1F] border-r border-[#D3B392]/20 p-6 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-[500px] max-h-[500px] rounded-2xl overflow-hidden border-2 border-[#D3B392]/40 bg-[#163527] shadow-2xl">
                  
                  {/* Topo Village SVG Map */}
                  <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
                    <rect width="100" height="100" fill="#244230" />
                    <circle cx="20" cy="25" r="14" fill="#1b3325" opacity="0.7" />
                    <circle cx="80" cy="30" r="16" fill="#1b3325" opacity="0.7" />
                    <ellipse cx="28" cy="40" rx="12" ry="8" fill="#1b4d45" stroke="#387e74" strokeWidth="0.8" />
                    
                    <path 
                      d="M 50 10 L 50 45 L 35 60 L 50 95" 
                      stroke="#cbb396" 
                      strokeWidth="11" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      fill="none" 
                    />
                    <path 
                      d="M 50 45 L 75 55" 
                      stroke="#cbb396" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                  </svg>

                  {/* Hotspots clickable */}
                  {VILLAGE_HOTSPOTS.map((spot) => {
                    const pos = worldToMap(spot.position[0], spot.position[2]);
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setSelectedHotspot(spot)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 border-2 border-white hover:scale-125 transition-transform z-10"
                        style={{ left: pos.left, top: pos.top }}
                        title={spot.name}
                      >
                        <MapPin className="w-4 h-4 text-amber-400" />
                      </button>
                    );
                  })}

                  {/* Player Marker */}
                  <div 
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    style={{ left: playerPos.left, top: playerPos.top }}
                  >
                    <div 
                      className="w-6 h-6 flex items-center justify-center"
                      style={{ transform: `rotate(${playerRotation}rad)` }}
                    >
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Sidebar Info (4 cols) */}
              <div className="md:col-span-5 lg:col-span-4 p-5 flex flex-col justify-between bg-[#101F18] overflow-y-auto">
                {selectedHotspot ? (
                  <div className="space-y-4">
                    <div className="w-full h-36 rounded-xl overflow-hidden border border-[#D3B392]/30">
                      <img 
                        src={selectedHotspot.previewImg} 
                        alt={selectedHotspot.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D3B392] uppercase font-bold tracking-wider">
                        {selectedHotspot.tagline}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                        {selectedHotspot.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        {selectedHotspot.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onFastTravel(selectedHotspot);
                        setIsFullMap(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#17382D] to-[#255C48] hover:from-[#1E483A] hover:to-[#2F735B] border border-[#D3B392]/50 text-white font-semibold text-xs transition-all active:scale-98 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Compass className="w-4 h-4 text-[#D3B392]" />
                      <span>Dịch chuyển đến điểm này (Fast Travel)</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs">
                    <Compass className="w-8 h-8 text-[#D3B392]/50 mx-auto mb-2 animate-spin-slow" />
                    <p>Nhấp vào bất kỳ biểu tượng địa danh trên bản đồ để xem chi tiết và dịch chuyển nhanh.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 text-[11px] text-[#D3B392]/70 flex items-center justify-between">
                  <span>Vị trí hiện tại: Làng Chuôn Ngọ</span>
                  <span className="font-mono">Tọa độ: [{Math.round(playerPosition.x)}, {Math.round(playerPosition.z)}]</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
