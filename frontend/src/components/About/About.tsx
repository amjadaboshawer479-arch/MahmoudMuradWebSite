'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Reveal from '@/components/Reveal';

const About: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="about-wrap">
        <div className="about-left">
          <div className="section-label">
            <span className="label-num">01</span>
            <span className="label-line"></span>
            <span>{pick('Philosophy', 'فلسفة')}</span>
          </div>

          <Reveal as="h2" className="section-title">
            <span>{pick('The surgeon', 'الجراح')}</span>
            <em>{pick('as artist.', 'كفنّان.')}</em>
          </Reveal>

          <div className="about-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="MM" />
          </div>
        </div>

        <div className="about-right">
          <Reveal as="div" className="about-quote">
            <span className="quote-mark quote-mark--open">&quot;</span>
            <p>
              {pick(
                'Medicine is the craft. Aesthetics is the art. I chose both — because refinement is never accidental.',
                'الطب حِرفة. التجميل فن. اخترت الاثنين — لأن الصقل لا يأتي بالمصادفة.'
              )}
            </p>
            <span className="quote-mark quote-mark--close">&quot;</span>
          </Reveal>

          <div className="about-body">
            <Reveal as="p">
              {pick(
                "Dr. Mahmoud Murad Abu Shaira devotes his practice to aesthetic medicine — an art that requires both surgical precision and an artist's eye. Trained through the Royal Medical Services and refined at the University of Jordan, his work reflects a rare sensibility for proportion, restraint, and form.",
                'د. محمود مراد أبو شعيره يُكرِّس ممارسته للطب التجميلي — فنٌّ يحتاج دقةً جراحية ورؤيةً فنّان. تدرّب في الخدمات الطبية الملكية وصُقل في الجامعة الأردنية، وعمله يعكس حسًا نادراً بالتناسب، والتحفظ، والشكل.'
              )}
            </Reveal>
            <Reveal as="p" delay={80}>
              {pick(
                "Each consultation begins the same way — with listening. Understanding what a patient is asking for, and often what they aren't. The work follows.",
                'كل استشارة تبدأ بالطريقة ذاتها — بالإصغاء. فهم ما يطلبه المريض، وغالباً ما لا يقوله. ثم يأتي العمل.'
              )}
            </Reveal>
          </div>

          <div className="about-signature">
            <span className="sig-line"></span>
            <span className="sig-name">{pick('— Dr. M. Murad', '— د. م. مراد')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
