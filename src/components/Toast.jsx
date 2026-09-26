import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-900 border-emerald-500 text-emerald-100',
    error: 'bg-red-900 border-red-500 text-red-100',
    info: 'bg-[#6B1E23] border-[#A67C3D] text-[#FFFDF7]'
  };

  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  const IconComponent = Icons[toast.type || 'info'];

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm w-full">
      <div className={`p-3.5 rounded-lg border-2 shadow-2xl flex items-start justify-between space-x-3 ${bgColors[toast.type || 'info']}`}>
        <div className="flex items-start space-x-2.5">
          <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            {toast.title && <h4 className="font-bold text-xs uppercase tracking-wider">{toast.title}</h4>}
            <p className="text-xs leading-snug mt-0.5">{toast.message}</p>
          </div>
        </div>
        <button onClick={onClose} className="opacity-70 hover:opacity-100 p-0.5">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
