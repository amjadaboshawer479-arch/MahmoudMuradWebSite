'use client';

import React, { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readOnly = false, size = 'md' }) => {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div
      className={`star-rating star-rating--${size}${readOnly ? ' star-rating--readonly' : ''}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`${value} out of 5 stars`}
      onMouseLeave={() => !readOnly && setHover(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display;
        return (
          <button
            key={star}
            type="button"
            className={`star${filled ? ' star--filled' : ''}`}
            disabled={readOnly}
            tabIndex={readOnly ? -1 : 0}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onMouseEnter={() => !readOnly && setHover(star)}
            onFocus={() => !readOnly && setHover(star)}
            onBlur={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange && onChange(star)}
          >
            <svg viewBox="0 0 24 24" className="star-svg">
              <path d="M12 2.5l2.9 6.32 6.85.7-5.16 4.7 1.45 6.78L12 17.77l-6.04 3.23 1.45-6.78-5.16-4.7 6.85-.7L12 2.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
