import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 glass rounded-full border border-white/10 pointer-events-auto transition-all duration-500 hover:border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img 
            src="data:image/png;base64,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">
          </img>
          <span className="font-black text-2xl tracking-tighter uppercase italic">
            VOLT<span className="text-[#1f75fe]">FLOW</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
          <a href="#expertise" className="hover:text-white transition-colors relative group">
            Expertise
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1f75fe] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#audit" className="hover:text-white transition-colors relative group">
            Audit
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1f75fe] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#pricing" className="hover:text-white transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1f75fe] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors">Login</button>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#1f75fe] hover:text-white shadow-xl">
            Book Strategy
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;