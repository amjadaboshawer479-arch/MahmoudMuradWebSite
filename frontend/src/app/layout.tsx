import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://drmahmoudmurad.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'د. محمود مراد أبو شعيره — الطب التجميلي، عمّان',
  description:
    'عيادة د. محمود مراد أبو شعيره للطب التجميلي في عمّان — استشارات ومتابعة على أعلى مستوى من الدقة والاحترافية.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'د. محمود مراد أبو شعيره — الطب التجميلي',
    description: 'ممارسة راقية مخصّصة للطب التجميلي في عمّان، الأردن.',
    url: SITE_URL,
    siteName: 'Dr. Mahmoud Murad',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Mahmoud Murad — Aesthetic Medicine',
      },
    ],
    locale: 'ar_JO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'د. محمود مراد أبو شعيره — الطب التجميلي',
    description: 'ممارسة راقية مخصّصة للطب التجميلي في عمّان، الأردن.',
    images: ['/og-image.png'],
  },
};

// Structured data (Schema.org) so search engines understand this is a real
// medical practice — this is what allows things like star ratings, hours,
// and contact info to eventually show up directly in Google search results.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Dr. Mahmoud Murad Abu Shaira — Aesthetic Medicine',
  alternateName: 'د. محمود مراد أبو شعيره',
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: '+962797183598',
  priceRange: '$$',
  medicalSpecialty: 'Aesthetic Medicine',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Abu Rabah Complex, 1st Floor',
    addressLocality: 'Amman',
    addressRegion: 'Jabal Al-Nasr, Aden District',
    addressCountry: 'JO',
  },
  sameAs: ['https://www.instagram.com/dr.mahmoudmurad/'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
