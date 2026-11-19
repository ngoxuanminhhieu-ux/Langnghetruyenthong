import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#17382D] text-[#FFFDF7] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#B69A68] flex items-center gap-3 text-xs max-w-sm">
        {toast.type === 'info' ? (
          <Info className="w-4 h-4 text-[#B69A68] shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#D8C29D] shrink-0" />
        )}
        <span className="font-medium leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};

