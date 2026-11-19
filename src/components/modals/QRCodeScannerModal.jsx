import React, { useState } from 'react';
import { useApp, PRODUCTION_DOMAIN, PUBLIC_HTTPS_TUNNEL, LOCAL_LAN_IP } from '../../context/AppContext';
import { PRODUCTS } from '../../data/heritageData';
import { QRCodeGenerator } from '../common/QRCodeGenerator';
import { 
  X, 
  QrCode, 
  Camera, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Copy, 
  Check,
  Wifi,
  Smartphone,
  Laptop,
  Globe,
  Settings2,
  Info,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QRCodeScannerModal = () => {
  const { 
    isPassportModalOpen, 
    setIsPassportModalOpen, 
    activePassportCode, 
    navigateTo, 
    showToast 
  } = useApp();

  const [selectedId, setSelectedId] = useState(activePassportCode || 'CNH-001');
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLogoOnQR, setShowLogoOnQR] = useState(true);

  // Dynamic Host Detection: If on live domain (e.g. tankham.com), use it directly!
  const isBrowser = typeof window !== 'undefined';
  const currentOrigin = isBrowser ? window.location.origin : PRODUCTION_DOMAIN;
  const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const defaultLiveHost = (!isLocalhost && isBrowser) ? currentOrigin : PRODUCTION_DOMAIN;
  
  // Connection Mode: 'public' (tankham.com / live HTTPS, works everywhere on 4G/5G/Wi-Fi) | 'wifi' (local LAN) | 'local' (PC localhost)
  const [scanMode, setScanMode] = useState('public');
  const [customHost, setCustomHost] = useState(defaultLiveHost);
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isPassportModalOpen) return null;

  // Match targeted product
  const product = PRODUCTS.find(p => p.id === selectedId || p.id === activePassportCode) || PRODUCTS[0];
  const passportCode = product.id.startsWith('CNH-00') ? product.id.replace('CNH-00', 'SP00') : product.id;

  // Compute exact scannable URL
  let qrUrl = '';
  if (scanMode === 'public') {
    qrUrl = `${defaultLiveHost}/?view=passport&id=${passportCode}`;
  } else if (scanMode === 'wifi') {
    qrUrl = `http://${LOCAL_LAN_IP}/?view=passport&id=${passportCode}`;
  } else if (scanMode === 'local') {
    qrUrl = `${currentOrigin}/?view=passport&id=${passportCode}`;
  } else {
    qrUrl = `${customHost}/?view=passport&id=${passportCode}`;
  }

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsPassportModalOpen(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      navigateTo('passport', product.id);
      showToast(`Đã quét mã thành công! Mở Hộ chiếu di sản: ${product.name}`);
    }, 1200);
  };

  const handleDirectOpen = () => {
    setIsPassportModalOpen(false);
    navigateTo('passport', product.id);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(qrUrl);
    setCopied(true);
    showToast(`Đã sao chép liên kết QR: ${qrUrl}`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden border-2 border-[#D3B392] shadow-2xl flex flex-col text-[#17382D] max-h-[95vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#17382D] to-[#254638] text-white flex items-center justify-between border-b border-[#D3B392]/40 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D3B392]/20 border border-[#D3B392] flex items-center justify-center text-[#D3B392]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-[#FFFDF7]">
                Mã QR Định Danh Di Sản Số
              </h3>
              <p className="text-[10px] text-[#D8C29D] font-mono">
                Quét bằng Camera điện thoại hoặc Zalo để hiển thị Hộ chiếu số
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPassportModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D3B392] hover:text-[#17382D] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 text-center">
          
          {/* Product Select Pills */}
          <div className="space-y-1.5 text-left">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Chọn sản phẩm xem tem QR di sản:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {PRODUCTS.map(p => {
                const code = p.id.replace('CNH-00', 'SP00');
                const isSelected = p.id === product.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected 
                        ? 'bg-[#17382D] text-[#FFFDF7] border-[#17382D] shadow-sm scale-102' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {code} – {p.name.split(' ')[0]} {p.name.split(' ')[1]} {p.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connection Target Switcher */}
          <div className="p-2.5 rounded-2xl bg-[#F5EFE3] border border-[#E8DEC8] text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#17382D] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                Chế độ kết nối thiết bị:
              </span>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="text-[10px] text-[#8B3A1E] font-medium hover:underline flex items-center gap-0.5"
              >
                <Settings2 className="w-3 h-3" />
                {showAdvanced ? 'Ẩn cấu hình' : 'Tùy chỉnh'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {/* Option 1: Live Domain (tankham.com, permanent HTTPS, universal access) */}
              <button
                onClick={() => setScanMode('public')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  scanMode === 'public'
                    ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>{isLocalhost ? 'Tên Miền Live' : 'Mọi Điện Thoại'}</span>
                </div>
                <div className="text-[9px] opacity-80 mt-0.5 text-emerald-300 font-semibold truncate max-w-full">
                  {defaultLiveHost.replace(/^https?:\/\//, '')}
                </div>
              </button>

              {/* Option 2: Local Wi-Fi */}
              <button
                onClick={() => setScanMode('wifi')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  scanMode === 'wifi'
                    ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Wifi className="w-3 h-3 text-[#D3B392]" />
                  <span>Wi-Fi Cục Bộ</span>
                </div>
                <div className="text-[9px] opacity-80 mt-0.5 font-mono">{LOCAL_LAN_IP}</div>
              </button>

              {/* Option 3: Localhost */}
              <button
                onClick={() => setScanMode('local')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  scanMode === 'local'
                    ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Laptop className="w-3 h-3 text-[#D3B392]" />
                  <span>Máy Tính</span>
                </div>
                <div className="text-[9px] opacity-80 mt-0.5 font-mono">localhost:5173</div>
              </button>
            </div>

            {/* Advanced Host Input */}
            {showAdvanced && (
              <div className="pt-2 border-t border-gray-200/80 space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-gray-600 block">
                  Đường dẫn máy chủ tùy chỉnh:
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customHost}
                    onChange={(e) => setCustomHost(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-xs font-mono bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#17382D]"
                    placeholder="https://..."
                  />
                  <button
                    onClick={() => {
                      setCustomHost(defaultLiveHost);
                      showToast('Đã khôi phục đường dẫn mặc định: ' + defaultLiveHost);
                    }}
                    className="px-2.5 py-1 text-[10px] rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                  >
                    Mặc định
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Toggle Clean QR Matrix (with or without center logo) */}
          <div className="flex items-center justify-center gap-2">
            <label className="inline-flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLogoOnQR}
                onChange={(e) => setShowLogoOnQR(e.target.checked)}
                className="rounded border-gray-300 text-[#17382D] focus:ring-0"
              />
              <span>Hiển thị logo Tân Khảm ở tâm mã QR</span>
            </label>
          </div>

          {/* Real Standard ISO Scannable QR Code */}
          <div className="relative inline-block p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#D3B392] shadow-xl mx-auto">
            <QRCodeGenerator 
              value={qrUrl} 
              size={220} 
              showLogo={showLogoOnQR}
              errorCorrectionLevel="H"
            />

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-4 rounded-2xl overflow-hidden pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-bounce" />
                <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-2xs flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-black/85 text-white font-mono text-xs font-bold animate-pulse">
                    Đang giải mã tem QR di sản...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Notice for Phone Scanning */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-[11px] text-emerald-900 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đã kích hoạt kết nối bảo mật HTTPS:</span> Mọi điện thoại (dù dùng <strong>4G/5G</strong> hay <strong>Wi-Fi bất kỳ</strong>) khi quét mã QR đều tải trang ngay lập tức mà không sợ bị router Wi-Fi hoặc tường lửa máy tính chặn.
            </div>
          </div>

          {/* Product Quick Info Card */}
          <div className="p-3 rounded-2xl bg-[#FFFDF7] border border-[#E8DEC8] flex items-center gap-3 text-left shadow-xs">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#D3B392]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono text-[#8B3A1E] font-bold block">
                MÃ ĐỊNH DANH: {passportCode}
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1F1813] truncate">
                {product.name}
              </h4>
              <p className="text-[11px] text-gray-600 truncate">
                Nghệ nhân: {product.artisan || 'Nguyễn Văn Hòa'} • Làng Chuôn Ngọ
              </p>
            </div>
          </div>

          {/* Scannable URL Pill & Copy Button */}
          <div className="flex items-center justify-between p-2 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-600">
            <span className="truncate pr-2 font-medium">{qrUrl}</span>
            <button
              onClick={handleCopyLink}
              className="text-[#8B3A1E] hover:text-[#A34524] shrink-0 flex items-center gap-1 font-sans font-bold text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Chép URL'}</span>
            </button>
          </div>

          {/* Action Buttons: Simulated Scan vs Direct Open */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="py-3 px-4 rounded-xl bg-[#8B3A1E] hover:bg-[#A34524] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              <span>Quét thử mô phỏng</span>
            </button>

            <button
              onClick={handleDirectOpen}
              className="py-3 px-4 rounded-xl bg-[#17382D] hover:bg-[#23533E] text-[#FFFDF7] font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>Mở trang Hộ chiếu số</span>
              <ArrowRight className="w-4 h-4 text-[#D3B392]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
