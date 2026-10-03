'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Reveal from '@/components/Reveal';

interface TimelineData {
  marker: string;
  present?: boolean;
  yearEn: string;
  yearAr: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

const items: TimelineData[] = [
  {
    marker: '01',
    yearEn: 'Formation',
    yearAr: 'التأسيس',
    titleEn: 'Royal Medical Services',
    titleAr: 'الخدمات الطبية الملكية',
    bodyEn:
      "Served as resident in general surgery — foundational training within one of the region's most rigorous institutions.",
    bodyAr: 'خدم كطبيب مقيم في الجراحة العامة — تدريب تأسيسي في واحدة من أدق مؤسسات المنطقة.',
  },
  {
    marker: '02',
    yearEn: 'Refinement',
    yearAr: 'الصقل',
    titleEn: 'University of Jordan',
    titleAr: 'الجامعة الأردنية',
    bodyEn: 'Specialized training in aesthetic medicine — where surgical precision was refined into an artistic practice.',
    bodyAr: 'تدريب متخصص في الطب التجميلي — حيث صُقلت الدقة الجراحية لتصبح ممارسة فنية.',
  },
  {
    marker: '◆',
    present: true,
    yearEn: 'Present',
    yearAr: 'الحاضر',
    titleEn: 'Private Practice — Amman',
    titleAr: 'عيادة خاصة — عمّان',
    bodyEn:
      'Now practicing at his private clinic in Amman — Jawharat Al-Sweifieh, offering consultations and treatments in aesthetic medicine.',
    bodyAr: 'يمارس حالياً في عيادته الخاصة في عمّان — الصويفيه، مُقدماً استشارات وعلاجات في الطب التجميلي.',
  },
];

const Journey: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <section className="journey" id="journey">
      <div className="journey-wrap">
        <div className="journey-header">
          <div className="section-label">
            <span className="label-num">03</span>
            <span className="label-line"></span>
            <span>{pick('Journey', 'المسيرة')}</span>
          </div>
          <h2 className="section-title">
            <span>{pick('A path of', 'مسار من')}</span>
            <em>{pick('discipline.', 'الانضباط.')}</em>
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>

          {items.map((item, i) => (
            <Reveal as="div" key={item.marker + i} delay={i * 80} className="timeline-item">
              <div className={`timeline-marker${item.present ? ' timeline-marker--present' : ''}`}>
                <span className="marker-inner">{item.marker}</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{pick(item.yearEn, item.yearAr)}</div>
                <h3 className="timeline-title">{pick(item.titleEn, item.titleAr)}</h3>
                <p className="timeline-body">{pick(item.bodyEn, item.bodyAr)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
