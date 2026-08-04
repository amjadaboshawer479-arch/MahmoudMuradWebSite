import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import { generalLimiter } from './middleware/rateLimit.js';
import reviewRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Render (and most hosts) sit behind a reverse proxy — this makes
// req.ip resolve to the real client IP instead of the proxy's IP,
// which express-rate-limit needs to work correctly.
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(generalLimiter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'dr-mahmoud-murad-backend' });
});
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
