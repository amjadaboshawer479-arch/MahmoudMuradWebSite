import rateLimit from 'express-rate-limit';

/**
 * Public review submissions: at most 5 per hour per IP.
 * Generous enough for a genuine patient, tight enough to slow spam.
 */
export const submitReviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many reviews submitted from this connection. Please try again later.' },
});

/**
 * Admin login: brute-force protection.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

/**
 * General API traffic guard.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
