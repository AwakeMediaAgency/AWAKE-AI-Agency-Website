
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-40 px-6 bg-brand-dark">
      <div className="max-w-5xl mx-auto glass rounded-[60px] p-12 md:p-24 text-center border-brand-blue/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-blue/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div className="inline-block p-4 rounded-2xl bg-brand-blue text-white mb-10 shadow-[0_20px_40px_rgba(31,117,254,0.3)]">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic leading-[0.9]">
            Ready to liquidate <br />
            <span className="text-brand-blue">your friction?</span>
          </h3>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            Stop losing leads to manual lag. Build your custom automation engine today and start turning viewers into buyers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-16 py-7 bg-brand-blue hover:bg-[#0151d0] rounded-2xl font-black uppercase tracking-widest text-lg transition-all shadow-[0_30px_60px_-12px_rgba(31,117,254,0.5)] hover:-translate-y-2">
              Start Your Flow
            </button>
            <button className="w-full sm:w-auto px-16 py-7 glass border border-white/10 hover:border-white/30 rounded-2xl font-black uppercase tracking-widest text-lg transition-all">
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
