import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseCarousel } from './components/ShowcaseCarousel';
import { WorkSection } from './components/WorkSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { JourneySection } from './components/JourneySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { GuideModal } from './components/GuideModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { InteractiveLightCursor } from './components/InteractiveLightCursor';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans relative">
        {/* Interactive glowing cursor follower & touch/click light burst */}
        <InteractiveLightCursor />

        <Navbar />
        <main>
          {/* 1. Home / Hero */}
          <Hero />

          {/* 2. Top Carousel Showcase (Video Editing, Graphic Design, Meta Marketing) */}
          <ShowcaseCarousel />

          {/* 3. Detailed Work & Videos */}
          <WorkSection />

          {/* 4. Core Skills & Toolkit */}
          <SkillsSection />

          {/* 5. Services & Creative Solutions */}
          <ServicesSection />

          {/* 6. Education & Journey */}
          <JourneySection />

          {/* 7. About Me */}
          <AboutSection />

          {/* 8. Direct Contact & Collaboration */}
          <ContactSection />
        </main>
        <Footer />

        {/* Modals & Overlays */}
        <ShowreelModal />
        <ProjectDetailModal />
        <GuideModal />
        <CustomizerDrawer />
      </div>
    </PortfolioProvider>
  );
}
