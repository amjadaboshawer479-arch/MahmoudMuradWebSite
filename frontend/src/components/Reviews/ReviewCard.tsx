'use client';

import React from 'react';
import StarRating from './StarRating';
import { useLanguage } from '@/context/LanguageContext';
import type { Review } from '@/data/reviews';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { lang, pick } = useLanguage();

  const formattedDate = new Date(review.date).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <article className="review-card">
      <div className="review-card-glow"></div>
      <div className="review-card-top">
        <div className="review-avatar">{initial}</div>
        <div className="review-identity">
          <span className="review-name">{review.name}</span>
          <span className="review-date">{formattedDate}</span>
        </div>
        <svg className="review-quote-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.17 6C4.87 8.13 3.5 10.87 3.5 14c0 3.31 2.24 5.5 5 5.5 2.48 0 4.25-1.9 4.25-4.25 0-2.2-1.58-3.9-3.63-3.9-.4 0-.78.07-1.1.2.2-1.9 1.5-3.7 3.48-4.85L7.17 6zm10 0c-2.3 2.13-3.67 4.87-3.67 8 0 3.31 2.24 5.5 5 5.5 2.48 0 4.25-1.9 4.25-4.25 0-2.2-1.58-3.9-3.63-3.9-.4 0-.78.07-1.1.2.2-1.9 1.5-3.7 3.48-4.85L17.17 6z" />
        </svg>
      </div>

      <StarRating value={review.rating} readOnly size="sm" />

      <p className="review-text">{review.text}</p>

      <div className="review-verified">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        <span>{pick('Verified patient', 'مريض موثّق')}</span>
      </div>
    </article>
  );
};

export default ReviewCard;
