import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Guard for Student Pages
export const StudentRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return user?.portalAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

// Guard for Admin Pages
export const AdminRoute = () => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return admin ? <Outlet /> : <Navigate to="/admin" replace />;
};
