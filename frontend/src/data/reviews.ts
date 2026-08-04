import { api } from '@/lib/api';

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string; // ISO date string
}

export interface NewReviewInput {
  name: string;
  rating: number;
  text: string;
  /** honeypot field — must stay empty; bots tend to fill every field */
  website?: string;
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  const data = await api.get<{ reviews: Review[] }>('/reviews');
  return data.reviews;
}

export async function fetchAverageRating(): Promise<{ average: number; count: number }> {
  return api.get<{ average: number; count: number }>('/reviews/average');
}

export async function submitReview(input: NewReviewInput): Promise<{ message: string }> {
  return api.post<{ message: string }>('/reviews', input);
}
