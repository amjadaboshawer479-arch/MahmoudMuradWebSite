'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { pick } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.svg" className="footer-logo" alt="Dr. Mahmoud" />
          <div className="footer-brand-text">
            <span className="footer-name">{pick('Dr. Mahmoud Murad Abu Shaira', 'د. محمود مراد أبو شعيره')}</span>
            <span className="footer-title">{pick('Aesthetic Medicine · Amman', 'الطب التجميلي · عمّان')}</span>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-copy">
            © <span>{year}</span> Dr. Mahmoud Murad — {pick('All rights reserved', 'جميع الحقوق محفوظة')}
          </div>
          <div className="footer-credit">
            <span>{pick('Crafted by', 'من تصميم')}</span>{' '}
            <a href="https://clinicosjo.com" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
              Amjad Aboshawer · ClinicOS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
