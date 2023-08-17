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
      <div className='bgland2'>
      <Header />
      <Features />
      </div>
      <CTA />
      <FAQ/>
      <CookieNotice/>
      <Footer />
    </div>
  );
}

export default LandingPage;
