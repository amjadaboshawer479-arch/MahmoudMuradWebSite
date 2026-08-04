'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const BOOKING_URL = 'https://www.clinicosjo.com/book/clinic--3';

const FloatingBooking: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-booking"
      aria-label={pick('Book Online', 'احجز أونلاين')}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="floating-booking-icon"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </a>
  );
};

export default FloatingBooking;