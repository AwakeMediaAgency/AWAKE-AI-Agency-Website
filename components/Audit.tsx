import React from 'react';

const Audit: React.FC = () => {
  return (
    <section id="audit" className="relative py-40 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-blue/10 rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-[84px] font-black leading-[0.9] tracking-tighter mb-8 uppercase italic">
              FREE AI <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>CONVERSION</span> <br />
              <span className="text-brand-blue">CRITIQUE</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#99A1AF] font-light max-w-3xl mx-auto">
              Paste your URL or explain your funnel. Our AI CRO expert identifies profit leaks in under 10 seconds.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-transparent blur-3xl opacity-20 -z-10"></div>
            <form className="bg-white/[0.03] border border-white/10 hover:border-white/20 p-2 md:p-3 rounded-[40px] flex flex-col md:flex-row gap-4 backdrop-blur-3xl shadow-2xl transition-all duration-300">
              <input
                placeholder="Ex: My Shopify store landing page isn't converting traffic..."
                className="flex-1 bg-transparent border-none rounded-[32px] px-8 py-6 text-white placeholder:text-white/30 focus:ring-0 outline-none text-xl transition-all"
                type="text"
              />
              <button className="px-10 py-6 bg-brand-blue text-white font-black rounded-[32px] flex items-center justify-center gap-3 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(31,117,254,0.5)] uppercase tracking-widest text-sm">
                Analyze Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audit;