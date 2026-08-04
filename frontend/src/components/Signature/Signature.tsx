'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Signature: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <section className="signature-section">
      <div className="signature-wrap">
        <span className="sig-divider-line"></span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/signature.png" alt="Dr. Mahmoud Murad Abushairah — Signature" className="doctor-signature" />
        <span className="sig-caption">
          {pick('Personal signature of Dr. Mahmoud Murad Abushairah', 'التوقيع الشخصي للدكتور محمود مراد أبو شعيره')}
        </span>
        <span className="sig-divider-line"></span>
      </div>
    </section>
  );
};

export default Signature;
