import React, { useState } from 'react';
import { useApp, PUBLIC_HTTPS_TUNNEL, LOCAL_LAN_IP } from '../../context/AppContext';
import { QRCodeGenerator } from '../common/QRCodeGenerator';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  Smartphone, 
  Globe, 
  Laptop, 
  Wifi, 
  Camera, 
  ArrowRight,
  Sparkles,
  Lock,
  Box
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ShareModal = ({ 
  isOpen, 
  onClose, 
  product, 
  motif = 'Hoa Sen', 
  color = 'Đen tuyền', 
  size = 'Size M' 
}) => {
  const { navigateTo, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState('public'); // 'public' | 'wifi' | 'local'

  if (!isOpen) return null;

  const productName = product?.name || 'Hộp Khảm Trai Chuôn Ngọ';
  const displayMotif = motif || 'Hoa Sen';
  const displayColor = color || 'Đen tuyền';
  const displaySize = size || 'Size M';

  // Construct target AR viewing URL
  const queryParams = `?view=experience&mode=crafting&motif=${encodeURIComponent(displayMotif)}&color=${encodeURIComponent(displayColor)}&size=${encodeURIComponent(displaySize)}`;

  let shareUrl = '';
  if (scanMode === 'public') {
    shareUrl = `${PUBLIC_HTTPS_TUNNEL}/${queryParams}`;
  } else if (scanMode === 'wifi') {
    shareUrl = `http://${LOCAL_LAN_IP}/${queryParams}`;
  } else {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    shareUrl = `${origin}/${queryParams}`;
  }

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        showToast(`Đã sao chép liên kết AR: ${shareUrl}`);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onClose();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
      navigateTo('experience', 'crafting');
      showToast('Đã quét mã thành công! Mở không gian AR 3D.');
    }, 1200);
  };

  const handleDirectOpen = () => {
    onClose();
    navigateTo('experience', 'crafting');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tân Khảm - Trải nghiệm sản phẩm AR/3D 360°',
        text: `Chiêm ngưỡng tuyệt phẩm ${productName} với tùy biến (${displayMotif} • ${displayColor}) trong không gian 3D & AR!`,
        url: shareUrl
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-[#D3B392] text-[#17382D] space-y-4 max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#17382D] text-[#D3B392] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#17382D]">Chia Sẻ Trải Nghiệm AR & 3D</h3>
              <p className="text-[10px] text-gray-500 font-mono">Quét mã bằng điện thoại để xem trực tiếp trong phòng thật</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F0E5] hover:bg-[#D3B392] hover:text-[#17382D] flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Preview */}
        <div className="p-3 rounded-2xl bg-[#F5F0E5]/70 border border-[#E8DEC8] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#17382D] text-[#D3B392] flex items-center justify-center font-serif text-base font-bold shrink-0 border border-[#D3B392]">
            TK
          </div>
          <div className="text-xs min-w-0">
            <div className="font-bold text-[#17382D] truncate">{productName}</div>
            <div className="text-[11px] text-[#8B3A1E] font-medium">
              Tùy biến: {displayMotif} • {displayColor} • {displaySize}
            </div>
          </div>
        </div>

        {/* Network Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 text-[11px]">
          <button
            onClick={() => setScanMode('public')}
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
              scanMode === 'public'
                ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Mọi Điện Thoại</span>
            </div>
            <span className="text-[9px] text-emerald-300 opacity-90">HTTPS (Khuyên dùng)</span>
          </button>

          <button
            onClick={() => setScanMode('wifi')}
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
              scanMode === 'wifi'
                ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-[#D3B392]" />
              <span>Wi-Fi Cục Bộ</span>
            </div>
            <span className="text-[9px] opacity-80 font-mono">192.168.1.5</span>
          </button>

          <button
            onClick={() => setScanMode('local')}
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
              scanMode === 'local'
                ? 'bg-[#17382D] text-white border-[#17382D] font-bold shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-1">
              <Laptop className="w-3 h-3 text-[#D3B392]" />
              <span>Máy Tính</span>
            </div>
            <span className="text-[9px] opacity-80 font-mono">localhost:5173</span>
          </button>
        </div>

        {/* Authentic ISO Scannable QR Code */}
        <div className="p-4 rounded-2xl bg-white border-2 border-[#D3B392] text-center space-y-3 shadow-md">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#17382D] font-bold uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-[#8B3A1E]" />
            <span>Quét để xem AR trên điện thoại</span>
          </div>

          <div className="relative inline-block mx-auto">
            <QRCodeGenerator 
              value={shareUrl} 
              size={180} 
              showLogo={true}
              errorCorrectionLevel="H"
            />

            {/* Laser scanning animation */}
            {isScanning && (
              <div className="absolute inset-2 rounded-xl overflow-hidden pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-bounce" />
                <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/85 text-white font-mono text-[10px] font-bold animate-pulse">
                    Đang giải mã không gian AR...
                  </span>
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-gray-600 leading-tight">
            Mở <strong>Camera điện thoại</strong> hoặc <strong>Zalo</strong> quét mã QR để khởi chạy WebAR ngay tức thì
          </p>
        </div>

        {/* Link Copy Input */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-semibold text-gray-700 block">
            Liên kết trực tiếp:
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-grow px-3 py-2 text-xs bg-[#F5F0E5]/70 border border-[#E8DEC8] rounded-xl text-gray-800 select-all font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 shadow-sm ${
                copied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#17382D] text-white hover:bg-[#255241]'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="py-2.5 px-3 rounded-xl bg-[#8B3A1E] hover:bg-[#A34524] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98 disabled:opacity-50"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Quét thử mô phỏng</span>
          </button>

          <button
            onClick={handleDirectOpen}
            className="py-2.5 px-3 rounded-xl bg-[#17382D] hover:bg-[#255241] text-[#FFFDF7] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
          >
            <Box className="w-3.5 h-3.5 text-[#D3B392]" />
            <span>Mở Studio 3D/AR</span>
          </button>
        </div>

        {/* Social Share Button */}
        <button
          onClick={handleNativeShare}
          className="w-full py-2.5 rounded-xl bg-[#B69A68] hover:bg-[#D4BA88] text-[#17382D] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Chia sẻ qua mạng xã hội</span>
        </button>

      </div>
    </div>
  );
};
