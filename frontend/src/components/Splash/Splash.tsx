'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PARTICLE_COUNT = 9;

const Splash: React.FC = () => {
  const { pick } = useLanguage();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 4700);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="splash" id="splash">
      <div className="splash-orb"></div>

      <div className="splash-content">
        <div className="splash-ornament splash-ornament--tl"></div>
        <div className="splash-ornament splash-ornament--tr"></div>
        <div className="splash-ornament splash-ornament--bl"></div>
        <div className="splash-ornament splash-ornament--br"></div>

        <div className="splash-stage">
          {/* Step 2 — minimal line-art face contour, drawn like a live sketch */}
          <svg
            className="splash-face"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="splash-face-path"
              d="M150 42 C176 42 197 58 207 82 C213 99 210 116 219 129 C225 139 233 141 231 149
                 C229 156 219 156 214 159 C217 171 215 183 206 191 C199 198 189 199 181 197
                 C179 206 173 213 163 215 C151 218 141 214 134 206 C121 209 109 203 101 191
                 C91 177 89 159 93 143 C86 131 83 116 86 101 C91 76 116 46 150 42 Z"
            />
          </svg>

          {/* Step 3 — particle dissolve, bridging the face into the mark */}
          <div className="splash-particles" aria-hidden="true">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <span key={i} className={`splash-particle splash-particle--${i + 1}`}></span>
            ))}
          </div>

          {/* Step 4 — 3D cube mark with a single light sweep */}
          <div className="splash-logo-wrap">
            <div className="splash-logo-3d">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-icon.svg" alt="Dr. Mahmoud logo" />
              <span className="splash-logo-sweep"></span>
            </div>
          </div>
        </div>

        {/* Step 5 — brand identity */}
        <div className="splash-text">
          <span className="splash-line"></span>
          <span className="splash-name">{pick('DR. MAHMOUD', 'د. محمود')}</span>
          <span className="splash-line"></span>
        </div>
        <div className="splash-sub">
          {pick('Aesthetic Medicine', 'الطب التجميلي  •  الثقة  •  الجمال الطبيعي')}
        </div>
      </div>
    </div>
  );
};

export default Splash;
