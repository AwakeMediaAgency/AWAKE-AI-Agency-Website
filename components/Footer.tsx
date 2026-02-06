import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="data:image/png;base64,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"
                alt="AI Automation Agency"
                className="h-10"
              />
              <span className="text-lg font-black tracking-tighter text-white uppercase italic">VOLTFLOW</span>
            </div>
            <p className="text-[#99A1AF] font-light leading-relaxed mb-8">
              We help elite businesses dominate their market through performance-first web design. No fluff. Just ROI.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#1f75fe] hover:text-[#1f75fe] transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Expertise</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Neuro-Design</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">SaaS Growth</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">E-commerce</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Conversion Audits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Agency</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Case Studies</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Our Process</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Careers</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Contact Us</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Privacy Policy</a></li>
              <li><a href="#" className="text-[#99A1AF] hover:text-[#1f75fe] transition-colors font-light">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 text-[#99A1AF] text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 VoltFlow Design Agency. All rights reserved.</p>
          <p>Built with ❤️ for performance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;