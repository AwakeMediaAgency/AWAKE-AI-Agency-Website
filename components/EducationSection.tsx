import React from 'react';
import { Bot, UserCheck, Zap, Sparkles } from 'lucide-react';

const EducationSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <span className="inline-block text-[#1f75fe] font-bold tracking-[0.4em] uppercase mb-6 text-sm">AI in Plain English</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
            YOUR NEW <span className="gradient-text">DIGITAL</span> <br />
            ASSISTANT.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass rounded-[60px] p-12 border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-12 text-[#1f75fe]/20 group-hover:text-[#1f75fe]/40 transition-colors">
              <Bot className="w-24 h-24" />
            </div>
            <h3 className="text-4xl font-black mb-8 uppercase italic tracking-tighter text-[#1f75fe]">What is AI Automation?</h3>
            <p className="text-2xl text-[#99A1AF] font-light leading-relaxed mb-8">
              Think of it as a <span className="text-white font-medium">Digital Assistant</span> that never sleeps. 
              It’s not a robot taking over; it’s smart software that handles the R100/hour tasks—like filing invoices or answering basic WhatsApps.
            </p>
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="p-3 bg-[#1f75fe] rounded-xl"><Sparkles className="w-6 h-6 text-white" /></div>
              <p className="text-lg font-bold text-white uppercase tracking-tight">Focus on R1,000/hour work</p>
            </div>
          </div>

          <div className="glass rounded-[60px] p-12 border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-12 text-[#1f75fe]/20 group-hover:text-[#1f75fe]/40 transition-colors">
              <UserCheck className="w-24 h-24" />
            </div>
            <h3 className="text-4xl font-black mb-8 uppercase italic tracking-tighter text-[#1f75fe]">How it Works</h3>
            <p className="text-2xl text-[#99A1AF] font-light leading-relaxed mb-8">
              Unlike old computers, our AI <span className="text-white font-medium">learns your business style</span>. 
              If a customer asks a question at 2:00 AM, it answers instantly. If it gets stuck, it politely notifies you to take over.
            </p>
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="p-3 bg-[#1f75fe] rounded-xl"><Zap className="w-6 h-6 text-white" /></div>
              <p className="text-lg font-bold text-white uppercase tracking-tight">Always under your control</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;