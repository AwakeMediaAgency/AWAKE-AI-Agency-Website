import React from 'react';
import { PILLARS } from '../constants';

const PillarsSection: React.FC = () => {
  return (
    <section className="py-40 px-4 relative bg-[#0A0A0A]" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-[#1f75fe] mb-8">Phase 02: Solve</h2>
          <h3 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic">THE VALUE STACK</h3>
          <p className="text-neutral-400 max-w-3xl text-3xl font-light leading-relaxed">
            Once we map your friction, we deploy surgical automation pillars that 
            turn admin nightmares into revenue streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-10 auto-rows-[350px]">
          {/* Main Feature - Large */}
          <div className="md:col-span-3 lg:col-span-6 row-span-2 p-14 glass rounded-[60px] border-[#1f75fe]/20 group relative overflow-hidden flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
              {PILLARS[0].icon}
            </div>
            <div className="relative z-10">
              <div className="inline-block px-5 py-2 bg-[#1f75fe] text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-lg shadow-[#1f75fe]/30">Critical Win</div>
              <h4 className="text-6xl font-black mb-6 uppercase italic tracking-tighter">{PILLARS[0].solution}</h4>
              <p className="text-neutral-400 text-2xl mb-12 max-w-md leading-relaxed">{PILLARS[0].impact}</p>
              <div className="flex items-center gap-6">
                <div className="text-emerald-500 font-black text-2xl uppercase italic">24/7 Availability</div>
                <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                <div className="text-white/60 text-lg uppercase tracking-widest font-bold">Leads Secured</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#1f75fe]/5 group-hover:to-[#1f75fe]/10 transition-colors"></div>
          </div>

          {/* Secondary Features - Medium */}
          <div className="md:col-span-3 lg:col-span-6 p-14 glass rounded-[60px] group relative overflow-hidden">
            <div className="flex items-start justify-between mb-16">
              <div className="p-6 rounded-2xl bg-white/5 text-[#1f75fe] group-hover:scale-110 transition-transform">{PILLARS[1].icon}</div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-600">Admin Relief</div>
            </div>
            <h4 className="text-4xl font-black mb-5 uppercase italic tracking-tighter">{PILLARS[1].solution}</h4>
            <p className="text-neutral-400 text-xl leading-relaxed">{PILLARS[1].impact}</p>
          </div>

          {/* Small Features */}
          <div className="md:col-span-3 lg:col-span-3 p-10 glass rounded-[50px] group relative overflow-hidden flex flex-col justify-between">
             <div className="p-6 rounded-2xl bg-white/5 text-[#1f75fe] w-fit group-hover:rotate-6 transition-transform">{PILLARS[2].icon}</div>
             <div>
               <h4 className="text-3xl font-black mb-3 uppercase italic tracking-tighter">{PILLARS[2].solution}</h4>
               <p className="text-neutral-400 text-sm leading-relaxed">{PILLARS[2].impact}</p>
             </div>
          </div>

          <div className="md:col-span-3 lg:col-span-3 p-10 glass rounded-[50px] group relative overflow-hidden flex flex-col justify-between">
             <div className="p-6 rounded-2xl bg-white/5 text-[#1f75fe] w-fit group-hover:-rotate-6 transition-transform">{PILLARS[3].icon}</div>
             <div>
               <h4 className="text-3xl font-black mb-3 uppercase italic tracking-tighter">{PILLARS[3].solution}</h4>
               <p className="text-neutral-400 text-sm leading-relaxed">{PILLARS[3].impact}</p>
             </div>
          </div>

          {/* Special "1-of-1" Card */}
          <div className="col-span-full p-16 bg-[#1f75fe] rounded-[60px] relative overflow-hidden group">
            <div className="absolute top-1/2 right-20 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="max-w-4xl text-center md:text-left">
                <h4 className="text-5xl md:text-7xl font-black mb-8 uppercase italic leading-tight tracking-tighter">Bridge Your Knowledge Gap</h4>
                <p className="text-white/90 text-2xl font-light leading-relaxed">
                  We don't just "set and forget." Every system we build has a "Human Override" so you are always in total control. 
                  We train your team to use the tools effectively.
                </p>
              </div>
              <button className="flex-shrink-0 px-16 py-8 bg-white text-[#1f75fe] rounded-3xl font-black uppercase tracking-[0.2em] text-xl hover:scale-105 transition-transform shadow-3xl">
                Get a Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;