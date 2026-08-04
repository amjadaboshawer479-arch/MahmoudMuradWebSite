import Review from '../models/Review.js';
import { looksLikeSpam, isHoneypotTripped } from '../utils/spamGuard.js';
import { hashIp } from '../utils/hashIp.js';

// GET /api/reviews — approved reviews only, newest first
export async function listApprovedReviews(req, res) {
  const reviews = await Review.find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .select('name rating text createdAt')
    .lean();

  res.json({
    reviews: reviews.map((r) => ({
      id: r._id,
      name: r.name,
      rating: r.rating,
      text: r.text,
      date: r.createdAt,
    })),
  });
}

// GET /api/reviews/average
export async function getAverageRating(req, res) {
  const result = await Review.aggregate([
    { $match: { status: 'approved' } },
    { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);

  const { average = 0, count = 0 } = result[0] || {};
  res.json({ average: Number(average.toFixed(1)), count });
}

// POST /api/reviews — public submission, always starts as "pending"
export async function submitReview(req, res) {
  const { name, rating, text, website } = req.body;

  // Honeypot field — real users never fill this (it's hidden via CSS)
  if (isHoneypotTripped(website)) {
    // Pretend success so bots don't learn the honeypot was tripped
    return res.status(201).json({ message: 'Review submitted for review.' });
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!rating || Number(rating) < 1 || Number(rating) > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Review text is required.' });
  }
  if (looksLikeSpam(text) || looksLikeSpam(name)) {
    return res.status(400).json({ error: 'Your review looks like spam. Please rewrite it without links.' });
  }

  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

  const review = await Review.create({
    name: name.trim().slice(0, 80),
    rating: Math.round(Number(rating)),
    text: text.trim().slice(0, 1000),
    status: 'pending',
    ipHash: hashIp(ip),
  });

  res.status(201).json({
    message: 'Thank you — your review is now pending approval and will appear once reviewed.',
    id: review._id,
  });
}
