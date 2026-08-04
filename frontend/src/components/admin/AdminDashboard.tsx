'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

type FilterStatus = 'pending' | 'approved' | 'rejected' | 'all';

interface AdminDashboardProps {
  onLogout: () => void;
}

const TABS: { key: FilterStatus; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get<{ reviews: AdminReview[] }>(`/admin/reviews?status=${filter}`, true);
        if (!cancelled) setReviews(res.reviews);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Failed to load reviews.';
        setError(message);
        if (message.toLowerCase().includes('token')) onLogout();
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [filter, onLogout]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setBusyId(id);
    try {
      await api.patch(`/admin/reviews/${id}`, { status });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this review permanently?')) return;
    setBusyId(id);
    try {
      await api.del(`/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      setBusyId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mm-admin-token');
    onLogout();
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1>Dr. Mahmoud Murad — Reviews</h1>
        <button className="admin-btn admin-btn-outline" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <nav className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab${filter === tab.key ? ' admin-tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {error && <p className="admin-error">{error}</p>}
      {loading && <p className="admin-status">Loading…</p>}

      {!loading && reviews.length === 0 && !error && <p className="admin-status">No reviews in this list.</p>}

      <div className="admin-review-list">
        {reviews.map((review) => (
          <div key={review.id} className="admin-review-card">
            <div className="admin-review-top">
              <div>
                <strong>{review.name}</strong>
                <span className="admin-review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <span className={`admin-status-pill admin-status-pill--${review.status}`}>{review.status}</span>
            </div>
            <div className="admin-review-rating">
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>
            <p className="admin-review-text">{review.text}</p>
            <div className="admin-review-actions">
              {review.status !== 'approved' && (
                <button
                  className="admin-btn admin-btn-primary"
                  disabled={busyId === review.id}
                  onClick={() => handleStatusChange(review.id, 'approved')}
                >
                  Approve
                </button>
              )}
              {review.status !== 'rejected' && (
                <button
                  className="admin-btn admin-btn-outline"
                  disabled={busyId === review.id}
                  onClick={() => handleStatusChange(review.id, 'rejected')}
                >
                  Reject
                </button>
              )}
              <button
                className="admin-btn admin-btn-danger"
                disabled={busyId === review.id}
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
