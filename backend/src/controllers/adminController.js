import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Review from '../models/Review.js';

// POST /api/admin/login
export async function adminLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const valid = await admin.comparePassword(password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { adminId: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );

  res.json({ token, name: admin.name, email: admin.email });
}

// GET /api/admin/reviews?status=pending|approved|rejected|all
export async function listReviewsForAdmin(req, res) {
  const { status } = req.query;
  const filter = status && status !== 'all' ? { status } : {};

  const reviews = await Review.find(filter).sort({ createdAt: -1 }).lean();

  res.json({
    reviews: reviews.map((r) => ({
      id: r._id,
      name: r.name,
      rating: r.rating,
      text: r.text,
      status: r.status,
      date: r.createdAt,
    })),
  });
}

// PATCH /api/admin/reviews/:id  { status: 'approved' | 'rejected' }
export async function updateReviewStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
  if (!review) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  res.json({ message: 'Review updated.', review });
}

// DELETE /api/admin/reviews/:id
export async function deleteReview(req, res) {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    return res.status(404).json({ error: 'Review not found.' });
  }
  res.json({ message: 'Review deleted.' });
}
