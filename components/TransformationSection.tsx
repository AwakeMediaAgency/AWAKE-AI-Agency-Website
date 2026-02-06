import React from 'react';
import { Timer, Calendar, BarChart3, TrendingUp } from 'lucide-react';

const STAGES = [
  {
    title: "The Quick Win",
    time: "48 Hours",
    description: "Your basic customer questions are answered 24/7 on WhatsApp and Email.",
    icon: <Timer className="w-10 h-10" />
  },
  {
    title: "The Compound",
    time: "30 Days",
    description: "Your desk is clear of manual filing and data entry tasks forever.",
    icon: <Calendar className="w-10 h-10" />
  },
  {
    title: "The Advantage",
    time: "Ongoing",
    description: "You respond to leads 90% faster than your closest local competitors.",
    icon: <BarChart3 className="w-10 h-10" />
  },
  {
    title: "The 10X",
    time: "Scale Mode",
    description: "You double your business volume without needing to hire a new admin person.",
    icon: <TrendingUp className="w-10 h-10" />
  }
];

const TransformationSection: React.FC = () => {
  return (
    <section className="py-40 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <span className="inline-block text-[#1f75fe] font-bold tracking-[0.4em] uppercase mb-6 text-sm">The Transformation</span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            MAKING THE <br />
            <span className="text-[#1f75fe]">OUTCOME TANGIBLE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="relative p-12 glass rounded-[50px] border-white/5 flex flex-col items-center text-center group">
              <div className="mb-10 p-6 bg-white/5 rounded-3xl text-[#1f75fe] group-hover:bg-[#1f75fe] group-hover:text-white transition-all duration-500">
                {stage.icon}
              </div>
              <h4 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">{stage.title}</h4>
              <span className="inline-block px-4 py-1.5 bg-[#1f75fe]/10 text-[#1f75fe] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {stage.time}
              </span>
              <p className="text-xl text-[#99A1AF] font-light leading-relaxed">
                {stage.description}
              </p>
              
              {idx < STAGES.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/10 z-20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;