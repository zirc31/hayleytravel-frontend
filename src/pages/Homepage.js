import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import FooterSection from '../components/FooterSection';

const Homepage = () => {

  return (
    <div>
        <Navigation />
        <HeroSection />
        <IntroSection />
        <FooterSection />
    </div>
  )
}

export default Homepage
