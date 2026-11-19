import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Lock, 
  BookOpen, 
  Crown, 
  Compass,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { CRAFTING_STEPS, HERITAGE_BADGES, VILLAGE_HOTSPOTS } from '../../data/villageData';
import confetti from 'canvas-confetti';

// 1. MODAL GẶP GỠ NGHỆ NHÂN
export const ArtisanModal = ({ isOpen, onClose, onCompleteQuest, onOpenVideo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden text-[#FFFDF7] flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Gặp Gỡ Nghệ Nhân Ưu Tú</h3>
              <p className="text-xs text-[#D3B392]">Nghệ nhân Ưu tú Trương Kim Thành</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#D3B392]/40 shadow-lg bg-black">
              <img 
                src="/images/artisan_truong_kim_thanh.jpg" 
                alt="Nghệ nhân Trương Kim Thành"
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-center text-[#D3B392] font-mono border border-white/10">
                45 năm gìn giữ nghề tổ
              </span>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D3B392]">Truyền nhân đời thứ 5 họ Trương</span>
                <h4 className="font-serif text-xl font-bold text-[#FFFDF7]">Trương Kim Thành</h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Bậc thầy cưa lọng nét tơ tóc & cẩn ốc xà cừ đỏ ngũ sắc hoàng cung. Người phục dựng nhiều bức hoành phi câu đối di tích quốc gia đặc biệt.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-[#D3B392]/25 text-xs text-[#F5F0E5]/90 italic border-l-4 border-l-[#D3B392]">
                "Mỗi vỏ ốc xà cừ thô ráp đều ẩn chứa vầng hào quang của đất trời. Người thợ khảm trai phải nhìn ra đâu là cánh sen, đâu là lông hạc trong từng phiến ốc."
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onOpenVideo}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#17382D] hover:bg-[#23533E] text-white text-xs font-semibold border border-[#D3B392]/40 flex items-center justify-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 text-[#D3B392]" />
                  <span>Xem Video chế tác</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-[#D3B392]/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D3B392]" />
              <span className="text-gray-300">Nhiệm vụ: Lắng nghe chia sẻ của nghệ nhân</span>
            </div>
            <button
              onClick={() => {
                onCompleteQuest();
                confetti({ particleCount: 70, spread: 60 });
                onClose();
              }}
              className="py-1.5 px-3 rounded-xl bg-[#D3B392] text-[#17382D] font-bold text-xs hover:bg-[#E2C7A8] transition-colors"
            >
              Hoàn thành &amp; Nhận Huy hiệu ✓
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// 2. MODAL KHÁM PHÁ XƯỞNG CHẾ TÁC KHẢM TRAI
export const WorkshopExploreModal = ({ isOpen, onClose, onGoToCrafting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden text-[#FFFDF7] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Không Gian Xưởng Chế Tác Truyền Thống</h3>
              <p className="text-xs text-[#D3B392]">Khám phá dụng cụ &amp; nguyên liệu khảm trai</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/30 border border-[#D3B392]/30">
              <h4 className="font-serif font-bold text-base text-[#D3B392] mb-1">Cưa Lọng Dây Cung</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Chiếc cưa thủ công uốn bằng tre già với sợi cưa mảnh như sợi tóc, đòi hỏi cổ tay người thợ điêu luyện không làm vỡ vỏ trai.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-black/30 border border-[#D3B392]/30">
              <h4 className="font-serif font-bold text-base text-[#D3B392] mb-1">Vỏ Ốc Khổng &amp; Ốc Đỏ</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Nguyên liệu quý hiếm từ đáy biển sâu, mang sắc ánh xà cừ ngũ sắc chuyển biến sống động dưới ánh sáng mặt trời.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl border border-white/20 text-xs font-semibold text-gray-300 hover:text-white"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onGoToCrafting();
              }}
              className="py-2 px-5 rounded-xl bg-[#D3B392] hover:bg-[#E2C7A8] text-[#121E17] text-xs font-bold shadow-lg transition-transform active:scale-95"
            >
              Vào Xưởng Chế Tác 3D/AR →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. MODAL NHẬT KÝ & HUY HIỆU DI SẢN
export const JournalBadgesModal = ({ 
  isOpen, 
  onClose, 
  completedQuests = [], 
  discoveredHotspots = [] 
}) => {
  const [activeTab, setActiveTab] = useState('badges');
  if (!isOpen) return null;

  const unlockedBadgesCount = Math.min(5, completedQuests.length);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden text-[#FFFDF7] flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Nhật Ký Hành Trình Di Sản</h3>
              <p className="text-xs text-[#D3B392]">Lưu giữ dấu ấn khám phá làng nghề Chuôn Ngọ</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="flex border-b border-[#D3B392]/20 bg-black/20 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-2 px-4 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'badges'
                ? 'bg-[#183629] text-[#D3B392] border-t border-x border-[#D3B392]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Huy Hiệu Di Sản ({unlockedBadgesCount}/5)</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`py-2 px-4 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'locations'
                ? 'bg-[#183629] text-[#D3B392] border-t border-x border-[#D3B392]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Địa Điểm Đã Thăm ({discoveredHotspots.length}/5)</span>
          </button>
        </div>

        {/* Tab 1: Huy hiệu di sản */}
        {activeTab === 'badges' && (
          <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {HERITAGE_BADGES.map((badge, idx) => {
                const isUnlocked = completedQuests.length >= idx + 1;

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isUnlocked
                        ? 'bg-[#183629]/70 border-[#D3B392] shadow-lg'
                        : 'bg-black/20 border-white/5 opacity-50'
                    }`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isUnlocked 
                          ? 'border-white text-white shadow-md' 
                          : 'border-gray-600 bg-gray-800 text-gray-500'
                      }`}
                      style={{ backgroundColor: isUnlocked ? badge.color : undefined }}
                    >
                      {isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#FFFDF7]">
                          {badge.title}
                        </span>
                        {isUnlocked && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                            Đã Đạt
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Địa điểm đã thăm */}
        {activeTab === 'locations' && (
          <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
            {VILLAGE_HOTSPOTS.map((spot) => {
              const isDiscovered = discoveredHotspots.includes(spot.id);

              return (
                <div
                  key={spot.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    isDiscovered 
                      ? 'bg-black/30 border-[#D3B392]/30' 
                      : 'bg-black/15 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={spot.previewImg} 
                      alt={spot.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#D3B392]/30" 
                    />
                    <div>
                      <div className="font-serif font-bold text-sm text-white">{spot.name}</div>
                      <div className="text-xs text-[#D3B392]">{spot.tagline}</div>
                    </div>
                  </div>

                  <span className={`text-xs font-medium flex items-center gap-1 ${isDiscovered ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {isDiscovered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Đã ghi nhận</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Chưa khám phá</span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

// 3. MODAL BỘ SƯU TẬP KIỆT TÁC KHẢM TRAI
export const CollectionModal = ({ isOpen, onClose, onSelectMasterpiece }) => {
  if (!isOpen) return null;

  const masterpieces = [
    {
      id: 'lotus_painting',
      title: 'Đại cảnh Bách Liên Khởi Sắc',
      category: 'Tranh Sơn Mài Cẩn Xà Cừ',
      image: '/images/heritage_crafting_hero.jpg',
      material: 'Vỏ trai cửu khổng, ốc đỏ Singapore & sơn then cổ truyền',
      desc: 'Bức tranh độc bản thể hiện đầm sen mùa hạ với hiệu ứng khúc xạ ngũ sắc theo góc nhìn ánh sáng.'
    },
    {
      id: 'sailing_junk',
      title: 'Thuận Buồm Xuôi Gió',
      category: 'Bức Trướng Hoàng Gia',
      image: '/images/reference_village_sample.jpg',
      material: 'Khảm xà cừ trắng ngọc trai trên nền gỗ trắc đen bóng',
      desc: 'Tuyệt phẩm phong thủy chúc thuận buồm xuôi gió với đoàn thuyền rẽ sóng cẩn xà cừ óng ánh.'
    },
    {
      id: 'jewelry_box',
      title: 'Bút Ký Doanh Nhân Cửu Long Khảm Ốc',
      category: 'Đồ Thủ Công Mỹ Nghệ Cao Cấp',
      image: '/images/product_but_ky_kham_trai.jpg',
      material: 'Nạm vỏ ốc xà cừ ngũ sắc, mạ vàng 18K, hộp gỗ mun sơn mài',
      desc: 'Tuyệt phẩm đoạt cúp Tinh Hoa Làng Nghề Việt Nam, tích hợp tem QR định danh số.'
    },
    {
      id: 'tea_tray',
      title: 'Bát Sơn Mài Cẩn Vỏ Trứng & Xà Cừ',
      category: 'Vật Phẩm Trà Đạo',
      image: '/images/product_bat_can_trung.jpg',
      material: 'Gỗ mít tiện nguyên khối cẩn vỏ trứng nung hổ phách & xà cừ',
      desc: 'Đỉnh cao kỹ thuật cẩn trứng rạn hoàng kim và mài bóng lá chuối khô.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden text-[#FFFDF7] flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Bộ Sưu Tập Kiệt Tác Chuôn Ngọ</h3>
              <p className="text-xs text-[#D3B392]">Những hiện vật cẩn ốc xà cừ tiêu biểu qua các thời kỳ</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[65vh]">
          {masterpieces.map((item) => (
            <div 
              key={item.id}
              className="bg-black/30 border border-[#D3B392]/30 rounded-2xl overflow-hidden p-3 hover:border-[#D3B392] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black/50 border border-white/10 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#D3B392] text-[10px] font-mono border border-white/10">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#D3B392] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#D3B392] mt-0.5 font-medium">
                  {item.material}
                </p>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Hiện vật chính gốc
                </span>
                <button
                  onClick={() => {
                    onSelectMasterpiece(item);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#D3B392]/20 hover:bg-[#D3B392] text-[#D3B392] hover:text-[#121E17] font-semibold text-[11px] transition-colors flex items-center gap-1"
                >
                  <span>Chi tiết 3D</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// 4. MODAL THÀNH TÍCH & TIẾN TRÌNH KHÁM PHÁ
export const AchievementsModal = ({ isOpen, onClose, completedQuests = [] }) => {
  if (!isOpen) return null;

  const totalPoints = completedQuests.length * 250;
  const currentRank = completedQuests.length >= 5 
    ? 'Đại Sứ Di Sản Chuôn Ngọ' 
    : completedQuests.length >= 3 
      ? 'Nghệ Tinh Làng Nghề' 
      : 'Du Khách Khám Phá';

  const achievementList = [
    { title: 'Bước Chân Đầu Tiên', req: 'Tham quan Cổng làng Chuôn Ngọ', pts: 250, done: completedQuests.includes('quest_1') },
    { title: 'Tri Kỷ Nghệ Nhân', req: 'Trò chuyện cùng Nghệ nhân Ưu tú Trương Kim Thành', pts: 250, done: completedQuests.includes('quest_2') },
    { title: 'Bàn Tay Vàng', req: 'Tự tay thử công đoạn mài bóng xà cừ ngũ sắc', pts: 250, done: completedQuests.includes('quest_3') },
    { title: 'Nhà Thiết Kế Di Sản', req: 'Tùy chỉnh và lưu mẫu hộp khảm trai 3D cá nhân', pts: 250, done: completedQuests.includes('quest_4') },
    { title: 'Người Bảo Tồn Di Sản', req: 'Khám phá trọn vẹn 5 địa danh làng nghề Chuôn Ngọ', pts: 250, done: completedQuests.includes('quest_5') },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121E17] border border-[#D3B392]/60 rounded-3xl shadow-2xl overflow-hidden text-[#FFFDF7] flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#122B22] border-b border-[#D3B392]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Thành Tích &amp; Điểm Danh Dự</h3>
              <p className="text-xs text-[#D3B392]">Bảng vinh danh những người gìn giữ văn hóa làng nghề</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Stats Banner */}
        <div className="p-5 bg-black/30 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D3B392] text-[#121E17] flex items-center justify-center font-serif font-bold text-xl shadow-lg">
              {completedQuests.length}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D3B392] tracking-wider">Cấp bậc di sản</span>
              <h4 className="font-serif font-bold text-base text-white">{currentRank}</h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400">Điểm kinh nghiệm di sản</span>
            <div className="text-lg font-bold font-mono text-amber-300">{totalPoints} EXP</div>
          </div>
        </div>

        {/* Achievement List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
          {achievementList.map((ach, idx) => (
            <div 
              key={idx}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                ach.done 
                  ? 'bg-[#183629]/70 border-[#D3B392] shadow-sm' 
                  : 'bg-black/20 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  ach.done ? 'bg-amber-500/20 border-amber-300 text-amber-300' : 'bg-gray-800 border-gray-700 text-gray-500'
                }`}>
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-white">{ach.title}</h5>
                  <p className="text-xs text-gray-300">{ach.req}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-mono font-bold ${ach.done ? 'text-amber-300' : 'text-gray-500'}`}>
                  +{ach.pts} EXP
                </span>
                <div className="text-[10px]">
                  {ach.done ? (
                    <span className="text-emerald-400 font-semibold">Đã đạt ✓</span>
                  ) : (
                    <span className="text-gray-500">Chưa đạt</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
