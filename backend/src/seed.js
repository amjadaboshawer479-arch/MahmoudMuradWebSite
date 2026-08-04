import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';
import Review from './models/Review.js';
import mongoose from 'mongoose';

const SEED_REVIEWS = [
  {
    name: 'سارة العبدالله',
    rating: 5,
    text: 'تجربة راقية من أول دقيقة. الدكتور محمود يستمع باهتمام قبل ما يقترح أي شيء، والنتيجة كانت طبيعية جداً وبالضبط زي ما تمنيت.',
    status: 'approved',
  },
  {
    name: 'Omar Khalil',
    rating: 5,
    text: 'Genuinely one of the most professional clinics I have visited in Amman. Dr. Mahmoud explained every step and the follow-up care was excellent.',
    status: 'approved',
  },
  {
    name: 'ليلى منصور',
    rating: 4,
    text: 'عيادة نظيفة وأنيقة وفريق محترم. الاستشارة كانت مريحة وما حسيت أي ضغط، والدكتور صريح بكل التفاصيل.',
    status: 'approved',
  },
];

async function run() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before seeding.');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`Admin ${email} already exists — skipping admin creation.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await Admin.create({ email: email.toLowerCase(), passwordHash, name: 'Dr. Mahmoud Clinic Admin' });
    console.log(`Admin account created for ${email}`);
  }

  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    await Review.insertMany(SEED_REVIEWS);
    console.log(`Seeded ${SEED_REVIEWS.length} sample reviews.`);
  } else {
    console.log('Reviews already exist — skipping review seeding.');
  }

  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
