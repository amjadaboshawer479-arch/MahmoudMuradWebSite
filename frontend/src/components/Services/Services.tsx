'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Reveal from '@/components/Reveal';

interface ServiceData {
  num: string;
  featured?: boolean;
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

const services: ServiceData[] = [
  {
    num: '01',
    featured: true,
    icon: <path d="M12 2l2.5 6.5L21 10l-5 4.5L17.5 22 12 18l-5.5 4L8 14.5 3 10l6.5-1.5z" />,
    titleEn: 'Aesthetic Medicine',
    titleAr: 'الطب التجميلي',
    bodyEn:
      'A refined approach to non-surgical aesthetic treatments. Every procedure is tailored to enhance your natural features with subtlety and elegance.',
    bodyAr:
      'أسلوب متأنٍ في علاجات التجميل غير الجراحية. كل إجراء يُصمَّم بعناية لإبراز ملامحك الطبيعية بلمسة راقية وأنيقة.',
    featuresEn: [
      'Facial rejuvenation & contouring',
      'Non-surgical enhancements',
      'Anti-aging procedures',
      'Skin refinement treatments',
    ],
    featuresAr: ['نضارة الوجه ونحته', 'تحسينات غير جراحية', 'إجراءات مكافحة الشيخوخة', 'علاجات صقل البشرة'],
  },
  {
    num: '02',
    icon: (
      <>
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </>
    ),
    titleEn: 'Personalized Consultation',
    titleAr: 'استشارات مخصصة',
    bodyEn:
      'Discreet, unhurried consultations designed around your goals — starting with careful listening, followed by a considered treatment plan.',
    bodyAr: 'استشارات هادئة ومريحة، تبدأ بالإصغاء لتطلعاتك، ثم بناء خطة علاج متأنية تُصمَّم خصيصاً لك.',
    featuresEn: ['Private one-on-one meetings', 'Detailed treatment planning', 'Transparent expectations'],
    featuresAr: ['لقاءات فردية خاصة', 'خطط علاج تفصيلية', 'توقعات واضحة وصادقة'],
  },
  {
    num: '03',
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    titleEn: 'Post-Procedure Follow-up',
    titleAr: 'متابعة ما بعد الإجراء',
    bodyEn:
      'Care that continues long after your visit. Every patient receives structured follow-up to ensure comfort, safety, and lasting results.',
    bodyAr: 'عناية تمتد لما بعد زيارتك. كل مريضة أو مريض يحصل على متابعة منظمة تضمن الراحة، والأمان، ونتائج تدوم.',
    featuresEn: [
      'Scheduled follow-up appointments',
      'Personalized recovery guidance',
      '24/7 support during recovery',
      'Long-term result tracking',
    ],
    featuresAr: ['مواعيد متابعة منتظمة', 'إرشادات تعافي مخصصة', 'دعم على مدار الساعة أثناء التعافي', 'متابعة النتائج على المدى الطويل'],
  },
];

const Services: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <section className="services" id="services">
      <div className="services-wrap">
        <div className="services-header">
          <div className="section-label section-label--centered">
            <span className="label-line"></span>
            <span className="label-num">02</span>
            <span className="label-line"></span>
          </div>
          <div className="services-eyebrow">{pick('PRACTICE', 'التخصصات')}</div>
          <h2 className="section-title section-title--centered">
            <span>{pick('Areas of', 'مجالات')}</span>
            <em>{pick('focus.', 'التركيز.')}</em>
          </h2>
        </div>

        <div className="services-grid services-grid--3">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.num}
              delay={i * 80}
              className={`service-card${service.featured ? ' service-card--featured' : ''}`}
            >
              {service.featured && <div className="service-badge">{pick('MAIN FOCUS', 'التخصص الأساسي')}</div>}
              <div className="service-num">{service.num}</div>
              <div className="service-icon-wrap">
                <svg
                  className="service-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {service.icon}
                </svg>
              </div>
              <h3 className="service-title">{pick(service.titleEn, service.titleAr)}</h3>
              <p className="service-body">{pick(service.bodyEn, service.bodyAr)}</p>
              <ul className="service-features">
                {(pick(service.featuresEn.join('|'), service.featuresAr.join('|')) as string)
                  .split('|')
                  .map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
