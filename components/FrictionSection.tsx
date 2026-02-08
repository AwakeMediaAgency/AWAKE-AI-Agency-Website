
import React from 'react';
import { IDENTIFY_TESTS } from '../constants';

const FrictionSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-brand-dark relative" id="discovery">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">Phase 01: Identify</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">SPOT THE FRICTION</h3>
          <p className="text-neutral-400 max-w-xl text-lg">
            To find where your company is hurting, we ask three "Scale-Killer" questions that reveal high-impact automation zones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {IDENTIFY_TESTS.map((test, idx) => (
            <div
              key={idx}
              className="group p-8 glass rounded-3xl border border-white/5 hover:border-brand-blue/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                {test.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{test.title}</h4>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                {test.description}
              </p>
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Target</span>
                <p className="text-sm font-medium mt-1">{test.target}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrictionSection;
