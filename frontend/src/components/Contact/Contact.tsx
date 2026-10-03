'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Reveal from '@/components/Reveal';
import LocationCard from './LocationCard';

interface CardData {
  href: string;
  external?: boolean;
  extraClass?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  dirLtr?: boolean;
  emailStyle?: boolean;
}

const Contact: React.FC = () => {
  const { pick } = useLanguage();

  const cards: CardData[] = [
    {
      href: 'tel:+962797183598',
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
      label: pick('Clinic phone', 'هاتف العيادة'),
      value: '+962 79 7183 598',
      dirLtr: true,
    },
    {
      href: 'https://wa.me/962796930076',
      external: true,
      extraClass: 'contact-card--whatsapp',
      icon: (
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      ),
      label: pick('WhatsApp', 'واتساب'),
      value: '+962 79 6930 076',
      dirLtr: true,
    },
    {
      href: 'mailto:Mahmoudmuradabushairah@gmail.com',
      icon: (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      ),
      label: pick('Email', 'البريد الإلكتروني'),
      value: 'Mahmoudmuradabushairah@gmail.com',
      emailStyle: true,
    },
    {
      href: 'https://www.instagram.com/dr.mahmoudmurad/',
      external: true,
      extraClass: 'contact-card--social',
      icon: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ),
      label: pick('Dr. Mahmoud — Instagram', 'حساب الدكتور الشخصي'),
      value: pick('@dr.mahmoudmurad →', '@dr.mahmoudmurad ←'),
    },
    {
      href: 'https://www.instagram.com/jawlineclinic/',
      external: true,
      extraClass: 'contact-card--social',
      icon: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ),
      label: pick('Clinic — Instagram', 'حساب العيادة'),
      value: pick('@jawlineclinic →', '@jawlineclinic ←'),
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact-wrap">
        <div className="contact-header">
          <div className="section-label">
            <span className="label-num">05</span>
            <span className="label-line"></span>
            <span>{pick('Contact', 'تواصل')}</span>
          </div>
          <h2 className="section-title">
            <span>{pick('Visit the', 'زُر')}</span>
            <em>{pick('clinic.', 'العيادة.')}</em>
          </h2>
          <p className="contact-lede">
            {pick(
              'A discreet practice in the heart of  Amman. Consultations by appointment only.',
              'عيادة هادئة في قلب العاصمه عمّان. الاستشارات بموعد مسبق فقط.'
            )}
          </p>
        </div>

        <div className="contact-grid">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              className={`contact-card${card.extraClass ? ' ' + card.extraClass : ''}`}
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
                  {card.icon}
                </svg>
              </div>
              <div className="contact-card-body">
                <span className="contact-card-label">{card.label}</span>
                <span
                  className={`contact-card-value${card.emailStyle ? ' contact-card-value--email' : ''}`}
                  dir={card.dirLtr ? 'ltr' : undefined}
                >
                  {card.value}
                </span>
              </div>
            </a>
          ))}
        </div>

        <Reveal as="div" delay={160}>
          <LocationCard />
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
