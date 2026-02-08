import React from 'react';
import { TRUST_SIGNALS } from '../constants';

const TrustSection: React.FC = () => {
  return (
    <section className="py-40 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <span className="inline-block text-brand-blue font-bold tracking-[0.4em] uppercase mb-6 text-sm">Why Trust Us?</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9] mb-10">
              YOUR <span className="gradient-text">SAFETY</span> <br />
              IS THE NET.
            </h2>
            <p className="text-3xl text-[#99A1AF] font-light leading-relaxed mb-12">
              We bridge the fear of the unknown with rigorous local standards and human-first logic.
            </p>
            <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h4 className="font-black text-2xl uppercase tracking-tighter">Verified Local Support</h4>
                <p className="text-lg text-neutral-500 font-bold uppercase tracking-widest">24/7 Response Guaranteed</p>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-8">
            {TRUST_SIGNALS.map((signal, idx) => (
              <div key={idx} className="p-10 glass rounded-[40px] border-white/5 hover:border-brand-blue/30 transition-all duration-500 flex gap-8">
                <div className="flex-shrink-0">{signal.icon}</div>
                <div>
                  <h4 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">{signal.title}</h4>
                  <p className="text-xl text-[#99A1AF] font-light leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;