import React from 'react';
import Header from './Header';
import Hero from './Hero';
import PartnersMarquee from './PartnersMarquee';
import EducationSection from './EducationSection';
import FrictionSection from './FrictionSection';
import PillarsSection from './PillarsSection';
import TransformationSection from './TransformationSection';
import TrustSection from './TrustSection';
import Pricing from './Pricing';
import SocialProof from './SocialProof';
import ScannerSection from './ScannerSection';
import GradientMenu from './ui/gradient-menu';
import Signup from './Signup';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <>
            <Header />
            <main className="relative z-10">
                <Hero />
                <Signup />
                <PartnersMarquee />
                <EducationSection />
                <FrictionSection />
                <PillarsSection />
                <TransformationSection />
                <TrustSection />
                <Pricing />
                <SocialProof />
                <ScannerSection />
                <GradientMenu />
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
