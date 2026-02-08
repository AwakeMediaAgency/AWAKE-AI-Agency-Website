import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 glass rounded-full border border-white/10 pointer-events-auto transition-all duration-500 hover:border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img
            src="https://placehold.co/40x40/1f75fe/ffffff?text=V"
            alt="VoltFlow Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-black text-2xl tracking-tighter uppercase italic">
            VOLT<span className="text-brand-blue">FLOW</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
          <a href="#expertise" className="hover:text-white transition-colors relative group">
            Expertise
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#audit" className="hover:text-white transition-colors relative group">
            Audit
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#pricing" className="hover:text-white transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors">Login</button>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-brand-blue hover:text-white shadow-xl">
            Book Strategy
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;