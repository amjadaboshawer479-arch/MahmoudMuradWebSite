'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Splash from '@/components/Splash/Splash';
import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import Marquee from '@/components/Marquee/Marquee';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Journey from '@/components/Journey/Journey';
import Reviews from '@/components/Reviews/Reviews';
import Booking from '@/components/Booking/Booking';
import Contact from '@/components/Contact/Contact';
import Signature from '@/components/Signature/Signature';
import Footer from '@/components/Footer/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function HomePage() {
  return (
    <LanguageProvider>
      <Splash />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Journey />
      <Reviews />
      <Booking />
      <Contact />
      <Signature />
      <Footer />
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
