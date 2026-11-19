import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Users, 
  Award, 
  Star, 
  Search, 
  Filter,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Settings
} from 'lucide-react';

// Components
import { WorkshopHeroBanner } from '../components/workshop/WorkshopHeroBanner';
import { WorkshopCard } from '../components/workshop/WorkshopCard';
import { WorkshopDetailView } from '../components/workshop/WorkshopDetailView';
import { WorkshopCalendarView } from '../components/workshop/WorkshopCalendarView';
import { WorkshopArtisansView } from '../components/workshop/WorkshopArtisansView';
import { WorkshopReviewsShowcase } from '../components/workshop/WorkshopReviewsShowcase';

// Modals
import { WorkshopBookingModalEnhanced } from '../components/workshop/WorkshopBookingModalEnhanced';
import { WorkshopReviewModal } from '../components/workshop/WorkshopReviewModal';
import { ArtisanDetailModal } from '../components/workshop/ArtisanDetailModal';

export const WorkshopPage = () => {
  const { 
    workshops, 
    activeWorkshopId, 
    navigateToWorkshopDetail, 
    backToWorkshopList, 
    workshopTab, 
    setWorkshopTab,
    openBooking,
    openArtisanProfile,
    setIsReviewModalOpen
  } = useWorkshop();
  
  const { user, navigateTo } = useApp();

  // Filters for workshops list
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If a specific workshop detail is active, render Detail View directly
  if (activeWorkshopId) {
    return (
      <>
        <WorkshopDetailView
          workshopId={activeWorkshopId}
          onBack={backToWorkshopList}
          onBookWorkshop={(ws, sched) => openBooking(ws, sched)}
          onOpenArtisanProfile={(artisan) => openArtisanProfile(artisan)}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />
        <WorkshopBookingModalEnhanced />
        <WorkshopReviewModal />
        <ArtisanDetailModal />
      </>
    );
  }

  // Filter workshops
  const filteredWorkshops = workshops.filter(ws => {
    if (categoryFilter !== 'all' && ws.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ws.title.toLowerCase().includes(q);
      const matchDesc = ws.shortDesc?.toLowerCase().includes(q) || ws.fullDesc?.toLowerCase().includes(q);
      const matchArtisan = ws.artisanName?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchArtisan) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FFFDF7] min-h-screen py-8 sm:py-12 text-[#2B1E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Quick Access Bar if logged in as Admin */}
        {user?.role === 'admin' && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#17382D] text-[#FFFDF7] border border-[#D3B392]/50 shadow-md flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#D3B392] animate-spin-slow" />
              <span>Đang đăng nhập với quyền <strong>Quản Trị Viên (Admin)</strong>. Bạn có toàn quyền thêm, sửa, quản lý ca học và duyệt đăng ký.</span>
            </div>
            <button
              onClick={() => navigateTo('admin')}
              className="px-3.5 py-1.5 rounded-xl bg-[#D3B392] hover:bg-[#E7C6A2] text-[#101813] font-bold shrink-0 transition-colors"
            >
              Mở Bảng Quản Trị Workshop →
            </button>
          </div>
        )}

        {/* 1. Hero Banner */}
        <WorkshopHeroBanner
          onExploreClick={() => {
            setWorkshopTab('list');
            const el = document.getElementById('workshop-content-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onCalendarClick={() => {
            setWorkshopTab('calendar');
            const el = document.getElementById('workshop-content-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Sub-Navigation Tabs */}
        <div id="workshop-content-section" className="mb-10">
          <div className="flex items-center justify-center sm:justify-start border-b border-[#E8DEC8] overflow-x-auto pb-1 text-xs sm:text-sm font-semibold gap-2 sm:gap-6">
            {[
              { id: 'list', label: 'Chương Trình Workshop', icon: Sparkles, count: workshops.length },
              { id: 'calendar', label: 'Lịch Tổ Chức & Chỗ Trống', icon: CalendarIcon },
              { id: 'artisans', label: 'Hồ Sơ Nghệ Nhân', icon: Award },
              { id: 'reviews', label: 'Đánh Giá & Tác Phẩm Học Viên', icon: Star }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = workshopTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setWorkshopTab(tab.id)}
                  className={`py-3 px-3.5 sm:px-4 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#17382D] text-[#FFFDF7] shadow-sm font-bold'
                      : 'text-gray-600 hover:text-[#17382D] hover:bg-[#F5F0E5]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D3B392]' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-[#D3B392] text-[#101813] font-mono' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. TAB CONTENT */}
        
        {/* TAB 1: LIST VIEW */}
        {workshopTab === 'list' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter pills & Search bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-xs">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'offline-studio', label: 'Studio Hà Nội' },
                  { id: 'offline-village', label: 'Làng Chuôn Ngọ' },
                  { id: 'family', label: 'Gia đình & Trẻ em' },
                  { id: 'online-diy', label: 'Trực tuyến & DIY Kit' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                      categoryFilter === cat.id
                        ? 'bg-[#17382D] text-[#FFFDF7] shadow-xs'
                        : 'bg-[#F5F0E5] text-gray-700 hover:bg-[#E8DEC8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative text-xs min-w-[260px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên khóa học hoặc nghệ nhân..."
                  className="w-full pl-9 pr-4 py-2 bg-[#FFFDF7] border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#17382D]"
                />
              </div>
            </div>

            {/* Workshops Grid */}
            {filteredWorkshops.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DEC8] space-y-3">
                <p className="text-gray-500 text-sm">Không tìm thấy workshop phù hợp với bộ lọc.</p>
                <button
                  onClick={() => { setCategoryFilter('all'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredWorkshops.map(ws => (
                  <WorkshopCard
                    key={ws.id}
                    workshop={ws}
                    onDetailClick={() => navigateToWorkshopDetail(ws.id)}
                    onBookClick={() => openBooking(ws)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CALENDAR VIEW */}
        {workshopTab === 'calendar' && (
          <WorkshopCalendarView
            onSelectWorkshop={(id) => navigateToWorkshopDetail(id)}
            onBookSession={(ws, sched) => openBooking(ws, sched)}
          />
        )}

        {/* TAB 3: ARTISANS VIEW */}
        {workshopTab === 'artisans' && (
          <WorkshopArtisansView
            onSelectArtisan={(artisan) => openArtisanProfile(artisan)}
            onBookWorkshop={(ws) => openBooking(ws)}
          />
        )}

        {/* TAB 4: REVIEWS & SHOWCASE VIEW */}
        {workshopTab === 'reviews' && (
          <WorkshopReviewsShowcase
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

      </div>

      {/* Global Workshop Modals */}
      <WorkshopBookingModalEnhanced />
      <WorkshopReviewModal />
      <ArtisanDetailModal />
    </div>
  );
};
