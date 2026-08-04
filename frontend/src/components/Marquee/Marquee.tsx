'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Marquee: React.FC = () => {
  const { pick } = useLanguage();

  const items = [
    pick('MAHMOUD MURAD', 'محمود مراد'),
    pick('AESTHETIC MEDICINE', 'الطب التجميلي'),
    pick('AMMAN — JORDAN', 'عمّان — الأردن'),
  ];

  const renderItems = (keyPrefix: string) =>
    items.flatMap((item, i) => [
      <span key={`${keyPrefix}-${i}`}>{item}</span>,
      <span key={`${keyPrefix}-d-${i}`} className="marquee-diamond">
        ◆
      </span>,
    ]);

  return (
    <section className="marquee">
      <div className="marquee-track" dir="ltr">
        <div className="marquee-content">
          {renderItems('a')}
          {renderItems('b')}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
