
import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button className="group flex items-center gap-3 bg-[#1f75fe] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(31,117,254,0.4)] hover:shadow-[0_25px_50px_rgba(31,117,254,0.6)] transition-all hover:-translate-y-1 active:scale-95">
        <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
        Blueprint My Flow
      </button>
    </div>
  );
};

export default StickyCTA;
