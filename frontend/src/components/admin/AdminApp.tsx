'use client';

import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './admin.css';

const AdminApp: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  // Resolve auth state after mount (localStorage isn't available during SSR)
  React.useEffect(() => {
    setAuthed(Boolean(localStorage.getItem('mm-admin-token')));
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
};

export default AdminApp;
