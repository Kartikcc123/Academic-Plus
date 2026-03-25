/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import api from '../lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('admin') || 'null'));

  // Student Login
  const loginUser = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    }
    return res.data;
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    const res = await api.post('/api/admin/login', { email, password });
    if (res.data) {
      localStorage.setItem('admin', JSON.stringify(res.data));
      setAdmin(res.data);
    }
    return res.data;
  };

  // Universal Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    setUser(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ user, admin, loginUser, loginAdmin, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
