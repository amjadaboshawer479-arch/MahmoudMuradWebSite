'use client';

import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { useLanguage } from '@/context/LanguageContext';
import { fetchApprovedReviews, fetchAverageRating, type Review } from '@/data/reviews';
import Reveal from '@/components/Reveal';

const Reviews: React.FC = () => {
  const { pick } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [successMessage, setSuccessMessage] = useState('');

  const load = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const [reviewList, avg] = await Promise.all([fetchApprovedReviews(), fetchAverageRating()]);
      setReviews(reviewList);
      setAverage(avg.average);
      setCount(avg.count);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmitted = (message: string) => {
    setFormOpen(false);
    setSuccessMessage(message);
  };

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-wrap">
        <div className="reviews-header">
          <div className="section-label section-label--centered">
            <span className="label-line"></span>
            <span className="label-num">04</span>
            <span className="label-line"></span>
          </div>
          <div className="services-eyebrow">{pick('TESTIMONIALS', 'آراء المرضى')}</div>
          <h2 className="section-title section-title--centered">
            <span>{pick('Trusted by', 'ثقة')}</span>
            <em>{pick('our patients.', 'مرضانا.')}</em>
          </h2>

          {!loading && !loadError && count > 0 && (
            <div className="reviews-summary">
              <span className="reviews-summary-score">{average.toFixed(1)}</span>
              <div className="reviews-summary-meta">
                <StarRating value={Math.round(average)} readOnly size="md" />
                <span className="reviews-summary-count">
                  {pick(`Based on ${count} reviews`, `بناءً على ${count} تقييم`)}
                </span>
              </div>
            </div>
          )}
        </div>

        {loading && <p className="reviews-status">{pick('Loading reviews…', 'جارِ تحميل التقييمات…')}</p>}

        {!loading && loadError && (
          <p className="reviews-status reviews-status--error">
            {pick(
              "Reviews couldn't be loaded right now. Please try again shortly.",
              'تعذّر تحميل التقييمات حالياً. الرجاء المحاولة بعد قليل.'
            )}
          </p>
        )}

        {!loading && !loadError && reviews.length === 0 && (
          <p className="reviews-status">
            {pick('Be the first to share your experience.', 'كن أول من يشارك تجربته.')}
          </p>
        )}

        {!loading && !loadError && reviews.length > 0 && (
          <>
            <div className="reviews-grid">
              {reviews.slice(0, visibleCount).map((review, i) => (
                <Reveal as="div" key={review.id} delay={i * 70}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>

            {visibleCount < reviews.length && (
              <div className="reviews-load-more">
                <button
                  className="btn btn-outline"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  <span>{pick('Show more reviews', 'عرض المزيد')}</span>
                </button>
              </div>
            )}
          </>
        )}

        <div className="reviews-cta">
          {successMessage && !formOpen && <p className="reviews-success">{successMessage}</p>}
          {!formOpen ? (
            <button
              className="btn btn-outline"
              onClick={() => {
                setSuccessMessage('');
                setFormOpen(true);
              }}
            >
              <span>{pick('Write a review', 'اكتب تقييمك')}</span>
            </button>
          ) : (
            <ReviewForm onSubmitted={handleSubmitted} onCancel={() => setFormOpen(false)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;