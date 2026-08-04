'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Booking: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <section className="booking" id="booking">
      <div className="booking-wrap">
        <div className="booking-ornament booking-ornament--left"></div>
        <div className="booking-ornament booking-ornament--right"></div>

        <div className="booking-inner">
          <div className="booking-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="MM" />
          </div>

          <div className="section-label section-label--centered">
            <span className="label-line"></span>
            <span>{pick('Reservations', 'حجز موعد')}</span>
            <span className="label-line"></span>
          </div>

          <h2 className="booking-title">
            <span>{pick('Reserve your', 'احجز')}</span>
            <em>{pick('consultation.', 'استشارتك.')}</em>
          </h2>

          <p className="booking-lede">
            {pick(
              'A private consultation with Dr. Mahmoud Murad. Discreet, unhurried, and tailored entirely to you.',
              'استشارة خاصة مع د. محمود مراد. هادئة، متأنية، ومُصمَّمة بالكامل لك.'
            )}
          </p>

          <a
            href="https://www.clinicosjo.com/book/clinic--3"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <span>{pick('Book Online', 'احجز أونلاين')}</span>
            <span className="btn-arrow">→</span>
          </a>

          <div className="booking-note">
            <span>{pick('Or call directly', 'أو اتصل مباشرة')}</span>
            <span className="note-diamond">◆</span>
            <a href="tel:+962797183598" dir="ltr">
              +962 79 7183 598
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
