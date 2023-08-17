import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import CookieNotice from '../components/CookieNotice';
import FAQ from '../components/FAQ';

function LandingPage() {
  return (
    <div>
      <Header />
      <Features />
      <CTA />
      <FAQ/>
      <CookieNotice/>
      <Footer />
    </div>
  );
}

export default LandingPage;
