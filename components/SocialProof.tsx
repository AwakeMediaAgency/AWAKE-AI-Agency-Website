
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Marcus Thorne",
    role: "CEO @ Lumina Global",
    content: "VoltFlow didn't just rebuild our site; they re-architected our entire lead flow. Our conversion jumped by 450% in the first quarter.",
    metric: "+450% ROI"
  },
  {
    name: "Sarah Chen",
    role: "Ops Lead @ Nexus Legal",
    content: "The custom OCR micro-app saved our team 80+ hours of manual data entry per week. It paid for itself in less than a month.",
    metric: "80H Saved/Wk"
  },
  {
    name: "David Vark",
    role: "Founder @ Aura Health",
    content: "The WhatsApp AI they built is lethal. It qualifies leads 24/7. We literally wake up to a booked calendar every single day.",
    metric: "24/7 Booking"
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-brand-dark relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-brand-blue mb-6">Success Metrics</h2>
          <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">THE FLOW EFFECT</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -top-6 -left-4 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
                <Quote className="w-20 h-20 fill-current" />
              </div>
              <div className="p-10 glass rounded-[40px] border border-white/5 h-full flex flex-col relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-blue text-brand-blue" />)}
                </div>
                <p className="text-lg text-neutral-300 mb-10 italic leading-relaxed">"{t.content}"</p>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <h5 className="font-black uppercase tracking-tight text-white">{t.name}</h5>
                    <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-black uppercase">
                    {t.metric}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
