import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage when the app loads
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

    if (loggedInUser) setUser(loggedInUser);
    if (loggedInAdmin) setAdmin(loggedInAdmin);
    
    setLoading(false);
  }, []);

  // Student Login
  const loginUser = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    }
    return res.data;
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    const res = await axios.post('/api/admin/login', { email, password });
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
    <AuthContext.Provider value={{ user, admin, loginUser, loginAdmin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};