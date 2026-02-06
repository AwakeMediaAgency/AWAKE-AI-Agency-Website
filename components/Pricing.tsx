import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-[#02040a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic">
            INVEST IN <span className="text-[#1f75fe]">ROI</span>
          </h2>
          <p className="text-[#99A1AF] text-xl font-light max-w-2xl mx-auto">
            Clear, transparent pricing. No hidden friction. Just scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-10 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 ${
                plan.recommended 
                ? 'bg-white/[0.05] border-[#1f75fe]/50 shadow-[0_0_50px_rgba(31,117,254,0.1)]' 
                : 'bg-white/[0.02] border-white/5'
              } backdrop-blur-xl`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#1f75fe] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{plan.name}</h3>
                <p className="text-[#99A1AF] text-xs font-bold uppercase tracking-widest">{plan.description}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-sm align-top text-[#99A1AF]">$</span>
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
              </div>

              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? 'bg-[#1f75fe] text-white' : 'bg-white/10 text-white'}`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-white/80 font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all transform active:scale-95 ${
                plan.recommended 
                ? 'bg-[#1f75fe] text-white hover:bg-white hover:text-black' 
                : 'bg-white/10 text-white hover:bg-white hover:text-black'
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;