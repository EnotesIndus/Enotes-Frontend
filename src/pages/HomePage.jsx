import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import { useState } from 'react';

const HomePage = ({ setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="w-full">
        <HeroSection onReset={() => setCurrentPage('reset-request')} />
        <FeaturesSection />
        <AboutSection />
      </main>

      <Footer onReset={() => setCurrentPage('reset-request')} />
    </div>
  );
};

export default HomePage;
