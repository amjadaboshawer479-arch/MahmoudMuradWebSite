'use client';

import React, { useState } from 'react';
import StarRating from './StarRating';
import { useLanguage } from '@/context/LanguageContext';
import { submitReview, type NewReviewInput } from '@/data/reviews';

interface ReviewFormProps {
  onSubmitted: (message: string) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmitted, onCancel }) => {
  const { pick } = useLanguage();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — must stay empty
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      setError(pick('Please add your name, a rating, and your review.', 'الرجاء إدخال الاسم والتقييم ونص التقييم.'));
      return;
    }

    setError('');
    setSubmitting(true);
    const payload: NewReviewInput = { name: name.trim(), rating, text: text.trim(), website };

    try {
      const res = await submitReview(payload);
      onSubmitted(
        res.message ||
          pick(
            'Thank you — your review is pending approval and will appear once reviewed.',
            'شكراً لك — تقييمك قيد المراجعة وسيظهر بعد الموافقة عليه.'
          )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : pick('Something went wrong. Please try again.', 'حدث خطأ ما. الرجاء المحاولة مرة أخرى.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-header">
        <h3>{pick('Share your experience', 'شاركنا تجربتك')}</h3>
        <button type="button" className="review-form-close" onClick={onCancel} aria-label="Close">
          ×
        </button>
      </div>

      {/* Honeypot — hidden from real visitors via CSS, bots tend to fill it */}
      <div className="review-form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="review-form-field">
        <label>{pick('Your name', 'الاسم')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={pick('e.g. Sarah A.', 'مثال: سارة أ.')}
        />
      </div>

      <div className="review-form-field">
        <label>{pick('Your rating', 'تقييمك')}</label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div className="review-form-field">
        <label>{pick('Your review', 'تجربتك')}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={pick(
            'Tell other patients about your visit and results…',
            'اكتب لباقي المرضى عن تجربتك ونتيجة الزيارة…'
          )}
        />
      </div>

      {error && <p className="review-form-error">{error}</p>}

      <p className="review-form-note">
        {pick(
          'Reviews are checked before they go live, so yours may take a little while to appear.',
          'يتم مراجعة التقييمات قبل نشرها، لذلك قد يستغرق ظهور تقييمك بعض الوقت.'
        )}
      </p>

      <div className="review-form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          <span>{submitting ? pick('Sending…', 'جارِ الإرسال…') : pick('Submit review', 'إرسال التقييم')}</span>
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={submitting}>
          <span>{pick('Cancel', 'إلغاء')}</span>
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
