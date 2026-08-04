'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { pick } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      scene.style.transform = `rotateY(${-6 + x * -4}deg) rotateX(${3 + y * 3}deg)`;
    };
    const handleLeave = () => {
      scene.style.transform = 'rotateY(-6deg) rotateX(3deg)';
    };

    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-bg-layer hero-bg-layer--1"></div>
      <div className="hero-bg-layer hero-bg-layer--2"></div>
      <div className="hero-bg-pattern"></div>

      <div className="hero-grid">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="eyebrow-diamond">◆</span>
            <span>{pick('AMMAN · JORDAN', 'عمّان · الأردن')}</span>
            <span className="eyebrow-line"></span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line-1">{pick('Dr. Mahmoud', 'د. محمود')}</span>
            <span className="hero-title-line-2">{pick('Murad', 'مراد')}</span>
            <span className="hero-title-line-3">{pick('Abu Shaira', 'أبو شعيره')}</span>
          </h1>

          <div className="hero-divider">
            <span className="hero-divider-line"></span>
            <span className="hero-divider-diamond">◆</span>
            <span className="hero-divider-line"></span>
          </div>

          <p className="hero-tag">
            {pick('Aesthetic Medicine \u00A0·\u00A0 Amman', 'الطب التجميلي \u00A0·\u00A0 عمّان')}
          </p>

          <p className="hero-lede">
            <span>
              {pick(
                'A refined practice devoted to aesthetic medicine — where every treatment is delivered with the precision of surgical training and the sensibility of aesthetic craft.',
                'ممارسة راقية مُخصَّصة للطب التجميلي — حيث يُقدَّم كل علاج بدقة التدريب الجراحي وحس الصنعة التجميلية.'
              )}
            </span>
          </p>

          <div className="hero-cta">
            <a
              href="https://www.clinicosjo.com/book/clinic--3"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>{pick('Book Online', 'احجز أونلاين')}</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#about" className="btn btn-outline">
              <span>{pick('About the doctor', 'عن الطبيب')}</span>
            </a>
          </div>
        </div>

        <div className="hero-portrait-scene">
          <div className="scene" ref={sceneRef}>
            <div className="scene-plate scene-plate--1"></div>

            <div className="scene-frame">
              <div className="frame-corner frame-corner--tl"></div>
              <div className="frame-corner frame-corner--tr"></div>
              <div className="frame-corner frame-corner--bl"></div>
              <div className="frame-corner frame-corner--br"></div>
            </div>

            <div className="scene-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/doctor.jpg" alt="Dr. Mahmoud Murad" />
              <div className="scene-portrait-vignette"></div>
            </div>

            <div className="scene-ring"></div>

            <div className="scene-badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="MM" className="scene-badge-logo" />
              <div className="scene-badge-text">
                <span className="scene-badge-since">SINCE</span>
                <span className="scene-badge-year">2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="scroll-diamond">◆</span>
        <span>{pick('SCROLL', 'مرر')}</span>
      </div>
    </section>
  );
};

export default Hero;
