import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';

/**
 * Standard-Compliant ISO/IEC 18004 QR Code Component
 * Generates genuine, scannable QR matrices compatible with iOS Camera,
 * Android Google Lens, Zalo Scanner, and any physical mobile device.
 */
export const QRCodeGenerator = ({
  value = 'https://tankham.com/?view=passport&id=SP001',
  size = 200,
  className = '',
  color = '#101813',
  bgColor = '#FFFFFF',
  showLogo = true,
  errorCorrectionLevel = 'H' // High (30% recovery) allows center logo without loss of scannability
}) => {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    if (!value) return;

    QRCode.toDataURL(value, {
      width: Math.max(size * 2, 400), // Retina sharp resolution
      margin: 3, // Generous quiet zone for fast camera recognition
      errorCorrectionLevel: errorCorrectionLevel,
      color: {
        dark: color || '#101813',
        light: bgColor || '#FFFFFF'
      }
    })
      .then(url => {
        if (!isCancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(err => {
        console.error('Error generating scannable QR Code:', err);
        if (!isCancelled) {
          setError(err);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [value, size, color, bgColor, errorCorrectionLevel]);

  return (
    <div 
      className={`relative inline-flex items-center justify-center p-2 rounded-2xl bg-white shadow-sm border border-[#E8DEC8] select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {dataUrl ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Authentic Scannable QR Matrix */}
          <img 
            src={dataUrl} 
            alt="Mã QR định danh di sản số Chuôn Ngọ" 
            className="w-full h-full object-contain rounded-lg"
          />

          {/* Center Lotus Emblem Badge: sized cleanly at ~16% to keep >97% of QR matrix 100% visible */}
          {showLogo && (
            <div 
              className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none"
              style={{ width: size * 0.16, height: size * 0.16 }}
            >
              <div className="w-full h-full rounded-full bg-white p-1 border border-[#D3B392] shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#17382D]" fill="currentColor">
                  <path d="M12 2C11 6 7 9 7 13C7 16 9.5 18 12 18C14.5 18 17 16 17 13C17 9 13 2 12 2Z" />
                  <path d="M12 6C8 9 3 12 4 16C5 18 8 18 10 18C11 17 12 15 12 14" fill="#D3B392" opacity="0.9" />
                  <path d="M12 6C16 9 21 12 20 16C19 18 16 18 14 18C13 17 12 15 12 14" fill="#D3B392" opacity="0.9" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : error ? (
        <div className="text-[11px] text-red-500 text-center p-2">
          Không thể tạo mã QR. Vui lòng thử lại.
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-xs text-gray-400 gap-2 animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-700/30 border-t-emerald-700 animate-spin" />
          <span className="text-[10px] font-mono">Đang tạo mã QR chuẩn ISO...</span>
        </div>
      )}
    </div>
  );
};
