import React from 'react';
import { ArrowRight, Zap, ShieldCheck, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,20,35,1)_0%,rgba(0,0,0,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 opacity-50"></div>

      <div className="absolute top-0 -left-[10%] w-[800px] h-[800px] bg-brand-blue rounded-full blur-[250px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -right-[10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="relative inline-block">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" /> 100% POPIA Compliant
            </span>
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <MapPin className="w-4 h-4" /> Proudly South African
            </span>
          </div>

          <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter mb-10 text-white uppercase">
            TAKE THE <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>'HEAVY'</span> <br />
            OUT OF YOUR <br />
            <span className="text-brand-blue">ADMIN.</span>
          </h1>

          <p className="text-2xl md:text-4xl text-[#99A1AF] max-w-5xl mx-auto mb-16 font-light leading-relaxed tracking-tight">
            Reliable AI solutions for SA businesses. We automate your repetitive paperwork and customer replies
            so you can focus on your clients. <span className="text-white font-medium">No technical experience required.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="relative group w-auto">
              <div className="absolute inset-0 bg-brand-blue rounded-full blur-[20px] opacity-40 group-hover:opacity-60 transition-all duration-300 transform group-hover:scale-110"></div>
              <button className="group relative px-16 py-8 bg-brand-blue text-white font-black text-3xl rounded-full overflow-hidden transition-all hover:scale-[1.02] hover:-translate-y-1 active:scale-95 shadow-[0_20px_40px_rgba(31,117,254,0.4)] hover:shadow-[0_40px_80px_rgba(31,117,254,0.6)] z-10 flex items-center gap-4 whitespace-nowrap uppercase italic">
                <Zap className="w-8 h-8 fill-current group-hover:animate-pulse" />
                Blueprint My Flow
              </button>
            </div>
            <button className="px-12 py-8 text-white font-bold text-2xl rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-4 backdrop-blur-sm whitespace-nowrap uppercase tracking-widest">
              See How It Works
            </button>
          </div>


          <p className="mt-12 text-sm text-neutral-500 font-bold uppercase tracking-[0.4em]">
            Bridging the gap from Friction to Flow
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;