import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PartnersMarquee from './components/PartnersMarquee';
import EducationSection from './components/EducationSection';
import FrictionSection from './components/FrictionSection';
import PillarsSection from './components/PillarsSection';
import TransformationSection from './components/TransformationSection';
import TrustSection from './components/TrustSection';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import Signup from './components/Signup';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#02040a] text-white selection:bg-[#1f75fe] selection:text-white font-sans overflow-x-hidden">
      <Header />
      <main className="relative z-10">
        <Hero />
        <PartnersMarquee />
        <EducationSection />
        <FrictionSection />
        <PillarsSection />
        <TransformationSection />
        <TrustSection />
        <Pricing />
        <SocialProof />
        <Signup />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default App;