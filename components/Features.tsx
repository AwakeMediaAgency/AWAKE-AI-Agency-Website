import React from 'react';
import { PILLARS } from '../constants';
import { ArrowUpRight, Zap, Target, PanelsTopLeft, ChartColumn, Layers, MousePointer2, Globe } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="expertise" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="inline-block text-brand-blue font-bold tracking-[0.4em] uppercase mb-4 text-[10px]">Our Expertise</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
              SCIENTIFIC <br />
              <span className="gradient-text">PRECISION.</span>
            </h2>
          </div>
          <p className="text-xl text-[#99A1AF] max-w-lg font-light leading-relaxed">
            We adhere to a rigorous, data-backed design methodology. No guesswork, just lethal results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto">
          {/* Velocity Card */}
          <div className="md:col-span-4 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/5 rounded-[40px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12">
                <ChartColumn className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black mb-6 uppercase italic">Velocity-First Architecture</h3>
              <p className="text-lg text-[#99A1AF] max-w-md">
                We engineer sites that load in sub-100ms. Speed isn't just a feature; it's the foundation of conversion. Google loves it, users demand it.
              </p>
            </div>
            {/* Visual indicator representation */}
            <div className="relative mt-10 h-32 flex items-end gap-2 overflow-hidden">
              {[40, 60, 30, 80, 50, 90, 70, 45, 85, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-brand-blue/20 rounded-t-lg transition-all duration-1000 group-hover:bg-brand-blue" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          {/* Neuro Design */}
          <div className="md:col-span-2 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
              <ArrowUpRight className="w-8 h-8 text-brand-blue" />
            </div>
            <PanelsTopLeft className="w-10 h-10 text-white mb-6" />
            <h3 className="text-2xl font-black mb-3 uppercase italic tracking-tighter">Neuro-Design</h3>
            <p className="text-sm text-[#99A1AF]">Eye-tracking data guides every pixel placement for subconscious impact.</p>
          </div>

          {/* CRO */}
          <div className="md:col-span-3 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Target className="w-10 h-10 text-brand-blue mb-6" />
            <h3 className="text-2xl font-black mb-3 uppercase italic tracking-tighter">Conversion CRO</h3>
            <p className="text-sm text-[#99A1AF]">Frictionless funnels that turn passive visitors into active revenue streams.</p>
          </div>

          {/* Rapid Iteration */}
          <div className="md:col-span-3 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col justify-center relative group overflow-hidden">
            <Zap className="w-10 h-10 text-brand-blue mb-6" />
            <h3 className="text-2xl font-black mb-3 uppercase italic tracking-tighter">Instant Iteration</h3>
            <p className="text-sm text-[#99A1AF]">Rapid testing cycles that refine and scale what works in real-time.</p>
          </div>
        </div>

        {/* Bottom micro-features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl"><Layers className="w-6 h-6 text-brand-blue" /></div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest">Brand Authority</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Aesthetics</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl"><MousePointer2 className="w-6 h-6 text-blue-400" /></div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest">Behavioral Triggers</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Intent Response</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl"><Globe className="w-6 h-6 text-emerald-400" /></div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest">Global Scale</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sub-100ms Edge Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;