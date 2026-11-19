import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/heritageData';
import { 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  QrCode, 
  Box, 
  ShieldCheck
} from 'lucide-react';

export const Header = () => {
  const { 
    currentView, 
    navigateTo, 
    cartCount, 
    setIsCartOpen, 
    user, 
    setIsAuthModalOpen, 
    setIsSearchOpen,
    openPassport
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#101813]/95 backdrop-blur-md shadow-md border-b border-[#D3B392]/25 py-3' 
          : 'bg-[#101813] border-b border-[#D3B392]/15 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Left - Lotus Shell Crest + Brand Name */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Shell Fan / Lotus Icon */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFFDF7] to-[#F5F0E5] p-1.5 flex items-center justify-center shadow-sm border border-[#D3B392]/60 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M50 15 C50 15, 38 40, 38 60 C38 72, 44 80, 50 80 C56 80, 62 72, 62 60 C62 40, 50 15, 50 15 Z" fill="#101813" />
                <path d="M50 30 C42 42, 22 55, 24 72 C25 80, 34 82, 42 80 C48 78, 50 74, 50 72" fill="#D3B392" />
                <path d="M50 30 C58 42, 78 55, 76 72 C75 80, 66 82, 58 80 C52 78, 50 74, 50 72" fill="#D3B392" />
                <circle cx="50" cy="74" r="3" fill="#101813" />
              </svg>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="font-serif text-[19px] sm:text-[21px] font-semibold tracking-wide text-[#FFFDF7] leading-none">
                Tân Khảm
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.12em] text-[#D3B392] uppercase mt-0.5 whitespace-nowrap">
                Tân sắc diện - Khảm tinh hoa
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[14px]">
            {/* Trang chủ */}
            <button
              onClick={() => navigateTo('home')}
              className={`relative py-1 font-medium transition-colors ${
                currentView === 'home' 
                  ? 'text-[#FFFDF7] font-semibold' 
                  : 'text-[#F5F0E5]/80 hover:text-[#D3B392]'
              }`}
            >
              Trang chủ
              {currentView === 'home' && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#D3B392] shadow-[0_0_8px_rgba(211,179,146,0.6)] rounded-full" />
              )}
            </button>

            {/* Dropdown Sản phẩm */}
            <div 
              className="relative"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('shop')}
                className={`flex items-center gap-1 py-1 font-medium transition-colors ${
                  currentView === 'shop' || currentView === 'product-detail'
                    ? 'text-[#FFFDF7] font-semibold' 
                    : 'text-[#F5F0E5]/80 hover:text-[#D3B392]'
                }`}
              >
                <span>Sản phẩm</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#101813] border border-[#D3B392]/30 rounded-xl shadow-2xl py-2 px-1 mt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setProductDropdownOpen(false);
                        navigateTo('shop', cat.id);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#F5F0E5] hover:bg-[#D3B392]/15 rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                      <span className="text-xs text-[#D3B392] opacity-70 group-hover:opacity-100">→</span>
                    </button>
                  ))}
                  <div className="mt-1 pt-1 border-t border-[#D3B392]/20">
                    <button
                      onClick={() => {
                        setProductDropdownOpen(false);
                        navigateTo('shop', 'all');
                      }}
                      className="w-full text-center py-1.5 text-xs font-semibold text-[#D3B392] hover:text-[#FFFDF7]"
                    >
                      Xem tất cả sản phẩm →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Trải nghiệm */}
            <div 
              className="relative"
              onMouseEnter={() => setExperienceDropdownOpen(true)}
              onMouseLeave={() => setExperienceDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('experience')}
                className={`relative flex items-center gap-1 py-1 font-medium transition-colors ${
                  currentView === 'experience'
                    ? 'text-[#FFFDF7] font-semibold' 
                    : 'text-[#F5F0E5]/80 hover:text-[#D3B392]'
                }`}
              >
                <span>Trải nghiệm</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${experienceDropdownOpen ? 'rotate-180' : ''}`} />
                {currentView === 'experience' && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#D3B392] shadow-[0_0_8px_rgba(211,179,146,0.6)] rounded-full" />
                )}
              </button>

              {experienceDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-[#101813] border border-[#D3B392]/30 rounded-xl shadow-2xl py-2 px-1 mt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      setExperienceDropdownOpen(false);
                      navigateTo('experience');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#D3B392]/15 rounded-lg transition-colors flex items-center gap-2.5 text-xs text-[#FFFDF7]"
                  >
                    <Box className="w-4 h-4 text-[#D3B392]" />
                    <span>Mô phỏng WebAR 3D</span>
                  </button>
                  <button
                    onClick={() => {
                      setExperienceDropdownOpen(false);
                      openPassport();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#D3B392]/15 rounded-lg transition-colors flex items-center gap-2.5 text-xs text-[#FFFDF7]"
                  >
                    <QrCode className="w-4 h-4 text-[#D3B392]" />
                    <span>Định danh di sản số (QR Passport)</span>
                  </button>
                  <button
                    onClick={() => {
                      setExperienceDropdownOpen(false);
                      navigateTo('experience', 'game');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#D3B392]/15 rounded-lg transition-colors flex items-center gap-2.5 text-xs text-[#FFFDF7]"
                  >
                    <Sparkles className="w-4 h-4 text-[#D3B392]" />
                    <span>Mini-game Nghệ nhân</span>
                  </button>
                </div>
              )}
            </div>

            {/* Câu chuyện di sản */}
            <button
              onClick={() => navigateTo('heritage')}
              className={`py-1 font-medium transition-colors ${
                currentView === 'heritage' 
                  ? 'text-[#FFFDF7] font-semibold' 
                  : 'text-[#F5F0E5]/80 hover:text-[#D3B392]'
              }`}
            >
              Câu chuyện di sản
            </button>

            {/* Workshop */}
            <button
              onClick={() => navigateTo('workshop')}
              className={`py-1 font-medium transition-colors ${
                currentView === 'workshop' 
                  ? 'text-[#FFFDF7] font-semibold' 
                  : 'text-[#F5F0E5]/80 hover:text-[#D3B392]'
              }`}
            >
              Workshop
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F5F0E5]/85 hover:text-[#D3B392] transition-colors p-1"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Cart Icon with red badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#F5F0E5]/85 hover:text-[#D3B392] transition-colors p-1"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#D9383A] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* User Icon */}
            <button
              onClick={() => {
                if (user) navigateTo('account');
                else setIsAuthModalOpen(true);
              }}
              className="text-[#F5F0E5]/85 hover:text-[#D3B392] transition-colors p-1 hidden sm:block"
              aria-label="Tài khoản"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* "Đăng nhập" Pill Button */}
            {user ? (
              <button
                onClick={() => navigateTo('account')}
                className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold text-[#FFFDF7] border border-[#D3B392]/40 hover:border-[#D3B392] bg-[#D3B392]/10 hover:bg-[#D3B392]/20 transition-all shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 inline-block"></span>
                {user.name.split(' ').pop()}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FFFDF7] border border-[#D3B392]/40 hover:border-[#D3B392] bg-[#D3B392]/10 hover:bg-[#D3B392]/20 transition-all shadow-sm"
              >
                Đăng nhập
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#F5F0E5] p-1"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101813] border-t border-[#D3B392]/25 px-4 pt-3 pb-5 mt-2 space-y-2.5 shadow-xl">
          <button
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#FFFDF7] border-b border-[#D3B392]/20 font-medium"
          >
            Trang chủ
          </button>
          <button
            onClick={() => { navigateTo('shop'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#FFFDF7] border-b border-[#D3B392]/20"
          >
            Sản phẩm & Bộ sưu tập
          </button>
          <button
            onClick={() => { navigateTo('experience'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#FFFDF7] border-b border-[#D3B392]/20"
          >
            Trải nghiệm AR/VR & Định danh số
          </button>
          <button
            onClick={() => { navigateTo('heritage'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#FFFDF7] border-b border-[#D3B392]/20"
          >
            Câu chuyện di sản
          </button>
          <button
            onClick={() => { navigateTo('workshop'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#FFFDF7] border-b border-[#D3B392]/20"
          >
            Workshop
          </button>
          <button
            onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-[#D3B392] border-b border-[#D3B392]/20 font-semibold"
          >
            Cổng Quản Trị Admin
          </button>
          <div className="pt-2">
            <button
              onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-full text-center text-xs font-semibold bg-[#D3B392] text-[#141A16] shadow-sm"
            >
              {user ? `Tài khoản (${user.name})` : 'Đăng nhập / Đăng ký'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
