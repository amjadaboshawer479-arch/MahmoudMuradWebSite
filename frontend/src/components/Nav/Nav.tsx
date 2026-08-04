'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const NAV_LINKS: { href: string; en: string; ar: string }[] = [
  { href: '#about', en: 'About', ar: 'عن الطبيب' },
  { href: '#services', en: 'Practice', ar: 'التخصصات' },
  { href: '#journey', en: 'Journey', ar: 'المسيرة' },
  { href: '#reviews', en: 'Reviews', ar: 'آراء المرضى' },
  { href: '#contact', en: 'Contact', ar: 'تواصل' },
];

const Nav: React.FC = () => {
  const { lang, toggleLang, pick } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <div className="nav-inner">
        <a href="#home" className="nav-brand">
          <div className="nav-logo-3d">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.svg" className="nav-logo" alt="Dr. Mahmoud" />
          </div>
          <span className="nav-brand-text">
            <span className="nav-brand-name">{pick('DR.MAHMOUD', 'د. محمود')}</span>
            <span className="nav-brand-sub">{pick('Aesthetic Medicine', 'الطب التجميلي')}</span>
          </span>
        </a>

        <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleLinkClick}>
              {pick(link.en, link.ar)}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <span className="lang-current">{lang === 'ar' ? 'AR' : 'EN'}</span>
            <span className="lang-sep">·</span>
            <span className="lang-alt">{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <a
            href="https://www.clinicosjo.com/book/clinic--3"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            <span>{pick('Book Online', 'احجز أونلاين')}</span>
          </a>
        </div>

        <button
          className={`nav-menu-btn${menuOpen ? ' nav-menu-btn--open' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
