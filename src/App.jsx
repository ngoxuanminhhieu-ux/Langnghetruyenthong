import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WorkshopProvider } from './context/WorkshopContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { Toast } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { HeritagePage } from './pages/HeritagePage';
import { ExperiencePage } from './pages/ExperiencePage';
import { WorkshopPage } from './pages/WorkshopPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { DigitalPassportPage } from './pages/DigitalPassportPage';

// Modals
import { VideoModal } from './components/modals/VideoModal';
import { QRCodeScannerModal } from './components/modals/QRCodeScannerModal';
import { WebARModal } from './components/modals/WebARModal';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { WorkshopBookingModal } from './components/modals/WorkshopBookingModal';
import { AuthModal } from './components/modals/AuthModal';
import { SearchModal } from './components/modals/SearchModal';

const AppContent = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#2B1E16]">
      {/* Global Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'heritage' && <HeritagePage />}
        {currentView === 'experience' && <ExperiencePage />}
        {currentView === 'workshop' && <WorkshopPage />}
        {currentView === 'cart' && <CartCheckoutPage />}
        {currentView === 'account' && <AccountPage />}
        {currentView === 'admin' && <AdminPage />}
        {currentView === 'passport' && <DigitalPassportPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <VideoModal />
      <QRCodeScannerModal />
      <WebARModal />
      <QuickViewModal />
      <WorkshopBookingModal />
      <AuthModal />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <WorkshopProvider>
        <AppContent />
      </WorkshopProvider>
    </AppProvider>
  );
}
