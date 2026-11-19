import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, WORKSHOPS } from '../data/heritageData';

// Official Cloudflare Tunnel (Enterprise speed, HTTPS, accessible by all mobile devices worldwide)
export const PUBLIC_HTTPS_TUNNEL = 'https://according-pads-dude-journalist.trycloudflare.com';

// Local LAN IP of host machine for physical mobile devices scanning over Wi-Fi
export const LOCAL_LAN_IP = '192.168.1.5:8080';

/**
 * Returns reachable URL for scanning with physical phone or browser
 * @param {string|object} productOrCode 
 * @param {'public'|'wifi'|'local'|'domain'} mode 
 */
export const getPassportScanUrl = (productOrCode, mode = 'public') => {
  const code = typeof productOrCode === 'object' 
    ? (productOrCode.id === 'CNH-001' ? 'SP001' : productOrCode.id)
    : (productOrCode === 'CNH-001' ? 'SP001' : (productOrCode || 'SP001'));
  
  if (mode === 'public') {
    return `${PUBLIC_HTTPS_TUNNEL}/?view=passport&id=${code}`;
  }
  if (mode === 'wifi') {
    return `http://${LOCAL_LAN_IP}/?view=passport&id=${code}`;
  }
  if (mode === 'local') {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    return `${origin}/?view=passport&id=${code}`;
  }
  return `https://chuonngo-heritage.vn/qr/${code}`;
};

// Helper to map passport code (SP001..SP005) to product ID (CNH-001..CNH-005)
export const mapCodeToProductId = (code) => {
  if (!code) return 'CNH-001';
  if (code.startsWith('SP00')) {
    const num = code.replace('SP00', '');
    return `CNH-00${num}`;
  }
  return code;
};

// Helper: Parse initial route from URL parameters or hash
const getInitialRoute = () => {
  if (typeof window === 'undefined') return { view: 'home', productId: 'CNH-001', code: 'SP001' };
  try {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash || '';
    const pathname = window.location.pathname || '';

    const view = params.get('view');
    const id = params.get('id') || params.get('productId') || params.get('qr');
    const qr = params.get('qr');

    if (view === 'passport' || qr) {
      const targetCode = id || qr || 'SP001';
      return { 
        view: 'passport', 
        productId: mapCodeToProductId(targetCode),
        code: targetCode
      };
    }

    if (hash.includes('passport') || hash.includes('qr')) {
      const parts = hash.replace(/^#\/?/, '').split('/');
      const targetCode = parts[1] || 'SP001';
      return { 
        view: 'passport', 
        productId: mapCodeToProductId(targetCode),
        code: targetCode
      };
    }

    if (pathname.includes('/qr/') || pathname.includes('/passport/')) {
      const parts = pathname.split('/').filter(Boolean);
      const targetCode = parts[1] || 'SP001';
      return { 
        view: 'passport', 
        productId: mapCodeToProductId(targetCode),
        code: targetCode
      };
    }

    const mode = params.get('mode');
    const ar = params.get('ar');

    if (view === 'ar' || ar === '1' || ar === 'true') {
      return { view: 'experience', productId: id || 'CNH-002', code: 'SP002', mode: 'crafting' };
    }

    if (view === 'experience') {
      return { 
        view: 'experience', 
        productId: id || 'CNH-001', 
        code: 'SP001',
        mode: (mode === 'crafting' || mode === 'customizer' || mode === 'ar') ? 'crafting' : 'village'
      };
    }

    if (view && ['home', 'shop', 'product-detail', 'heritage', 'workshop', 'cart', 'account', 'admin'].includes(view)) {
      return { view, productId: id || 'CNH-001', code: 'SP001', mode: 'village' };
    }
  } catch (e) {
    console.error('Error parsing route from URL:', e);
  }
  return { view: 'home', productId: 'CNH-001', code: 'SP001' };
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialRoute = getInitialRoute();

  // Navigation / View State
  const [currentView, setCurrentView] = useState(initialRoute.view);
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId);
  const [activePassportCode, setActivePassportCode] = useState(initialRoute.code);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [experienceMode, setExperienceMode] = useState(initialRoute.mode || 'village'); // 'village' or 'crafting'

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[1], quantity: 1, customization: { note: 'Khắc tên: Minh Anh' } }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_wishlist');
      return saved ? JSON.parse(saved) : ['CNH-001', 'CNH-002'];
    } catch {
      return ['CNH-001'];
    }
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('chuonngo_user');
      return saved ? JSON.parse(saved) : {
        name: 'Nguyễn Minh Anh',
        email: 'minhanh.heritage@gmail.com',
        phone: '0988 123 456',
        address: 'Số 18 Tràng Tiền, Phường Tràng Tiền, Hoàn Kiếm, Hà Nội',
        role: 'customer' // 'customer' or 'admin'
      };
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Modals
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [arTargetProduct, setArTargetProduct] = useState(PRODUCTS[1]);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(PRODUCTS[0]);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [activeWorkshop, setActiveWorkshop] = useState(WORKSHOPS[0]);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Persist cart
  useEffect(() => {
    localStorage.setItem('chuonngo_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('chuonngo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('chuonngo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chuonngo_user');
    }
  }, [user]);

  // Cart operations
  const addToCart = (product, quantity = 1, customization = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && JSON.stringify(item.customization) === JSON.stringify(customization));
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, customization }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Đã xóa khỏi danh sách yêu thích', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Đã lưu vào danh sách yêu thích');
        return [...prev, productId];
      }
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Sync route on popstate / hashchange (e.g. when back/forward button is pressed)
  useEffect(() => {
    const handlePopState = () => {
      const route = getInitialRoute();
      setCurrentView(route.view);
      setSelectedProductId(route.productId);
      setActivePassportCode(route.code);
      if (route.mode) setExperienceMode(route.mode);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Navigation helper with History PushState sync
  const navigateTo = (view, extra = null) => {
    setCurrentView(view);
    let newUrl = window.location.pathname;

    if (view === 'product-detail' && extra) {
      setSelectedProductId(extra);
      newUrl = `${window.location.pathname}?view=product-detail&id=${extra}`;
    } else if (view === 'passport') {
      const code = extra || 'SP001';
      const prodId = mapCodeToProductId(code);
      setSelectedProductId(prodId);
      setActivePassportCode(code);
      newUrl = `${window.location.pathname}?view=passport&id=${code}`;
    } else if (view === 'shop') {
      if (extra) setSelectedCategoryId(extra);
      newUrl = extra ? `${window.location.pathname}?view=shop&cat=${extra}` : `${window.location.pathname}?view=shop`;
    } else if (view === 'experience') {
      if (extra === 'crafting' || extra === 'customizer' || extra === 'ar') {
        setExperienceMode('crafting');
      } else {
        setExperienceMode('village');
      }
      newUrl = `${window.location.pathname}?view=experience`;
    } else if (view === 'home') {
      newUrl = window.location.pathname;
    } else {
      newUrl = `${window.location.pathname}?view=${view}`;
    }

    try {
      window.history.pushState({ view, extra }, '', newUrl);
    } catch {
      // In case pushState is restricted
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAR = (product) => {
    setArTargetProduct(product || PRODUCTS[1]);
    setIsARModalOpen(true);
  };

  const openPassport = (codeOrProduct) => {
    if (typeof codeOrProduct === 'object' && codeOrProduct?.id) {
      setActivePassportCode(codeOrProduct.id);
      setSelectedProductId(codeOrProduct.id);
    } else if (typeof codeOrProduct === 'string') {
      setActivePassportCode(codeOrProduct);
      setSelectedProductId(codeOrProduct);
    } else {
      setActivePassportCode('CNH-001');
      setSelectedProductId('CNH-001');
    }
    setIsPassportModalOpen(true);
  };

  const openWorkshop = (ws) => {
    setActiveWorkshop(ws || WORKSHOPS[0]);
    setIsWorkshopModalOpen(true);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        experienceMode,
        setExperienceMode,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isPassportModalOpen,
        setIsPassportModalOpen,
        activePassportCode,
        openPassport,
        isARModalOpen,
        setIsARModalOpen,
        arTargetProduct,
        openAR,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isWorkshopModalOpen,
        setIsWorkshopModalOpen,
        activeWorkshop,
        openWorkshop,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

