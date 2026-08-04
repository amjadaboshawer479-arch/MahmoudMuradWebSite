import { Router } from 'express';
import { listApprovedReviews, getAverageRating, submitReview } from '../controllers/reviewController.js';
import { submitReviewLimiter } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(listApprovedReviews));
router.get('/average', asyncHandler(getAverageRating));
router.post('/', submitReviewLimiter, asyncHandler(submitReview));

export default router;
