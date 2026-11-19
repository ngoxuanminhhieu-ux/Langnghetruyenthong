import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Village3DCanvas } from '../components/village3d/Village3DCanvas';
import { QuestPanel } from '../components/village3d/QuestPanel';
import { MiniMap } from '../components/village3d/MiniMap';
import { DialogueGuide } from '../components/village3d/DialogueGuide';
import { VirtualJoystick } from '../components/village3d/VirtualJoystick';
import { 
  ArtisanModal, 
  WorkshopExploreModal, 
  JournalBadgesModal,
  CollectionModal,
  AchievementsModal
} from '../components/village3d/InteractionModals';

// 3D/AR Product Customizer (Crafting Studio)
import { Product3DViewer } from '../components/experience/Product3DViewer';
import { ShareModal } from '../components/experience/ShareModal';
import { MOTIFS, COLOR_SWATCHES, SIZES } from '../utils/motherOfPearlTextures';
import { VILLAGE_HOTSPOTS, VILLAGE_QUESTS } from '../data/villageData';

import { 
  Box, 
  Smartphone, 
  RotateCw, 
  Maximize2, 
  Camera, 
  Share2, 
  Heart, 
  ShoppingBag, 
  Edit3, 
  Info, 
  Check, 
  Sparkles, 
  ArrowLeft,
  Compass,
  CheckCircle2,
  Hammer,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExperiencePage = () => {
  const { addToCart, showToast, setIsCartOpen, navigateTo, openVideo, experienceMode, setExperienceMode } = useApp();

  // Mode: 'village' (3D Interactive Village Tour) or 'crafting' (3D/AR Product Studio)
  const [activeExperienceMode, setActiveExperienceMode] = useState(experienceMode || 'village');

  useEffect(() => {
    if (experienceMode) {
      setActiveExperienceMode(experienceMode);
    }
  }, [experienceMode]);

  // Village 3D Exploration State
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 9.5 });
  const [playerRotation, setPlayerRotation] = useState(Math.PI);
  const [activeNearHotspot, setActiveNearHotspot] = useState(null);
  const [teleportTarget, setTeleportTarget] = useState(null);

  // Virtual Controls (Touch)
  const [virtualMove, setVirtualMove] = useState({ x: 0, z: 0 });
  const [isVirtualSprinting, setIsVirtualSprinting] = useState(false);

  // Quests & Gamification State (Persisted)
  const [completedQuests, setCompletedQuests] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_completed_quests');
      return saved ? JSON.parse(saved) : ['quest_1'];
    } catch {
      return ['quest_1'];
    }
  });

  const [discoveredHotspots, setDiscoveredHotspots] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_discovered_hotspots');
      return saved ? JSON.parse(saved) : ['gate'];
    } catch {
      return ['gate'];
    }
  });

  // Modals State
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  // Crafting Studio (3D/AR Box) State
  const [isARMode, setIsARMode] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [selectedMotif, setSelectedMotif] = useState('lotus');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [engravedText, setEngravedText] = useState('');
  const [craftingTab, setCraftingTab] = useState('customizer');

  // Mini-game State
  const [polishProgress, setPolishProgress] = useState(0);

  const activeSizeObj = SIZES.find(s => s.id === selectedSize) || SIZES[1];
  const curMotifObj = MOTIFS[selectedMotif] || MOTIFS.lotus;
  const curColorObj = COLOR_SWATCHES.find(c => c.id === selectedColor) || COLOR_SWATCHES[0];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Save quest progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chuonngo_completed_quests', JSON.stringify(completedQuests));
    } catch (e) {
      console.warn(e);
    }
  }, [completedQuests]);

  // Track discovered hotspots
  useEffect(() => {
    if (activeNearHotspot && !discoveredHotspots.includes(activeNearHotspot.id)) {
      const next = [...discoveredHotspots, activeNearHotspot.id];
      setDiscoveredHotspots(next);
      try {
        localStorage.setItem('chuonngo_discovered_hotspots', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      showToast(`Đã khám phá địa danh: ${activeNearHotspot.name}!`);
    }
  }, [activeNearHotspot, discoveredHotspots]);

  // Mark a quest as complete
  const markQuestComplete = (questId) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests(prev => [...prev, questId]);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
      const q = VILLAGE_QUESTS.find(item => item.id === questId);
      if (q) {
        showToast(`Hoàn thành nhiệm vụ: "${q.title}"! Nhận: ${q.reward}`);
      }
    }
  };

  // Handle interaction with current hotspot
  const handleInteract = () => {
    if (!activeNearHotspot) {
      showToast('Hãy tiến lại gần một điểm sáng tương tác để khám phá.');
      return;
    }

    if (activeNearHotspot.id === 'gate') {
      markQuestComplete('quest_1');
      showToast('Cổng Làng Chuôn Ngọ: Di tích lịch sử ngàn năm bên dòng sông Nhuệ.');
    } else if (activeNearHotspot.id === 'artisan') {
      setIsArtisanModalOpen(true);
      markQuestComplete('quest_2');
    } else if (activeNearHotspot.id === 'craft') {
      // Open Crafting pavilion / Switch to 3D Customizer
      setActiveExperienceMode('crafting');
      markQuestComplete('quest_3');
      showToast('Chào mừng bạn đến Xưởng Chế Tác! Hãy thử mài bóng xà cừ và tạo mẫu hộp khảm trai riêng.');
    } else if (activeNearHotspot.id === 'gallery') {
      showToast('Nhà Trưng Bày Bách Liên: Đỉnh cao tinh hoa chạm khảm vỏ trai cửu khổng.');
      markQuestComplete('quest_5');
    } else if (activeNearHotspot.id === 'shop') {
      showToast('Cửa Hàng Di Sản Chuôn Ngọ: Mở danh mục sản phẩm có bảo chứng xuất xứ.');
      markQuestComplete('quest_5');
    }
  };

  // Handle Save Design & Add to Cart
  const handleSaveAndAddToCart = () => {
    const customProduct = {
      id: `custom-box-${selectedMotif}-${selectedColor}-${selectedSize}`,
      name: `Hộp trang sức khảm trai ${curMotifObj.name} (${curMotifObj.sub})`,
      category: 'box',
      price: activeSizeObj.price,
      image: curMotifObj.thumbnail || '/images/product_but_ky_kham_trai.jpg',
      material: `Gỗ mun / trắc khảm ốc xà cừ đỏ ngũ sắc (${curColorObj.name})`,
      origin: 'Chuôn Ngọ, Chuyên Mỹ, Phú Xuyên, Hà Nội',
      artisan: 'Nghệ nhân Ưu tú Trương Kim Thành'
    };

    addToCart(customProduct, 1, {
      motif: curMotifObj.name,
      color: curColorObj.name,
      size: `${selectedSize} (${activeSizeObj.dims.l}×${activeSizeObj.dims.w}×${activeSizeObj.dims.h} cm)`,
      engravedText: engravedText.trim() || 'Không khắc tên',
      isCustomized: true,
      note: `Tác phẩm cá nhân hóa: Họa tiết ${curMotifObj.name}, nền ${curColorObj.name}, size ${selectedSize}${engravedText ? `, Khắc: "${engravedText}"` : ''}`
    });

    markQuestComplete('quest_4');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    showToast(`Đã lưu thiết kế & thêm vào giỏ hàng: ${customProduct.name}`);
    setIsCartOpen(true);
  };

  // Mini-game Polish Click
  const handlePolishClick = () => {
    const next = polishProgress + 25;
    if (next >= 100) {
      setPolishProgress(100);
      markQuestComplete('quest_3');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      showToast('Chúc mừng! Bạn đã mài bóng thành công lớp xà cừ ngũ sắc!');
    } else {
      setPolishProgress(next);
    }
  };

  // Snapshot trigger
  const handleSnapshotCaptured = () => {
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 } });
    showToast('Đã chụp ảnh tác phẩm 3D và lưu về máy thành công!');
  };

  // Fast travel from mini map
  const handleFastTravel = (hotspot) => {
    setTeleportTarget(hotspot);
    showToast(`Đang di chuyển đến: ${hotspot.name}...`);
  };

  // Current Dialogue calculation based on nearby hotspot
  const curDialogueText = activeNearHotspot 
    ? activeNearHotspot.dialogue
    : 'Hãy khám phá con đường gạch đỏ, gặp gỡ nghệ nhân bên tay trái hoặc vào khu trải nghiệm chế tác bên tay phải nhé!';

  const curLocationName = activeNearHotspot 
    ? activeNearHotspot.name 
    : 'Đường Làng Chuôn Ngọ';

  return (
    <div className="relative w-full h-[calc(100vh-68px)] min-h-[640px] bg-[#101813] text-[#FFFDF7] overflow-hidden select-none">
      
      {/* =========================================================================
          MODE 1: 3D INTERACTIVE VILLAGE TOUR (OPEN-WORLD 3RD-PERSON EXPERIENCE)
      ========================================================================= */}
      {activeExperienceMode === 'village' && (
        <div className="relative w-full h-full">
          
          {/* 1. TOP-LEFT: EXIT TO WEBSITE HOME BUTTON */}
          <div className="absolute top-4 left-6 z-30 pointer-events-auto select-none">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 rounded-full bg-[#18231c]/75 hover:bg-[#25382c]/85 text-white text-xs font-semibold backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center gap-2 transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D3B392]" />
              <span>Thoát trải nghiệm</span>
            </button>
          </div>

          {/* 2. THREE.JS 3D VILLAGE WORLD CANVAS */}
          <Village3DCanvas
            onPlayerPositionChange={setPlayerPosition}
            onPlayerRotationChange={setPlayerRotation}
            onNearHotspot={setActiveNearHotspot}
            activeNearHotspot={activeNearHotspot}
            onInteract={handleInteract}
            onOpenArtisan={() => {
              setIsArtisanModalOpen(true);
              markQuestComplete('quest_2');
            }}
            onOpenCrafting={() => {
              setActiveExperienceMode('crafting');
              markQuestComplete('quest_3');
              showToast('Chào mừng bạn đến Xưởng Chế Tác! Hãy trải nghiệm xem 3D, AR và tùy chỉnh sản phẩm.');
            }}
            virtualMove={virtualMove}
            isVirtualSprinting={isVirtualSprinting}
            teleportTarget={teleportTarget}
            className="w-full h-full"
          />

          {/* 3. QUEST PANEL (LEFT) */}
          <QuestPanel
            completedQuests={completedQuests}
            onOpenCrafting={() => {
              setActiveExperienceMode('crafting');
              markQuestComplete('quest_3');
            }}
            onOpenArtisan={() => {
              setIsArtisanModalOpen(true);
              markQuestComplete('quest_2');
            }}
            onOpenJournal={() => setIsJournalModalOpen(true)}
            onSelectQuest={(questId) => {
              if (questId === 'quest_1') {
                const gateSpot = VILLAGE_HOTSPOTS.find(h => h.id === 'gate');
                if (gateSpot) handleFastTravel(gateSpot);
                markQuestComplete('quest_1');
              } else if (questId === 'quest_2') {
                setIsArtisanModalOpen(true);
                markQuestComplete('quest_2');
              } else if (questId === 'quest_3' || questId === 'quest_4') {
                setActiveExperienceMode('crafting');
                markQuestComplete('quest_3');
              } else if (questId === 'quest_5') {
                setIsJournalModalOpen(true);
              }
            }}
          />

          {/* 4. MINI MAP & TOP-RIGHT 4 CIRCULAR BUTTONS */}
          <MiniMap
            playerPosition={playerPosition}
            playerRotation={playerRotation}
            activeHotspotId={activeNearHotspot?.id}
            onFastTravel={handleFastTravel}
            onOpenJournal={() => setIsJournalModalOpen(true)}
            onOpenCollection={() => setIsCollectionModalOpen(true)}
            onOpenAchievements={() => setIsAchievementsModalOpen(true)}
          />

          {/* 5. DIALOGUE GUIDE NPC & KEYBOARD CONTROLS (BOTTOM-CENTER) */}
          <DialogueGuide
            currentLocationName={curLocationName}
            dialogueText={curDialogueText}
            onToggleMap={() => {
              const spot = VILLAGE_HOTSPOTS[0];
              handleFastTravel(spot);
            }}
          />

          {/* 6. VIRTUAL JOYSTICK & ACTION BUTTONS (TOUCH & DESKTOP) */}
          <VirtualJoystick
            onMove={setVirtualMove}
            onSprintToggle={setIsVirtualSprinting}
            onInteract={handleInteract}
            canInteract={true}
            isSprinting={isVirtualSprinting}
          />

        </div>
      )}

      {/* =========================================================================
          MODE 2: 3D / AR PRODUCT CRAFTING STUDIO & CUSTOMIZER (THE WORKSHOP)
      ========================================================================= */}
      {activeExperienceMode === 'crafting' && (
        <div className="relative w-full h-full overflow-y-auto bg-[#101813] text-[#FFFDF7] flex flex-col">
          
          {/* Top Bar Switch & Return to Village */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 pb-3 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveExperienceMode('village')}
                className="px-4 py-2 rounded-full bg-[#1C2C24] hover:bg-[#253E32] text-white text-xs font-semibold border border-[#D3B392]/40 shadow-md flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#D3B392]" />
                <span>Trở về Khám Phá Làng Nghề 3D</span>
              </button>

              <div className="hidden md:block">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D3B392]">
                  Xưởng Chế Tác Chuôn Ngọ
                </span>
                <h2 className="font-serif text-lg font-bold">Trải Nghiệm Khảm Trai &amp; Xem 360°</h2>
              </div>
            </div>

            {/* Mode Switch Pills */}
            <div className="flex items-center bg-[#1C2C24] p-1 rounded-full border border-[#D3B392]/30 shadow-inner">
              <button
                onClick={() => setIsARMode(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                  isARMode
                    ? 'bg-[#295741] text-[#FFFDF7] shadow-lg border border-[#D3B392]/60'
                    : 'text-[#F5F0E5]/70 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#D3B392]" />
                <span>AR trong không gian</span>
              </button>

              <button
                onClick={() => setIsARMode(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                  !isARMode
                    ? 'bg-[#295741] text-[#FFFDF7] shadow-lg border border-[#D3B392]/60'
                    : 'text-[#F5F0E5]/70 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4 text-[#D3B392]" />
                <span>Xem mô hình 3D</span>
              </button>
            </div>

          </div>

          {/* 3-Column Crafting Studio Workspace */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* LEFT TOOLBAR + CENTER 3D VIEWER (7-8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col sm:flex-row gap-4 items-stretch relative min-h-[480px]">
              
              {/* Left Vertical Dock */}
              <div className="sm:w-16 flex sm:flex-col items-center justify-center sm:justify-start gap-2 bg-[#172B20]/80 backdrop-blur-md p-2 rounded-2xl border border-[#D3B392]/25 shadow-xl shrink-0 self-center sm:self-start z-20">
                <button
                  onClick={() => setIsARMode(!isARMode)}
                  title="Bật/Tắt WebAR trong không gian thực"
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-all ${
                    isARMode ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>AR</span>
                </button>

                <button
                  onClick={() => {
                    setIsARMode(false);
                    showToast('Đã kích hoạt chế độ xoay 360 độ.');
                  }}
                  title="Xoay 360 độ"
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>360°</span>
                </button>

                <button
                  onClick={() => setShowDimensions(!showDimensions)}
                  title="Bật/Tắt kích thước 3D"
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-all ${
                    showDimensions ? 'bg-[#2D5A45] text-white border border-[#D3B392]' : 'text-[#D8C29D] hover:bg-white/10'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Kích thước</span>
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('trigger-product-snapshot'));
                    showToast('Đang xử lý ảnh chụp độ phân giải cao...');
                  }}
                  title="Chụp ảnh tác phẩm"
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
                >
                  <Camera className="w-4 h-4" />
                  <span>Chụp ảnh</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  title="Chia sẻ liên kết & QR Code"
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-[#D8C29D] hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>

              {/* 3D Product Stage */}
              <div className="flex-1 relative rounded-3xl overflow-hidden border border-[#D3B392]/30 shadow-2xl bg-black/40 min-h-[460px]">
                <Product3DViewer
                  motif={selectedMotif}
                  color={selectedColor}
                  size={selectedSize}
                  engravedText={engravedText}
                  showDimensions={showDimensions}
                  isARMode={isARMode}
                  onExitAR={() => setIsARMode(false)}
                  onCaptureSnapshot={handleSnapshotCaptured}
                  onSelectColor={(newColor) => setSelectedColor(newColor)}
                  autoRotateDefault={false}
                  className="w-full h-full"
                />
              </div>

            </div>

            {/* RIGHT CUSTOMIZER & INFO PANEL (4-5 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <div className="bg-[#FFFDF7] text-[#17382D] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#D3B392]/40 flex flex-col justify-between h-full space-y-5">
                
                {/* Tabs */}
                <div>
                  <div className="flex items-center border-b border-[#E8DEC8] pb-1 gap-6 text-xs sm:text-sm font-semibold">
                    <button
                      onClick={() => setCraftingTab('customizer')}
                      className={`flex items-center gap-1.5 pb-2 transition-colors relative ${
                        craftingTab === 'customizer' ? 'text-[#17382D] font-bold' : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      <Edit3 className="w-4 h-4 text-[#B69A68]" />
                      <span>Tùy chỉnh thiết kế</span>
                      {craftingTab === 'customizer' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#17382D] rounded-full" />
                      )}
                    </button>

                    <button
                      onClick={() => setCraftingTab('minigame')}
                      className={`flex items-center gap-1.5 pb-2 transition-colors relative ${
                        craftingTab === 'minigame' ? 'text-[#17382D] font-bold' : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#B69A68]" />
                      <span>Thử tài mài bóng</span>
                      {craftingTab === 'minigame' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#17382D] rounded-full" />
                      )}
                    </button>

                    <button
                      onClick={() => setCraftingTab('info')}
                      className={`flex items-center gap-1.5 pb-2 transition-colors relative ${
                        craftingTab === 'info' ? 'text-[#17382D] font-bold' : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      <Info className="w-4 h-4 text-[#B69A68]" />
                      <span>Thông tin</span>
                      {craftingTab === 'info' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#17382D] rounded-full" />
                      )}
                    </button>
                  </div>

                  {/* TAB 1: TÙY CHỈNH THIẾT KẾ */}
                  {craftingTab === 'customizer' && (
                    <div className="pt-4 space-y-4">
                      
                      {/* Motifs Grid */}
                      <div className="space-y-2">
                        <span className="font-bold text-[#17382D] text-xs flex items-center gap-1.5">
                          <span className="text-[#B69A68]">❖</span>
                          Họa tiết khảm trai
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.values(MOTIFS).map((m) => {
                            const isSelected = selectedMotif === m.id;
                            return (
                              <button
                                key={m.id}
                                onClick={() => setSelectedMotif(m.id)}
                                className={`flex flex-col items-center p-1.5 rounded-2xl border-2 transition-all relative ${
                                  isSelected ? 'border-[#17382D] bg-[#F5F0E5]/70 shadow-sm' : 'border-transparent bg-[#F9F7F2]'
                                }`}
                              >
                                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white mb-1 relative">
                                  <img src={m.thumbnail} alt={m.name} className="w-full h-full object-cover" />
                                  {isSelected && (
                                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#17382D] text-white flex items-center justify-center">
                                      <Check className="w-2 h-2 stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] font-semibold text-gray-800 line-clamp-1">{m.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="space-y-2">
                        <span className="font-bold text-[#17382D] text-xs flex items-center gap-1.5">
                          <span className="text-[#B69A68]">❖</span>
                          Màu nền sơn mài
                        </span>
                        <div className="flex items-center gap-3">
                          {COLOR_SWATCHES.map((swatch) => (
                            <button
                              key={swatch.id}
                              onClick={() => setSelectedColor(swatch.id)}
                              title={swatch.name}
                              className={`w-7 h-7 rounded-full transition-transform ${
                                selectedColor === swatch.id ? 'ring-2 ring-offset-2 ring-[#17382D] scale-110' : 'hover:scale-105'
                              }`}
                              style={{ backgroundColor: swatch.hex }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div className="space-y-2">
                        <span className="font-bold text-[#17382D] text-xs flex items-center gap-1.5">
                          <span className="text-[#B69A68]">❖</span>
                          Kích thước
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {SIZES.map((sz) => (
                            <button
                              key={sz.id}
                              onClick={() => setSelectedSize(sz.id)}
                              className={`py-1.5 text-center rounded-xl text-xs font-semibold border transition-all ${
                                selectedSize === sz.id
                                  ? 'bg-[#17382D] text-white border-[#17382D]'
                                  : 'bg-[#F9F7F2] text-gray-700 border-[#E8DEC8]'
                              }`}
                            >
                              {sz.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Engraving */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-[#17382D] text-xs flex items-center gap-1.5">
                          <span className="text-[#B69A68]">❖</span>
                          Khắc tên / Cá nhân hóa
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={20}
                            value={engravedText}
                            onChange={(e) => setEngravedText(e.target.value)}
                            placeholder="Nhập tên, lời nhắn (tối đa 20 ký tự)"
                            className="w-full bg-[#F9F7F2] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-[#17382D] placeholder-gray-400 focus:outline-none focus:border-[#17382D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono">
                            {engravedText.length}/20
                          </span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: MINI-GAME MÀI BÓNG */}
                  {craftingTab === 'minigame' && (
                    <div className="pt-4 space-y-4 text-xs">
                      <div className="p-3 rounded-2xl bg-[#F5F0E5] border border-[#E8DEC8] space-y-2">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Độ bóng xà cừ ngũ sắc:</span>
                          <span className="text-emerald-700 font-mono font-bold">{polishProgress}%</span>
                        </div>
                        <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#D3B392]/30">
                          <div 
                            className="bg-gradient-to-r from-[#D3B392] to-emerald-600 h-full transition-all duration-300"
                            style={{ width: `${polishProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-[#E8DEC8]">
                        <img 
                          src="/images/cat_box.jpg" 
                          alt="Khảm trai mài bóng" 
                          className="w-full h-full object-cover transition-all duration-300"
                          style={{
                            filter: `brightness(${0.7 + (polishProgress / 100) * 0.4}) contrast(${0.9 + (polishProgress / 100) * 0.3})`
                          }}
                        />
                        {polishProgress >= 100 && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-3 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-1" />
                            <div className="font-serif font-bold text-sm">Tuyệt Phẩm Hoàn Thành!</div>
                            <div className="text-[10px] text-gray-200">Đã mở khóa huy hiệu Bàn Tay Vàng.</div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handlePolishClick}
                        className="w-full py-2.5 rounded-xl bg-[#17382D] hover:bg-[#23533E] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4 text-[#D3B392]" />
                        <span>{polishProgress < 100 ? 'Mài bóng cát & Lá chuối khô (+25%)' : 'Thử lại từ đầu ↻'}</span>
                      </button>
                    </div>
                  )}

                  {/* TAB 3: THÔNG TIN SẢN PHẨM */}
                  {craftingTab === 'info' && (
                    <div className="pt-4 space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B69A68]">Di sản Chuôn Ngọ</span>
                        <h4 className="font-serif text-base font-bold text-[#17382D]">
                          Hộp Trang Sức Khảm Trai {curMotifObj.name}
                        </h4>
                        <p className="text-gray-500 text-[11px]">{curMotifObj.sub}</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#F5F0E5] border border-[#E8DEC8] flex items-baseline justify-between">
                        <span className="text-gray-600">Giá niêm yết:</span>
                        <span className="font-serif text-base font-bold text-[#17382D]">
                          {formatPrice(activeSizeObj.price)}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-gray-700">
                        <div className="flex justify-between py-1 border-b border-[#F2ECE0]">
                          <span className="text-gray-500">Chất liệu:</span>
                          <span className="font-semibold">Gỗ mun sừng / trắc nguyên khối</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#F2ECE0]">
                          <span className="text-gray-500">Xà cừ:</span>
                          <span className="font-semibold">Ốc đỏ Singapore & cửu khổng</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#F2ECE0]">
                          <span className="text-gray-500">Kích thước:</span>
                          <span className="font-mono">{activeSizeObj.dims.l}×{activeSizeObj.dims.w}×{activeSizeObj.dims.h} cm</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Nghệ nhân:</span>
                          <span className="font-semibold">Nghệ nhân Ưu tú Trương Kim Thành</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#E8DEC8] flex items-center gap-3">
                  <button
                    onClick={handleSaveAndAddToCart}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#17382D] hover:bg-[#245741] text-[#FFFDF7] font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D3B392]" />
                    <span>Lưu thiết kế &amp; Đặt hàng</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      showToast(isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào tác phẩm yêu thích!');
                    }}
                    title={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
                      isFavorite ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-white border-[#E8DEC8] text-gray-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-600' : ''}`} />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS (Artisan, Workshop, Journal, Share)
      ========================================================================= */}
      <ArtisanModal
        isOpen={isArtisanModalOpen}
        onClose={() => setIsArtisanModalOpen(false)}
        onCompleteQuest={() => markQuestComplete('quest_2')}
        onOpenVideo={() => openVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Nghệ nhân Ưu tú Trương Kim Thành')}
      />

      <WorkshopExploreModal
        isOpen={isWorkshopModalOpen}
        onClose={() => setIsWorkshopModalOpen(false)}
        onGoToCrafting={() => setActiveExperienceMode('crafting')}
      />

      <JournalBadgesModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        completedQuests={completedQuests}
        discoveredHotspots={discoveredHotspots}
      />

      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        onSelectMasterpiece={(item) => {
          showToast(`Đã chọn kiệt tác: ${item.title}`);
          setActiveExperienceMode('crafting');
        }}
      />

      <AchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        completedQuests={completedQuests}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        motif={curMotifObj.name}
        color={curColorObj.name}
        size={selectedSize}
      />

    </div>
  );
};
