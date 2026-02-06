import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { ChatMessage } from '../types';

const DiscoveryAgent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Welcome to the Flow Discovery phase. I'm Volt. I help high-growth companies identify where friction is leaking their revenue. Let's start with the Clock Test: What's one task taking your team 5+ hours a week that requires zero creativity?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      /* Strictly following initialization guideline: use process.env.API_KEY directly */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are Volt, the lead architect at VoltFlow AI Agency.
          Design Philosophies: High Visual Impact, Lethal Logic, Friction-to-Flow.
          Tone: Energetic, Expert, Strategic, Minimalist.
          Discovery Flow:
          1. Clock Test (admin drain)
          2. Ghosting Test (missed leads)
          3. Oops Test (human error cost)
          Output:
          - Use 2-3 short, punchy paragraphs.
          - Use bolding for numbers and impacts.
          - Suggest a specific "1-of-1" solution concept by the 3rd message.
          - Always frame the solution as "turning friction into flow".`,
        }
      });

      /* Correctly access .text property from GenerateContentResponse */
      const assistantMessage = response.text || "I'm processing that bottleneck. It sounds like a significant friction point. How does this affect your weekend reply times?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "My logic centers are rebooting. Let's focus on those missed weekend leads—how much is each lost lead worth to you?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 px-4 bg-[#050505] relative overflow-hidden" id="ai-discovery">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1f75fe]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 glass rounded-full border border-[#1f75fe]/40 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1f75fe]">
            <BrainCircuit className="w-4 h-4" /> AI Discovery Engine v3.1
          </div>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Map Your <span className="text-brand italic underline decoration-[#1f75fe]/30">Bottlenecks</span>
          </h3>
          <p className="text-neutral-500 text-xl font-light max-w-2xl mx-auto">
            Our discovery AI uses the "Scale-Killer" framework to calculate your friction cost in real-time.
          </p>
        </div>

        <div className="glass rounded-[40px] border border-white/10 overflow-hidden flex flex-col h-[700px] shadow-2xl">
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#1f75fe] flex items-center justify-center shadow-[0_0_20px_rgba(31,117,254,0.4)]">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#0A0A0A] rounded-full"></div>
              </div>
              <div>
                <h4 className="font-black text-lg tracking-tight uppercase">Architect Volt</h4>
                <p className="text-[10px] font-bold text-[#1f75fe] uppercase tracking-widest">Growth Logic Mode Enabled</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
               {[1,2,3].map(i => <div key={i} className="w-1 h-8 rounded-full bg-white/10"></div>)}
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-10 space-y-8 hide-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${msg.role === 'user' ? 'bg-white/5 border border-white/10' : 'bg-[#1f75fe] shadow-lg shadow-[#1f75fe]/20'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`p-6 rounded-3xl text-base leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none border border-white/5' : 'glass border border-white/10 text-neutral-200 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1f75fe] flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="p-6 rounded-3xl glass border border-white/10 text-neutral-500 italic">
                    Architecting your "1-of-1" solution...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-8 bg-[#050505] border-t border-white/5">
            <div className="relative max-w-4xl mx-auto">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ex: My team spends 10 hours a week on manual invoice typing..."
                className="w-full bg-white/5 border-2 border-white/10 rounded-[24px] py-6 pl-8 pr-20 focus:outline-none focus:border-[#1f75fe] transition-all placeholder:text-neutral-600 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-[#1f75fe] hover:bg-[#0151d0] rounded-2xl text-white disabled:opacity-50 transition-all active:scale-90 shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center mt-4 text-[9px] font-bold text-neutral-600 uppercase tracking-[0.3em]">Encrypted Discovery Protocol Active</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryAgent;