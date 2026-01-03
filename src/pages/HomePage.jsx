import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import { useState } from 'react';

const HomePage = ({ setCurrentPage }) => {
  

  return (
    <div className="w-full min-h-screen bg-white">
      

      <main className="w-full">
        <HeroSection onReset={() => setCurrentPage('reset-request')} />
        <FeaturesSection />
        <AboutSection />
      </main>

      <Footer  />
    </div>
  );
};

export default HomePage;
