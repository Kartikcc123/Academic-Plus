import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentRoute, AdminRoute } from './components/ProtectedRoute';
// Import all the pages we built
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Anyone can visit these */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/admin" element={<AdminLogin />} /> */}
<Route path="/admin" element={<AdminLogin />} />

          {/* Protected Student Routes - Only for logged-in students */}
          <Route element={<StudentRoute />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Protected Admin Routes - Strictly for Dr. Ajay / Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/panel" element={<AdminPanel />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;