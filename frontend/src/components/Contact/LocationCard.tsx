'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const MAPS_URL =
  'https://www.google.com/maps/dir/31.9414485,35.9785496/31.9596729,35.8647804/@31.9584666,35.8367112,12z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?hl=en&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D';

const LocationCard: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <div className="location-card">
      <div className="location-card-glow"></div>

      <div className="location-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      <span className="location-card-label">{pick('Clinic Location', 'موقع العيادة')}</span>

      <p className="location-card-address">
        {pick(
          'Amman · Jawharat Al-Sweifieh Complex, No. 21, 6th Floor',
          'عمّان ·مجمع جوهرة الصويفية، رقم ٢١ , الطابق السادس'
        )}
      </p>

      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary location-card-btn">
        <span>{pick('Open in Google Maps', 'افتح في خرائط جوجل')}</span>
        <span className="btn-arrow">→</span>
      </a>
    </div>
  );
};

export default LocationCard;
