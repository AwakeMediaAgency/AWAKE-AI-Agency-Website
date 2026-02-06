import React from 'react';
import { Mail, Lock, User, Globe, ArrowRight, Sparkles } from 'lucide-react';

const Signup: React.FC = () => {
  return (
    <section className="relative bg-black px-6 py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#1f75fe] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[#1f75fe] to-blue-700 shadow-[0_0_60px_rgba(31,117,254,0.4)]">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">Get Started</h2>
          <p className="text-xl text-gray-400 font-light">Unlock your personalized high-conversion dashboard</p>
        </div>

        <form className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1f75fe]/10 to-transparent blur-xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity"></div>
          
          <div className="space-y-6">
            <div className="group/input">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-[#1f75fe] transition-colors" />
                <input required className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#1f75fe] transition-all" placeholder="you@example.com" type="email" />
              </div>
            </div>

            <div className="group/input">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-[#1f75fe] transition-colors" />
                <input required className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#1f75fe] transition-all" placeholder="John Doe" type="text" />
              </div>
            </div>

            <div className="group/input">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-[#1f75fe] transition-colors" />
                <input className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#1f75fe] transition-all" placeholder="https://yourwebsite.com" type="url" />
              </div>
            </div>

            <button type="submit" className="group relative w-full py-6 bg-[#1f75fe] hover:bg-blue-700 text-white font-black text-lg rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(31,117,254,0.5)] active:scale-95 uppercase tracking-widest italic">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Access Dashboard <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
          
          <p className="mt-8 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
            Already have an account? <button type="button" className="text-[#1f75fe] hover:underline">Login</button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;