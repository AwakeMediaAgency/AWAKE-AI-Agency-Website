
import React, { useRef } from 'react';
import { CASE_STUDIES } from '../constants';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 overflow-hidden bg-[#0A0A0A]" id="work">
      <div className="max-w-7xl mx-auto px-4 flex items-end justify-between mb-12">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#1f75fe] mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">GORGEOUS WORK</h3>
        </div>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-4 glass rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 glass rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 px-4 md:px-[calc((100vw-80rem)/2)] overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8"
      >
        {CASE_STUDIES.map((study) => (
          <div 
            key={study.id} 
            className="flex-shrink-0 w-[85vw] md:w-[600px] snap-start"
          >
            <div className="group relative rounded-3xl overflow-hidden glass border border-white/5 aspect-[4/3]">
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1f75fe]">{study.category}</span>
                <h4 className="text-3xl font-black mt-2 mb-4">{study.title}</h4>
                <p className="text-neutral-300 text-sm mb-6 max-w-sm">{study.description}</p>
                <button className="flex items-center gap-2 font-bold text-sm group/btn">
                  View Project <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
