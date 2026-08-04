'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/962797183598';

const FloatingWhatsApp: React.FC = () => {
  const { pick } = useLanguage();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={pick('Chat on WhatsApp', 'تواصل عبر واتساب')}
    >
      <span className="floating-whatsapp-pulse"></span>
      <svg viewBox="0 0 24 24" fill="currentColor" className="floating-whatsapp-icon">
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.6.13-.13.29-.34.44-.51.15-.17.2-.3.29-.49.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.35.19 1.85.11.57-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
        <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.86.5 3.6 1.38 5.1L2 22l5.03-1.32A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.13c-1.66 0-3.2-.46-4.52-1.25l-.32-.19-2.98.78.8-2.9-.21-.3A8.11 8.11 0 0 1 3.9 12c0-4.48 3.65-8.13 8.12-8.13S20.14 7.52 20.14 12s-3.64 8.13-8.12 8.13z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
