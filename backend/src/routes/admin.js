import { Router } from 'express';
import {
  adminLogin,
  listReviewsForAdmin,
  updateReviewStatus,
  deleteReview,
} from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/login', loginLimiter, asyncHandler(adminLogin));

router.get('/reviews', requireAdmin, asyncHandler(listReviewsForAdmin));
router.patch('/reviews/:id', requireAdmin, asyncHandler(updateReviewStatus));
router.delete('/reviews/:id', requireAdmin, asyncHandler(deleteReview));

export default router;
