'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Amman+Jabal+Al-Nasr+Aden+District+Abu+Rabah+Complex';

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
          'Amman · Jabal Al-Nasr · Aden District · Abu Rabah Complex · 1st Floor',
          'عمّان · جبل النصر · حي عدن · مجمع أبو رباح · الطابق الأول'
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
