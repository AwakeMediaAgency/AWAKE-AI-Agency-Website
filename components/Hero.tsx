import React from 'react';
import { ArrowRight, Zap, ShieldCheck, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a] pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,20,35,1)_0%,rgba(0,0,0,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 opacity-50"></div>
      
      <div className="absolute top-0 -left-[10%] w-[800px] h-[800px] bg-[#1f75fe] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -right-[10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="relative inline-block">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#1f75fe]/30 bg-[#1f75fe]/5 text-[#1f75fe] text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" /> 100% POPIA Compliant
            </span>
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <MapPin className="w-4 h-4" /> Proudly South African
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter mb-10 text-white uppercase">
            TAKE THE <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>'HEAVY'</span> <br />
            OUT OF YOUR <br />
            <span className="text-[#1f75fe]">ADMIN.</span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-[#99A1AF] max-w-5xl mx-auto mb-16 font-light leading-relaxed tracking-tight">
            Reliable AI solutions for SA businesses. We automate your repetitive paperwork and customer replies 
            so you can focus on your clients. <span className="text-white font-medium">No technical experience required.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="relative group w-auto">
              <div className="absolute inset-0 bg-[#1f75fe] rounded-full blur-[20px] opacity-40 group-hover:opacity-60 transition-all duration-300 transform group-hover:scale-110"></div>
              <button className="relative px-16 py-8 bg-[#1f75fe] text-white font-black text-3xl rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95 z-10 flex items-center gap-4 whitespace-nowrap uppercase italic">
                Get Your Blueprint <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
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